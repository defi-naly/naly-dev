import SwiftUI
import MapKit

struct LessonTeachingPhase: View {
    let steps: [TeachingStep]
    let domainColor: Color
    let onComplete: (Int) -> Void     // passes number of steps viewed

    @State private var currentStep = 0
    @State private var stepsViewed: Set<Int> = [0]

    private var step: TeachingStep {
        steps[currentStep]
    }

    var body: some View {
        VStack(spacing: 0) {
            // Step counter
            HStack {
                Text("LEARN")
                    .font(.mono(11, weight: .bold))
                    .foregroundStyle(domainColor)
                Text("\(currentStep + 1) of \(steps.count)")
                    .font(.mono(11))
                    .foregroundStyle(Color.textMuted)
                Spacer()

                // XP indicator
                XPAnimationView(amount: stepsViewed.count * XPReward.teachingStepViewed)
                    .id(stepsViewed.count) // re-trigger animation
            }
            .padding(.horizontal, 16)
            .padding(.top, 8)

            // Animation > Map > Diagram (60% of screen)
            if let animName = step.animationName {
                RiveAnimationView(animationName: animName)
                    .frame(maxHeight: .infinity)
                    .cornerRadius(12)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
            } else if let mapConfig = step.mapConfig {
                VStack(spacing: 4) {
                    SwissTopoMapView(
                        region: MKCoordinateRegion(
                            center: CLLocationCoordinate2D(latitude: mapConfig.centerLat, longitude: mapConfig.centerLon),
                            span: MKCoordinateSpan(latitudeDelta: mapConfig.spanLat, longitudeDelta: mapConfig.spanLon)
                        ),
                        annotations: (mapConfig.pins ?? []).map { pin in
                            MapPin(id: pin.id, coordinate: CLLocationCoordinate2D(latitude: pin.lat, longitude: pin.lon), title: pin.label, icon: "mappin")
                        },
                        showsUserLocation: false
                    )
                    .frame(maxHeight: .infinity)
                    .cornerRadius(8)
                    SwissTopoAttribution()
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            } else {
                DiagramFactory.makeDiagram(
                    type: step.diagramType,
                    config: step.diagramConfig,
                    stepIndex: currentStep
                )
                .frame(maxHeight: .infinity)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            }

            // Content
            VStack(alignment: .leading, spacing: 8) {
                Text(step.headline)
                    .font(.mono(18, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                    .id(currentStep) // Animate change

                Text(step.body)
                    .font(.mono(13))
                    .foregroundStyle(Color.textMuted)
                    .fixedSize(horizontal: false, vertical: true)
                    .id("\(currentStep)-body")

                if let hint = step.interactionHint {
                    HStack(spacing: 6) {
                        Image(systemName: "hand.tap.fill")
                            .font(.system(size: 10))
                        Text(hint)
                            .font(.mono(10))
                    }
                    .foregroundStyle(Color.amber.opacity(0.7))
                    .padding(.top, 4)
                }
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 12)

            // Navigation
            HStack(spacing: 16) {
                // Back button
                if currentStep > 0 {
                    Button {
                        withAnimation(.spring(response: 0.3)) {
                            currentStep -= 1
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "chevron.left")
                            Text("Back")
                                .font(.mono(13, weight: .medium))
                        }
                        .foregroundStyle(Color.textMuted)
                        .padding(.vertical, 12)
                        .padding(.horizontal, 20)
                    }
                }

                Spacer()

                // Next / Continue button
                Button {
                    if currentStep < steps.count - 1 {
                        withAnimation(.spring(response: 0.3)) {
                            currentStep += 1
                            stepsViewed.insert(currentStep)
                        }
                    } else {
                        onComplete(stepsViewed.count)
                    }
                } label: {
                    HStack(spacing: 4) {
                        Text(currentStep < steps.count - 1 ? "Next" : "Start Practice")
                            .font(.mono(14, weight: .bold))
                        Image(systemName: currentStep < steps.count - 1 ? "chevron.right" : "arrow.right")
                    }
                    .foregroundStyle(.white)
                    .padding(.vertical, 12)
                    .padding(.horizontal, 24)
                    .background(Color.amber)
                    .cornerRadius(10)
                }
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 8)

            // Progress dots
            ProgressDotsView(total: steps.count, current: currentStep, activeColor: domainColor)
                .padding(.bottom, 16)
        }
        .background(Color.terminalBg)
    }
}
