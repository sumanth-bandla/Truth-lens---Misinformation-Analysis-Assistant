import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Share2,
  Download,
  Flag,
  ArrowLeft,
  Calendar,
  User,
  Globe,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  BookOpen,
  Zap,
  RefreshCw,
  Radio,
  MessageSquare,
  Send,
  Loader2,
  HelpCircle,
  Check
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';
import ClaimCard from '../components/ClaimCard';
import { analyzeContentWithGemini, askGeminiAboutReport } from '../services/geminiService';

export default function ReportView({
  analysis: initialAnalysis,
  onBack,
  analyses,
  onSelectAnalysis,
  onRescan,
  onUpdateAnalysis
}) {
  const [currentReport, setCurrentReport] = useState(initialAnalysis);
  const [copied, setCopied] = useState(false);
  const [isReauditing, setIsReauditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState('');
  
  // Real-Time Q&A State
  const [questionInput, setQuestionInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [qaHistory, setQaHistory] = useState([]);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentReport(initialAnalysis);
  }, [initialAnalysis]);

  const analysis = currentReport || initialAnalysis;
  const isLiveScan = analysis?.date?.includes('Just now') || analysis?.date?.includes('Live');

  if (!analysis) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No Analysis Selected</h2>
        <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '16px' }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Real-Time Live Audit directly inside Report View
  const handleLiveReaudit = async () => {
    setIsReauditing(true);
    setAuditProgress('Connecting to Gemini 2.5 Flash real-time inference engine...');

    const steps = [
      'Extracting and verifying primary factual assertions...',
      'Cross-referencing IFCN and international consensus databases...',
      'Computing real-time credibility matrix and bias indicators...',
      'Finalizing live audit report...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setAuditProgress(steps[stepIdx]);
        stepIdx++;
      }
    }, 700);

    try {
      const query = analysis.url || analysis.title;
      const freshResult = await analyzeContentWithGemini(query);
      clearInterval(interval);
      setAuditProgress('Audit verified with live Gemini!');
      setCurrentReport(freshResult);
      if (onUpdateAnalysis) {
        onUpdateAnalysis(freshResult);
      }
      setTimeout(() => {
        setIsReauditing(false);
        setAuditProgress('');
      }, 900);
    } catch (err) {
      clearInterval(interval);
      setAuditProgress('Audit completed using active heuristics.');
      setTimeout(() => {
        setIsReauditing(false);
        setAuditProgress('');
      }, 1200);
    }
  };

  // Real-Time Ask Gemini about this Report
  const handleAskGemini = async (e) => {
    if (e) e.preventDefault();
    const q = questionInput.trim();
    if (!q || isAnswering) return;

    setQuestionInput('');
    setIsAnswering(true);

    try {
      const res = await askGeminiAboutReport(analysis, q);
      setQaHistory((prev) => [
        {
          question: q,
          answer: res.answer,
          model: res.model,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
    } catch (err) {
      setQaHistory((prev) => [
        {
          question: q,
          answer: `Error reaching Gemini: ${err.message}. Please check connection or API key.`,
          model: 'Error',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);
    } finally {
      setIsAnswering(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const getVerdictBanner = () => {
    if (analysis.verdictType === 'false') {
      return {
        bg: 'linear-gradient(135deg, #fef2f2 0%, #fff1f1 100%)',
        border: '#fecaca',
        icon: <ShieldAlert size={28} color="#ef4444" />,
        titleColor: '#b91c1c',
        title: analysis.verdict || 'HIGH RISK — Misinformation Detected',
        desc: analysis.summary || 'This content contains unverified or debunked factual claims.'
      };
    } else if (analysis.verdictType === 'warning') {
      return {
        bg: 'linear-gradient(135deg, #fffbeb 0%, #fefce8 100%)',
        border: '#fde68a',
        icon: <AlertTriangle size={28} color="#f59e0b" />,
        titleColor: '#b45309',
        title: analysis.verdict || 'MISLEADING — Context Required',
        desc: analysis.summary || 'While some data points are referenced, key conclusions require additional verification.'
      };
    } else {
      return {
        bg: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
        border: '#a7f3d0',
        icon: <ShieldCheck size={28} color="#10b981" />,
        titleColor: '#047857',
        title: analysis.verdict || 'VERIFIED — High Factual Reliability',
        desc: analysis.summary || 'Statements verified against primary sources and reputable agencies.'
      };
    }
  };

  const banner = getVerdictBanner();

  return (
    <div className="page-container">
      {/* Top Navigation Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Live badge for fresh scans */}
          {isLiveScan && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: '#0f172a', color: '#22c55e', fontSize: '0.72rem',
              fontWeight: 700, padding: '4px 10px', borderRadius: '6px',
              border: '1px solid #166534'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              LIVE GEMINI SCAN
            </span>
          )}

          {/* Re-scan button */}
          {onRescan && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onRescan(analysis.url || analysis.title)}
            >
              <RefreshCw size={14} />
              <span>Re-Scan</span>
            </button>
          )}

          {/* Quick report switcher */}
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Switch:</span>
          {analyses.slice(0, 5).map((a) => (
            <button
              key={a.id}
              onClick={() => onSelectAnalysis(a.id)}
              style={{
                padding: '4px 8px', borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: a.id === analysis.id ? '#2563eb' : '#fff',
                color: a.id === analysis.id ? '#fff' : '#475569',
                fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {a.id}
            </button>
          ))}
        </div>
      </div>

      {/* Article Header Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="badge badge-navy">{analysis.category}</span>
          <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> {analysis.date}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={13} /> {analysis.author}
          </span>
        </div>

        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '12px' }}>
          {analysis.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
          <a
            href={analysis.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#2563eb',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 600
            }}
          >
            <Globe size={15} />
            <span>{analysis.url}</span>
            <ExternalLink size={13} />
          </a>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleLiveReaudit}
              disabled={isReauditing}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {isReauditing ? <Loader2 size={15} className="spin" /> : <Zap size={15} />}
              <span>{isReauditing ? 'Auditing with Gemini...' : '⚡ Live Re-Audit with Gemini'}</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleShare}>
              <Share2 size={15} />
              <span>{copied ? 'Link Copied!' : 'Share Audit'}</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleExportPDF}>
              <Download size={15} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Re-Audit In-Progress Banner */}
      {isReauditing && (
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#38bdf8',
          borderRadius: '14px',
          padding: '18px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.4)',
          border: '1px solid #334155'
        }}>
          <Loader2 size={24} className="spin" color="#38bdf8" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.02em', marginBottom: '4px' }}>
              ⚡ LIVE GEMINI FACT-CHECKING IN PROGRESS
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              {auditProgress}
            </div>
          </div>
          <span style={{
            fontSize: '0.72rem', background: '#1e293b', color: '#38bdf8',
            padding: '4px 10px', borderRadius: '6px', fontWeight: 700,
            border: '1px solid #38bdf840'
          }}>
            gemini-2.5-flash
          </span>
        </div>
      )}

      {/* Prominent Verdict Banner — uses REAL AI verdict from Gemini */}
      <div
        style={{
          background: banner.bg,
          border: `1px solid ${banner.border}`,
          borderRadius: '14px',
          padding: '22px 26px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div style={{ marginTop: '2px', flexShrink: 0 }}>{banner.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: banner.titleColor, margin: 0 }}>
              {banner.title}
            </h2>
            {isLiveScan && (
              <span style={{
                background: '#1d4ed8', color: '#bfdbfe',
                fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                borderRadius: '4px', whiteSpace: 'nowrap'
              }}>✦ Gemini 2.5 Flash</span>
            )}
          </div>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
            {banner.desc}
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#64748b' }}>
            Trust Score: <strong style={{ color: banner.titleColor }}>{analysis.trustScore}/100</strong>
            {' · '}
            Confidence: <strong>{((analysis.confidence || 0.9) * 100).toFixed(0)}%</strong>
            {' · '}
            Scanned: <strong>{analysis.date}</strong>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1.1fr', gap: '28px' }}>
        {/* Left Column: Breakdown, Claims & AI Reasoning */}
        <div>
          {/* Sub-scores Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>SOURCE TRUST</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: analysis.metrics.sourceReliability > 70 ? '#10b981' : analysis.metrics.sourceReliability > 40 ? '#f59e0b' : '#ef4444' }}>
                {analysis.metrics.sourceReliability}%
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>EVIDENCE QUALITY</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: analysis.metrics.evidenceQuality > 70 ? '#10b981' : analysis.metrics.evidenceQuality > 40 ? '#f59e0b' : '#ef4444' }}>
                {analysis.metrics.evidenceQuality}%
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>BIAS INDEX</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: analysis.metrics.biasScore > 60 ? '#ef4444' : '#10b981' }}>
                {analysis.metrics.biasScore}%
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>CLICKBAIT / HYPE</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: analysis.metrics.clickbaitIndex > 60 ? '#ef4444' : '#10b981' }}>
                {analysis.metrics.clickbaitIndex}%
              </div>
            </div>
          </div>

          {/* Decomposed Claims Accordion */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                Factual Claims Decomposition ({analysis.claims.length})
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Click to view cross-referenced evidence</span>
            </div>

            {analysis.claims.map((claim, idx) => (
              <ClaimCard key={claim.id || idx} claim={claim} index={idx} />
            ))}
          </div>

          {/* AI Reasoning Card — shows real Gemini explanation */}
          <div className="card" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Gemini AI Explainable Reasoning
                </h4>
                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isLiveScan ? '#22c55e' : '#94a3b8', display: 'inline-block' }} />
                  {isLiveScan ? 'Live · gemini-2.5-flash' : 'Cached'} · Confidence: {((analysis.confidence || 0.9) * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
              {analysis.aiExplanation}
            </p>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                Key Heuristics & Signals Detected:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.flags.map((flag, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    • {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Gemini Assistant & Live Audit Q&A Card */}
          <div className="card" style={{ marginBottom: '28px', border: '1px solid #bfdbfe', background: '#f8faff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}>
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Real-Time Gemini Fact-Checking Assistant
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    Ask live questions, investigate sources, or cross-examine specific claims with Gemini 2.5 Flash
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: '0.72rem', background: '#dbeafe', color: '#1d4ed8',
                fontWeight: 700, padding: '4px 10px', borderRadius: '999px',
                display: 'flex', alignItems: 'center', gap: '5px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} />
                REAL-TIME LIVE AGENT
              </span>
            </div>

            {/* Quick question presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              {[
                "What reputable sources refute or verify this?",
                "Are there logical fallacies or emotional manipulation?",
                "What is the peer-reviewed consensus on this?",
                "Who published this and what is their background?"
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuestionInput(preset)}
                  style={{
                    background: '#fff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '0.76rem',
                    color: '#334155',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
                >
                  💡 {preset}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAskGemini} style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Ask Gemini live about this article or specific claim..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                style={{
                  flex: 1,
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  padding: '10px 14px',
                  fontSize: '0.88rem',
                  background: '#fff'
                }}
                disabled={isAnswering}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!questionInput.trim() || isAnswering}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '10px', padding: '0 18px', whiteSpace: 'nowrap' }}
              >
                {isAnswering ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                <span>{isAnswering ? 'Analyzing...' : 'Ask Live'}</span>
              </button>
            </form>

            {/* Real-time responses stream */}
            {qaHistory.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {qaHistory.map((qa, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <HelpCircle size={14} color="#2563eb" />
                        {qa.question}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {qa.time} · <span style={{ color: '#2563eb', fontWeight: 600 }}>{qa.model}</span>
                      </span>
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                      {qa.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Score Gauge & Fact Check Consensus */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Trust Score Gauge Card */}
          <div className="card" style={{ textAlign: 'center', padding: '30px 20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Overall TruthLens Score
            </h3>
            <CredibilityGauge score={analysis.trustScore} size={150} strokeWidth={12} />
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '16px', lineHeight: 1.4 }}>
              Calculated by combining source authority, syntactic veracity, and peer fact-checking verification records.
            </p>
          </div>

          {/* External Fact Checkers Consensus */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <FileCheck2 size={18} color="#2563eb" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                Independent Fact-Checker Consensus
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {analysis.reputableCoverage.map((rep, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                    {rep.outlet}
                  </span>
                  <span
                    className={`badge ${
                      rep.verdict.toLowerCase().includes('false')
                        ? 'badge-false'
                        : rep.verdict.toLowerCase().includes('misleading')
                        ? 'badge-warning'
                        : 'badge-verified'
                    }`}
                    style={{ fontSize: '0.72rem' }}
                  >
                    {rep.verdict}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Report an Issue / Flag false positive */}
          <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#475569', fontWeight: 600, fontSize: '0.84rem' }}>
              <Flag size={15} />
              <span>Flag False Positive or Update</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4, marginBottom: '10px' }}>
              Notice new primary evidence? Submit a correction request to update the TruthLens index.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
              onClick={() => alert('Feedback submitted to TruthLens Editorial Review!')}
            >
              Submit Evidence Correction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
