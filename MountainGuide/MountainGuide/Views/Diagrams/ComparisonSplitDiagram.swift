import SwiftUI

struct ComparisonSplitDiagram: View {
    let config: DiagramConfig
    let stepIndex: Int

    @State private var showLeft = false
    @State private var showRight = false

    var body: some View {
        GeometryReader { geo in
            HStack(spacing: 2) {
                // Left panel
                VStack(alignment: .leading, spacing: 8) {
                    Text((config.leftTitle ?? "Before").uppercased())
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color(hex: config.leftColor ?? "3B82F6"))

                    if let items = config.leftItems {
                        ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                            HStack(spacing: 6) {
                                Circle()
                                    .fill(Color(hex: config.leftColor ?? "3B82F6"))
                                    .frame(width: 6, height: 6)
                                Text(item)
                                    .font(.mono(10))
                                    .foregroundStyle(Color.textPrimary)
                            }
                            .opacity(showLeft ? 1 : 0)
                            .offset(x: showLeft ? 0 : -20)
                            .animation(.spring(response: 0.4).delay(Double(index) * 0.1), value: showLeft)
                        }
                    }
                    Spacer()
                }
                .padding(12)
                .frame(maxWidth: .infinity)
                .background(Color(hex: config.leftColor ?? "3B82F6").opacity(0.08))
                .cornerRadius(8)

                // Divider
                Rectangle()
                    .fill(Color.terminalBorder)
                    .frame(width: 2)

                // Right panel
                VStack(alignment: .leading, spacing: 8) {
                    Text((config.rightTitle ?? "After").uppercased())
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color(hex: config.rightColor ?? "EF4444"))

                    if let items = config.rightItems {
                        ForEach(Array(items.enumerated()), id: \.offset) { index, item in
                            HStack(spacing: 6) {
                                Circle()
                                    .fill(Color(hex: config.rightColor ?? "EF4444"))
                                    .frame(width: 6, height: 6)
                                Text(item)
                                    .font(.mono(10))
                                    .foregroundStyle(Color.textPrimary)
                            }
                            .opacity(showRight ? 1 : 0)
                            .offset(x: showRight ? 0 : 20)
                            .animation(.spring(response: 0.4).delay(Double(index) * 0.1), value: showRight)
                        }
                    }
                    Spacer()
                }
                .padding(12)
                .frame(maxWidth: .infinity)
                .background(Color(hex: config.rightColor ?? "EF4444").opacity(0.08))
                .cornerRadius(8)
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                showLeft = true
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                showRight = true
            }
        }
    }
}
