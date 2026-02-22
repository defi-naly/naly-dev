import SwiftUI

struct ForceArrowDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var arrowProgress: CGFloat = 0
    @State private var objectPosition: CGPoint = .zero
    @State private var showLabels = false

    private var arrows: [DiagramArrow] {
        config.arrows ?? []
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height

            ZStack {
                // Background
                Color.terminalBg

                // Animated arrows
                ForEach(Array(arrows.enumerated()), id: \.element.id) { index, arrow in
                    let from = CGPoint(x: arrow.fromX * w, y: (1 - arrow.fromY) * h)
                    let to = CGPoint(x: arrow.toX * w, y: (1 - arrow.toY) * h)
                    let color = Color(hex: arrow.color)

                    // Arrow shaft (width proportional to arrow length)
                    let dx = arrow.toX - arrow.fromX
                    let dy = arrow.toY - arrow.fromY
                    let magnitude = sqrt(dx * dx + dy * dy)
                    let strokeW = max(1.5, min(5.0, 1.5 + magnitude * 5.0))

                    Path { path in
                        path.move(to: from)
                        path.addLine(to: to)
                    }
                    .trim(from: 0, to: arrowProgress)
                    .stroke(color, style: StrokeStyle(lineWidth: strokeW, lineCap: .round))

                    // Arrowhead
                    if arrowProgress > 0.8 {
                        arrowHead(from: from, to: to, color: color)
                            .opacity(Double(min(1, (arrowProgress - 0.8) * 5)))
                    }

                    // Arrow label
                    if showLabels {
                        Text(arrow.label)
                            .font(.mono(9, weight: .bold))
                            .foregroundStyle(color)
                            .position(
                                x: (from.x + to.x) / 2 + 8,
                                y: (from.y + to.y) / 2 - 10
                            )
                            .transition(.opacity)
                    }
                }

                // Central object (if configured)
                if let centerLabel = config.centerLabel {
                    VStack(spacing: 2) {
                        Circle()
                            .fill(Color.amber.opacity(0.3))
                            .frame(width: 32, height: 32)
                            .overlay(
                                Circle()
                                    .stroke(Color.amber, lineWidth: 2)
                            )

                        Text(centerLabel)
                            .font(.mono(8, weight: .bold))
                            .foregroundStyle(Color.amber)
                    }
                    .position(x: w / 2, y: h / 2)
                    .scaleEffect(arrowProgress > 0.5 ? 1 : 0.5)
                    .opacity(Double(arrowProgress))
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .onAppear { animate() }
        .onChange(of: stepIndex) { _ in animate() }
    }

    private func animate() {
        arrowProgress = 0
        showLabels = false

        withAnimation(.easeInOut(duration: 1.0)) {
            arrowProgress = 1
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            withAnimation(.spring(response: 0.3)) {
                showLabels = true
            }
        }
    }

    private func arrowHead(from: CGPoint, to: CGPoint, color: Color) -> some View {
        let angle = atan2(to.y - from.y, to.x - from.x)
        let headLength: CGFloat = 10
        let headAngle: CGFloat = .pi / 6

        return Path { path in
            let p1 = CGPoint(
                x: to.x - headLength * cos(angle - headAngle),
                y: to.y - headLength * sin(angle - headAngle)
            )
            let p2 = CGPoint(
                x: to.x - headLength * cos(angle + headAngle),
                y: to.y - headLength * sin(angle + headAngle)
            )
            path.move(to: to)
            path.addLine(to: p1)
            path.move(to: to)
            path.addLine(to: p2)
        }
        .stroke(color, style: StrokeStyle(lineWidth: 2.5, lineCap: .round))
    }
}
