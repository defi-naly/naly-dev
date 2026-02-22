import SwiftUI

struct InteractiveGaugeDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var currentValue: CGFloat
    @State private var isDragging = false

    private var zones: [DiagramZone] {
        config.zones ?? []
    }

    private var minVal: CGFloat { config.minValue ?? 0 }
    private var maxVal: CGFloat { config.maxValue ?? 100 }
    private var unit: String { config.unit ?? "" }

    init(config: DiagramConfig, stepIndex: Int) {
        self.config = config
        self.stepIndex = stepIndex
        _currentValue = State(initialValue: config.currentValue ?? config.minValue ?? 0)
    }

    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let trackHeight: CGFloat = h * 0.15
            let trackY: CGFloat = h * 0.6

            ZStack {
                Color.terminalBg

                // Zone background bars
                ForEach(zones) { zone in
                    let startFrac = (zone.minValue - minVal) / (maxVal - minVal)
                    let endFrac = (zone.maxValue - minVal) / (maxVal - minVal)
                    let startX = startFrac * w
                    let zoneWidth = (endFrac - startFrac) * w

                    Rectangle()
                        .fill(Color(hex: zone.color).opacity(0.25))
                        .frame(width: zoneWidth, height: trackHeight)
                        .position(x: startX + zoneWidth / 2, y: trackY)

                    // Zone label
                    Text(zone.label)
                        .font(.mono(8, weight: .bold))
                        .foregroundStyle(Color(hex: zone.color))
                        .position(x: startX + zoneWidth / 2, y: trackY - trackHeight / 2 - 12)
                }

                // Track outline
                RoundedRectangle(cornerRadius: 4)
                    .stroke(Color.terminalBorder, lineWidth: 1)
                    .frame(width: w - 20, height: trackHeight)
                    .position(x: w / 2, y: trackY)

                // Current value indicator
                let valueFrac = (currentValue - minVal) / (maxVal - minVal)
                let indicatorX = 10 + valueFrac * (w - 20)

                // Indicator line
                Rectangle()
                    .fill(currentZoneColor)
                    .frame(width: 3, height: trackHeight + 20)
                    .position(x: indicatorX, y: trackY)
                    .shadow(color: currentZoneColor.opacity(0.5), radius: isDragging ? 8 : 4)

                // Draggable handle
                Circle()
                    .fill(currentZoneColor)
                    .frame(width: 24, height: 24)
                    .overlay(
                        Circle()
                            .stroke(Color.textPrimary, lineWidth: 2)
                    )
                    .position(x: indicatorX, y: trackY + trackHeight / 2 + 20)
                    .scaleEffect(isDragging ? 1.2 : 1.0)
                    .gesture(
                        DragGesture()
                            .onChanged { value in
                                isDragging = true
                                let fraction = (value.location.x - 10) / (w - 20)
                                let clamped = max(0, min(1, fraction))
                                currentValue = minVal + clamped * (maxVal - minVal)
                            }
                            .onEnded { _ in
                                isDragging = false
                            }
                    )

                // Value readout
                VStack(spacing: 2) {
                    Text("\(Int(currentValue))\(unit)")
                        .font(.mono(28, weight: .bold))
                        .foregroundStyle(currentZoneColor)

                    if let zone = currentZone {
                        Text(zone.description)
                            .font(.mono(10))
                            .foregroundStyle(Color.textMuted)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 20)
                    }
                }
                .position(x: w / 2, y: h * 0.2)

                // Min/Max labels
                Text("\(Int(minVal))\(unit)")
                    .font(.mono(9))
                    .foregroundStyle(Color.textDim)
                    .position(x: 20, y: trackY + trackHeight / 2 + 44)

                Text("\(Int(maxVal))\(unit)")
                    .font(.mono(9))
                    .foregroundStyle(Color.textDim)
                    .position(x: w - 20, y: trackY + trackHeight / 2 + 44)
            }
        }
        .onChange(of: stepIndex) { _ in
            if let target = config.currentValue {
                withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                    currentValue = target
                }
            }
        }
    }

    private var currentZone: DiagramZone? {
        zones.first { currentValue >= $0.minValue && currentValue <= $0.maxValue }
    }

    private var currentZoneColor: Color {
        if let zone = currentZone {
            return Color(hex: zone.color)
        }
        return .amber
    }
}
