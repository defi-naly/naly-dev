import SwiftUI

struct CalculationView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var userInput = ""
    @State private var showResult = false
    @State private var isCorrect = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            // Input field
            HStack(spacing: 12) {
                TextField("Answer", text: $userInput)
                    .font(.mono(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                    .keyboardType(.decimalPad)
                    .padding(12)
                    .background(Color.terminalSurface)
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(showResult ? (isCorrect ? Color.emerald : Color.danger) : Color.terminalBorder, lineWidth: 1)
                    )
                    .disabled(showResult)

                if let unit = question.answerUnit {
                    Text(unit)
                        .font(.mono(14, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                }
            }

            if !showResult {
                Button {
                    checkAnswer()
                } label: {
                    Text("Check")
                        .font(.mono(14, weight: .bold))
                        .foregroundStyle(Color.terminalBg)
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
                        if isCorrect {
                            Text("Correct!")
                                .font(.mono(13, weight: .bold))
                                .foregroundStyle(Color.emerald)
                        } else {
                            let answer = question.correctAnswer ?? 0
                            let tolerance = question.tolerance ?? 0
                            Text("Answer: \(Int(answer))\(tolerance > 0 ? " (±\(Int(tolerance)))" : "")")
                                .font(.mono(13, weight: .bold))
                                .foregroundStyle(Color.danger)
                        }
                    }

                    Text(question.explanation)
                        .font(.mono(11))
                        .foregroundStyle(Color.textMuted)
                }
                .padding(12)
                .background(Color.terminalSurface)
                .cornerRadius(8)
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }
        }
    }

    private func checkAnswer() {
        guard let userValue = Double(userInput),
              let correctAnswer = question.correctAnswer else {
            isCorrect = false
            showResult = true
            onAnswer(false)
            return
        }

        let tolerance = question.tolerance ?? 0
        isCorrect = abs(userValue - correctAnswer) <= tolerance
        showResult = true

        let impact = UIImpactFeedbackGenerator(style: isCorrect ? .light : .heavy)
        impact.impactOccurred()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            onAnswer(isCorrect)
        }
    }
}
