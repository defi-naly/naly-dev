import SwiftUI

struct CumulusScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        ZStack {
            // Sky gradient
            LinearGradient(
                colors: [Color(hex: "DBEAFE"), Color(hex: "93C5FD")],
                startPoint: .top,
                endPoint: .bottom
            )

            // Main cumulus cloud
            let cloudCenter = CGPoint(x: width * 0.5, y: height * 0.4)
            let cloudW = width * 0.6
            let cloudH = height * 0.35

            // Cloud shadow/depth
            CloudShapes.cumulus(
                center: CGPoint(x: cloudCenter.x + 3, y: cloudCenter.y + 3),
                width: cloudW, height: cloudH
            )
            .fill(Color(hex: "6B7280").opacity(0.3))

            // Cloud body
            CloudShapes.cumulus(center: cloudCenter, width: cloudW, height: cloudH)
                .fill(
                    LinearGradient(
                        colors: [Color.white.opacity(0.95), Color(hex: "D1D5DB").opacity(0.7)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

            // Cloud highlight (top)
            CloudShapes.cumulus(
                center: CGPoint(x: cloudCenter.x - cloudW * 0.05, y: cloudCenter.y - cloudH * 0.05),
                width: cloudW * 0.8, height: cloudH * 0.7
            )
            .fill(Color.white.opacity(0.3))

            // Flat base line emphasis
            Path { path in
                let baseY = cloudCenter.y + cloudH * 0.2
                path.move(to: CGPoint(x: cloudCenter.x - cloudW / 2, y: baseY))
                path.addLine(to: CGPoint(x: cloudCenter.x + cloudW / 2, y: baseY))
            }
            .stroke(Color(hex: "9CA3AF").opacity(0.5), lineWidth: 1)

            // Small background cumulus
            CloudShapes.cumulus(
                center: CGPoint(x: width * 0.15, y: height * 0.5),
                width: width * 0.2, height: height * 0.12
            )
            .fill(Color.white.opacity(0.3))

            CloudShapes.cumulus(
                center: CGPoint(x: width * 0.85, y: height * 0.45),
                width: width * 0.18, height: height * 0.1
            )
            .fill(Color.white.opacity(0.25))

            // Ground plane
            Path { path in
                path.move(to: CGPoint(x: 0, y: height * 0.85))
                path.addLine(to: CGPoint(x: width, y: height * 0.85))
                path.addLine(to: CGPoint(x: width, y: height))
                path.addLine(to: CGPoint(x: 0, y: height))
                path.closeSubpath()
            }
            .fill(
                LinearGradient(
                    colors: [Color(hex: "86EFAC").opacity(0.4), Color(hex: "4ADE80").opacity(0.3)],
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
        }
    }
}
