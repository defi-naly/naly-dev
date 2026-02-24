import SwiftUI

// MARK: - Flight Log View

struct FlightLogView: View {
    @StateObject private var logStore = ActivityLogStore.shared

    var body: some View {
        Group {
            if logStore.flights.isEmpty {
                emptyState
            } else {
                flightList
            }
        }
        .background(Color.terminalBg)
        .navigationTitle("Flight Log")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Spacer()
            Image("icon-paraglider")
                .resizable()
                .scaledToFit()
                .frame(width: 48, height: 48)
                .foregroundStyle(Color.textTertiary)
            Text("No Flights Yet")
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.textPrimary)
            Text("Your recorded flights will appear here.")
                .font(.mono(14))
                .foregroundStyle(Color.textMuted)
                .multilineTextAlignment(.center)
            Spacer()
        }
        .padding()
    }

    private var flightList: some View {
        ScrollView {
            VStack(spacing: 12) {
                // Stats header
                HStack(spacing: 16) {
                    flightStat(
                        value: "\(logStore.totalFlights)",
                        label: "Flights"
                    )
                    flightStat(
                        value: formatTotalTime(logStore.totalFlightTime),
                        label: "Total Time"
                    )
                }
                .padding(.horizontal)

                // Flight entries
                ForEach(logStore.flights) { flight in
                    FlightEntryCard(flight: flight)
                }
                .padding(.horizontal)
            }
            .padding(.vertical)
        }
    }

    private func flightStat(value: String, label: String) -> some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.mono(20, weight: .bold))
                .foregroundStyle(Color.flyingAccent)
            Text(label)
                .font(.mono(10))
                .foregroundStyle(Color.textMuted)
        }
        .frame(maxWidth: .infinity)
        .terminalCard()
    }

    private func formatTotalTime(_ time: TimeInterval) -> String {
        let hours = Int(time) / 3600
        let minutes = (Int(time) % 3600) / 60
        return "\(hours)h \(minutes)m"
    }
}

// MARK: - Flight Entry Card

struct FlightEntryCard: View {
    let flight: FlightLog

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Date & Duration
            HStack {
                Text(flight.date, style: .date)
                    .font(.mono(14, weight: .bold))
                    .foregroundStyle(Color.textPrimary)
                Spacer()
                Text(flight.durationFormatted)
                    .font(.mono(14, weight: .semibold))
                    .foregroundStyle(Color.flyingAccent)
            }

            // Stats row
            HStack(spacing: 16) {
                statItem("arrow.up", "\(Int(flight.maxAltitude))m", "Max Alt")
                statItem("arrow.up.circle", "\(Int(flight.altitudeGain))m", "Climb")
                statItem("arrow.right", String(format: "%.1f km", flight.xcDistance), "XC Dist")
            }
        }
        .terminalCard()
    }

    private func statItem(_ icon: String, _ value: String, _ label: String) -> some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 10))
                .foregroundStyle(Color.textMuted)
            VStack(alignment: .leading, spacing: 1) {
                Text(value)
                    .font(.mono(12, weight: .semibold))
                    .foregroundStyle(Color.textPrimary)
                Text(label)
                    .font(.mono(9))
                    .foregroundStyle(Color.textDim)
            }
        }
    }
}
