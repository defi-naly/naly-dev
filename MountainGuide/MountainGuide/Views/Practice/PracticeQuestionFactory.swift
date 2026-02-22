import SwiftUI

enum PracticeQuestionFactory {
    @ViewBuilder
    static func makeQuestion(_ question: PracticeQuestion, onAnswer: @escaping (Bool) -> Void) -> some View {
        switch question.type {
        case .multipleChoice:
            MCQView(question: question, onAnswer: onAnswer)
        case .sequenceOrder:
            SequenceOrderView(question: question, onAnswer: onAnswer)
        case .labelDiagram:
            LabelDiagramView(question: question, onAnswer: onAnswer)
        case .trueFalseReasoning:
            TrueFalseView(question: question, onAnswer: onAnswer)
        case .calculation:
            CalculationView(question: question, onAnswer: onAnswer)
        case .hotspot:
            HotspotView(question: question, onAnswer: onAnswer)
        case .matchPairs:
            MatchPairsView(question: question, onAnswer: onAnswer)
        }
    }
}
