import SwiftUI

struct TimelineDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var revealedNodes: Int = 0

    private var segments: [DiagramSegment] {
        config.segments ?? []
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let trackY = h * 0.4
            let nodeRadius: CGFloat = 14
            let padding: CGFloat = 30

            let usableWidth = w - padding * 2
            let spacing = segments.count > 1 ? usableWidth / CGFloat(segments.count - 1) : 0

            ZStack {
                // Track line
                Path { path in
                    path.move(to: CGPoint(x: padding, y: trackY))
                    path.addLine(to: CGPoint(x: w - padding, y: trackY))
                }
                .stroke(Color.terminalBorder, lineWidth: 2)

                // Active track line
                if revealedNodes > 0 {
                    let endX = padding + CGFloat(min(revealedNodes - 1, segments.count - 1)) * spacing
                    Path { path in
                        path.move(to: CGPoint(x: padding, y: trackY))
                        path.addLine(to: CGPoint(x: endX, y: trackY))
                    }
                    .stroke(Color.amber, lineWidth: 2)
                    .shadow(color: .amber.opacity(0.4), radius: 3)
                }

                // Nodes and labels
                ForEach(Array(segments.enumerated()), id: \.element.id) { index, segment in
                    let x = padding + CGFloat(index) * spacing
                    let isActive = index < revealedNodes
                    let isCurrent = index == revealedNodes - 1
                    let segmentColor = Color(hex: segment.color)

                    // Node
                    Circle()
                        .fill(isActive ? segmentColor : Color.terminalSurface)
                        .frame(width: nodeRadius * 2, height: nodeRadius * 2)
                        .overlay(
                            Circle()
                                .stroke(isActive ? segmentColor : Color.terminalBorder, lineWidth: 2)
                        )
                        .shadow(color: isCurrent ? segmentColor.opacity(0.5) : .clear, radius: 6)
                        .scaleEffect(isCurrent ? 1.2 : 1.0)
                        .position(x: x, y: trackY)

                    // Duration/value
                    if segment.value > 0 {
                        Text("\(Int(segment.value))m")
                            .font(.mono(8, weight: .bold))
                            .foregroundStyle(isActive ? segmentColor : Color.textDim)
                            .position(x: x, y: trackY)
                    }

                    // Label above
                    Text(segment.label)
                        .font(.mono(9, weight: isActive ? .bold : .regular))
                        .foregroundStyle(isActive ? Color.textPrimary : Color.textDim)
                        .multilineTextAlignment(.center)
                        .frame(width: max(spacing - 4, 60))
                        .position(x: x, y: trackY - nodeRadius - 20)

                    // Description below (when current)
                    if isCurrent {
                        Text(segment.description)
                            .font(.mono(9))
                            .foregroundStyle(Color.textMuted)
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: 140)
                            .position(x: x, y: trackY + nodeRadius + 30)
                            .transition(.opacity.combined(with: .move(edge: .top)))
                    }
                }
            }
        }
        .onAppear { revealNodes() }
        .onChange(of: stepIndex) { _ in revealNodes() }
    }

    private func revealNodes() {
        let target = min(stepIndex + 1, segments.count)
        for i in 0..<target {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * 0.4) {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                    revealedNodes = i + 1
                }
            }
        }
    }
}
