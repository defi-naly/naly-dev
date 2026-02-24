import SwiftUI

struct LessonSynthesisPhase: View {
    let synthesisPrompt: String
    let conceptMapNodes: [ConceptMapNode]
    let currentModuleId: String
    let domainColor: Color
    let onComplete: () -> Void

    @State private var showMap = false

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("CONNECT")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(domainColor)
                Spacer()
                Text("+\(XPReward.synthesisCompleted) XP")
                    .font(.mono(10, weight: .bold))
                    .foregroundStyle(Color.amber)
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)

            // Concept map
            if showMap && !conceptMapNodes.isEmpty {
                ConceptMapView(nodes: conceptMapNodes, currentModuleId: currentModuleId)
                    .frame(height: 240)
                    .padding(.horizontal, 12)
                    .padding(.top, 12)
                    .transition(.opacity.combined(with: .scale(scale: 0.95)))
            }

            Spacer()

            // Synthesis prompt
            VStack(alignment: .leading, spacing: 12) {
                Text("How does this connect?")
                    .font(.mono(13, weight: .bold))
                    .foregroundStyle(Color.textPrimary)

                Text(synthesisPrompt)
                    .font(.mono(14))
                    .foregroundStyle(Color.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding(16)
            .background(Color.terminalSurface)
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.terminalBorder, lineWidth: 1)
            )
            .padding(.horizontal, 16)

            Spacer()

            // Continue button
            Button {
                onComplete()
            } label: {
                HStack {
                    Text("See Results")
                        .font(.mono(14, weight: .bold))
                    Image(systemName: "arrow.right")
                }
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(Color.amber)
                .cornerRadius(10)
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 24)
        }
        .background(Color.terminalBg)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                withAnimation(.spring(response: 0.5)) {
                    showMap = true
                }
            }
        }
    }
}
