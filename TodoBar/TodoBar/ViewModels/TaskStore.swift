import Foundation
import SwiftUI

@Observable
class TaskStore {
    var tasks: [TodoTask] = []

    private let storage = JSONStorage()

    init() {
        loadTasks()
    }

    // MARK: - Computed Properties

    var incompleteTasks: [TodoTask] {
        tasks.filter { !$0.completed }
    }

    var completedTasks: [TodoTask] {
        tasks.filter { $0.completed }
    }

    func tasks(for category: Category) -> [TodoTask] {
        incompleteTasks.filter { $0.category == category }
    }

    var hasIncompleteTasks: Bool {
        !incompleteTasks.isEmpty
    }

    // MARK: - Actions

    func addTask(_ title: String, category: Category, dueDate: Date? = nil) {
        let task = TodoTask(
            title: title,
            category: category,
            dueDate: dueDate
        )
        withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
            tasks.insert(task, at: 0)
        }
        saveTasks()
    }

    func toggleComplete(_ task: TodoTask) {
        guard let index = tasks.firstIndex(where: { $0.id == task.id }) else { return }

        withAnimation(.easeOut(duration: 0.5)) {
            tasks[index].completed.toggle()
            tasks[index].completedAt = tasks[index].completed ? Date() : nil
        }
        saveTasks()
    }

    func deleteTask(_ task: TodoTask) {
        withAnimation(.easeOut(duration: 0.3)) {
            tasks.removeAll { $0.id == task.id }
        }
        saveTasks()
    }

    func updateTask(_ task: TodoTask, title: String? = nil, category: Category? = nil, dueDate: Date?? = nil) {
        guard let index = tasks.firstIndex(where: { $0.id == task.id }) else { return }

        if let title = title {
            tasks[index].title = title
        }
        if let category = category {
            tasks[index].category = category
        }
        if let dueDate = dueDate {
            tasks[index].dueDate = dueDate
        }
        saveTasks()
    }

    func clearCompleted() {
        withAnimation(.easeOut(duration: 0.3)) {
            tasks.removeAll { $0.completed }
        }
        saveTasks()
    }

    // MARK: - Persistence

    private func loadTasks() {
        tasks = storage.load() ?? []
    }

    private func saveTasks() {
        storage.save(tasks)
    }
}
