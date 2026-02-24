import SwiftUI

struct TaskListView: View {
    @Environment(TaskStore.self) private var taskStore

    var body: some View {
        VStack(spacing: 16) {
            ForEach(Category.allCases) { category in
                let tasks = taskStore.tasks(for: category)

                if !tasks.isEmpty {
                    categorySection(category: category, tasks: tasks)
                }
            }
        }
    }

    @ViewBuilder
    private func categorySection(category: Category, tasks: [TodoTask]) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            // Category header
            HStack(spacing: 6) {
                Image(systemName: category.icon)
                    .font(.system(size: 10))
                    .foregroundColor(category.color)

                Text(category.rawValue)
                    .font(.terminalSmall)
                    .foregroundColor(category.color)

                Text("(\(tasks.count))")
                    .font(.terminalMicro)
                    .foregroundColor(.terminalMuted)
            }

            // Tasks
            VStack(spacing: 4) {
                ForEach(tasks) { task in
                    TaskRowView(task: task)
                        .transition(.taskInsertion)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

#Preview {
    TaskListView()
        .environment(TaskStore())
        .padding()
        .background(Color.terminalBg)
}
