import Foundation
import SwiftUI

enum Category: String, Codable, CaseIterable, Identifiable {
    case today = "Today"
    case later = "Later"
    case someday = "Someday"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .today: return "sun.max.fill"
        case .later: return "clock.fill"
        case .someday: return "cloud.fill"
        }
    }

    var color: Color {
        switch self {
        case .today: return .terminalAccent
        case .later: return .terminalMuted
        case .someday: return Color(hex: "525252")
        }
    }
}
