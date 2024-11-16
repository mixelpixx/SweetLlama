import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole, ChatTemplateName } from '../types';
import { useLLM } from '../hooks/useLLM';
import { ChatTemplate } from '../utils/chatTemplate';

interface ChatProps {
  modelPath: string;
  systemPrompt?: string;
  templateName?: ChatTemplateName;
}

export const Chat: React.FC<ChatProps> = ({ 
  modelPath, 
  systemPrompt = "You are an assistant.",
  templateName = ChatTemplateName.ChatML
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: MessageRole.System, content: systemPrompt }
  ]);
  const [input, setInput] = useState('');
  const { predict, isLoading, error } = useLLM(modelPath);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: MessageRole.User,
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const template = ChatTemplate.templates[templateName];
      const prompt = template.apply(messages);
      const response = await predict(prompt);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.Assistant,
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Prediction failed:', err);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
