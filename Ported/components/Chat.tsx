import React, { useState } from 'react';
import { Message, MessageRole, ChatTemplateName } from '../types';
import { useLLM } from '../hooks/useLLM';
import { useChat } from '../hooks/useChat';
import { useSettings } from '../hooks/useSettings';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { SettingsPanel } from './SettingsPanel';

interface ChatProps {
  modelPath: string;
  initialSystemPrompt?: string;
}

export const Chat: React.FC<ChatProps> = ({
  modelPath,
  initialSystemPrompt = "You are an assistant."
}) => {
  const [templateName, setTemplateName] = useState(ChatTemplateName.ChatML);
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt);
  const { predict, isLoading, error } = useLLM(modelPath);
  const { messages, addMessage, getPrompt } = useChat({ systemPrompt, templateName });
  const { params, updateParams, updateSamplerParams } = useSettings();

  const handleSubmit = async (content: string) => {
    addMessage(MessageRole.User, content);

    try {
      const prompt = getPrompt();
      const response = await predict(prompt);
      addMessage(MessageRole.Assistant, response);
    } catch (err) {
      console.error('Prediction failed:', err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <MessageList messages={messages} loading={isLoading} />
        <MessageInput onSubmit={handleSubmit} disabled={isLoading} />
        {error && <div className="error">{error}</div>}
      </div>
      <SettingsPanel
        params={params}
        onUpdateParams={updateParams}
        onUpdateSamplerParams={updateSamplerParams}
        templateName={templateName}
        onTemplateChange={setTemplateName}
        systemPrompt={systemPrompt}
        onSystemPromptChange={setSystemPrompt}
      />
    </div>
  );
};
