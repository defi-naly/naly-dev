import SwiftUI

// MARK: - Field Tab Container

struct FieldView: View {
    @EnvironmentObject var activityStore: ActivityStore
    @State private var selectedSegment: FieldSegment = .conditions
    @State private var isMapFullscreen: Bool = false

    enum FieldSegment: String, CaseIterable {
        case conditions = "Conditions"
        case map = "Map"
        case instruments = "Instruments"
        case planner = "Planner"
    }

    var body: some View {
        NavigationStack {
            ZStack {
                // Content
                VStack(spacing: 0) {
                    if !isMapFullscreen {
                        // Segment picker (hidden when map is fullscreen)
                        Picker("Field", selection: $selectedSegment) {
                            ForEach(FieldSegment.allCases, id: \.self) { segment in
                                Text(segment.rawValue).tag(segment)
                            }
                        }
                        .pickerStyle(.segmented)
                        .padding(.horizontal)
                        .padding(.top, 8)
                    }

                    switch selectedSegment {
                    case .conditions:
                        ConditionsView()
                    case .map:
                        MapTabView()
                            .environmentObject(activityStore)
                            .ignoresSafeArea(edges: isMapFullscreen ? .top : [])
                    case .instruments:
                        InstrumentsListView(currentActivity: activityStore.currentActivity)
                            .background(Color.terminalBg)
                    case .planner:
                        TourPlannerView()
                    }
                }
                .background(Color.terminalBg)

                // Floating segment capsule when map is fullscreen
                if isMapFullscreen {
                    VStack {
                        FloatingSegmentCapsule(
                            selectedSegment: $selectedSegment,
                            isMapFullscreen: $isMapFullscreen
                        )
                        .padding(.top, 4)
                        Spacer()
                    }
                }
            }
            .toolbar(isMapFullscreen ? .hidden : .visible, for: .navigationBar)
            .navigationTitle("Field")
            .navigationBarTitleDisplayMode(.inline)
            .onChange(of: selectedSegment) { _, newValue in
                withAnimation(.easeInOut(duration: 0.25)) {
                    isMapFullscreen = (newValue == .map)
                }
            }
        }
    }
}

// MARK: - Floating Segment Capsule (Map Fullscreen)

struct FloatingSegmentCapsule: View {
    @Binding var selectedSegment: FieldView.FieldSegment
    @Binding var isMapFullscreen: Bool

    private let segments: [(FieldView.FieldSegment, String)] = [
        (.conditions, "cloud.fill"),
        (.map, "map.fill"),
        (.instruments, "wrench.fill"),
        (.planner, "point.topleft.down.to.point.bottomright.curvepath"),
    ]

    var body: some View {
        HStack(spacing: 2) {
            ForEach(segments, id: \.0) { segment, icon in
                Button {
                    withAnimation(.easeInOut(duration: 0.25)) {
                        selectedSegment = segment
                    }
                } label: {
                    Image(systemName: icon)
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(selectedSegment == segment ? Color.accent : Color.textSecondary)
                        .frame(width: 36, height: 32)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(selectedSegment == segment ? Color.accentSoft : Color.clear)
                        )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 6)
        .padding(.vertical, 4)
        .background(
            Capsule()
                .fill(.ultraThinMaterial)
                .shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
        )
    }
}

// MARK: - Categorized Instruments List

struct InstrumentsListView: View {
    var currentActivity: Activity = .skiTouring

