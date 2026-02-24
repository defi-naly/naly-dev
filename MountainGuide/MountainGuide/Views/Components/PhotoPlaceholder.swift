import SwiftUI

struct PhotoPlaceholder: View {
    let domain: DomainId

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color.lightBorder)
                .frame(height: 160)
            Image(systemName: domain.icon)
                .font(.system(size: 28))
                .foregroundStyle(Color.textTertiary)
        }
    }
}
