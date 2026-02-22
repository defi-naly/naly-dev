import SwiftUI

struct DashboardView: View {
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Readiness gauge
                    ReadinessGauge(score: store.readinessScore())
                        .padding(.top, 8)

                    // XP & Level
                    GamificationBanner(gamification: store.state.gamification)
                        .padding(.horizontal)

                    // Quick stats row
                    HStack(spacing: 12) {
                        StatCard(
                            label: "Due",
                            value: "\(store.dueCardCount)",
                            icon: "rectangle.stack.fill",
                            color: store.dueCardCount > 0 ? .amber : .emerald
                        )
                        StatCard(
                            label: "Streak",
                            value: "\(store.state.stats.currentStreak)",
                            icon: "flame.fill",
                            color: store.state.stats.currentStreak > 0 ? .amber : .textMuted
                        )
                        StatCard(
                            label: "Mastered",
                            value: "\(store.completedModuleCount())/30",
                            icon: "checkmark.seal.fill",
                            color: .emerald
                        )
                    }
                    .padding(.horizontal)

                    // Medal counts
                    MedalCountsRow(gamification: store.state.gamification)
                        .padding(.horizontal)

                    // Due cards CTA
                    if store.dueCardCount > 0 {
                        NavigationLink {
                            ReviewSessionView()
                                .environmentObject(store)
                        } label: {
                            HStack {
                                Image(systemName: "rectangle.stack.fill")
                                Text("\(store.dueCardCount) cards ready for review")
                                    .font(.mono(14, weight: .semibold))
                                Spacer()
                                Image(systemName: "chevron.right")
                            }
                            .foregroundStyle(Color.terminalBg)
                            .padding(16)
                            .background(Color.amber)
                            .cornerRadius(12)
                        }
                        .padding(.horizontal)
                    }

                    // Domain strength cards
                    VStack(alignment: .leading, spacing: 12) {
                        Text("DOMAINS")
                            .font(.mono(11, weight: .bold))
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

                    // Streak heatmap
                    StreakHeatmap(history: store.state.stats.reviewHistory)
                        .padding(.horizontal)

                    // Knowledge map
                    KnowledgeMapView()
                        .padding(.horizontal)
                }
                .padding(.bottom, 32)
            }
            .background(Color.terminalBg)
            .navigationTitle("Mountain Guide")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarColorScheme(.dark, for: .navigationBar)
        }
    }
}

// MARK: - Readiness Gauge

struct ReadinessGauge: View {
    let score: Int
    @State private var animatedScore: Double = 0

    var gaugeColor: Color {
        if score < 30 { return .danger }
        if score < 70 { return .amber }
        return .emerald
    }

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                Circle()
                    .stroke(Color.terminalBorder, lineWidth: 8)
                    .frame(width: 120, height: 120)

                Circle()
                    .trim(from: 0, to: animatedScore / 100)
                    .stroke(gaugeColor, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                    .frame(width: 120, height: 120)
                    .rotationEffect(.degrees(-90))

                VStack(spacing: 2) {
                    Text("\(score)")
                        .font(.mono(32, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("READY")
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                }
            }
        }
        .onAppear {
            withAnimation(.easeOut(duration: 1.0)) {
                animatedScore = Double(score)
            }
        }
    }
}

// MARK: - Stat Card

struct StatCard: View {
    let label: String
    let value: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 16))
                .foregroundStyle(color)
            Text(value)
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(10, weight: .medium))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
        .terminalCard()
    }
}

// MARK: - Domain Strength Row

struct DomainStrengthRow: View {
    let domain: Domain
    let strength: Int
    let completed: Int
    let total: Int

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: domain.id.icon)
                .font(.system(size: 18))
                .foregroundStyle(domain.id.color)
                .frame(width: 32)

            VStack(alignment: .leading, spacing: 4) {
                Text(domain.name)
                    .font(.mono(14, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text("\(completed)/\(total) modules")
                    .font(.mono(11))
                    .foregroundStyle(Color.textMuted)
            }

            Spacer()

            // Strength bar
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 4)
                    .fill(Color.terminalBorder)
                    .frame(width: 80, height: 8)
                RoundedRectangle(cornerRadius: 4)
                    .fill(strength < 30 ? Color.textMuted : (strength < 70 ? Color.amber : Color.emerald))
                    .frame(width: CGFloat(strength) / 100.0 * 80, height: 8)
            }

            Text("\(strength)%")
                .font(.mono(12, weight: .bold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 40, alignment: .trailing)
        }
        .padding(.horizontal)
        .padding(.vertical, 8)
    }
}

