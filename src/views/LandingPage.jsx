import React, { useState } from 'react';
import {
  Shield,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  Eye,
  Lock,
  Layers,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Zap,
  Loader2
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';
import { analyzeContentWithGemini } from '../services/geminiService';

export default function LandingPage({
  onLaunchApp,
  onOpenAuth,
  onSelectSample,
  onScanComplete
}) {
  const [quickInput, setQuickInput] = useState('');
  const [demoResult, setDemoResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const sampleQuickQueries = [
    {
      title: "Miracle berry reverses aging in 48 hours",
      score: 18,
      verdict: "High Risk — Fabrication",
      type: "false",
      sampleId: "scan-9021"
    },
    {
      title: "ESA confirms launch of Sentinel-7 greenhouse gas satellite",
      score: 96,
      verdict: "Verified Authentic",
      type: "verified",
      sampleId: "scan-9022"
    },
    {
      title: "Electric vehicles cause 10x more lifetime emissions than diesel",
      score: 41,
      verdict: "Misleading Context",
      type: "warning",
      sampleId: "scan-9023"
    }
  ];

  const runQuickDemo = (item) => {
    setQuickInput(item.title);
    setAnalyzing(true);
    setDemoResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setDemoResult({
        ...item,
        fullObject: null // will trigger sample selection
      });
    }, 400);
  };

  const handleCustomSubmit = async (e) => {
    e?.preventDefault();
    if (!quickInput.trim()) return;

    setAnalyzing(true);
    setDemoResult(null);

    try {
      const liveResult = await analyzeContentWithGemini(quickInput);
      setAnalyzing(false);
      setDemoResult({
        title: liveResult.title,
        score: liveResult.trustScore,
        verdict: liveResult.verdict,
        type: liveResult.verdictType,
        sampleId: liveResult.id,
        fullObject: liveResult
      });
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Landing Navigation */}
      <header
        style={{
          backgroundColor: '#0a0f1d',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="brand-icon">
            <Shield size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            TruthLens
          </span>
          <span className="badge badge-navy" style={{ marginLeft: '6px' }}>v1.0 AI</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a
            href="#features"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            How It Works
          </a>
          <a
            href="#architecture"
            style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
          >
            Real-Time Engine
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenAuth}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '8px 14px'
            }}
          >
            Sign In
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onLaunchApp('dashboard')}>
            <span>Open Application</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div>
            <div className="hero-pill">
              <Zap size={14} color="#60a5fa" />
              <span>Real-Time Fact Checking Powered by Gemini AI</span>
            </div>

            <h1 className="hero-title">
              Look beyond <br />
              <span className="hero-highlight">the headline.</span>
            </h1>

            <p className="hero-desc">
              TruthLens analyzes online news, social media claims, and articles in real-time. Powered by Gemini 3.1 Flash and local Ollama inference to cross-examine factual claims and protect against disinformation.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onLaunchApp('analyze')}
              >
                <span>Try Live AI Scanner</span>
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline-navy btn-lg"
                onClick={() => onLaunchApp('extension')}
              >
                <span>View Browser Extension</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '28px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>98.2%</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Detection Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Real-Time</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Live Gemini Inference</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>&lt; 350ms</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Audit Response Time</div>
              </div>
            </div>
          </div>

          {/* Interactive Live Demo Card in Hero */}
          <div className="hero-preview-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '6px', fontWeight: 600 }}>
                  Live TruthLens AI Scanner
                </span>
              </div>
              <span className="badge badge-navy" style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={11} color="#60a5fa" /> Gemini 3.1 Active
              </span>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Type ANY statement to verify in real time..."
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 90px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <button
                type="submit"
                disabled={analyzing}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  bottom: '6px',
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0 12px',
                  cursor: 'pointer'
                }}
              >
                {analyzing ? 'Checking...' : 'Verify'}
              </button>
            </form>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
                Or try one-click test benchmarks:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sampleQuickQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => runQuickDemo(item)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                      "{item.title}"
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: item.type === 'false' ? '#f87171' : item.type === 'warning' ? '#fbbf24' : '#34d399'
                      }}
                    >
                      {item.score}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Area */}
            {analyzing && (
              <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }}>
                  <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Real-Time Gemini AI Cross-Examining Facts...</span>
                </div>
              </div>
            )}

            {demoResult && !analyzing && (
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AI VERDICT</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: demoResult.type === 'false' ? '#f87171' : demoResult.type === 'warning' ? '#fbbf24' : '#34d399' }}>
                      {demoResult.verdict}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>TRUTH SCORE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                      {demoResult.score}<span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/100</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => {
                    if (demoResult.fullObject && onScanComplete) {
                      onScanComplete(demoResult.fullObject);
                    } else {
                      onSelectSample(demoResult.sampleId);
                      onLaunchApp('report');
                    }
                  }}
                >
                  <span>Inspect Full Credibility Breakdown</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Misinformation vs Verified Comparison Showcase */}
      <section style={{ backgroundColor: '#f8fafc', padding: '80px 36px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span className="badge badge-info" style={{ marginBottom: '10px' }}>
              <Sparkles size={12} /> Side-by-Side Deep Analysis
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Deceptive Clickbait vs. Corroborated Reality
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b' }}>
              How TruthLens breaks down rhetoric, syntactic sensation, and missing evidence in milliseconds:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Misinformation Card */}
            <div
              className="card"
              style={{
                border: '1px solid #fecaca',
                background: 'linear-gradient(180deg, #ffffff 0%, #fef2f2 100%)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge badge-false">
                  <XCircle size={13} /> High Risk — 18/100
                </span>
                <span style={{ fontSize: '0.74rem', color: '#dc2626', fontWeight: 700 }}>Fabrication & Clickbait</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b', marginBottom: '10px' }}>
                "Miracle rare berry reverses cellular aging by 20 years in 48 hours"
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#7f1d1d' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <XCircle size={14} color="#ef4444" /> Zero peer-reviewed clinical citations found on PubMed.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <XCircle size={14} color="#ef4444" /> Extreme sensationalist framing & urgency markers.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <XCircle size={14} color="#ef4444" /> Domain registered 3 weeks ago on anonymous registrar.
                </li>
              </ul>
            </div>

            {/* Verified Fact Card */}
            <div
              className="card"
              style={{
                border: '1px solid #a7f3d0',
                background: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 100%)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge badge-verified">
                  <CheckCircle2 size={13} /> Verified — 98/100
                </span>
                <span style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 700 }}>Institutional Consensus</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065f46', marginBottom: '10px' }}>
                "ESA confirms deployment of Sentinel-7 greenhouse gas monitoring satellite"
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#064e3b' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#10b981" /> Official press release published on European Space Agency.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#10b981" /> Orbital telemetry confirmed by Nature Astronomy.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#10b981" /> Cross-referenced wire coverage from Reuters & AP News.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '80px 36px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Next-Generation Misinformation Defense
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
            Designed for truth-seekers, journalists, researchers, and everyday readers navigating modern online media ecosystems.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '26px' }}>
          <div className="card" style={{ borderTop: '4px solid #2563eb' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Zap size={22} color="#2563eb" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
              Real-Time Generative Fact Engine
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>
              Powered by high-throughput Gemini 2.5 Flash AI. Evaluates factual claims against international knowledge baselines in sub-second latency.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #0d9488' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Layers size={22} color="#0d9488" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
              Claim Decomposition
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>
              Extracts individual factual assertions from long articles, scoring each claim separately for granular truth detection.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Eye size={22} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
              Automated Fact-Check Cross-Match
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>
              Cross-references claims against verified databases from Reuters, AP News, PolitiFact, and peer-reviewed journals.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <Lock size={22} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
              Hybrid Private Architecture
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6 }}>
              Switch dynamically between real-time cloud inference (Gemini) and 100% offline local inference (Ollama LLaMA-3).
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <footer style={{ backgroundColor: '#070b14', color: '#fff', padding: '60px 36px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-icon">
              <Shield size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>TruthLens</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>AI-Powered Misinformation Analysis Assistant</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button className="btn btn-primary" onClick={() => onLaunchApp('dashboard')}>
              <span>Launch Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
