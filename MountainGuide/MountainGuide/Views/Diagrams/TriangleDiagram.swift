import SwiftUI

struct TriangleDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var revealedVertices: Set<String> = []
    @State private var showCenter = false
    @State private var showEdges = false
    @State private var tappedVertex: String? = nil

    private var vertices: [DiagramVertex] {
        config.vertices ?? []
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let centerX = w / 2
            let centerY = h / 2
            let radius = min(w, h) * 0.35

            let positions = vertexPositions(count: vertices.count, center: CGPoint(x: centerX, y: centerY), radius: radius)

            ZStack {
                // Edge lines
                if showEdges && positions.count >= 2 {
                    ForEach(0..<positions.count, id: \.self) { i in
                        let next = (i + 1) % positions.count
                        Path { path in
                            path.move(to: positions[i])
                            path.addLine(to: positions[next])
                        }
                        .stroke(Color.terminalBorder.opacity(0.5), lineWidth: 1)
                    }

                    // Lines to center
                    if showCenter {
                        ForEach(0..<positions.count, id: \.self) { i in
                            Path { path in
                                path.move(to: positions[i])
                                path.addLine(to: CGPoint(x: centerX, y: centerY))
                            }
                            .stroke(Color.amber.opacity(0.2), lineWidth: 1)
                        }
                    }
                }

                // Vertex nodes
                ForEach(Array(vertices.enumerated()), id: \.element.id) { index, vertex in
                    if index < positions.count {
                        let pos = positions[index]
                        let isRevealed = revealedVertices.contains(vertex.id)
                        let isTapped = tappedVertex == vertex.id

                        VStack(spacing: 4) {
                            Circle()
                                .fill(isRevealed ? Color(hex: vertex.color) : Color.terminalBorder)
                                .frame(width: 36, height: 36)
                                .overlay(
                                    Circle()
                                        .stroke(Color(hex: vertex.color).opacity(isRevealed ? 0.6 : 0.2), lineWidth: 2)
                                )
                                .shadow(color: isRevealed ? Color(hex: vertex.color).opacity(0.4) : .clear, radius: 6)

                            Text(vertex.label)
                                .font(.mono(10, weight: .bold))
                                .foregroundStyle(isRevealed ? Color.textPrimary : Color.textDim)

                            if isTapped {
                                Text(vertex.description)
                                    .font(.mono(8))
                                    .foregroundStyle(Color.textMuted)
                                    .multilineTextAlignment(.center)
                                    .frame(maxWidth: 100)
                                    .transition(.opacity.combined(with: .scale))
                            }
                        }
                        .position(pos)
                        .scaleEffect(isRevealed ? 1 : 0.7)
                        .animation(.spring(response: 0.4, dampingFraction: 0.7), value: isRevealed)
                        .onTapGesture {
                            withAnimation(.spring(response: 0.3)) {
                                tappedVertex = tappedVertex == vertex.id ? nil : vertex.id
                            }
                        }
                    }
                }

                // Center element
                if showCenter, let label = config.centerLabel {
                    VStack(spacing: 4) {
                        Text(label.uppercased())
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.amber)

                        if let desc = config.centerDescription {
                            Text(desc)
                                .font(.mono(8))
                                .foregroundStyle(Color.textMuted)
                                .multilineTextAlignment(.center)
                                .frame(maxWidth: 120)
                        }
                    }
                    .padding(8)
                    .background(Color.amber.opacity(0.1))
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.amber.opacity(0.3), lineWidth: 1)
                    )
                    .position(x: centerX, y: centerY)
                    .scaleEffect(showCenter ? 1 : 0.5)
                    .opacity(showCenter ? 1 : 0)
                }
            }
        }
        .onAppear { revealVertices() }
        .onChange(of: stepIndex) { _ in revealVertices() }
    }

    private func vertexPositions(count: Int, center: CGPoint, radius: CGFloat) -> [CGPoint] {
        guard count > 0 else { return [] }
        return (0..<count).map { i in
            let angle = -CGFloat.pi / 2 + CGFloat(i) * 2 * .pi / CGFloat(count)
            return CGPoint(
                x: center.x + radius * cos(angle),
                y: center.y + radius * sin(angle)
            )
        }
    }

    private func revealVertices() {
        let visibleCount = min(stepIndex + 1, vertices.count)
        for i in 0..<visibleCount {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(i) * 0.3) {
                withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                    _ = revealedVertices.insert(vertices[i].id)
                }
            }
        }

        // Show edges after vertices
        DispatchQueue.main.asyncAfter(deadline: .now() + Double(visibleCount) * 0.3) {
            withAnimation(.easeInOut(duration: 0.5)) {
                showEdges = true
            }
        }

        // Show center when all vertices revealed
        if visibleCount >= vertices.count {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(vertices.count) * 0.3 + 0.3) {
                withAnimation(.spring(response: 0.5)) {
                    showCenter = true
                }
            }
        }
    }
}
