import SwiftUI

// MARK: - Conditions Step

struct ConditionsStepView: View {
    @Binding var conditions: ConditionsSnapshot

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Conditions")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            Text("Record the conditions you encountered.")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            VStack(spacing: 16) {
                conditionField("Temperature (°C)", value: Binding(
                    get: { conditions.temperature.map { String(format: "%.0f", $0) } ?? "" },
                    set: { conditions.temperature = Double($0) }
                ))

                conditionField("Wind Speed (km/h)", value: Binding(
                    get: { conditions.windSpeed.map { String(format: "%.0f", $0) } ?? "" },
                    set: { conditions.windSpeed = Double($0) }
                ))

                HStack {
                    Text("Visibility")
                        .font(.mono(12))
                        .foregroundStyle(Color.textMuted)
                        .frame(width: 120, alignment: .leading)
                    Picker("Visibility", selection: Binding(
                        get: { conditions.visibility ?? "Good" },
                        set: { conditions.visibility = $0 }
                    )) {
                        Text("Good").tag("Good")
                        Text("Moderate").tag("Moderate")
                        Text("Poor").tag("Poor")
                    }
                    .pickerStyle(.segmented)
                }
            }
        }
        .padding(.vertical)
    }

    private func conditionField(_ label: String, value: Binding<String>) -> some View {
        HStack {
            Text(label)
                .font(.mono(12))
                .foregroundStyle(Color.textMuted)
                .frame(width: 120, alignment: .leading)
            TextField("", text: value)
                .font(.mono(14))
                .foregroundStyle(Color.textPrimary)
                .keyboardType(.numberPad)
                .textFieldStyle(.roundedBorder)
        }
    }
}

// MARK: - Hazards Step

struct HazardsStepView: View {
    let activityType: Activity
    @Binding var hazardEntries: [HazardEntry]

    private var prompts: [HazardContent.HazardPrompt] {
        HazardContent.hazards(for: activityType)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Hazards")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            Text("Did you encounter any hazards?")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            ForEach(prompts) { prompt in
                HazardToggleRow(
                    prompt: prompt,
                    isActive: hazardEntries.contains { $0.description == prompt.question },
                    onToggle: { active in
                        if active {
                            hazardEntries.append(HazardEntry(
                                category: prompt.category,
                                description: prompt.question
                            ))
                        } else {
                            hazardEntries.removeAll { $0.description == prompt.question }
                        }
                    },
                    onSeverityChange: { severity in
                        if let idx = hazardEntries.firstIndex(where: { $0.description == prompt.question }) {
                            hazardEntries[idx].severity = severity
                        }
                    }
                )
            }
        }
        .padding(.vertical)
    }
}

// MARK: - Hazard Toggle Row

struct HazardToggleRow: View {
    let prompt: HazardContent.HazardPrompt
    let isActive: Bool
    let onToggle: (Bool) -> Void
    let onSeverityChange: (HazardSeverity) -> Void

    @State private var selectedSeverity: HazardSeverity = .minor

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Button {
                onToggle(!isActive)
            } label: {
                HStack(spacing: 10) {
                    Image(systemName: isActive ? "checkmark.circle.fill" : "circle")
                        .foregroundStyle(isActive ? Color.accent : Color.textDim)
                    Text(prompt.question)
                        .font(.mono(12))
                        .foregroundStyle(Color.textPrimary)
                        .multilineTextAlignment(.leading)
                }
            }

            if isActive {
                Picker("Severity", selection: $selectedSeverity) {
                    ForEach(HazardSeverity.allCases, id: \.self) { severity in
                        Text(severity.displayName).tag(severity)
                    }
                }
                .pickerStyle(.segmented)
                .onChange(of: selectedSeverity) { _, newValue in
                    onSeverityChange(newValue)
                }
                .padding(.leading, 30)
            }
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Decision Step

struct DecisionStepView: View {
    @Binding var keyDecision: String
    @Binding var wouldRepeat: Bool?
    @Binding var decisionExplanation: String

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Decisions")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            Text("What was your key decision point today?")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            TextField("e.g. Decided to turn back at the col", text: $keyDecision)
                .font(.mono(14))
                .textFieldStyle(.roundedBorder)

            if !keyDecision.isEmpty {
                Text("Would you make the same decision again?")
                    .font(.mono(13))
                    .foregroundStyle(Color.textMuted)

                HStack(spacing: 12) {
                    decisionButton("Yes", isSelected: wouldRepeat == true) {
                        wouldRepeat = true
                    }
                    decisionButton("No", isSelected: wouldRepeat == false) {
                        wouldRepeat = false
                    }
                }

                if wouldRepeat != nil {
                    TextField("Why?", text: $decisionExplanation, axis: .vertical)
                        .font(.mono(13))
                        .lineLimit(3...6)
                        .textFieldStyle(.roundedBorder)
                }
            }
        }
        .padding(.vertical)
    }

    private func decisionButton(_ label: String, isSelected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.mono(14, weight: .semibold))
                .foregroundStyle(isSelected ? .white : Color.textPrimary)
                .padding(.horizontal, 24)
                .padding(.vertical, 10)
                .background(isSelected ? Color.accent : Color.terminalBorder)
                .cornerRadius(8)
        }
    }
}

