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
  BookOpen
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';
import ClaimCard from '../components/ClaimCard';

export default function ReportView({
  analysis,
  onBack,
  analyses,
  onSelectAnalysis
}) {
  const [copied, setCopied] = useState(false);

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
        bg: '#fef2f2',
        border: '#fecaca',
        icon: <ShieldAlert size={24} color="#ef4444" />,
        titleColor: '#b91c1c',
        title: 'HIGH RISK — Significant Fabrications & Clickbait Detected',
        desc: 'This content contains unverified or debunked factual claims, fabricated institutional affiliations, and misleading statistical representations.'
      };
    } else if (analysis.verdictType === 'warning') {
      return {
        bg: '#fffbeb',
        border: '#fde68a',
        icon: <AlertTriangle size={24} color="#f59e0b" />,
        titleColor: '#b45309',
        title: 'MISLEADING CONTEXT — Factual Statements Mixed with Speculation',
        desc: 'While some real data points are referenced, key conclusions are taken out of context or omit critical counter-evidence.'
      };
    } else {
      return {
        bg: '#ecfdf5',
        border: '#a7f3d0',
        icon: <ShieldCheck size={24} color="#10b981" />,
        titleColor: '#047857',
        title: 'VERIFIED AUTHENTIC — High Factual Reliability & Primary Sources',
        desc: 'Statements have been verified against primary documentation, named institutional spokespeople, and reputable wire agencies.'
      };
    }
  };

  const banner = getVerdictBanner();

  return (
    <div className="page-container">
      {/* Top Navigation Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        {/* Other sample reports quick switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Switch Report:</span>
          {analyses.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelectAnalysis(a.id)}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: a.id === analysis.id ? '#2563eb' : '#fff',
                color: a.id === analysis.id ? '#fff' : '#475569',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
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

          <div style={{ display: 'flex', gap: '10px' }}>
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

      {/* Prominent Verdict Banner */}
      <div
        style={{
          backgroundColor: banner.bg,
          border: `1px solid ${banner.border}`,
          borderRadius: '14px',
          padding: '22px 26px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div style={{ marginTop: '2px' }}>{banner.icon}</div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: banner.titleColor, marginBottom: '6px' }}>
            {banner.title}
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
            {banner.desc}
          </p>
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

          {/* AI Reasoning & Linguistic Analysis Card */}
          <div className="card" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Ollama AI Explainable Reasoning
                </h4>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Model: LLaMA-3 (Confidence: {(analysis.confidence * 100).toFixed(0)}%)</div>
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
