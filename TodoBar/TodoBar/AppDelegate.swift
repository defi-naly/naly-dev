import AppKit
import SwiftUI
import KeyboardShortcuts

class AppDelegate: NSObject, NSApplicationDelegate {
    var statusItem: NSStatusItem!
    var popover: NSPopover!
    var taskStore = TaskStore()

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Create status item (menu bar icon)
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)

        if let button = statusItem.button {
            button.image = NSImage(systemSymbolName: "list.bullet", accessibilityDescription: "Tasks")
            button.action = #selector(togglePopover)
        }

        // Create popover with SwiftUI content
        popover = NSPopover()
        popover.contentSize = NSSize(width: 320, height: 520)
        popover.behavior = .transient  // Closes when clicking outside
        popover.contentViewController = NSHostingController(
            rootView: ContentView().environment(taskStore)
        )

        // Register keyboard shortcut
        KeyboardShortcuts.onKeyUp(for: .toggleMenu) { [weak self] in
            self?.togglePopover()
        }
    }

    @objc func togglePopover() {
        if popover.isShown {
            popover.performClose(nil)
        } else if let button = statusItem.button {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
            popover.contentViewController?.view.window?.makeKey()
        }
    }
}
