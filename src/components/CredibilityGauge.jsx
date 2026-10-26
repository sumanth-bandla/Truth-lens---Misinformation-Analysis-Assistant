import React from 'react';

export default function CredibilityGauge({ score, size = 130, strokeWidth = 10, showLabel = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let gradientId = 'gaugeGradGreen';
  let strokeStart = '#10b981';
  let strokeEnd = '#06b6d4';
  let glowColor = 'rgba(16, 185, 129, 0.45)';
  let verdictText = 'Verified Authentic';
  let badgeClass = 'badge-verified';
  let scoreColor = '#059669';

  if (score < 45) {
    gradientId = 'gaugeGradRed';
    strokeStart = '#ef4444';
    strokeEnd = '#f43f5e';
    glowColor = 'rgba(239, 68, 68, 0.45)';
    verdictText = 'High Risk Alert';
    badgeClass = 'badge-false';
    scoreColor = '#dc2626';
  } else if (score < 75) {
    gradientId = 'gaugeGradAmber';
    strokeStart = '#f59e0b';
    strokeEnd = '#eab308';
    glowColor = 'rgba(245, 158, 11, 0.45)';
    verdictText = 'Needs Context';
    badgeClass = 'badge-warning';
    scoreColor = '#d97706';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ position: 'relative', width: size, height: size, filter: `drop-shadow(0 4px 12px ${glowColor})` }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={strokeStart} />
              <stop offset="100%" stopColor={strokeEnd} />
            </linearGradient>
            <filter id={`glow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer subtle guide ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 3}
            stroke="rgba(226, 232, 240, 0.4)"
            strokeWidth={1}
            strokeDasharray="2 3"
            fill="transparent"
          />

          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Animated Glowing Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: `drop-shadow(0 0 4px ${strokeStart}80)`
            }}
          />
        </svg>

        {/* Inner Glass Center Badge */}
        <div
          style={{
            position: 'absolute',
            inset: strokeWidth * 1.2,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 65%, #f8fafc 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(226, 232, 240, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: size * 0.28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
              {score}
            </span>
            <span style={{ fontSize: size * 0.13, fontWeight: 700, color: scoreColor, marginLeft: '1px' }}>
              %
            </span>
          </div>
          <span style={{
            fontSize: Math.max(9, size * 0.075),
            fontWeight: 800,
            color: '#64748b',
            letterSpacing: '0.08em',
            marginTop: '2px',
            textTransform: 'uppercase'
          }}>
            TRUST SCORE
          </span>
        </div>
      </div>

      {showLabel && (
        <span
          className={`badge ${badgeClass}`}
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '5px 14px',
            borderRadius: '999px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            letterSpacing: '0.01em'
          }}
        >
          {verdictText}
        </span>
      )}
    </div>
  );
}

