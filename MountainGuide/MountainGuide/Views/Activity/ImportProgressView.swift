import SwiftUI

// MARK: - Import Progress View

struct ImportProgressView: View {
    @StateObject private var healthKit = HealthKitService.shared
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                Spacer()

                // Icon
                Image(systemName: "heart.fill")
                    .font(.system(size: 48))
                    .foregroundStyle(.red)

                // Title
                Text(healthKit.isImporting ? "Importing Activities" : "Import Complete")
                    .font(.mono(20, weight: .bold))
                    .foregroundStyle(Color.textPrimary)

                // Progress
                if healthKit.isImporting {
                    VStack(spacing: 12) {
                        ProgressView(
                            value: Double(healthKit.importProgress.current),
                            total: max(Double(healthKit.importProgress.total), 1)
                        )
                        .tint(Color.accent)
                        .padding(.horizontal, 40)

                        Text("\(healthKit.importProgress.current) of \(healthKit.importProgress.total)")
                            .font(.mono(14))
                            .foregroundStyle(Color.textMuted)
                    }
                } else {
                    VStack(spacing: 16) {
                        // Summary
                        HStack(spacing: 24) {
                            summaryItem(
                                value: "\(healthKit.newWorkoutsCount)",
                                label: "Activities",
                                icon: "figure.hiking"
                            )
                        }
                    }
                }

                Spacer()

                // Done button (only when not importing)
                if !healthKit.isImporting {
                    Button {
                        dismiss()
                    } label: {
                        Text("Done")
                            .font(.mono(16, weight: .bold))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.accent)
                            .cornerRadius(12)
                    }
                    .padding(.horizontal, 32)
                    .padding(.bottom, 32)
                }
            }
            .background(Color.terminalBg)
            .navigationTitle("Import")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func summaryItem(value: String, label: String, icon: String) -> some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(Color.accent)
            Text(value)
                .font(.mono(24, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text(label)
                .font(.mono(11))
                .foregroundStyle(Color.textMuted)
        }
    }
}
