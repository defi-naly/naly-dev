import Foundation
import SwiftUI

// MARK: - Activity Source

enum ActivitySource: Codable, Equatable {
    case manual
    case healthKit(workoutUUID: String)
    case xcontest(flightId: String)
    case igcImport(filename: String)

    var displayName: String {
        switch self {
        case .manual: return "Manual"
        case .healthKit: return "Apple Health"
        case .xcontest: return "XContest"
        case .igcImport: return "IGC Import"
        }
    }

    var icon: String {
        switch self {
        case .manual: return "pencil"
        case .healthKit: return "heart.fill"
        case .xcontest: return "globe"
        case .igcImport: return "doc.fill"
        }
    }
}

// MARK: - XP Axis

enum XPAxis: String, Codable, CaseIterable {
    case preparation   // lessons, reviews, bulletin checks, pre-flight, planner
    case prowess       // vertical meters, km flown, activities completed
    case safety        // post-trip reviews, hazard identification

    var displayName: String {
        switch self {
        case .preparation: return "Preparation"
        case .prowess: return "Prowess"
        case .safety: return "Safety"
        }
    }

    var icon: String {
        switch self {
        case .preparation: return "book.fill"
        case .prowess: return "figure.hiking"
        case .safety: return "shield.checkered"
        }
    }

    var color: Color {
        switch self {
        case .preparation: return .preparationXPColor
        case .prowess: return .prowessXPColor
        case .safety: return .safetyXPColor
        }
    }
}
