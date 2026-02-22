import SwiftUI

struct LayeredStackDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var revealedLayers: Set<String> = []
    @State private var showTemperaturePath = false
    @State private var tappedLayer: String? = nil

    private var layers: [DiagramLayer] {
        config.layers ?? []
    }

    var body: some View {
        GeometryReader { geo in
            let totalHeight = geo.size.height
            let width = geo.size.width

            ZStack(alignment: .bottom) {
                // Layer stack
                VStack(spacing: 0) {
                    ForEach(Array(layers.reversed().enumerated()), id: \.element.id) { index, layer in
                        let layerHeight = totalHeight * layer.heightRatio
                        let isRevealed = revealedLayers.contains(layer.id)

                        ZStack {
                            Rectangle()
                                .fill(Color(hex: layer.color).opacity(isRevealed ? 0.7 : 0.0))
                                .frame(height: layerHeight)

                            if isRevealed {
                                HStack {
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(layer.name.uppercased())
                                            .font(.mono(10, weight: .bold))
                                            .foregroundStyle(Color.textPrimary)

                                        if tappedLayer == layer.id {
                                            Text(layer.description)
                                                .font(.mono(9))
                                                .foregroundStyle(Color.textMuted)
                                                .transition(.opacity.combined(with: .move(edge: .top)))
                                        }
                                    }
                                    .padding(.leading, 12)
                                    Spacer()
                                }
                                .transition(.opacity)
                            }
                        }
                        .onTapGesture {
                            withAnimation(.spring(response: 0.3)) {
                                tappedLayer = tappedLayer == layer.id ? nil : layer.id
                            }
                        }
                        .overlay(alignment: .bottom) {
                            if isRevealed && index < layers.count - 1 {
                                Rectangle()
                                    .fill(Color.textDim.opacity(0.3))
                                    .frame(height: 1)
                            }
                        }
                    }
                }

                // Temperature path overlay
                if showTemperaturePath, let _ = config.arrows {
                    temperaturePath(width: width, height: totalHeight)
                }

                // Highlight line (e.g., tropopause)
                if let highlightIdx = config.highlightIndex, highlightIdx < layers.count {
                    let offsetFromBottom = layers.suffix(from: layers.count - highlightIdx).reduce(CGFloat(0)) { $0 + $1.heightRatio * totalHeight }

                    Rectangle()
                        .fill(Color.amber)
                        .frame(height: 2)
                        .shadow(color: .amber.opacity(0.6), radius: 4)
                        .offset(y: -offsetFromBottom)

                    Text(layers[highlightIdx].name)
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(Color.amber)
                        .offset(y: -offsetFromBottom - 12)
                }
            }
        }
        .onAppear { revealLayers() }
        .onChange(of: stepIndex) { _ in revealLayers() }
    }

    private func revealLayers() {
        let visibleCount = min(stepIndex + 1, layers.count)
        for i in 0..<visibleCount {
            let delay = Double(i) * 0.2
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                    _ = revealedLayers.insert(layers[i].id)
                }
            }
        }

        // Show temperature path on step 2+
        if stepIndex >= 1 {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                withAnimation(.easeInOut(duration: 0.8)) {
                    showTemperaturePath = true
                }
            }
        }
    }

    private func temperaturePath(width: CGFloat, height: CGFloat) -> some View {
        Path { path in
            guard let arrows = config.arrows, !arrows.isEmpty else { return }
            let points = arrows.map { CGPoint(x: $0.fromX * width, y: (1 - $0.fromY) * height) }
            if let first = points.first {
                path.move(to: first)
                for pt in points.dropFirst() {
                    path.addLine(to: pt)
                }
            }
        }
        .trim(from: 0, to: showTemperaturePath ? 1 : 0)
        .stroke(Color.amber, style: StrokeStyle(lineWidth: 2, dash: [4, 4]))
    }
}
