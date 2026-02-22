import SwiftUI

struct ConceptMapView: View {
    let nodes: [ConceptMapNode]
    let currentModuleId: String

    @State private var revealedNodes: Set<String> = []

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height

            ZStack {
                // Connection lines
                ForEach(nodes) { node in
                    if revealedNodes.contains(node.id) {
                        ForEach(node.connections, id: \.self) { connId in
                            if let target = nodes.first(where: { $0.id == connId }),
                               revealedNodes.contains(connId) {
                                Path { path in
                                    path.move(to: CGPoint(x: node.x * w, y: node.y * h))
                                    path.addLine(to: CGPoint(x: target.x * w, y: target.y * h))
                                }
                                .stroke(
                                    Color.terminalBorder.opacity(0.5),
                                    style: StrokeStyle(lineWidth: 1, dash: [3, 3])
                                )
                            }
                        }
                    }
                }

                // Nodes
                ForEach(nodes) { node in
                    let isRevealed = revealedNodes.contains(node.id)
                    let isCurrent = node.id == currentModuleId

                    VStack(spacing: 3) {
                        Circle()
                            .fill(isCurrent ? Color.amber : node.domain.color.opacity(0.6))
                            .frame(width: isCurrent ? 20 : 14, height: isCurrent ? 20 : 14)
                            .overlay(
                                Circle()
                                    .stroke(isCurrent ? Color.amber : Color.clear, lineWidth: 2)
                            )
                            .shadow(color: isCurrent ? .amber.opacity(0.5) : .clear, radius: 4)

                        Text(node.label)
                            .font(.mono(isCurrent ? 9 : 7, weight: isCurrent ? .bold : .regular))
                            .foregroundStyle(isCurrent ? Color.textPrimary : Color.textMuted)
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: 70)
                    }
                    .position(x: node.x * w, y: node.y * h)
                    .opacity(isRevealed ? 1 : 0)
                    .scaleEffect(isRevealed ? 1 : 0.5)
                }
            }
        }
        .onAppear { revealNodesSequentially() }
    }

    private func revealNodesSequentially() {
        // Reveal current node first
        withAnimation(.spring(response: 0.4)) {
            revealedNodes.insert(currentModuleId)
        }

        // Then connected nodes
        let currentNode = nodes.first(where: { $0.id == currentModuleId })
        let connectedIds = currentNode?.connections ?? []

        for (i, connId) in connectedIds.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3 + Double(i) * 0.15) {
                withAnimation(.spring(response: 0.4)) {
                    _ = revealedNodes.insert(connId)
                }
            }
        }

        // Then remaining nodes
        let remaining = nodes.filter { !connectedIds.contains($0.id) && $0.id != currentModuleId }
        for (i, node) in remaining.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.6 + Double(i) * 0.1) {
                withAnimation(.spring(response: 0.4)) {
                    _ = revealedNodes.insert(node.id)
                }
            }
        }
    }
}