    private var orderedActivities: [Activity] {
        var activities = Activity.allCases
        // Move current activity to front
        activities.removeAll { $0 == currentActivity }
        activities.insert(currentActivity, at: 0)
        return activities
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                ForEach(orderedActivities, id: \.rawValue) { activity in
                    let tools = toolsFor(activity)
                    if !tools.isEmpty {
                        ToolCategorySection(
                            activity: activity,
                            tools: tools,
                            isCurrent: activity == currentActivity
                        )
                    }
                }
            }
            .padding()
        }
    }

    private func toolsFor(_ activity: Activity) -> [ToolEntry] {
        switch activity {
        case .paragliding:
            return [
                ToolEntry(title: "Pre-Flight Assessment", subtitle: "Flyability, wind, thermals, airspace", icon: "bird.fill", color: .flyingAccent, viewTag: .preFlight),
                ToolEntry(title: "Flight Log", subtitle: "Recorded flights & stats", icon: "list.bullet.rectangle", color: .flyingAccent, viewTag: .flightLog),
                ToolEntry(title: "Compass", subtitle: "Heading & declination", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "Altitude & barometric pressure", icon: "mountain.2.fill", color: .emerald, viewTag: .altimeter),
            ]
        case .skiTouring:
            return [
                ToolEntry(title: "Inclinometer", subtitle: "Measure slope angle", icon: "angle", color: .slopeYellow, viewTag: .inclinometer),
                ToolEntry(title: "Reduction Method", subtitle: "Graphical avalanche risk assessment", icon: "exclamationmark.triangle.fill", color: .avalancheAccent, viewTag: .reductionMethod),
                ToolEntry(title: "Avalanche Bulletin", subtitle: "SLF danger ratings & problems", icon: "exclamationmark.triangle.fill", color: .dangerConsiderable, viewTag: .bulletin),
                ToolEntry(title: "Compass", subtitle: "Heading & declination", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "Altitude & barometric pressure", icon: "mountain.2.fill", color: .emerald, viewTag: .altimeter),
            ]
        case .hiking:
            return [
                ToolEntry(title: "Compass", subtitle: "Heading & declination", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "Altitude & barometric pressure", icon: "mountain.2.fill", color: .emerald, viewTag: .altimeter),
            ]
        case .climbing:
            return [
                ToolEntry(title: "Inclinometer", subtitle: "Measure slope angle", icon: "angle", color: .slopeYellow, viewTag: .inclinometer),
                ToolEntry(title: "Compass", subtitle: "Heading & declination", icon: "location.north.fill", color: .accent, viewTag: .compass),
                ToolEntry(title: "Altimeter", subtitle: "Altitude & barometric pressure", icon: "mountain.2.fill", color: .emerald, viewTag: .altimeter),
            ]
        }
    }
}

// MARK: - Tool Category Section

struct ToolCategorySection: View {
    let activity: Activity
    let tools: [ToolEntry]
    var isCurrent: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Category header
            HStack(spacing: 8) {
                RoundedRectangle(cornerRadius: 2)
                    .fill(activity.color)
                    .frame(width: 4, height: 20)

                activity.iconImage
                    .resizable()
                    .scaledToFit()
                    .frame(width: 14, height: 14)
                    .foregroundStyle(activity.color)

                Text(activity.displayName.uppercased())
                    .font(.body(12, weight: .bold))
                    .foregroundStyle(activity.color)

                if isCurrent {
                    Text("ACTIVE")
                        .font(.body(8, weight: .bold))
                        .foregroundStyle(.white)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(activity.color)
                        .cornerRadius(4)
                }

                Spacer()
            }

            // Tool cards
            ForEach(tools) { tool in
                NavigationLink {
                    tool.destinationView
                } label: {
                    InstrumentNavCard(
                        title: tool.title,
                        subtitle: tool.subtitle,
                        icon: tool.icon,
                        color: tool.color
                    )
                }
            }
        }
    }
}

// MARK: - Tool Entry Model

enum ToolViewTag: String {
    case preFlight, flightLog, compass, altimeter, inclinometer, reductionMethod, bulletin
}

struct ToolEntry: Identifiable {
    let id = UUID()
    let title: String
    let subtitle: String
    let icon: String
    let color: Color
    let viewTag: ToolViewTag

    var shortTitle: String {
        switch viewTag {
        case .preFlight: return "Pre-Flight"
        case .flightLog: return "Flight Log"
        case .compass: return "Compass"
        case .altimeter: return "Altimeter"
        case .inclinometer: return "Slope"
        case .reductionMethod: return "GRM"
        case .bulletin: return "Bulletin"
        }
    }

    @ViewBuilder
    var destinationView: some View {
        switch viewTag {
        case .preFlight: PreFlightView()
        case .flightLog: FlightLogView()
        case .compass: CompassView()
        case .altimeter: AltimeterView()
        case .inclinometer: InclinometerView()
        case .reductionMethod: ReductionMethodView()
        case .bulletin: BulletinView()
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
                    .font(.body(15, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text(subtitle)
                    .font(.body(12))
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