// MARK: - Streak Heatmap

struct StreakHeatmap: View {
    let history: [String: Int]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("REVIEW HISTORY")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 3), count: 7), spacing: 3) {
                ForEach(last30Days, id: \.self) { date in
                    let count = history[date] ?? 0
                    RoundedRectangle(cornerRadius: 2)
                        .fill(heatColor(count))
                        .frame(height: 16)
                }
            }

            HStack(spacing: 4) {
                Text("Less")
                    .font(.mono(9))
                    .foregroundStyle(Color.textDim)
                ForEach([0, 1, 5, 10, 20], id: \.self) { level in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(heatColor(level))
                        .frame(width: 12, height: 12)
                }
                Text("More")
                    .font(.mono(9))
                    .foregroundStyle(Color.textDim)
            }
        }
        .terminalCard()
    }

    private var last30Days: [String] {
        (0..<30).reversed().map { offset in
            let date = Calendar.current.date(byAdding: .day, value: -offset, to: Date())!
            return SRSEngine.toDateString(date)
        }
    }

    private func heatColor(_ count: Int) -> Color {
        if count == 0 { return Color.terminalBorder }
        if count < 3 { return Color.emerald.opacity(0.3) }
        if count < 8 { return Color.emerald.opacity(0.5) }
        if count < 15 { return Color.emerald.opacity(0.7) }
        return Color.emerald
    }
}

// MARK: - Gamification Banner

struct GamificationBanner: View {
    let gamification: GamificationState

    var body: some View {
        HStack(spacing: 16) {
            // Level badge
            VStack(spacing: 2) {
                Text("LVL \(gamification.level)")
                    .font(.mono(18, weight: .bold))
                    .foregroundStyle(gamification.levelTitle.color)
                Text(gamification.levelTitle.rawValue.uppercased())
                    .font(.mono(9, weight: .bold))
                    .foregroundStyle(Color.textMuted)
            }

            // XP bar
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text("\(gamification.totalXP) XP")
                        .font(.mono(12, weight: .bold))
                        .foregroundStyle(Color.amber)
                    Spacer()
                    if gamification.xpToNextLevel > 0 {
                        Text("\(gamification.xpToNextLevel) to next")
                            .font(.mono(9))
                            .foregroundStyle(Color.textDim)
                    }
                }

                // Progress bar
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 3)
                            .fill(Color.terminalBorder)
                            .frame(height: 6)
                        RoundedRectangle(cornerRadius: 3)
                            .fill(Color.amber)
                            .frame(width: geo.size.width * gamification.levelProgress, height: 6)
                    }
                }
                .frame(height: 6)
            }
        }
        .terminalCard()
    }
}

// MARK: - Medal Counts Row

struct MedalCountsRow: View {
    let gamification: GamificationState

    var body: some View {
        HStack(spacing: 16) {
            medalItem(.gold, count: gamification.medalCount(.gold))
            medalItem(.silver, count: gamification.medalCount(.silver))
            medalItem(.bronze, count: gamification.medalCount(.bronze))
            Spacer()
        }
        .terminalCard()
    }

    private func medalItem(_ medal: Medal, count: Int) -> some View {
        HStack(spacing: 6) {
            Image(systemName: medal.icon)
                .font(.system(size: 14))
                .foregroundStyle(medal.color)
            Text("\(count)")
                .font(.mono(14, weight: .bold))
                .foregroundStyle(Color.textPrimary)
        }
    }
}

// MARK: - Knowledge Map

struct KnowledgeMapView: View {
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("KNOWLEDGE MAP")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            ForEach(DomainContent.allDomains) { domain in
                VStack(alignment: .leading, spacing: 4) {
                    Text(domain.name.uppercased())
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(domain.id.color)

                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 4), count: 10), spacing: 4) {
                        ForEach(domain.modules) { mod in
                            let mastery = store.moduleMastery(domain: domain.id, slug: mod.slug)
                            let strength = mastery.map { MasteryEngine.getModuleStrength($0, cards: store.state.cards) } ?? 0
                            let phase = mastery?.phase ?? .locked

                            RoundedRectangle(cornerRadius: 3)
                                .fill(MasteryEngine.phaseColor(phase, strength: strength))
                                .frame(height: 20)
                                .overlay(
                                    Text("\(mod.id)")
                                        .font(.mono(8, weight: .bold))
                                        .foregroundStyle(phase == .locked ? Color.textDim : Color.terminalBg)
                                )
                        }
                    }
                }
            }
        }
        .terminalCard()
    }
}
