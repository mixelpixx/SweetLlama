import { useState, useCallback } from 'react';
import { llmService } from '../services/llm';
import { CommonParams } from '../types';

export function useLLM(modelPath: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (params: CommonParams) => {
    try {
      setIsLoading(true);
      setError(null);
      await llmService.load(modelPath, params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load model');
    } finally {
      setIsLoading(false);
    }
  }, [modelPath]);

  const predict = useCallback(async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);
      let result = '';
      const iterator = await llmService.predict(text);
      
      while (true) {
        const { value, done } = await iterator.next();
        if (done) break;
        result += value;
      }
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to predict');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stop = useCallback(() => {
    llmService.stop();
  }, []);

  return {
    load,
    predict,
    stop,
    isLoading,
    error
  };
}
