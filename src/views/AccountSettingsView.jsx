import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  Mail,
  Shield,
  ShieldCheck,
  UserRound,
  Users,
  X
} from 'lucide-react';

const MAX_AVATAR_SIZE = 256 * 1024;
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function formatAccountDate(date) {
  if (!date) return 'Unavailable';

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Unavailable';

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(parsedDate);
}

function readAvatarFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Could not read the selected image.'));
    };
    reader.onerror = () => reject(new Error('Could not read the selected image.'));
    reader.readAsDataURL(file);
  });
}

export default function AccountSettingsView({
  user,
  profile,
  onSignOut,
  onUpdateProfile,
  onChangePassword,
  onLoadAdminProfiles
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [saving, setSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  const [adminProfiles, setAdminProfiles] = useState([]);
  const [adminError, setAdminError] = useState('');
  const [loadingAdminProfiles, setLoadingAdminProfiles] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState(null);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const avatarInputRef = useRef(null);
  const signOutCancelRef = useRef(null);

  const isAdmin = profile?.role === 'admin';
  const hasProfileChanges =
    displayName.trim() !== (profile?.display_name || '') ||
    avatarUrl !== (profile?.avatar_url || '');
  const accountCreatedAt = profile?.created_at || user.created_at;
  const emailConfirmed = Boolean(user.email_confirmed_at || user.confirmed_at);

  useEffect(() => {
    setDisplayName(profile?.display_name || '');
    setAvatarUrl(profile?.avatar_url || '');
  }, [profile?.display_name, profile?.avatar_url]);

  useEffect(() => {
    if (!confirmingSignOut) return undefined;

    const previouslyFocused = document.activeElement;
    signOutCancelRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !signingOut) setConfirmingSignOut(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [confirmingSignOut, signingOut]);

  useEffect(() => {
    if (!isAdmin) {
      setAdminProfiles([]);
      setAdminError('');
      return undefined;
    }

    let active = true;
    setLoadingAdminProfiles(true);
    setAdminError('');
    onLoadAdminProfiles()
      .then((profiles) => {
        if (active) setAdminProfiles(profiles);
      })
      .catch((loadError) => {
        if (active) setAdminError(loadError.message || 'Could not load account details.');
      })
      .finally(() => {
        if (active) setLoadingAdminProfiles(false);
      });

    return () => {
      active = false;
    };
  }, [isAdmin, onLoadAdminProfiles]);

  const handleAvatarFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    setAvatarError('');
    setProfileNotice(null);
    if (!file) return;

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setAvatarError('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Choose an image smaller than 256 KB.');
      return;
    }

    try {
      setAvatarUrl(await readAvatarFile(file));
    } catch (readError) {
      setAvatarError(readError.message || 'Could not load the selected image.');
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setProfileNotice(null);
    setAvatarError('');

    if (!displayName.trim()) {
      setProfileNotice({ type: 'error', text: 'Display name cannot be empty.' });
      return;
    }

    setSaving(true);
    try {
      await onUpdateProfile(displayName.trim(), avatarUrl || null);
      setProfileNotice({ type: 'success', text: 'Your profile changes have been saved.' });
    } catch (saveError) {
      setProfileNotice({
        type: 'error',
        text: saveError.message || 'Could not save your profile. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPasswordNotice(null);

    if (newPassword.length < 8) {
      setPasswordNotice({ type: 'error', text: 'Use a password with at least 8 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ type: 'error', text: 'The passwords do not match.' });
      return;
    }

    setChangingPassword(true);
    try {
      await onChangePassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordNotice({ type: 'success', text: 'Your password has been updated.' });
    } catch (passwordError) {
      setPasswordNotice({
        type: 'error',
        text: passwordError.message || 'Could not update your password. Please try again.'
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    setProfileNotice(null);
    try {
      await onSignOut();
    } catch (signOutError) {
      setProfileNotice({
        type: 'error',
        text: signOutError.message || 'Could not sign out. Please try again.'
      });
      setSigningOut(false);
      setConfirmingSignOut(false);
    }
  };

  return (
    <div className="page-container account-settings-page">
      <div className="account-settings-header">
        <div>
          <span className="account-settings-eyebrow">
            <ShieldCheck size={14} /> YOUR WORKSPACE
          </span>
          <h1 className="section-title">Account settings</h1>
          <p className="section-subtitle">
            Manage your profile, security, and TruthLens account details.
          </p>
        </div>
        <span className="account-settings-secure">
          <span aria-hidden="true" /> Secure account
        </span>
      </div>

      <div className="account-settings-layout">
        <section className="card account-settings-card account-profile-card" aria-labelledby="profile-heading">
          <div className="account-card-heading">
            <div className="account-icon"><UserRound size={20} /></div>
            <div>
              <h2 id="profile-heading">Profile information</h2>
              <p>Update the details shown on your account.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="account-settings-form">
            <div className="account-avatar-editor">
              <div className="account-avatar-preview" aria-label="Profile avatar preview">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Your profile avatar" />
                ) : (
                  <span aria-hidden="true">
                    {(displayName.trim() || user.email || 'U').slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="account-avatar-controls">
                <strong>Profile avatar</strong>
                <span>JPG, PNG, or WebP · up to 256 KB</span>
                <div className="account-avatar-actions">
                  <input
                    ref={avatarInputRef}
                    className="account-visually-hidden"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    aria-label="Choose profile avatar"
                    onChange={handleAvatarFile}
                    disabled={saving}
                  />
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={saving}
                  >
                    <Camera size={15} /> Change avatar
                  </button>
                  {avatarUrl && (
                    <button
                      className="account-text-button"
                      type="button"
                      onClick={() => {
                        setAvatarUrl('');
                        setAvatarError('');
                        setProfileNotice(null);
                      }}
                      disabled={saving}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {avatarError && (
              <p role="alert" className="account-inline-error">
                <AlertCircle size={15} /> {avatarError}
              </p>
            )}

            <label className="account-field" htmlFor="account-email">
              <span>Email address</span>
              <div className="account-readonly-field">
                <Mail size={16} aria-hidden="true" />
                <input id="account-email" type="email" value={user.email || ''} readOnly />
                <span className="account-readonly-tag">READ ONLY</span>
              </div>
            </label>

            <label className="account-field" htmlFor="account-display-name">
              <span>Display name</span>
              <input
                id="account-display-name"
                type="text"
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                  setProfileNotice(null);
                }}
                placeholder="Your name"
                maxLength={80}
                autoComplete="name"
                disabled={saving}
                required
              />
            </label>

            {profileNotice && (
              <p
                role={profileNotice.type === 'error' ? 'alert' : 'status'}
                className={`account-notice account-notice-${profileNotice.type}`}
              >
                {profileNotice.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {profileNotice.text}
              </p>
            )}

            <div className="account-profile-footer">
              <span className="account-muted">Changes are saved to your private profile.</span>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={saving || !hasProfileChanges || !displayName.trim()}
              >
                {saving ? 'Saving changes…' : 'Save changes'}
              </button>
            </div>
          </form>
        </section>

        <div className="account-settings-side">
          <section className="card account-settings-card" aria-labelledby="account-info-heading">
            <div className="account-card-heading">
              <div className="account-icon"><Shield size={20} /></div>
              <div>
                <h2 id="account-info-heading">Account information</h2>
                <p>Your current workspace access.</p>
              </div>
            </div>

            <dl className="account-info-list">
              <div>
                <dt>Account role</dt>
                <dd>
                  <span className={`account-role ${isAdmin ? 'account-role-admin' : ''}`}>
                    {isAdmin ? 'Administrator' : profile?.role ? 'Member' : 'Loading role'}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Account status</dt>
                <dd className="account-status-active"><span aria-hidden="true" /> Active</dd>
              </div>
              <div>
                <dt>Email verification</dt>
                <dd>{emailConfirmed ? 'Verified' : 'Pending confirmation'}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd><CalendarDays size={14} /> {formatAccountDate(accountCreatedAt)}</dd>
              </div>
            </dl>
          </section>

          <section className="card account-settings-card account-admin-card" aria-labelledby="admin-heading">
            <div className="account-card-heading">
              <div className="account-icon"><Users size={20} /></div>
              <div>
                <h2 id="admin-heading">Administrator details</h2>
                <p>Access and account administration.</p>
              </div>
            </div>

            <p className="account-admin-description">
              Administrator privileges are managed securely through the project’s Supabase controls.
              Only authorized administrators can view the account directory.
            </p>

            {isAdmin && (
              <div className="account-admin-directory">
                <div className="account-admin-directory-heading">
                  <strong>Account directory</strong>
                  <span>{loadingAdminProfiles ? 'Loading…' : `${adminProfiles.length} accounts`}</span>
                </div>
                {adminError && <p role="alert" className="account-inline-error">{adminError}</p>}
                {!loadingAdminProfiles && !adminError && (
                  <div className="account-users">
                    {adminProfiles.map((account) => (
                      <div className="account-user-row" key={account.id}>
                        <div>
                          <strong>{account.display_name || 'Unnamed account'}</strong>
                          <span>{account.email}</span>
                        </div>
                        <span className={`account-role ${account.role === 'admin' ? 'account-role-admin' : ''}`}>
                          {account.role === 'admin' ? 'Admin' : 'Member'}
                        </span>
                      </div>
                    ))}
                    {adminProfiles.length === 0 && <p className="account-muted">No accounts are available.</p>}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <section className="card account-settings-card account-security-card" aria-labelledby="security-heading">
          <div className="account-card-heading">
            <div className="account-icon"><KeyRound size={20} /></div>
            <div>
              <h2 id="security-heading">Security &amp; authentication</h2>
              <p>Change your password or securely end your session.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="account-password-form">
            <label className="account-field" htmlFor="account-new-password">
              <span>New password</span>
              <div className="account-password-input">
                <input
                  id="account-new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setPasswordNotice(null);
                  }}
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={72}
                  placeholder="At least 8 characters"
                  disabled={changingPassword}
                  required
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  aria-pressed={showNewPassword}
                  onClick={() => setShowNewPassword((visible) => !visible)}
                  disabled={changingPassword}
                >
                  {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            <label className="account-field" htmlFor="account-confirm-password">
              <span>Confirm new password</span>
              <div className="account-password-input">
                <input
                  id="account-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setPasswordNotice(null);
                  }}
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={72}
                  placeholder="Re-enter your new password"
                  disabled={changingPassword}
                  required
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  aria-pressed={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  disabled={changingPassword}
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            <div className="account-password-submit">
              <span className="account-muted">Use at least 8 characters.</span>
              <button
                className="btn btn-secondary"
                type="submit"
                disabled={changingPassword || !newPassword || !confirmPassword}
              >
                {changingPassword ? 'Updating password…' : 'Update password'}
              </button>
            </div>

            {passwordNotice && (
              <p
                role={passwordNotice.type === 'error' ? 'alert' : 'status'}
                className={`account-notice account-notice-${passwordNotice.type}`}
              >
                {passwordNotice.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {passwordNotice.text}
              </p>
            )}
          </form>

          <div className="account-signout-row">
            <div>
              <strong>Sign out of TruthLens</strong>
              <span>This ends your current session on this device.</span>
            </div>
            <button
              className="btn btn-danger-outline"
              type="button"
              onClick={() => setConfirmingSignOut(true)}
              disabled={signingOut}
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </section>
      </div>

      {confirmingSignOut && (
        <div className="account-confirm-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !signingOut) setConfirmingSignOut(false);
        }}>
          <section
            className="account-confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="signout-dialog-title"
            aria-describedby="signout-dialog-description"
          >
            <div className="account-confirm-icon"><LogOut size={20} /></div>
            <button
              className="account-confirm-close"
              type="button"
              aria-label="Close sign-out confirmation"
              onClick={() => setConfirmingSignOut(false)}
              disabled={signingOut}
            >
              <X size={18} />
            </button>
            <h2 id="signout-dialog-title">Sign out?</h2>
            <p id="signout-dialog-description">You’ll need to sign in again to access your account and saved analyses.</p>
            <div className="account-confirm-actions">
              <button
                ref={signOutCancelRef}
                className="btn btn-secondary"
                type="button"
                onClick={() => setConfirmingSignOut(false)}
                disabled={signingOut}
              >
                Stay signed in
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
