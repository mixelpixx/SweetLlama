# SweetLlama React Integration

This directory contains React components and utilities for integrating with the SweetLlama Swift backend to create chat applications powered by local LLMs.

## Prerequisites

- Node.js 16+ and npm/yarn
- A compatible GGUF model file (e.g., Llama, Mistral, Gemma)
- The SweetLlama Swift backend compiled and running

## Quick Start

1. Create a new React project:
npx create-react-app my-llm-app --template typescript cd my-llm-app

2. Install required dependencies:
npm install @types/react @types/react-dom typescript

3. Copy the Ported files:
   - Copy all folders from `Ported/` into your `src/` directory:
     - components/
     - hooks/
     - services/
     - types/
     - utils/

4. Copy the worker file:
   - Copy `public/llama.worker.js` to your project's `public/` directory
   - Ensure your project has the required WASM bindings for llama.cpp



src/ 📁
├── components/ 📁
│   ├── Chat.tsx 📄
│   ├── MessageInput.tsx 📄
│   ├── MessageList.tsx 📄
│   └── SettingsPanel.tsx 📄
├── hooks/ 📁
│   ├── useChat.ts 📄
│   ├── useLLM.ts 📄
│   └── useSettings.ts 📄
├── services/ 📁
│   └── llm.ts 📄
├── types/ 📁
│   └── index.ts 📄
└── utils/ 📁
    └── chatTemplate.ts 📄
## Configuration

### Model Settings

The LLM can be configured through the `CommonParams` interface:

interface CommonParams { nPredict: number; // Max tokens to predict (-1 for unlimited) nCTX: number; // Context window size nBatch: number; // Batch size for processing nThreads: number; // Number of threads (-1 for auto) // … other parameters }

### Chat Templates

Supported chat templates:
- ChatML
- Llama
- Llama3
- Mistral
- Phi
- SmolLM
- Gemma

Select the appropriate template based on your model:

import { ChatTemplateName } from './types';


## API Reference

### Chat Component

interface ChatProps { modelPath: string; // Path to GGUF model file initialSystemPrompt?: string; // Initial system message }

### Hooks

#### useLLM
const { predict, isLoading, error } = useLLM(modelPath);

#### useChat
const { messages, addMessage, getPrompt } = useChat({ systemPrompt, templateName });

#### useSettings
const { params, updateParams, updateSamplerParams } = useSettings();

## Worker Setup

The `llama.worker.js` file must be placed in your `public/` directory. This worker handles the communication between the React frontend and the llama.cpp WASM bindings.

Ensure your project has the necessary WASM bindings and the worker is properly configured to access them.

## Troubleshooting

Common issues:

1. Worker not loading
   - Ensure `llama.worker.js` is in the public directory
   - Check browser console for CORS errors
   - Verify WASM bindings are accessible

2. Model loading fails
   - Verify model path is correct
   - Check model format is compatible (GGUF)
   - Ensure sufficient memory is available

3. Type errors
   - Run `tsc --noEmit` to check for type issues
   - Verify all dependencies are installed
   - Check TypeScript configuration

## Contributing

Feel free to submit issues and pull requests to improve the integration.

## License

This project is licensed under the same terms as the SweetLlama project.
