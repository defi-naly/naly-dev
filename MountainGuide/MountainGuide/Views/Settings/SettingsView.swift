import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var showExportSheet = false
    @State private var showResetAlert = false

    @StateObject private var healthKit = HealthKitService.shared
    @StateObject private var xcontest = XContestService.shared

    var body: some View {
        NavigationStack {
            List {
                // Connected Accounts
                Section {
                    NavigationLink {
                        HealthKitConnectionView()
                    } label: {
                        HStack {
                            Image(systemName: "heart.fill")
                                .foregroundStyle(.red)
                                .frame(width: 24)
                            Text("Apple Health (Garmin)")
                                .font(.mono(13))
                                .foregroundStyle(Color.textPrimary)
                            Spacer()
                            Text(healthKit.isAuthorized ? "Connected" : "Not Connected")
                                .font(.mono(11))
                                .foregroundStyle(healthKit.isAuthorized ? Color.emerald : Color.textMuted)
                        }
                    }
                    .listRowBackground(Color.terminalSurface)

                    NavigationLink {
                        XContestConnectionView()
                    } label: {
                        HStack {
                            Image(systemName: "globe")
                                .foregroundStyle(Color.flyingAccent)
                                .frame(width: 24)
                            Text("XContest")
                                .font(.mono(13))
                                .foregroundStyle(Color.textPrimary)
                            Spacer()
                            Text(xcontest.username != nil ? "Connected" : "Not Connected")
                                .font(.mono(11))
                                .foregroundStyle(xcontest.username != nil ? Color.emerald : Color.textMuted)
                        }
                    }
                    .listRowBackground(Color.terminalSurface)
                } header: {
                    Text("Connected Accounts")
                        .font(.mono(11, weight: .bold))
                }

                // Stats section
                Section {
                    statRow("Total reviews", value: "\(store.state.stats.totalReviews)")
                    statRow("Current streak", value: "\(store.state.stats.currentStreak) days")
                    statRow("Longest streak", value: "\(store.state.stats.longestStreak) days")
                    statRow("Modules completed", value: "\(store.completedModuleCount())")
                    statRow("Total cards", value: "\(store.state.cards.count)")
                    statRow("Cards due today", value: "\(store.dueCardCount)")
                } header: {
                    Text("Statistics")
                        .font(.mono(11, weight: .bold))
                }

                // Data section
                Section {
                    Button {
                        showExportSheet = true
                    } label: {
                        HStack {
                            Image(systemName: "square.and.arrow.up")
                            Text("Export Data (JSON)")
                                .font(.mono(14))
                        }
                        .foregroundStyle(Color.textPrimary)
                    }

                    Button {
                        showResetAlert = true
                    } label: {
                        HStack {
                            Image(systemName: "trash")
                            Text("Reset All Progress")
                                .font(.mono(14))
                        }
                        .foregroundStyle(Color.danger)
                    }
                } header: {
                    Text("Data")
                        .font(.mono(11, weight: .bold))
                }

                // About section
                Section {
                    aboutRow("App", value: "Mountain Guide")
                    aboutRow("Engine", value: "SM-2 Spaced Repetition")
                    aboutRow("Domains", value: "3 (Weather, Avalanche, Flying)")
                    aboutRow("Modules", value: "30")
                    aboutRow("Version", value: "1.0 (Phase 0)")
                } header: {
                    Text("About")
                        .font(.mono(11, weight: .bold))
                }

                // Sources section
                Section {
                    sourceRow("Understanding the Sky", author: "Dennis Pagen")
                    sourceRow("Staying Alive in Avalanche Terrain", author: "Bruce Tremper")
                    sourceRow("Thermal Flying", author: "Burkhard Martens")
                } header: {
                    Text("Sources")
                        .font(.mono(11, weight: .bold))
                }
            }
            .scrollContentBackground(.hidden)
            .background(Color.terminalBg)
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showExportSheet) {
                if let data = store.exportJSON(),
                   let json = String(data: data, encoding: .utf8) {
                    ExportView(json: json)
                }
            }
            .alert("Reset All Progress?", isPresented: $showResetAlert) {
                Button("Cancel", role: .cancel) {}
                Button("Reset", role: .destructive) {
                    store.state = KnowledgeStore.createDefaultState()
                }
            } message: {
                Text("This will delete all your review cards, module progress, and streak data. This cannot be undone.")
            }
        }
    }

    private func statRow(_ label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
            Spacer()
            Text(value)
                .font(.mono(13, weight: .bold))
                .foregroundStyle(Color.textPrimary)
        }
        .listRowBackground(Color.terminalSurface)
    }

    private func aboutRow(_ label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
            Spacer()
            Text(value)
                .font(.mono(12))
                .foregroundStyle(Color.textDim)
        }
        .listRowBackground(Color.terminalSurface)
    }

    private func sourceRow(_ title: String, author: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(.mono(13))
                .foregroundStyle(Color.textPrimary)
            Text("by \(author)")
                .font(.mono(11))
                .foregroundStyle(Color.textDim)
        }
        .listRowBackground(Color.terminalSurface)
    }
}

// MARK: - Export View

struct ExportView: View {
    let json: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                Text(json)
                    .font(.mono(10))
                    .foregroundStyle(Color.textPrimary)
                    .padding()
            }
            .background(Color.terminalBg)
            .navigationTitle("Exported Data")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Done") { dismiss() }
                        .foregroundStyle(Color.amber)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    ShareLink(item: json) {
                        Image(systemName: "square.and.arrow.up")
                    }
                    .foregroundStyle(Color.amber)
                }
            }
        }
    }
}
