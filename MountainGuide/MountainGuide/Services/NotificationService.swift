import Foundation
import UserNotifications

class NotificationService {
    static let shared = NotificationService()
    private init() {}

    func requestPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { _, _ in }
    }

    func scheduleDailyReminder(dueCount: Int, streak: Int) {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: ["daily-review"])

        guard dueCount > 0 || streak > 0 else { return }

        let content = UNMutableNotificationContent()
        content.sound = .default

        if dueCount > 0 {
            content.title = "\(dueCount) cards due today"
            if streak > 0 {
                content.body = "Don't break your \(streak)-day streak. Quick review session?"
            } else {
                content.body = "Start a review session to build your streak."
            }
        } else {
            content.title = "No cards due today"
            content.body = "\(streak)-day streak! Keep learning new modules."
        }

        // Schedule for 7:30 AM daily
        var dateComponents = DateComponents()
        dateComponents.hour = 7
        dateComponents.minute = 30

        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
        let request = UNNotificationRequest(identifier: "daily-review", content: content, trigger: trigger)

        center.add(request)
    }

    func scheduleStreakWarning(streak: Int, dueCount: Int) {
        guard streak > 3 && dueCount > 0 else { return }

        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: ["streak-warning"])

        let content = UNMutableNotificationContent()
        content.title = "Streak in danger!"
        content.body = "\(dueCount) cards left — don't break your \(streak)-day streak."
        content.sound = .default

        // Schedule for 8 PM if cards still due
        var dateComponents = DateComponents()
        dateComponents.hour = 20
        dateComponents.minute = 0

        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: false)
        let request = UNNotificationRequest(identifier: "streak-warning", content: content, trigger: trigger)

        center.add(request)
    }
}
