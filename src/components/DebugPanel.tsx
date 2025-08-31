import { useState } from 'react';
import { mcpService } from '../services/mcpService';
import { llmService } from '../services/llmService';

function DebugPanel() {
  const [debugOutput, setDebugOutput] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  const testDirectLLM = async () => {
    setDebugOutput('Testing direct LLM service...\n');
    try {
      const questions = await llmService.generateQuestions(3);
      setDebugOutput(prev => prev + `✅ Direct LLM test successful!\n${JSON.stringify(questions, null, 2)}\n\n`);
    } catch (error) {
      setDebugOutput(prev => prev + `❌ Direct LLM test failed: ${error}\n\n`);
    }
  };

  const testMCPService = async () => {
    setDebugOutput('Testing MCP service...\n');
    try {
      await mcpService.connect();
      const questions = await mcpService.generateQuestions(3);
      setDebugOutput(prev => prev + `✅ MCP test successful!\n${JSON.stringify(questions, null, 2)}\n\n`);
    } catch (error) {
      setDebugOutput(prev => prev + `❌ MCP test failed: ${error}\n\n`);
    }
  };

  const checkEnvironment = () => {
    const apiKey = (import.meta as any).env?.VITE_ANTHROPIC_API_KEY;
    setDebugOutput(`Environment Check:\n- API Key exists: ${!!apiKey}\n- API Key format: ${apiKey?.startsWith('sk-ant-') ? 'Valid' : 'Invalid'}\n- API Key length: ${apiKey?.length || 0}\n\n`);
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#646cff',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        🔧 Debug
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      maxHeight: '500px',
      background: 'white',
      border: '2px solid #646cff',
      borderRadius: '10px',
      padding: '15px',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, color: '#646cff' }}>🔧 Debug Panel</h3>
        <button onClick={() => setIsVisible(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button onClick={checkEnvironment} style={{ padding: '5px 10px', border: '1px solid #646cff', borderRadius: '3px', cursor: 'pointer' }}>
          Check Env
        </button>
        <button onClick={testDirectLLM} style={{ padding: '5px 10px', border: '1px solid #646cff', borderRadius: '3px', cursor: 'pointer' }}>
          Test LLM
        </button>
        <button onClick={testMCPService} style={{ padding: '5px 10px', border: '1px solid #646cff', borderRadius: '3px', cursor: 'pointer' }}>
          Test MCP
        </button>
        <button onClick={() => setDebugOutput('')} style={{ padding: '5px 10px', border: '1px solid #ff6b6b', borderRadius: '3px', cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      
      <pre style={{
        background: '#f5f5f5',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        maxHeight: '300px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap'
      }}>
        {debugOutput || 'Click buttons above to test integration...'}
      </pre>
    </div>
  );
}

export default DebugPanel;
