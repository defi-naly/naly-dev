import SwiftUI

// MARK: - Saved Tours List

struct TourListView: View {
    @ObservedObject var store: TourStore
    let onSelect: (TourRoute) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Group {
                if store.savedTours.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "map")
                            .font(.system(size: 40))
                            .foregroundStyle(Color.textTertiary)
                        Text("No saved tours")
                            .font(.mono(14))
                            .foregroundStyle(Color.textSecondary)
                        Text("Tap on the map to add waypoints, then save your tour.")
                            .font(.mono(11))
                            .foregroundStyle(Color.textTertiary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(40)
                } else {
                    List {
                        ForEach(store.savedTours) { tour in
                            Button {
                                store.loadTour(tour)
                                onSelect(tour)
                            } label: {
                                HStack(spacing: 12) {
                                    Image(systemName: "map.fill")
                                        .font(.system(size: 20))
                                        .foregroundStyle(Color.accent)

                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(tour.name)
                                            .font(.mono(14, weight: .semibold))
                                            .foregroundStyle(Color.textPrimary)
                                        HStack(spacing: 8) {
                                            Text("\(tour.waypoints.count) waypoints")
                                                .font(.mono(11))
                                                .foregroundStyle(Color.textSecondary)
                                            Text(formatDistance(tour.totalDistance))
                                                .font(.mono(11))
                                                .foregroundStyle(Color.textTertiary)
                                        }
                                    }

                                    Spacer()

                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .semibold))
                                        .foregroundStyle(Color.textTertiary)
                                }
                                .padding(.vertical, 4)
                            }
                        }
                        .onDelete { indexSet in
                            for idx in indexSet {
                                store.deleteTour(store.savedTours[idx])
                            }
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .background(Color.terminalBg)
            .navigationTitle("Saved Tours")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .font(.mono(14, weight: .semibold))
                    .foregroundStyle(Color.accent)
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
