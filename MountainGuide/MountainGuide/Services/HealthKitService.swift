import Foundation
import HealthKit
import CoreLocation

// MARK: - HealthKit Service

@MainActor
class HealthKitService: ObservableObject {
    static let shared = HealthKitService()

    @Published var isAuthorized = false
    @Published var isImporting = false
    @Published var lastSyncDate: Date?
    @Published var newWorkoutsCount = 0
    @Published var importProgress: (current: Int, total: Int) = (0, 0)
    @Published var lastImportXP = 0

    private let healthStore = HKHealthStore()
    private let lastSyncKey = "healthKitLastSyncDate"

    private init() {
        loadLastSyncDate()
        checkAuthorization()
    }

    // MARK: - Authorization

    var isAvailable: Bool {
        HKHealthStore.isHealthDataAvailable()
    }

    func requestAuthorization() async -> Bool {
        guard isAvailable else { return false }

        let readTypes: Set<HKObjectType> = [
            HKObjectType.workoutType(),
            HKSeriesType.workoutRoute(),
            HKQuantityType(.heartRate),
            HKQuantityType(.activeEnergyBurned)
        ]

        do {
            try await healthStore.requestAuthorization(toShare: [], read: readTypes)
            isAuthorized = true
            return true
        } catch {
            return false
        }
    }

    private func checkAuthorization() {
        guard isAvailable else { return }
        let workoutType = HKObjectType.workoutType()
        let status = healthStore.authorizationStatus(for: workoutType)
        isAuthorized = status == .sharingAuthorized || status == .notDetermined
        // HealthKit doesn't distinguish between "authorized to read" and "authorized to share"
        // We only read, so we check if the user has been asked before
        if lastSyncDate != nil {
            isAuthorized = true
        }
    }

    // MARK: - Fetch Workouts

    private static let mountainActivityTypes: [HKWorkoutActivityType] = [
        .hiking,
        .crossCountrySkiing,
        .snowSports,
        .climbing,
        .running
    ]

    func fetchNewWorkouts(since: Date) async -> [HKWorkout] {
        let workoutType = HKObjectType.workoutType()
        let predicate = HKQuery.predicateForSamples(
            withStart: since,
            end: .now
        )
        let sortDescriptor = NSSortDescriptor(
            key: HKSampleSortIdentifierStartDate,
            ascending: false
        )

        return await withCheckedContinuation { continuation in
            let query = HKSampleQuery(
                sampleType: workoutType,
                predicate: predicate,
                limit: HKObjectQueryNoLimit,
                sortDescriptors: [sortDescriptor]
            ) { _, samples, error in
                guard let workouts = samples as? [HKWorkout], error == nil else {
                    continuation.resume(returning: [])
                    return
                }

                // Filter to mountain activity types
                let filtered = workouts.filter { workout in
                    Self.mountainActivityTypes.contains(workout.workoutActivityType)
                }

                // For running, only include if significant elevation gain
                let mountainWorkouts = filtered.filter { workout in
                    if workout.workoutActivityType == .running {
                        let elevGain = workout.totalElevationGain(unit: .meter())
                        return elevGain > 200
                    }
                    return true
                }

                continuation.resume(returning: mountainWorkouts)
            }
            healthStore.execute(query)
        }
    }

    // MARK: - Fetch Route

    func fetchRoute(for workout: HKWorkout) async -> [CLLocation] {
        let routeType = HKSeriesType.workoutRoute()
        let predicate = HKQuery.predicateForObjects(from: workout)

        let routes: [HKWorkoutRoute] = await withCheckedContinuation { continuation in
            let query = HKSampleQuery(
                sampleType: routeType,
                predicate: predicate,
                limit: HKObjectQueryNoLimit,
                sortDescriptors: nil
            ) { _, samples, _ in
                let routes = samples as? [HKWorkoutRoute] ?? []
                continuation.resume(returning: routes)
            }
            healthStore.execute(query)
        }

        guard let route = routes.first else { return [] }

        return await withCheckedContinuation { continuation in
            var allLocations: [CLLocation] = []
            let routeQuery = HKWorkoutRouteQuery(route: route) { _, locations, done, _ in
                if let locations {
                    allLocations.append(contentsOf: locations)
                }
                if done {
                    continuation.resume(returning: allLocations)
                }
            }
            healthStore.execute(routeQuery)
        }
    }

    // MARK: - Fetch Heart Rate

    func fetchHeartRate(for workout: HKWorkout) async -> [HKQuantitySample] {
        let hrType = HKQuantityType(.heartRate)
        let predicate = HKQuery.predicateForSamples(
            withStart: workout.startDate,
            end: workout.endDate
        )
        let sortDescriptor = NSSortDescriptor(
            key: HKSampleSortIdentifierStartDate,
            ascending: true
        )

        return await withCheckedContinuation { continuation in
            let query = HKSampleQuery(
                sampleType: hrType,
                predicate: predicate,
                limit: HKObjectQueryNoLimit,
                sortDescriptors: [sortDescriptor]
            ) { _, samples, _ in
                let hrSamples = samples as? [HKQuantitySample] ?? []
                continuation.resume(returning: hrSamples)
            }
            healthStore.execute(query)
        }
    }

    // MARK: - Import Workout → ActivityRecord

