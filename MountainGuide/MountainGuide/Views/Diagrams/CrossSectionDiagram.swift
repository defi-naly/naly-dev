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
                    colors: [Color(hex: "DBEAFE"), Color(hex: "93C5FD")],
                    startPoint: .top,
                    endPoint: .bottom
                )

                // Mountain profile fill
                mountainProfile(width: w, height: h)
                    .fill(
                        LinearGradient(
                            colors: [Color(hex: "78716C"), Color(hex: "57534E")],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )

                // Mountain profile stroke
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

    /// Interpolate terrain height at a given x fraction (0-1)
    private func terrainY(at xFrac: CGFloat, height: CGFloat) -> CGFloat {
        let pts = profilePoints
        guard pts.count >= 2 else { return height * 0.5 }

        for i in 1..<pts.count {
            if xFrac <= pts[i].x {
                let prev = pts[i - 1]
                let curr = pts[i]
                let t = (xFrac - prev.x) / max(curr.x - prev.x, 0.001)
                let yInterp = prev.y + (curr.y - prev.y) * t
                return (1 - yInterp) * height
            }
        }
        return (1 - (pts.last?.y ?? 0.3)) * height
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
        case "thermals":
            thermalsOverlay(width: width, height: height)
        case "katabatic":
            katabaticOverlay(width: width, height: height)
        case "valley-wind":
            valleyWindOverlay(width: width, height: height)
        case "loading":
            loadingOverlay(width: width, height: height)
        default:
            EmptyView()
        }
    }

    // MARK: - Waves Overlay

    private func wavesOverlay(width: CGFloat, height: CGFloat) -> some View {
        Canvas { context, size in
            let progress = Double(animationProgress)

            // Sine waves with increasing amplitude
            for i in 0..<3 {
                let yBase = size.height * 0.12 + CGFloat(i) * size.height * 0.1
                let lineWidth: CGFloat = 2.5 - CGFloat(i) * 0.5
                let opacity = (0.6 - Double(i) * 0.15) * progress

                var wave = Path()
                wave.move(to: CGPoint(x: size.width * 0.45, y: yBase))
                let endX = size.width * progress
                for x in stride(from: size.width * 0.45, through: endX, by: 1.5) {
                    let phase = (x - size.width * 0.45) / (size.width * 0.12)
                    let amplitude = size.height * 0.06 * (1.0 - CGFloat(i) * 0.2)
                    let y = yBase + sin(phase) * amplitude
                    wave.addLine(to: CGPoint(x: x, y: y))
                }

                context.stroke(wave, with: .color(Color.weatherAccent.opacity(opacity)), lineWidth: lineWidth)
            }

            // Lenticular at wave crests
            for i in 0..<2 {
                let xPos = size.width * (0.6 + CGFloat(i) * 0.2)
                let yPos = size.height * (0.1 + CGFloat(i) * 0.08)
                let lw = size.width * 0.12
                let lh: CGFloat = 8

                let lenticular = Path(ellipseIn: CGRect(x: xPos - lw / 2, y: yPos - lh / 2, width: lw, height: lh))
                context.fill(lenticular, with: .color(Color.white.opacity(0.35 * progress)))
            }

            // Rotor circle
            let rotorRect = CGRect(x: size.width * 0.55, y: size.height * 0.32, width: size.width * 0.1, height: size.height * 0.08)
            let rotor = Path(ellipseIn: rotorRect)
            context.stroke(rotor, with: .color(Color.danger.opacity(0.3 * progress)), style: StrokeStyle(lineWidth: 1, dash: [3, 3]))
        }
        .allowsHitTesting(false)
    }

    // MARK: - Wind Overlay

    private func windOverlay(width: CGFloat, height: CGFloat) -> some View {
        Canvas { context, size in
            let progress = Double(animationProgress)

            for i in 0..<5 {
                let baseY = size.height * (0.15 + CGFloat(i) * 0.1)
                let lineWidth: CGFloat = 2.0 - CGFloat(i) * 0.2
                let opacity = (0.5 - Double(i) * 0.08) * progress

                let startX = size.width * 0.05
                let endX = size.width * 0.95 * CGFloat(progress)

                var streamline = Path()
                streamline.move(to: CGPoint(x: startX, y: baseY))

                let steps = 20
                var lastY = baseY
                for step in 1...steps {
                    let t = CGFloat(step) / CGFloat(steps)
                    let x = startX + (endX - startX) * t
                    let xFrac = x / size.width
                    let terrY = terrainY(at: xFrac, height: size.height)
                    let offset = size.height * 0.08 + CGFloat(i) * size.height * 0.06
                    let y = min(terrY - offset, baseY)
                    streamline.addLine(to: CGPoint(x: x, y: y))
                    lastY = y
                }

                context.stroke(streamline, with: .color(Color.diagramCyan.opacity(opacity)), lineWidth: lineWidth)

                // Arrowhead
                if progress > 0.8 {
                    var arrow = Path()
                    arrow.move(to: CGPoint(x: endX - 6, y: lastY - 4))
                    arrow.addLine(to: CGPoint(x: endX, y: lastY))
                    arrow.addLine(to: CGPoint(x: endX - 6, y: lastY + 4))
                    context.stroke(arrow, with: .color(Color.diagramCyan.opacity(opacity)), lineWidth: lineWidth)
                }
            }
        }
        .allowsHitTesting(false)
    }

    // MARK: - Clouds Overlay

    private func cloudsOverlay(width: CGFloat, height: CGFloat) -> some View {
        Canvas { context, size in
            let progress = Double(animationProgress)

            // Summit cloud
            let c1 = CloudShapes.cumulus(
                center: CGPoint(x: size.width * 0.5, y: size.height * 0.08),
                width: size.width * 0.2, height: size.height * 0.08
            )
            context.fill(c1, with: .color(Color.white.opacity(0.4 * progress)))

            // Downwind cloud
            let c2 = CloudShapes.cumulus(
                center: CGPoint(x: size.width * 0.72, y: size.height * 0.12),
                width: size.width * 0.25, height: size.height * 0.1
            )
            context.fill(c2, with: .color(Color.white.opacity(0.35 * progress)))

            // Upwind cloud
            let c3 = CloudShapes.cumulus(
                center: CGPoint(x: size.width * 0.25, y: size.height * 0.15),
                width: size.width * 0.14, height: size.height * 0.06
            )
            context.fill(c3, with: .color(Color.white.opacity(0.25 * progress)))
        }
        .allowsHitTesting(false)
    }

    // MARK: - Thermals Overlay

    private func thermalsOverlay(width: CGFloat, height: CGFloat) -> some View {
        TimelineView(.animation(minimumInterval: 0.1)) { timeline in
            let time = timeline.date.timeIntervalSinceReferenceDate

            Canvas { context, size in
                let thermalX = size.width * 0.45
                let baseY = terrainY(at: 0.45, height: size.height) - 5
                let topY = size.height * 0.05

                for i in 0..<8 {
                    let phase = (time * 1.5 + Double(i) * 0.4).truncatingRemainder(dividingBy: 3.0)
                    let progress = CGFloat(phase / 3.0)
                    let y = baseY - (baseY - topY) * progress
                    let opacity = 1.0 - Double(progress) * 0.8
                    let spread: CGFloat = 8 + progress * 6

                    var chevron = Path()
                    chevron.move(to: CGPoint(x: thermalX - spread, y: y + 4))
                    chevron.addLine(to: CGPoint(x: thermalX, y: y))
                    chevron.addLine(to: CGPoint(x: thermalX + spread, y: y + 4))

                    context.stroke(chevron, with: .color(Color.amber.opacity(opacity * 0.6)), lineWidth: 1.5)
                }
            }
            .allowsHitTesting(false)
        }
    }

    // MARK: - Katabatic Overlay

    private func katabaticOverlay(width: CGFloat, height: CGFloat) -> some View {
        Canvas { context, size in
            let progress = Double(animationProgress)

            for i in 0..<6 {
                let startFrac: CGFloat = 0.35 + CGFloat(i) * 0.05
                let endFrac: CGFloat = 0.8 + CGFloat(i) * 0.02
                let opacity = (0.4 - Double(i) * 0.05) * progress

                var flow = Path()
                let steps = 15
                for step in 0...steps {
                    let t = CGFloat(step) / CGFloat(steps)
                    let xFrac = startFrac + (endFrac - startFrac) * t
                    let x = xFrac * size.width
                    let terrY = terrainY(at: xFrac, height: size.height)
                    let offset: CGFloat = 4 + CGFloat(i) * 3
                    let y = terrY - offset

                    if step == 0 {
                        flow.move(to: CGPoint(x: x, y: y))
                    } else {
                        flow.addLine(to: CGPoint(x: x, y: y))
                    }
                }

                context.stroke(flow, with: .color(Color.diagramCyan.opacity(opacity)), lineWidth: 1.5)

                // Arrowhead at end
                let endX = endFrac * size.width
                let endY = terrainY(at: endFrac, height: size.height) - (4 + CGFloat(i) * 3)
                var arrowHead = Path()
                arrowHead.move(to: CGPoint(x: endX - 5, y: endY - 4))
                arrowHead.addLine(to: CGPoint(x: endX, y: endY))
                arrowHead.addLine(to: CGPoint(x: endX - 3, y: endY + 5))
                context.stroke(arrowHead, with: .color(Color.diagramCyan.opacity(opacity)), lineWidth: 1.5)
            }
        }
        .allowsHitTesting(false)
    }

    // MARK: - Valley Wind Overlay

    private func valleyWindOverlay(width: CGFloat, height: CGFloat) -> some View {
        Canvas { context, size in
            let progress = Double(animationProgress)

            // Horizontal valley-floor arrows (up-valley)
            for i in 0..<3 {
                let y = size.height * (0.85 - CGFloat(i) * 0.04)
                let opacity = (0.4 - Double(i) * 0.1) * progress

                var arrow = Path()
                arrow.move(to: CGPoint(x: size.width * 0.1, y: y))
                arrow.addLine(to: CGPoint(x: size.width * 0.9, y: y))
                arrow.move(to: CGPoint(x: size.width * 0.87, y: y - 3))
                arrow.addLine(to: CGPoint(x: size.width * 0.9, y: y))
                arrow.addLine(to: CGPoint(x: size.width * 0.87, y: y + 3))

                context.stroke(arrow, with: .color(Color.diagramCyan.opacity(opacity)), lineWidth: 1.5)
            }

            // Upslope arrows on heated face
            for i in 0..<4 {
                let startFrac: CGFloat = 0.15 + CGFloat(i) * 0.05
                let x = startFrac * size.width
                let terrY = terrainY(at: startFrac, height: size.height)

                var upArrow = Path()
                upArrow.move(to: CGPoint(x: x, y: terrY - 5))
                upArrow.addLine(to: CGPoint(x: x - 8, y: terrY - 25))
                upArrow.move(to: CGPoint(x: x - 11, y: terrY - 20))
                upArrow.addLine(to: CGPoint(x: x - 8, y: terrY - 25))
                upArrow.addLine(to: CGPoint(x: x - 4, y: terrY - 21))

                context.stroke(upArrow, with: .color(Color.amber.opacity(0.4 * progress)), lineWidth: 1.2)
            }

            // Sun indicator
            let sunCenter = CGPoint(x: size.width * 0.15, y: size.height * 0.08)
            let sun = Path(ellipseIn: CGRect(x: sunCenter.x - 8, y: sunCenter.y - 8, width: 16, height: 16))
            context.fill(sun, with: .color(Color.amber.opacity(0.3 * progress)))
        }
        .allowsHitTesting(false)
    }

    // MARK: - Loading Overlay

    private func loadingOverlay(width: CGFloat, height: CGFloat) -> some View {
        TimelineView(.animation(minimumInterval: 0.08)) { timeline in
            let time = timeline.date.timeIntervalSinceReferenceDate

            Canvas { context, size in
                // Wind arrows
                for i in 0..<3 {
                    let y = size.height * (0.12 + CGFloat(i) * 0.06)
                    var arrow = Path()
                    arrow.move(to: CGPoint(x: size.width * 0.05, y: y))
                    arrow.addLine(to: CGPoint(x: size.width * 0.25, y: y))
                    arrow.move(to: CGPoint(x: size.width * 0.23, y: y - 3))
                    arrow.addLine(to: CGPoint(x: size.width * 0.25, y: y))
                    arrow.addLine(to: CGPoint(x: size.width * 0.23, y: y + 3))
                    context.stroke(arrow, with: .color(Color.diagramCyan.opacity(0.4)), lineWidth: 1.2)
                }

                // Animated snow particles
                for i in 0..<12 {
                    let phase = (time * 2.0 + Double(i) * 0.5).truncatingRemainder(dividingBy: 4.0)
                    let progress = CGFloat(phase / 4.0)

                    let startX = size.width * 0.35
                    let endX = size.width * 0.7
                    let x = startX + (endX - startX) * progress
                    let arcHeight = size.height * 0.15 * sin(progress * .pi)
                    let baseArcY = size.height * 0.15
                    let y = baseArcY - arcHeight + progress * size.height * 0.2
                    let opacity = sin(progress * .pi) * 0.6

                    let dot = Path(ellipseIn: CGRect(x: x - 1.5, y: y - 1.5, width: 3, height: 3))
                    context.fill(dot, with: .color(Color.white.opacity(opacity)))
                }

                // Lee deposit
                var deposit = Path()
                deposit.move(to: CGPoint(x: size.width * 0.6, y: size.height * 0.2))
                deposit.addQuadCurve(
                    to: CGPoint(x: size.width * 0.8, y: size.height * 0.35),
                    control: CGPoint(x: size.width * 0.72, y: size.height * 0.22)
                )
                context.stroke(deposit, with: .color(Color.white.opacity(0.25)), lineWidth: 3)
            }
            .allowsHitTesting(false)
        }
    }

    // MARK: - Arrow View

    private func arrowView(arrow: DiagramArrow, width: CGFloat, height: CGFloat) -> some View {
        let from = CGPoint(x: arrow.fromX * width, y: (1 - arrow.fromY) * height)
        let to = CGPoint(x: arrow.toX * width, y: (1 - arrow.toY) * height)

        return ZStack {
            Path { path in
                path.move(to: from)
                path.addLine(to: to)
            }
            .stroke(Color(hex: arrow.color), lineWidth: 1.5)

            Text(arrow.label)
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color(hex: arrow.color))
                .position(x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 10)
        }
    }
}
