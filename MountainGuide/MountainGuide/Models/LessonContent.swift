import Foundation
import SwiftUI

// MARK: - Diagram Types

enum DiagramType: String, Codable {
    case layeredStack       // Atmosphere, Snowpack Layers, Slab Physics
    case crossSection       // Mountain Waves, Valley Flying, Mountain Winds, Thermals
    case interactiveGauge   // Slope Angle, Lapse Rates, Companion Rescue
    case comparisonSplit    // Air Masses & Fronts, Cloud types
    case forceArrows        // Pressure Systems, Thermal Entry, Centering
    case triangle           // Avalanche Triangle, Thunderstorms
    case timeline           // Companion Rescue, Thunderstorm development
    case labeledScene       // Clouds, Reading the Sky, Terrain Traps
}

// MARK: - Diagram Configuration

struct DiagramLayer: Codable, Identifiable {
    let id: String
    let name: String
    let color: String           // Hex color
    let heightRatio: CGFloat    // Proportion of total height
    let description: String
}

struct DiagramArrow: Codable, Identifiable {
    var id: String { "\(fromX)-\(fromY)-\(toX)-\(toY)" }
    let fromX: CGFloat
    let fromY: CGFloat
    let toX: CGFloat
    let toY: CGFloat
    let label: String
    let color: String           // Hex color
}

struct DiagramSegment: Codable, Identifiable {
    let id: String
    let label: String
    let value: CGFloat
    let description: String
    let color: String           // Hex color
}

struct DiagramZone: Codable, Identifiable {
    let id: String
    let label: String
    let minValue: CGFloat
    let maxValue: CGFloat
    let color: String           // Hex color
    let description: String
}

struct DiagramVertex: Codable, Identifiable {
    let id: String
    let label: String
    let description: String
    let color: String           // Hex color
}

struct DiagramPoint: Codable {
    let x: CGFloat
    let y: CGFloat
}

struct DiagramConfig: Codable {
    // Layered stack
    var layers: [DiagramLayer]?

    // Arrows (force diagrams, cross sections)
    var arrows: [DiagramArrow]?

    // Gauge / slider
    var zones: [DiagramZone]?
    var minValue: CGFloat?
    var maxValue: CGFloat?
    var unit: String?
    var currentValue: CGFloat?

    // Triangle
    var vertices: [DiagramVertex]?
    var centerLabel: String?
    var centerDescription: String?

    // Timeline
    var segments: [DiagramSegment]?

    // Comparison split
    var leftTitle: String?
    var rightTitle: String?
    var leftColor: String?
    var rightColor: String?
    var leftItems: [String]?
    var rightItems: [String]?

    // Cross section
    var profilePoints: [DiagramPoint]?
    var overlayType: String?    // "waves", "wind", "clouds", "zones"

    // Labeled scene
    var sceneDescription: String?
    var hotspots: [RevealItem]?

    // General
    var labels: [String]?
    var colors: [String]?
    var highlightIndex: Int?
    var animationStyle: String? // "sequential", "spring", "fade"

    init(
        layers: [DiagramLayer]? = nil,
        arrows: [DiagramArrow]? = nil,
        zones: [DiagramZone]? = nil,
        minValue: CGFloat? = nil,
        maxValue: CGFloat? = nil,
        unit: String? = nil,
        currentValue: CGFloat? = nil,
        vertices: [DiagramVertex]? = nil,
        centerLabel: String? = nil,
        centerDescription: String? = nil,
        segments: [DiagramSegment]? = nil,
        leftTitle: String? = nil,
        rightTitle: String? = nil,
        leftColor: String? = nil,
        rightColor: String? = nil,
        leftItems: [String]? = nil,
        rightItems: [String]? = nil,
        profilePoints: [DiagramPoint]? = nil,
        overlayType: String? = nil,
        sceneDescription: String? = nil,
        hotspots: [RevealItem]? = nil,
        labels: [String]? = nil,
        colors: [String]? = nil,
        highlightIndex: Int? = nil,
        animationStyle: String? = nil
    ) {
        self.layers = layers
        self.arrows = arrows
        self.zones = zones
        self.minValue = minValue
        self.maxValue = maxValue
        self.unit = unit
        self.currentValue = currentValue
        self.vertices = vertices
        self.centerLabel = centerLabel
        self.centerDescription = centerDescription
        self.segments = segments
        self.leftTitle = leftTitle
        self.rightTitle = rightTitle
        self.leftColor = leftColor
        self.rightColor = rightColor
        self.leftItems = leftItems
        self.rightItems = rightItems
        self.profilePoints = profilePoints
        self.overlayType = overlayType
        self.sceneDescription = sceneDescription
        self.hotspots = hotspots
        self.labels = labels
        self.colors = colors
        self.highlightIndex = highlightIndex
        self.animationStyle = animationStyle
    }
}

// MARK: - Reveal Items (for tap-to-reveal on diagrams)

struct RevealItem: Codable, Identifiable {
    let id: String
    let label: String
    let detail: String
    let x: CGFloat
    let y: CGFloat
}

// MARK: - Map Configuration

struct MapPinData: Codable, Identifiable {
    let id: String
    let lat: Double
    let lon: Double
    let label: String
}

struct MapConfig: Codable {
    let centerLat: Double
    let centerLon: Double
    let spanLat: Double
    let spanLon: Double
    let pins: [MapPinData]?
}

// MARK: - Teaching Step

struct TeachingStep: Codable, Identifiable {
    let id: String
    let headline: String
    let body: String
    let diagramType: DiagramType
    let diagramConfig: DiagramConfig
    let interactionHint: String?
    let revealItems: [RevealItem]?
    let mapConfig: MapConfig?
    let animationName: String?

    init(
        id: String,
        headline: String,
        body: String,
        diagramType: DiagramType,
        diagramConfig: DiagramConfig,
        interactionHint: String? = nil,
        revealItems: [RevealItem]? = nil,
        mapConfig: MapConfig? = nil,
        animationName: String? = nil
    ) {
        self.id = id
        self.headline = headline
        self.body = body
        self.diagramType = diagramType
        self.diagramConfig = diagramConfig
        self.interactionHint = interactionHint
        self.revealItems = revealItems
        self.mapConfig = mapConfig
        self.animationName = animationName
    }
}

// MARK: - Concept Map Node

struct ConceptMapNode: Codable, Identifiable {
    let id: String
    let label: String
    let domain: DomainId
    let x: CGFloat
    let y: CGFloat
    let connections: [String]   // IDs of connected nodes
}

// MARK: - Lesson Container

struct Lesson: Codable, Identifiable {
    let id: String              // Same as module slug
    let domain: DomainId
    let teachingSteps: [TeachingStep]
    let practiceQuestions: [PracticeQuestion]
    let synthesisPrompt: String
    let conceptMapNodes: [ConceptMapNode]
}
