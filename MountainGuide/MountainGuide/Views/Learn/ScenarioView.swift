import SwiftUI

struct ScenarioView: View {
    @EnvironmentObject var store: KnowledgeStore
    @Environment(\.dismiss) private var dismiss
    let scenario: Scenario

    @State private var currentNodeId: String
    @State private var choiceHistory: [(node: String, choice: String)] = []
    @State private var showFeedback: String? = nil

    init(scenario: Scenario) {
        self.scenario = scenario
        _currentNodeId = State(initialValue: scenario.startNodeId)
    }

    private var currentNode: ScenarioNode? {
        scenario.nodes[currentNodeId]
    }

    private var isUnlocked: Bool {
        scenario.requirements.allSatisfy { req in
            let mastery = store.moduleMastery(domain: req.domain, slug: req.moduleSlug)
            return mastery?.completedAt != nil
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if !isUnlocked {
                    lockedView
                } else if let node = currentNode {
                    if node.isTerminal {
                        terminalView(node)
                    } else {
                        narrativeView(node)
                    }
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle(scenario.title)
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - Locked

    private var lockedView: some View {
        VStack(spacing: 16) {
            Image(systemName: "lock.fill")
                .font(.system(size: 36))
                .foregroundStyle(Color.textDim)

            Text("Complete these modules to unlock:")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            ForEach(scenario.requirements, id: \.moduleSlug) { req in
                let completed = store.moduleMastery(domain: req.domain, slug: req.moduleSlug)?.completedAt != nil
                HStack(spacing: 8) {
                    Image(systemName: completed ? "checkmark.circle.fill" : "circle")
                        .foregroundStyle(completed ? Color.emerald : Color.textDim)
                    Text("\(req.domain.rawValue.capitalized): \(req.moduleSlug.replacingOccurrences(of: "-", with: " ").capitalized)")
                        .font(.mono(12))
                        .foregroundStyle(completed ? Color.textPrimary : Color.textDim)
                }
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 40)
    }

    // MARK: - Narrative

    private func narrativeView(_ node: ScenarioNode) -> some View {
        VStack(alignment: .leading, spacing: 20) {
            // Breadcrumb
            if !choiceHistory.isEmpty {
                Text("Decision \(choiceHistory.count + 1)")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(Color.amber)
            }

            Text(node.narrative)
                .font(.mono(14))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            if let feedback = showFeedback {
                Text(feedback)
                    .font(.mono(12))
                    .foregroundStyle(Color.textMuted)
                    .padding(12)
                    .background(Color.terminalSurface)
                    .cornerRadius(8)
                    .transition(.opacity)
            }

            if let choices = node.choices {
                ForEach(Array(choices.enumerated()), id: \.offset) { _, choice in
                    Button {
                        choiceHistory.append((node: currentNodeId, choice: choice.label))
                        withAnimation {
                            showFeedback = choice.feedback
                        }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                            withAnimation {
                                showFeedback = nil
                                currentNodeId = choice.nextNodeId
                            }
                        }

                        let impact = UIImpactFeedbackGenerator(style: choice.optimal ? .light : .medium)
                        impact.impactOccurred()
                    } label: {
                        HStack(alignment: .top, spacing: 8) {
                            Image(systemName: "chevron.right.circle")
                                .foregroundStyle(Color.amber)
                            Text(choice.label)
                                .font(.mono(13))
                                .foregroundStyle(Color.textPrimary)
                                .multilineTextAlignment(.leading)
                        }
                        .padding(14)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color.terminalSurface)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.terminalBorder, lineWidth: 1)
                        )
                    }
                    .disabled(showFeedback != nil)
                }
            }
        }
    }

    // MARK: - Terminal (Score Screen)

    private func terminalView(_ node: ScenarioNode) -> some View {
        VStack(spacing: 24) {
            // Score
            ZStack {
                Circle()
                    .stroke(Color.terminalBorder, lineWidth: 6)
                    .frame(width: 100, height: 100)
                Circle()
                    .trim(from: 0, to: Double(node.score ?? 0) / 100)
                    .stroke(scoreColor(node.score ?? 0), style: StrokeStyle(lineWidth: 6, lineCap: .round))
                    .frame(width: 100, height: 100)
                    .rotationEffect(.degrees(-90))
                VStack(spacing: 2) {
                    Text("\(node.score ?? 0)")
                        .font(.mono(28, weight: .bold))
                        .foregroundStyle(Color.textPrimary)
                    Text("SCORE")
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                }
            }

            // Outcome narrative
            Text(node.narrative)
                .font(.mono(14))
                .foregroundStyle(Color.textPrimary)
                .multilineTextAlignment(.center)

            // Lessons
            if let lessons = node.lessons, !lessons.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("LESSONS LEARNED")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.amber)

                    ForEach(Array(lessons.enumerated()), id: \.offset) { _, lesson in
                        HStack(alignment: .top, spacing: 8) {
                            Text("•")
                                .foregroundStyle(Color.amber)
                            Text(lesson)
                                .font(.mono(12))
                                .foregroundStyle(Color.textPrimary)
                        }
                    }
                }
                .terminalCard()
            }

            // Decision history
            if !choiceHistory.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("YOUR DECISIONS")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)

                    ForEach(Array(choiceHistory.enumerated()), id: \.offset) { index, entry in
                        HStack(alignment: .top, spacing: 8) {
                            Text("\(index + 1).")
                                .font(.mono(11, weight: .bold))
                                .foregroundStyle(Color.textDim)
                                .frame(width: 20)
                            Text(entry.choice)
                                .font(.mono(11))
                                .foregroundStyle(Color.textPrimary)
                        }
                    }
                }
                .terminalCard()
            }

            // Restart / Back
            HStack(spacing: 12) {
                Button {
                    currentNodeId = scenario.startNodeId
                    choiceHistory = []
                } label: {
                    HStack {
                        Image(systemName: "arrow.counterclockwise")
                        Text("Replay")
                    }
                    .font(.mono(13, weight: .bold))
                    .foregroundStyle(Color.amber)
                    .padding(.vertical, 12)
                    .frame(maxWidth: .infinity)
                    .background(Color.terminalSurface)
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.amber.opacity(0.3), lineWidth: 1)
                    )
                }

                Button {
                    dismiss()
                } label: {
                    Text("Done")
                        .font(.mono(13, weight: .bold))
                        .foregroundStyle(.white)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity)
                        .background(Color.amber)
                        .cornerRadius(8)
                }
            }
        }
    }

    private func scoreColor(_ score: Int) -> Color {
        if score < 30 { return .danger }
        if score < 60 { return .amber }
        return .emerald
    }
}
