import SwiftUI

struct ProgressDotsView: View {
    let total: Int
    let current: Int
    var activeColor: Color = .amber

    var body: some View {
        HStack(spacing: 6) {
            ForEach(0..<total, id: \.self) { index in
                Circle()
                    .fill(index <= current ? activeColor : Color.terminalBorder)
                    .frame(width: index == current ? 10 : 6, height: index == current ? 10 : 6)
                    .animation(.spring(response: 0.3), value: current)
            }
        }
    }
}
