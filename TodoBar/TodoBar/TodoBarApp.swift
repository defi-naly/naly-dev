import SwiftUI
import KeyboardShortcuts

extension KeyboardShortcuts.Name {
    static let toggleMenu = Self("toggleMenu")
}

@main
struct TodoBarApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        Settings {
            SettingsView()
        }
    }
}

struct SettingsView: View {
    var body: some View {
        Form {
            KeyboardShortcuts.Recorder("Toggle TodoBar:", name: .toggleMenu)

            Divider()

            HStack {
                Spacer()
                Button("Quit TodoBar") {
                    NSApplication.shared.terminate(nil)
                }
            }
        }
        .padding()
        .frame(width: 300)
    }
}
