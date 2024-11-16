import { CommonParams, SamplerParams } from '../types';

interface LLMError extends Error {
  code: 'FAILED_TO_LOAD' | 'FAILED_TO_CREATE_CONTEXT' | 'FAILED_TO_CREATE_SAMPLER' | 'NOT_LOADED';
}

export class LLMService {
  private worker: Worker | null = null;
  private modelPath: string = '';
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.worker = new Worker('/llama.worker.js');
    }
  }

  async load(modelPath: string, params: CommonParams): Promise<void> {
    if (!this.worker) throw new Error('Worker not initialized');
    
    this.modelPath = modelPath;
    return new Promise((resolve, reject) => {
      if (!this.worker) return reject(new Error('Worker not initialized'));
      
      this.worker.onmessage = (e) => {
        if (e.data.type === 'loaded') resolve();
        else if (e.data.type === 'error') reject(new Error(e.data.error));
      };
      
      this.worker.postMessage({
        type: 'load',
        modelPath,
        params
      });
    });
  }

  async predict(text: string): Promise<AsyncIterator<string>> {
    if (!this.worker) throw new Error('Worker not initialized');
    
    return {
      next: () => {
        return new Promise((resolve, reject) => {
          if (!this.worker) return reject(new Error('Worker not initialized'));
          
          this.worker.onmessage = (e) => {
            if (e.data.type === 'token') {
              resolve({ value: e.data.token, done: false });
            } else if (e.data.type === 'done') {
              resolve({ value: undefined, done: true });
            } else if (e.data.type === 'error') {
              reject(new Error(e.data.error));
            }
          };
          
          this.worker.postMessage({
            type: 'predict',
            text
          });
        });
      }
    };
  }

  stop(): void {
    if (this.worker) {
      this.worker.postMessage({ type: 'stop' });
    }
  }
}

export const llmService = new LLMService();
