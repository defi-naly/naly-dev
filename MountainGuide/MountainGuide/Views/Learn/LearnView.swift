import SwiftUI

// MARK: - Unified Learn Tab

struct LearnView: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var selectedSegment: LearnSegment = .modules

    enum LearnSegment: String, CaseIterable {
        case modules = "Modules"
        case articles = "Articles"
        case review = "Review"
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                Picker("Learn", selection: $selectedSegment) {
                    ForEach(LearnSegment.allCases, id: \.self) { segment in
                        Text(segment.rawValue).tag(segment)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                .padding(.top, 8)

                switch selectedSegment {
                case .modules:
                    ModulesContent()
                        .environmentObject(store)
                case .articles:
                    ArticlesContent()
                case .review:
                    ReviewContent()
                        .environmentObject(store)
                }
            }
            .background(Color.terminalBg)
            .navigationTitle("Learn")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

// MARK: - Modules Content (extracted from DomainListView)

struct ModulesContent: View {
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                ForEach(DomainContent.allDomains) { domain in
                    NavigationLink {
                        ModuleListView(domain: domain)
                            .environmentObject(store)
                    } label: {
                        DomainCard(
                            domain: domain,
                            strength: store.domainStrength(domain.id),
                            completed: store.completedModuleCount(domainId: domain.id)
                        )
                    }
                }

                // Scenarios section
                VStack(alignment: .leading, spacing: 12) {
                    Text("SCENARIOS")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)

                    ForEach(ScenarioContent.allScenarios) { scenario in
                        NavigationLink {
                            ScenarioView(scenario: scenario)
                                .environmentObject(store)
                        } label: {
                            ScenarioCard(scenario: scenario, store: store)
                        }
                    }
                }
                .padding(.top, 8)
            }
            .padding()
        }
        .background(Color.terminalBg)
    }
}

// MARK: - Articles Content (extracted from ExploreView)

struct ArticlesContent: View {
    @State private var searchText = ""
    @State private var expandedDomain: DomainId?

    private var domains: [Domain] {
        DomainContent.allDomains
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Search bar
                HStack(spacing: 8) {
                    Image(systemName: "magnifyingglass")
                        .foregroundStyle(Color.textDim)
                    TextField("Search articles...", text: $searchText)
                        .font(.mono(14))
                        .foregroundStyle(Color.textPrimary)
                }
                .padding(12)
                .background(Color.terminalSurface)
                .cornerRadius(10)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(Color.terminalBorder, lineWidth: 1)
                )
                .padding(.horizontal)

                if searchText.isEmpty {
                    ForEach(domains) { domain in
                        domainSection(domain)
                    }
                } else {
                    ExploreSearchResultsView(query: searchText)
                }
            }
            .padding(.bottom, 32)
        }
        .background(Color.terminalBg)
    }

    private func domainSection(_ domain: Domain) -> some View {
        let articles = ExploreContentData.getArticles(domain: domain.id)
        let isExpanded = expandedDomain == domain.id

        return VStack(alignment: .leading, spacing: 8) {
            Button {
                withAnimation(.spring(response: 0.3)) {
                    expandedDomain = isExpanded ? nil : domain.id
                }
            } label: {
                HStack(spacing: 12) {
                    Image(systemName: domain.id.icon)
                        .font(.system(size: 20))
                        .foregroundStyle(domain.id.color)
                        .frame(width: 32)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(domain.name)
                            .font(.mono(16, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text("\(articles.count) articles")
                            .font(.mono(11))
                            .foregroundStyle(Color.textMuted)
                    }

                    Spacer()

                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundStyle(Color.textDim)
                }
                .padding(14)
                .background(Color.terminalSurface)
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.terminalBorder, lineWidth: 1)
                )
            }

            if isExpanded {
                VStack(spacing: 4) {
                    ForEach(articles) { article in
                        NavigationLink {
                            ExploreArticleView(article: article)
                        } label: {
                            articleRow(article, domainColor: domain.id.color)
                        }
                    }
                }
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .padding(.horizontal)
    }

    private func articleRow(_ article: ExploreArticle, domainColor: Color) -> some View {
        HStack(spacing: 10) {
            Image(systemName: article.icon)
                .font(.system(size: 14))
                .foregroundStyle(domainColor)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 2) {
                Text(article.title)
                    .font(.mono(13, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                    .lineLimit(1)
                Text(article.summary)
                    .font(.mono(10))
                    .foregroundStyle(Color.textMuted)
                    .lineLimit(2)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.system(size: 10))
                .foregroundStyle(Color.textDim)
        }
        .padding(10)
        .background(Color.terminalBg)
        .cornerRadius(8)
    }
}

// MARK: - Review Content (extracted from ReviewSessionView)

struct ReviewContent: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var currentIndex = 0
    @State private var showAnswer = false
    @State private var sessionCards: [SRSCard] = []
    @State private var reviewedCount = 0
    @State private var sessionComplete = false
    @State private var sessionXP = 0

    var body: some View {
        ZStack {
            Color.terminalBg.ignoresSafeArea()

            if sessionComplete || sessionCards.isEmpty {
                reviewCompleteView
            } else {
                reviewCardView
            }
        }
        .onAppear {
            sessionCards = store.dueCards
            currentIndex = 0
            reviewedCount = 0
            sessionComplete = false
            showAnswer = false
        }
    }

    private var reviewCardView: some View {
        let card = sessionCards[currentIndex]

        return VStack(spacing: 0) {
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

            if showAnswer {
                GradeButtonsView { grade in
                    gradeCard(grade)
                }
                .padding(.horizontal)
                .padding(.bottom, 16)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            } else {
                Text("Tap card to reveal answer")
                    .font(.mono(12))
                    .foregroundStyle(Color.textDim)
                    .padding(.bottom, 24)
            }
        }
        .animation(.easeInOut(duration: 0.2), value: showAnswer)
    }

    private var reviewCompleteView: some View {
        VStack(spacing: 24) {
            Image(systemName: sessionCards.isEmpty ? "tray.fill" : "checkmark.circle.fill")
                .font(.system(size: 48))
                .foregroundStyle(sessionCards.isEmpty ? Color.textMuted : Color.emerald)

            if sessionCards.isEmpty {
                Text("No cards due")
                    .font(.mono(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Text("Complete modules in the Modules tab to generate review cards.")
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

    private func gradeCard(_ grade: Grade) {
        let card = sessionCards[currentIndex]
        let updatedCard = SRSEngine.calculateNextReview(card: card, grade: grade)
        store.updateCardAfterReview(updatedCard: updatedCard)

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
            return horizontal < 0 ? .again : .easy
        } else {
            return vertical < 0 ? .good : .hard
        }
    }
}
