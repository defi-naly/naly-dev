import SwiftUI

// MARK: - XContest Connection View

struct XContestConnectionView: View {
    @StateObject private var xcontest = XContestService.shared
    @State private var usernameInput = ""

    var body: some View {
        List {
            Section {
                HStack {
                    Image(systemName: "person.fill")
                        .foregroundStyle(Color.textDim)
                        .frame(width: 24)
                    TextField("XContest Username", text: $usernameInput)
                        .font(.mono(14))
                        .foregroundStyle(Color.textPrimary)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                }
                .listRowBackground(Color.terminalSurface)

                Button {
                    xcontest.username = usernameInput
                    Task { await xcontest.fetchFlights() }
                } label: {
                    HStack {
                        Image(systemName: "checkmark.circle")
                        Text("Verify & Connect")
                            .font(.mono(14, weight: .semibold))
                    }
                    .foregroundStyle(Color.accent)
                }
                .disabled(usernameInput.isEmpty)
                .listRowBackground(Color.terminalSurface)
            } header: {
                Text("Account")
                    .font(.mono(11, weight: .bold))
            } footer: {
                Text("Enter your XContest username to automatically import flight data.")
                    .font(.mono(11))
            }

            if xcontest.username != nil {
                Section {
                    if let lastSync = xcontest.lastSyncDate {
                        HStack {
                            Text("Last Sync")
                                .font(.mono(13))
                                .foregroundStyle(Color.textMuted)
                            Spacer()
                            Text(lastSync, style: .relative)
                                .font(.mono(12))
                                .foregroundStyle(Color.textDim)
                        }
                        .listRowBackground(Color.terminalSurface)
                    }

                    HStack {
                        Text("Flights Found")
                            .font(.mono(13))
                            .foregroundStyle(Color.textMuted)
                        Spacer()
                        Text("\(xcontest.flights.count)")
                            .font(.mono(13, weight: .bold))
                            .foregroundStyle(Color.emerald)
                    }
                    .listRowBackground(Color.terminalSurface)

                    Button {
                        Task { await xcontest.syncAll() }
                    } label: {
                        HStack {
                            Image(systemName: "arrow.triangle.2.circlepath")
                            Text("Sync Now")
                                .font(.mono(14))
                        }
                        .foregroundStyle(Color.accent)
                    }
                    .disabled(xcontest.isLoading)
                    .listRowBackground(Color.terminalSurface)
                } header: {
                    Text("Sync")
                        .font(.mono(11, weight: .bold))
                }
            }
        }
        .scrollContentBackground(.hidden)
        .background(Color.terminalBg)
        .navigationTitle("XContest")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            usernameInput = xcontest.username ?? ""
        }
    }
}
