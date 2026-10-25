import React from 'react';

export default function CredibilityGauge({ score, size = 130, strokeWidth = 10, showLabel = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // Green
  let verdictText = 'Verified Authentic';
  let badgeClass = 'badge-verified';

  if (score < 45) {
    strokeColor = '#ef4444'; // Red
    verdictText = 'High Risk Alert';
    badgeClass = 'badge-false';
  } else if (score < 75) {
    strokeColor = '#f59e0b'; // Amber
    verdictText = 'Needs Context';
    badgeClass = 'badge-warning';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}
        >
          <span style={{ fontSize: size * 0.26, fontWeight: 800, color: '#0f172a' }}>{score}%</span>
          <span style={{ fontSize: size * 0.1, fontWeight: 600, color: '#64748b', marginTop: '3px' }}>
            TRUST
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`badge ${badgeClass}`} style={{ fontSize: '0.8rem', padding: '5px 12px' }}>
          {verdictText}
        </span>
      )}
    </div>
  );
}