// MARK: - Lessons Step

struct LessonsStepView: View {
    @Binding var lessonsLearned: String
    @Binding var relevantDomains: [DomainId]
    let suggestedDomains: [DomainId]

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Lessons")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            Text("Which domain was most relevant?")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            FlowLayout(spacing: 8) {
                ForEach(DomainId.allCases, id: \.self) { domain in
                    let isSelected = relevantDomains.contains(domain)
                    let isSuggested = suggestedDomains.contains(domain)

                    Button {
                        if isSelected {
                            relevantDomains.removeAll { $0 == domain }
                        } else {
                            relevantDomains.append(domain)
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: domain.icon)
                                .font(.system(size: 10))
                            Text(domain.rawValue.capitalized)
                                .font(.mono(11))
                        }
                        .foregroundStyle(isSelected ? .white : Color.textPrimary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(isSelected ? domain.color : (isSuggested ? domain.color.opacity(0.15) : Color.terminalBorder))
                        .cornerRadius(8)
                    }
                }
            }

            Text("What did you learn?")
                .font(.mono(13))
                .foregroundStyle(Color.textMuted)

            TextField("Free-form notes...", text: $lessonsLearned, axis: .vertical)
                .font(.mono(13))
                .lineLimit(3...8)
                .textFieldStyle(.roundedBorder)
        }
        .padding(.vertical)
    }
}

// MARK: - Flow Layout

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = arrangeSubviews(proposal: proposal, subviews: subviews)
        return result.size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrangeSubviews(proposal: proposal, subviews: subviews)
        for (index, position) in result.positions.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + position.x, y: bounds.minY + position.y), proposal: .unspecified)
        }
    }

    private func arrangeSubviews(proposal: ProposedViewSize, subviews: Subviews) -> (positions: [CGPoint], size: CGSize) {
        let maxWidth = proposal.width ?? .infinity
        var positions: [CGPoint] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0
        var maxX: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > maxWidth && x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            positions.append(CGPoint(x: x, y: y))
            rowHeight = max(rowHeight, size.height)
            x += size.width + spacing
            maxX = max(maxX, x)
        }

        return (positions, CGSize(width: maxX, height: y + rowHeight))
    }
}

// MARK: - Review Summary

struct ReviewSummaryView: View {
    let conditions: ConditionsSnapshot
    let hazards: [HazardEntry]
    let keyDecision: String
    let wouldRepeat: Bool?
    let lessonsLearned: String
    let xpPreview: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Summary")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)

            // XP Preview
            HStack {
                Image(systemName: "shield.checkered")
                    .foregroundStyle(Color.safetyXPColor)
                Text("+\(xpPreview) Safety XP")
                    .font(.mono(16, weight: .bold))
                    .foregroundStyle(Color.safetyXPColor)
            }
            .terminalCard()

            // Hazards summary
            if !hazards.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("HAZARDS IDENTIFIED")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                    ForEach(hazards) { hazard in
                        HStack(spacing: 8) {
                            Image(systemName: hazard.category.icon)
                                .font(.system(size: 12))
                                .foregroundStyle(Color.warning)
                            Text(hazard.description)
                                .font(.mono(11))
                                .foregroundStyle(Color.textPrimary)
                            Spacer()
                            Text(hazard.severity.displayName)
                                .font(.mono(9))
                                .foregroundStyle(Color.textDim)
                        }
                    }
                }
            }

            // Decision summary
            if !keyDecision.isEmpty {
                VStack(alignment: .leading, spacing: 4) {
                    Text("KEY DECISION")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                    Text(keyDecision)
                        .font(.mono(12))
                        .foregroundStyle(Color.textPrimary)
                    if let wouldRepeat {
                        Text(wouldRepeat ? "Would repeat" : "Would change")
                            .font(.mono(10))
                            .foregroundStyle(wouldRepeat ? Color.emerald : Color.warning)
                    }
                }
            }

            // Lessons
            if !lessonsLearned.isEmpty {
                VStack(alignment: .leading, spacing: 4) {
                    Text("LESSONS LEARNED")
                        .font(.mono(11, weight: .bold))
                        .foregroundStyle(Color.textMuted)
                    Text(lessonsLearned)
                        .font(.mono(12))
                        .foregroundStyle(Color.textPrimary)
                }
            }
        }
        .padding(.vertical)
    }
}
