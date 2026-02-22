import Foundation
import SwiftUI

// MARK: - Domain Types

enum DomainId: String, Codable, CaseIterable {
    case weather
    case avalanche
    case flying

    var color: Color {
        switch self {
        case .weather: return .weatherAccent
        case .avalanche: return .avalancheAccent
        case .flying: return .flyingAccent
        }
    }

    var icon: String {
        switch self {
        case .weather: return "cloud.sun.fill"
        case .avalanche: return "mountain.2.fill"
        case .flying: return "bird.fill"
        }
    }
}

enum ModuleDifficulty: String, Codable {
    case foundation
    case intermediate
    case advanced

    var label: String {
        rawValue.capitalized
    }

    var color: Color {
        switch self {
        case .foundation: return .emerald
        case .intermediate: return .amber
        case .advanced: return .danger
        }
    }
}

// MARK: - Application Scenario

struct ApplicationOption: Codable {
    let label: String
    let correct: Bool
    let explanation: String
}

struct ApplicationScenario: Codable {
    let situation: String
    let options: [ApplicationOption]
}

// MARK: - Related Module Reference

struct RelatedModule: Codable {
    let domain: DomainId
    let slug: String
}

// MARK: - Module

struct Module: Codable, Identifiable {
    let id: Int
    let domain: DomainId
    let slug: String
    let title: String
    let concept: String
    let takeaway: String
    let tool: String
    let difficulty: ModuleDifficulty
    let relatedModules: [RelatedModule]?
    let applicationScenario: ApplicationScenario?
    let connectionPrompt: String?
}

// MARK: - Domain

struct Domain: Codable, Identifiable {
    let id: DomainId
    let name: String
    let subtitle: String
    let description: String
    let book: String
    let author: String
    let accent: String
    let accentRgb: String
    let modules: [Module]
}
