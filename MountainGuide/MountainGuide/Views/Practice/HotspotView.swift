import SwiftUI

struct HotspotView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var tappedPoint: CGPoint? = nil
    @State private var showResult = false
    @State private var isCorrect = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            Text("Tap the correct area:")
                .font(.mono(11))
                .foregroundStyle(Color.textDim)

            // Diagram area
            GeometryReader { geo in
                let w = geo.size.width
                let h = geo.size.height

                ZStack {
                    if let diagramType = question.diagramType, let diagramConfig = question.diagramConfig {
                        DiagramFactory.makeDiagram(type: diagramType, config: diagramConfig, stepIndex: 0)
                    } else {
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.terminalSurface)
                    }

                    // Correct zone (shown after result)
                    if showResult {
                        let targetX = (question.hotspotX ?? 0.5) * w
                        let targetY = (question.hotspotY ?? 0.5) * h
                        let radius = (question.hotspotRadius ?? 0.1) * min(w, h)

                        Circle()
                            .stroke(Color.emerald, lineWidth: 2)
                            .frame(width: radius * 2, height: radius * 2)
                            .position(x: targetX, y: targetY)
                    }

                    // User tap marker
                    if let point = tappedPoint {
                        Circle()
                            .fill(isCorrect ? Color.emerald.opacity(0.4) : Color.danger.opacity(0.4))
                            .frame(width: 30, height: 30)
                            .position(point)
                            .overlay(
                                Circle()
                                    .stroke(isCorrect ? Color.emerald : Color.danger, lineWidth: 2)
                                    .frame(width: 30, height: 30)
                                    .position(point)
                            )
                    }
                }
                .contentShape(Rectangle())
                .onTapGesture { location in
                    guard !showResult else { return }
                    tappedPoint = location
                    checkAnswer(tapX: location.x / w, tapY: location.y / h)
                }
            }
            .frame(height: 220)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.terminalBorder, lineWidth: 1)
            )

            if showResult {
                VStack(alignment: .leading, spacing: 8) {
                    HStack(spacing: 8) {
                        Image(systemName: isCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
                        Text(isCorrect ? "Correct!" : "Not quite")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(isCorrect ? Color.emerald : Color.danger)
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

    private func checkAnswer(tapX: CGFloat, tapY: CGFloat) {
        let targetX = question.hotspotX ?? 0.5
        let targetY = question.hotspotY ?? 0.5
        let radius = question.hotspotRadius ?? 0.1

        let distance = sqrt(pow(tapX - targetX, 2) + pow(tapY - targetY, 2))
        isCorrect = distance <= radius
        showResult = true

        let impact = UIImpactFeedbackGenerator(style: isCorrect ? .light : .heavy)
        impact.impactOccurred()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            onAnswer(isCorrect)
        }
    }
}
