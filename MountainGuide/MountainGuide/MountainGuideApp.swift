import SwiftUI
import SwiftData

@main
struct MountainGuideApp: App {
    @StateObject private var store = KnowledgeStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
        }
    }
}

struct ContentView: View {
    @EnvironmentObject var store: KnowledgeStore
    @State private var selectedTab: Tab = .dashboard

    enum Tab: String {
        case dashboard, learn, review, settings
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "gauge.with.dots.needle.33percent")
                }
                .tag(Tab.dashboard)

            DomainListView()
                .tabItem {
                    Label("Learn", systemImage: "book.fill")
                }
                .tag(Tab.learn)

            ReviewSessionView()
                .tabItem {
                    Label("Review", systemImage: "rectangle.stack.fill")
                }
                .tag(Tab.review)
                .badge(store.dueCardCount)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
                .tag(Tab.settings)
        }
        .tint(Color.amber)
        .onAppear {
            store.validateStreak()
            NotificationService.shared.requestPermission()
            NotificationService.shared.scheduleDailyReminder(dueCount: store.dueCardCount, streak: store.state.stats.currentStreak)
        }
    }
}
