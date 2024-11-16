public enum ChatTemplateName: Codable, CaseIterable {
    case chatml
    case llama
    case llama3
    case mistral
    case phi
    case smollm
    case gemma
    
    public var displayName: String {
        switch self {
        case .chatml: "ChatML"
        case .llama: "Llama"
        case .llama3: "Llama 3"
        case .mistral: "Mistral"
        case .phi: "Phi"
        case .smollm: "SmolLM"
        case .gemma: "Gemma"
        }
    }
}

@MainActor
public class ChatTemplate {
    public let stopToken: String
    public let applier: ([Message]) -> String

    public init(
        _ stopToken: String, _ applier: @escaping ([Message]) -> String
    ) {
        self.stopToken = stopToken
        self.applier = applier
    }

    public func apply(_ messages: [Message]) -> String {
        return applier(messages)
    }

    public static let chatml = ChatTemplate("<|im_end|>") { messages in
        var result = ""
        for message in messages {
            result += "<|im_start|>"
            switch message.role {
            case .system: result += "system\n"
            case .user: result += "user\n"
            case .assistant: result += "assistant\n"
            }
            result += "\(message.content)<|im_end|>\n"
        }
        result += "<|im_start|>assistant\n"
        return result
    }

    public static let llama = ChatTemplate("</s>") { messages in
        var result = ""
        for message in messages {
            result += "[INST] "
            switch message.role {
            case .system: result += "<<SYS>>\n"
            case .user: result += ""
            case .assistant: result += ""
            }
            result += message.content
            switch message.role {
            case .system: result += "\n<</SYS>>\n\n"
            case .user: result += ""
            case .assistant: result += ""
            }
            result += "[/INST]"
        }
        result += "\n"
        return result
    }

    public static let llama3 = ChatTemplate("<|eot_id|>") { messages in
        var result = ""
        for message in messages {
            result += "<|start_header_id|>"
            switch message.role {
            case .system: result += "system"
            case .user: result += "user"
            case .assistant: result += "assistant"
            }
            result += "<|end_header_id|>\n\n\(message.content)<|eot_id|>"
        }
        result += "<|start_header_id|>assistant<|end_header_id|>\n\n"
        return result
    }

    public static let mistral = ChatTemplate("</s>") { messages in
        var result = ""
        for message in messages {
            result += "[INST]"
            switch message.role {
            case .system: result += ""
            case .user: result += ""
            case .assistant: result += ""
            }
            result += message.content
            switch message.role {
            case .system: result += ""
            case .user: result += ""
            case .assistant: result += ""
            }
            result += "[/INST]"
        }
        result += "\n"
        return result
    }

    public static let phi = ChatTemplate("<|end|>") { messages in
        var result = ""
        for message in messages {
            switch message.role {
            case .system: result += "<|system|>"
            case .user: result += "<|user|>"
            case .assistant: result += "<|assistant|>"
            }
            result += message.content
            switch message.role {
            case .system: result += "<|end|>\n"
            case .user: result += "<|end|>\n"
            case .assistant: result += "<|end|>\n"
            }
        }
        result += "<|assistant|>"
        return result
    }

    public static let smollm = ChatTemplate("<|im_end|>") { messages in
        var result = ""
        for message in messages {
            result += "<|im_start|>"
            switch message.role {
            case .system: result += "system\n"
            case .user: result += "user\n"
            case .assistant: result += "assistant\n"
            }
            result += "\(message.content)<|im_end|>\n"
        }
        result += "<|im_start|>assistant\n"
        return result
    }

    public static let gemma = ChatTemplate("<|end|>") { messages in
        var result = ""
        var systemPrompt = ""
        for message in messages {
            if message.role == .system {
                systemPrompt = message.content
                continue
            }
            let role = message.role == .user ? "user" : "model"
            result += "<start_of_turn>\(role)\n"
            if systemPrompt != "" && message.role != .assistant {
                result += "\(systemPrompt)\n\n"
                systemPrompt = ""
            }
            result += "\(message.content)<end_of_turn>\n"
        }
        result += "<start_of_turn>model\n"
        return result
    }
}
