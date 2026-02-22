import SwiftUI

struct LabelDiagramView: View {
    let question: PracticeQuestion
    let onAnswer: (Bool) -> Void

    @State private var labelOffsets: [String: CGSize] = [:]
    @State private var showResult = false
    @State private var correctCount = 0
    @State private var draggedLabel: String? = nil

    private var labels: [LabelPosition] {
        question.labelPositions ?? []
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(question.prompt)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            // Diagram area
            GeometryReader { geo in
                let w = geo.size.width
                let h = geo.size.height

                ZStack {
                    // Background diagram
                    if let diagramType = question.diagramType, let diagramConfig = question.diagramConfig {
                        DiagramFactory.makeDiagram(type: diagramType, config: diagramConfig, stepIndex: 0)
                    } else {
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.terminalSurface)
                    }

                    // Target zones (shown after result)
                    if showResult {
                        ForEach(labels) { label in
                            Circle()
                                .stroke(Color.emerald.opacity(0.5), lineWidth: 1)
                                .frame(width: label.snapRadius * 2, height: label.snapRadius * 2)
                                .position(x: label.correctX * w, y: label.correctY * h)

                            Text(label.label)
                                .font(.mono(8, weight: .bold))
                                .foregroundStyle(Color.emerald)
                                .position(x: label.correctX * w, y: label.correctY * h - label.snapRadius - 10)
                        }
                    }
                }
            }
            .frame(height: 200)
            .clipShape(RoundedRectangle(cornerRadius: 8))
            .overlay(
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.terminalBorder, lineWidth: 1)
            )

            // Draggable labels
            if !showResult {
                Text("Drag labels to the correct positions:")
                    .font(.mono(11))
                    .foregroundStyle(Color.textDim)

                LazyVGrid(columns: [GridItem(.adaptive(minimum: 80))], spacing: 8) {
                    ForEach(labels) { label in
                        Text(label.label)
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 6)
                            .background(draggedLabel == label.label ? Color.amber.opacity(0.2) : Color.terminalSurface)
                            .cornerRadius(6)
                            .overlay(
                                RoundedRectangle(cornerRadius: 6)
                                    .stroke(draggedLabel == label.label ? Color.amber : Color.terminalBorder, lineWidth: 1)
                            )
                            .offset(labelOffsets[label.label] ?? .zero)
                            .gesture(
                                DragGesture()
                                    .onChanged { value in
                                        draggedLabel = label.label
                                        labelOffsets[label.label] = value.translation
                                    }
                                    .onEnded { _ in
                                        draggedLabel = nil
                                    }
                            )
                    }
                }

                Button {
                    checkAnswer()
                } label: {
                    Text("Check Labels")
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
                        Image(systemName: correctCount == labels.count ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundStyle(correctCount == labels.count ? Color.emerald : Color.danger)
                        Text("\(correctCount)/\(labels.count) correct")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(correctCount == labels.count ? Color.emerald : Color.amber)
                    }

                    Text(question.explanation)
                        .font(.mono(11))
                        .foregroundStyle(Color.textMuted)
                }
                .padding(12)
                .background(Color.terminalSurface)
                .cornerRadius(8)
            }
        }
    }

    private func checkAnswer() {
        // Simplified check — in a real implementation would compare drag positions to targets
        correctCount = labels.count / 2  // Placeholder
        showResult = true
        let isCorrect = correctCount == labels.count
        let impact = UIImpactFeedbackGenerator(style: isCorrect ? .light : .heavy)
        impact.impactOccurred()

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            onAnswer(isCorrect)
        }
    }
}
