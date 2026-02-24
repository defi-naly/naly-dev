import Foundation

// MARK: - Tour Persistence (UserDefaults)

@MainActor
class TourStore: ObservableObject {
    static let shared = TourStore()

    @Published var savedTours: [TourRoute] = []
    @Published var activeTour: TourRoute?

    private let storageKey = "MountainGuide_SavedTours"

    private init() {
        loadTours()
    }

    // MARK: - Tour Management

    func createTour(name: String = "New Tour") -> TourRoute {
        let tour = TourRoute(name: name)
        activeTour = tour
        return tour
    }

    func addWaypoint(name: String, lat: Double, lon: Double, elevation: Double? = nil) {
        guard var tour = activeTour else { return }
        let order = tour.waypoints.count
        let waypoint = Waypoint(name: name, lat: lat, lon: lon, elevation: elevation, order: order)
        tour.waypoints.append(waypoint)
        tour.updatedAt = Date()
        activeTour = tour
    }

    func removeWaypoint(at index: Int) {
        guard var tour = activeTour, tour.waypoints.indices.contains(index) else { return }
        tour.waypoints.remove(at: index)
        // Reorder
        for i in tour.waypoints.indices {
            tour.waypoints[i].order = i
        }
        tour.updatedAt = Date()
        activeTour = tour
    }

    func reorderWaypoints(from source: IndexSet, to destination: Int) {
        guard var tour = activeTour else { return }
        tour.waypoints.move(fromOffsets: source, toOffset: destination)
        for i in tour.waypoints.indices {
            tour.waypoints[i].order = i
        }
        tour.updatedAt = Date()
        activeTour = tour
    }

    func saveTour() {
        guard let tour = activeTour else { return }
        if let idx = savedTours.firstIndex(where: { $0.id == tour.id }) {
            savedTours[idx] = tour
        } else {
            savedTours.append(tour)
        }
        persistTours()
    }

    func deleteTour(_ tour: TourRoute) {
        savedTours.removeAll { $0.id == tour.id }
        if activeTour?.id == tour.id {
            activeTour = nil
        }
        persistTours()
    }

    func loadTour(_ tour: TourRoute) {
        activeTour = tour
    }

    // MARK: - Persistence

    private func persistTours() {
        let encoder = JSONEncoder()
        if let data = try? encoder.encode(savedTours) {
            UserDefaults.standard.set(data, forKey: storageKey)
        }
    }

    private func loadTours() {
        guard let data = UserDefaults.standard.data(forKey: storageKey) else { return }
        let decoder = JSONDecoder()
        if let tours = try? decoder.decode([TourRoute].self, from: data) {
            savedTours = tours
        }
    }
}
