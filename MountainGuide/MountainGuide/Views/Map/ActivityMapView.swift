import SwiftUI
import MapKit

// MARK: - Activity-Aware Map View

struct ActivityMapView: UIViewRepresentable {
    let activity: Activity
    let airspaces: [Airspace]
    var dangerRegions: [DangerRegionFeature] = []
    let showSlopeAngle: Bool
    var showHikingTrails: Bool = false
    var poiAnnotations: [SwissPOI] = []
    var launchSites: [LaunchSite] = []
    let trackPoints: [TrackPoint]
    let onTap: ((CLLocationCoordinate2D) -> Void)?

    static let baseTileTemplate = TourMapView.baseTileTemplate
    static let slopeTileTemplate = TourMapView.slopeTileTemplate
    static let hikingTrailsTemplate = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/3857/{z}/{x}/{y}.png"

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

        // Update hiking trails overlay
        coordinator.updateHikingTrails(show: showHikingTrails, on: mapView)

        // Update airspace overlays
        coordinator.updateAirspaces(airspaces, on: mapView)

        // Update danger region overlays
        coordinator.updateDangerRegions(dangerRegions, on: mapView)

        // Update GPS track
        coordinator.updateTrack(trackPoints, on: mapView)

        // Update POI annotations
        coordinator.updatePOI(poiAnnotations, on: mapView)

