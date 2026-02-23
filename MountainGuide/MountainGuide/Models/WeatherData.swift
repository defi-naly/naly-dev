import Foundation

// MARK: - Weather Data Models

struct WeatherConditions: Codable {
    let temperature: Double          // Celsius
    let apparentTemperature: Double  // Wind chill / heat index
    let windSpeed: Double            // km/h
    let windDirection: Int           // Degrees
    let windGusts: Double            // km/h
    let precipitation: Double        // mm
    let cloudCover: Int              // 0-100%
    let pressure: Double             // hPa
    let humidity: Int                // 0-100%
    let visibility: Double           // km
    let snowDepth: Double?           // cm
    let isDay: Bool
    let weatherCode: Int             // WMO weather code
    let timestamp: Date
}

struct MountainWeather {
    let freezingLevel: Int?          // meters
    let windAt2000m: WindAtAltitude?
    let windAt3000m: WindAtAltitude?
    let windAt4000m: WindAtAltitude?
}

struct WindAtAltitude {
    let altitude: Int                // meters
    let speed: Double                // km/h
    let direction: Int               // degrees
    let temperature: Double          // Celsius
}

struct HourlyForecast: Identifiable {
    let id = UUID()
    let time: Date
    let temperature: Double
    let precipitation: Double
    let windSpeed: Double
    let cloudCover: Int
    let weatherCode: Int
}

enum WeatherTrend: String {
    case improving = "Improving"
    case stable = "Stable"
    case deteriorating = "Deteriorating"

    var icon: String {
        switch self {
        case .improving: return "arrow.up.right"
        case .stable: return "arrow.right"
        case .deteriorating: return "arrow.down.right"
        }
    }
}

enum PressureTrend: String {
    case rising = "Rising"
    case stable = "Stable"
    case falling = "Falling"

    var icon: String {
        switch self {
        case .rising: return "arrow.up"
        case .stable: return "minus"
        case .falling: return "arrow.down"
        }
    }

    var weatherImplication: String {
        switch self {
        case .rising: return "Generally improving conditions"
        case .stable: return "Conditions likely to persist"
        case .falling: return "Possible incoming weather system"
        }
    }
}

// MARK: - WMO Weather Code Descriptions

extension WeatherConditions {
    var weatherDescription: String {
        switch weatherCode {
        case 0: return "Clear sky"
        case 1: return "Mainly clear"
        case 2: return "Partly cloudy"
        case 3: return "Overcast"
        case 45, 48: return "Fog"
        case 51, 53, 55: return "Drizzle"
        case 56, 57: return "Freezing drizzle"
        case 61, 63, 65: return "Rain"
        case 66, 67: return "Freezing rain"
        case 71, 73, 75: return "Snowfall"
        case 77: return "Snow grains"
        case 80, 81, 82: return "Rain showers"
        case 85, 86: return "Snow showers"
        case 95: return "Thunderstorm"
        case 96, 99: return "Thunderstorm with hail"
        default: return "Unknown"
        }
    }

    var weatherIcon: String {
        switch weatherCode {
        case 0: return isDay ? "sun.max.fill" : "moon.stars.fill"
        case 1: return isDay ? "sun.min.fill" : "moon.fill"
        case 2: return isDay ? "cloud.sun.fill" : "cloud.moon.fill"
        case 3: return "cloud.fill"
        case 45, 48: return "cloud.fog.fill"
        case 51, 53, 55: return "cloud.drizzle.fill"
        case 56, 57: return "cloud.sleet.fill"
        case 61, 63, 65: return "cloud.rain.fill"
        case 66, 67: return "cloud.sleet.fill"
        case 71, 73, 75, 77: return "cloud.snow.fill"
        case 80, 81, 82: return "cloud.heavyrain.fill"
        case 85, 86: return "cloud.snow.fill"
        case 95, 96, 99: return "cloud.bolt.rain.fill"
        default: return "questionmark.circle"
        }
    }

    var windCardinal: String {
        let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                          "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
        let index = Int((Double(windDirection) + 11.25) / 22.5) % 16
        return directions[index]
    }
}
