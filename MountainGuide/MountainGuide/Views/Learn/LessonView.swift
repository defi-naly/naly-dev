import SwiftUI

struct LessonView: View {
    @EnvironmentObject var store: KnowledgeStore
    @Environment(\.dismiss) private var dismiss
    let module: Module
    let domain: Domain
    let lesson: Lesson

    @State private var phase: LessonPhase = .teach
    @State private var stepsViewed = 0
    @State private var questionsAttempted = 0
    @State private var questionsCorrect = 0
    @State private var totalXP = 0

    enum LessonPhase {
        case teach
        case practice
        case synthesis
        case results
    }

    private var isFirstCompletion: Bool {
        store.moduleMastery(domain: module.domain, slug: module.slug)?.completedAt == nil
    }

    var body: some View {
        ZStack {
            Color.terminalBg.ignoresSafeArea()

            switch phase {
            case .teach:
                LessonTeachingPhase(
                    steps: lesson.teachingSteps,
                    domainColor: domain.id.color
                ) { viewed in
                    stepsViewed = viewed
                    totalXP += viewed * XPReward.teachingStepViewed
                    withAnimation(.spring(response: 0.4)) {
                        phase = .practice
                    }
                }
                .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .leading)))

            case .practice:
                LessonPracticePhase(
                    questions: lesson.practiceQuestions,
                    domainColor: domain.id.color
                ) { attempted, correct in
                    questionsAttempted = attempted
                    questionsCorrect = correct
                    totalXP += correct * XPReward.practiceCorrect
                    totalXP += (attempted - correct) * XPReward.practiceAttempted
                    withAnimation(.spring(response: 0.4)) {
                        phase = .synthesis
                    }
                }
                .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .leading)))

            case .synthesis:
                LessonSynthesisPhase(
                    synthesisPrompt: lesson.synthesisPrompt,
                    conceptMapNodes: lesson.conceptMapNodes,
                    currentModuleId: lesson.id,
                    domainColor: domain.id.color
                ) {
                    totalXP += XPReward.synthesisCompleted
                    if isFirstCompletion {
                        totalXP += XPReward.firstCompletion
                    }
                    completeLesson()
                    withAnimation(.spring(response: 0.4)) {
                        phase = .results
                    }
                }
                .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .leading)))

            case .results:
                let medal = GamificationEngine.evaluateMedal(
                    questionsAttempted: questionsAttempted,
                    questionsCorrect: questionsCorrect
                )
                LessonResultsPhase(
                    xpEarned: totalXP,
                    medal: medal,
                    questionsAttempted: questionsAttempted,
                    questionsCorrect: questionsCorrect,
                    isFirstCompletion: isFirstCompletion,
                    onDismiss: { dismiss() },
                    onReviewMistakes: nil
                )
                .transition(.opacity)
            }
        }
        .navigationBarTitleDisplayMode(.inline)
        .navigationTitle(module.title)
        .toolbarColorScheme(.dark, for: .navigationBar)
        .onAppear {
            if store.moduleMastery(domain: module.domain, slug: module.slug)?.phase == .locked {
                store.startModule(domain: module.domain, slug: module.slug)
            }
        }
    }

    private func completeLesson() {
        // Generate SRS cards
        let cards = CardGenerator.generateCardsForModule(domain: module.domain, moduleSlug: module.slug)
        store.completeModule(domain: module.domain, slug: module.slug, newCards: cards)

        // Record gamification
        store.recordLessonCompletion(
            domain: module.domain,
            slug: module.slug,
            attempted: questionsAttempted,
            correct: questionsCorrect,
            xp: totalXP
        )

        let impact = UINotificationFeedbackGenerator()
        impact.notificationOccurred(.success)
    }
}
