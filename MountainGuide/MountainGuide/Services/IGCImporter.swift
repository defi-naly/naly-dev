import SwiftUI
import UniformTypeIdentifiers

// MARK: - IGC File Importer

struct IGCImporter: ViewModifier {
    @Binding var isPresented: Bool
    let onImport: (String) -> Void

    func body(content: Content) -> some View {
        content
            .fileImporter(
                isPresented: $isPresented,
                allowedContentTypes: [UTType(filenameExtension: "igc") ?? .plainText],
                allowsMultipleSelection: false
            ) { result in
                switch result {
                case .success(let urls):
                    guard let url = urls.first else { return }
                    guard url.startAccessingSecurityScopedResource() else { return }
                    defer { url.stopAccessingSecurityScopedResource() }

                    if let data = try? Data(contentsOf: url),
                       let content = String(data: data, encoding: .utf8) {
                        onImport(content)
                    }
                case .failure:
                    break
                }
            }
    }
}

extension View {
    func igcImporter(isPresented: Binding<Bool>, onImport: @escaping (String) -> Void) -> some View {
        modifier(IGCImporter(isPresented: isPresented, onImport: onImport))
    }
}

// MARK: - IGC Import Helper

enum IGCImportHelper {
    @MainActor
    static func importIGCContent(_ content: String) {
        guard let parsed = IGCParser.parse(content) else { return }

        let flightLog = FlightLog(
            date: parsed.date,
            takeoffLat: parsed.takeoff.latitude,
            takeoffLon: parsed.takeoff.longitude,
            landingLat: parsed.landing.latitude,
            landingLon: parsed.landing.longitude,
            duration: parsed.duration,
            maxAltitude: parsed.maxAltitude,
            altitudeGain: parsed.totalClimb,
            xcDistance: 0,  // Not available from IGC alone
            trackPoints: parsed.trackPoints,
            source: .igcImport(filename: "imported.igc")
        )

        ActivityLogStore.shared.save(flight: flightLog)
        ActivityLogStore.shared.addPendingReview(activityId: flightLog.id)
    }
}
