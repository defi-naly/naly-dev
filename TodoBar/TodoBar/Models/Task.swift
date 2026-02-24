import Foundation

struct TodoTask: Identifiable, Codable, Equatable {
    let id: UUID
    var title: String
    var completed: Bool
    var category: Category
    var dueDate: Date?
    var completedAt: Date?
    var createdAt: Date

    init(
        id: UUID = UUID(),
        title: String,
        completed: Bool = false,
        category: Category = .today,
        dueDate: Date? = nil,
        completedAt: Date? = nil,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.title = title
        self.completed = completed
        self.category = category
        self.dueDate = dueDate
        self.completedAt = completedAt
        self.createdAt = createdAt
    }

    var isOverdue: Bool {
        guard let dueDate = dueDate, !completed else { return false }
        return dueDate < Date()
    }
}
