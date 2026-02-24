import Foundation
import SwiftUI

// MARK: - Activity Types

enum Activity: String, CaseIterable, Codable {
    case paragliding
    case skiTouring
    case hiking
    case climbing

    var displayName: String {
        switch self {
        case .paragliding: return "Paragliding"
        case .skiTouring: return "Ski Touring"
        case .hiking: return "Hiking"
        case .climbing: return "Climbing"
        }
    }

    var shortName: String {
        switch self {
        case .paragliding: return "Fly"
        case .skiTouring: return "Ski"
        case .hiking: return "Hike"
        case .climbing: return "Climb"
        }
    }

    var icon: String {
        switch self {
        case .paragliding: return "bird.fill"
        case .skiTouring: return "mountain.2.fill"
        case .hiking: return "figure.hiking"
        case .climbing: return "figure.climbing"
        }
    }

    var iconImage: Image {
        switch self {
        case .paragliding: return Image("icon-paraglider")
        case .skiTouring: return Image("icon-skier")
        case .hiking: return Image(systemName: "figure.hiking")
        case .climbing: return Image(systemName: "figure.climbing")
        }
    }

    var color: Color {
        switch self {
        case .paragliding: return .flyingAccent
        case .skiTouring: return .accent
        case .hiking: return .emerald
        case .climbing: return .navigationAccent
        }
    }

    var relevantDomains: [DomainId] {
        switch self {
        case .paragliding: return [.weather, .flying, .firstAid]
        case .skiTouring: return [.weather, .avalanche, .navigation, .firstAid]
        case .hiking: return [.weather, .navigation, .firstAid]
        case .climbing: return [.ropeSystems, .weather, .glacierTravel, .firstAid]
        }
    }

    var relevantTools: [ToolId] {
        switch self {
        case .paragliding: return [.compass, .altimeter, .preFlight, .thermalForecast]
        case .skiTouring: return [.inclinometer, .compass, .altimeter, .reductionMethod, .bulletin]
        case .hiking: return [.compass, .altimeter]
        case .climbing: return [.compass, .altimeter]
        }
    }
}

// MARK: - Tool Identifiers

enum ToolId: String, CaseIterable {
    case inclinometer
    case compass
    case altimeter
    case reductionMethod
    case bulletin
    case preFlight
    case thermalForecast
}
