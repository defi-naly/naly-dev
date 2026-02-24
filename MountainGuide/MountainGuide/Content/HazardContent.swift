import Foundation

// MARK: - Hazard Content

enum HazardContent {

    struct HazardPrompt: Identifiable {
        let id = UUID()
        let question: String
        let category: HazardCategory
        let domain: DomainId
    }

    // MARK: - Ski Touring Hazards

    static let skiTouringHazards: [HazardPrompt] = [
        HazardPrompt(
            question: "Did you observe signs of recent avalanche activity?",
            category: .avalanche, domain: .avalanche
        ),
        HazardPrompt(
            question: "Did you encounter wind-loaded slopes?",
            category: .avalanche, domain: .avalanche
        ),
        HazardPrompt(
            question: "Did visibility drop unexpectedly?",
            category: .weather, domain: .weather
        ),
        HazardPrompt(
            question: "Did you cross slopes steeper than your planned maximum?",
            category: .avalanche, domain: .avalanche
        ),
        HazardPrompt(
            question: "Did you encounter terrain traps?",
            category: .avalanche, domain: .avalanche
        ),
        HazardPrompt(
            question: "Did conditions change from forecast?",
            category: .weather, domain: .weather
        ),
    ]

    // MARK: - Paragliding Hazards

    static let paraglidingHazards: [HazardPrompt] = [
        HazardPrompt(
            question: "Did you encounter unexpected turbulence?",
            category: .turbulence, domain: .flying
        ),
        HazardPrompt(
            question: "Were thermals weaker/stronger than forecast?",
            category: .weather, domain: .flying
        ),
        HazardPrompt(
            question: "Did you have any airspace conflicts?",
            category: .airspace, domain: .flying
        ),
        HazardPrompt(
            question: "Did wind conditions change significantly during flight?",
            category: .weather, domain: .weather
        ),
        HazardPrompt(
            question: "Did cloud base lower during your flight?",
            category: .weather, domain: .weather
        ),
        HazardPrompt(
            question: "Did you experience any equipment issues?",
            category: .equipment, domain: .flying
        ),
    ]

    // MARK: - Hiking Hazards

    static let hikingHazards: [HazardPrompt] = [
        HazardPrompt(
            question: "Did you encounter exposure beyond your comfort level?",
            category: .exposure, domain: .ropeSystems
        ),
        HazardPrompt(
            question: "Did you face route-finding difficulties?",
            category: .navigation, domain: .navigation
        ),
        HazardPrompt(
            question: "Did weather conditions deteriorate?",
            category: .weather, domain: .weather
        ),
        HazardPrompt(
            question: "Did you encounter loose rock or unstable terrain?",
            category: .rockfall, domain: .navigation
        ),
        HazardPrompt(
            question: "Did you feel fatigued beyond expectations?",
            category: .fatigue, domain: .firstAid
        ),
    ]

    // MARK: - Climbing Hazards

    static let climbingHazards: [HazardPrompt] = [
        HazardPrompt(
            question: "Did you encounter exposure beyond your comfort level?",
            category: .exposure, domain: .ropeSystems
        ),
        HazardPrompt(
            question: "Did you face route-finding difficulties?",
            category: .navigation, domain: .navigation
        ),
        HazardPrompt(
            question: "Did weather conditions deteriorate?",
            category: .weather, domain: .weather
        ),
        HazardPrompt(
            question: "Did you encounter loose rock or unstable terrain?",
            category: .rockfall, domain: .ropeSystems
        ),
        HazardPrompt(
            question: "Were crevasses present or suspected?",
            category: .crevasse, domain: .glacierTravel
        ),
    ]

    // MARK: - Get Hazards for Activity

    static func hazards(for activity: Activity) -> [HazardPrompt] {
        switch activity {
        case .paragliding: return paraglidingHazards
        case .skiTouring: return skiTouringHazards
        case .hiking: return hikingHazards
        case .climbing: return climbingHazards
        }
    }
}
