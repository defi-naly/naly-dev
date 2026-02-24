import SwiftUI
import MapKit

struct MapPin: Identifiable {
    let id: String
    let coordinate: CLLocationCoordinate2D
    let title: String
    let icon: String  // SF Symbol
}

struct SwissTopoMapView: UIViewRepresentable {
    let region: MKCoordinateRegion
    let annotations: [MapPin]
    let showsUserLocation: Bool

    static let tileTemplate = "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"

    func makeUIView(context: Context) -> MKMapView {
        let mapView = MKMapView()
        mapView.delegate = context.coordinator
        mapView.setRegion(region, animated: false)
        mapView.showsUserLocation = showsUserLocation
        mapView.mapType = .standard

        // Add swisstopo tile overlay
        let overlay = MKTileOverlay(urlTemplate: Self.tileTemplate)
        overlay.canReplaceMapContent = true
        mapView.addOverlay(overlay, level: .aboveLabels)

        // Add annotations
        for pin in annotations {
            let annotation = MKPointAnnotation()
            annotation.coordinate = pin.coordinate
            annotation.title = pin.title
            mapView.addAnnotation(annotation)
        }

        return mapView
    }

    func updateUIView(_ mapView: MKMapView, context: Context) {
        mapView.setRegion(region, animated: true)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    class Coordinator: NSObject, MKMapViewDelegate {
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
            if let tileOverlay = overlay as? MKTileOverlay {
                return MKTileOverlayRenderer(tileOverlay: tileOverlay)
            }
            return MKOverlayRenderer(overlay: overlay)
        }
    }
}

// MARK: - Attribution Footer

struct SwissTopoAttribution: View {
    var body: some View {
        Text("\u{00A9} swisstopo")
            .font(.system(size: 10))
            .foregroundStyle(Color.textTertiary)
            .padding(.top, 2)
    }
}
