import Foundation
import SweetLlama

@main
struct SweetLlamaCLI {
    @LlmActor
    static func loadModel(_ modelPath: String) -> LlmState? {
        let params: CommonParams = .init(
            seed: UInt32.random(in: (UInt32.min...UInt32.max)))
        let state = try? LlmState.create(modelPath: modelPath, params: params)
        return state
    }

    static func main() async {
        let modelPath =
            CommandLine.arguments.count > 1
            ? CommandLine.arguments[1] : "model.gguf"
        let state = await loadModel(modelPath)
        guard let state = state else {
            print("Failed to create LLM state")
            exit(1)
        }

        let system =
            CommandLine.arguments.count > 2
            ? CommandLine.arguments[2] : "You are an assistant."

        var messages: [Message] = [
            .init(role: .system, content: system)
        ]

        print("SweetLlama Chat Test. Enter your message below.")
        print("\tEnter /exit to quit")
        print("\tEnter /reset to reset the context\n")
        while true {
            print(">>> ", terminator: "")
            guard let input = readLine() else {
                continue
            }
            if input == "/exit" {
                break
            } else if input == "/reset" {
                messages = [
                    .init(role: .system, content: system)
                ]
                print("--- Context reset ---")
                continue
            }
            messages.append(.init(role: .user, content: input))
            let text = ChatTemplate.gemma.apply(messages)
            var response = ""
            do {
                for try await piece in await state.predict(text: text) {
                    print(piece, terminator: "")
                    response += piece
                }
            } catch {
                print("Failed to predict: \(error)")
            }
            print("\n", terminator: "")
            messages.append(.init(role: .assistant, content: response))
        }
    }
}
