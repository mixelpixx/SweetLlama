let llamaModule;
let context;

self.importScripts('/llama.js');

self.onmessage = async function(e) {
  const { type, ...data } = e.data;
  
  switch (type) {
    case 'load':
      try {
        llamaModule = await createLlamaModule();
        context = await llamaModule.createContext(data.modelPath, data.params);
        self.postMessage({ type: 'loaded' });
      } catch (error) {
        self.postMessage({ type: 'error', error: error.message });
      }
      break;
      
    case 'predict':
      try {
        if (!context) throw new Error('Context not initialized');
        
        const tokens = await context.predict(data.text, {
          onToken: (token) => {
            self.postMessage({ type: 'token', token });
          }
        });
        
        self.postMessage({ type: 'done' });
      } catch (error) {
        self.postMessage({ type: 'error', error: error.message });
      }
      break;
      
    case 'stop':
      if (context) {
        context.interrupt();
      }
      break;
  }
};
