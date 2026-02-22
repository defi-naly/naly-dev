import SwiftUI

struct ExploreArticleView: View {
    let article: ExploreArticle

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Header
                VStack(alignment: .leading, spacing: 8) {
                    // Domain badge
                    HStack(spacing: 6) {
                        Image(systemName: article.domain.icon)
                            .font(.system(size: 12))
                        Text(article.domain.rawValue.capitalized)
                            .font(.mono(10, weight: .bold))
                    }
                    .foregroundStyle(article.domain.color)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(article.domain.color.opacity(0.1))
                    .cornerRadius(6)

                    // Title
                    Text(article.title)
                        .font(.mono(22, weight: .bold))
                        .foregroundStyle(Color.textPrimary)

                    // Summary
                    Text(article.summary)
                        .font(.mono(13))
                        .foregroundStyle(Color.textMuted)
                        .lineSpacing(2)
                }
                .padding(.horizontal)
                .padding(.top, 8)

                Divider()
                    .background(Color.terminalBorder)
                    .padding(.horizontal)

                // Sections
                ForEach(article.sections) { section in
                    sectionView(section)
                }

                // Related articles
                if !article.relatedArticles.isEmpty {
                    relatedArticlesSection
                }

                // Related modules link
                if !article.relatedModules.isEmpty {
                    relatedModulesSection
                }
            }
            .padding(.bottom, 32)
        }
        .background(Color.terminalBg)
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.dark, for: .navigationBar)
    }

    private func sectionView(_ section: ExploreSection) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            // Heading
            Text(section.heading)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            // Body text
            Text(section.body)
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
                .lineSpacing(3)
                .fixedSize(horizontal: false, vertical: true)

            // Optional diagram
            if let diagram = section.diagram {
                DiagramFactory.makeDiagram(
                    type: diagram.type,
                    config: diagram.config,
                    stepIndex: 0
                )
                .frame(height: 180)
                .cornerRadius(8)
                .padding(.vertical, 4)
            }

            // Key facts callout
            if let facts = section.keyFacts, !facts.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Text("KEY FACTS")
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(Color.amber)

                    ForEach(facts, id: \.self) { fact in
                        HStack(alignment: .top, spacing: 8) {
                            Circle()
                                .fill(Color.amber)
                                .frame(width: 4, height: 4)
                                .padding(.top, 6)
                            Text(fact)
                                .font(.mono(11))
                                .foregroundStyle(Color.textPrimary)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                }
                .padding(12)
                .background(Color.amber.opacity(0.05))
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.amber.opacity(0.2), lineWidth: 1)
                )
            }

            // Warning note
            if let warning = section.warningNote {
                HStack(alignment: .top, spacing: 8) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(Color.amber)
                        .font(.system(size: 14))
                        .padding(.top, 2)
                    Text(warning)
                        .font(.mono(11))
                        .foregroundStyle(Color.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(12)
                .background(Color.danger.opacity(0.05))
                .cornerRadius(8)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.danger.opacity(0.2), lineWidth: 1)
                )
            }
        }
        .padding(.horizontal)
    }

    private var relatedArticlesSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("RELATED ARTICLES")
                .font(.mono(10, weight: .bold))
                .foregroundStyle(Color.textDim)

            ForEach(article.relatedArticles, id: \.self) { articleId in
                if let related = ExploreContentData.getArticle(id: articleId) {
                    NavigationLink {
                        ExploreArticleView(article: related)
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: related.icon)
                                .font(.system(size: 12))
                                .foregroundStyle(related.domain.color)
                            Text(related.title)
                                .font(.mono(12, weight: .semibold))
                                .foregroundStyle(Color.textPrimary)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 10))
                                .foregroundStyle(Color.textDim)
                        }
                        .padding(10)
                        .background(Color.terminalSurface)
                        .cornerRadius(8)
                    }
                }
            }
        }
        .padding(.horizontal)
    }

    private var relatedModulesSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("LEARN MORE")
                .font(.mono(10, weight: .bold))
                .foregroundStyle(Color.textDim)

            ForEach(article.relatedModules, id: \.self) { slug in
                if let mod = DomainContent.getModule(domainId: article.domain, slug: slug) {
                    HStack(spacing: 8) {
                        Image(systemName: "book.fill")
                            .font(.system(size: 12))
                            .foregroundStyle(Color.amber)
                        Text("Go to Lesson: \(mod.title)")
                            .font(.mono(12, weight: .semibold))
                            .foregroundStyle(Color.amber)
                        Spacer()
                        Image(systemName: "arrow.right")
                            .font(.system(size: 10))
                            .foregroundStyle(Color.amber)
                    }
                    .padding(10)
                    .background(Color.amber.opacity(0.05))
                    .cornerRadius(8)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color.amber.opacity(0.2), lineWidth: 1)
                    )
                }
            }
        }
        .padding(.horizontal)
    }
}
