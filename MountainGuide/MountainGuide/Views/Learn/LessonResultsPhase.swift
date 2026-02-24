import SwiftUI

struct LessonResultsPhase: View {
    let xpEarned: Int
    let medal: Medal
    let questionsAttempted: Int
    let questionsCorrect: Int
    let isFirstCompletion: Bool
    let onDismiss: () -> Void
    let onReviewMistakes: (() -> Void)?

    @State private var showMedal = false
    @State private var showStats = false
    @State private var showActions = false

    private var accuracy: Double {
        guard questionsAttempted > 0 else { return 0 }
        return Double(questionsCorrect) / Double(questionsAttempted) * 100
    }

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            // Medal
            if showMedal && medal != .none {
                MedalAwardView(medal: medal)
                    .transition(.scale.combined(with: .opacity))
            }

            // XP Counter
            if showStats {
                VStack(spacing: 8) {
                    AnimatedCounterView(
                        target: xpEarned,
                        prefix: "+",
                        suffix: " XP",
                        font: .mono(32, weight: .bold),
                        color: .amber
                    )

                    if isFirstCompletion {
                        Text("First completion bonus: +\(XPReward.firstCompletion) XP")
                            .font(.mono(10))
                            .foregroundStyle(Color.amber.opacity(0.7))
                    }
                }
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }

            // Stats
            if showStats {
                HStack(spacing: 24) {
                    statItem(value: "\(questionsCorrect)/\(questionsAttempted)", label: "Correct")
                    statItem(value: "\(Int(accuracy))%", label: "Accuracy")
                    statItem(value: medal.label, label: "Medal")
                }
                .transition(.opacity)
            }

            Spacer()

            // Actions
            if showActions {
                VStack(spacing: 12) {
                    if questionsCorrect < questionsAttempted, let onReview = onReviewMistakes {
                        Button {
                            onReview()
                        } label: {
                            HStack {
                                Image(systemName: "arrow.counterclockwise")
                                Text("Review Mistakes")
                                    .font(.mono(13, weight: .medium))
                            }
                            .foregroundStyle(Color.amber)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.amber.opacity(0.1))
                            .cornerRadius(10)
                            .overlay(
                                RoundedRectangle(cornerRadius: 10)
                                    .stroke(Color.amber.opacity(0.3), lineWidth: 1)
                            )
                        }
                    }

                    Button {
                        onDismiss()
                    } label: {
                        HStack {
                            Text("Done")
                                .font(.mono(14, weight: .bold))
                            Image(systemName: "checkmark")
                        }
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.amber)
                        .cornerRadius(10)
                    }
                }
                .padding(.horizontal, 16)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }
        }
        .padding(.bottom, 24)
        .background(Color.terminalBg)
        .onAppear { animateResults() }
    }

    private func statItem(value: String, label: String) -> some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(10))
                .foregroundStyle(Color.textMuted)
        }
    }

    private func animateResults() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                showMedal = true
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            withAnimation(.spring(response: 0.4)) {
                showStats = true
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            withAnimation(.spring(response: 0.4)) {
                showActions = true
            }
        }
    }
}
