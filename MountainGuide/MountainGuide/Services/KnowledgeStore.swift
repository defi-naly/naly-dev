import Foundation
import SwiftUI

// MARK: - Review Stats

struct ReviewStats: Codable {
    var currentStreak: Int
    var longestStreak: Int
    var lastReviewDate: String?         // ISO date
    var reviewHistory: [String: Int]    // date → cards reviewed count (last 90 days)
    var totalReviews: Int

    static func empty() -> ReviewStats {
        ReviewStats(currentStreak: 0, longestStreak: 0, lastReviewDate: nil, reviewHistory: [:], totalReviews: 0)
    }
}

// MARK: - Knowledge State

struct KnowledgeState: Codable {
    var modules: [String: ModuleMastery]    // key: `${domain}-${moduleSlug}`
    var cards: [SRSCard]
    var stats: ReviewStats
    var gamification: GamificationState
    var version: Int
}

// MARK: - Knowledge Store (Observable)

class KnowledgeStore: ObservableObject {
    @Published var state: KnowledgeState

    private static let storageKey = "mountains-knowledge-v4"
    private static let v3StorageKey = "mountains-knowledge-v3"
    private static let legacyStorageKey = "mountains-knowledge-v2"

    var dueCardCount: Int {
        SRSEngine.getDueCards(state.cards).count
    }

    var dueCards: [SRSCard] {
        SRSEngine.getDueCards(state.cards)
    }

    init() {
        self.state = Self.load()
    }

    // MARK: - Persistence

    private static func load() -> KnowledgeState {
        // Try v4 first
        if let data = UserDefaults.standard.data(forKey: storageKey),
           let state = try? JSONDecoder().decode(KnowledgeState.self, from: data) {
            return fillMissingModules(state)
        }

        // Try migrating from v3
        if let data = UserDefaults.standard.data(forKey: v3StorageKey),
           let v3State = try? JSONDecoder().decode(KnowledgeState.self, from: data) {
            let migrated = migrateV3toV4(v3State)
            if let newData = try? JSONEncoder().encode(migrated) {
                UserDefaults.standard.set(newData, forKey: storageKey)
            }
            return migrated
        }

        // Try migrating from v2
        if let data = UserDefaults.standard.data(forKey: legacyStorageKey),
           let legacy = try? JSONDecoder().decode(LegacyKnowledgeStateV2.self, from: data) {
            let migrated = migrateV2toV3(legacy)
            let v4 = migrateV3toV4(migrated)
            if let newData = try? JSONEncoder().encode(v4) {
                UserDefaults.standard.set(newData, forKey: storageKey)
            }
            return v4
        }

        return createDefaultState()
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(state) else { return }
        UserDefaults.standard.set(data, forKey: Self.storageKey)
    }

    // MARK: - V2 → V3 Migration

    private struct LegacyKnowledgeStateV2: Codable {
        var modules: [String: ModuleMastery]
        var cards: [SRSCard]
        var stats: ReviewStats
        var version: Int
    }

    private static func migrateV2toV3(_ legacy: LegacyKnowledgeStateV2) -> KnowledgeState {
        KnowledgeState(
            modules: legacy.modules,
            cards: legacy.cards,
            stats: legacy.stats,
            gamification: .empty(),
            version: 3
        )
    }

    // MARK: - V3 → V4 Migration (adds 4 new domains)

    private static func migrateV3toV4(_ v3: KnowledgeState) -> KnowledgeState {
        var state = v3
        state.version = 4
        return fillMissingModules(state)
    }

    /// Ensures all domains/modules defined in DomainContent have entries in state.
    /// This handles both migration and any future domain additions gracefully.
    private static func fillMissingModules(_ state: KnowledgeState) -> KnowledgeState {
        var updated = state
        for domain in DomainContent.allDomains {
            for mod in domain.modules {
                let key = "\(domain.id.rawValue)-\(mod.slug)"
                if updated.modules[key] == nil {
                    updated.modules[key] = MasteryEngine.createModuleMastery(
                        domain: domain.id,
                        moduleId: mod.id,
                        moduleSlug: mod.slug
                    )
                }
            }
        }
        return updated
    }

    static func createDefaultState() -> KnowledgeState {
        var modules: [String: ModuleMastery] = [:]

        for domain in DomainContent.allDomains {
            for mod in domain.modules {
                let key = "\(domain.id.rawValue)-\(mod.slug)"
                modules[key] = MasteryEngine.createModuleMastery(
                    domain: domain.id,
                    moduleId: mod.id,
                    moduleSlug: mod.slug
                )
            }
        }

        return KnowledgeState(
            modules: modules,
            cards: [],
            stats: .empty(),
            gamification: .empty(),
            version: 4
        )
    }

    // MARK: - Module Operations

    func startModule(domain: DomainId, slug: String) {
        let key = "\(domain.rawValue)-\(slug)"
        guard let mod = state.modules[key], mod.phase == .locked else { return }
        state.modules[key]?.phase = .learning
        save()
    }

