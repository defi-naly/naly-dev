import SwiftUI

// MARK: - Stats View

struct StatsView: View {
    @EnvironmentObject var store: KnowledgeStore
    @StateObject private var logStore = ActivityLogStore.shared

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Lifetime stats
                lifetimeStats
                    .padding(.horizontal)

                // Activity breakdown
                ActivityBreakdownCard()
                    .padding(.horizontal)

                // 3-Axis XP breakdown
                xpBreakdown
                    .padding(.horizontal)

                // Monthly trend
                MonthlyTrendCard()
                    .padding(.horizontal)
            }
            .padding(.vertical)
        }
        .background(Color.terminalBg)
    }

    // MARK: - Lifetime Stats

    private var lifetimeStats: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("LIFETIME")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 12) {
                bigStat(formatVert(totalVert), label: "Vertical", icon: "arrow.up")
                bigStat(String(format: "%.0f km", totalDistance), label: "Distance", icon: "point.topleft.down.to.point.bottomright.curvepath")
                bigStat(String(format: "%.0f h", totalHours), label: "Hours", icon: "clock")
                bigStat("\(logStore.records.count)", label: "Activities", icon: "figure.hiking")
                bigStat("\(reviewCount)", label: "Reviews", icon: "shield.checkered")
                bigStat("Lvl \(store.state.gamification.level)", label: "Level", icon: "star.fill")
            }
        }
    }

    // MARK: - XP Breakdown

    private var xpBreakdown: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("XP BREAKDOWN")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            let gam = store.state.gamification
            let total = max(gam.totalXP, 1)

            VStack(spacing: 10) {
                xpAxisRow("Preparation", xp: gam.preparationXP, total: total, color: Color.preparationXPColor, icon: "book.fill")
                xpAxisRow("Prowess", xp: gam.prowessXP, total: total, color: Color.prowessXPColor, icon: "figure.hiking")
                xpAxisRow("Safety", xp: gam.safetyXP, total: total, color: Color.safetyXPColor, icon: "shield.checkered")
            }

            HStack {
                Spacer()
                Text("Total: \(gam.totalXP) XP")
                    .font(.mono(14, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
            }
        }
        .terminalCard()
    }

    private func xpAxisRow(_ label: String, xp: Int, total: Int, color: Color, icon: String) -> some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 12))
                .foregroundStyle(color)
                .frame(width: 20)

            Text(label)
                .font(.mono(11))
                .foregroundStyle(Color.textMuted)
                .frame(width: 80, alignment: .leading)

            GeometryReader { geo in
                RoundedRectangle(cornerRadius: 3)
                    .fill(color.opacity(0.2))
                    .frame(width: geo.size.width)
                    .overlay(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 3)
                            .fill(color)
                            .frame(width: geo.size.width * (Double(xp) / Double(total)))
                    }
            }
            .frame(height: 12)

            Text("\(xp)")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 50, alignment: .trailing)
        }
    }

    // MARK: - Computed Properties

    private var totalVert: Double {
        logStore.records.reduce(0) { $0 + $1.elevationGain }
    }
    private var totalDistance: Double {
        logStore.records.reduce(0) { $0 + $1.distance }
    }
    private var totalHours: Double {
        logStore.records.reduce(0) { $0 + $1.duration } / 3600
    }
    private var reviewCount: Int {
        logStore.records.count - logStore.pendingReviews.count
    }

    // MARK: - Helpers

    private func formatVert(_ meters: Double) -> String {
        if meters >= 1000 {
            return String(format: "%.1fk m", meters / 1000)
        }
        return String(format: "%.0f m", meters)
    }

    private func bigStat(_ value: String, label: String, icon: String) -> some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 12))
                .foregroundStyle(Color.accent)
            Text(value)
                .font(.mono(16, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(9))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
        .terminalCard()
    }
}

// MARK: - Activity Breakdown Card (Public, reusable)

struct ActivityBreakdownCard: View {
    @StateObject private var logStore = ActivityLogStore.shared

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("ACTIVITIES BY TYPE")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            VStack(spacing: 8) {
                activityTypeRow(.paragliding)
                activityTypeRow(.skiTouring)
                activityTypeRow(.hiking)
                activityTypeRow(.climbing)
            }
        }
        .terminalCard()
    }

    private func activityTypeRow(_ activity: Activity) -> some View {
        let count = logStore.records.filter { $0.activityType == activity }.count
        let total = max(logStore.records.count, 1)
        let ratio = Double(count) / Double(total)

        return HStack(spacing: 10) {
            activity.iconImage
                .resizable()
                .scaledToFit()
                .frame(width: 14, height: 14)
                .foregroundStyle(activity.color)
                .frame(width: 24)

            Text(activity.displayName)
                .font(.mono(12))
                .foregroundStyle(Color.textPrimary)
                .lineLimit(1)
                .frame(width: 95, alignment: .leading)

            GeometryReader { geo in
                RoundedRectangle(cornerRadius: 3)
                    .fill(activity.color.opacity(0.3))
                    .frame(width: geo.size.width)
                    .overlay(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 3)
                            .fill(activity.color)
                            .frame(width: geo.size.width * ratio)
                    }
            }
            .frame(height: 12)

            Text("\(count)")
                .font(.mono(12, weight: .bold))
                .foregroundStyle(Color.textPrimary)
                .frame(width: 30, alignment: .trailing)
        }
    }
}

// MARK: - Monthly Trend Card (Public, reusable)

struct MonthlyTrendCard: View {
    @StateObject private var logStore = ActivityLogStore.shared

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("MONTHLY ACTIVITY")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            let months = last6Months()
            if months.isEmpty {
                Text("No activity data yet")
                    .font(.mono(12))
                    .foregroundStyle(Color.textDim)
            } else {
                let maxCount = max(months.map(\.count).max() ?? 1, 1)
                HStack(alignment: .bottom, spacing: 6) {
                    ForEach(months, id: \.label) { month in
                        VStack(spacing: 4) {
                            Text("\(month.count)")
                                .font(.mono(9))
                                .foregroundStyle(Color.textDim)
                            RoundedRectangle(cornerRadius: 3)
                                .fill(Color.accent)
                                .frame(height: CGFloat(month.count) / CGFloat(maxCount) * 60 + 4)
                            Text(month.label)
                                .font(.mono(9))
                                .foregroundStyle(Color.textMuted)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                .frame(height: 90)
            }
        }
        .terminalCard()
    }

    private struct MonthData {
        let label: String
        let count: Int
    }

    private func last6Months() -> [MonthData] {
        let calendar = Calendar.current
        let now = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM"

        var result: [MonthData] = []
        for i in (0..<6).reversed() {
            guard let date = calendar.date(byAdding: .month, value: -i, to: now) else { continue }
            let label = formatter.string(from: date)
            let components = calendar.dateComponents([.year, .month], from: date)
            let count = logStore.records.filter { record in
                let rc = calendar.dateComponents([.year, .month], from: record.date)
                return rc.year == components.year && rc.month == components.month
            }.count
            result.append(MonthData(label: label, count: count))
        }
        return result
    }
}
