import Foundation
import CoreLocation
import SwiftUI

// MARK: - Airspace Classification

enum AirspaceClass: String, Codable {
    case a = "A"
    case b = "B"
    case c = "C"
    case d = "D"
    case e = "E"
    case f = "F"
    case g = "G"
    case ctr = "CTR"
    case tma = "TMA"
    case restricted = "R"
    case prohibited = "P"
    case danger = "D_ZONE"

    var displayName: String {
        switch self {
        case .a: return "Class A"
        case .b: return "Class B"
        case .c: return "Class C"
        case .d: return "Class D"
        case .e: return "Class E"
        case .f: return "Class F"
        case .g: return "Class G"
        case .ctr: return "CTR"
        case .tma: return "TMA"
        case .restricted: return "Restricted"
        case .prohibited: return "Prohibited"
        case .danger: return "Danger Zone"
        }
    }

    var fillColor: Color {
        switch self {
        case .ctr: return .red
        case .tma: return .blue
        case .restricted: return .orange
        case .prohibited: return .red
        case .danger: return .orange
        case .a, .b: return .purple
        case .c: return .blue
        case .d: return .blue
        case .e: return .green
        case .f, .g: return .clear
        }
    }

    var strokeColor: Color {
        switch self {
        case .ctr, .prohibited: return .red
        case .tma, .c, .d: return .blue
        case .restricted, .danger: return .orange
        case .a, .b: return .purple
        case .e: return .green
        case .f, .g: return .gray
        }
    }
}

// MARK: - Airspace

struct Airspace: Identifiable, Codable {
    let id: String
    let name: String
    let airspaceClass: AirspaceClass
    let lowerLimit: AltitudeLimit
    let upperLimit: AltitudeLimit
    let geometry: [[Double]] // Array of [lon, lat] pairs

    var coordinates: [CLLocationCoordinate2D] {
        geometry.map { CLLocationCoordinate2D(latitude: $0[1], longitude: $0[0]) }
    }

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name
        case airspaceClass = "type"
        case lowerLimit = "lowerLimit"
        case upperLimit = "upperLimit"
        case geometry
    }
}

// MARK: - Altitude Limit

struct AltitudeLimit: Codable {
    let value: Int
    let unit: AltitudeUnit
    let reference: AltitudeReference

    var displayString: String {
        switch reference {
        case .gnd: return value == 0 ? "GND" : "\(value) \(unit.rawValue) AGL"
        case .msl: return "\(value) \(unit.rawValue) AMSL"
        case .fl: return "FL\(value)"
        case .unlimited: return "UNL"
        }
    }
}

enum AltitudeUnit: String, Codable {
    case ft = "FT"
    case m = "M"
    case fl = "FL"
}

enum AltitudeReference: String, Codable {
    case gnd = "GND"
    case msl = "MSL"
    case fl = "STD"
    case unlimited = "UNL"
}

// MARK: - OpenAIP API Response

struct OpenAIPAirspaceResponse: Codable {
    let items: [OpenAIPAirspace]
    let totalCount: Int
    let limit: Int
    let page: Int
}

struct OpenAIPAirspace: Codable, Identifiable {
    let id: String
    let name: String
    let type: Int
    let country: String
    let lowerLimit: OpenAIPLimit
    let upperLimit: OpenAIPLimit
    let geometry: OpenAIPGeometry

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, type, country
        case lowerLimit, upperLimit, geometry
    }

    var airspaceClass: AirspaceClass {
        switch type {
        case 1: return .a
        case 2: return .b
        case 3: return .c
        case 4: return .d
        case 5: return .e
        case 6: return .f
        case 7: return .g
        case 8: return .ctr
        case 9: return .tma
        case 14: return .restricted
        case 15: return .prohibited
        case 16: return .danger
        default: return .g
        }
    }

    func toAirspace() -> Airspace {
        let coords: [[Double]]
        if let polygon = geometry.coordinates?.first {
            coords = polygon
        } else {
            coords = []
        }

        return Airspace(
            id: id,
            name: name,
            airspaceClass: airspaceClass,
            lowerLimit: AltitudeLimit(
                value: lowerLimit.value,
                unit: lowerLimit.unit.toAltitudeUnit,
                reference: lowerLimit.referenceDatum.toAltitudeReference
            ),
            upperLimit: AltitudeLimit(
                value: upperLimit.value,
                unit: upperLimit.unit.toAltitudeUnit,
                reference: upperLimit.referenceDatum.toAltitudeReference
            ),
            geometry: coords
        )
    }
}

struct OpenAIPLimit: Codable {
    let value: Int
    let unit: OpenAIPUnit
    let referenceDatum: OpenAIPReference
}

enum OpenAIPUnit: Int, Codable {
    case feet = 1
    case flightLevel = 2
    case meters = 6

    var toAltitudeUnit: AltitudeUnit {
        switch self {
        case .feet: return .ft
        case .meters: return .m
        case .flightLevel: return .fl
        }
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let value = try container.decode(Int.self)
        self = OpenAIPUnit(rawValue: value) ?? .feet
    }
}

enum OpenAIPReference: Int, Codable {
    case gnd = 1
    case msl = 2
    case std = 3

    var toAltitudeReference: AltitudeReference {
        switch self {
        case .gnd: return .gnd
        case .msl: return .msl
        case .std: return .fl
        }
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let value = try container.decode(Int.self)
        self = OpenAIPReference(rawValue: value) ?? .msl
    }
}

struct OpenAIPGeometry: Codable {
    let type: String
    let coordinates: [[[Double]]]?
}
