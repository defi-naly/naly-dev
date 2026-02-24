import SwiftUI

struct SequenceOrderView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var items: [String] = []
    @State private var showResult = false
    @State private var isCorrect = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            Text("Drag to reorder:")
                .font(.mono(11))
                .foregroundStyle(Color.textDim)

            // Reorderable list
            ForEach(Array(items.enumerated()), id: \.element) { index, item in
                HStack(spacing: 12) {
                    Text("\(index + 1)")
                        .font(.mono(12, weight: .bold))
                        .foregroundStyle(itemColor(index: index))
                        .frame(width: 24)

                    Text(item)
                        .font(.mono(13))
                        .foregroundStyle(Color.textPrimary)

                    Spacer()

                    if !showResult {
                        Image(systemName: "line.3.horizontal")
                            .foregroundStyle(Color.textDim)
                    } else {
                        let correctPos = question.correctOrder?.firstIndex(of: item) ?? 0
                        Image(systemName: correctPos == index ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundStyle(correctPos == index ? Color.emerald : Color.danger)
                    }
                }
                .padding(10)
                .background(Color.terminalSurface)
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(itemBorderColor(index: index), lineWidth: 1)
                )
            }
            .onMove { from, to in
                guard !showResult else { return }
                items.move(fromOffsets: from, toOffset: to)
            }

            if !showResult {
                Button {
                    checkAnswer()
                } label: {
                    Text("Check Order")
                        .font(.mono(14, weight: .bold))
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Color.amber)
                        .cornerRadius(10)
                }
            } else {
                VStack(alignment: .leading, spacing: 8) {
                    HStack(spacing: 8) {
                        Image(systemName: isCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
                        Text(isCorrect ? "Correct order!" : "Not quite right")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
                    }

                    if !isCorrect, let correct = question.correctOrder {
                        Text("Correct order: \(correct.joined(separator: " → "))")
                            .font(.mono(11))
                            .foregroundStyle(Color.textMuted)
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
            items = question.shuffledItems ?? question.correctOrder?.shuffled() ?? []
        }
    }

    private func checkAnswer() {
        isCorrect = items == (question.correctOrder ?? [])
        showResult = true

        let impact = UIImpactFeedbackGenerator(style: isCorrect ? .light : .heavy)
        impact.impactOccurred()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            onAnswer(isCorrect)
        }
    }

    private func itemColor(index: Int) -> Color {
        guard showResult else { return .amber }
        let correctPos = question.correctOrder?.firstIndex(of: items[index]) ?? -1
        return correctPos == index ? .emerald : .danger
    }

    private func itemBorderColor(index: Int) -> Color {
        guard showResult else { return .terminalBorder }
        let correctPos = question.correctOrder?.firstIndex(of: items[index]) ?? -1
        return correctPos == index ? .emerald.opacity(0.5) : .danger.opacity(0.5)
    }
}
