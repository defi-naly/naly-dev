import Foundation

enum ExploreContentData {

    static func getArticles(domain: DomainId) -> [ExploreArticle] {
        switch domain {
        case .weather:
            return WeatherExplore.articles
        case .avalanche:
            return AvalancheExplore.articles
        case .flying:
            return FlyingExplore.articles
        case .navigation:
            return NavigationExplore.articles
        case .ropeSystems:
            return RopeSystemsExplore.articles
        case .glacierTravel:
            return GlacierTravelExplore.articles
        case .firstAid:
            return FirstAidExplore.articles
        }
    }

    static func getArticle(id: String) -> ExploreArticle? {
        for domain in DomainId.allCases {
            if let article = getArticles(domain: domain).first(where: { $0.id == id }) {
                return article
            }
        }
        return nil
    }

    static var allArticles: [ExploreArticle] {
        DomainId.allCases.flatMap { getArticles(domain: $0) }
    }
}
