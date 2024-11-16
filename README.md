# SweetLlama

This is a simple wrapper written in Swift for
[llama.cpp](https://github.com/ggerganov/llama.cpp).

## Install

```swift
.package(url: "https://github.com/DroganCintam/SweetLlama.git", branch: "main")
```

## Usage

See the CLI example or have a look at the following snippets.

### Simple

```swift
func useLLM() {
    let modelPath = "path/to/model.gguf"
    let state = await load(modelPath)
    guard let state = state else { return }

    let prompt = "To be or not to be."
    print(prompt, terminator: "")
    do {
        for try await result in await state.predict(text: prompt) {
            print(result, terminator: "")
        }
    } catch {
        print("Error: \(error)")
    }
}

@LlmActor
static func load(_ modelPath: String) -> LlmState? {
    let params: CommonParams = .init(
        seed: UInt32.random(in: (UInt32.min...UInt32.max)))
    let state = try? LlmState.create(modelPath: modelPath, params: params)
    return state
}
```

### Advanced

The main class is `LLM`, with the following methods:

```swift
// Load models, creates context and sampler
func load(modelPath: String, params: CommonParams) throws

// Unloads model and frees resources
func unload()

// Processes the prompt and prepares for prediction
func acceptPrompt(_ prompt: String) throws

// Predicts the next token
func predict() throws -> String

// Interrupts the prediction
func interrupt()
```

For easy usage, there is `LlmState` which handles
all the details and exposes the following interface:

```swift
// Creates an LlmState instance
static func create(modelPath: String, params: CommonParams) throws -> LlmState

// Takes a prompt and returns a stream that yields prediction strings
func predict(text: String, cooldownMs: Int = 0) -> AsyncThrowingStream<String, Error>

// Interrupts the prediction
func stop()
```

## Contribute

I'm a beginner in Swift (and LLM) and I'm still learning.
If you have any suggestions or improvements, feel free to
open an issue or a PR. Thank you!

## Other notes

### Why the name?

It could have been SwiftLlama, but that name is already taken.

### Inspiration

This project came to life after several nights of trial and error
while studying code from:

- [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
- [mybigday/llama.rn](https://github.com/mybigday/llama.rn)
- [ShenghaiWang/SwiftLlama](https://github.com/ShenghaiWang/SwiftLlama)
- [SciSharp/LLamaSharp](https://github.com/SciSharp/LLamaSharp)
