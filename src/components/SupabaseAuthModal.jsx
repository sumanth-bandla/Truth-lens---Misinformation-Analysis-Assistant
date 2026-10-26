import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Mail, Shield } from 'lucide-react';
import {
  supabase,
  supabaseConfigured,
  supabaseConfigurationError
} from '../services/supabaseClient';

function getAuthErrorMessage(error, isSignUp) {
  const message = error?.message?.toLowerCase() || '';
  const code = error?.code?.toLowerCase() || '';

  if (
    error instanceof TypeError ||
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('timeout')
  ) {
    return 'Could not reach Supabase. Check your internet connection and Supabase project URL, then try again.';
  }

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Please confirm your email using the link we sent before signing in.';
  }

  if (
    !isSignUp &&
    (code === 'invalid_credentials' || message.includes('invalid login credentials'))
  ) {
    return 'Email or password is incorrect. Check your details and try again.';
  }

  if (isSignUp && (code === 'user_already_exists' || message.includes('already registered'))) {
    return 'We could not create this account. If you already registered, sign in or use another email address.';
  }

  if (message.includes('password')) {
    return 'The password was rejected. Use a valid password and try again.';
  }

  return error?.message || 'Authentication could not be completed. Please try again.';
}

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

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (isSignUp && !displayName.trim()) {
      setError('Enter your name to create an account.');
      return;
    }
    if (password.length < 8) {
      setError('Your password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      if (!supabase) {
        throw new Error(supabaseConfigurationError || 'Supabase is not configured.');
      }

      if (isSignUp) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { display_name: displayName.trim() },
            emailRedirectTo: window.location.origin
          }
        });
        if (authError) throw authError;
        if (!data.user) {
          throw new Error('Supabase did not return an account. Please try again.');
        }
        if (!data.session && data.user.identities?.length === 0) {
          setMessage('We could not start registration. If you already have an account, sign in instead.');
          return;
        }
        if (data.session) {
          setMessage('Account created and signed in.');
        } else {
          setMessage('Account created. Check your email to confirm your address, then sign in.');
        }
      } else {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password
        });
        if (authError) throw authError;
        if (!data.session) {
          throw new Error('Supabase did not start a sign-in session. Please try again.');
        }
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError, isSignUp));
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
              {supabaseConfigurationError}
            </div>
          )}
          {error && <div role="alert" className="account-message account-message-error">{error}</div>}
          {message && <div role="status" className="account-message account-message-success">{message}</div>}

          <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {isSignUp && (
              <label className="account-field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Your name"
                  disabled={submitting}
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
                  disabled={submitting}
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
                  disabled={submitting}
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
              disabled={submitting}
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
