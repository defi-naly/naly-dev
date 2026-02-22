import Foundation

// MARK: - Question Types

enum QuestionType: String, Codable {
    case multipleChoice
    case sequenceOrder
    case labelDiagram
    case trueFalseReasoning
    case calculation
    case hotspot
    case matchPairs
}

// MARK: - Practice Option (for MCQ)

struct PracticeOption: Codable, Identifiable {
    var id: String { label }
    let label: String
    let correct: Bool
    let explanation: String
}

// MARK: - Label Position (for label-the-diagram)

struct LabelPosition: Codable, Identifiable {
    var id: String { label }
    let label: String
    let correctX: CGFloat
    let correctY: CGFloat
    let snapRadius: CGFloat
}

// MARK: - Match Pair

struct MatchPair: Codable, Identifiable {
    var id: String { left }
    let left: String
    let right: String
}

// MARK: - Practice Question

struct PracticeQuestion: Codable, Identifiable {
    let id: String
    let type: QuestionType
    let prompt: String
    let difficulty: ModuleDifficulty
    let explanation: String

    // MCQ
    var options: [PracticeOption]?

    // Sequence ordering
    var correctOrder: [String]?
    var shuffledItems: [String]?

    // Label diagram
    var labelPositions: [LabelPosition]?
    var diagramType: DiagramType?
    var diagramConfig: DiagramConfig?

    // True/False with reasoning
    var statement: String?
    var isTrue: Bool?
    var reasoning: String?

    // Calculation
    var correctAnswer: Double?
    var tolerance: Double?
    var answerUnit: String?

    // Hotspot
    var hotspotX: CGFloat?
    var hotspotY: CGFloat?
    var hotspotRadius: CGFloat?

    // Match pairs
    var matchPairs: [MatchPair]?

    init(
        id: String,
        type: QuestionType,
        prompt: String,
        difficulty: ModuleDifficulty = .foundation,
        explanation: String,
        options: [PracticeOption]? = nil,
        correctOrder: [String]? = nil,
        shuffledItems: [String]? = nil,
        labelPositions: [LabelPosition]? = nil,
        diagramType: DiagramType? = nil,
        diagramConfig: DiagramConfig? = nil,
        statement: String? = nil,
        isTrue: Bool? = nil,
        reasoning: String? = nil,
        correctAnswer: Double? = nil,
        tolerance: Double? = nil,
        answerUnit: String? = nil,
        hotspotX: CGFloat? = nil,
        hotspotY: CGFloat? = nil,
        hotspotRadius: CGFloat? = nil,
        matchPairs: [MatchPair]? = nil
    ) {
        self.id = id
        self.type = type
        self.prompt = prompt
        self.difficulty = difficulty
        self.explanation = explanation
        self.options = options
        self.correctOrder = correctOrder
        self.shuffledItems = shuffledItems
        self.labelPositions = labelPositions
        self.diagramType = diagramType
        self.diagramConfig = diagramConfig
        self.statement = statement
        self.isTrue = isTrue
        self.reasoning = reasoning
        self.correctAnswer = correctAnswer
        self.tolerance = tolerance
        self.answerUnit = answerUnit
        self.hotspotX = hotspotX
        self.hotspotY = hotspotY
        self.hotspotRadius = hotspotRadius
        self.matchPairs = matchPairs
    }
}
