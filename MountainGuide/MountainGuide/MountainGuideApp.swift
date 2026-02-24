import SwiftUI
import SwiftData

@main
struct MountainGuideApp: App {
    @StateObject private var store = KnowledgeStore()
    @StateObject private var activityStore = ActivityStore.shared
    @StateObject private var locationService = LocationService.shared
    @StateObject private var weather = WeatherService.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .environmentObject(activityStore)
                .environmentObject(locationService)
                .environmentObject(weather)
                .preferredColorScheme(.light)
        }
    }
}

struct ContentView: View {
    @EnvironmentObject var store: KnowledgeStore
    @EnvironmentObject var activityStore: ActivityStore
    @State private var selectedTab: Tab = .home

    enum Tab: String {
        case home, learn, field, profile
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(Tab.home)

            LearnView()
                .tabItem {
                    Label("Learn", systemImage: "book.fill")
                }
                .tag(Tab.learn)
                .badge(store.dueCardCount)

            FieldView()
                .tabItem {
                    Label("Field", systemImage: "map.fill")
                }
                .tag(Tab.field)

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.fill")
                }
                .tag(Tab.profile)
                .badge(ActivityLogStore.shared.pendingReviews.count)
        }
        .tint(Color.accent)
        .onAppear {
            store.validateStreak()
            LocationService.shared.requestPermissionAndStart()
            NotificationService.shared.requestPermission()
            NotificationService.shared.scheduleDailyReminder(dueCount: store.dueCardCount, streak: store.state.stats.currentStreak)
        }
        .task {
            // Auto-sync HealthKit on launch
            if HealthKitService.shared.isAuthorized {
                await HealthKitService.shared.syncAll()
            }
            // Auto-sync XContest on launch
            if XContestService.shared.username != nil {
                await XContestService.shared.syncAll()
            }
        }
    }
}
