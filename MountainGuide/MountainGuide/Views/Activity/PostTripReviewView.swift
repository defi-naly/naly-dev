import SwiftUI

// MARK: - Post-Trip Review View

struct PostTripReviewView: View {
    let activityId: UUID
    let activityType: Activity
    let onComplete: () -> Void

    @EnvironmentObject var store: KnowledgeStore
    @Environment(\.dismiss) private var dismiss

    @State private var currentStep = 0
    @State private var conditions = ConditionsSnapshot()
    @State private var hazardEntries: [HazardEntry] = []
    @State private var keyDecision = ""
    @State private var wouldRepeat: Bool? = nil
    @State private var decisionExplanation = ""
    @State private var lessonsLearned = ""
    @State private var relevantDomains: [DomainId] = []

    private let totalSteps = 5

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Progress dots
                HStack(spacing: 8) {
                    ForEach(0..<totalSteps, id: \.self) { step in
                        Circle()
                            .fill(step <= currentStep ? Color.accent : Color.terminalBorder)
                            .frame(width: 8, height: 8)
                    }
                }
                .padding(.top, 16)

                // Step content
                ScrollView {
                    switch currentStep {
                    case 0:
                        ConditionsStepView(conditions: $conditions)
                    case 1:
                        HazardsStepView(
                            activityType: activityType,
                            hazardEntries: $hazardEntries
                        )
                    case 2:
                        DecisionStepView(
                            keyDecision: $keyDecision,
                            wouldRepeat: $wouldRepeat,
                            decisionExplanation: $decisionExplanation
                        )
                    case 3:
                        LessonsStepView(
                            lessonsLearned: $lessonsLearned,
                            relevantDomains: $relevantDomains,
                            suggestedDomains: suggestedDomains
                        )
                    case 4:
                        ReviewSummaryView(
                            conditions: conditions,
                            hazards: hazardEntries,
                            keyDecision: keyDecision,
                            wouldRepeat: wouldRepeat,
                            lessonsLearned: lessonsLearned,
                            xpPreview: calculateXP()
                        )
                    default:
                        EmptyView()
                    }
                }
                .padding(.horizontal)

                // Navigation buttons
                HStack {
                    if currentStep > 0 {
                        Button {
                            withAnimation { currentStep -= 1 }
                        } label: {
                            HStack {
                                Image(systemName: "chevron.left")
                                Text("Back")
                            }
                            .font(.mono(14))
                            .foregroundStyle(Color.textMuted)
                        }
                    }

                    Spacer()

                    if currentStep < totalSteps - 1 {
                        Button {
                            withAnimation { currentStep += 1 }
                        } label: {
                            HStack {
                                Text("Next")
                                Image(systemName: "chevron.right")
                            }
                            .font(.mono(14, weight: .semibold))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(Color.accent)
                            .cornerRadius(10)
                        }
                    } else {
                        Button(action: submitReview) {
                            HStack {
                                Image(systemName: "checkmark")
                                Text("Submit")
                            }
                            .font(.mono(14, weight: .semibold))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 10)
                            .background(Color.emerald)
                            .cornerRadius(10)
                        }
                    }
                }
                .padding()
            }
            .background(Color.terminalBg)
            .navigationTitle("Post-Trip Review")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Cancel") { dismiss() }
                        .font(.mono(14))
                        .foregroundStyle(Color.textMuted)
                }
            }
        }
    }

    // MARK: - Suggested Domains

    private var suggestedDomains: [DomainId] {
        let hazardDomains = hazardEntries.map { entry in
            HazardContent.hazards(for: activityType)
                .first { $0.category == entry.category }?.domain ?? .weather
        }
        return Array(Set(hazardDomains))
    }

    // MARK: - XP Calculation

    private func calculateXP() -> Int {
        GamificationEngine.calculateReviewXP(
            hazardCount: hazardEntries.count,
            hasDecision: !keyDecision.isEmpty
        )
    }

    // MARK: - Submit

    private func submitReview() {
        let xp = calculateXP()

        let review = PostTripReview(
            activityId: activityId,
            activityType: activityType,
            hazards: hazardEntries,
            keyDecision: keyDecision.isEmpty ? nil : keyDecision,
            wouldRepeatDecision: wouldRepeat,
            decisionExplanation: decisionExplanation.isEmpty ? nil : decisionExplanation,
            relevantDomains: relevantDomains,
            lessonsLearned: lessonsLearned.isEmpty ? nil : lessonsLearned,
            safetyXPAwarded: xp
        )

        // Save review
        Task {
            await ActivityFileStore.shared.saveReview(review)
        }

        // Award Safety XP
        let domain = activityType.relevantDomains.first ?? .weather
        store.addXP(xp, axis: .safety, domain: domain)

        // Remove from pending
        ActivityLogStore.shared.removePendingReview(activityId: activityId)

        onComplete()
        dismiss()
    }
}
