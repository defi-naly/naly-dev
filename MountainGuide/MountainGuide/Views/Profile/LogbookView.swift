import SwiftUI

// MARK: - Logbook View

struct LogbookView: View {
    @StateObject private var logStore = ActivityLogStore.shared
    @State private var filter: ActivityFilter = .all
    @State private var selectedActivity: ActivityRecord?
    @State private var showReview = false
    @State private var reviewActivityId: UUID?
    @State private var reviewActivityType: Activity = .hiking

    enum ActivityFilter: String, CaseIterable {
        case all = "All"
        case flights = "Flights"
        case tours = "Tours"
        case hikes = "Hikes"
        case climbs = "Climbs"
    }

    private var filteredRecords: [ActivityRecord] {
        switch filter {
        case .all: return logStore.records
        case .flights: return logStore.records.filter { $0.activityType == .paragliding }
        case .tours: return logStore.records.filter { $0.activityType == .skiTouring }
        case .hikes: return logStore.records.filter { $0.activityType == .hiking }
        case .climbs: return logStore.records.filter { $0.activityType == .climbing }
        }
    }

    // Aggregate stats
    private var totalVert: Double {
        logStore.records.reduce(0) { $0 + $1.elevationGain }
    }
    private var totalDist: Double {
        logStore.records.reduce(0) { $0 + $1.distance }
    }
    private var totalHours: Double {
        logStore.records.reduce(0) { $0 + $1.duration } / 3600
    }

    var body: some View {
        if logStore.records.isEmpty {
            emptyState
        } else {
            ScrollView {
                VStack(spacing: 16) {
                    // Aggregate stats header
                    HStack(spacing: 12) {
                        miniStat(value: formatVert(totalVert), label: "Vertical", icon: "arrow.up")
                        miniStat(value: String(format: "%.0f km", totalDist), label: "Distance", icon: "point.topleft.down.to.point.bottomright.curvepath")
                        miniStat(value: String(format: "%.0f h", totalHours), label: "Hours", icon: "clock")
                    }
                    .padding(.horizontal)
                    .padding(.top, 8)

                    // Filter bar
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(ActivityFilter.allCases, id: \.self) { f in
                                Button {
                                    withAnimation { filter = f }
                                } label: {
                                    Text(f.rawValue)
                                        .font(.mono(12, weight: filter == f ? .bold : .regular))
                                        .foregroundStyle(filter == f ? .white : Color.textPrimary)
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 6)
                                        .background(filter == f ? Color.accent : Color.terminalBorder)
                                        .cornerRadius(8)
                                }
                            }
                        }
                        .padding(.horizontal)
                    }

                    // Merge suggestions
                    let suggestions = MergeEngine.detectMerges(activities: logStore.records)
                    if !suggestions.isEmpty {
                        ForEach(suggestions) { suggestion in
                            MergeSuggestionCard(
                                suggestion: suggestion,
                                onMerge: { /* TODO: implement merge action */ },
                                onDismiss: { /* TODO: dismiss suggestion */ }
                            )
                            .padding(.horizontal)
                        }
                    }

                    // Activity timeline
                    let grouped = groupByMonth(filteredRecords)
                    ForEach(grouped, id: \.month) { group in
                        VStack(alignment: .leading, spacing: 8) {
                            Text(group.month)
                                .font(.mono(11, weight: .bold))
                                .foregroundStyle(Color.textMuted)
                                .padding(.horizontal)

                            ForEach(group.records) { record in
                                NavigationLink {
                                    ActivityDetailView(activityId: record.id, record: record)
                                } label: {
                                    activityCard(record)
                                }
                            }
                        }
                    }
                }
                .padding(.bottom, 32)
            }
            .background(Color.terminalBg)
            .sheet(isPresented: $showReview) {
                if let id = reviewActivityId {
                    PostTripReviewView(
                        activityId: id,
                        activityType: reviewActivityType,
                        onComplete: {}
                    )
                }
            }
        }
    }

    // MARK: - Empty State

    private var emptyState: some View {
        VStack(spacing: 16) {
            Spacer()
            Image(systemName: "figure.hiking")
                .font(.system(size: 48))
                .foregroundStyle(Color.textTertiary)
            Text("Mountain History")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text("Your flights, tours, hikes, and climbs will appear here.\nConnect Apple Health or XContest to import activities.")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)
                .multilineTextAlignment(.center)
            Spacer()
        }
        .padding()
    }

    // MARK: - Activity Card

    private func activityCard(_ record: ActivityRecord) -> some View {
        HStack(spacing: 12) {
            record.activityType.iconImage
                .resizable()
                .scaledToFit()
                .frame(width: 18, height: 18)
                .foregroundStyle(record.activityType.color)
                .frame(width: 32)

            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(record.name)
                        .font(.mono(14, weight: .semibold))
                        .foregroundStyle(Color.textPrimary)

                    // Source badge
                    if record.source != .manual {
                        Image(systemName: record.source.icon)
                            .font(.system(size: 9))
                            .foregroundStyle(Color.textDim)
                    }
                }

                HStack(spacing: 8) {
                    Text(record.date, style: .date)
                        .font(.mono(11))
                        .foregroundStyle(Color.textMuted)

                    if record.elevationGain > 0 {
                        Text(formatVert(record.elevationGain))
                            .font(.mono(10))
                            .foregroundStyle(Color.textDim)
                    }
                }
            }

            Spacer()

            // Review status badge
            if ActivityLogStore.shared.pendingReviews.contains(record.id) {
                Button {
                    reviewActivityId = record.id
                    reviewActivityType = record.activityType
                    showReview = true
                } label: {
                    Text("Review")
                        .font(.mono(9, weight: .bold))
                        .foregroundStyle(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.warning)
                        .cornerRadius(6)
                }
            }

            Image(systemName: "chevron.right")
                .font(.system(size: 12))
                .foregroundStyle(Color.textDim)
        }
        .padding(.horizontal)
        .terminalCard()
    }

    // MARK: - Helpers

    private struct MonthGroup {
        let month: String
        let records: [ActivityRecord]
    }

    private func groupByMonth(_ records: [ActivityRecord]) -> [MonthGroup] {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM yyyy"

        let grouped = Dictionary(grouping: records) { record in
            formatter.string(from: record.date)
        }

        return grouped.map { MonthGroup(month: $0.key, records: $0.value) }
            .sorted { $0.records.first!.date > $1.records.first!.date }
    }

    private func formatVert(_ meters: Double) -> String {
        if meters >= 1000 {
            return String(format: "%.1fk m", meters / 1000)
        }
        return String(format: "%.0f m", meters)
    }

    private func miniStat(value: String, label: String, icon: String) -> some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 12))
                .foregroundStyle(Color.accent)
            Text(value)
                .font(.mono(14, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(9))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
        .terminalCard()
    }
}
