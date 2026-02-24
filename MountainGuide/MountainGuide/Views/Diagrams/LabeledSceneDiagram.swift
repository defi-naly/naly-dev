import SwiftUI

struct LabeledSceneDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var revealedHotspots: Set<String> = []
    @State private var selectedHotspot: String? = nil

    private var hotspots: [RevealItem] {
        config.hotspots ?? []
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height

            ZStack {
                // Scene background (transparent — scene handles its own bg)
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.lightBg)

                // Rendered scene content
                if let desc = config.sceneDescription {
                    SceneRenderer.render(description: desc, width: w, height: h)
                }

                // Hotspot markers
                ForEach(hotspots) { hotspot in
                    let x = hotspot.x * w
                    let y = hotspot.y * h
                    let isRevealed = revealedHotspots.contains(hotspot.id)
                    let isSelected = selectedHotspot == hotspot.id

                    VStack(spacing: 4) {
                        // Pulsing marker
                        ZStack {
                            if !isRevealed {
                                Circle()
                                    .fill(Color.amber.opacity(0.2))
                                    .frame(width: 32, height: 32)
                                    .scaleEffect(isRevealed ? 0 : 1.3)
                                    .opacity(isRevealed ? 0 : 0.5)
                                    .animation(.easeInOut(duration: 1.2).repeatForever(autoreverses: true), value: isRevealed)
                            }

                            Circle()
                                .fill(isRevealed ? Color.amber : Color.amber.opacity(0.6))
                                .frame(width: 20, height: 20)
                                .overlay(
                                    Text("?")
                                        .font(.mono(10, weight: .bold))
                                        .foregroundStyle(.white)
                                        .opacity(isRevealed ? 0 : 1)
                                )
                                .overlay(
                                    Image(systemName: "checkmark")
                                        .font(.system(size: 10, weight: .bold))
                                        .foregroundStyle(.white)
                                        .opacity(isRevealed ? 1 : 0)
                                )
                        }

                        // Label (always visible after reveal)
                        if isRevealed {
                            Text(hotspot.label)
                                .font(.mono(9, weight: .bold))
                                .foregroundStyle(Color.textPrimary)
                                .transition(.opacity.combined(with: .scale))
                        }
                    }
                    .position(x: x, y: y)
                    .onTapGesture {
                        withAnimation(.spring(response: 0.3)) {
                            revealedHotspots.insert(hotspot.id)
                            selectedHotspot = selectedHotspot == hotspot.id ? nil : hotspot.id
                        }
                        let impact = UIImpactFeedbackGenerator(style: .light)
                        impact.impactOccurred()
                    }

                    // Detail popup
                    if isSelected {
                        Text(hotspot.detail)
                            .font(.mono(9))
                            .foregroundStyle(Color.textPrimary)
                            .padding(8)
                            .background(Color.terminalSurface)
                            .cornerRadius(6)
                            .overlay(
                                RoundedRectangle(cornerRadius: 6)
                                    .stroke(Color.amber.opacity(0.3), lineWidth: 1)
                            )
                            .frame(maxWidth: 160)
                            .position(x: min(max(x, 80), w - 80), y: y + 50)
                            .transition(.opacity.combined(with: .scale))
                    }
                }

                // Progress indicator
                HStack(spacing: 4) {
                    Text("\(revealedHotspots.count)/\(hotspots.count)")
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(Color.amber)
                    Text("discovered")
                        .font(.mono(10))
                        .foregroundStyle(Color.textDim)
                }
                .position(x: w / 2, y: 16)
            }
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }
}
