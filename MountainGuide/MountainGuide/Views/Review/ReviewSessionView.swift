import SwiftUI

struct ReviewSessionView: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var currentIndex = 0
    @State private var showAnswer = false
    @State private var sessionCards: [SRSCard] = []
    @State private var reviewedCount = 0
    @State private var sessionComplete = false
    @State private var sessionXP = 0

    var body: some View {
        NavigationStack {
            ZStack {
                Color.terminalBg.ignoresSafeArea()

                if sessionComplete || sessionCards.isEmpty {
                    sessionCompleteView
                } else {
                    cardReviewView
                }
            }
            .navigationTitle("Review")
            .navigationBarTitleDisplayMode(.inline)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .onAppear {
                sessionCards = store.dueCards
                currentIndex = 0
                reviewedCount = 0
                sessionComplete = false
                showAnswer = false
            }
        }
    }

    // MARK: - Card Review

    private var cardReviewView: some View {
        let card = sessionCards[currentIndex]

        return VStack(spacing: 0) {
            // Progress bar
            HStack(spacing: 4) {
                Text("\(currentIndex + 1)/\(sessionCards.count)")
                    .font(.mono(12, weight: .bold))
                    .foregroundStyle(Color.textMuted)
                Spacer()
                Text(card.cardType.label)
                    .font(.mono(11, weight: .medium))
                    .foregroundStyle(card.domain.color)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 2)
                    .background(card.domain.color.opacity(0.15))
                    .cornerRadius(4)
            }
            .padding(.horizontal)
            .padding(.top, 8)

            GeometryReader { geo in
                ZStack {
                    // Card
                    CardView(
                        card: card,
                        showAnswer: showAnswer,
                        onTap: { showAnswer = true }
                    )
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding()
                    .gesture(
                        DragGesture(minimumDistance: 50)
                            .onEnded { value in
                                guard showAnswer else { return }
                                let grade = gradeFromSwipe(value, in: geo.size)
                                if let grade { gradeCard(grade) }
                            }
                    )
                }
            }

            // Grade buttons (shown after reveal)
            if showAnswer {
                GradeButtonsView { grade in
                    gradeCard(grade)
                }
                .padding(.horizontal)
                .padding(.bottom, 16)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            } else {
                // Tap to reveal hint
                Text("Tap card to reveal answer")
                    .font(.mono(12))
                    .foregroundStyle(Color.textDim)
                    .padding(.bottom, 24)
            }
        }
        .animation(.easeInOut(duration: 0.2), value: showAnswer)
    }

    // MARK: - Session Complete

    private var sessionCompleteView: some View {
        VStack(spacing: 24) {
            Image(systemName: sessionCards.isEmpty ? "tray.fill" : "checkmark.circle.fill")
                .font(.system(size: 48))
                .foregroundStyle(sessionCards.isEmpty ? Color.textMuted : Color.emerald)

            if sessionCards.isEmpty {
                Text("No cards due")
                    .font(.mono(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text("Complete modules in the Learn tab to generate review cards.")
                    .font(.mono(14))
                    .foregroundStyle(Color.textMuted)
                    .multilineTextAlignment(.center)
            } else {
                Text("Session complete!")
                    .font(.mono(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text("\(reviewedCount) cards reviewed")
                    .font(.mono(14))
                    .foregroundStyle(Color.textMuted)

                // XP earned
                if sessionXP > 0 {
                    Text("+\(sessionXP) XP")
                        .font(.mono(18, weight: .bold))
                        .foregroundStyle(Color.amber)
                }

                if store.state.stats.currentStreak > 0 {
                    HStack(spacing: 4) {
                        Image(systemName: "flame.fill")
                            .foregroundStyle(Color.amber)
                        Text("\(store.state.stats.currentStreak) day streak")
                            .font(.mono(16, weight: .bold))
                            .foregroundStyle(Color.amber)
                    }
                }
            }
        }
        .padding()
    }

    // MARK: - Grading

    private func gradeCard(_ grade: Grade) {
        let card = sessionCards[currentIndex]
        let updatedCard = SRSEngine.calculateNextReview(card: card, grade: grade)
        store.updateCardAfterReview(updatedCard: updatedCard)

        // Award XP for review
        store.addReviewXP(grade: grade, domain: card.domain)
        sessionXP += GamificationEngine.xpForReview(grade: grade)

        let impact = UIImpactFeedbackGenerator(style: grade == .again ? .heavy : (grade == .easy ? .light : .medium))
        impact.impactOccurred()

        reviewedCount += 1
        showAnswer = false

        if currentIndex < sessionCards.count - 1 {
            currentIndex += 1
        } else {
            store.recordReviewSession(cardsReviewed: reviewedCount)
            NotificationService.shared.scheduleDailyReminder(dueCount: store.dueCardCount, streak: store.state.stats.currentStreak)
            sessionComplete = true
        }
    }

    private func gradeFromSwipe(_ value: DragGesture.Value, in size: CGSize) -> Grade? {
        let horizontal = value.translation.width
        let vertical = value.translation.height

        if abs(horizontal) > abs(vertical) {
            // Horizontal swipe
            return horizontal < 0 ? .again : .easy
        } else {
            // Vertical swipe
            return vertical < 0 ? .good : .hard
        }
    }
}

// MARK: - Card View

struct CardView: View {
    let card: SRSCard
    let showAnswer: Bool
    let onTap: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Card type badge
            HStack {
                Image(systemName: card.cardType.icon)
                    .font(.system(size: 12))
                Text(card.cardType.label.uppercased())
                    .font(.mono(10, weight: .bold))
            }
            .foregroundStyle(card.domain.color)

            // Module info
            Text(card.moduleSlug.replacingOccurrences(of: "-", with: " ").capitalized)
                .font(.mono(11))
                .foregroundStyle(Color.textDim)

            Divider()
                .background(Color.terminalBorder)

            // Question
            Text(card.question)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            if showAnswer {
                Divider()
                    .background(Color.terminalBorder)

                Text(card.answer)
                    .font(.mono(14))
                    .foregroundStyle(Color.emerald)
                    .fixedSize(horizontal: false, vertical: true)
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
            }

            Spacer()

            // Card metadata
            if showAnswer {
                HStack {
                    Label("Interval: \(card.interval)d", systemImage: "calendar")
                    Spacer()
                    Label("Ease: \(String(format: "%.1f", card.easeFactor))", systemImage: "gauge.with.dots.needle.33percent")
                    Spacer()
                    Label("Reps: \(card.repetitions)", systemImage: "arrow.clockwise")
                }
                .font(.mono(10))
                .foregroundStyle(Color.textDim)
            }
        }
        .padding(20)
        .background(Color.terminalSurface)
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(showAnswer ? Color.emerald.opacity(0.3) : Color.terminalBorder, lineWidth: 1)
        )
        .onTapGesture(perform: onTap)
        .animation(.easeInOut(duration: 0.3), value: showAnswer)
    }
}

// MARK: - Grade Buttons

struct GradeButtonsView: View {
    let onGrade: (Grade) -> Void

    var body: some View {
        VStack(spacing: 8) {
            // Swipe hint
            HStack(spacing: 16) {
                swipeHint("←", "Again", .danger)
                swipeHint("↑", "Good", .emerald)
                swipeHint("↓", "Hard", .amber)
                swipeHint("→", "Easy", .blue)
            }
            .font(.mono(9))
            .foregroundStyle(Color.textDim)

            // Buttons
            HStack(spacing: 8) {
                ForEach([Grade.again, .hard, .good, .easy], id: \.rawValue) { grade in
                    Button {
                        onGrade(grade)
                    } label: {
                        Text(grade.label)
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(grade == .again ? Color.white : Color.terminalBg)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color(hex: grade.color))
                            .cornerRadius(8)
                    }
                }
            }
        }
    }

    private func swipeHint(_ arrow: String, _ label: String, _ color: Color) -> some View {
        HStack(spacing: 2) {
            Text(arrow)
                .foregroundStyle(color)
            Text(label)
        }
    }
}
