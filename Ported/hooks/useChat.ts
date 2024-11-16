import { useState, useCallback } from 'react';
import { Message, MessageRole, ChatTemplateName } from '../types';
import { ChatTemplate } from '../utils/chatTemplate';

interface UseChatProps {
  systemPrompt?: string;
  templateName?: ChatTemplateName;
}

export function useChat({ 
  systemPrompt = "You are an assistant.",
  templateName = ChatTemplateName.ChatML 
}: UseChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: MessageRole.System, content: systemPrompt }
  ]);

  const addMessage = useCallback((role: MessageRole, content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      content
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([{ id: '0', role: MessageRole.System, content: systemPrompt }]);
  }, [systemPrompt]);

  const getPrompt = useCallback(() => {
    const template = ChatTemplate.templates[templateName];
    return template.apply(messages);
  }, [messages, templateName]);

  return {
    messages,
    addMessage,
    removeMessage,
    clearMessages,
    getPrompt
  };
}