    func completeModule(domain: DomainId, slug: String, newCards: [SRSCard]) {
        let key = "\(domain.rawValue)-\(slug)"
        guard state.modules[key] != nil else { return }

        // Add new cards (avoid duplicates)
        let existingIds = Set(state.cards.map(\.id))
        for card in newCards where !existingIds.contains(card.id) {
            state.cards.append(card)
        }

        state.modules[key]?.phase = .reviewing
        if state.modules[key]?.completedAt == nil {
            state.modules[key]?.completedAt = SRSEngine.toDateString(Date())
        }
        state.modules[key]?.cardIds = newCards.map(\.id)
        save()
    }

    func updateCardAfterReview(updatedCard: SRSCard) {
        if let index = state.cards.firstIndex(where: { $0.id == updatedCard.id }) {
            state.cards[index] = updatedCard
        }

        // Update module phase based on new card strengths
        let key = "\(updatedCard.domain.rawValue)-\(updatedCard.moduleSlug)"
        if let mod = state.modules[key] {
            state.modules[key] = MasteryEngine.updatePhase(mod, cards: state.cards)
        }
        save()
    }

    func recordReviewSession(cardsReviewed: Int) {
        let today = SRSEngine.toDateString(Date())

        // Update review history
        state.stats.reviewHistory[today] = (state.stats.reviewHistory[today] ?? 0) + cardsReviewed
        state.stats.totalReviews += cardsReviewed

        // Update streak
        let yesterday = Calendar.current.date(byAdding: .day, value: -1, to: Date())!
        let yesterdayStr = SRSEngine.toDateString(yesterday)

        if state.stats.lastReviewDate == yesterdayStr || state.stats.lastReviewDate == today {
            if state.stats.lastReviewDate != today {
                state.stats.currentStreak += 1
            }
        } else {
            state.stats.currentStreak = 1
        }

        if state.stats.currentStreak > state.stats.longestStreak {
            state.stats.longestStreak = state.stats.currentStreak
        }

        state.stats.lastReviewDate = today

        // Prune old review history (keep 90 days)
        let cutoff = Calendar.current.date(byAdding: .day, value: -90, to: Date())!
        let cutoffStr = SRSEngine.toDateString(cutoff)
        state.stats.reviewHistory = state.stats.reviewHistory.filter { $0.key >= cutoffStr }

        save()
    }

    // MARK: - Readiness & Strength

    func domainStrength(_ domainId: DomainId) -> Int {
        guard let domain = DomainContent.allDomains.first(where: { $0.id == domainId }) else { return 0 }

        var totalStrength = 0
        var moduleCount = 0

        for mod in domain.modules {
            let key = "\(domainId.rawValue)-\(mod.slug)"
            guard let mastery = state.modules[key] else { continue }
            moduleCount += 1
            totalStrength += MasteryEngine.getModuleStrength(mastery, cards: state.cards)
        }

        return moduleCount > 0 ? Int(round(Double(totalStrength) / Double(moduleCount))) : 0
    }

    func readinessScore() -> Int {
        let domainWeights = DomainContent.allDomains.map { domainStrength($0.id) }
        let avgStrength = Double(domainWeights.reduce(0, +)) / Double(max(domainWeights.count, 1))
        let overduePenalty = min(dueCardCount * 2, 20)
        return max(0, Int(round(avgStrength)) - overduePenalty)
    }

    func completedModuleCount(domainId: DomainId? = nil) -> Int {
        state.modules.values.filter { m in
            if let domainId { return m.domain == domainId && m.completedAt != nil }
            return m.completedAt != nil
        }.count
    }

    func moduleMastery(domain: DomainId, slug: String) -> ModuleMastery? {
        state.modules["\(domain.rawValue)-\(slug)"]
    }

    // MARK: - Streak Validation

    func validateStreak() {
        guard state.stats.lastReviewDate != nil else { return }

        let yesterday = Calendar.current.date(byAdding: .day, value: -1, to: Date())!
        let yesterdayStr = SRSEngine.toDateString(yesterday)

        if let last = state.stats.lastReviewDate, last < yesterdayStr {
            state.stats.currentStreak = 0
            save()
        }
    }

    // MARK: - Gamification

    func recordLessonCompletion(
        domain: DomainId,
        slug: String,
        attempted: Int,
        correct: Int,
        xp: Int
    ) {
        let key = "\(domain.rawValue)-\(slug)"

        var score = state.gamification.moduleScores[key] ?? .empty()
        score.xpEarned += xp
        score.questionsAttempted += attempted
        score.questionsCorrect += correct
        score.completionCount += 1

        let medal = GamificationEngine.evaluateMedal(
            questionsAttempted: attempted,
            questionsCorrect: correct
        )
        if medal.rawValue > score.bestMedal.rawValue || score.bestMedal == .none {
            score.bestMedal = medal
        }

        state.gamification.moduleScores[key] = score
        addXP(xp, domain: domain)
    }

    func addXP(_ amount: Int, domain: DomainId) {
        state.gamification.totalXP += amount
        let domainKey = domain.rawValue
        state.gamification.domainXP[domainKey] = (state.gamification.domainXP[domainKey] ?? 0) + amount
        save()
    }

    func addReviewXP(grade: Grade, domain: DomainId) {
        let xp = GamificationEngine.xpForReview(grade: grade)
        addXP(xp, domain: domain)
    }

    // MARK: - Data Export

    func exportJSON() -> Data? {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        return try? encoder.encode(state)
    }
}
