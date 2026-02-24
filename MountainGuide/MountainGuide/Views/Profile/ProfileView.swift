import SwiftUI

// MARK: - Profile Tab

struct ProfileView: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var selectedSegment: ProfileSegment = .progress
    @State private var showSettings = false

    enum ProfileSegment: String, CaseIterable {
        case progress = "Progress"
        case logbook = "Logbook"
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                Picker("Profile", selection: $selectedSegment) {
                    ForEach(ProfileSegment.allCases, id: \.self) { segment in
                        Text(segment.rawValue).tag(segment)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                .padding(.top, 8)

                switch selectedSegment {
                case .progress:
                    ProgressContent()
                        .environmentObject(store)
                case .logbook:
                    LogbookView()
                        .environmentObject(store)
                }
            }
            .background(Color.terminalBg)
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showSettings = true
                    } label: {
                        Image(systemName: "gear")
                            .foregroundStyle(Color.textSecondary)
                    }
                }
            }
            .sheet(isPresented: $showSettings) {
                SettingsView()
                    .environmentObject(store)
            }
        }
    }
}

// MARK: - Progress Content (gamification + stats moved here from Home)

struct ProgressContent: View {
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // XP & Level
                GamificationBanner(gamification: store.state.gamification)
                    .padding(.horizontal)

                // Quick stats row
                HStack(spacing: 12) {
                    StatCard(
                        label: "Due",
                        value: "\(store.dueCardCount)",
                        icon: "rectangle.stack.fill",
                        color: store.dueCardCount > 0 ? .accent : .emerald
                    )
                    StatCard(
                        label: "Streak",
                        value: "\(store.state.stats.currentStreak)",
                        icon: "flame.fill",
                        color: store.state.stats.currentStreak > 0 ? .accent : .textMuted
                    )
                    StatCard(
                        label: "Mastered",
                        value: "\(store.completedModuleCount())/\(DomainContent.allDomains.reduce(0) { $0 + $1.modules.count })",
                        icon: "checkmark.seal.fill",
                        color: .emerald
                    )
                }
                .padding(.horizontal)

                // Medal counts
                MedalCountsRow(gamification: store.state.gamification)
                    .padding(.horizontal)

                // Activity breakdown
                ActivityBreakdownCard()
                    .padding(.horizontal)

                // Monthly trend
                MonthlyTrendCard()
                    .padding(.horizontal)

                // Streak heatmap
                StreakHeatmap(history: store.state.stats.reviewHistory)
                    .padding(.horizontal)

                // Domain strength cards
                VStack(alignment: .leading, spacing: 12) {
                    Text("DOMAINS")
                        .font(.body(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                        .padding(.horizontal)

                    ForEach(DomainContent.allDomains) { domain in
                        DomainStrengthRow(
                            domain: domain,
                            strength: store.domainStrength(domain.id),
                            completed: store.completedModuleCount(domainId: domain.id),
                            total: domain.modules.count
                        )
                    }
                }

                KnowledgeMapView()
                    .padding(.horizontal)
            }
            .padding(.bottom, 32)
        }
        .background(Color.terminalBg)
    }
}

// MARK: - Activities Content

struct ActivitiesContent: View {
    @StateObject private var logStore = ActivityLogStore.shared

    var body: some View {
        if logStore.records.isEmpty {
            VStack(spacing: 16) {
                Spacer()
                Image(systemName: "figure.hiking")
                    .font(.system(size: 48))
                    .foregroundStyle(Color.textTertiary)
                Text("Activity Log")
                    .font(.body(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text("Your flights, tours, and hikes will appear here.")
                    .font(.body(14))
                    .foregroundStyle(Color.textMuted)
                    .multilineTextAlignment(.center)
                Spacer()
            }
            .padding()
        } else {
            ScrollView {
                VStack(spacing: 12) {
                    ForEach(logStore.records) { record in
                        activityRow(record)
                    }
                }
                .padding()
            }
            .background(Color.terminalBg)
        }
    }

    private func activityRow(_ record: ActivityRecord) -> some View {
        HStack(spacing: 12) {
            record.activityType.iconImage
                .resizable()
                .scaledToFit()
                .frame(width: 18, height: 18)
                .foregroundStyle(record.activityType.color)
                .frame(width: 32)

            VStack(alignment: .leading, spacing: 2) {
                Text(record.activityType.displayName)
                    .font(.body(14, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text(record.date, style: .date)
                    .font(.mono(11))
                    .foregroundStyle(Color.textMuted)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.system(size: 12))
                .foregroundStyle(Color.textDim)
        }
        .terminalCard()
    }
}
