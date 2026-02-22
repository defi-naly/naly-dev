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
            let positions = nodePositions(usableWidth: usableWidth, padding: padding)

            ZStack {
                // Track line
                Path { path in
                    path.move(to: CGPoint(x: padding, y: trackY))
                    path.addLine(to: CGPoint(x: w - padding, y: trackY))
                }
                .stroke(Color.terminalBorder, lineWidth: 2)

                // Colored track segments between nodes
                if revealedNodes > 0 {
                    ForEach(0..<min(revealedNodes, segments.count), id: \.self) { i in
                        if i < segments.count - 1, i + 1 < positions.count {
                            let startX = positions[i]
                            let endX = positions[i + 1]
                            let segColor = Color(hex: segments[i].color)
                            Path { path in
                                path.move(to: CGPoint(x: startX, y: trackY))
                                path.addLine(to: CGPoint(x: endX, y: trackY))
                            }
                            .stroke(segColor, lineWidth: 3)
                            .shadow(color: segColor.opacity(0.4), radius: 3)
                        }
                    }
                }

                // Nodes and labels
                ForEach(Array(segments.enumerated()), id: \.element.id) { index, segment in
                    let x = index < positions.count ? positions[index] : padding
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
                        .frame(width: max(usableWidth / max(CGFloat(segments.count), 1) - 4, 60))
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

    /// Compute node X positions proportional to segment values.
    /// Falls back to equal spacing if all values are zero.
    private func nodePositions(usableWidth: CGFloat, padding: CGFloat) -> [CGFloat] {
        guard segments.count > 1 else {
            return segments.isEmpty ? [] : [padding + usableWidth / 2]
        }

        let totalValue = segments.reduce(CGFloat(0)) { $0 + max($1.value, 0) }

        // If no meaningful values, use equal spacing
        if totalValue <= 0 {
            let spacing = usableWidth / CGFloat(segments.count - 1)
            return (0..<segments.count).map { padding + CGFloat($0) * spacing }
        }

        // Proportional spacing: each gap between nodes is proportional to the segment value
        var positions: [CGFloat] = [padding]
        var cumulative: CGFloat = 0
        for i in 0..<segments.count - 1 {
            cumulative += max(segments[i].value, 0)
            positions.append(padding + (cumulative / totalValue) * usableWidth)
        }
        return positions
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
