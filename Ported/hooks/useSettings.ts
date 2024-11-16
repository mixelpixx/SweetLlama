import { useState, useCallback } from 'react';
import { CommonParams, SamplerParams, MirostatType } from '../types';

const DEFAULT_COMMON_PARAMS: CommonParams = {
  nPredict: -1,
  nCTX: 4096,
  nBatch: 512,
  nUBatch: 512,
  nKeep: 0,
  nGpuLayers: -1,
  nThreads: -1,
  samplerParams: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    minP: 0.05,
    minKeep: 0,
    xtcThreshold: 0.1,
    xtcProbability: 0.0,
    typicalP: 1.0,
    penaltyLastN: 64,
    penaltyRepeat: 1.0,
    penaltyFrequency: 0.0,
    penaltyPresent: 0.0,
    dryMultiplier: 0.0,
    dryBase: 1.75,
    dryAllowedLength: 2,
    dryPenaltyLastN: -1,
    mirostat: MirostatType.None,
    mirostatTau: 5.0,
    mirostatEta: 0.1
  },
  antiprompt: [],
  flashAttn: false,
  noPerf: false,
  useMmap: true,
  useMlock: false,
  seed: Math.floor(Math.random() * 4294967295)
};

export function useSettings(initialParams?: Partial<CommonParams>) {
  const [params, setParams] = useState<CommonParams>({
    ...DEFAULT_COMMON_PARAMS,
    ...initialParams
  });

  const updateParams = useCallback((updates: Partial<CommonParams>) => {
    setParams(prev => ({ ...prev, ...updates }));
  }, []);

  const updateSamplerParams = useCallback((updates: Partial<SamplerParams>) => {
    setParams(prev => ({
      ...prev,
      samplerParams: { ...prev.samplerParams, ...updates }
    }));
  }, []);

  const resetParams = useCallback(() => {
    setParams(DEFAULT_COMMON_PARAMS);
  }, []);

  return {
    params,
    updateParams,
    updateSamplerParams,
    resetParams
  };
}
