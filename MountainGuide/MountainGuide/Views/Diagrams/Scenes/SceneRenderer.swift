import SwiftUI

enum SceneRenderer {

    @ViewBuilder
    static func render(description: String, width: CGFloat, height: CGFloat) -> some View {
        let desc = description.lowercased()

        if desc.contains("cumulus") && desc.contains("active thermal") || desc.contains("well-developed cumulus") {
            CumulusScene(width: width, height: height)
        } else if desc.contains("lenticular") {
            LenticularScene(width: width, height: height)
        } else if desc.contains("cumulonimbus") {
            CumulonimbusScene(width: width, height: height)
        } else if desc.contains("thermal street") || desc.contains("cloud street") {
            CloudStreetScene(width: width, height: height)
        } else if desc.contains("dying") || desc.contains("active vs") || desc.contains("building") && desc.contains("cloud health") {
            DyingVsBuildingScene(width: width, height: height)
        } else if desc.contains("mountain landscape") || desc.contains("various cloud types") || desc.contains("cloud overview") {
            MountainCloudOverviewScene(width: width, height: height)
        } else if desc.contains("surface type") || desc.contains("thermal strength") {
            SurfaceTypesScene(width: width, height: height)
        } else if desc.contains("cross-section") && desc.contains("terrain trap") {
            TerrainTrapCrossSectionScene(width: width, height: height)
        } else if desc.contains("gully") && (desc.contains("comparison") || desc.contains("open slope")) {
            GullyComparisonScene(width: width, height: height)
        } else if desc.contains("cliff band") || desc.contains("bench above cliff") {
            CliffBandScene(width: width, height: height)
        } else if desc.contains("forest terrain") || desc.contains("forest") && desc.contains("dangerous") {
            ForestTerrainScene(width: width, height: height)
        } else if desc.contains("contour") || desc.contains("topographic") {
            MapContourScene(width: width, height: height)
        } else if desc.contains("knot") || desc.contains("figure-eight") || desc.contains("clove hitch") {
            KnotDiagramScene(width: width, height: height)
        } else if desc.contains("glacier") && (desc.contains("surface") || desc.contains("crevasse")) {
            GlacierSurfaceScene(width: width, height: height)
        } else if desc.contains("body") && desc.contains("assessment") || desc.contains("patient") {
            BodyAssessmentScene(width: width, height: height)
        } else if desc.contains("rope team") {
            RopeTeamScene(width: width, height: height)
        } else if desc.contains("anchor") && (desc.contains("system") || desc.contains("rock")) {
            AnchorSystemScene(width: width, height: height)
        } else if desc.contains("cumulus") {
            CumulusScene(width: width, height: height)
        } else {
            DefaultScene(width: width, height: height)
        }
    }
}
