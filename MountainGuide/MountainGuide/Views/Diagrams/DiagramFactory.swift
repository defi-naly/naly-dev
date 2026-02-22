import SwiftUI

enum DiagramFactory {
    @ViewBuilder
    static func makeDiagram(type: DiagramType, config: DiagramConfig, stepIndex: Int) -> some View {
        switch type {
        case .layeredStack:
            LayeredStackDiagram(config: config, stepIndex: stepIndex)
        case .crossSection:
            CrossSectionDiagram(config: config, stepIndex: stepIndex)
        case .interactiveGauge:
            InteractiveGaugeDiagram(config: config, stepIndex: stepIndex)
        case .comparisonSplit:
            ComparisonSplitDiagram(config: config, stepIndex: stepIndex)
        case .forceArrows:
            ForceArrowDiagram(config: config, stepIndex: stepIndex)
        case .triangle:
            TriangleDiagram(config: config, stepIndex: stepIndex)
        case .timeline:
            TimelineDiagram(config: config, stepIndex: stepIndex)
        case .labeledScene:
            LabeledSceneDiagram(config: config, stepIndex: stepIndex)
        }
    }
}
