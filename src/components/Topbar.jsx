import React from 'react';
import { Search, Plus, Bell, ShieldCheck } from 'lucide-react';

export default function Topbar({ onNewScan, onOpenAuth }) {
  return (
    <header className="topbar">
      <div className="search-bar">
        <Search size={17} color="#64748b" />
        <input
          type="text"
          placeholder="Search fact-checks, domains, or claims..."
          className="search-input"
        />
      </div>

      <div className="topbar-actions">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          <ShieldCheck size={14} color="#2563eb" />
          <span>Real-Time Guard: Active</span>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onNewScan}>
          <Plus size={16} />
          <span>Analyze Claim</span>
        </button>

        <button
          onClick={onOpenAuth}
          style={{
            position: 'relative',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Bell size={17} color="#475569" />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid #fff'
            }}
          />
        </button>
      </div>
    </header>
  );
}
