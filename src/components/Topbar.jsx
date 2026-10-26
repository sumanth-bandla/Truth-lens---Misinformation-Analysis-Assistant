import React from 'react';
import { Search, Plus, Bell, ShieldCheck, Zap } from 'lucide-react';

export default function Topbar({ onNewScan, onOpenAuth }) {
  return (
    <header className="topbar">
      <div className="search-bar">
        <Search size={16} color="#64748b" />
        <input
          type="text"
          placeholder="Search claims, publishers, or paste URL..."
          className="search-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onNewScan();
            }
          }}
        />
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#94a3b8',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '5px',
            padding: '2px 6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          ⌘K
        </span>
      </div>

      <div className="topbar-actions">
        {/* Real-Time Live Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#15803d',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '8px',
              height: '8px'
            }}
          >
            <span
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'pulse 1.6s infinite'
              }}
            />
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#16a34a'
              }}
            />
          </span>
          <span>Gemini 2.5 Flash Online</span>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={onNewScan}
          style={{
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Zap size={14} />
          <span>Instant Scan</span>
        </button>

        <button
          onClick={onOpenAuth}
          title="Security Notifications"
          style={{
            position: 'relative',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#94a3b8';
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <Bell size={16} color="#475569" />
          <span
            style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid #ffffff'
            }}
          />
        </button>
      </div>
    </header>
  );
}

