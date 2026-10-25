import React, { useState } from 'react';
import {
  Search,
  Link2,
  FileText,
  Image,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Globe
} from 'lucide-react';

export default function AnalyzeView({ onScanComplete, initialUrl = '' }) {
  const [activeTab, setActiveTab] = useState('url'); // 'url', 'text', 'image'
  const [urlInput, setUrlInput] = useState(initialUrl || '');
  const [textInput, setTextInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [deepSearch, setDeepSearch] = useState(true);
  const [biasDetection, setBiasDetection] = useState(true);

  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    "Extracting page content & syntactic structure...",
    "Isolating primary factual assertions & quotes...",
    "Querying IFCN verified databases (Reuters, AP, PolitiFact)...",
    "Running Ollama LLaMA-3 semantic consistency & fallacy analysis...",
    "Synthesizing final credibility score & audit report..."
  ];

  const presets = [
    {
      label: "Health Scam Hoax",
      text: "Breaking: New rare berry reverses cellular aging by 20 years within 48 hours according to unreleased clinical trials.",
      url: "https://viralhealthdaily.org/breakthrough-aging-cure-berry-trial",
      resultId: "scan-9021"
    },
    {
      label: "Verified Space Mission",
      text: "European Space Agency confirms deployment of Sentinel-7 carbon monitoring satellite into Sun-synchronous orbit at 705 km.",
      url: "https://nature.com/articles/esa-sentinel-7-deployment-success",
      resultId: "scan-9022"
    },
    {
      label: "Misleading Energy Stats",
      text: "Viral claim states electric vehicles generate 10x more lifetime emissions than diesel cars due to battery manufacturing.",
      url: "https://socialtrendpulse.net/ev-emissions-diesel-comparison-leak",
      resultId: "scan-9023"
    }
  ];

  const handleStartAnalysis = (presetResultId = null) => {
    setScanning(true);
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setScanning(false);
            const targetId = presetResultId || 'scan-9021';
            onScanComplete(targetId);
          }, 600);
          return prev;
        }
      });
    }, 600);
  };

  const handleApplyPreset = (preset) => {
    if (activeTab === 'url') {
      setUrlInput(preset.url);
    } else {
      setTextInput(preset.text);
    }
    handleStartAnalysis(preset.resultId);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Initiate Content Verification Scan</h1>
          <p className="section-subtitle">
            Submit a URL, statement, or upload a media screenshot for private AI-powered fact-checking.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1.1fr', gap: '28px' }}>
        {/* Left Column: Input Panel */}
        <div className="card">
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '14px',
              marginBottom: '22px'
            }}
          >
            <button
              onClick={() => setActiveTab('url')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'url' ? '#eff6ff' : 'transparent',
                color: activeTab === 'url' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <Link2 size={16} />
              <span>Article URL</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'text' ? '#eff6ff' : 'transparent',
                color: activeTab === 'text' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <FileText size={16} />
              <span>Claim / Text Body</span>
            </button>

            <button
              onClick={() => setActiveTab('image')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'image' ? '#eff6ff' : 'transparent',
                color: activeTab === 'image' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <Image size={16} />
              <span>Screenshot / Meme</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'url' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px', color: '#334155' }}>
                Web Article or Social Post URL:
              </label>
              <div style={{ position: 'relative', marginBottom: '18px' }}>
                <input
                  type="url"
                  placeholder="https://news-outlet.com/story/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 14px 13px 40px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.94rem',
                    outline: 'none',
                    color: '#0f172a'
                  }}
                />
                <Globe size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px', color: '#334155' }}>
                Paste Questionable Statement or Article Content:
              </label>
              <textarea
                rows={6}
                placeholder="Paste the headline, quote, or paragraph you wish to fact check..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.92rem',
                  outline: 'none',
                  color: '#0f172a',
                  marginBottom: '18px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          {activeTab === 'image' && (
            <div
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '36px 20px',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
                marginBottom: '18px',
                cursor: 'pointer'
              }}
              onClick={() => handleApplyPreset(presets[0])}
            >
              <Image size={36} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Drop viral screenshot or social meme here
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                TruthLens OCR will extract headline text and analyze claims against fact databases. (Click to load demo meme)
              </div>
            </div>
          )}

          {/* Quick Presets */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Test Benchmarks:
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {presets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleApplyPreset(preset)}
                >
                  <Sparkles size={13} color="#2563eb" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scanning Progress or Action Button */}
          {scanning ? (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '22px',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
                <Loader2 size={24} color="#2563eb" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                  AI Deep Verification in Progress
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#2563eb', fontWeight: 600, minHeight: '24px' }}>
                {scanSteps[scanStep]}
              </p>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '14px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${((scanStep + 1) / scanSteps.length) * 100}%`,
                    background: '#2563eb',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={() => handleStartAnalysis()}
            >
              <Search size={18} />
              <span>Run TruthLens Analysis</span>
            </button>
          )}
        </div>

        {/* Right Column: Parameters & Model Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sliders size={18} color="#2563eb" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Inference Configuration
              </h3>
            </div>

            {/* Model Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>
                Execution Engine
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  color: '#0f172a'
                }}
              >
                <option value="llama3">Ollama Local — LLaMA 3 (8B Instruct)</option>
                <option value="mistral">Ollama Local — Mistral 7B</option>
                <option value="gemma">Ollama Local — Gemma 2 (9B)</option>
                <option value="gemini">Cloud Fallback — Gemini 1.5 Pro</option>
              </select>
            </div>

            {/* Confidence Slider */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>
                <span>Confidence Threshold</span>
                <span style={{ color: '#2563eb' }}>{confidenceThreshold}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#2563eb' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                <span>Permissive (0.50)</span>
                <span>Balanced (0.70)</span>
                <span>Strict (0.95)</span>
              </div>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={deepSearch}
                  onChange={(e) => setDeepSearch(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                />
                <span>Cross-reference IFCN database</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={biasDetection}
                  onChange={(e) => setBiasDetection(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                />
                <span>Sensationalism & clickbait indexing</span>
              </label>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div
            style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '12px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
              <CheckCircle2 size={16} />
              <span>Privacy Verified</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#065f46', lineHeight: 1.45, margin: 0 }}>
              Queries submitted through Ollama Local Engine are processed exclusively in your machine's GPU/CPU RAM. No personal identifiers or query text are stored on remote servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
