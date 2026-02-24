import SwiftUI

// MARK: - Activity Selector Bar (Subdued — text pills with underline)

struct ActivitySelectorBar: View {
    @EnvironmentObject var activityStore: ActivityStore

    var body: some View {
        HStack(spacing: 0) {
            ForEach(Activity.allCases, id: \.rawValue) { activity in
                let isSelected = activityStore.currentActivity == activity
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        activityStore.currentActivity = activity
                    }
                } label: {
                    VStack(spacing: 6) {
                        HStack(spacing: 5) {
                            activity.iconImage
                                .resizable()
                                .scaledToFit()
                                .frame(width: 13, height: 13)
                                .foregroundStyle(isSelected ? Color.accent : Color.textTertiary)

                            Text(activity.shortName)
                                .font(.body(12, weight: isSelected ? .semibold : .regular))
                                .foregroundStyle(isSelected ? Color.textPrimary : Color.textSecondary)
                        }

                        // Underline indicator
                        Rectangle()
                            .fill(isSelected ? Color.accent : Color.clear)
                            .frame(height: 2)
                            .cornerRadius(1)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 6)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 4)
    }
}
