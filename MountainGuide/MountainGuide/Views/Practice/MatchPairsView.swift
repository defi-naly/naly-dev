import SwiftUI

struct MatchPairsView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var selectedLeft: String? = nil
    @State private var matchedPairs: [String: String] = [:]   // left → right
    @State private var wrongPair: (String, String)? = nil
    @State private var showResult = false

    private var pairs: [MatchPair] {
        question.matchPairs ?? []
    }

    @State private var shuffledRight: [String] = []

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            // Matching grid
            HStack(alignment: .top, spacing: 12) {
                // Left column
                VStack(spacing: 8) {
                    ForEach(pairs) { pair in
                        let isMatched = matchedPairs[pair.left] != nil
                        let isSelected = selectedLeft == pair.left
                        let isWrong = wrongPair?.0 == pair.left

                        Button {
                            guard !showResult, !isMatched else { return }
                            selectedLeft = pair.left
                        } label: {
                            Text(pair.left)
                                .font(.mono(11, weight: .medium))
                                .foregroundStyle(isMatched ? Color.emerald : (isSelected ? Color.amber : Color.textPrimary))
                                .padding(.horizontal, 10)
                                .padding(.vertical, 8)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(
                                    isMatched ? Color.emerald.opacity(0.1) :
                                    isSelected ? Color.amber.opacity(0.15) :
                                    isWrong ? Color.danger.opacity(0.1) :
                                    Color.terminalSurface
                                )
                                .cornerRadius(6)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 6)
                                        .stroke(
                                            isMatched ? Color.emerald.opacity(0.5) :
                                            isSelected ? Color.amber :
                                            isWrong ? Color.danger :
                                            Color.terminalBorder,
                                            lineWidth: 1
                                        )
                                )
                        }
                        .disabled(isMatched || showResult)
                    }
                }
                .frame(maxWidth: .infinity)

                // Connection indicator
                VStack {
                    Spacer()
                    Image(systemName: "arrow.right")
                        .foregroundStyle(Color.textDim)
                    Spacer()
                }
                .frame(width: 20)

                // Right column
                VStack(spacing: 8) {
                    ForEach(shuffledRight, id: \.self) { rightItem in
                        let isMatched = matchedPairs.values.contains(rightItem)
                        let isWrong = wrongPair?.1 == rightItem

                        Button {
                            guard !showResult, !isMatched, selectedLeft != nil else { return }
                            attemptMatch(rightItem: rightItem)
                        } label: {
                            Text(rightItem)
                                .font(.mono(11, weight: .medium))
                                .foregroundStyle(isMatched ? Color.emerald : Color.textPrimary)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 8)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(
                                    isMatched ? Color.emerald.opacity(0.1) :
                                    isWrong ? Color.danger.opacity(0.1) :
                                    Color.terminalSurface
                                )
                                .cornerRadius(6)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 6)
                                        .stroke(
                                            isMatched ? Color.emerald.opacity(0.5) :
                                            isWrong ? Color.danger :
                                            Color.terminalBorder,
                                            lineWidth: 1
                                        )
                                )
                        }
                        .disabled(isMatched || showResult)
                    }
                }
                .frame(maxWidth: .infinity)
            }

            if showResult {
                VStack(alignment: .leading, spacing: 8) {
                    let correctCount = matchedPairs.count
                    HStack(spacing: 8) {
                        Image(systemName: correctCount == pairs.count ? "checkmark.circle.fill" : "info.circle.fill")
                            .foregroundStyle(correctCount == pairs.count ? Color.emerald : Color.amber)
                        Text("\(correctCount)/\(pairs.count) matched")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(correctCount == pairs.count ? Color.emerald : Color.amber)
                    }

                    Text(question.explanation)
                        .font(.mono(11))
                        .foregroundStyle(Color.textMuted)
                }
                .padding(12)
                .background(Color.terminalSurface)
                .cornerRadius(8)
                .transition(.opacity)
            }
        }
        .onAppear {
            shuffledRight = pairs.map(\.right).shuffled()
        }
    }

    private func attemptMatch(rightItem: String) {
        guard let left = selectedLeft else { return }

        let correctRight = pairs.first(where: { $0.left == left })?.right

        if correctRight == rightItem {
            matchedPairs[left] = rightItem
            selectedLeft = nil
            wrongPair = nil

            let impact = UIImpactFeedbackGenerator(style: .light)
            impact.impactOccurred()

            // Check if all matched
            if matchedPairs.count == pairs.count {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    showResult = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                        onAnswer(true)
                    }
                }
            }
        } else {
            wrongPair = (left, rightItem)
            let impact = UIImpactFeedbackGenerator(style: .heavy)
            impact.impactOccurred()

            DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                wrongPair = nil
                selectedLeft = nil
            }
        }
    }
}
