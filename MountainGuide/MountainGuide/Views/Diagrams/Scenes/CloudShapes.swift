import SwiftUI

enum CloudShapes {

    /// Cumulus cloud path: flat base with cauliflower bumps on top
    static func cumulus(center: CGPoint, width: CGFloat, height: CGFloat) -> Path {
        Path { path in
            let baseY = center.y + height * 0.2
            let left = center.x - width / 2
            let right = center.x + width / 2

            // Flat base
            path.move(to: CGPoint(x: left, y: baseY))
            path.addLine(to: CGPoint(x: right, y: baseY))

            // Cauliflower top — overlapping bumps right to left
            let bumpCount = 5
            let bumpSpacing = width / CGFloat(bumpCount)
            for i in (0..<bumpCount).reversed() {
                let bx = left + bumpSpacing * (CGFloat(i) + 0.5)
                let bumpHeight = height * (0.5 + 0.3 * sin(CGFloat(i) * 1.2))
                let by = baseY - bumpHeight
                let radius = bumpSpacing * 0.6

                path.addArc(
                    center: CGPoint(x: bx, y: by),
                    radius: radius,
                    startAngle: .degrees(0),
                    endAngle: .degrees(180),
                    clockwise: true
                )
            }

            path.closeSubpath()
        }
    }

    /// Lenticular cloud path: smooth lens-shaped ellipse
    static func lenticular(center: CGPoint, width: CGFloat, height: CGFloat) -> Path {
        Path { path in
            path.addEllipse(in: CGRect(
                x: center.x - width / 2,
                y: center.y - height / 2,
                width: width,
                height: height
            ))
        }
    }

    /// Wispy/cirrus-like cloud path: thin stretched streaks
    static func wispy(center: CGPoint, width: CGFloat, height: CGFloat) -> Path {
        Path { path in
            let left = center.x - width / 2
            let right = center.x + width / 2

            path.move(to: CGPoint(x: left, y: center.y))
            path.addQuadCurve(
                to: CGPoint(x: center.x, y: center.y - height * 0.3),
                control: CGPoint(x: left + width * 0.3, y: center.y - height * 0.5)
            )
            path.addQuadCurve(
                to: CGPoint(x: right, y: center.y + height * 0.1),
                control: CGPoint(x: center.x + width * 0.3, y: center.y - height * 0.2)
            )
            path.addQuadCurve(
                to: CGPoint(x: left, y: center.y),
                control: CGPoint(x: center.x, y: center.y + height * 0.4)
            )
        }
    }

    /// Simple mountain silhouette across full width
    static func mountainSilhouette(width: CGFloat, height: CGFloat, peakY: CGFloat = 0.3) -> Path {
        Path { path in
            path.move(to: CGPoint(x: 0, y: height))
            path.addLine(to: CGPoint(x: width * 0.1, y: height * 0.7))
            path.addLine(to: CGPoint(x: width * 0.25, y: height * 0.5))
            path.addLine(to: CGPoint(x: width * 0.4, y: height * peakY))
            path.addLine(to: CGPoint(x: width * 0.5, y: height * (peakY + 0.05)))
            path.addLine(to: CGPoint(x: width * 0.6, y: height * peakY))
            path.addLine(to: CGPoint(x: width * 0.75, y: height * 0.55))
            path.addLine(to: CGPoint(x: width * 0.85, y: height * 0.65))
            path.addLine(to: CGPoint(x: width, y: height * 0.75))
            path.addLine(to: CGPoint(x: width, y: height))
            path.closeSubpath()
        }
    }
}
