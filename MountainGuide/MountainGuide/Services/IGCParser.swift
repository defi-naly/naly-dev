import Foundation
import CoreLocation

// MARK: - IGC File Parser

enum IGCParser {

    struct ParsedFlight {
        let pilotName: String?
        let date: Date
        let trackPoints: [TrackPoint]
        let takeoff: CLLocationCoordinate2D
        let landing: CLLocationCoordinate2D
        let maxAltitude: Double
        let totalClimb: Double
        let duration: TimeInterval
    }

    // MARK: - Parse IGC Content

    static func parse(_ content: String) -> ParsedFlight? {
        let lines = content.components(separatedBy: .newlines)

        var pilotName: String?
        var flightDate: Date?
        var trackPoints: [TrackPoint] = []

        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "ddMMyy"
        dateFormatter.timeZone = TimeZone(identifier: "UTC")

        for line in lines {
            guard !line.isEmpty else { continue }

            let prefix = line.first

            switch prefix {
            case "H":
                // Header records
                if line.hasPrefix("HFPLT") || line.hasPrefix("HPPLT") {
                    pilotName = extractHeaderValue(line)
                } else if line.hasPrefix("HFDTE") || line.hasPrefix("HPDTE") {
                    let dateStr = extractHeaderValue(line)
                    if let d = dateFormatter.date(from: dateStr) {
                        flightDate = d
                    }
                }

            case "B":
                // B-record: BHHMMSSDDMMmmmNDDDMMmmmEVPPPPPGGGGG
                if let point = parseBRecord(line, baseDate: flightDate ?? Date()) {
                    trackPoints.append(point)
                }

            default:
                break
            }
        }

        guard !trackPoints.isEmpty else { return nil }

        // Calculate stats
        var maxAlt = 0.0
        var totalClimb = 0.0

        for i in 0..<trackPoints.count {
            maxAlt = max(maxAlt, trackPoints[i].altitude)
            if i > 0 {
                let diff = trackPoints[i].altitude - trackPoints[i-1].altitude
                if diff > 0 { totalClimb += diff }
            }
        }

        let duration = trackPoints.last!.timestamp.timeIntervalSince(trackPoints.first!.timestamp)

        return ParsedFlight(
            pilotName: pilotName,
            date: flightDate ?? trackPoints.first!.timestamp,
            trackPoints: trackPoints,
            takeoff: trackPoints.first!.coordinate,
            landing: trackPoints.last!.coordinate,
            maxAltitude: maxAlt,
            totalClimb: totalClimb,
            duration: duration
        )
    }

    // MARK: - B-Record Parser

    private static func parseBRecord(_ line: String, baseDate: Date) -> TrackPoint? {
        // BHHMMSSDDMMmmmNDDDMMmmmEVPPPPPGGGGG
        // Minimum length: 35 characters
        guard line.count >= 35 else { return nil }

        let chars = Array(line)

        // Time: HHMMSS (indices 1-6)
        guard let hour = Int(String(chars[1...2])),
              let minute = Int(String(chars[3...4])),
              let second = Int(String(chars[5...6])) else { return nil }

        // Latitude: DDMMmmmN (indices 7-14)
        guard let latDeg = Int(String(chars[7...8])),
              let latMin = Int(String(chars[9...10])),
              let latDecMin = Int(String(chars[11...13])) else { return nil }
        let latHemisphere = chars[14]
        var lat = Double(latDeg) + (Double(latMin) + Double(latDecMin) / 1000.0) / 60.0
        if latHemisphere == "S" { lat = -lat }

        // Longitude: DDDMMmmmE (indices 15-23)
        guard let lonDeg = Int(String(chars[15...17])),
              let lonMin = Int(String(chars[18...19])),
              let lonDecMin = Int(String(chars[20...22])) else { return nil }
        let lonHemisphere = chars[23]
        var lon = Double(lonDeg) + (Double(lonMin) + Double(lonDecMin) / 1000.0) / 60.0
        if lonHemisphere == "W" { lon = -lon }

        // Validity: V (index 24)
        let validity = chars[24]
        guard validity == "A" else { return nil }  // Only valid fixes

        // Pressure altitude: PPPPP (indices 25-29)
        // GPS altitude: GGGGG (indices 30-34)
        let gpsAlt = Double(String(chars[30...34])) ?? 0

        // Build timestamp
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "UTC")!
        let components = calendar.dateComponents([.year, .month, .day], from: baseDate)
        var dateComponents = DateComponents()
        dateComponents.year = components.year
        dateComponents.month = components.month
        dateComponents.day = components.day
        dateComponents.hour = hour
        dateComponents.minute = minute
        dateComponents.second = second
        dateComponents.timeZone = TimeZone(identifier: "UTC")

        guard let timestamp = calendar.date(from: dateComponents) else { return nil }

        return TrackPoint(
            latitude: lat,
            longitude: lon,
            altitude: gpsAlt,
            timestamp: timestamp,
            speed: 0,  // computed later if needed
            vario: 0   // computed later if needed
        )
    }

    // MARK: - Header Value Extraction

    private static func extractHeaderValue(_ line: String) -> String {
        // Header format: HFXXX:value or HFXXXVALUE
        if let colonRange = line.range(of: ":") {
            return String(line[colonRange.upperBound...]).trimmingCharacters(in: .whitespaces)
        }
        // Fallback: take everything after the 5-character prefix
        if line.count > 5 {
            return String(line.dropFirst(5)).trimmingCharacters(in: .whitespaces)
        }
        return ""
    }
}
