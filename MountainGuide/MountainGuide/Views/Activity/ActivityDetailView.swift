import SwiftUI
import MapKit

// MARK: - Activity Detail View

struct ActivityDetailView: View {
    let activityId: UUID
    let record: ActivityRecord

    @EnvironmentObject var store: KnowledgeStore
    @State private var trackPoints: [TrackPoint]?
    @State private var review: PostTripReview?
    @State private var showReview = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack(spacing: 12) {
                    record.activityType.iconImage
                        .resizable()
                        .scaledToFit()
                        .frame(width: 28, height: 28)
                        .foregroundStyle(record.activityType.color)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(record.name)
                            .font(.mono(20, weight: .bold))
                            .foregroundStyle(Color.textPrimary)
                        HStack(spacing: 6) {
                            Text(record.date, style: .date)
                                .font(.mono(12))
                                .foregroundStyle(Color.textMuted)
                            if record.source != .manual {
                                HStack(spacing: 3) {
                                    Image(systemName: record.source.icon)
                                        .font(.system(size: 9))
                                    Text(record.source.displayName)
                                        .font(.mono(9))
                                }
                                .foregroundStyle(Color.textDim)
                            }
                        }
                    }
                    Spacer()
                }
                .padding(.horizontal)

                // Map with track
                if let points = trackPoints, !points.isEmpty {
                    TrackMapView(trackPoints: points)
                        .frame(height: 220)
                        .cornerRadius(12)
                        .padding(.horizontal)
                }

                // Stats grid
                statsGrid
                    .padding(.horizontal)

                // Heart rate zones (if available)
                if let hrZones = heartRateZones {
                    heartRateCard(hrZones)
                        .padding(.horizontal)
                }

                // Post-Trip Review section
                reviewSection
                    .padding(.horizontal)
            }
            .padding(.vertical)
        }
        .background(Color.terminalBg)
        .navigationTitle(record.activityType.displayName)
        .navigationBarTitleDisplayMode(.inline)
        .task {
            trackPoints = await ActivityFileStore.shared.loadTrackPoints(id: activityId)
            review = await ActivityFileStore.shared.loadReview(activityId: activityId)
        }
        .sheet(isPresented: $showReview) {
            PostTripReviewView(
                activityId: activityId,
                activityType: record.activityType,
                onComplete: {
                    Task {
                        review = await ActivityFileStore.shared.loadReview(activityId: activityId)
                    }
                }
            )
            .environmentObject(store)
        }
    }

    // MARK: - Stats Grid

    private var statsGrid: some View {
        LazyVGrid(columns: [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ], spacing: 12) {
            statItem("Duration", value: formatDuration(record.duration), icon: "clock")
            statItem("Elevation", value: String(format: "%.0f m", record.elevationGain), icon: "arrow.up")
            statItem("Distance", value: String(format: "%.1f km", record.distance), icon: "point.topleft.down.to.point.bottomright.curvepath")

            if case .flight(let f) = record {
                statItem("Max Alt", value: String(format: "%.0f m", f.maxAltitude), icon: "arrow.up.to.line")
                statItem("XC Dist", value: String(format: "%.1f km", f.xcDistance), icon: "arrow.right")
                if let score = f.xcScore {
                    statItem("Score", value: String(format: "%.1f", score), icon: "star")
                }
            }
        }
    }

    private func statItem(_ label: String, value: String, icon: String) -> some View {
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

    // MARK: - Heart Rate

    private var heartRateZones: HeartRateZones? {
        switch record {
        case .tour(let t): return t.heartRateZones
        case .hike(let h): return h.heartRateZones
        case .climb(let c): return c.heartRateZones
        default: return nil
        }
    }

    private func heartRateCard(_ zones: HeartRateZones) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("HEART RATE")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            HStack(spacing: 16) {
                VStack(spacing: 2) {
                    Text("\(zones.averageHR)")
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.danger)
                    Text("Avg BPM")
                        .font(.mono(9))
                        .foregroundStyle(Color.textMuted)
                }
                VStack(spacing: 2) {
                    Text("\(zones.maxHR)")
                        .font(.mono(20, weight: .bold))
                        .foregroundStyle(Color.danger)
                    Text("Max BPM")
                        .font(.mono(9))
                        .foregroundStyle(Color.textMuted)
                }
            }

            // Zone bars
            HStack(spacing: 2) {
                zoneBar("Z1", minutes: zones.zone1Minutes, color: Color(hex: "94A3B8"))
                zoneBar("Z2", minutes: zones.zone2Minutes, color: Color(hex: "3B82F6"))
                zoneBar("Z3", minutes: zones.zone3Minutes, color: Color(hex: "22C55E"))
                zoneBar("Z4", minutes: zones.zone4Minutes, color: Color(hex: "F59E0B"))
                zoneBar("Z5", minutes: zones.zone5Minutes, color: Color(hex: "EF4444"))
            }
        }
        .terminalCard()
    }

    private func zoneBar(_ label: String, minutes: Int, color: Color) -> some View {
        VStack(spacing: 2) {
            Text("\(minutes)m")
                .font(.mono(8))
                .foregroundStyle(Color.textDim)
            RoundedRectangle(cornerRadius: 3)
                .fill(color)
                .frame(height: 24)
            Text(label)
                .font(.mono(8, weight: .bold))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
    }

    // MARK: - Review Section

    private var reviewSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("POST-TRIP REVIEW")
                .font(.mono(11, weight: .bold))
                .foregroundStyle(Color.textMuted)

            if let review {
                // Show completed review summary
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(Color.emerald)
                        Text("Completed")
                            .font(.mono(13, weight: .semibold))
                            .foregroundStyle(Color.emerald)
                        Spacer()
                        Text("+\(review.safetyXPAwarded) Safety XP")
                            .font(.mono(11, weight: .bold))
                            .foregroundStyle(Color.safetyXPColor)
                    }

                    if !review.hazards.isEmpty {
                        Text("\(review.hazards.count) hazard(s) identified")
                            .font(.mono(11))
                            .foregroundStyle(Color.textMuted)
                    }

                    if let decision = review.keyDecision {
                        Text(decision)
                            .font(.mono(11))
                            .foregroundStyle(Color.textPrimary)
                            .lineLimit(2)
                    }
                }
                .terminalCard()
            } else {
                // Show CTA
                Button {
                    showReview = true
                } label: {
                    HStack {
                        Image(systemName: "shield.checkered")
                        Text("Start Post-Trip Review")
                            .font(.mono(14, weight: .semibold))
                        Spacer()
                        Text("+50 XP")
                            .font(.mono(11))
                        Image(systemName: "chevron.right")
                    }
                    .foregroundStyle(.white)
                    .padding(14)
                    .background(Color.accent)
                    .cornerRadius(12)
                }
            }
        }
    }

    // MARK: - Helpers

    private func formatDuration(_ interval: TimeInterval) -> String {
        let hours = Int(interval) / 3600
        let minutes = (Int(interval) % 3600) / 60
        if hours > 0 { return "\(hours)h \(minutes)m" }
        return "\(minutes)m"
    }
}

// MARK: - Track Map View

struct TrackMapView: View {
    let trackPoints: [TrackPoint]

    var body: some View {
        Map {
            MapPolyline(coordinates: trackPoints.map { $0.coordinate })
                .stroke(Color.accent, lineWidth: 3)
        }
        .mapStyle(.standard(elevation: .realistic))
    }
}
