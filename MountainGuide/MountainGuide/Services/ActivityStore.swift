import Foundation
import SwiftUI

// MARK: - Activity Store

@MainActor
class ActivityStore: ObservableObject {
    static let shared = ActivityStore()

    @Published var currentActivity: Activity {
        didSet {
            UserDefaults.standard.set(currentActivity.rawValue, forKey: "currentActivity")
        }
    }

    private init() {
        if let raw = UserDefaults.standard.string(forKey: "currentActivity"),
           let activity = Activity(rawValue: raw) {
            currentActivity = activity
        } else {
            currentActivity = .paragliding
        }
    }
}
