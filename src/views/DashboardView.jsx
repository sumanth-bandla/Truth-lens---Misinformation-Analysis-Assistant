import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  BarChart2,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';

export default function DashboardView({
  analyses,
  onSelectAnalysis,
  onNavigate
}) {
  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    onNavigate('analyze', { initialUrl: quickUrl });
  };

  return (
    <div className="page-container">
      {/* Top Welcome & Subtitle */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Analysis Overview & Threat Intelligence</h1>
          <p className="section-subtitle">
            Real-time feed of misinformation scans, credibility evaluations, and fact-check audits.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('analyze')}>
          <Search size={16} />
          <span>New Deep Scan</span>
        </button>
      </div>

      {/* Prominent Navy Banner matching Figma */}
      <div className="navy-banner">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-navy" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} color="#60a5fa" /> Real-Time Misinformation Guard Active
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>• Local Ollama LLaMA-3 Ready</span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
            Verify Any Online Headline, Statement, or News Article
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', maxWidth: '750px', marginBottom: '20px', lineHeight: 1.5 }}>
            Paste a link or claim below to decompose factual statements, evaluate evidence quality, and cross-reference with international fact-checking organizations.
          </p>

          <form onSubmit={handleQuickSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '680px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Enter article URL or paste controversial claim..."
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
              <Search size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '14px' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
              <span>Analyze Now</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <FileText size={24} />
          </div>
          <div>
            <div className="stat-val">1,492</div>
            <div className="stat-title">Total Scans Performed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <div className="stat-val">342</div>
            <div className="stat-title">High-Risk Hoaxes Flagged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="stat-val">894</div>
            <div className="stat-title">Verified Factual Content</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-val">72.4%</div>
            <div className="stat-title">Average Platform Trust Score</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Live Scan Feed & Threat Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '28px' }}>
        {/* Left Column: Recent Audits & Scans */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
              Recent Credibility Audits
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Showing latest 4 scans</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analyses.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  padding: '20px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}
                onClick={() => {
                  onSelectAnalysis(item.id);
                  onNavigate('report');
                }}
              >
                {/* Score gauge mini */}
                <div style={{ flexShrink: 0 }}>
                  <CredibilityGauge score={item.trustScore} size={70} strokeWidth={6} showLabel={false} />
                </div>

                {/* Content details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {item.date}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>• {item.source}</span>
                  </div>

                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '6px',
                      lineHeight: 1.35,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#64748b',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      margin: 0
                    }}
                  >
                    {item.summary}
                  </p>
                </div>

                {/* Action button */}
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    className={`badge ${
                      item.verdictType === 'false'
                        ? 'badge-false'
                        : item.verdictType === 'warning'
                        ? 'badge-warning'
                        : 'badge-verified'
                    }`}
                  >
                    {item.verdictType === 'false' ? 'False' : item.verdictType === 'warning' ? 'Misleading' : 'Verified'}
                  </span>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Threats & Distribution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Threat Distribution Card */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>
              Misinformation Categories
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '18px' }}>
              Distribution of flagged falsehoods and manipulative narratives this month:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '5px' }}>
                  <span>Health, Medicine & Cure Hoaxes</span>
                  <span style={{ color: '#ef4444' }}>38%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '38%', height: '100%', background: '#ef4444', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '5px' }}>
                  <span>Fabricated Political Statements</span>
                  <span style={{ color: '#f59e0b' }}>29%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '29%', height: '100%', background: '#f59e0b', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '5px' }}>
                  <span>Financial & Investment Scams</span>
                  <span style={{ color: '#8b5cf6' }}>21%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '21%', height: '100%', background: '#8b5cf6', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '5px' }}>
                  <span>Environmental & Tech Misdirection</span>
                  <span style={{ color: '#06b6d4' }}>12%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', background: '#06b6d4', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box: Local Ollama Model */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}
              >
                <Sparkles size={18} />
              </div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                Local Ollama AI Integration
              </h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '14px' }}>
              TruthLens connects to your local Ollama daemon at <code>http://localhost:11434</code> to execute LLaMA-3 privately without sharing data.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
              onClick={() => onNavigate('settings')}
            >
              Configure Ollama Endpoint →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
