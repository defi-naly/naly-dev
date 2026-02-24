import SwiftUI

// MARK: - Avalanche Bulletin View

struct BulletinView: View {
    @StateObject private var bulletin = BulletinService.shared
    @EnvironmentObject var store: KnowledgeStore

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                if bulletin.isLoading && bulletin.bulletins.isEmpty {
                    ProgressView("Loading avalanche bulletin...")
                        .padding(.top, 40)
                } else if let error = bulletin.error, bulletin.bulletins.isEmpty {
                    NoDataCard(message: error)
                } else if let selected = bulletin.selectedBulletin {
                    // Danger level hero
                    DangerLevelBanner(bulletin: selected)

                    // Region selector
                    if bulletin.allRegions.count > 1 {
                        RegionSelector(
                            regions: bulletin.allRegions,
                            selectedID: selected.regions?.first?.regionID,
                            onSelect: { bulletin.selectRegion($0) }
                        )
                    }

                    // Avalanche problems
                    if let problems = selected.avalancheProblems, !problems.isEmpty {
                        InstrumentCard(title: "Avalanche Problems", icon: "exclamationmark.triangle.fill") {
                            VStack(spacing: 16) {
                                ForEach(problems) { problem in
                                    AvalancheProblemCard(problem: problem, dangerLevel: bulletin.maxDangerLevel)
                                    if problem.id != problems.last?.id {
                                        Divider()
                                    }
                                }
                            }
                        }
                    }

                    // Weather forecast
                    if let weather = selected.weatherForecast?.comment, !weather.isEmpty {
                        InstrumentCard(title: "Weather Forecast", icon: "cloud.sun.fill") {
                            Text(weather.strippingHTML)
                                .font(.mono(12))
                                .foregroundStyle(Color.textSecondary)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }

                    // Snowpack structure
                    if let snowpack = selected.snowpackStructure?.comment, !snowpack.isEmpty {
                        InstrumentCard(title: "Snowpack Structure", icon: "square.3.layers.3d") {
                            Text(snowpack.strippingHTML)
                                .font(.mono(12))
                                .foregroundStyle(Color.textSecondary)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }

                    // Tendency
                    if let tendencies = selected.tendency, !tendencies.isEmpty {
                        InstrumentCard(title: "Tendency", icon: "arrow.right") {
                            VStack(alignment: .leading, spacing: 8) {
                                ForEach(tendencies.indices, id: \.self) { i in
                                    let t = tendencies[i]
                                    HStack(spacing: 8) {
                                        Image(systemName: tendencyIcon(t.tendencyType))
                                            .foregroundStyle(Color.accent)
                                        Text(t.tendencyType?.replacingOccurrences(of: "_", with: " ").capitalized ?? "Unknown")
                                            .font(.mono(13, weight: .semibold))
                                            .foregroundStyle(Color.textPrimary)
                                    }
                                    if let comment = t.comment, !comment.isEmpty {
                                        Text(comment.strippingHTML)
                                            .font(.mono(11))
                                            .foregroundStyle(Color.textSecondary)
                                    }
                                }
                            }
                        }
                    }

                    // Attribution
                    SLFAttribution()

                } else {
                    NoDataCard(message: "No bulletin data available")
                }
            }
            .padding()
        }
        .background(Color.terminalBg)
        .navigationTitle("Avalanche Bulletin")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await bulletin.fetchBulletin()
            // Award Preparation XP once per day for checking bulletin
            let key = "lastBulletinXP"
            let today = Calendar.current.startOfDay(for: Date())
            let lastDate = UserDefaults.standard.object(forKey: key) as? Date ?? .distantPast
            if lastDate < today {
                store.addXP(XPReward.bulletinCheckedXP, axis: .preparation, domain: .avalanche)
                UserDefaults.standard.set(today, forKey: key)
            }
        }
        .refreshable {
            bulletin.invalidateCache()
            await bulletin.fetchBulletin()
        }
    }

    private func tendencyIcon(_ type: String?) -> String {
        switch type?.lowercased() {
        case "increasing": return "arrow.up.right"
        case "decreasing": return "arrow.down.right"
        case "steady": return "arrow.right"
        default: return "arrow.right"
        }
    }
}
