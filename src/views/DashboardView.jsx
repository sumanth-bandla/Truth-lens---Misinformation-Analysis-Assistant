import React, { useState, useMemo } from 'react';
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
  FileText,
  Zap,
  Radio,
  Filter,
  Check,
  Flame
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';

export default function DashboardView({
  analyses,
  onSelectAnalysis,
  onNavigate
}) {
  const [quickUrl, setQuickUrl] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuickSubmit = (e) => {
    e?.preventDefault();
    if (!quickUrl.trim()) return;
    onNavigate('analyze', { initialUrl: quickUrl });
  };

  const tickerItems = [
    { text: "Viral miracle berry aging cure flagged as 100% fabricated by IFCN", type: "false" },
    { text: "ESA Sentinel-7 satellite orbit confirmed verified by Nature Astronomy", type: "verified" },
    { text: "EV 10x emissions viral infographic missing lifetime battery recycling data", type: "warning" },
    { text: "5G radiation DNA claim debunked by World Health Organization consensus", type: "false" },
    { text: "NASA James Webb detects atmospheric carbon compounds on exoplanet K2-18b", type: "verified" }
  ];

  const presets = [
    { label: "Miracle Aging Berry Hoax", query: "Breaking: New rare berry reverses cellular aging by 20 years in 48 hours" },
    { label: "ESA Sentinel Space Orbit", query: "European Space Agency confirms deployment of Sentinel-7 carbon monitoring satellite" },
    { label: "EV Battery Emissions Meme", query: "Viral claim states electric vehicles generate 10x more lifetime emissions than diesel" }
  ];

  const filteredAnalyses = useMemo(() => {
    return analyses.filter((item) => {
      const matchesFilter =
        selectedFilter === 'all' || item.verdictType === selectedFilter;
      const matchesSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [analyses, selectedFilter, searchTerm]);

  return (
    <div className="page-container">
      {/* Real-Time Threat Intelligence Marquee Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-badge">
          <Flame size={12} /> LIVE ALERTS
        </div>
        <div className="ticker-marquee">
          <div className="ticker-track">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span key={idx} className="ticker-item">
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor:
                      item.type === 'false' ? '#ef4444' : item.type === 'warning' ? '#f59e0b' : '#10b981',
                    display: 'inline-block'
                  }}
                />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Welcome Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Analysis Overview & Threat Intelligence</h1>
          <p className="section-subtitle">
            Real-time feed of misinformation scans, credibility evaluations, and fact-check audits powered by Gemini AI.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('analyze')}
          style={{ boxShadow: '0 4px 14px rgba(37,99,235,0.3)', gap: '8px' }}
        >
          <Zap size={16} />
          <span>New Deep Scan</span>
        </button>
      </div>

      {/* Prominent Navy Hero Banner */}
      <div className="navy-banner">
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(37, 99, 235, 0.25)',
                color: '#93c5fd',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px'
              }}
            >
              <Sparkles size={13} color="#60a5fa" /> Real-Time Misinformation Guard Active
            </span>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
              Gemini 2.5 Flash Connected
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '8px', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Verify Any Online Headline, Statement, or News Article
          </h2>
          <p style={{ fontSize: '0.94rem', color: '#cbd5e1', maxWidth: '780px', marginBottom: '20px', lineHeight: 1.55 }}>
            Paste a link or claim below to decompose factual statements, evaluate evidence quality, and cross-reference with international fact-checking agencies in real time.
          </p>

          <form onSubmit={handleQuickSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '740px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Enter article URL or paste viral claim to audit..."
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.94rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#38bdf8';
                  e.target.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '0 26px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.94rem',
                boxShadow: '0 4px 16px rgba(37,99,235,0.4)'
              }}
            >
              <span>Analyze Now</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Preset Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>Try Instant Samples:</span>
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuickUrl(preset.query);
                  onNavigate('analyze', { initialUrl: preset.query });
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  color: '#e2e8f0',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = '#60a5fa';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#e2e8f0';
                }}
              >
                ⚡ {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <FileText size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="stat-val">1,492</div>
              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                +12% this week
              </span>
            </div>
            <div className="stat-title">Total Scans Performed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
            <ShieldAlert size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="stat-val" style={{ color: '#dc2626' }}>342</div>
              <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                23% High Risk
              </span>
            </div>
            <div className="stat-title">Fabricated Hoaxes Flagged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <ShieldCheck size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="stat-val" style={{ color: '#059669' }}>894</div>
              <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, background: '#d1fae5', padding: '2px 6px', borderRadius: '4px' }}>
                60% Verified
              </span>
            </div>
            <div className="stat-title">Verified Factual Content</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
            <TrendingUp size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="stat-val" style={{ color: '#7c3aed' }}>72.4%</div>
              <span style={{ fontSize: '0.72rem', color: '#6d28d9', fontWeight: 700, background: '#ede9fe', padding: '2px 6px', borderRadius: '4px' }}>
                Healthy
              </span>
            </div>
            <div className="stat-title">Average Platform Trust Score</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Live Scan Feed & Threat Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '28px' }}>
        {/* Left Column: Recent Audits & Scans */}
        <div>
          {/* Header & Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Recent Credibility Audits
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0' }}>
                Showing {filteredAnalyses.length} of {analyses.length} tracked investigations
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'false', label: 'False' },
                { id: 'warning', label: 'Misleading' },
                { id: 'verified', label: 'Verified' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  style={{
                    background: selectedFilter === tab.id ? '#ffffff' : 'transparent',
                    color: selectedFilter === tab.id ? '#0f172a' : '#64748b',
                    fontWeight: selectedFilter === tab.id ? 700 : 500,
                    border: 'none',
                    borderRadius: '7px',
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    boxShadow: selectedFilter === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredAnalyses.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                <p>No audits match the selected filter.</p>
              </div>
            ) : (
              filteredAnalyses.map((item) => (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                  onClick={() => {
                    onSelectAnalysis(item.id);
                    onNavigate('report');
                  }}
                >
                  {/* Glowing Score Gauge */}
                  <div style={{ flexShrink: 0 }}>
                    <CredibilityGauge score={item.trustScore} size={68} strokeWidth={6} showLabel={false} />
                  </div>

                  {/* Content details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {item.date}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#64748b' }}>• {item.source}</span>
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
                        lineHeight: 1.45,
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
                      style={{ fontSize: '0.76rem', fontWeight: 700 }}
                    >
                      {item.verdictType === 'false' ? 'False' : item.verdictType === 'warning' ? 'Misleading' : 'Verified'}
                    </span>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Threats & Distribution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Threat Distribution Card */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px', color: '#0f172a' }}>
              Misinformation Categories
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '20px' }}>
              Real-time classification across verified fact-checking registries:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Health, Medicine & Cure Hoaxes</span>
                  <span style={{ color: '#ef4444' }}>38%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '38%', height: '100%', background: 'linear-gradient(90deg, #ef4444, #f43f5e)', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Fabricated Political Statements</span>
                  <span style={{ color: '#f59e0b' }}>29%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '29%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Financial & Investment Scams</span>
                  <span style={{ color: '#8b5cf6' }}>21%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '21%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Environmental & Tech Misdirection</span>
                  <span style={{ color: '#06b6d4' }}>12%</span>
                </div>
                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #38bdf8)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Gemini Intelligence Badge Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
              border: '1px solid #bfdbfe',
              borderRadius: '16px',
              padding: '22px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 10px rgba(37,99,235,0.3)'
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Real-Time Gemini 2.5 Flash
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                  ● Active Threat Scanning
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
              TruthLens performs real-time factual decomposition and cross-checks claims against international fact-checking consensus databases.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', borderRadius: '10px', fontWeight: 700 }}
              onClick={() => onNavigate('settings')}
            >
              Configure AI Settings & Models →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
