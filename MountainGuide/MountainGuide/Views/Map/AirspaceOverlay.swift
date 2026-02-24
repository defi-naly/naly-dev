import MapKit
import SwiftUI

// MARK: - Airspace Polygon

class AirspacePolygon: MKPolygon {
    var airspace: Airspace?
}

// MARK: - Airspace Overlay Helper

struct AirspaceOverlayHelper {
    static func addAirspaces(_ airspaces: [Airspace], to mapView: MKMapView) {
        // Remove existing airspace overlays
        let existingOverlays = mapView.overlays.compactMap { $0 as? AirspacePolygon }
        mapView.removeOverlays(existingOverlays)

        // Add new airspace polygons
        for airspace in airspaces {
            let coords = airspace.coordinates
            guard coords.count >= 3 else { continue }

            var mutableCoords = coords
            let polygon = AirspacePolygon(coordinates: &mutableCoords, count: mutableCoords.count)
            polygon.airspace = airspace
            polygon.title = airspace.name
            polygon.subtitle = "\(airspace.lowerLimit.displayString) – \(airspace.upperLimit.displayString)"
            mapView.addOverlay(polygon, level: .aboveLabels)
        }
    }

    static func renderer(for polygon: AirspacePolygon) -> MKPolygonRenderer {
        let renderer = MKPolygonRenderer(polygon: polygon)

        let airspaceClass = polygon.airspace?.airspaceClass ?? .g
        let uiColor = UIColor(airspaceClass.fillColor)
        let strokeUIColor = UIColor(airspaceClass.strokeColor)

        renderer.fillColor = uiColor.withAlphaComponent(0.15)
        renderer.strokeColor = strokeUIColor.withAlphaComponent(0.6)
        renderer.lineWidth = 1.5

        // Dashed line for restricted/danger zones
        if airspaceClass == .restricted || airspaceClass == .danger {
            renderer.lineDashPattern = [6, 4]
        }

        return renderer
    }
}
