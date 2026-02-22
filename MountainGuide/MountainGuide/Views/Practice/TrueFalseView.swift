import SwiftUI

struct TrueFalseView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var selectedAnswer: Bool? = nil
    @State private var showResult = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            // Statement
            if let statement = question.statement {
                Text("\"\(statement)\"")
                    .font(.mono(14))
                    .italic()
                    .foregroundStyle(Color.textPrimary)
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.terminalSurface)
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.terminalBorder, lineWidth: 1)
                    )
            }

            // True / False buttons
            HStack(spacing: 12) {
                tfButton(label: "TRUE", value: true)
                tfButton(label: "FALSE", value: false)
            }

            if showResult {
                let isCorrect = selectedAnswer == question.isTrue

                VStack(alignment: .leading, spacing: 8) {
                    HStack(spacing: 8) {
                        Image(systemName: isCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
                        Text(isCorrect ? "Correct!" : "Incorrect")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
                    }

                    if let reasoning = question.reasoning {
                        Text(reasoning)
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
                .transition(.opacity.combined(with: .move(edge: .bottom)))
            }
        }
    }

    private func tfButton(label: String, value: Bool) -> some View {
        Button {
            guard !showResult else { return }
            selectedAnswer = value
            showResult = true

            let isCorrect = value == question.isTrue
            let impact = UIImpactFeedbackGenerator(style: isCorrect ? .light : .heavy)
            impact.impactOccurred()

            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                onAnswer(isCorrect)
            }
        } label: {
            Text(label)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(buttonTextColor(value: value))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 20)
                .background(buttonBackground(value: value))
                .cornerRadius(10)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(buttonBorder(value: value), lineWidth: 2)
                )
        }
        .disabled(showResult)
    }

    private func buttonTextColor(value: Bool) -> Color {
        guard showResult, let selected = selectedAnswer else { return .textPrimary }
        if value == question.isTrue { return .emerald }
        if value == selected { return .danger }
        return .textDim
    }

    private func buttonBackground(value: Bool) -> Color {
        guard showResult, let selected = selectedAnswer else { return .terminalSurface }
        if value == question.isTrue { return Color.emerald.opacity(0.1) }
        if value == selected { return Color.danger.opacity(0.1) }
        return .terminalSurface
    }

    private func buttonBorder(value: Bool) -> Color {
        guard showResult, let selected = selectedAnswer else { return .terminalBorder }
        if value == question.isTrue { return .emerald }
        if value == selected { return .danger }
        return .terminalBorder
    }
}
