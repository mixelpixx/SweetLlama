import { Message, ChatTemplateName } from '../types';

export class ChatTemplate {
  constructor(
    private stopToken: string,
    private applier: (messages: Message[]) => string
  ) {}

  apply(messages: Message[]): string {
    return this.applier(messages);
  }

  static readonly templates: Record<ChatTemplateName, ChatTemplate> = {
    [ChatTemplateName.ChatML]: new ChatTemplate('<|im_end|>', (messages) => {
      let result = '';
      for (const message of messages) {
        result += '<|im_start|>';
        result += `${message.role}\n${message.content}<|im_end|>\n`;
      }
      result += '<|im_start|>assistant\n';
      return result;
    }),

    [ChatTemplateName.Gemma]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'model';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>model\n';
      return result;
    }),

    [ChatTemplateName.Llama]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'assistant';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>assistant\n';
      return result;
    }),

    [ChatTemplateName.Llama3]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'assistant';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>assistant\n';
      return result;
    }),

    [ChatTemplateName.Mistral]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'assistant';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>assistant\n';
      return result;
    }),

    [ChatTemplateName.Phi]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'assistant';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>assistant\n';
      return result;
    }),

    [ChatTemplateName.SmolLM]: new ChatTemplate('<|end|>', (messages) => {
      let result = '';
      let systemPrompt = '';
      
      for (const message of messages) {
        if (message.role === 'system') {
          systemPrompt = message.content;
          continue;
        }
        const role = message.role === 'user' ? 'user' : 'assistant';
        result += `<start_of_turn>${role}\n`;
        if (systemPrompt && message.role !== 'assistant') {
          result += `${systemPrompt}\n\n`;
          systemPrompt = '';
        }
        result += `${message.content}<end_of_turn>\n`;
      }
      result += '<start_of_turn>assistant\n';
      return result;
    }),
  };
}
