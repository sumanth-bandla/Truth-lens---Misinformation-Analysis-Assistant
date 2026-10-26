import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Mail, Shield } from 'lucide-react';
import { supabase, supabaseConfigured } from '../services/supabaseClient';

export default function SupabaseAuthModal({ initialError = '' }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialError) setError(initialError);
  }, [initialError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Add your project URL and publishable key to the local .env file.');
      }

      if (isSignUp) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: displayName.trim() } }
        });
        if (authError) throw authError;
        if (!data.session) {
          setMessage('Account created. Check your email to confirm your address, then sign in.');
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (authError) throw authError;
      }
    } catch (authError) {
      setError(authError.message || 'Unable to authenticate. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal auth-modal-single">
        <div className="auth-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div className="brand-icon">
              <Shield size={20} color="#fff" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>TruthLens</span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            {isSignUp ? 'Create your account' : 'Sign in to TruthLens'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '22px', lineHeight: 1.5 }}>
            Sign in to access your account and private analysis history.
          </p>

          {!supabaseConfigured && (
            <div role="alert" className="account-message account-message-error" style={{ marginBottom: '16px' }}>
              Add the Supabase publishable/anon key to `.env`. The project URL is already configured.
            </div>
          )}
          {error && <div role="alert" className="account-message account-message-error">{error}</div>}
          {message && <div role="status" className="account-message account-message-success">{message}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {isSignUp && (
              <label className="account-field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Your name"
                />
              </label>
            )}

            <label className="account-field">
              <span>Email address</span>
              <div className="account-input-wrap">
                <Mail size={16} aria-hidden="true" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="account-field">
              <span>Password</span>
              <div className="account-input-wrap">
                <Lock size={16} aria-hidden="true" />
                <input
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
            </label>

            <button className="btn btn-primary" type="submit" disabled={submitting || !supabaseConfigured}>
              <span>{submitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '18px', color: '#64748b', fontSize: '0.88rem' }}>
            {isSignUp ? 'Already have an account?' : 'New to TruthLens?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp((value) => !value);
                setError('');
                setMessage('');
              }}
              className="account-link"
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
