import SwiftUI

// MARK: - HealthKit Connection View

struct HealthKitConnectionView: View {
    @StateObject private var healthKit = HealthKitService.shared

    var body: some View {
        List {
            Section {
                if healthKit.isAuthorized {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(Color.emerald)
                        Text("Connected")
                            .font(.mono(14, weight: .semibold))
                            .foregroundStyle(Color.textPrimary)
                    }
                    .listRowBackground(Color.terminalSurface)
                } else {
                    Button {
                        Task { await healthKit.requestAuthorization() }
                    } label: {
                        HStack {
                            Image(systemName: "heart.fill")
                                .foregroundStyle(.red)
                            Text("Connect Apple Health")
                                .font(.mono(14, weight: .semibold))
                                .foregroundStyle(Color.textPrimary)
                        }
                    }
                    .listRowBackground(Color.terminalSurface)
                }
            } header: {
                Text("Status")
                    .font(.mono(11, weight: .bold))
            } footer: {
                Text("MountainGuide reads workouts synced from your Garmin to Apple Health. No data is shared externally.")
                    .font(.mono(11))
            }

            if healthKit.isAuthorized {
                Section {
                    if let lastSync = healthKit.lastSyncDate {
                        HStack {
                            Text("Last Sync")
                                .font(.mono(13))
                                .foregroundStyle(Color.textMuted)
                            Spacer()
                            Text(lastSync, style: .relative)
                                .font(.mono(12))
                                .foregroundStyle(Color.textDim)
                        }
                        .listRowBackground(Color.terminalSurface)
                    }

                    if healthKit.newWorkoutsCount > 0 {
                        HStack {
                            Text("New Activities")
                                .font(.mono(13))
                                .foregroundStyle(Color.textMuted)
                            Spacer()
                            Text("\(healthKit.newWorkoutsCount)")
                                .font(.mono(13, weight: .bold))
                                .foregroundStyle(Color.emerald)
                        }
                        .listRowBackground(Color.terminalSurface)
                    }

                    Button {
                        Task { await healthKit.syncAll() }
                    } label: {
                        HStack {
                            Image(systemName: "arrow.triangle.2.circlepath")
                            Text("Sync Now")
                                .font(.mono(14))
                        }
                        .foregroundStyle(Color.accent)
                    }
                    .disabled(healthKit.isImporting)
                    .listRowBackground(Color.terminalSurface)
                } header: {
                    Text("Sync")
                        .font(.mono(11, weight: .bold))
                }

                Section {
                    workoutTypeRow("Hiking", icon: "figure.hiking", type: ".hiking")
                    workoutTypeRow("Ski Touring", icon: "mountain.2.fill", type: ".crossCountrySkiing, .snowSports")
                    workoutTypeRow("Climbing", icon: "figure.climbing", type: ".climbing")
                    workoutTypeRow("Trail Running*", icon: "figure.run", type: ".running (>200m gain)")
                } header: {
                    Text("Detected Workout Types")
                        .font(.mono(11, weight: .bold))
                }
            }
        }
        .scrollContentBackground(.hidden)
        .background(Color.terminalBg)
        .navigationTitle("Apple Health")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func workoutTypeRow(_ name: String, icon: String, type: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 16))
                .foregroundStyle(Color.accent)
                .frame(width: 24)
            VStack(alignment: .leading, spacing: 2) {
                Text(name)
                    .font(.mono(13, weight: .medium))
                    .foregroundStyle(Color.textPrimary)
                Text(type)
                    .font(.mono(10))
                    .foregroundStyle(Color.textDim)
            }
        }
        .listRowBackground(Color.terminalSurface)
    }
}
