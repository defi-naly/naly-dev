import SwiftUI
import MapKit

// MARK: - Tour Planner

struct TourPlannerView: View {
    @StateObject private var store = TourStore.shared
    @EnvironmentObject var knowledgeStore: KnowledgeStore
    @State private var showSlopeAngle = false
    @State private var showTourList = false
    @State private var showRiskAssessment = false
    @State private var tourName = "New Tour"

    var body: some View {
        VStack(spacing: 0) {
            // Map section
            ZStack(alignment: .topTrailing) {
                TourMapView(
                    waypoints: store.activeTour?.waypoints ?? [],
                    showSlopeAngle: showSlopeAngle,
                    onTap: { coord in
                        let count = store.activeTour?.waypoints.count ?? 0
                        if store.activeTour == nil {
                            let _ = store.createTour(name: tourName)
                        }
                        store.addWaypoint(
                            name: "WP \(count + 1)",
                            lat: coord.latitude,
                            lon: coord.longitude
                        )
                    }
                )
                .frame(height: 300)

                // Map overlay buttons
                VStack(spacing: 8) {
                    MapOverlayButton(
                        icon: showSlopeAngle ? "mountain.2.fill" : "mountain.2",
                        isActive: showSlopeAngle
                    ) {
                        showSlopeAngle.toggle()
                    }
                }
                .padding(12)
            }

            // Details section
            ScrollView {
                VStack(spacing: 16) {
                    // Tour name
                    InstrumentCard(title: "Tour", icon: "map") {
                        TextField("Tour name", text: $tourName)
                            .font(.mono(16, weight: .semibold))
                            .foregroundStyle(Color.textPrimary)
                            .onChange(of: tourName) { _, newValue in
                                if var tour = store.activeTour {
                                    tour.name = newValue
                                    store.activeTour = tour
                                }
                            }
                    }

                    // Route summary
                    if let tour = store.activeTour, !tour.waypoints.isEmpty {
                        RouteSummaryCard(tour: tour)
                    }

                    // Waypoints
                    if let tour = store.activeTour, !tour.waypoints.isEmpty {
                        WaypointListSection(tour: tour, store: store)
                    }

                    // Actions
                    HStack(spacing: 12) {
                        Button {
                            showRiskAssessment = true
                        } label: {
                            HStack(spacing: 6) {
                                Image(systemName: "exclamationmark.triangle.fill")
                                Text("Assess Risk")
                            }
                            .font(.mono(13, weight: .semibold))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.avalancheAccent)
                            .cornerRadius(10)
                        }
                        .disabled(store.activeTour == nil)

                        Button {
                            store.saveTour()
                            // Award Preparation XP once per day for planning
                            let key = "lastPlannerXP"
                            let today = Calendar.current.startOfDay(for: Date())
                            let lastDate = UserDefaults.standard.object(forKey: key) as? Date ?? .distantPast
                            if lastDate < today {
                                knowledgeStore.addXP(XPReward.plannerUsedXP, axis: .preparation, domain: .avalanche)
                                UserDefaults.standard.set(today, forKey: key)
                            }
                        } label: {
                            HStack(spacing: 6) {
                                Image(systemName: "square.and.arrow.down")
                                Text("Save Tour")
                            }
                            .font(.mono(13, weight: .semibold))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.accent)
                            .cornerRadius(10)
                        }
                        .disabled(store.activeTour == nil)
                    }

                    // Attribution
                    SwissTopoAttribution()
                }
                .padding()
            }
        }
        .background(Color.terminalBg)
        .navigationTitle("Tour Planner")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    showTourList = true
                } label: {
                    Image(systemName: "folder")
                        .foregroundStyle(Color.accent)
                }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    store.activeTour = nil
                    tourName = "New Tour"
                    let _ = store.createTour(name: tourName)
                } label: {
                    Image(systemName: "plus")
                        .foregroundStyle(Color.accent)
                }
            }
        }
        .sheet(isPresented: $showTourList) {
            TourListView(store: store) { tour in
                tourName = tour.name
                showTourList = false
            }
        }
        .sheet(isPresented: $showRiskAssessment) {
            if let tour = store.activeTour {
                RiskAssessmentView(tour: tour)
            }
        }
        .onAppear {
            if store.activeTour == nil {
                let _ = store.createTour(name: tourName)
            } else {
                tourName = store.activeTour?.name ?? "New Tour"
            }
        }
    }
}

// MARK: - Map Overlay Button

struct MapOverlayButton: View {
    let icon: String
    let isActive: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(isActive ? .white : Color.textPrimary)
                .frame(width: 40, height: 40)
                .background(isActive ? Color.accent : Color.lightSurface.opacity(0.9))
                .cornerRadius(10)
                .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
        }
    }
}

// MARK: - Route Summary Card

struct RouteSummaryCard: View {
    let tour: TourRoute

    var body: some View {
        InstrumentCard(title: "Route Summary", icon: "point.topleft.down.to.point.bottomright.curvepath") {
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                SummaryStatItem(label: "Distance", value: formatDistance(tour.totalDistance))
                SummaryStatItem(label: "Waypoints", value: "\(tour.waypoints.count)")
                SummaryStatItem(label: "Elevation +", value: "\(Int(tour.totalElevationGain))m")
                SummaryStatItem(label: "Elevation -", value: "\(Int(tour.totalElevationLoss))m")
                if let aspect = tour.dominantAspect {
                    SummaryStatItem(label: "Aspect", value: aspect)
                }
                if let slope = tour.maxSlopeEstimate {
                    SummaryStatItem(label: "Max Slope", value: String(format: "%.0f°", slope))
                }
            }
        }
    }

    private func formatDistance(_ meters: Double) -> String {
        if meters >= 1000 {
            return String(format: "%.1f km", meters / 1000)
        }
        return String(format: "%.0f m", meters)
    }
}

struct SummaryStatItem: View {
    let label: String
    let value: String

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(10))
                .foregroundStyle(Color.textTertiary)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Waypoint List

struct WaypointListSection: View {
    let tour: TourRoute
    let store: TourStore

    var body: some View {
        InstrumentCard(title: "Waypoints", icon: "mappin.and.ellipse") {
            VStack(spacing: 8) {
                let sorted = tour.waypoints.sorted { $0.order < $1.order }
                ForEach(sorted) { wp in
                    HStack(spacing: 12) {
                        Text("\(wp.order + 1)")
                            .font(.mono(12, weight: .bold))
                            .foregroundStyle(.white)
                            .frame(width: 24, height: 24)
                            .background(Color.accent)
                            .cornerRadius(12)

                        VStack(alignment: .leading, spacing: 2) {
                            Text(wp.name)
                                .font(.mono(12, weight: .semibold))
                                .foregroundStyle(Color.textPrimary)
                            Text(String(format: "%.4f, %.4f", wp.lat, wp.lon))
                                .font(.mono(9))
                                .foregroundStyle(Color.textTertiary)
                        }

                        Spacer()

                        Button {
                            if let idx = tour.waypoints.firstIndex(where: { $0.id == wp.id }) {
                                store.removeWaypoint(at: idx)
                            }
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 18))
                                .foregroundStyle(Color.textTertiary)
                        }
                    }
                }
            }
        }
    }
}
