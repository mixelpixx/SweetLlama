export enum MessageRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export interface CommonParams {
  nPredict: number;
  nCTX: number;
  nBatch: number;
  nUBatch: number;
  nKeep: number;
  nGpuLayers: number;
  nThreads: number;
  samplerParams: SamplerParams;
  antiprompt: string[];
  flashAttn: boolean;
  noPerf: boolean;
  useMmap: boolean;
  useMlock: boolean;
  seed: number;
}

export interface SamplerParams {
  temperature: number;
  topK: number;
  topP: number;
  minP: number;
  minKeep: number;
  xtcThreshold: number;
  xtcProbability: number;
  typicalP: number;
  penaltyLastN: number;
  penaltyRepeat: number;
  penaltyFrequency: number;
  penaltyPresent: number;
  dryMultiplier: number;
  dryBase: number;
  dryAllowedLength: number;
  dryPenaltyLastN: number;
  mirostat: MirostatType;
  mirostatTau: number;
  mirostatEta: number;
}

export enum MirostatType {
  None = 'none',
  V1 = 'v1',
  V2 = 'v2'
}

export enum ChatTemplateName {
  ChatML = 'chatml',
  Llama = 'llama',
  Llama3 = 'llama3',
  Mistral = 'mistral',
  Phi = 'phi',
  SmolLM = 'smollm',
  Gemma = 'gemma'
}
