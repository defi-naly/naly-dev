import SwiftUI

// MARK: - Danger Level Banner

struct DangerLevelBanner: View {
    let bulletin: Bulletin

    private var maxRating: DangerRating? {
        bulletin.dangerRatings?.max(by: { $0.numericLevel < $1.numericLevel })
    }

    var body: some View {
        let level = maxRating?.numericLevel ?? 0
        let color = Color.dangerColor(for: level)

        VStack(spacing: 12) {
            Text("\(level)")
                .font(.system(size: 56, weight: .black, design: .monospaced))
                .foregroundStyle(color)

            Text(maxRating?.displayName ?? "No Rating")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(color)

            if let validTime = bulletin.validTime {
                let formatter = ISO8601DateFormatter()
                let start = validTime.startTime.flatMap { formatter.date(from: $0) }
                let timeFormatter = DateFormatter()
                let _ = timeFormatter.dateFormat = "d MMM yyyy"
                if let date = start {
                    Text("Valid: \(timeFormatter.string(from: date))")
                        .font(.mono(11))
                        .foregroundStyle(Color.textTertiary)
                }
            }

            // Show sub-ratings by elevation if available
            if let ratings = bulletin.dangerRatings, ratings.count > 1 {
                Divider()
                VStack(spacing: 6) {
                    ForEach(ratings) { rating in
                        ElevationBandView(rating: rating)
                    }
                }
            }
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(color.opacity(0.08))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(color.opacity(0.3), lineWidth: 1)
        )
    }
}

// MARK: - Avalanche Problem Card

struct AvalancheProblemCard: View {
    let problem: AvalancheProblem
    let dangerLevel: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack(spacing: 10) {
                Image(systemName: problem.icon)
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(Color.dangerColor(for: dangerLevel))
                Text(problem.displayName)
                    .font(.mono(14, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Spacer()
                if let period = problem.validTimePeriod {
                    Text(period == "earlier" ? "AM" : "PM")
                        .font(.mono(10, weight: .bold))
                        .foregroundStyle(Color.textTertiary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Color.lightBorder)
                        .cornerRadius(4)
                }
            }

            // Aspect rose + elevation inline
            HStack(spacing: 16) {
                if let aspects = problem.aspects, !aspects.isEmpty {
                    BulletinAspectRose(
                        highlightedAspects: Set(aspects),
                        dangerLevel: dangerLevel
                    )
                    .frame(width: 80, height: 80)
                }

                VStack(alignment: .leading, spacing: 6) {
                    if let elev = problem.elevation {
                        if let lower = elev.lowerBound, !lower.isEmpty {
                            HStack(spacing: 4) {
                                Image(systemName: "arrow.up")
                                    .font(.system(size: 10))
                                Text("Above \(lower) m")
                                    .font(.mono(11))
                            }
                            .foregroundStyle(Color.textSecondary)
                        }
                        if let upper = elev.upperBound, !upper.isEmpty {
                            HStack(spacing: 4) {
                                Image(systemName: "arrow.down")
                                    .font(.system(size: 10))
                                Text("Below \(upper) m")
                                    .font(.mono(11))
                            }
                            .foregroundStyle(Color.textSecondary)
                        }
                    }
                    if let aspects = problem.aspects, !aspects.isEmpty {
                        Text(aspects.joined(separator: ", "))
                            .font(.mono(10))
                            .foregroundStyle(Color.textTertiary)
                    }
                }

                Spacer()
            }

            // Comment
            if let comment = problem.comment, !comment.isEmpty {
                Text(comment.strippingHTML)
                    .font(.mono(11))
                    .foregroundStyle(Color.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}

// MARK: - Bulletin Aspect Rose (Read-Only)

struct BulletinAspectRose: View {
    let highlightedAspects: Set<String>
    let dangerLevel: Int

    private let aspects = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height / 2)
            let radius = min(size.width, size.height) / 2 - 2

            // Background circle
            context.stroke(
                Path(ellipseIn: CGRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2)),
                with: .color(Color.lightBorder),
                lineWidth: 1
            )

            // Draw sectors
            let sectorAngle = 360.0 / Double(aspects.count)
            let dangerColor = Color.dangerColor(for: dangerLevel)

            for (i, aspect) in aspects.enumerated() {
                let startAngle = Double(i) * sectorAngle - 90 - sectorAngle / 2
                let endAngle = startAngle + sectorAngle
                let isHighlighted = highlightedAspects.contains(aspect)

                if isHighlighted {
                    var path = Path()
                    path.move(to: center)
                    path.addArc(center: center, radius: radius, startAngle: .degrees(startAngle), endAngle: .degrees(endAngle), clockwise: false)
                    path.closeSubpath()
                    context.fill(path, with: .color(dangerColor.opacity(0.35)))
                    context.stroke(path, with: .color(dangerColor.opacity(0.6)), lineWidth: 1)
                }
            }

            // N indicator
            let nY = center.y - radius - 1
            context.draw(Text("N").font(.system(size: 7, weight: .bold)).foregroundColor(.textTertiary), at: CGPoint(x: center.x, y: max(nY, 5)))
        }
    }
}

// MARK: - Elevation Band View

struct ElevationBandView: View {
    let rating: DangerRating

    var body: some View {
        HStack(spacing: 8) {
            // Level indicator
            Circle()
                .fill(rating.color)
                .frame(width: 10, height: 10)

            Text("\(rating.numericLevel)")
                .font(.mono(14, weight: .bold))
                .foregroundStyle(rating.color)

            Text(rating.displayName)
                .font(.mono(11))
                .foregroundStyle(Color.textSecondary)

            Spacer()

            // Elevation info
            if let elev = rating.elevation {
                if let lower = elev.lowerBound, !lower.isEmpty {
                    Text("> \(lower)m")
                        .font(.mono(10, weight: .semibold))
                        .foregroundStyle(Color.textTertiary)
                }
                if let upper = elev.upperBound, !upper.isEmpty {
                    Text("< \(upper)m")
                        .font(.mono(10, weight: .semibold))
                        .foregroundStyle(Color.textTertiary)
                }
            }

            if let period = rating.validTimePeriod {
                Text(period == "earlier" ? "AM" : "PM")
                    .font(.mono(9, weight: .bold))
                    .foregroundStyle(Color.textTertiary)
            }
        }
    }
}

// MARK: - Region Selector

struct RegionSelector: View {
    let regions: [BulletinRegion]
    let selectedID: String?
    let onSelect: (String) -> Void

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(regions) { region in
                    let isSelected = region.regionID == selectedID
                    Button {
                        onSelect(region.regionID)
                    } label: {
                        Text(region.name ?? region.regionID)
                            .font(.mono(11, weight: isSelected ? .bold : .medium))
                            .foregroundStyle(isSelected ? .white : Color.textSecondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(isSelected ? Color.accent : Color.lightSurface)
                            .cornerRadius(16)
                            .shadow(color: .black.opacity(0.04), radius: 1, x: 0, y: 1)
                    }
                }
            }
        }
    }
}

// MARK: - SLF Attribution

struct SLFAttribution: View {
    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: "info.circle")
                .font(.system(size: 10))
            Text("Data: WSL/SLF Avalanche Bulletin \u{00A9} CC BY 4.0")
                .font(.system(size: 10))
        }
        .foregroundStyle(Color.textTertiary)
        .padding(.top, 4)
    }
}
