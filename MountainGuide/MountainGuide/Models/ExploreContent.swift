import Foundation

// MARK: - Explore Content Model

struct ExploreArticle: Identifiable {
    let id: String
    let domain: DomainId
    let title: String
    let summary: String
    let icon: String
    let sections: [ExploreSection]
    let relatedArticles: [String]
    let relatedModules: [String]
}

struct ExploreSection: Identifiable {
    let id: String
    let heading: String
    let body: String
    let diagram: ExploreDiagram?
    let keyFacts: [String]?
    let warningNote: String?
}

struct ExploreDiagram {
    let type: DiagramType
    let config: DiagramConfig
}
