import SwiftUI

struct DomainListView: View {
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    ForEach(DomainContent.allDomains) { domain in
                        NavigationLink {
                            ModuleListView(domain: domain)
                                .environmentObject(store)
                        } label: {
                            DomainCard(
                                domain: domain,
                                strength: store.domainStrength(domain.id),
                                completed: store.completedModuleCount(domainId: domain.id)
                            )
                        }
                    }

                    // Scenarios section
                    VStack(alignment: .leading, spacing: 12) {
                        Text("SCENARIOS")
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.textMuted)

                        ForEach(ScenarioContent.allScenarios) { scenario in
                            NavigationLink {
                                ScenarioView(scenario: scenario)
                                    .environmentObject(store)
                            } label: {
                                ScenarioCard(scenario: scenario, store: store)
                            }
                        }
                    }
                    .padding(.top, 8)
                }
                .padding()
            }
            .background(Color.terminalBg)
            .navigationTitle("Learn")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarColorScheme(.dark, for: .navigationBar)
        }
    }
}

// MARK: - Domain Card

struct DomainCard: View {
    let domain: Domain
    let strength: Int
    let completed: Int

    var body: some View {
        HStack(spacing: 16) {
            // Icon
            ZStack {
                Circle()
                    .fill(domain.id.color.opacity(0.15))
                    .frame(width: 52, height: 52)
                Image(systemName: domain.id.icon)
                    .font(.system(size: 22))
                    .foregroundStyle(domain.id.color)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(domain.name)
                    .font(.mono(16, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text(domain.subtitle)
                    .font(.mono(12))
                    .foregroundStyle(Color.textMuted)
                Text("\(completed)/\(domain.modules.count) modules")
                    .font(.mono(11))
                    .foregroundStyle(Color.textDim)
            }

            Spacer()

            // Strength ring
            ZStack {
                Circle()
                    .stroke(Color.terminalBorder, lineWidth: 4)
                    .frame(width: 40, height: 40)
                Circle()
                    .trim(from: 0, to: Double(strength) / 100)
                    .stroke(domain.id.color, style: StrokeStyle(lineWidth: 4, lineCap: .round))
                    .frame(width: 40, height: 40)
                    .rotationEffect(.degrees(-90))
                Text("\(strength)")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
            }
        }
        .terminalCard()
    }
}

// MARK: - Module List View

struct ModuleListView: View {
    @EnvironmentObject var store: KnowledgeStore
    let domain: Domain

    var body: some View {
        ScrollView {
            VStack(spacing: 2) {
                // Domain header
                VStack(spacing: 8) {
                    Image(systemName: domain.id.icon)
                        .font(.system(size: 28))
                        .foregroundStyle(domain.id.color)
                    Text(domain.subtitle)
                        .font(.mono(14))
                        .foregroundStyle(Color.textMuted)
                    Text("Based on \"\(domain.book)\" by \(domain.author)")
                        .font(.mono(11))
                        .foregroundStyle(Color.textDim)
                        .multilineTextAlignment(.center)
                }
                .padding(.vertical, 16)

                // Modules
                ForEach(domain.modules) { mod in
                    let mastery = store.moduleMastery(domain: domain.id, slug: mod.slug)
                    let phase = mastery?.phase ?? .locked
                    let strength = mastery.map { MasteryEngine.getModuleStrength($0, cards: store.state.cards) } ?? 0
                    let moduleKey = "\(domain.id.rawValue)-\(mod.slug)"
                    let medal = store.state.gamification.moduleScores[moduleKey]?.bestMedal ?? .none

                    NavigationLink {
                        if let lesson = LessonContentData.getLesson(domain: domain.id, slug: mod.slug) {
                            LessonView(module: mod, domain: domain, lesson: lesson)
                                .environmentObject(store)
                        } else {
                            ModuleDetailView(module: mod, domain: domain)
                                .environmentObject(store)
                        }
                    } label: {
                        ModuleRow(module: mod, phase: phase, strength: strength, domainColor: domain.id.color, medal: medal)
                    }
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle(domain.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.dark, for: .navigationBar)
    }
}

// MARK: - Module Row

struct ModuleRow: View {
    let module: Module
    let phase: MasteryPhase
    let strength: Int
    let domainColor: Color
    var medal: Medal = .none

    var body: some View {
        HStack(spacing: 12) {
            // Module number
            ZStack {
                Circle()
                    .fill(MasteryEngine.phaseColor(phase, strength: strength).opacity(0.2))
                    .frame(width: 36, height: 36)
                Text("\(module.id)")
                    .font(.mono(14, weight: .bold))
                    .foregroundStyle(MasteryEngine.phaseColor(phase, strength: strength))
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(module.title)
                    .font(.mono(14, weight: .medium))
                    .foregroundStyle(Color.textPrimary)
                    .lineLimit(1)
                HStack(spacing: 8) {
                    Text(phase.label)
                        .font(.mono(10))
                        .foregroundStyle(MasteryEngine.phaseColor(phase, strength: strength))
                    Text(module.difficulty.label)
                        .font(.mono(10))
                        .foregroundStyle(module.difficulty.color)
                }
            }

            Spacer()

            // Medal icon (for completed modules)
            if medal != .none {
                Image(systemName: medal.icon)
                    .font(.system(size: 14))
                    .foregroundStyle(medal.color)
            } else if phase != .locked {
                // Strength indicator
                Text("\(strength)%")
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textMuted)
            }

            Image(systemName: "chevron.right")
                .font(.system(size: 12))
                .foregroundStyle(Color.textDim)
        }
        .padding(.vertical, 10)
        .padding(.horizontal, 12)
        .background(Color.terminalSurface)
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.terminalBorder, lineWidth: 0.5)
        )
    }
}

// MARK: - Scenario Card

struct ScenarioCard: View {
    let scenario: Scenario
    let store: KnowledgeStore

    private var isUnlocked: Bool {
        scenario.requirements.allSatisfy { req in
            let mastery = store.moduleMastery(domain: req.domain, slug: req.moduleSlug)
            return mastery?.completedAt != nil
        }
    }

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: isUnlocked ? "map.fill" : "lock.fill")
                .font(.system(size: 16))
                .foregroundStyle(isUnlocked ? Color.amber : Color.textDim)
                .frame(width: 32)

            VStack(alignment: .leading, spacing: 2) {
                Text(scenario.title)
                    .font(.mono(13, weight: .medium))
                    .foregroundStyle(isUnlocked ? Color.textPrimary : Color.textDim)
                HStack(spacing: 8) {
                    Text(scenario.difficulty.rawValue.capitalized)
                        .font(.mono(10))
                        .foregroundStyle(Color.textMuted)
                    ForEach(scenario.domains, id: \.rawValue) { domain in
                        Text(domain.rawValue.capitalized)
                            .font(.mono(9))
                            .foregroundStyle(domain.color)
                            .padding(.horizontal, 4)
                            .padding(.vertical, 1)
                            .background(domain.color.opacity(0.1))
                            .cornerRadius(3)
                    }
                }
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.system(size: 12))
                .foregroundStyle(Color.textDim)
        }
        .padding(12)
        .background(Color.terminalSurface)
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.terminalBorder, lineWidth: 0.5)
        )
        .opacity(isUnlocked ? 1.0 : 0.5)
    }
}
