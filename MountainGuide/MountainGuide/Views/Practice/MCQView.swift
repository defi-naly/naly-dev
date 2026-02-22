import SwiftUI

struct MCQView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var selectedIndex: Int? = nil
    @State private var showResult = false

    private var options: [PracticeOption] {
        question.options ?? []
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            ForEach(Array(options.enumerated()), id: \.offset) { index, option in
                Button {
                    guard !showResult else { return }
                    selectedIndex = index
                    showResult = true
                    let impact = UIImpactFeedbackGenerator(style: option.correct ? .light : .heavy)
                    impact.impactOccurred()

                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                        onAnswer(option.correct)
                    }
                } label: {
                    HStack(alignment: .top, spacing: 12) {
                        optionIcon(index: index, option: option)
                            .frame(width: 24)

                        VStack(alignment: .leading, spacing: 4) {
                            Text(option.label)
                                .font(.mono(13))
                                .foregroundStyle(Color.textPrimary)
                                .multilineTextAlignment(.leading)

                            if showResult && selectedIndex == index {
                                Text(option.explanation)
                                    .font(.mono(11))
                                    .foregroundStyle(option.correct ? Color.emerald : Color.textMuted)
                                    .transition(.opacity)
                            }
                        }
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(optionBackground(index: index, option: option))
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(optionBorder(index: index, option: option), lineWidth: 1)
                    )
                }
                .disabled(showResult)
            }

            if showResult {
                HStack(spacing: 8) {
                    Image(systemName: options[selectedIndex ?? 0].correct ? "checkmark.circle.fill" : "xmark.circle.fill")
                        .foregroundStyle(options[selectedIndex ?? 0].correct ? Color.emerald : Color.danger)
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

    @ViewBuilder
    private func optionIcon(index: Int, option: PracticeOption) -> some View {
        if showResult {
            if option.correct {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 16))
                    .foregroundStyle(Color.emerald)
            } else if selectedIndex == index {
                Image(systemName: "xmark.circle.fill")
                    .font(.system(size: 16))
                    .foregroundStyle(Color.danger)
            } else {
                Image(systemName: "circle")
                    .font(.system(size: 16))
                    .foregroundStyle(Color.textDim)
            }
        } else {
            Image(systemName: "circle")
                .font(.system(size: 16))
                .foregroundStyle(Color.textMuted)
        }
    }

    private func optionBackground(index: Int, option: PracticeOption) -> Color {
        guard showResult else { return .terminalSurface }
        if option.correct { return Color.emerald.opacity(0.1) }
        if selectedIndex == index { return Color.danger.opacity(0.1) }
        return .terminalSurface
    }

    private func optionBorder(index: Int, option: PracticeOption) -> Color {
        guard showResult else { return .terminalBorder }
        if option.correct { return .emerald.opacity(0.5) }
        if selectedIndex == index { return .danger.opacity(0.5) }
        return .terminalBorder
    }
}
