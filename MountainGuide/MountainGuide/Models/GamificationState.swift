import Foundation
import SwiftUI

// MARK: - Medal

enum Medal: String, Codable, CaseIterable {
    case none
    case bronze
    case silver
    case gold

    var label: String {
        switch self {
        case .none: return "None"
        case .bronze: return "Bronze"
        case .silver: return "Silver"
        case .gold: return "Gold"
        }
    }

    var icon: String {
        switch self {
        case .none: return "circle"
        case .bronze: return "medal.fill"
        case .silver: return "medal.fill"
        case .gold: return "medal.fill"
        }
    }

    var color: Color {
        switch self {
        case .none: return .textDim
        case .bronze: return Color(hex: "CD7F32")
        case .silver: return Color(hex: "C0C0C0")
        case .gold: return Color(hex: "FFD700")
        }
    }

    static func fromAccuracy(_ accuracy: Double) -> Medal {
        if accuracy >= 0.95 { return .gold }
        if accuracy >= 0.80 { return .silver }
        if accuracy >= 0.60 { return .bronze }
        return .none
    }
}

// MARK: - Module Score

struct ModuleScore: Codable {
    var xpEarned: Int
    var questionsAttempted: Int
    var questionsCorrect: Int
    var bestMedal: Medal
    var completionCount: Int

    static func empty() -> ModuleScore {
        ModuleScore(xpEarned: 0, questionsAttempted: 0, questionsCorrect: 0, bestMedal: .none, completionCount: 0)
    }
}

// MARK: - XP Rewards

enum XPReward {
    // Preparation XP (lessons, reviews)
    static let teachingStepViewed = 5
    static let practiceCorrect = 20
    static let practiceAttempted = 5
    static let synthesisCompleted = 15
    static let firstCompletion = 50

    // Review XP per grade
    static let reviewAgain = 5
    static let reviewHard = 10
    static let reviewGood = 15
    static let reviewEasy = 20

    // Prowess XP
    static let verticalMeter100XP = 1     // per 100m elevation gain
    static let kmFlownXP = 5              // per km XC distance
    static let activityCompletedXP = 25   // per synced activity

    // Preparation XP (field tools)
    static let bulletinCheckedXP = 10
    static let preFlightCheckedXP = 15
    static let plannerUsedXP = 10

    // Safety XP
    static let postTripReviewXP = 50
    static let hazardIdentifiedXP = 10
    static let decisionReviewXP = 15

    static func forGrade(_ grade: Grade) -> Int {
        switch grade {
        case .again: return reviewAgain
        case .hard: return reviewHard
        case .good: return reviewGood
        case .easy: return reviewEasy
        }
    }

    // Level thresholds (cumulative XP needed)
    static let levelThresholds: [Int] = [
        0,      // Level 1
        100,    // Level 2
        250,    // Level 3
        500,    // Level 4
        800,    // Level 5
        1200,   // Level 6
        1700,   // Level 7
        2300,   // Level 8
        3000,   // Level 9
        3800,   // Level 10
        4800,   // Level 11
        6000,   // Level 12
        7500,   // Level 13
        9200,   // Level 14
        11200,  // Level 15
        13500,  // Level 16
        16200,  // Level 17
        19300,  // Level 18
        22800,  // Level 19
        27000   // Level 20
    ]
}

// MARK: - Level Titles

enum LevelTitle: String {
    case observer = "Observer"
    case student = "Student"
    case practitioner = "Practitioner"
    case guide = "Guide"
    case expert = "Expert"
    case master = "Master"
    case sage = "Sage"

    static func forLevel(_ level: Int) -> LevelTitle {
        switch level {
        case 1...3: return .observer
        case 4...6: return .student
        case 7...9: return .practitioner
        case 10...12: return .guide
        case 13...15: return .expert
        case 16...18: return .master
        case 19...20: return .sage
        default: return level < 1 ? .observer : .sage
        }
    }

