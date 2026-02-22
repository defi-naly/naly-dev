import Foundation

// MARK: - SM-2 Spaced Repetition Engine
// Direct port of srs.ts

enum SRSEngine {

    static func createCard(
        domain: DomainId,
        moduleSlug: String,
        moduleId: Int,
        cardType: CardType,
        question: String,
        answer: String,
        initialDueOffset: Int = 0
    ) -> SRSCard {
        let now = Calendar.current.date(byAdding: .day, value: initialDueOffset, to: Date())!
        return SRSCard(
            id: "\(domain.rawValue)-\(moduleSlug)-\(cardType.rawValue)",
            domain: domain,
            moduleSlug: moduleSlug,
            moduleId: moduleId,
            cardType: cardType,
            question: question,
            answer: answer,
            interval: 0,
            repetitions: 0,
            easeFactor: 2.5,
            nextReview: toDateString(now),
            lastReview: nil
        )
    }

    static func calculateNextReview(card: SRSCard, grade: Grade) -> SRSCard {
        var updated = card
        updated.lastReview = toDateString(Date())
        let gradeValue = Double(grade.rawValue)

        if grade.rawValue < 3 {
            // Failed — reset repetitions, keep easeFactor
            updated.repetitions = 0
            updated.interval = 1
        } else {
            // Successful recall
            if updated.repetitions == 0 {
                updated.interval = 1
            } else if updated.repetitions == 1 {
                updated.interval = 6
            } else {
                updated.interval = Int(round(Double(updated.interval) * updated.easeFactor))
            }
            updated.repetitions += 1
        }

        // Update ease factor (SM-2 formula)
        updated.easeFactor = updated.easeFactor + (0.1 - (5 - gradeValue) * (0.08 + (5 - gradeValue) * 0.02))
        if updated.easeFactor < 1.3 { updated.easeFactor = 1.3 }

        // Set next review date
        let next = Calendar.current.date(byAdding: .day, value: updated.interval, to: Date())!
        updated.nextReview = toDateString(next)

        return updated
    }

    static func getCardStrength(_ card: SRSCard) -> Int {
        // Strength 0-100 based on interval, ease factor, and repetitions
        let intervalScore = min(Double(card.interval) / 30.0, 1.0) * 50.0
        let easeScore = ((card.easeFactor - 1.3) / (2.5 - 1.3)) * 20.0
        let repScore = min(Double(card.repetitions) / 5.0, 1.0) * 30.0
        return Int(max(0, min(100, round(intervalScore + easeScore + repScore))))
    }

    static func isCardDue(_ card: SRSCard, date: Date = Date()) -> Bool {
        let today = toDateString(date)
        return card.nextReview <= today
    }

    static func getDueCards(_ cards: [SRSCard], date: Date = Date()) -> [SRSCard] {
        cards
            .filter { isCardDue($0, date: date) }
            .sorted { a, b in
                if a.nextReview != b.nextReview {
                    return a.nextReview < b.nextReview
                }
                return a.cardType.sortOrder < b.cardType.sortOrder
            }
    }

    static func getOverdueDays(_ card: SRSCard, date: Date = Date()) -> Int {
        guard let dueDate = dateFromString(card.nextReview) else { return 0 }
        let diff = Calendar.current.dateComponents([.day], from: dueDate, to: date).day ?? 0
        return max(0, diff)
    }

    // MARK: - Date Helpers

    static func toDateString(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.timeZone = TimeZone.current
        return formatter.string(from: date)
    }

    static func dateFromString(_ string: String) -> Date? {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.timeZone = TimeZone.current
        return formatter.date(from: string)
    }
}
