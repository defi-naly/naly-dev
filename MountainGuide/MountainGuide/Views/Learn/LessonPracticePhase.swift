import SwiftUI

struct LessonPracticePhase: View {
    let questions: [PracticeQuestion]
    let domainColor: Color
    let onComplete: (Int, Int) -> Void  // (attempted, correct)

    @State private var currentIndex = 0
    @State private var attempted = 0
    @State private var correct = 0
    @State private var runningXP = 0
    @State private var showXPBurst = false

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("PRACTICE")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(domainColor)
                Text("\(currentIndex + 1) of \(questions.count)")
                    .font(.mono(11))
                    .foregroundStyle(Color.textMuted)

                Spacer()

                // Running score
                HStack(spacing: 8) {
                    Text("\(correct)/\(attempted) correct")
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(Color.textMuted)

                    Text("+\(runningXP) XP")
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(Color.amber)
                }
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)
            .padding(.bottom, 8)

            // Progress bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(Color.terminalBorder)
                        .frame(height: 3)

                    Rectangle()
                        .fill(domainColor)
                        .frame(width: geo.size.width * CGFloat(currentIndex) / CGFloat(max(questions.count, 1)), height: 3)
                        .animation(.easeInOut(duration: 0.3), value: currentIndex)
                }
            }
            .frame(height: 3)
            .padding(.horizontal, 16)

            // Question content
            ScrollView {
                if currentIndex < questions.count {
                    PracticeQuestionFactory.makeQuestion(questions[currentIndex]) { isCorrect in
                        handleAnswer(isCorrect: isCorrect)
                    }
                    .id(currentIndex)
                    .padding(16)
                    .transition(.asymmetric(
                        insertion: .move(edge: .trailing).combined(with: .opacity),
                        removal: .move(edge: .leading).combined(with: .opacity)
                    ))
                }
            }

            // XP burst overlay
            if showXPBurst {
                XPBurstView(amount: runningXP, label: "Practice XP")
                    .transition(.scale.combined(with: .opacity))
            }
        }
        .background(Color.terminalBg)
    }

    private func handleAnswer(isCorrect: Bool) {
        attempted += 1
        if isCorrect {
            correct += 1
            runningXP += XPReward.practiceCorrect
        } else {
            runningXP += XPReward.practiceAttempted
        }

        // Advance to next question or complete
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            if currentIndex < questions.count - 1 {
                withAnimation(.spring(response: 0.3)) {
                    currentIndex += 1
                }
            } else {
                withAnimation(.spring(response: 0.4)) {
                    showXPBurst = true
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                    onComplete(attempted, correct)
                }
            }
        }
    }
}
