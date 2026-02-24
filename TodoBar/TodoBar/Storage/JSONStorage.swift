import Foundation

struct JSONStorage {
    private let fileName = "tasks.json"

    private var fileURL: URL {
        let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let appDir = appSupport.appendingPathComponent("TodoBar", isDirectory: true)

        // Create directory if needed
        if !FileManager.default.fileExists(atPath: appDir.path) {
            try? FileManager.default.createDirectory(at: appDir, withIntermediateDirectories: true)
        }

        return appDir.appendingPathComponent(fileName)
    }

    func save(_ tasks: [TodoTask]) {
        do {
            let encoder = JSONEncoder()
            encoder.dateEncodingStrategy = .iso8601
            encoder.outputFormatting = .prettyPrinted
            let data = try encoder.encode(tasks)
            try data.write(to: fileURL)
        } catch {
            print("Failed to save tasks: \(error)")
        }
    }

    func load() -> [TodoTask]? {
        guard FileManager.default.fileExists(atPath: fileURL.path) else {
            return nil
        }

        do {
            let data = try Data(contentsOf: fileURL)
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601
            return try decoder.decode([TodoTask].self, from: data)
        } catch {
            print("Failed to load tasks: \(error)")
            return nil
        }
    }
}
