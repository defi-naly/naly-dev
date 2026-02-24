import SwiftUI

struct AddTaskSheet: View {
    @Environment(TaskStore.self) private var taskStore
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var category: Category = .today
    @State private var hasDueDate = false
    @State private var dueDate = Date()

    @FocusState private var isTitleFocused: Bool

    var body: some View {
        VStack(spacing: 0) {
            // Header
            HStack {
                Text("New Task")
                    .font(.terminalTitle)
                    .foregroundColor(.terminalText)

                Spacer()

                Button(action: { dismiss() }) {
                    Image(systemName: "xmark")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(.terminalMuted)
                }
                .buttonStyle(.plain)
                .keyboardShortcut(.escape, modifiers: [])
            }
            .padding()

            Divider()
                .background(Color.terminalBorder)

            // Form
            VStack(spacing: 16) {
                // Title field
                VStack(alignment: .leading, spacing: 6) {
                    Text("TITLE")
                        .font(.terminalMicro)
                        .foregroundColor(.terminalMuted)

                    TextField("What needs to be done?", text: $title)
                        .font(.terminalBody)
                        .textFieldStyle(.plain)
                        .padding(10)
                        .background(Color.terminalSurface)
                        .clipShape(RoundedRectangle(cornerRadius: 6))
                        .overlay(
                            RoundedRectangle(cornerRadius: 6)
                                .stroke(isTitleFocused ? Color.terminalAccent : Color.terminalBorder, lineWidth: 1)
                        )
                        .focused($isTitleFocused)
                }

                // Category picker
                VStack(alignment: .leading, spacing: 6) {
                    Text("CATEGORY")
                        .font(.terminalMicro)
                        .foregroundColor(.terminalMuted)

                    HStack(spacing: 8) {
                        ForEach(Category.allCases) { cat in
                            Button(action: { category = cat }) {
                                HStack(spacing: 4) {
                                    Image(systemName: cat.icon)
                                        .font(.system(size: 10))
                                    Text(cat.rawValue)
                                }
                            }
                            .terminalButton(isActive: category == cat)
                            .buttonStyle(.plain)
                        }
                    }
                }

                // Due date
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text("DUE DATE")
                            .font(.terminalMicro)
                            .foregroundColor(.terminalMuted)

                        Spacer()

                        Toggle("", isOn: $hasDueDate)
                            .toggleStyle(.switch)
                            .scaleEffect(0.7)
                            .labelsHidden()
                    }

                    if hasDueDate {
                        DatePicker("", selection: $dueDate, displayedComponents: [.date, .hourAndMinute])
                            .datePickerStyle(.compact)
                            .labelsHidden()
                            .padding(8)
                            .background(Color.terminalSurface)
                            .clipShape(RoundedRectangle(cornerRadius: 6))
                            .overlay(
                                RoundedRectangle(cornerRadius: 6)
                                    .stroke(Color.terminalBorder, lineWidth: 1)
                            )
                    }
                }
            }
            .padding()

            Divider()
                .background(Color.terminalBorder)

            // Actions
            HStack {
                Button("Cancel") {
                    dismiss()
                }
                .terminalButton()
                .buttonStyle(.plain)

                Spacer()

                Button("Add Task") {
                    addTask()
                }
                .terminalButton(isActive: true)
                .buttonStyle(.plain)
                .disabled(title.trimmingCharacters(in: .whitespaces).isEmpty)
                .opacity(title.trimmingCharacters(in: .whitespaces).isEmpty ? 0.5 : 1)
                .keyboardShortcut(.return, modifiers: [])
            }
            .padding()
        }
        .frame(width: 320)
        .background(Color.terminalBg)
        .onAppear {
            isTitleFocused = true
        }
    }

    private func addTask() {
        let trimmedTitle = title.trimmingCharacters(in: .whitespaces)
        guard !trimmedTitle.isEmpty else { return }

        taskStore.addTask(
            trimmedTitle,
            category: category,
            dueDate: hasDueDate ? dueDate : nil
        )
        dismiss()
    }
}

#Preview {
    AddTaskSheet()
        .environment(TaskStore())
}
