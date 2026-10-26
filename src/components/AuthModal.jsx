import React, { useState } from 'react';
import { X, Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signed in successfully as ${email || 'analyst@truthlens.ai'}!`);
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Left Navy Column */}
        <div className="auth-sidebar">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div className="brand-icon">
                <Shield size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>TruthLens</span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '14px' }}>
              Real-time truth verification powered by private AI.
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
              Assess online news credibility, cross-examine claims, and safeguard against misinformation without sharing your browsing data.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span style={{ fontSize: '0.86rem', color: '#e2e8f0' }}>Real-time Gemini 2.5 Flash AI inference</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span style={{ fontSize: '0.86rem', color: '#e2e8f0' }}>Automated IFCN fact-check cross-referencing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span style={{ fontSize: '0.86rem', color: '#e2e8f0' }}>Domain credibility & media bias intelligence</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '24px' }}>
            © 2026 TruthLens Research. End-to-end client-side privacy.
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              {isSignUp ? 'Create Analyst Account' : 'Welcome to TruthLens'}
            </h2>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '4px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={() => setIsSignUp(false)}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: !isSignUp ? '#fff' : 'transparent',
                fontWeight: 600,
                fontSize: '0.85rem',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: !isSignUp ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: isSignUp ? '#fff' : 'transparent',
                fontWeight: 600,
                fontSize: '0.85rem',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: isSignUp ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  required
                  placeholder="analyst@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              <span>{isSignUp ? 'Create Free Account' : 'Sign In to Workspace'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={() => {
                alert('Continuing as guest analyst!');
                onClose();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Continue as Guest Demo Analyst →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
