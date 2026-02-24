import Foundation

// MARK: - Post-Trip Review

struct PostTripReview: Codable, Identifiable {
    let id: UUID
    let activityId: UUID
    let date: Date
    let activityType: Activity

    var conditions: ConditionsSnapshot?
    var hazards: [HazardEntry]
    var keyDecision: String?
    var wouldRepeatDecision: Bool?
    var decisionExplanation: String?
    var relevantDomains: [DomainId]
    var lessonsLearned: String?
    var safetyXPAwarded: Int

    init(
        id: UUID = UUID(),
        activityId: UUID,
        date: Date = Date(),
        activityType: Activity,
        conditions: ConditionsSnapshot? = nil,
        hazards: [HazardEntry] = [],
        keyDecision: String? = nil,
        wouldRepeatDecision: Bool? = nil,
        decisionExplanation: String? = nil,
        relevantDomains: [DomainId] = [],
        lessonsLearned: String? = nil,
        safetyXPAwarded: Int = 0
    ) {
        self.id = id
        self.activityId = activityId
        self.date = date
        self.activityType = activityType
        self.conditions = conditions
        self.hazards = hazards
        self.keyDecision = keyDecision
        self.wouldRepeatDecision = wouldRepeatDecision
        self.decisionExplanation = decisionExplanation
        self.relevantDomains = relevantDomains
        self.lessonsLearned = lessonsLearned
        self.safetyXPAwarded = safetyXPAwarded
    }
}

// MARK: - Conditions Snapshot

struct ConditionsSnapshot: Codable {
    var temperature: Double?       // Celsius
    var windSpeed: Double?         // km/h
    var windDirection: String?     // e.g. "NW"
    var visibility: String?        // e.g. "Good", "Moderate", "Poor"
    var precipitation: String?     // e.g. "None", "Light snow", "Rain"
    var cloudCover: String?        // e.g. "Clear", "Scattered", "Overcast"
    var avalancheDangerLevel: Int? // 1-5
    var notes: String?
}

// MARK: - Hazard Entry

struct HazardEntry: Codable, Identifiable {
    let id: UUID
    var category: HazardCategory
    var severity: HazardSeverity
    var description: String
    var notes: String?

    init(
        id: UUID = UUID(),
        category: HazardCategory,
        severity: HazardSeverity = .minor,
        description: String,
        notes: String? = nil
    ) {
        self.id = id
        self.category = category
        self.severity = severity
        self.description = description
        self.notes = notes
    }
}

// MARK: - Hazard Category

enum HazardCategory: String, Codable, CaseIterable {
    case avalanche
    case rockfall
    case crevasse
    case weather
    case turbulence
    case airspace
    case navigation
    case equipment
    case exposure
    case fatigue
    case other

    var displayName: String {
        switch self {
        case .avalanche: return "Avalanche"
        case .rockfall: return "Rockfall"
        case .crevasse: return "Crevasse"
        case .weather: return "Weather"
        case .turbulence: return "Turbulence"
        case .airspace: return "Airspace"
        case .navigation: return "Navigation"
        case .equipment: return "Equipment"
        case .exposure: return "Exposure"
        case .fatigue: return "Fatigue"
        case .other: return "Other"
        }
    }

    var icon: String {
        switch self {
        case .avalanche: return "mountain.2.fill"
        case .rockfall: return "bolt.trianglebadge.exclamationmark.fill"
        case .crevasse: return "arrow.down.to.line"
        case .weather: return "cloud.bolt.fill"
        case .turbulence: return "wind"
        case .airspace: return "airplane"
        case .navigation: return "location.slash.fill"
        case .equipment: return "wrench.fill"
        case .exposure: return "exclamationmark.triangle.fill"
        case .fatigue: return "battery.25"
        case .other: return "questionmark.circle.fill"
        }
    }
}

// MARK: - Hazard Severity

enum HazardSeverity: String, Codable, CaseIterable {
    case minor
    case moderate
    case serious

    var displayName: String { rawValue.capitalized }
}
