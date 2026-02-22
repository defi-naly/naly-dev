import Foundation

// MARK: - Scenario Types

struct ScenarioChoice: Codable {
    let label: String
    let nextNodeId: String
    let optimal: Bool
    let feedback: String

    init(label: String, nextNodeId: String, optimal: Bool = false, feedback: String) {
        self.label = label
        self.nextNodeId = nextNodeId
        self.optimal = optimal
        self.feedback = feedback
    }
}

struct ScenarioNode: Codable, Identifiable {
    let id: String
    let narrative: String
    let choices: [ScenarioChoice]?
    let isTerminal: Bool
    let score: Int?
    let lessons: [String]?

    init(id: String, narrative: String, choices: [ScenarioChoice]? = nil, isTerminal: Bool = false, score: Int? = nil, lessons: [String]? = nil) {
        self.id = id
        self.narrative = narrative
        self.choices = choices
        self.isTerminal = isTerminal
        self.score = score
        self.lessons = lessons
    }
}

struct ScenarioRequirement: Codable {
    let domain: DomainId
    let moduleSlug: String
}

enum ScenarioDifficulty: String, Codable {
    case intermediate
    case advanced
    case expert
}

struct Scenario: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let difficulty: ScenarioDifficulty
    let domains: [DomainId]
    let testedModules: [String]     // `${domain}-${slug}` keys
    let requirements: [ScenarioRequirement]
    let startNodeId: String
    let nodes: [String: ScenarioNode]
}