        // Update launch site annotations
        coordinator.updateLaunchSites(launchSites, on: mapView)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(onTap: onTap)
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, MKMapViewDelegate {
        var onTap: ((CLLocationCoordinate2D) -> Void)?
        weak var mapView: MKMapView?
        private var slopeOverlay: MKTileOverlay?
        private var hikingTrailsOverlay: MKTileOverlay?
        private var trackPolyline: MKPolyline?
        private var currentPOIAnnotations: [POIAnnotation] = []
        private var currentLaunchAnnotations: [LaunchSiteAnnotation] = []
        private var currentAirspaceIDs: Set<String> = []
        private var currentDangerRegionIDs: Set<String> = []
        private var currentPOINames: Set<String> = []
        private var currentLaunchSiteNames: Set<String> = []

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
                let overlay = MKTileOverlay(urlTemplate: ActivityMapView.slopeTileTemplate)
                overlay.canReplaceMapContent = false
                slopeOverlay = overlay
                mapView.addOverlay(overlay, level: .aboveLabels)
            } else if !show, let existing = slopeOverlay {
                mapView.removeOverlay(existing)
                slopeOverlay = nil
            }
        }

        func updateHikingTrails(show: Bool, on mapView: MKMapView) {
            if show && hikingTrailsOverlay == nil {
                let overlay = MKTileOverlay(urlTemplate: ActivityMapView.hikingTrailsTemplate)
                overlay.canReplaceMapContent = false
                hikingTrailsOverlay = overlay
                mapView.addOverlay(overlay, level: .aboveLabels)
            } else if !show, let existing = hikingTrailsOverlay {
                mapView.removeOverlay(existing)
                hikingTrailsOverlay = nil
            }
        }

        func updateAirspaces(_ airspaces: [Airspace], on mapView: MKMapView) {
            let newIDs = Set(airspaces.map(\.id))
            guard newIDs != currentAirspaceIDs else { return }
            currentAirspaceIDs = newIDs
            AirspaceOverlayHelper.addAirspaces(airspaces, to: mapView)
        }

        func updateDangerRegions(_ features: [DangerRegionFeature], on mapView: MKMapView) {
            let newIDs = Set(features.map(\.id))
            guard newIDs != currentDangerRegionIDs else { return }
            currentDangerRegionIDs = newIDs
            DangerRegionOverlayHelper.addRegions(features, to: mapView)
        }

        func updateTrack(_ points: [TrackPoint], on mapView: MKMapView) {
            // Remove old track
            if let old = trackPolyline {
                mapView.removeOverlay(old)
            }

            guard points.count >= 2 else { return }

            var coords = points.map { $0.coordinate }
            let polyline = MKPolyline(coordinates: &coords, count: coords.count)
            trackPolyline = polyline
            mapView.addOverlay(polyline, level: .aboveLabels)
        }

        func updatePOI(_ pois: [SwissPOI], on mapView: MKMapView) {
            let newNames = Set(pois.map(\.name))
            guard newNames != currentPOINames else { return }
            currentPOINames = newNames

            // Remove old annotations
            if !currentPOIAnnotations.isEmpty {
                mapView.removeAnnotations(currentPOIAnnotations)
                currentPOIAnnotations = []
            }

            guard !pois.isEmpty else { return }

            let annotations = pois.map { poi -> POIAnnotation in
                let annotation = POIAnnotation(poi: poi)
                annotation.coordinate = CLLocationCoordinate2D(latitude: poi.latitude, longitude: poi.longitude)
                annotation.title = poi.name
                return annotation
            }
            currentPOIAnnotations = annotations
            mapView.addAnnotations(annotations)
        }

        func updateLaunchSites(_ sites: [LaunchSite], on mapView: MKMapView) {
            let newNames = Set(sites.map(\.name))
            guard newNames != currentLaunchSiteNames else { return }
            currentLaunchSiteNames = newNames

            // Remove old annotations
            if !currentLaunchAnnotations.isEmpty {
                mapView.removeAnnotations(currentLaunchAnnotations)
                currentLaunchAnnotations = []
            }

            guard !sites.isEmpty else { return }

            let annotations = sites.map { site -> LaunchSiteAnnotation in
                let annotation = LaunchSiteAnnotation(site: site)
                annotation.coordinate = site.coordinate
                annotation.title = site.name
                annotation.subtitle = "\(site.altitude)m · \(site.suitableWindsDisplay)"
                return annotation
            }
            currentLaunchAnnotations = annotations
            mapView.addAnnotations(annotations)
        }

        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            if let dangerRegion = overlay as? DangerRegionPolygon {
                return DangerRegionOverlayHelper.renderer(for: dangerRegion)
            }
            if let airspace = overlay as? AirspacePolygon {
                return AirspaceOverlayHelper.renderer(for: airspace)
            }
            if let tileOverlay = overlay as? MKTileOverlay {
                let renderer = MKTileOverlayRenderer(tileOverlay: tileOverlay)
                if tileOverlay === slopeOverlay {
                    renderer.alpha = 0.55
                } else if tileOverlay === hikingTrailsOverlay {
                    renderer.alpha = 0.8
                }
                return renderer
            }
            if let polyline = overlay as? MKPolyline {
                let renderer = MKPolylineRenderer(polyline: polyline)
                renderer.strokeColor = UIColor(Color.flyingAccent)
                renderer.lineWidth = 3
                return renderer
            }
            return MKOverlayRenderer(overlay: overlay)
        }

        func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
            // Launch site annotations
            if let launchAnnotation = annotation as? LaunchSiteAnnotation {
                let identifier = "LaunchSiteAnnotation"
                let view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier) as? MKMarkerAnnotationView
                    ?? MKMarkerAnnotationView(annotation: annotation, reuseIdentifier: identifier)

                view.annotation = annotation
                view.canShowCallout = true
                view.glyphImage = UIImage(systemName: "paraglider")
                    ?? UIImage(systemName: "wind")
                view.markerTintColor = UIColor(Color.flyingAccent)
                view.displayPriority = .defaultHigh

                // Callout detail
                let detail = UILabel()
                detail.font = .systemFont(ofSize: 12)
                detail.textColor = .secondaryLabel
                detail.numberOfLines = 2
                let winds = launchAnnotation.site.suitableWindsDisplay
                detail.text = "\(launchAnnotation.site.altitude)m\n\(winds)"
                view.detailCalloutAccessoryView = detail

                return view
            }

            // POI annotations
            if let poiAnnotation = annotation as? POIAnnotation {
                let identifier = "POIAnnotation"
                let view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier) as? MKMarkerAnnotationView
                    ?? MKMarkerAnnotationView(annotation: annotation, reuseIdentifier: identifier)

                view.annotation = annotation
                view.canShowCallout = true
                view.glyphImage = UIImage(systemName: poiAnnotation.poi.type.icon)
                view.markerTintColor = poiAnnotation.poi.type.tintColor
                view.displayPriority = .defaultHigh

                return view
            }

            return nil
        }
    }
}

// MARK: - POI Annotation

class POIAnnotation: MKPointAnnotation {
    let poi: SwissPOI

    init(poi: SwissPOI) {
        self.poi = poi
        super.init()
    }
}

// MARK: - Launch Site Annotation

class LaunchSiteAnnotation: MKPointAnnotation {
    let site: LaunchSite

    init(site: LaunchSite) {
        self.site = site
        super.init()
    }
}
