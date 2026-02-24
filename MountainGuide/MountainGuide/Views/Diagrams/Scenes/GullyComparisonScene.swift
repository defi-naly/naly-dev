import SwiftUI

struct GullyComparisonScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Background
            LinearGradient(
                colors: [Color(hex: "F5F0EB"), Color(hex: "E7E5E4")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Divider
            Path { path in
                path.move(to: CGPoint(x: width / 2, y: 0))
                path.addLine(to: CGPoint(x: width / 2, y: height))
            }
            .stroke(Color.terminalBorder.opacity(0.4), style: StrokeStyle(lineWidth: 0.5, dash: [4, 4]))

            // LEFT: Open slope with thin snow
            let leftProfile = Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.3))
                path.addLine(to: CGPoint(x: width * 0.15, y: height * 0.25))
                path.addLine(to: CGPoint(x: width * 0.3, y: height * 0.4))
                path.addLine(to: CGPoint(x: width * 0.45, y: height * 0.6))
                path.addLine(to: CGPoint(x: width * 0.48, y: height))
                path.addLine(to: CGPoint(x: 0, y: height))
                path.closeSubpath()
            }

            leftProfile
                .fill(Color(hex: "4B5563").opacity(0.6))

            // Thin snow layer on left slope
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.28))
                path.addLine(to: CGPoint(x: width * 0.15, y: height * 0.23))
                path.addLine(to: CGPoint(x: width * 0.3, y: height * 0.38))
                path.addLine(to: CGPoint(x: width * 0.45, y: height * 0.58))
            }
            .stroke(Color.white.opacity(0.6), lineWidth: 2)

            // Thin snow depth indicator
            Path { path in
                let x = width * 0.2
                path.move(to: CGPoint(x: x, y: height * 0.24))
                path.addLine(to: CGPoint(x: x, y: height * 0.28))
            }
            .stroke(Color.amber.opacity(0.7), lineWidth: 2)

            Text("~30cm")
                .font(.mono(7, weight: .bold))
                .foregroundStyle(Color.amber)
                .position(x: width * 0.2, y: height * 0.2)

            Text("OPEN SLOPE")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.textMuted)
                .position(x: width * 0.25, y: height * 0.12)

            // RIGHT: V-gully with deep burial
            let rightProfile = Path { path in
                path.move(to: CGPoint(x: width * 0.52, y: height * 0.25))
                path.addLine(to: CGPoint(x: width * 0.65, y: height * 0.3))
                // V-gully
                path.addLine(to: CGPoint(x: width * 0.72, y: height * 0.65))
                path.addLine(to: CGPoint(x: width * 0.75, y: height * 0.7))
                path.addLine(to: CGPoint(x: width * 0.78, y: height * 0.65))
                // Right wall
                path.addLine(to: CGPoint(x: width * 0.88, y: height * 0.3))
                path.addLine(to: CGPoint(x: width, y: height * 0.28))
                path.addLine(to: CGPoint(x: width, y: height))
                path.addLine(to: CGPoint(x: width * 0.52, y: height))
                path.closeSubpath()
            }

            rightProfile
                .fill(Color(hex: "4B5563").opacity(0.6))

            // Deep snow fill in gully
            Path { path in
                path.move(to: CGPoint(x: width * 0.68, y: height * 0.4))
                path.addLine(to: CGPoint(x: width * 0.72, y: height * 0.65))
                path.addLine(to: CGPoint(x: width * 0.75, y: height * 0.7))
                path.addLine(to: CGPoint(x: width * 0.78, y: height * 0.65))
                path.addLine(to: CGPoint(x: width * 0.82, y: height * 0.4))
                path.closeSubpath()
            }
            .fill(Color.white.opacity(0.25))

            // Deep burial depth indicator
            Path { path in
                let x = width * 0.75
                path.move(to: CGPoint(x: x, y: height * 0.4))
                path.addLine(to: CGPoint(x: x, y: height * 0.7))
            }
            .stroke(Color.danger.opacity(0.7), lineWidth: 2)

            Text("~3m!")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.danger)
                .position(x: width * 0.75, y: height * 0.35)

            Text("GULLY")
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.danger.opacity(0.9))
                .position(x: width * 0.75, y: height * 0.12)
        }
    }
}
