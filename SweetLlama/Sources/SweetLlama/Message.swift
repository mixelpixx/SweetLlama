import Foundation

public enum MessageRole: Codable {
    case system
    case user
    case assistant
}

public class Message: Identifiable, ObservableObject, Codable {
    public let id: UUID
    public let role: MessageRole
    @Published public var content: String
    
    public init(role: MessageRole, content: String) {
        self.id = UUID()
        self.role = role
        self.content = content
    }
    
    public func appendContent(delta: String) {
        content += delta
    }
    
    public enum CodingKeys: CodingKey {
        case id, role, content
    }
    
    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(UUID.self, forKey: .id)
        role = try container.decode(MessageRole.self, forKey: .role)
        content = try container.decode(String.self, forKey: .content)
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(role, forKey: .role)
        try container.encode(content, forKey: .content)
    }
}
