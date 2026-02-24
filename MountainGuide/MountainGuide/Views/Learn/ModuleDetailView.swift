import SwiftUI

// MARK: - Module Detail View (Phase 0: Reference-type content + quiz)

struct ModuleDetailView: View {
    @EnvironmentObject var store: KnowledgeStore
    @Environment(\.dismiss) private var dismiss
    let module: Module
    let domain: Domain

    @State private var phase: ModulePhase = .content
    @State private var selectedAnswer: Int? = nil
    @State private var showExplanation = false
    @State private var freeRecallText = ""
    @State private var showFreeRecallAnswer = false

    enum ModulePhase {
        case content
        case freeRecall
        case application
        case connection
        case complete
    }

    private var mastery: ModuleMastery? {
        store.moduleMastery(domain: module.domain, slug: module.slug)
    }

    private var isCompleted: Bool {
        mastery?.completedAt != nil
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                moduleHeader

                switch phase {
                case .content:
                    contentPhase
                case .freeRecall:
                    freeRecallPhase
                case .application:
                    applicationPhase
                case .connection:
                    connectionPhase
                case .complete:
                    completePhase
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle(module.title)
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            if mastery?.phase == .locked {
                store.startModule(domain: module.domain, slug: module.slug)
            }
        }
    }

    // MARK: - Header

    private var moduleHeader: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(module.difficulty.label.uppercased())
                    .font(.mono(10, weight: .bold))
                    .foregroundStyle(module.difficulty.color)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(module.difficulty.color.opacity(0.15))
                    .cornerRadius(4)

                Spacer()

