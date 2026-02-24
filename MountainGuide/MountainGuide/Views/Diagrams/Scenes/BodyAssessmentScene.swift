import SwiftUI

struct BodyAssessmentScene: View {
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Canvas { context, size in
            // Background
            let bg = Path(roundedRect: CGRect(origin: .zero, size: size), cornerRadius: 0)
            context.fill(bg, with: .color(Color(hex: "F5F5F7")))

            let cx = size.width * 0.5
            let topY = size.height * 0.08

            // Head
            let headR: CGFloat = 14
            let headCenter = CGPoint(x: cx, y: topY + headR)
            let head = Path(ellipseIn: CGRect(x: headCenter.x - headR, y: headCenter.y - headR, width: headR * 2, height: headR * 2))
            context.stroke(head, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            // Neck
            var neck = Path()
            neck.move(to: CGPoint(x: cx, y: topY + headR * 2))
            neck.addLine(to: CGPoint(x: cx, y: topY + headR * 2 + 10))
            context.stroke(neck, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            // Torso
            let torsoTop = topY + headR * 2 + 10
            let torsoBot = torsoTop + size.height * 0.3
            var torso = Path()
            torso.move(to: CGPoint(x: cx - 20, y: torsoTop))
            torso.addLine(to: CGPoint(x: cx + 20, y: torsoTop))
            torso.addLine(to: CGPoint(x: cx + 16, y: torsoBot))
            torso.addLine(to: CGPoint(x: cx - 16, y: torsoBot))
            torso.closeSubpath()
            context.stroke(torso, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            // Arms
            var leftArm = Path()
            leftArm.move(to: CGPoint(x: cx - 20, y: torsoTop + 5))
            leftArm.addLine(to: CGPoint(x: cx - 45, y: torsoTop + 50))
            leftArm.addLine(to: CGPoint(x: cx - 40, y: torsoBot - 10))
            context.stroke(leftArm, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            var rightArm = Path()
            rightArm.move(to: CGPoint(x: cx + 20, y: torsoTop + 5))
            rightArm.addLine(to: CGPoint(x: cx + 45, y: torsoTop + 50))
            rightArm.addLine(to: CGPoint(x: cx + 40, y: torsoBot - 10))
            context.stroke(rightArm, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            // Legs
            var leftLeg = Path()
            leftLeg.move(to: CGPoint(x: cx - 12, y: torsoBot))
            leftLeg.addLine(to: CGPoint(x: cx - 20, y: torsoBot + size.height * 0.25))
            leftLeg.addLine(to: CGPoint(x: cx - 18, y: size.height * 0.88))
            context.stroke(leftLeg, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            var rightLeg = Path()
            rightLeg.move(to: CGPoint(x: cx + 12, y: torsoBot))
            rightLeg.addLine(to: CGPoint(x: cx + 20, y: torsoBot + size.height * 0.25))
            rightLeg.addLine(to: CGPoint(x: cx + 18, y: size.height * 0.88))
            context.stroke(rightLeg, with: .color(Color.textMuted.opacity(0.5)), lineWidth: 1.5)

            // Assessment zones (colored indicators)
            // A - Airway (head)
            let aZone = Path(ellipseIn: CGRect(x: headCenter.x - headR - 4, y: headCenter.y - headR - 4, width: (headR + 4) * 2, height: (headR + 4) * 2))
            context.stroke(aZone, with: .color(Color.danger.opacity(0.4)), style: StrokeStyle(lineWidth: 1, dash: [3, 3]))

            // B - Breathing (chest)
            let bZone = Path(ellipseIn: CGRect(x: cx - 22, y: torsoTop - 2, width: 44, height: 40))
            context.stroke(bZone, with: .color(Color.amber.opacity(0.4)), style: StrokeStyle(lineWidth: 1, dash: [3, 3]))

            // C - Circulation (wrist pulse)
            let cZone = Path(ellipseIn: CGRect(x: cx + 35, y: torsoBot - 16, width: 14, height: 14))
            context.stroke(cZone, with: .color(Color.emerald.opacity(0.4)), style: StrokeStyle(lineWidth: 1, dash: [3, 3]))

            // Labels on right side
            context.draw(
                Text("A").font(.mono(9, weight: .bold)).foregroundStyle(Color.danger.opacity(0.7)),
                at: CGPoint(x: cx + 30, y: headCenter.y)
            )
            context.draw(
                Text("B").font(.mono(9, weight: .bold)).foregroundStyle(Color.amber.opacity(0.7)),
                at: CGPoint(x: cx + 30, y: torsoTop + 18)
            )
            context.draw(
                Text("C").font(.mono(9, weight: .bold)).foregroundStyle(Color.emerald.opacity(0.7)),
                at: CGPoint(x: cx + 55, y: torsoBot - 10)
            )
        }
        .allowsHitTesting(false)
    }
}
