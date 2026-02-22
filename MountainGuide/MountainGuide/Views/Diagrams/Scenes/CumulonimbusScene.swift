import SwiftUI

struct CumulonimbusScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Dark storm sky
            LinearGradient(
                colors: [Color(hex: "0f172a"), Color(hex: "1e293b")],
                startPoint: .top,
                endPoint: .bottom
            )

            // CB tower — tall stack of overlapping circles
            let towerX = width * 0.45
            let towerBase = height * 0.75
            let towerTop = height * 0.1

            // Rain shaft (grey)
            Path { path in
                path.move(to: CGPoint(x: towerX - width * 0.1, y: towerBase))
                path.addLine(to: CGPoint(x: towerX - width * 0.15, y: height))
                path.addLine(to: CGPoint(x: towerX + width * 0.15, y: height))
                path.addLine(to: CGPoint(x: towerX + width * 0.1, y: towerBase))
                path.closeSubpath()
            }
            .fill(Color(hex: "6B7280").opacity(0.2))

            // Tower body — circles stacked vertically
            ForEach(0..<6, id: \.self) { i in
                let frac = CGFloat(i) / 5.0
                let y = towerBase - (towerBase - towerTop) * frac
                let radius = width * (0.12 + 0.04 * sin(frac * .pi))

                Circle()
                    .fill(
                        LinearGradient(
                            colors: [
                                Color.white.opacity(0.7 - Double(i) * 0.05),
                                Color(hex: "9CA3AF").opacity(0.5)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .position(x: towerX + (i % 2 == 0 ? -5 : 5), y: y)
            }

            // Anvil top — wide ellipse spreading right
            Path { path in
                path.addEllipse(in: CGRect(
                    x: towerX - width * 0.05,
                    y: towerTop - 5,
                    width: width * 0.4,
                    height: 18
                ))
            }
            .fill(Color.white.opacity(0.5))

            // Lightning bolt
            Path { path in
                let lx = towerX + width * 0.05
                let ly = height * 0.5
                path.move(to: CGPoint(x: lx, y: ly))
                path.addLine(to: CGPoint(x: lx - 8, y: ly + 20))
                path.addLine(to: CGPoint(x: lx + 4, y: ly + 20))
                path.addLine(to: CGPoint(x: lx - 4, y: ly + 45))
                path.addLine(to: CGPoint(x: lx + 2, y: ly + 28))
                path.addLine(to: CGPoint(x: lx - 6, y: ly + 28))
                path.addLine(to: CGPoint(x: lx, y: ly))
            }
            .fill(Color(hex: "FCD34D").opacity(0.8))

            // Ground plane
            Rectangle()
                .fill(Color(hex: "374151").opacity(0.3))
                .frame(height: height * 0.08)
                .position(x: width / 2, y: height * 0.96)
        }
    }
}
