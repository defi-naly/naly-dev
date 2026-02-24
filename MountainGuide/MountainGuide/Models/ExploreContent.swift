import Foundation

// MARK: - Explore Content Model

struct ExploreArticle: Identifiable {
    let id: String
    let domain: DomainId
    let title: String
    let summary: String
    let icon: String
    let heroImageName: String?
    let heroImageCaption: String?
    let sections: [ExploreSection]
    let relatedArticles: [String]
    let relatedModules: [String]

    init(
        id: String,
        domain: DomainId,
        title: String,
        summary: String,
        icon: String,
        heroImageName: String? = nil,
        heroImageCaption: String? = nil,
        sections: [ExploreSection],
        relatedArticles: [String] = [],
        relatedModules: [String] = []
    ) {
        self.id = id
        self.domain = domain
        self.title = title
        self.summary = summary
        self.icon = icon
        self.heroImageName = heroImageName
        self.heroImageCaption = heroImageCaption
        self.sections = sections
        self.relatedArticles = relatedArticles
        self.relatedModules = relatedModules
    }
}

struct ExploreSection: Identifiable {
    let id: String
    let heading: String
    let body: String
    let imageName: String?
    let imageCaption: String?
    let animationName: String?
    let diagram: ExploreDiagram?
    let keyFacts: [String]?
    let warningNote: String?

    init(
        id: String,
        heading: String,
        body: String,
        imageName: String? = nil,
        imageCaption: String? = nil,
        animationName: String? = nil,
        diagram: ExploreDiagram? = nil,
        keyFacts: [String]? = nil,
        warningNote: String? = nil
    ) {
        self.id = id
        self.heading = heading
        self.body = body
        self.imageName = imageName
        self.imageCaption = imageCaption
        self.animationName = animationName
        self.diagram = diagram
        self.keyFacts = keyFacts
        self.warningNote = warningNote
    }
}

struct ExploreDiagram {
    let type: DiagramType
    let config: DiagramConfig
}
