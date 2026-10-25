import React from 'react';
import {
  LayoutDashboard,
  Search,
  FileText,
  ShieldAlert,
  History,
  Puzzle,
  Settings,
  Sparkles,
  LogOut,
  ExternalLink,
  Shield
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, onOpenAuth }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'New Analysis', icon: Search },
    { id: 'report', label: 'Credibility Reports', icon: FileText },
    { id: 'sources', label: 'Source Watchlist', icon: ShieldAlert },
    { id: 'history', label: 'Scan History', icon: History },
    { id: 'extension', label: 'Browser Extension', icon: Puzzle },
    { id: 'settings', label: 'Settings & Ollama', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <a
          href="#landing"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('landing');
          }}
          className="brand-logo"
        >
          <div className="brand-icon">
            <Shield size={18} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ lineHeight: 1.1 }}>TruthLens</span>
            <span style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 600, letterSpacing: '0.04em' }}>
              AI ASSISTANT
            </span>
          </div>
        </a>
      </div>

      {/* AI Status Chip */}
      <div style={{ padding: '12px 16px 0' }}>
        <div
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.72rem', color: '#93c5fd', fontWeight: 700 }}>Ollama Local Engine</span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>LLaMA-3 Model Active</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav-list">
        <div className="nav-section-label">Core Platform</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <li key={item.id}>
              <div
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            </li>
          );
        })}

        <div className="nav-section-label" style={{ marginTop: '12px' }}>Public Preview</div>
        <li>
          <div
            className={`nav-item ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => setCurrentView('landing')}
          >
            <Sparkles size={18} />
            <span>Marketing Landing</span>
          </div>
        </li>
      </ul>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="user-badge" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="user-avatar">SB</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>Sumanth</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Pro Analyst Tier</div>
            </div>
          </div>
          <button
            onClick={onOpenAuth}
            title="Account"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
