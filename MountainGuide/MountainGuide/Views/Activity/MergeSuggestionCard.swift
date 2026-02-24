import SwiftUI

// MARK: - Merge Suggestion Card

struct MergeSuggestionCard: View {
    let suggestion: MergeEngine.MergeSuggestion
    let onMerge: () -> Void
    let onDismiss: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack(spacing: 8) {
                Image(systemName: "arrow.triangle.merge")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(Color.flyingAccent)
                Text("Hike \u{0026} Fly Detected")
                    .font(.mono(13, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Spacer()
                Text("\(Int(suggestion.confidence * 100))% match")
                    .font(.mono(10))
                    .foregroundStyle(Color.textDim)
            }

            // Activity summaries
            HStack(spacing: 12) {
                activitySummary(
                    image: suggestion.groundActivity.activityType.iconImage,
                    color: suggestion.groundActivity.activityType.color,
                    label: suggestion.groundActivity.activityType.displayName,
                    detail: formatDuration(suggestion.groundActivity.duration)
                )

                Image(systemName: "plus")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.textDim)

                activitySummary(
                    image: suggestion.flight.activityType.iconImage,
                    color: suggestion.flight.activityType.color,
                    label: suggestion.flight.activityType.displayName,
                    detail: formatDuration(suggestion.flight.duration)
                )
            }

            // Actions
            HStack(spacing: 12) {
                Button(action: onMerge) {
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.triangle.merge")
                            .font(.system(size: 11))
                        Text("Merge")
                            .font(.mono(12, weight: .semibold))
                    }
                    .foregroundStyle(.white)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(Color.accent)
                    .cornerRadius(8)
                }

                Button(action: onDismiss) {
                    Text("Keep Separate")
                        .font(.mono(12))
                        .foregroundStyle(Color.textMuted)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color.terminalBorder)
                        .cornerRadius(8)
                }
            }
        }
        .terminalCard()
    }

    private func activitySummary(image: Image, color: Color, label: String, detail: String) -> some View {
        HStack(spacing: 8) {
            image
                .resizable()
                .scaledToFit()
                .frame(width: 14, height: 14)
                .foregroundStyle(color)
            VStack(alignment: .leading, spacing: 1) {
                Text(label)
                    .font(.mono(11, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text(detail)
                    .font(.mono(9))
                    .foregroundStyle(Color.textMuted)
            }
        }
    }

    private func formatDuration(_ interval: TimeInterval) -> String {
        let hours = Int(interval) / 3600
        let minutes = (Int(interval) % 3600) / 60
        if hours > 0 { return "\(hours)h \(minutes)m" }
        return "\(minutes)m"
    }
}