    var color: Color {
        switch self {
        case .observer: return .textMuted
        case .student: return .weatherAccent
        case .practitioner: return .amber
        case .guide: return .emerald
        case .expert: return .flyingAccent
        case .master: return .danger
        case .sage: return Color(hex: "FFD700")
        }
    }
}

// MARK: - Gamification State

struct GamificationState: Codable {
    var preparationXP: Int
    var prowessXP: Int
    var safetyXP: Int
    var moduleScores: [String: ModuleScore]     // key: "${domain}-${slug}"
    var domainXP: [String: Int]                 // key: domain rawValue

    // totalXP is now computed from the 3 axes
    var totalXP: Int { preparationXP + prowessXP + safetyXP }

    static func empty() -> GamificationState {
        GamificationState(
            preparationXP: 0,
            prowessXP: 0,
            safetyXP: 0,
            moduleScores: [:],
            domainXP: [:]
        )
    }

    var level: Int {
        let thresholds = XPReward.levelThresholds
        for i in stride(from: thresholds.count - 1, through: 0, by: -1) {
            if totalXP >= thresholds[i] { return i + 1 }
        }
        return 1
    }

    var levelTitle: LevelTitle {
        LevelTitle.forLevel(level)
    }

    var xpToNextLevel: Int {
        let thresholds = XPReward.levelThresholds
        let currentLevel = level
        if currentLevel >= thresholds.count { return 0 }
        return thresholds[currentLevel] - totalXP
    }

    var levelProgress: Double {
        let thresholds = XPReward.levelThresholds
        let currentLevel = level
        if currentLevel >= thresholds.count { return 1.0 }
        let currentThreshold = thresholds[currentLevel - 1]
        let nextThreshold = thresholds[currentLevel]
        let range = nextThreshold - currentThreshold
        guard range > 0 else { return 1.0 }
        return Double(totalXP - currentThreshold) / Double(range)
    }

    func medalCount(_ medal: Medal) -> Int {
        moduleScores.values.filter { $0.bestMedal == medal }.count
    }

    // MARK: - Axis breakdown for display

    var axisBreakdown: [(axis: XPAxis, xp: Int)] {
        [
            (.preparation, preparationXP),
            (.prowess, prowessXP),
            (.safety, safetyXP)
        ]
    }

    // MARK: - Custom Codable (migration from legacy totalXP)

    enum CodingKeys: String, CodingKey {
        case preparationXP, prowessXP, safetyXP
        case moduleScores, domainXP
        case totalXP  // legacy key for migration
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        moduleScores = try container.decode([String: ModuleScore].self, forKey: .moduleScores)
        domainXP = try container.decode([String: Int].self, forKey: .domainXP)

        // Migration: if 3-axis fields exist, use them. Otherwise migrate legacy totalXP.
        if let prep = try? container.decode(Int.self, forKey: .preparationXP) {
            preparationXP = prep
            prowessXP = try container.decodeIfPresent(Int.self, forKey: .prowessXP) ?? 0
            safetyXP = try container.decodeIfPresent(Int.self, forKey: .safetyXP) ?? 0
        } else {
            // Legacy: all XP was preparation
            preparationXP = try container.decodeIfPresent(Int.self, forKey: .totalXP) ?? 0
            prowessXP = 0
            safetyXP = 0
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(preparationXP, forKey: .preparationXP)
        try container.encode(prowessXP, forKey: .prowessXP)
        try container.encode(safetyXP, forKey: .safetyXP)
        try container.encode(moduleScores, forKey: .moduleScores)
        try container.encode(domainXP, forKey: .domainXP)
    }

    init(
        preparationXP: Int = 0,
        prowessXP: Int = 0,
        safetyXP: Int = 0,
        moduleScores: [String: ModuleScore] = [:],
        domainXP: [String: Int] = [:]
    ) {
        self.preparationXP = preparationXP
        self.prowessXP = prowessXP
        self.safetyXP = safetyXP
        self.moduleScores = moduleScores
        self.domainXP = domainXP
    }
}
