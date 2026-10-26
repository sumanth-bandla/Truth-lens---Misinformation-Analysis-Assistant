import React, { useState, useEffect, useRef } from 'react';
import {
  Link2,
  FileText,
  Image,
  Sparkles,
  Sliders,
  CheckCircle2,
  Loader2,
  Globe,
  Zap,
  Radio,
  Activity,
  Shield
} from 'lucide-react';
import { analyzeContentWithGemini } from '../services/geminiService';

export default function AnalyzeView({ onScanComplete, initialUrl = '' }) {
  const [activeTab, setActiveTab] = useState('url');
  const [urlInput, setUrlInput] = useState(initialUrl || '');
  const [textInput, setTextInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [deepSearch, setDeepSearch] = useState(true);
  const [biasDetection, setBiasDetection] = useState(true);

  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [liveLog, setLiveLog] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [activeModel, setActiveModel] = useState('');
  const elapsedRef = useRef(null);
  const logEndRef = useRef(null);

  const scanSteps = [
    { text: "🔍 Fetching content & parsing syntactic structure...", delay: 0 },
    { text: "📋 Isolating primary factual assertions & quotes...", delay: 600 },
    { text: "🌐 Cross-referencing IFCN, Reuters, AP, PolitiFact databases...", delay: 1200 },
    { text: "🤖 Dispatching to Gemini 2.5 Flash real-time inference engine...", delay: 1800 },
    { text: "📊 Computing credibility score & bias metrics...", delay: 2400 },
    { text: "✅ Synthesizing final audit report...", delay: 3000 }
  ];

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liveLog]);

  const presets = [
    {
      label: "Health Scam Hoax",
      text: "Breaking: New rare berry reverses cellular aging by 20 years within 48 hours according to unreleased clinical trials.",
      url: "https://viralhealthdaily.org/breakthrough-aging-cure-berry-trial"
    },
    {
      label: "Verified Space Mission",
      text: "European Space Agency confirms deployment of Sentinel-7 carbon monitoring satellite into Sun-synchronous orbit at 705 km.",
      url: "https://nature.com/articles/esa-sentinel-7-deployment-success"
    },
    {
      label: "Misleading Energy Stats",
      text: "Viral claim states electric vehicles generate 10x more lifetime emissions than diesel cars due to battery manufacturing.",
      url: "https://socialtrendpulse.net/ev-emissions-diesel-comparison-leak"
    }
  ];

  const appendLog = (msg) => {
    setLiveLog(prev => [...prev, { text: msg, time: Date.now() }]);
  };

  const handleStartAnalysis = async (explicitQuery = null) => {
    let queryToAnalyze = explicitQuery;
    if (!queryToAnalyze) {
      if (activeTab === 'url') queryToAnalyze = urlInput.trim();
      else if (activeTab === 'text') queryToAnalyze = textInput.trim();
      else queryToAnalyze = "Viral social meme claiming 5G towers cause magnetic weather interference";
    }
    if (!queryToAnalyze) queryToAnalyze = "Scientists discover miracle fruit reverses aging in 48 hours";

    setScanning(true);
    setScanStep(0);
    setLiveLog([]);
    setElapsed(0);
    setActiveModel('gemini-2.5-flash');

    // Start elapsed timer
    const startTime = Date.now();
    elapsedRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Stream step messages with delays
    scanSteps.forEach(({ text, delay }, idx) => {
      setTimeout(() => {
        appendLog(text);
        setScanStep(idx);
      }, delay);
    });

    try {
      const analysisResult = await analyzeContentWithGemini(queryToAnalyze, {
        threshold: confidenceThreshold,
        deepSearch,
        biasDetection
      });

      clearInterval(elapsedRef.current);
      appendLog(`🎯 Analysis complete! Trust score: ${analysisResult.trustScore}/100`);
      setScanStep(scanSteps.length - 1);

      setTimeout(() => {
        setScanning(false);
        onScanComplete(analysisResult);
      }, 800);
    } catch (err) {
      console.error("Analysis failed:", err);
      clearInterval(elapsedRef.current);
      appendLog(`⚠️ Error: ${err.message}`);
      setScanning(false);
    }
  };

  const handleApplyPreset = (preset) => {
    if (activeTab === 'url') {
      setUrlInput(preset.url);
      handleStartAnalysis(preset.url);
    } else {
      setTextInput(preset.text);
      handleStartAnalysis(preset.text);
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#eff6ff',
                color: '#2563eb',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '9999px',
                border: '1px solid #bfdbfe'
              }}
            >
              <Zap size={12} /> Real-Time Gemini AI Active
            </span>
          </div>
          <h1 className="section-title">Initiate Live Content Verification Scan</h1>
          <p className="section-subtitle">
            Submit any news article URL, quote, or controversial statement for real-time generative fact-checking.
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
                placeholder="Paste the headline, quote, or paragraph you wish to fact check in real-time..."
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
                Click to load sample meme text and run instant real-time Gemini verification.
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
            <div style={{ background: '#0f172a', borderRadius: '14px', padding: '20px', border: '1px solid #1e3a5f' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e',
                    animation: 'pulse 1s ease-in-out infinite'
                  }} />
                  <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'monospace' }}>
                    GEMINI LIVE SCAN
                  </span>
                  <span style={{
                    background: '#1d4ed8', color: '#bfdbfe', fontSize: '0.72rem',
                    padding: '2px 8px', borderRadius: '6px', fontWeight: 700
                  }}>
                    {activeModel}
                  </span>
                </div>
                <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                  {elapsed}s elapsed
                </span>
              </div>

              {/* Live log terminal */}
              <div style={{
                background: '#020617', borderRadius: '10px', padding: '14px',
                maxHeight: '180px', overflowY: 'auto', marginBottom: '16px',
                border: '1px solid #1e293b'
              }}>
                {liveLog.length === 0 && (
                  <span style={{ color: '#334155', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    Initializing scan engine...
                  </span>
                )}
                {liveLog.map((entry, i) => (
                  <div key={i} style={{
                    fontFamily: 'monospace', fontSize: '0.82rem', marginBottom: '6px',
                    color: i === liveLog.length - 1 ? '#22c55e' : '#94a3b8',
                    display: 'flex', alignItems: 'flex-start', gap: '8px'
                  }}>
                    <span style={{ color: '#475569', flexShrink: 0 }}>
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                    <span>{entry.text}</span>
                    {i === liveLog.length - 1 && (
                      <span style={{ display: 'inline-block', animation: 'blink 1s step-start infinite', color: '#22c55e' }}>▌</span>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* Pulsing Progress Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>
                  <span>Scan progress</span>
                  <span style={{ color: '#3b82f6' }}>{Math.round(((scanStep + 1) / scanSteps.length) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    height: '100%',
                    width: `${((scanStep + 1) / scanSteps.length) * 100}%`,
                    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                    borderRadius: '4px',
                    transition: 'width 0.6s ease',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      animation: 'shimmer 1.5s infinite'
                    }} />
                  </div>
                </div>
              </div>

              {/* Step checklist */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {scanSteps.map((step, i) => (
                  <div key={i} style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: i <= scanStep ? (i === scanStep ? '#2563eb' : '#16a34a') : '#1e293b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: '#fff', fontWeight: 700,
                    transition: 'background 0.4s',
                    border: i === scanStep ? '2px solid #60a5fa' : '2px solid transparent'
                  }}>
                    {i < scanStep ? '✓' : i + 1}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={() => handleStartAnalysis()}
            >
              <Zap size={18} />
              <span>Run Live Gemini AI Analysis</span>
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
                Active AI Engine
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
                  color: '#0f172a',
                  fontWeight: 600
                }}
              >
                <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash (Primary — Live)</option>
                <option value="gemini-3.1-flash-lite">⚡ Gemini 3.1 Flash Lite (Fallback)</option>
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

          {/* Live Status Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
              border: '1px solid #312e81',
              borderRadius: '12px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 6px #22c55e', flexShrink: 0
              }} />
              <span style={{ color: '#a5f3fc', fontWeight: 700, fontSize: '0.88rem' }}>Live API Connected</span>
              <span style={{
                marginLeft: 'auto', background: '#1d4ed8', color: '#bfdbfe',
                fontSize: '0.68rem', padding: '2px 7px', borderRadius: '5px', fontWeight: 700
              }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#64748b' }}>Primary model</span>
                <span style={{ color: '#7dd3fc', fontWeight: 600, fontFamily: 'monospace' }}>gemini-2.5-flash</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#64748b' }}>Fallback model</span>
                <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>gemini-3.1-flash-lite</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#64748b' }}>Retry logic</span>
                <span style={{ color: '#86efac' }}>✓ Backoff enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
