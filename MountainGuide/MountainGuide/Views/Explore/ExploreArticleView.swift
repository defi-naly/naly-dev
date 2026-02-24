import SwiftUI

struct ExploreArticleView: View {
    let article: ExploreArticle

    @State private var sectionsAppeared: Set<Int> = []

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Hero image
                heroImageView

                // Header (below hero when no image, overlaid when hero exists)
                if article.heroImageName == nil {
                    headerView
                        .padding(.horizontal)
                        .padding(.top, 8)
                }

                Divider()
                    .background(Color.terminalBorder)
                    .padding(.horizontal)
                    .padding(.top, article.heroImageName != nil ? 16 : 12)

                // Sections with staggered reveal
                ForEach(Array(article.sections.enumerated()), id: \.element.id) { index, section in
                    sectionView(section)
                        .opacity(sectionsAppeared.contains(index) ? 1 : 0)
                        .offset(y: sectionsAppeared.contains(index) ? 0 : 20)
                        .animation(.spring(response: 0.5).delay(Double(index) * 0.08), value: sectionsAppeared.contains(index))
                        .onAppear {
                            sectionsAppeared.insert(index)
                        }
                        .padding(.top, 20)
                }

                // Related articles
                if !article.relatedArticles.isEmpty {
                    relatedArticlesSection
                        .padding(.top, 20)
                }

                // Related modules link
                if !article.relatedModules.isEmpty {
                    relatedModulesSection
                        .padding(.top, 20)
                }
            }
            .padding(.bottom, 32)
        }
        .background(Color.terminalBg)
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - Hero Image

    @ViewBuilder
    private var heroImageView: some View {
        if let heroImageName = article.heroImageName {
            if UIImage(named: heroImageName) != nil {
                ZStack(alignment: .bottomLeading) {
                    Image(heroImageName)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(height: 260)
                        .clipped()

                    // Gradient scrim
                    LinearGradient(
                        colors: [Color.black.opacity(0.6), Color.black.opacity(0.0)],
                        startPoint: .bottom,
                        endPoint: .top
                    )
                    .frame(height: 140)

                    // Title overlay
                    VStack(alignment: .leading, spacing: 8) {
                        domainBadge(light: true)
                        Text(article.title)
                            .font(.mono(22, weight: .bold))
                            .foregroundStyle(.white)
                        Text(article.summary)
                            .font(.mono(12))
                            .foregroundStyle(.white.opacity(0.85))
                            .lineSpacing(2)
                    }
                    .padding(16)
                }
                .frame(height: 260)
                .clipped()
                .clipShape(
                    UnevenRoundedRectangle(
                        bottomLeadingRadius: 12,
                        bottomTrailingRadius: 12
                    )
                )
            } else {
                // Hero illustration fallback
                ZStack(alignment: .bottomLeading) {
                    IllustrationView(imageName: heroImageName, domain: article.domain, height: 200)

                    // Gradient scrim for text readability
                    LinearGradient(
                        colors: [Color.black.opacity(0.4), Color.black.opacity(0.0)],
                        startPoint: .bottom,
                        endPoint: .top
                    )
                    .frame(height: 100)

                    VStack(alignment: .leading, spacing: 8) {
                        domainBadge(light: true)
                        Text(article.title)
                            .font(.mono(22, weight: .bold))
                            .foregroundStyle(.white)
                        Text(article.summary)
                            .font(.mono(12))
                            .foregroundStyle(.white.opacity(0.85))
                            .lineSpacing(2)
                    }
                    .padding(16)
                }
            }
        } else {
            // No hero image — show standard header
            headerView
                .padding(.horizontal)
                .padding(.top, 8)
        }
    }

    private var headerView: some View {
        VStack(alignment: .leading, spacing: 8) {
            domainBadge(light: false)
            Text(article.title)
                .font(.mono(22, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(article.summary)
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
                .lineSpacing(2)
        }
    }

    private func domainBadge(light: Bool) -> some View {
        HStack(spacing: 6) {
            Image(systemName: article.domain.icon)
                .font(.system(size: 12))
            Text(article.domain.rawValue.capitalized)
                .font(.mono(10, weight: .bold))
        }
        .foregroundStyle(light ? .white : article.domain.color)
        .padding(.horizontal, 10)
        .padding(.vertical, 4)
        .background(light ? Color.white.opacity(0.2) : article.domain.color.opacity(0.1))
        .cornerRadius(6)
    }

    // MARK: - Section View

    private func sectionView(_ section: ExploreSection) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            // Heading
            Text(section.heading)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            // Animation (highest priority)
            if let animName = section.animationName {
                RiveAnimationView(animationName: animName)
                    .frame(height: 240)
                    .cornerRadius(12)
                    .padding(.vertical, 4)
            }

            // Photo (with graceful fallback)
            if let imageName = section.imageName {
                if UIImage(named: imageName) != nil {
                    VStack(alignment: .leading, spacing: 4) {
                        Image(imageName)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(height: 200)
                            .clipped()
                            .cornerRadius(8)
                        if let caption = section.imageCaption {
                            Text(caption)
                                .font(.system(size: 11))
                                .foregroundStyle(Color.textTertiary)
                        }
                    }
                } else {
                    VStack(alignment: .leading, spacing: 4) {
                        IllustrationView(imageName: imageName, domain: article.domain, height: 160)
                            .cornerRadius(8)
                        if let caption = section.imageCaption {
                            Text(caption)
                                .font(.system(size: 11))
                                .foregroundStyle(Color.textTertiary)
                        }
                    }
                }
            }

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

    // MARK: - Related Sections

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
