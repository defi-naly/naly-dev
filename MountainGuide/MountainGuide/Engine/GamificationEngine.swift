import Foundation

// MARK: - Gamification Engine

enum GamificationEngine {

    // MARK: - XP Calculation

    static func calculateLessonXP(
        stepsViewed: Int,
        questionsAttempted: Int,
        questionsCorrect: Int,
        synthesisCompleted: Bool,
        isFirstCompletion: Bool
    ) -> Int {
        var xp = 0
        xp += stepsViewed * XPReward.teachingStepViewed
        xp += questionsCorrect * XPReward.practiceCorrect
        xp += (questionsAttempted - questionsCorrect) * XPReward.practiceAttempted
        if synthesisCompleted { xp += XPReward.synthesisCompleted }
        if isFirstCompletion { xp += XPReward.firstCompletion }
        return xp
    }

    // MARK: - Medal Evaluation

    static func evaluateMedal(questionsAttempted: Int, questionsCorrect: Int) -> Medal {
        guard questionsAttempted > 0 else { return .none }
        let accuracy = Double(questionsCorrect) / Double(questionsAttempted)
        return Medal.fromAccuracy(accuracy)
    }

    // MARK: - Level Computation

    static func levelForXP(_ xp: Int) -> Int {
        let thresholds = XPReward.levelThresholds
        for i in stride(from: thresholds.count - 1, through: 0, by: -1) {
            if xp >= thresholds[i] { return i + 1 }
        }
        return 1
    }

    static func xpForNextLevel(currentXP: Int) -> Int {
        let level = levelForXP(currentXP)
        let thresholds = XPReward.levelThresholds
        if level >= thresholds.count { return 0 }
        return thresholds[level] - currentXP
    }

    // MARK: - Review XP

    static func xpForReview(grade: Grade) -> Int {
        XPReward.forGrade(grade)
    }
}