                if let m = mastery {
                    Text(m.phase.label)
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(MasteryEngine.phaseColor(m.phase, strength: MasteryEngine.getModuleStrength(m, cards: store.state.cards)))
                }
            }

            Text(module.concept)
                .font(.mono(12))
                .foregroundStyle(Color.textMuted)
        }
    }

    // MARK: - Content Phase

    private var contentPhase: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Key concept
            VStack(alignment: .leading, spacing: 8) {
                Text("KEY CONCEPT")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(domain.id.color)

                Text(module.concept)
                    .font(.mono(15, weight: .medium))
                    .foregroundStyle(Color.textPrimary)
            }
            .terminalCard()

            // Takeaway
            VStack(alignment: .leading, spacing: 8) {
                Text("TAKEAWAY")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(Color.amber)

                Text(module.takeaway)
                    .font(.mono(14))
                    .foregroundStyle(Color.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .terminalCard()

            // Related modules
            if let related = module.relatedModules, !related.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("CONNECTIONS")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)

                    ForEach(related, id: \.slug) { ref in
                        if let relatedMod = DomainContent.getModule(domainId: ref.domain, slug: ref.slug) {
                            HStack(spacing: 8) {
                                Image(systemName: "link")
                                    .font(.system(size: 10))
                                    .foregroundStyle(ref.domain.color)
                                Text("\(ref.domain.rawValue.capitalized): \(relatedMod.title)")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textPrimary)
                            }
                        }
                    }
                }
                .terminalCard()
            }

            // Continue button
            if isCompleted {
                Text("Module already completed. Review via the Review tab.")
                    .font(.mono(12))
                    .foregroundStyle(Color.textDim)
                    .padding(.top, 8)
            } else {
                Button {
                    withAnimation { phase = .freeRecall }
                } label: {
                    HStack {
                        Text("Begin Retrieval Practice")
                            .font(.mono(14, weight: .bold))
                        Image(systemName: "arrow.right")
                    }
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(Color.amber)
                    .cornerRadius(10)
                }
            }
        }
    }

    // MARK: - Free Recall Phase

    private var freeRecallPhase: some View {
        VStack(alignment: .leading, spacing: 16) {
            phaseIndicator("Phase 1 of 3", subtitle: "Free Recall")

            Text("In your own words, explain:")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            Text(module.concept)
                .font(.mono(16, weight: .semibold))
                .foregroundStyle(Color.textPrimary)

            TextEditor(text: $freeRecallText)
                .font(.mono(14))
                .frame(minHeight: 120)
                .padding(12)
                .background(Color.terminalSurface)
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.terminalBorder, lineWidth: 1)
                )

            if showFreeRecallAnswer {
                VStack(alignment: .leading, spacing: 8) {
                    Text("KEY ANSWER")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.emerald)
                    Text(module.takeaway)
                        .font(.mono(14))
                        .foregroundStyle(Color.textPrimary)
                }
                .terminalCard()

                Button {
                    withAnimation { phase = .application }
                } label: {
                    continueButton("Continue to Application")
                }
            } else {
                Button {
                    withAnimation { showFreeRecallAnswer = true }
                } label: {
                    continueButton("Reveal Answer")
                }
            }
        }
    }

    // MARK: - Application Phase

    private var applicationPhase: some View {
        VStack(alignment: .leading, spacing: 16) {
            phaseIndicator("Phase 2 of 3", subtitle: "Application")

            if let scenario = module.applicationScenario {
                Text(scenario.situation)
                    .font(.mono(14))
                    .foregroundStyle(Color.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)

                ForEach(Array(scenario.options.enumerated()), id: \.offset) { index, option in
                    Button {
                        selectedAnswer = index
                        showExplanation = true
                        let impact = UIImpactFeedbackGenerator(style: option.correct ? .light : .heavy)
                        impact.impactOccurred()
                    } label: {
                        HStack(alignment: .top, spacing: 12) {
                            Image(systemName: answerIcon(index, option: option))
                                .font(.system(size: 16))
                                .foregroundStyle(answerColor(index, option: option))
                                .frame(width: 24)

                            VStack(alignment: .leading, spacing: 4) {
                                Text(option.label)
                                    .font(.mono(13))
                                    .foregroundStyle(Color.textPrimary)
                                    .multilineTextAlignment(.leading)

                                if showExplanation && selectedAnswer == index {
                                    Text(option.explanation)
                                        .font(.mono(11))
                                        .foregroundStyle(option.correct ? Color.emerald : Color.textMuted)
                                }
                            }
                        }
                        .padding(12)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(answerBackground(index, option: option))
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(answerBorder(index, option: option), lineWidth: 1)
                        )
                    }
                    .disabled(showExplanation)
                }

                if showExplanation {
                    Button {
                        selectedAnswer = nil
                        showExplanation = false
                        withAnimation { phase = .connection }
                    } label: {
                        continueButton("Continue to Connection")
                    }
                }
            } else {
                Text("No application scenario available for this module.")
                    .font(.mono(13))
                    .foregroundStyle(Color.textDim)

                Button {
                    withAnimation { phase = .connection }
                } label: {
                    continueButton("Continue")
                }
            }
        }
    }

    // MARK: - Connection Phase

    private var connectionPhase: some View {
        VStack(alignment: .leading, spacing: 16) {
            phaseIndicator("Phase 3 of 3", subtitle: "Connection")

            let question = module.connectionPrompt ?? "How does \(module.title.lowercased()) connect to safety decision-making in the mountains?"

            Text(question)
                .font(.mono(15, weight: .medium))
                .foregroundStyle(Color.textPrimary)
                .fixedSize(horizontal: false, vertical: true)

            if let related = module.relatedModules?.first,
               let relatedMod = DomainContent.getModule(domainId: related.domain, slug: related.slug) {
                HStack(spacing: 8) {
                    Image(systemName: "link")
                        .foregroundStyle(related.domain.color)
                    Text("Connected to: \(relatedMod.title)")
                        .font(.mono(12))
                        .foregroundStyle(Color.textMuted)
                }
            }

            Button {
                completeModuleAndGenerateCards()
                withAnimation { phase = .complete }
            } label: {
                continueButton("Complete Module")
            }
        }
    }

    // MARK: - Complete Phase

    private var completePhase: some View {
        VStack(spacing: 20) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 48))
                .foregroundStyle(Color.emerald)

            Text("Module Complete!")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            Text("3 review cards generated. They'll appear in your review queue over the next 3 days.")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
                .multilineTextAlignment(.center)

            Button {
                dismiss()
            } label: {
                continueButton("Back to Modules")
            }
        }
        .padding(.top, 24)
    }

    // MARK: - Helpers

    private func phaseIndicator(_ title: String, subtitle: String) -> some View {
        HStack {
            Text(title)
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.amber)
            Text("—")
                .foregroundStyle(Color.textDim)
            Text(subtitle)
                .font(.mono(11, weight: .medium))
                .foregroundStyle(Color.textMuted)
        }
    }

    private func continueButton(_ text: String) -> some View {
        HStack {
            Text(text)
                .font(.mono(14, weight: .bold))
            Image(systemName: "arrow.right")
        }
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(Color.amber)
        .cornerRadius(10)
    }

    private func answerIcon(_ index: Int, option: ApplicationOption) -> String {
        guard showExplanation else { return "circle" }
        if option.correct { return "checkmark.circle.fill" }
        if selectedAnswer == index { return "xmark.circle.fill" }
        return "circle"
    }

    private func answerColor(_ index: Int, option: ApplicationOption) -> Color {
        guard showExplanation else { return .textMuted }
        if option.correct { return .emerald }
        if selectedAnswer == index { return .danger }
        return .textDim
    }

    private func answerBackground(_ index: Int, option: ApplicationOption) -> Color {
        guard showExplanation else { return .terminalSurface }
        if option.correct { return Color.emerald.opacity(0.1) }
        if selectedAnswer == index { return Color.danger.opacity(0.1) }
        return .terminalSurface
    }

    private func answerBorder(_ index: Int, option: ApplicationOption) -> Color {
        guard showExplanation else { return .terminalBorder }
        if option.correct { return .emerald.opacity(0.5) }
        if selectedAnswer == index { return .danger.opacity(0.5) }
        return .terminalBorder
    }

    private func completeModuleAndGenerateCards() {
        let cards = CardGenerator.generateCardsForModule(domain: module.domain, moduleSlug: module.slug)
        store.completeModule(domain: module.domain, slug: module.slug, newCards: cards)

        let impact = UINotificationFeedbackGenerator()
        impact.notificationOccurred(.success)
    }
}
