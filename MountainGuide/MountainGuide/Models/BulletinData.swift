import SwiftUI

// MARK: - SLF CAAML v6 Bulletin Models

struct BulletinResponse: Codable {
    let bulletins: [Bulletin]
}

struct Bulletin: Codable, Identifiable {
    let bulletinID: String
    let lang: String?
    let publicationTime: String?
    let validTime: ValidTime?
    let source: BulletinSource?
    let regions: [BulletinRegion]?
    let dangerRatings: [DangerRating]?
    let avalancheProblems: [AvalancheProblem]?
    let weatherForecast: BulletinText?
    let snowpackStructure: BulletinText?
    let tendency: [BulletinTendency]?
    let highlights: String?

    var id: String { bulletinID }

    enum CodingKeys: String, CodingKey {
        case bulletinID, lang, publicationTime, validTime, source
        case regions = "regions"
        case dangerRatings, avalancheProblems
        case weatherForecast, snowpackStructure, tendency, highlights
    }
}

struct ValidTime: Codable {
    let startTime: String?
    let endTime: String?
}

struct BulletinSource: Codable {
    let provider: BulletinProvider?
}

struct BulletinProvider: Codable {
    let name: String?
    let website: String?
}

struct BulletinRegion: Codable, Identifiable {
    let regionID: String
    let name: String?

    var id: String { regionID }
}

struct DangerRating: Codable, Identifiable {
    let mainValue: String?
    let validTimePeriod: String?
    let elevation: ElevationRange?
    let customData: DangerCustomData?

    var id: String { "\(mainValue ?? "none")-\(validTimePeriod ?? "all")-\(elevation?.lowerBound ?? "")" }
}

struct ElevationRange: Codable {
    let lowerBound: String?
    let upperBound: String?
}

struct DangerCustomData: Codable {
    let CH: CHSubdivision?
}

struct CHSubdivision: Codable {
    let subdivision: String?
}

struct AvalancheProblem: Codable, Identifiable {
    let problemType: String?
    let elevation: ElevationRange?
    let aspects: [String]?
    let comment: String?
    let validTimePeriod: String?

    var id: String { "\(problemType ?? "unknown")-\(validTimePeriod ?? "all")" }
}

struct BulletinText: Codable {
    let comment: String?
}

struct BulletinTendency: Codable {
    let tendencyType: String?
    let comment: String?
    let validTime: ValidTime?
}

// MARK: - Danger Rating Extensions

extension DangerRating {
    var numericLevel: Int {
        switch mainValue?.lowercased() {
        case "low": return 1
        case "moderate": return 2
        case "considerable": return 3
        case "high": return 4
        case "very_high": return 5
        default: return 0
        }
    }

    var displayName: String {
        switch mainValue?.lowercased() {
        case "low": return "Low"
        case "moderate": return "Moderate"
        case "considerable": return "Considerable"
        case "high": return "High"
        case "very_high": return "Very High"
        default: return "No Rating"
        }
    }

    var color: Color {
        Color.dangerColor(for: numericLevel)
    }
}

// MARK: - Avalanche Problem Extensions

extension AvalancheProblem {
    var displayName: String {
        switch problemType?.lowercased() {
        case "new_snow": return "New Snow"
        case "wind_slab": return "Wind Slab"
        case "persistent_weak_layers": return "Persistent Weak Layers"
        case "wet_snow": return "Wet Snow"
        case "gliding_snow": return "Gliding Snow"
        case "cornices": return "Cornices"
        case "no_distinct_problem": return "No Distinct Problem"
        default: return problemType ?? "Unknown"
        }
    }

    var icon: String {
        switch problemType?.lowercased() {
        case "new_snow": return "snowflake"
        case "wind_slab": return "wind"
        case "persistent_weak_layers": return "square.3.layers.3d.down.left"
        case "wet_snow": return "drop.fill"
        case "gliding_snow": return "arrow.down.right"
        case "cornices": return "mountain.2.fill"
        default: return "exclamationmark.triangle"
        }
    }
}

// MARK: - SLF Danger Region GeoJSON Models

struct DangerRegionCollection: Codable {
    let type: String
    let features: [DangerRegionFeature]
}

struct DangerRegionFeature: Codable, Identifiable {
    let type: String
    let geometry: DangerRegionGeometry
    let properties: DangerRegionProperties

    var id: String {
        if let bid = properties.bulletinID { return bid }
        let firstCoord = geometry.coordinates.first?.first.map { "\($0[0]),\($0[1])" } ?? "0"
        return "danger-\(properties.regionName)-\(firstCoord)"
    }
}

struct DangerRegionGeometry: Codable {
    let type: String
    let coordinates: [[[Double]]]
}

struct DangerRegionProperties: Codable {
    let bulletinID: String?
    let dangerRatings: [DangerRating]?
    let regions: [BulletinRegion]?
    let fill: String?

    /// Highest danger level from all ratings in this region
    var maxDangerLevel: Int {
        dangerRatings?.map(\.numericLevel).max() ?? 0
    }

    /// Region display name (first region name or fallback)
    var regionName: String {
        regions?.first?.name ?? "Unknown Region"
    }
}

// MARK: - HTML Stripping

extension String {
    var strippingHTML: String {
        guard let data = self.data(using: .utf8) else { return self }
        let options: [NSAttributedString.DocumentReadingOptionKey: Any] = [
            .documentType: NSAttributedString.DocumentType.html,
            .characterEncoding: String.Encoding.utf8.rawValue
        ]
        if let attributed = try? NSAttributedString(data: data, options: options, documentAttributes: nil) {
            return attributed.string
        }
        // Fallback: regex strip
        return self.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
    }
}
