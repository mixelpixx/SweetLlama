import Foundation

public class Conversation: ObservableObject, Codable {
    @Published public var title: String
    @Published public var messages: [Message]
    
    public init() {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyMMdd HH:mm"
        let formattedDate = dateFormatter.string(from: Date.now)
        self.title = "Chat \(formattedDate)"
        
        self.messages = [
            Message(role: .system, content: "You are an assistant."),
        ]
    }
    
    public func addMessage(role: MessageRole, content: String) {
        messages.append(Message(role: role, content: content))
    }
    
    public func addMessage(_ message: Message) {
        messages.append(message)
    }
    
    public func removeMessage(_ message: Message) {
        if let index = messages.firstIndex(where: { msg in
            msg.id == message.id
        }) {
            messages.remove(at: index)
        }
    }
    
    public func clear() {
        messages.removeLast(messages.count - 1)
    }
    
    public enum CodingKeys: CodingKey {
        case title, messages
    }
    
    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        title = try container.decode(String.self, forKey: .title)
        messages = try container.decode([Message].self, forKey: .messages)
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(title, forKey: .title)
        try container.encode(messages, forKey: .messages)
    }
}
