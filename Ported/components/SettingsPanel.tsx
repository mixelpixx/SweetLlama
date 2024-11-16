import React from 'react';
import { CommonParams, MirostatType, ChatTemplateName } from '../types';

interface SettingsPanelProps {
  params: CommonParams;
  onUpdateParams: (updates: Partial<CommonParams>) => void;
  onUpdateSamplerParams: (updates: Partial<CommonParams['samplerParams']>) => void;
  templateName: ChatTemplateName;
  onTemplateChange: (template: ChatTemplateName) => void;
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  params,
  onUpdateParams,
  onUpdateSamplerParams,
  templateName,
  onTemplateChange,
  systemPrompt,
  onSystemPromptChange,
}) => {
  return (
    <div className="settings-panel">
      <div className="settings-section">
        <h3>Template</h3>
        <select
          value={templateName}
          onChange={(e) => onTemplateChange(e.target.value as ChatTemplateName)}
        >
          {Object.values(ChatTemplateName).map((template) => (
            <option key={template} value={template}>
              {template}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-section">
        <h3>System Prompt</h3>
        <textarea
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          rows={4}
        />
      </div>

      <div className="settings-section">
        <h3>Sampling Parameters</h3>
        <div className="setting-item">
          <label>Temperature</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={params.samplerParams.temperature}
            onChange={(e) =>
              onUpdateSamplerParams({ temperature: parseFloat(e.target.value) })
            }
          />
          <span>{params.samplerParams.temperature}</span>
        </div>

        <div className="setting-item">
          <label>Top K</label>
          <input
            type="number"
            min="0"
            value={params.samplerParams.topK}
            onChange={(e) =>
              onUpdateSamplerParams({ topK: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="setting-item">
          <label>Top P</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={params.samplerParams.topP}
            onChange={(e) =>
              onUpdateSamplerParams({ topP: parseFloat(e.target.value) })
            }
          />
          <span>{params.samplerParams.topP}</span>
        </div>

        <div className="setting-item">
          <label>Mirostat</label>
          <select
            value={params.samplerParams.mirostat}
            onChange={(e) =>
              onUpdateSamplerParams({ mirostat: e.target.value as MirostatType })
            }
          >
            {Object.values(MirostatType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Model Parameters</h3>
        <div className="setting-item">
          <label>Context Size (n_ctx)</label>
          <input
            type="number"
            min="512"
            max="8192"
            step="512"
            value={params.nCTX}
            onChange={(e) => onUpdateParams({ nCTX: parseInt(e.target.value) })}
          />
        </div>

        <div className="setting-item">
          <label>Batch Size</label>
          <input
            type="number"
            min="1"
            max="2048"
            value={params.nBatch}
            onChange={(e) => onUpdateParams({ nBatch: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
};
