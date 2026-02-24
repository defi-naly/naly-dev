import SwiftUI

struct IllustrationView: View {
    let imageName: String
    let domain: DomainId
    let height: CGFloat

    init(imageName: String, domain: DomainId, height: CGFloat = 200) {
        self.imageName = imageName
        self.domain = domain
        self.height = height
    }

    var body: some View {
        if let renderer = IllustrationRegistry.lookup(imageName) {
            Canvas { context, size in
                renderer(&context, size, domain)
            }
            .frame(height: height)
            .clipShape(RoundedRectangle(cornerRadius: 8))
        } else {
            // Domain-colored generic fallback
            Canvas { context, size in
                IllustrationRegistry.genericFallback(&context, size, domain)
            }
            .frame(height: height)
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
    }
}
