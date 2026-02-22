import Foundation
import SwiftUI

// MARK: - Mastery System
// Direct port of mastery.ts

enum MasteryPhase: String, Codable, CaseIterable {
    case locked
    case learning
    case reviewing
    case mastered
    case relearning

    var label: String {
        switch self {
        case .locked: return "Not started"
        case .learning: return "Learning"
        case .reviewing: return "Reviewing"
        case .mastered: return "Mastered"
        case .relearning: return "Relearning"
        }
    }

    var icon: String {
        switch self {
        case .locked: return "lock.fill"
        case .learning: return "book.fill"
        case .reviewing: return "arrow.clockwise"
        case .mastered: return "checkmark.seal.fill"
        case .relearning: return "arrow.counterclockwise"
        }
    }
}

struct ModuleMastery: Codable, Equatable {
    let domain: DomainId
    let moduleId: Int
    let moduleSlug: String
    var phase: MasteryPhase
    var completedAt: String?    // ISO date when first completed
    var cardIds: [String]       // IDs of associated SRS cards
}

enum MasteryEngine {

    static func getModuleStrength(_ mastery: ModuleMastery, cards: [SRSCard]) -> Int {
        let moduleCards = cards.filter { mastery.cardIds.contains($0.id) }
        if moduleCards.isEmpty {
            if mastery.phase == .learning { return 5 }
            return 0
        }
        let avg = Double(moduleCards.reduce(0) { $0 + SRSEngine.getCardStrength($1) }) / Double(moduleCards.count)
        return Int(round(avg))
    }

    static func updatePhase(_ mastery: ModuleMastery, cards: [SRSCard]) -> ModuleMastery {
        let strength = getModuleStrength(mastery, cards: cards)
        let moduleCards = cards.filter { mastery.cardIds.contains($0.id) }
        var updated = mastery

        switch mastery.phase {
        case .locked:
            break

        case .learning:
            if mastery.completedAt != nil && !mastery.cardIds.isEmpty {
                updated.phase = .reviewing
            }

        case .reviewing:
            if !moduleCards.isEmpty && moduleCards.allSatisfy({ SRSEngine.getCardStrength($0) >= 70 && $0.interval >= 30 }) {
                updated.phase = .mastered
            }

        case .mastered:
            if strength < 50 {
                updated.phase = .relearning
            }

        case .relearning:
            if strength >= 40 {
                updated.phase = .reviewing
            }
        }

        return updated
    }

    static func createModuleMastery(
        domain: DomainId,
        moduleId: Int,
        moduleSlug: String,
        phase: MasteryPhase = .locked
    ) -> ModuleMastery {
        ModuleMastery(
            domain: domain,
            moduleId: moduleId,
            moduleSlug: moduleSlug,
            phase: phase,
            completedAt: nil,
            cardIds: []
        )
    }

    static func phaseColor(_ phase: MasteryPhase, strength: Int) -> Color {
        switch phase {
        case .locked: return .terminalBorder
        case .learning: return .textMuted
        case .reviewing:
            if strength < 30 { return .textMuted }
            if strength < 70 { return .amber }
            return .emerald
        case .mastered: return .emerald
        case .relearning: return .danger
        }
    }
}
