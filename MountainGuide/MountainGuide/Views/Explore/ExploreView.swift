import SwiftUI

struct ExploreView: View {
    @State private var searchText = ""
    @State private var expandedDomain: DomainId?

    private var domains: [Domain] {
        DomainContent.allDomains
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Search bar
                    HStack(spacing: 8) {
                        Image(systemName: "magnifyingglass")
                            .foregroundStyle(Color.textDim)
                        TextField("Search articles...", text: $searchText)
                            .font(.mono(14))
                            .foregroundStyle(Color.textPrimary)
                    }
                    .padding(12)
                    .background(Color.terminalSurface)
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.terminalBorder, lineWidth: 1)
                    )
                    .padding(.horizontal)

                    if searchText.isEmpty {
                        // Domain sections
                        ForEach(domains) { domain in
                            domainSection(domain)
                        }
                    } else {
                        // Search results
                        ExploreSearchResultsView(query: searchText)
                    }
                }
                .padding(.bottom, 32)
            }
            .background(Color.terminalBg)
            .navigationTitle("Explore")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func domainSection(_ domain: Domain) -> some View {
        let articles = ExploreContentData.getArticles(domain: domain.id)
        let isExpanded = expandedDomain == domain.id

        return VStack(alignment: .leading, spacing: 8) {
            // Domain header
            Button {
                withAnimation(.spring(response: 0.3)) {
                    expandedDomain = isExpanded ? nil : domain.id
                }
            } label: {
                HStack(spacing: 12) {
                    Image(systemName: domain.id.icon)
                        .font(.system(size: 20))
                        .foregroundStyle(domain.id.color)
                        .frame(width: 32)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(domain.name)
                            .font(.mono(16, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        Text("\(articles.count) articles")
                            .font(.mono(11))
                            .foregroundStyle(Color.textMuted)
                    }

                    Spacer()

                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundStyle(Color.textDim)
                }
                .padding(14)
                .background(Color.terminalSurface)
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.terminalBorder, lineWidth: 1)
                )
            }

            // Article list (expandable)
            if isExpanded {
                VStack(spacing: 4) {
                    ForEach(articles) { article in
                        NavigationLink {
                            ExploreArticleView(article: article)
                        } label: {
                            articleRow(article, domainColor: domain.id.color)
                        }
                    }
                }
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .padding(.horizontal)
    }

    private func articleRow(_ article: ExploreArticle, domainColor: Color) -> some View {
        HStack(spacing: 10) {
            Image(systemName: article.icon)
                .font(.system(size: 14))
                .foregroundStyle(domainColor)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 2) {
                Text(article.title)
                    .font(.mono(13, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                    .lineLimit(1)
                Text(article.summary)
                    .font(.mono(10))
                    .foregroundStyle(Color.textMuted)
                    .lineLimit(2)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.system(size: 10))
                .foregroundStyle(Color.textDim)
        }
        .padding(10)
        .background(Color.terminalBg)
        .cornerRadius(8)
    }
}

// MARK: - Search Results

struct ExploreSearchResultsView: View {
    let query: String

    private var results: [(DomainId, [ExploreArticle])] {
        let q = query.lowercased()
        var grouped: [(DomainId, [ExploreArticle])] = []

        for domain in DomainContent.allDomains {
            let articles = ExploreContentData.getArticles(domain: domain.id)
            let matches = articles.filter {
                $0.title.lowercased().contains(q) ||
                $0.summary.lowercased().contains(q)
            }
            if !matches.isEmpty {
                grouped.append((domain.id, matches))
            }
        }
        return grouped
    }

    var body: some View {
        if results.isEmpty {
            VStack(spacing: 8) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 24))
                    .foregroundStyle(Color.textDim)
                Text("No articles found")
                    .font(.mono(14))
                    .foregroundStyle(Color.textMuted)
            }
            .padding(.top, 40)
        } else {
            VStack(alignment: .leading, spacing: 16) {
                ForEach(results, id: \.0) { domainId, articles in
                    VStack(alignment: .leading, spacing: 6) {
                        Text(domainId.rawValue.uppercased())
                            .font(.mono(10, weight: .bold))
                            .foregroundStyle(domainId.color)
                            .padding(.horizontal)

                        ForEach(articles) { article in
                            NavigationLink {
                                ExploreArticleView(article: article)
                            } label: {
                                HStack(spacing: 10) {
                                    Image(systemName: article.icon)
                                        .font(.system(size: 14))
                                        .foregroundStyle(domainId.color)
                                        .frame(width: 24)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(article.title)
                                            .font(.mono(13, weight: .semibold))
                                            .foregroundStyle(Color.textPrimary)
                                        Text(article.summary)
                                            .font(.mono(10))
                                            .foregroundStyle(Color.textMuted)
                                            .lineLimit(2)
                                    }
                                    Spacer()
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 10))
                                        .foregroundStyle(Color.textDim)
                                }
                                .padding(10)
                            }
                        }
                    }
                }
            }
            .padding(.horizontal)
        }
    }
}
