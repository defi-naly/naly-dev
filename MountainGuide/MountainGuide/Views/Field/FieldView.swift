import SwiftUI

// MARK: - Field Tab Container

struct FieldView: View {
    @State private var selectedSegment: FieldSegment = .instruments

    enum FieldSegment: String, CaseIterable {
        case instruments = "Instruments"
        case conditions = "Conditions"
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Segment picker
                Picker("Field", selection: $selectedSegment) {
                    ForEach(FieldSegment.allCases, id: \.self) { segment in
                        Text(segment.rawValue).tag(segment)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                .padding(.top, 8)

                // Content
                switch selectedSegment {
                case .instruments:
                    InstrumentsListView()
                case .conditions:
                    ConditionsView()
                }
            }
            .background(Color.terminalBg)
            .navigationTitle("Field Tools")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

// MARK: - Instruments List

struct InstrumentsListView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Instrument navigation cards
                NavigationLink {
                    InclinometerView()
                } label: {
                    InstrumentNavCard(
                        title: "Inclinometer",
                        subtitle: "Measure slope angle",
                        icon: "angle",
                        color: .slopeYellow
                    )
                }

                NavigationLink {
                    CompassView()
                } label: {
                    InstrumentNavCard(
                        title: "Compass",
                        subtitle: "Heading & declination",
                        icon: "location.north.fill",
                        color: .accent
                    )
                }

                NavigationLink {
                    AltimeterView()
                } label: {
                    InstrumentNavCard(
                        title: "Altimeter",
                        subtitle: "Altitude & barometric pressure",
                        icon: "mountain.2.fill",
                        color: .emerald
                    )
                }

                NavigationLink {
                    ReductionMethodView()
                } label: {
                    InstrumentNavCard(
                        title: "Reduction Method",
                        subtitle: "Graphical avalanche risk assessment",
                        icon: "exclamationmark.triangle.fill",
                        color: .avalancheAccent
                    )
                }
            }
            .padding()
        }
    }
}

// MARK: - Instrument Navigation Card

struct InstrumentNavCard: View {
    let title: String
    let subtitle: String
    let icon: String
    let color: Color

    var body: some View {
        HStack(spacing: 16) {
            ZStack {
                RoundedRectangle(cornerRadius: 12)
                    .fill(color.opacity(0.12))
                    .frame(width: 48, height: 48)
                Image(systemName: icon)
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(color)
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.mono(15, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text(subtitle)
                    .font(.mono(12))
                    .foregroundStyle(Color.textSecondary)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Color.textTertiary)
        }
        .padding(16)
        .background(Color.lightSurface)
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
        .shadow(color: .black.opacity(0.06), radius: 8, x: 0, y: 4)
    }
}
