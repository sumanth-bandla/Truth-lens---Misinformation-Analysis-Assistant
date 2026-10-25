import React, { useState } from 'react';
import {
  Puzzle,
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Sparkles,
  Download,
  Terminal,
  ExternalLink,
  RefreshCw,
  Sliders
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';

export default function ExtensionSimulatorView() {
  const [extensionEnabled, setExtensionEnabled] = useState(true);
  const [highlightMode, setHighlightMode] = useState('all'); // 'all', 'flags_only'
  const [popupTab, setPopupTab] = useState('page'); // 'page', 'settings'

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Browser Extension Simulation & Playground</h1>
          <p className="section-subtitle">
            Preview how TruthLens works in Chrome & Edge: background tab monitoring, in-situ DOM badge injection, and toolbar popup.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '28px' }}>
        {/* Left Column: Interactive 360px Extension Popup Mockup */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              Toolbar Extension Popup (Active Tab)
            </span>
            <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
              WebExtension API
            </span>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}
          >
            {/* Extension Header */}
            <div
              style={{
                backgroundColor: '#0a0f1d',
                color: '#fff',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="brand-icon" style={{ width: '26px', height: '26px' }}>
                  <Shield size={15} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>TruthLens Guard</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: extensionEnabled ? '#10b981' : '#ef4444'
                  }}
                />
                <button
                  onClick={() => setExtensionEnabled(!extensionEnabled)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    cursor: 'pointer'
                  }}
                >
                  {extensionEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Popup Body */}
            <div style={{ padding: '20px' }}>
              {extensionEnabled ? (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                    <CredibilityGauge score={41} size={110} strokeWidth={9} />
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
                      Domain: <strong>socialtrendpulse.net</strong>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '10px 12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} /> Attention Needed
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#78350f', marginTop: '2px' }}>
                      2 claims on this page contradict consensus lifecycle analysis.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: '#64748b' }}>Analyzed In-Situ Claims:</span>
                      <strong style={{ color: '#0f172a' }}>3 elements</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: '#64748b' }}>Ollama Local Inference:</span>
                      <strong style={{ color: '#10b981' }}>124ms</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: '#64748b' }}>Editorial Reliability:</span>
                      <strong style={{ color: '#ef4444' }}>Low (35%)</strong>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => alert('Full report opened in TruthLens dashboard!')}
                  >
                    <span>Inspect Full Page Audit</span>
                    <ExternalLink size={13} />
                  </button>
                </>
              ) : (
                <div style={{ padding: '30px 10px', textAlign: 'center', color: '#64748b' }}>
                  <p style={{ fontSize: '0.88rem', marginBottom: '12px' }}>TruthLens page monitoring is paused.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setExtensionEnabled(true)}>
                    Re-enable Active Guard
                  </button>
                </div>
              )}
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
              <span>Engine: Ollama localhost:11434</span>
              <span>v1.0.4</span>
            </div>
          </div>
        </div>

        {/* Right Column: In-Situ Webpage Overlay Demonstration */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
              Live In-Situ Content Script Overlay (What Users See While Browsing)
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}
          >
            {/* Simulated Browser Address Bar */}
            <div
              style={{
                backgroundColor: '#f1f5f9',
                borderBottom: '1px solid #e2e8f0',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '0.8rem',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>https://socialtrendpulse.net/ev-emissions-diesel-comparison-leak</span>
                <span
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  TruthLens: 41%
                </span>
              </div>
            </div>

            {/* Mock Article Content with Injected Badges */}
            <div style={{ padding: '28px' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>
                AUTOMOTIVE TRENDS • OCT 24, 2026
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                The EV Battery Reality: Mining Lithium & Global Impact
              </h2>

              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
                Automakers worldwide are transitioning to electric powertrains, but critics continue to scrutinize the full manufacturing lifecycle.
              </p>

              {/* Injected Warning Badge 1 */}
              <div
                style={{
                  backgroundColor: '#fffbeb',
                  borderLeft: '4px solid #f59e0b',
                  padding: '12px 16px',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                    <AlertTriangle size={12} /> TruthLens Flag: Misleading Assertion
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>MIT Energy Lifecycle Database</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#78350f', margin: 0, fontStyle: 'italic' }}>
                  "Mining lithium causes 10 times more pollution than 15 years of diesel combustion."
                </p>
                <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '6px' }}>
                  <strong>Fact Check:</strong> Comprehensive cradle-to-grave LCAs show EVs emit 50-70% less lifetime CO2 even on standard power grids.
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
                Modern manufacturing facilities have implemented closed-loop water filtration to mitigate mineral extraction impacts.
              </p>

              {/* Injected Falsehood Badge 2 */}
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  borderLeft: '4px solid #ef4444',
                  padding: '12px 16px',
                  borderRadius: '0 8px 8px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-false" style={{ fontSize: '0.7rem' }}>
                    <XCircle size={12} /> TruthLens Flag: False Claim
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>US DOE & Nature Energy</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#7f1d1d', margin: 0, fontStyle: 'italic' }}>
                  "Batteries cannot be recycled and are buried permanently in landfills."
                </p>
                <div style={{ fontSize: '0.78rem', color: '#991b1b', marginTop: '6px' }}>
                  <strong>Fact Check:</strong> Hydrometallurgical recycling facilities currently recover over 95% of battery elements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
