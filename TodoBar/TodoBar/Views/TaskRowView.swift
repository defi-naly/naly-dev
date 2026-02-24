import SwiftUI

struct TaskRowView: View {
    let task: TodoTask
    var isCompleted: Bool = false

    @Environment(TaskStore.self) private var taskStore
    @State private var isHovering = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        HStack(spacing: 10) {
            // Checkbox
            Button(action: { taskStore.toggleComplete(task) }) {
                ZStack {
                    RoundedRectangle(cornerRadius: 4)
                        .stroke(checkboxBorderColor, lineWidth: 1.5)
                        .frame(width: 18, height: 18)

                    if task.completed {
                        Image(systemName: "checkmark")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.terminalSuccess)
                    }
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(.borderless)

            // Title
            Text(task.title)
                .font(.terminalBody)
                .foregroundColor(task.completed ? .terminalMuted : .terminalText)
                .strikethrough(task.completed, color: .terminalMuted)
                .lineLimit(2)
                .frame(maxWidth: .infinity, alignment: .leading)

            // Due date badge
            if let dueDate = task.dueDate, !task.completed {
                dueDateBadge(dueDate)
            }

            // Delete button (on hover)
            if isHovering && !isCompleted {
                Button(action: { taskStore.deleteTask(task) }) {
                    Image(systemName: "xmark")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(.terminalMuted)
                }
                .buttonStyle(.plain)
                .transition(.opacity)
            }
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
        .background(
            RoundedRectangle(cornerRadius: 6)
                .fill(isHovering ? Color.terminalSurface : Color.clear)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 6)
                .stroke(task.isOverdue ? Color.terminalError.opacity(0.5) : Color.clear, lineWidth: 1)
        )
        .onHover { hovering in
            withAnimation(.easeInOut(duration: 0.15)) {
                isHovering = hovering
            }
        }
        .opacity(task.completed ? 0.7 : 1.0)
        .scaleEffect(task.completed ? 0.98 : 1.0)
        .animation(reduceMotion ? nil : .taskComplete, value: task.completed)
    }

    private var checkboxBorderColor: Color {
        if task.completed {
            return .terminalSuccess
        } else if task.isOverdue {
            return .terminalError
        } else {
            return .terminalBorder
        }
    }

    @ViewBuilder
    private func dueDateBadge(_ date: Date) -> some View {
        let isOverdue = task.isOverdue
        let formatter = relativeDateFormatter()
        let text = formatter.localizedString(for: date, relativeTo: Date())

        HStack(spacing: 4) {
            if isOverdue {
                Circle()
                    .fill(Color.terminalError)
                    .frame(width: 4, height: 4)
            }

            Text(text)
                .font(.terminalMicro)
        }
        .foregroundColor(isOverdue ? .terminalError : .terminalMuted)
        .padding(.horizontal, 6)
        .padding(.vertical, 2)
        .background(
            RoundedRectangle(cornerRadius: 3)
                .fill(isOverdue ? Color.terminalError.opacity(0.15) : Color.terminalBorder.opacity(0.5))
        )
    }

    private func relativeDateFormatter() -> RelativeDateTimeFormatter {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .abbreviated
        return formatter
    }
}

#Preview {
    VStack(spacing: 8) {
        TaskRowView(task: TodoTask(title: "Regular task", category: .today))
        TaskRowView(task: TodoTask(title: "With due date", category: .today, dueDate: Date().addingTimeInterval(3600)))
        TaskRowView(task: TodoTask(title: "Overdue task", category: .today, dueDate: Date().addingTimeInterval(-86400)))
        TaskRowView(task: TodoTask(title: "Completed task", completed: true, category: .today))
    }
    .padding()
    .background(Color.terminalBg)
    .environment(TaskStore())
}
