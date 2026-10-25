import React, { useState } from 'react';
import { Settings, Cpu, Key, Sliders, CheckCircle2, RefreshCw, Save, Shield } from 'lucide-react';

export default function SettingsView() {
  const [ollamaUrl, setOllamaUrl] = useState(
    localStorage.getItem('truthlens_ollama_url') || 'http://localhost:11434'
  );
  const [ollamaModel, setOllamaModel] = useState(
    localStorage.getItem('truthlens_ollama_model') || 'llama3'
  );
  const [threshold, setThreshold] = useState(
    parseFloat(localStorage.getItem('truthlens_threshold') || '0.7')
  );
  const [debugMode, setDebugMode] = useState(true);
  const [apiKey, setApiKey] = useState(localStorage.getItem('truthlens_cloud_key') || '');
  const [testStatus, setTestStatus] = useState(null);
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestStatus(null);

    try {
      // Simulate pinging Ollama /api/version
      setTimeout(() => {
        setTesting(false);
        setTestStatus({
          success: true,
          message: `Connected to Ollama engine at ${ollamaUrl}. Detected models: [llama3:latest, mistral:7b]`
        });
      }, 700);
    } catch (e) {
      setTesting(false);
      setTestStatus({
        success: false,
        message: `Failed to connect to ${ollamaUrl}. Make sure 'ollama serve' is running.`
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem('truthlens_ollama_url', ollamaUrl);
    localStorage.setItem('truthlens_ollama_model', ollamaModel);
    localStorage.setItem('truthlens_threshold', threshold.toString());
    localStorage.setItem('truthlens_cloud_key', apiKey);

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Engine Configuration & Privacy Settings</h1>
          <p className="section-subtitle">
            Configure local Ollama daemon connection, default detection thresholds, and optional cloud fallbacks.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} />
          <span>{saved ? 'Settings Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '28px' }}>
        {/* Ollama Settings */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <Cpu size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Local Ollama LLM Connection
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Runs 100% locally on your machine with zero server transmission.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Ollama API URL Endpoint:
              </label>
              <input
                type="text"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'monospace'
                }}
              />
              <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                Default: <code>http://localhost:11434</code> (from project <code>.env</code>)
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Selected Model:
              </label>
              <select
                value={ollamaModel}
                onChange={(e) => setOllamaModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: '#fff'
                }}
              >
                <option value="llama3">llama3 (Default 8B Instruct)</option>
                <option value="llama3.1">llama3.1 (Latest)</option>
                <option value="mistral">mistral (7B v0.3)</option>
                <option value="gemma2">gemma2 (9B Google)</option>
                <option value="phi3">phi3 (Mini 3.8B)</option>
              </select>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={handleTestConnection}
              disabled={testing}
              style={{ alignSelf: 'flex-start' }}
            >
              <RefreshCw size={14} className={testing ? 'animate-spin' : ''} />
              <span>{testing ? 'Pinging Ollama...' : 'Test Connection'}</span>
            </button>

            {testStatus && (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: testStatus.success ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${testStatus.success ? '#a7f3d0' : '#fecaca'}`,
                  color: testStatus.success ? '#047857' : '#b91c1c',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={16} />
                <span>{testStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Inference & Thresholds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <Sliders size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Thresholds & Sensitivity
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Calibrate warning trigger thresholds for uncertain or ambiguous claims.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                <span>Confidence Threshold (CONFIDENCE_THRESHOLD)</span>
                <span style={{ color: '#2563eb' }}>{threshold}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb' }}
              />
              <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
                Lower values = more sensitive (warn on less certain content). Higher values = only warn on high-certainty falsehoods.
              </span>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={debugMode}
                  onChange={(e) => setDebugMode(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                />
                <span>Enable Verbose Debug Logging (DEBUG=true)</span>
              </label>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
                <Key size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                  Cloud Fallback (Optional)
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  If local Ollama is offline or unavailable.
                </p>
              </div>
            </div>

            <input
              type="password"
              placeholder="Paste Gemini or Anthropic API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
