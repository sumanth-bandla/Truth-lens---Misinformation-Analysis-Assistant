import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ClaimCard({ claim, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  const getStatusBadge = (type) => {
    switch (type) {
      case 'false':
        return (
          <span className="badge badge-false">
            <XCircle size={13} /> {claim.status}
          </span>
        );
      case 'warning':
        return (
          <span className="badge badge-warning">
            <AlertTriangle size={13} /> {claim.status}
          </span>
        );
      case 'verified':
      default:
        return (
          <span className="badge badge-verified">
            <CheckCircle2 size={13} /> {claim.status}
          </span>
        );
    }
  };

  const getBorderColor = (type) => {
    if (type === 'false') return '#fecaca';
    if (type === 'warning') return '#fde68a';
    return '#a7f3d0';
  };

  return (
    <div
      style={{
        border: `1px solid ${getBorderColor(claim.statusType)}`,
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        marginBottom: '12px',
        transition: 'all 0.2s ease',
        boxShadow: expanded ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          backgroundColor: expanded ? '#f8fafc' : '#ffffff',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#475569',
              flexShrink: 0
            }}
          >
            {index + 1}
          </span>
          <p style={{ fontWeight: 600, fontSize: '0.94rem', color: '#0f172a', margin: 0 }}>
            "{claim.claimText}"
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {getStatusBadge(claim.statusType)}
          {expanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '16px 20px 20px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ marginBottom: '12px' }}>
            <h5
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#64748b',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}
            >
              Cross-Referenced Evidence & Fact-Check
            </h5>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
              {claim.evidence}
            </p>
          </div>

          {claim.sources && claim.sources.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="#2563eb" /> Verified Against:
              </span>
              {claim.sources.map((src, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    fontSize: '0.76rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {src} <ExternalLink size={10} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
