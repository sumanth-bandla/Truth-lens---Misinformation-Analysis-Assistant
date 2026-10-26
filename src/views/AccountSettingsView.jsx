import React, { useEffect, useState } from 'react';
import { LogOut, Shield, Users } from 'lucide-react';

export default function AccountSettingsView({
  user,
  profile,
  onSignOut,
  onUpdateProfile,
  onLoadAdminProfiles
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [adminProfiles, setAdminProfiles] = useState([]);
  const [loadingAdminProfiles, setLoadingAdminProfiles] = useState(false);

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    setDisplayName(profile?.display_name || '');
  }, [profile?.display_name]);

  useEffect(() => {
    if (!isAdmin) return;

    let active = true;
    setLoadingAdminProfiles(true);
    onLoadAdminProfiles()
      .then((profiles) => {
        if (active) setAdminProfiles(profiles);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message || 'Could not load account details.');
      })
      .finally(() => {
        if (active) setLoadingAdminProfiles(false);
      });

    return () => {
      active = false;
    };
  }, [isAdmin, onLoadAdminProfiles]);

  const handleSave = async (event) => {
    event.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);

    try {
      await onUpdateProfile(displayName.trim());
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message || 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    setError('');
    try {
      await onSignOut();
    } catch (signOutError) {
      setError(signOutError.message || 'Could not sign out.');
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Account settings</h1>
          <p className="section-subtitle">Manage your TruthLens login and administrator account details.</p>
        </div>
      </div>

      {error && <div role="alert" className="account-message account-message-error">{error}</div>}

      <div className="account-settings-grid">
        <section className="card account-settings-card">
          <div className="account-card-heading">
            <div className="account-icon"><Shield size={20} /></div>
            <div>
              <h2>Account</h2>
              <p>Your signed-in TruthLens profile</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="account-settings-form">
            <label className="account-field">
              <span>Email address</span>
              <input type="email" value={user.email || ''} readOnly />
            </label>
            <label className="account-field">
              <span>Display name</span>
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                maxLength={80}
              />
            </label>
            <div className="account-role-row">
              <span>Role</span>
              <span className={`account-role ${isAdmin ? 'account-role-admin' : ''}`}>
                {isAdmin ? 'Administrator' : 'User'}
              </span>
            </div>
            <div className="account-actions">
              <button className="btn btn-primary" type="submit" disabled={saving || !displayName.trim()}>
                {saving ? 'Saving…' : saved ? 'Saved' : 'Save profile'}
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleSignOut}>
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </form>
        </section>

        <section className="card account-settings-card">
          <div className="account-card-heading">
            <div className="account-icon"><Users size={20} /></div>
            <div>
              <h2>Administrator details</h2>
              <p>{isAdmin ? 'Registered accounts in this project' : 'Administrator access is managed in Supabase.'}</p>
            </div>
          </div>

          {isAdmin ? (
            loadingAdminProfiles ? (
              <p className="account-muted">Loading account list…</p>
            ) : (
              <div className="account-users">
                {adminProfiles.map((account) => (
                  <div className="account-user-row" key={account.id}>
                    <div>
                      <strong>{account.display_name || 'Unnamed account'}</strong>
                      <span>{account.email}</span>
                    </div>
                    <span className={`account-role ${account.role === 'admin' ? 'account-role-admin' : ''}`}>
                      {account.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </div>
                ))}
                {adminProfiles.length === 0 && <p className="account-muted">No account profiles found.</p>}
              </div>
            )
          ) : (
            <div className="account-admin-note">
              <p>Promote an account to administrator in the Supabase SQL editor. Only admins can view the account list.</p>
              <code>update public.profiles set role = 'admin' where email = 'your-email@example.com';</code>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
