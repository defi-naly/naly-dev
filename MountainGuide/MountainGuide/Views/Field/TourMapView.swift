import SwiftUI
import MapKit

// MARK: - Tour Map (UIViewRepresentable)

struct TourMapView: UIViewRepresentable {
    let waypoints: [Waypoint]
    let showSlopeAngle: Bool
    let onTap: ((CLLocationCoordinate2D) -> Void)?

    static let baseTileTemplate = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
    static let slopeTileTemplate = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo-karto.hangneigung/default/current/3857/{z}/{x}/{y}.png"

    func makeUIView(context: Context) -> MKMapView {
        let mapView = MKMapView()
        mapView.delegate = context.coordinator
        mapView.showsUserLocation = true
        mapView.mapType = .standard

        // Swisstopo basemap
        let baseOverlay = MKTileOverlay(urlTemplate: Self.baseTileTemplate)
        baseOverlay.canReplaceMapContent = true
        mapView.addOverlay(baseOverlay, level: .aboveLabels)

        // Default region: Swiss Alps
        let region = MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 46.8, longitude: 8.2),
            span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5)
        )
        mapView.setRegion(region, animated: false)

        // Tap gesture
        let tap = UITapGestureRecognizer(target: context.coordinator, action: #selector(Coordinator.handleTap(_:)))
        mapView.addGestureRecognizer(tap)

        context.coordinator.mapView = mapView
        return mapView
    }

    func updateUIView(_ mapView: MKMapView, context: Context) {
        let coordinator = context.coordinator

        // Update slope overlay
        coordinator.updateSlopeOverlay(show: showSlopeAngle, on: mapView)

        // Update annotations
        let existingAnnotations = mapView.annotations.compactMap { $0 as? WaypointAnnotation }
        mapView.removeAnnotations(existingAnnotations)

        for wp in waypoints {
            let annotation = WaypointAnnotation(waypoint: wp)
            mapView.addAnnotation(annotation)
        }

        // Update polyline
        mapView.removeOverlays(mapView.overlays.filter { $0 is MKPolyline })
        if waypoints.count > 1 {
            let sorted = waypoints.sorted { $0.order < $1.order }
            let coords = sorted.map { $0.coordinate }
            let polyline = MKPolyline(coordinates: coords, count: coords.count)
            mapView.addOverlay(polyline, level: .aboveLabels)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(onTap: onTap)
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, MKMapViewDelegate {
        var onTap: ((CLLocationCoordinate2D) -> Void)?
        weak var mapView: MKMapView?
        private var slopeOverlay: MKTileOverlay?

        init(onTap: ((CLLocationCoordinate2D) -> Void)?) {
            self.onTap = onTap
        }

        @objc func handleTap(_ gesture: UITapGestureRecognizer) {
            guard let mapView = mapView else { return }
            let point = gesture.location(in: mapView)
            let coord = mapView.convert(point, toCoordinateFrom: mapView)
            onTap?(coord)
        }

        func updateSlopeOverlay(show: Bool, on mapView: MKMapView) {
            if show && slopeOverlay == nil {
                let overlay = MKTileOverlay(urlTemplate: TourMapView.slopeTileTemplate)
                overlay.canReplaceMapContent = false
                slopeOverlay = overlay
                mapView.addOverlay(overlay, level: .aboveLabels)
            } else if !show, let existing = slopeOverlay {
                mapView.removeOverlay(existing)
                slopeOverlay = nil
            }
        }

        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            if let tileOverlay = overlay as? MKTileOverlay {
                let renderer = MKTileOverlayRenderer(tileOverlay: tileOverlay)
                // Slope overlay is semi-transparent
                if tileOverlay === slopeOverlay {
                    renderer.alpha = 0.55
                }
                return renderer
            }
            if let polyline = overlay as? MKPolyline {
                let renderer = MKPolylineRenderer(polyline: polyline)
                renderer.strokeColor = UIColor(Color.accent)
                renderer.lineWidth = 3
                return renderer
            }
            return MKOverlayRenderer(overlay: overlay)
        }

        func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
            guard let wpAnnotation = annotation as? WaypointAnnotation else { return nil }
            let id = "WaypointPin"
            let view = mapView.dequeueReusableAnnotationView(withIdentifier: id) as? MKMarkerAnnotationView
                ?? MKMarkerAnnotationView(annotation: wpAnnotation, reuseIdentifier: id)
            view.annotation = wpAnnotation
            view.markerTintColor = UIColor(Color.accent)
            view.glyphText = "\(wpAnnotation.waypoint.order + 1)"
            view.canShowCallout = true
            return view
        }
    }
}

// MARK: - Waypoint Annotation

class WaypointAnnotation: NSObject, MKAnnotation {
    let waypoint: Waypoint

    init(waypoint: Waypoint) {
        self.waypoint = waypoint
        super.init()
    }

    var coordinate: CLLocationCoordinate2D { waypoint.coordinate }
    var title: String? { waypoint.name }
    var subtitle: String? {
        if let elev = waypoint.elevation {
            return "\(Int(elev))m"
        }
        return nil
    }
}
