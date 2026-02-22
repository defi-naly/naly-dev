import SwiftUI

struct CrossSectionDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var animationProgress: CGFloat = 0
    @State private var showOverlay = false

    private var profilePoints: [DiagramPoint] {
        config.profilePoints ?? [
            DiagramPoint(x: 0, y: 0.3),
            DiagramPoint(x: 0.2, y: 0.3),
            DiagramPoint(x: 0.35, y: 0.8),
            DiagramPoint(x: 0.5, y: 0.95),
            DiagramPoint(x: 0.65, y: 0.8),
            DiagramPoint(x: 0.8, y: 0.3),
            DiagramPoint(x: 1.0, y: 0.3)
        ]
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height

            ZStack {
                // Sky gradient
                LinearGradient(
                    colors: [Color(hex: "1a1a2e"), Color(hex: "16213e")],
                    startPoint: .top,
                    endPoint: .bottom
                )

                // Mountain profile
                mountainProfile(width: w, height: h)
                    .fill(
                        LinearGradient(
                            colors: [Color(hex: "374151"), Color(hex: "1f2937")],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )

                // Ground fill
                mountainProfile(width: w, height: h)
                    .stroke(Color.terminalBorder, lineWidth: 1)

                // Overlay animations
                if showOverlay {
                    overlayContent(width: w, height: h)
                }

                // Arrow annotations
                if let arrows = config.arrows {
                    ForEach(arrows) { arrow in
                        arrowView(arrow: arrow, width: w, height: h)
                            .opacity(showOverlay ? 1 : 0)
                    }
                }

                // Labels
                if let labels = config.labels {
                    VStack {
                        Spacer()
                        HStack {
                            ForEach(Array(labels.enumerated()), id: \.offset) { _, label in
                                Text(label)
                                    .font(.mono(9, weight: .bold))
                                    .foregroundStyle(Color.textMuted)
                                Spacer()
                            }
                        }
                        .padding(.horizontal, 8)
                        .padding(.bottom, 4)
                    }
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 1.0)) {
                animationProgress = 1
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                withAnimation(.spring(response: 0.6)) {
                    showOverlay = true
                }
            }
        }
    }

    private func mountainProfile(width: CGFloat, height: CGFloat) -> Path {
        Path { path in
            let points = profilePoints.map { CGPoint(x: $0.x * width, y: (1 - $0.y) * height) }
            guard let first = points.first else { return }
            path.move(to: CGPoint(x: 0, y: height))
            path.addLine(to: first)

            for i in 1..<points.count {
                let prev = points[i - 1]
                let curr = points[i]
                let midX = (prev.x + curr.x) / 2
                path.addCurve(to: curr, control1: CGPoint(x: midX, y: prev.y), control2: CGPoint(x: midX, y: curr.y))
            }

            path.addLine(to: CGPoint(x: width, y: height))
            path.closeSubpath()
        }
    }

    @ViewBuilder
    private func overlayContent(width: CGFloat, height: CGFloat) -> some View {
        let overlayType = config.overlayType ?? "waves"

        switch overlayType {
        case "waves":
            wavesOverlay(width: width, height: height)
        case "wind":
            windOverlay(width: width, height: height)
        case "clouds":
            cloudsOverlay(width: width, height: height)
        default:
            EmptyView()
        }
    }

    private func wavesOverlay(width: CGFloat, height: CGFloat) -> some View {
        ForEach(0..<3, id: \.self) { i in
            let yBase = height * 0.15 + CGFloat(i) * height * 0.12
            Path { path in
                path.move(to: CGPoint(x: width * 0.5, y: yBase))
                for x in stride(from: width * 0.5, through: width, by: 2) {
                    let phase = (x - width * 0.5) / (width * 0.15)
                    let amplitude = height * 0.04 * (1 - CGFloat(i) * 0.2)
                    let y = yBase + sin(phase) * amplitude
                    path.addLine(to: CGPoint(x: x, y: y))
                }
            }
            .trim(from: 0, to: animationProgress)
            .stroke(Color.weatherAccent.opacity(0.6 - Double(i) * 0.15), lineWidth: 1.5)
        }
    }

    private func windOverlay(width: CGFloat, height: CGFloat) -> some View {
        ForEach(0..<5, id: \.self) { i in
            let y = height * (0.2 + CGFloat(i) * 0.12)
            let startX = width * CGFloat.random(in: 0.1...0.3)
            Path { path in
                path.move(to: CGPoint(x: startX, y: y))
                path.addLine(to: CGPoint(x: startX + width * 0.3, y: y - 5))
                // Arrowhead
                path.move(to: CGPoint(x: startX + width * 0.3, y: y - 5))
                path.addLine(to: CGPoint(x: startX + width * 0.28, y: y - 10))
                path.move(to: CGPoint(x: startX + width * 0.3, y: y - 5))
                path.addLine(to: CGPoint(x: startX + width * 0.28, y: y))
            }
            .trim(from: 0, to: animationProgress)
            .stroke(Color.diagramCyan.opacity(0.5), lineWidth: 1.5)
        }
    }

    private func cloudsOverlay(width: CGFloat, height: CGFloat) -> some View {
        ForEach(0..<3, id: \.self) { i in
            let x = width * (0.3 + CGFloat(i) * 0.2)
            let y = height * 0.15

            Ellipse()
                .fill(Color.white.opacity(0.15))
                .frame(width: 40 + CGFloat(i) * 10, height: 15)
                .position(x: x, y: y)
                .opacity(Double(animationProgress))
        }
    }

    private func arrowView(arrow: DiagramArrow, width: CGFloat, height: CGFloat) -> some View {
        let from = CGPoint(x: arrow.fromX * width, y: (1 - arrow.fromY) * height)
        let to = CGPoint(x: arrow.toX * width, y: (1 - arrow.toY) * height)

        return ZStack {
            Path { path in
                path.move(to: from)
                path.addLine(to: to)
            }
            .stroke(Color(hex: arrow.color), lineWidth: 1.5)

            // Arrow label
            Text(arrow.label)
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color(hex: arrow.color))
                .position(x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 10)
        }
    }
}
