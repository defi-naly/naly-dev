import MapKit
import SwiftUI

// MARK: - Danger Region Polygon

class DangerRegionPolygon: MKPolygon {
    var dangerLevel: Int = 0
    var fillHex: String?
    var regionName: String?
}

// MARK: - Danger Region Overlay Helper

struct DangerRegionOverlayHelper {
    static func addRegions(_ features: [DangerRegionFeature], to mapView: MKMapView) {
        // Remove existing danger region overlays
        let existingOverlays = mapView.overlays.compactMap { $0 as? DangerRegionPolygon }
        mapView.removeOverlays(existingOverlays)

        // Add new danger region polygons
        for feature in features {
            guard feature.geometry.type == "Polygon",
                  let ring = feature.geometry.coordinates.first,
                  ring.count >= 3 else { continue }

            var coords = ring.map { pair in
                CLLocationCoordinate2D(latitude: pair[1], longitude: pair[0])
            }

            let polygon = DangerRegionPolygon(coordinates: &coords, count: coords.count)
            polygon.dangerLevel = feature.properties.maxDangerLevel
            polygon.fillHex = feature.properties.fill
            polygon.regionName = feature.properties.regionName
            polygon.title = feature.properties.regionName
            mapView.addOverlay(polygon, level: .aboveLabels)
        }
    }

    static func renderer(for polygon: DangerRegionPolygon) -> MKPolygonRenderer {
        let renderer = MKPolygonRenderer(polygon: polygon)

        // Use fill hex from API if available, otherwise fall back to danger scale color
        let dangerColor: UIColor
        if let hex = polygon.fillHex {
            dangerColor = UIColor(Color(hex: hex))
        } else {
            dangerColor = UIColor(Color.dangerColor(for: polygon.dangerLevel))
        }

        renderer.fillColor = dangerColor.withAlphaComponent(0.25)
        renderer.strokeColor = dangerColor.withAlphaComponent(0.7)
        renderer.lineWidth = 1.5

        return renderer
    }
}
