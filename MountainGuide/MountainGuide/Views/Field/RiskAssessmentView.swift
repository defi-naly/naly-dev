import SwiftUI

// MARK: - Risk Assessment View

struct RiskAssessmentView: View {
    let tour: TourRoute
    @StateObject private var bulletin = BulletinService.shared
    @Environment(\.dismiss) private var dismiss

    private var grmResult: GRMResult {
        calculateCombinedRisk()
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Overall risk banner
                    GRMResultBanner(result: grmResult)
                        .padding(.top, 8)

                    // Bulletin danger
                    InstrumentCard(title: "Bulletin Danger Level", icon: "exclamationmark.triangle.fill") {
                        if let selected = bulletin.selectedBulletin,
                           let maxRating = selected.dangerRatings?.max(by: { $0.numericLevel < $1.numericLevel }) {
                            HStack {
                                Text("\(maxRating.numericLevel)")
                                    .font(.mono(32, weight: .black))
                                    .foregroundStyle(maxRating.color)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(maxRating.displayName)
                                        .font(.mono(16, weight: .bold))
                                        .foregroundStyle(Color.textPrimary)
                                    if let sub = maxRating.customData?.CH?.subdivision {
                                        Text(sub)
                                            .font(.mono(11))
                                            .foregroundStyle(Color.textTertiary)
                                    }
                                }
                                Spacer()
                            }
                        } else {
                            HStack {
                                Image(systemName: "exclamationmark.circle")
                                    .foregroundStyle(Color.warning)
                                Text("No bulletin loaded — fetch bulletin first")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textSecondary)
                                Spacer()
                            }
                        }
                    }

                    // Route analysis
                    InstrumentCard(title: "Route Analysis", icon: "point.topleft.down.to.point.bottomright.curvepath") {
                        VStack(spacing: 10) {
                            if let slope = tour.maxSlopeEstimate {
                                HStack {
                                    Text("Max Slope Estimate")
                                        .font(.mono(12))
                                        .foregroundStyle(Color.textSecondary)
                                    Spacer()
                                    Text(String(format: "%.0f°", slope))
                                        .font(.mono(14, weight: .bold))
                                        .foregroundStyle(Color.slopeColor(for: slope))
                                }
                            }
                            if let aspect = tour.dominantAspect {
                                HStack {
                                    Text("Dominant Aspect")
                                        .font(.mono(12))
                                        .foregroundStyle(Color.textSecondary)
                                    Spacer()
                                    Text(aspect)
                                        .font(.mono(14, weight: .bold))
                                        .foregroundStyle(Color.textPrimary)
                                }
                            }
                            if let range = tour.elevationRange {
                                HStack {
                                    Text("Elevation Range")
                                        .font(.mono(12))
                                        .foregroundStyle(Color.textSecondary)
                                    Spacer()
                                    Text("\(Int(range.min))m – \(Int(range.max))m")
                                        .font(.mono(14, weight: .bold))
                                        .foregroundStyle(Color.textPrimary)
                                }
                            }
                            HStack {
                                Text("Distance")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textSecondary)
                                Spacer()
                                Text(formatDistance(tour.totalDistance))
                                    .font(.mono(14, weight: .bold))
                                    .foregroundStyle(Color.textPrimary)
                            }
                        }
                    }

                    // GRM assessment
                    InstrumentCard(title: "GRM Assessment", icon: "tablecells") {
                        VStack(alignment: .leading, spacing: 10) {
                            let dangerLevel = bulletin.maxDangerLevel
                            let slope = tour.maxSlopeEstimate ?? 30

                            HStack {
                                Text("Danger Level")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textSecondary)
                                Spacer()
                                Text("\(dangerLevel)")
                                    .font(.mono(14, weight: .bold))
                                    .foregroundStyle(Color.dangerColor(for: dangerLevel))
                            }

                            HStack {
                                Text("Route Slope")
                                    .font(.mono(12))
                                    .foregroundStyle(Color.textSecondary)
                                Spacer()
                                Text(String(format: "%.0f°", slope))
                                    .font(.mono(14, weight: .bold))
                                    .foregroundStyle(Color.slopeColor(for: slope))
                            }

                            Divider()

                            Text(grmResult.message)
                                .font(.mono(12))
                                .foregroundStyle(grmResult.color)

                            if let threshold = grmResult.threshold {
                                Text("GRM threshold: \(String(format: "%.0f°", threshold))")
                                    .font(.mono(10))
                                    .foregroundStyle(Color.textTertiary)
                            }
                        }
                    }

                    // Aspect overlap
                    if let selected = bulletin.selectedBulletin,
                       let problems = selected.avalancheProblems, !problems.isEmpty,
                       let routeAspect = tour.dominantAspect {
                        InstrumentCard(title: "Aspect Overlap", icon: "safari") {
                            VStack(alignment: .leading, spacing: 8) {
                                let problemAspects = Set(problems.flatMap { $0.aspects ?? [] })
                                let overlaps = problemAspects.contains(routeAspect)

                                HStack(spacing: 8) {
                                    Image(systemName: overlaps ? "exclamationmark.triangle.fill" : "checkmark.circle.fill")
                                        .foregroundStyle(overlaps ? Color.warning : Color.emerald)
                                    Text(overlaps
                                        ? "Route aspect (\(routeAspect)) matches bulletin problem aspects"
                                        : "Route aspect (\(routeAspect)) not in bulletin problem aspects")
                                        .font(.mono(12))
                                        .foregroundStyle(overlaps ? Color.warning : Color.emerald)
                                }

                                if !problemAspects.isEmpty {
                                    Text("Problem aspects: \(problemAspects.sorted().joined(separator: ", "))")
                                        .font(.mono(10))
                                        .foregroundStyle(Color.textTertiary)
                                }
                            }
                        }
                    }

                    SLFAttribution()
                }
                .padding()
            }
            .background(Color.terminalBg)
            .navigationTitle("Risk Assessment")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(.mono(14, weight: .semibold))
                        .foregroundStyle(Color.accent)
                }
            }
            .task {
                await bulletin.fetchBulletin()
            }
        }
    }

    // MARK: - Combined Risk Calculation

    private func calculateCombinedRisk() -> GRMResult {
        let dangerLevel = bulletin.maxDangerLevel
        let slope = tour.maxSlopeEstimate ?? 30

        guard dangerLevel > 0 else {
            return GRMResult(risk: .borderline, message: "No bulletin data — cannot assess risk fully", threshold: nil)
        }

        // GRM threshold lookup (unfavorable side — conservative)
        let thresholds: [Double] = [50, 35, 30, -1, -1] // Level 1-5 unfavorable
        let idx = min(max(dangerLevel - 1, 0), 4)
        let threshold = thresholds[idx]

        if threshold < 0 {
            return GRMResult(risk: .unacceptable, message: "Danger level \(dangerLevel) — avoid all avalanche terrain", threshold: nil)
        }

        if slope >= threshold {
            if slope < threshold + 3 {
                return GRMResult(risk: .borderline, message: "Route slope near GRM limit for danger level \(dangerLevel)", threshold: threshold)
            }
            return GRMResult(risk: .unacceptable, message: "Route slope exceeds safe threshold at danger level \(dangerLevel)", threshold: threshold)
        }

        return GRMResult(risk: .acceptable, message: "Route within acceptable risk for danger level \(dangerLevel)", threshold: threshold)
    }

    private func formatDistance(_ meters: Double) -> String {
        if meters >= 1000 {
            return String(format: "%.1f km", meters / 1000)
        }
        return String(format: "%.0f m", meters)
    }
}