    func importWorkout(_ workout: HKWorkout) async -> ActivityRecord? {
        let route = await fetchRoute(for: workout)
        let hrSamples = await fetchHeartRate(for: workout)

        let trackPoints = route.map { location in
            TrackPoint(
                latitude: location.coordinate.latitude,
                longitude: location.coordinate.longitude,
                altitude: location.altitude,
                timestamp: location.timestamp,
                speed: max(0, location.speed),
                vario: 0
            )
        }

        let hrZones = buildHeartRateZones(from: hrSamples)
        let calories = workout.totalEnergyBurned?.doubleValue(for: .kilocalorie())
        let elevGain = workout.totalElevationGain(unit: .meter())
        let distance = workout.totalDistance(unit: .meterUnit(with: .kilo))
        let source: ActivitySource = .healthKit(workoutUUID: workout.uuid.uuidString)

        let activityType = mapWorkoutType(workout.workoutActivityType)

        switch activityType {
        case .hiking:
            let hike = HikeLogRecord(
                date: workout.startDate,
                name: "Hike",
                distance: distance,
                elevationGain: elevGain,
                duration: workout.duration,
                source: source,
                trackPoints: trackPoints.isEmpty ? nil : trackPoints,
                heartRateZones: hrZones,
                caloriesBurned: calories
            )
            return .hike(hike)

        case .skiTouring:
            let tour = TourLogRecord(
                date: workout.startDate,
                routeName: "Ski Tour",
                distance: distance,
                elevationGain: elevGain,
                duration: workout.duration,
                source: source,
                trackPoints: trackPoints.isEmpty ? nil : trackPoints,
                heartRateZones: hrZones,
                caloriesBurned: calories
            )
            return .tour(tour)

        case .climbing:
            let climb = ClimbLogRecord(
                date: workout.startDate,
                name: "Climb",
                distance: distance,
                elevationGain: elevGain,
                duration: workout.duration,
                source: source,
                trackPoints: trackPoints.isEmpty ? nil : trackPoints,
                heartRateZones: hrZones,
                caloriesBurned: calories
            )
            return .climb(climb)

        default:
            return nil
        }
    }

    // MARK: - Sync All

    func syncAll() async {
        guard isAuthorized else { return }

        isImporting = true
        lastImportXP = 0

        let since = lastSyncDate ?? Calendar.current.date(byAdding: .month, value: -6, to: Date())!
        let workouts = await fetchNewWorkouts(since: since)

        // Filter out already-imported workouts
        let existingUUIDs = await getExistingHealthKitUUIDs()
        let newWorkouts = workouts.filter { workout in
            !existingUUIDs.contains(workout.uuid.uuidString)
        }

        newWorkoutsCount = newWorkouts.count
        importProgress = (0, newWorkouts.count)

        for (index, workout) in newWorkouts.enumerated() {
            importProgress = (index + 1, newWorkouts.count)
            if let record = await importWorkout(workout) {
                ActivityLogStore.shared.save(record: record)
                ActivityLogStore.shared.addPendingReview(activityId: record.id)
            }
        }

        lastSyncDate = Date()
        saveLastSyncDate()
        isImporting = false
    }

    // MARK: - Helpers

    private func mapWorkoutType(_ type: HKWorkoutActivityType) -> Activity {
        switch type {
        case .hiking, .running: return .hiking
        case .crossCountrySkiing, .snowSports: return .skiTouring
        case .climbing: return .climbing
        default: return .hiking
        }
    }

    private func buildHeartRateZones(from samples: [HKQuantitySample]) -> HeartRateZones? {
        guard !samples.isEmpty else { return nil }

        let bpm = samples.map { $0.quantity.doubleValue(for: HKUnit.count().unitDivided(by: .minute())) }
        let avgHR = Int(bpm.reduce(0, +) / Double(bpm.count))
        let maxHR = Int(bpm.max() ?? 0)

        // Estimate max HR (220 - age fallback: use 185 as default)
        let estimatedMax = 185.0

        var zones = [0, 0, 0, 0, 0]  // minutes in each zone
        let sampleDuration = 1.0 / 60.0  // approximate: 1 sample ≈ 1 second → convert to minutes

        for hr in bpm {
            let pct = hr / estimatedMax
            if pct >= 0.9 { zones[4] += 1 }
            else if pct >= 0.8 { zones[3] += 1 }
            else if pct >= 0.7 { zones[2] += 1 }
            else if pct >= 0.6 { zones[1] += 1 }
            else { zones[0] += 1 }
        }

        // Convert sample counts to approximate minutes
        let toMin = { (count: Int) in max(1, Int(Double(count) * sampleDuration)) }

        return HeartRateZones(
            zone1Minutes: toMin(zones[0]),
            zone2Minutes: toMin(zones[1]),
            zone3Minutes: toMin(zones[2]),
            zone4Minutes: toMin(zones[3]),
            zone5Minutes: toMin(zones[4]),
            averageHR: avgHR,
            maxHR: maxHR
        )
    }

    private func getExistingHealthKitUUIDs() async -> Set<String> {
        let summaries = await ActivityFileStore.shared.loadIndex()
        var uuids = Set<String>()
        for summary in summaries {
            if case .healthKit(let uuid) = summary.source {
                uuids.insert(uuid)
            }
        }
        return uuids
    }

    private func loadLastSyncDate() {
        if let timestamp = UserDefaults.standard.object(forKey: lastSyncKey) as? Date {
            lastSyncDate = timestamp
        }
    }

    private func saveLastSyncDate() {
        UserDefaults.standard.set(lastSyncDate, forKey: lastSyncKey)
    }
}

// MARK: - HKWorkout Helpers

private extension HKWorkout {
    func totalElevationGain(unit: HKUnit) -> Double {
        if let metadata = metadata,
           let elevGain = metadata[HKMetadataKeyElevationAscended] as? HKQuantity {
            return elevGain.doubleValue(for: unit)
        }
        return 0
    }

    func totalDistance(unit: HKUnit) -> Double {
        totalDistance?.doubleValue(for: unit) ?? 0
    }
}
