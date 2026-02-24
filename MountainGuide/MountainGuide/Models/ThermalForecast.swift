import Foundation
import SwiftUI

// MARK: - Thermal Forecast

struct ThermalForecast {
    let thermalVelocity: Double       // m/s estimated thermal climb rate
    let cape: Double                   // J/kg Convective Available Potential Energy
    let cloudBase: Int                 // meters AGL estimated cloud base
    let boundaryLayerHeight: Int       // meters AGL
    let triggerTemperature: Double     // °C temperature needed for thermals
    let dewPoint: Double               // °C dew point
    let liftedIndex: Double            // Stability index (negative = unstable)
    let timestamp: Date

    var thermalQuality: ThermalQuality {
        if thermalVelocity >= 3.0 && cape >= 500 { return .strong }
        if thermalVelocity >= 1.5 && cape >= 200 { return .moderate }
        if thermalVelocity >= 0.5 { return .weak }
        return .none
    }
}

enum ThermalQuality: String {
    case strong = "Strong"
    case moderate = "Moderate"
    case weak = "Weak"
    case none = "None"

    var color: Color {
        switch self {
        case .strong: return .emerald
        case .moderate: return .flyingAccent
        case .weak: return .warning
        case .none: return .textTertiary
        }
    }

    var icon: String {
        switch self {
        case .strong: return "arrow.up.circle.fill"
        case .moderate: return "arrow.up.circle"
        case .weak: return "arrow.up"
        case .none: return "minus.circle"
        }
    }
}

// MARK: - Hourly Thermal Forecast

struct HourlyThermalForecast: Identifiable {
    let id = UUID()
    let hour: Date
    let thermalVelocity: Double
    let cape: Double
    let cloudBase: Int
    let boundaryLayerHeight: Int
}

// MARK: - Flyability Index

struct FlyabilityIndex {
    let score: Int               // 0–100 composite
    let windScore: Int           // 0–25
    let thermalScore: Int        // 0–25
    let cloudBaseScore: Int      // 0–25
    let precipScore: Int         // 0–25
    let verdict: FlyabilityVerdict

    static func calculate(
        windSpeed: Double,
        windGusts: Double,
        thermalVelocity: Double,
        cape: Double,
        cloudBase: Int,
        precipitation: Double,
        cloudCover: Int
    ) -> FlyabilityIndex {
        // Wind score (25 points) — lower is better for paragliding
        let windScore: Int
        if windSpeed < 15 && windGusts < 25 {
            windScore = 25
        } else if windSpeed < 25 && windGusts < 35 {
            windScore = 15
        } else if windSpeed < 35 {
            windScore = 5
        } else {
            windScore = 0
        }

        // Thermal score (25 points)
        let thermalScore: Int
        if cape >= 500 && thermalVelocity >= 2.0 {
            thermalScore = 25
        } else if cape >= 200 && thermalVelocity >= 1.0 {
            thermalScore = 18
        } else if cape >= 50 {
            thermalScore = 10
        } else {
            thermalScore = 3
        }

        // Cloud base score (25 points) — higher is better
        let cloudBaseScore: Int
        if cloudBase >= 2500 {
            cloudBaseScore = 25
        } else if cloudBase >= 1500 {
            cloudBaseScore = 20
        } else if cloudBase >= 800 {
            cloudBaseScore = 12
        } else {
            cloudBaseScore = 5
        }

        // Precipitation score (25 points)
        let precipScore: Int
        if precipitation == 0 && cloudCover < 60 {
            precipScore = 25
        } else if precipitation < 0.5 && cloudCover < 80 {
            precipScore = 15
        } else if precipitation < 2.0 {
            precipScore = 5
        } else {
            precipScore = 0
        }

        let total = windScore + thermalScore + cloudBaseScore + precipScore

        let verdict: FlyabilityVerdict
        if total >= 80 { verdict = .excellent }
        else if total >= 60 { verdict = .good }
        else if total >= 35 { verdict = .marginal }
        else { verdict = .noGo }

        return FlyabilityIndex(
            score: total,
            windScore: windScore,
            thermalScore: thermalScore,
            cloudBaseScore: cloudBaseScore,
            precipScore: precipScore,
            verdict: verdict
        )
    }
}

enum FlyabilityVerdict: String {
    case excellent = "Excellent"
    case good = "Good"
    case marginal = "Marginal"
    case noGo = "No-Go"

    var color: Color {
        switch self {
        case .excellent: return .emerald
        case .good: return .accent
        case .marginal: return .warning
        case .noGo: return .danger
        }
    }

    var icon: String {
        switch self {
        case .excellent: return "checkmark.circle.fill"
        case .good: return "checkmark.circle"
        case .marginal: return "exclamationmark.triangle"
        case .noGo: return "xmark.octagon.fill"
        }
    }
}

// MARK: - Aviation Weather Response

struct AviationMeteoResponse: Codable {
    let hourly: AviationHourly?
}

struct AviationHourly: Codable {
    let time: [String]
    let cape: [Double]?
    let liftedIndex: [Double]?
    let cloudBase: [Double]?        // In practice from boundary_layer_height
    let boundaryLayerHeight: [Double]?
    let dewPoint2m: [Double]?

    enum CodingKeys: String, CodingKey {
        case time
        case cape
        case liftedIndex = "lifted_index"
        case cloudBase = "cloudbase"
        case boundaryLayerHeight = "boundary_layer_height"
        case dewPoint2m = "dew_point_2m"
    }
}
