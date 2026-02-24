import SwiftUI
import KeyboardShortcuts

struct ContentView: View {
    @Environment(TaskStore.self) private var taskStore
    @State private var isAddingTask = false
    @State private var newTaskTitle = ""
    @State private var newTaskCategory: Category = .today
    @State private var showingCompleted = false
    @FocusState private var isInputFocused: Bool

    var body: some View {
        VStack(spacing: 0) {
            // Header
            header

            Divider()
                .background(Color.terminalBorder)

            // Add Task Form (inline)
            if isAddingTask {
                addTaskForm

                Divider()
                    .background(Color.terminalBorder)
            }

            // Task List
            ScrollView {
                VStack(spacing: 12) {
                    if taskStore.hasIncompleteTasks {
                        TaskListView()
                    } else if !isAddingTask {
                        emptyState
                    }

                    // Completed section
                    if !taskStore.completedTasks.isEmpty {
                        completedSection
                    }
                }
                .padding()
            }
            .frame(maxHeight: 400)

            Divider()
                .background(Color.terminalBorder)

            // Footer
            footer
        }
        .frame(width: 320)
        .background(Color.terminalBg)
    }

    // MARK: - Header

    private var header: some View {
        HStack {
            Text("TodoBar")
                .font(.terminalTitle)
                .foregroundColor(.terminalText)

            Spacer()

            Button(action: { toggleAddTask() }) {
                Image(systemName: isAddingTask ? "xmark" : "plus")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(isAddingTask ? .terminalMuted : .terminalAccent)
            }
            .buttonStyle(.plain)
            .keyboardShortcut("n", modifiers: .command)
        }
        .padding()
    }

    // MARK: - Add Task Form

    private var addTaskForm: some View {
        VStack(spacing: 12) {
            // Text input
            TextField("What needs to be done?", text: $newTaskTitle)
                .font(.terminalBody)
                .textFieldStyle(.plain)
                .padding(10)
                .background(Color.terminalSurface)
                .clipShape(RoundedRectangle(cornerRadius: 6))
                .overlay(
                    RoundedRectangle(cornerRadius: 6)
                        .stroke(isInputFocused ? Color.terminalAccent : Color.terminalBorder, lineWidth: 1)
                )
                .focused($isInputFocused)
                .onSubmit {
                    addTask()
                }

            // Category picker
            HStack(spacing: 6) {
                ForEach(Category.allCases) { cat in
                    Button(action: { newTaskCategory = cat }) {
                        HStack(spacing: 3) {
                            Image(systemName: cat.icon)
                                .font(.system(size: 9))
                            Text(cat.rawValue)
                        }
                    }
                    .terminalButton(isActive: newTaskCategory == cat)
                    .buttonStyle(.plain)
                }

                Spacer()

                Button("Add") {
                    addTask()
                }
                .terminalButton(isActive: true)
                .buttonStyle(.plain)
                .disabled(newTaskTitle.trimmingCharacters(in: .whitespaces).isEmpty)
                .opacity(newTaskTitle.trimmingCharacters(in: .whitespaces).isEmpty ? 0.5 : 1)
            }
        }
        .padding()
        .background(Color.terminalSurface.opacity(0.5))
        .onAppear {
            isInputFocused = true
        }
    }

    // MARK: - Empty State

    private var emptyState: some View {
        VStack(spacing: 8) {
            Image(systemName: "checkmark.circle")
                .font(.system(size: 32))
                .foregroundColor(.terminalMuted)

            Text("All clear")
                .font(.terminalBody)
                .foregroundColor(.terminalMuted)

            Text("Press ⌘N to add a task")
                .font(.terminalSmall)
                .foregroundColor(Color.terminalMuted.opacity(0.7))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }

    // MARK: - Completed Section

    private var completedSection: some View {
        VStack(spacing: 8) {
            Button(action: { withAnimation { showingCompleted.toggle() } }) {
                HStack {
                    Image(systemName: showingCompleted ? "chevron.down" : "chevron.right")
                        .font(.system(size: 10, weight: .semibold))

                    Text("Completed")
                        .font(.terminalSmall)

                    Text("(\(taskStore.completedTasks.count))")
                        .font(.terminalSmall)
                        .foregroundColor(.terminalMuted)

                    Spacer()

                    if showingCompleted {
                        Button("Clear") {
                            taskStore.clearCompleted()
                        }
                        .font(.terminalMicro)
                        .foregroundColor(.terminalMuted)
                        .buttonStyle(.plain)
                    }
                }
                .foregroundColor(.terminalMuted)
            }
            .buttonStyle(.plain)

            if showingCompleted {
                ForEach(taskStore.completedTasks) { task in
                    TaskRowView(task: task, isCompleted: true)
                        .transition(.taskDeletion)
                }
            }
        }
        .padding(.top, 8)
    }

    // MARK: - Footer

    private var footer: some View {
        HStack {
            Text("\(taskStore.incompleteTasks.count) tasks")
                .font(.terminalSmall)
                .foregroundColor(.terminalMuted)

            Spacer()
        }
        .padding(.horizontal)
        .padding(.vertical, 10)
    }

    // MARK: - Actions

    private func toggleAddTask() {
        withAnimation(.easeOut(duration: 0.2)) {
            isAddingTask.toggle()
            if !isAddingTask {
                newTaskTitle = ""
                newTaskCategory = .today
            }
        }
    }

    private func addTask() {
        let title = newTaskTitle.trimmingCharacters(in: .whitespaces)
        guard !title.isEmpty else { return }

        taskStore.addTask(title, category: newTaskCategory)
        newTaskTitle = ""
        newTaskCategory = .today

        withAnimation(.easeOut(duration: 0.2)) {
            isAddingTask = false
        }
    }
}

#Preview {
    ContentView()
        .environment(TaskStore())
}
