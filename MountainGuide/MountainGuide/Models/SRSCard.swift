import Foundation

// MARK: - SRS Card Types

enum CardType: String, Codable, CaseIterable {
    case concept
    case application
    case connection

    var sortOrder: Int {
        switch self {
        case .concept: return 0
        case .application: return 1
        case .connection: return 2
        }
    }

    var label: String {
        switch self {
        case .concept: return "Concept"
        case .application: return "Application"
        case .connection: return "Connection"
        }
    }

    var icon: String {
        switch self {
        case .concept: return "brain.head.profile"
        case .application: return "hammer.fill"
        case .connection: return "link"
        }
    }
}

// SM-2 grade: 0 (blackout) → 5 (perfect recall)
// UI: Again=1, Hard=3, Good=4, Easy=5
enum Grade: Int, CaseIterable {
    case again = 1
    case hard = 3
    case good = 4
    case easy = 5

    var label: String {
        switch self {
        case .again: return "Again"
        case .hard: return "Hard"
        case .good: return "Good"
        case .easy: return "Easy"
        }
    }

    var color: String {
        switch self {
        case .again: return "EF4444"
        case .hard: return "F59E0B"
        case .good: return "22C55E"
        case .easy: return "3B82F6"
        }
    }
}

// MARK: - SRS Card Model

struct SRSCard: Codable, Identifiable, Equatable {
    let id: String               // `${domain}-${moduleSlug}-${cardType}`
    let domain: DomainId
    let moduleSlug: String
    let moduleId: Int
    let cardType: CardType
    let question: String
    let answer: String
    // SM-2 fields
    var interval: Int            // Days until next review
    var repetitions: Int         // Successful reviews in a row
    var easeFactor: Double       // >= 1.3
    var nextReview: String       // ISO date string (YYYY-MM-DD)
    var lastReview: String?      // ISO date string or nil if never reviewed
}
