import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SupabaseAuthModal from './components/SupabaseAuthModal';

import LandingPage from './views/LandingPage';
import DashboardView from './views/DashboardView';
import AnalyzeView from './views/AnalyzeView';
import ReportView from './views/ReportView';
import SourcesView from './views/SourcesView';
import HistoryView from './views/HistoryView';
import ExtensionSimulatorView from './views/ExtensionSimulatorView';
import AccountSettingsView from './views/AccountSettingsView';

import { sampleAnalyses } from './data/sampleData';
import {
  fetchAdminProfiles,
  fetchAnalyses,
  fetchProfile,
  saveAnalysis,
  supabase,
  updateProfile
} from './services/supabaseClient';

export default function App() {
  const [currentView, setCurrentView] = useState('settings');
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [initialUrlForScan, setInitialUrlForScan] = useState('');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [appError, setAppError] = useState('');

  const currentAnalysis =
    analyses.find((analysis) => analysis.id === selectedAnalysisId) ||
    sampleAnalyses.find((analysis) => analysis.id === selectedAnalysisId) ||
    analyses[0] ||
    sampleAnalyses[0];

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user || null);
      setAuthLoading(false);
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) throw error;
        setUser(data.session?.user || null);
      })
      .catch((error) => {
        if (active) setAppError(`Could not restore your sign-in session: ${error.message}`);
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setAnalyses([]);
      setSelectedAnalysisId(null);
      setAppError('');
      return undefined;
    }

    let active = true;
    setProfile(null);
    setAnalyses([]);
    setAppError('');

    fetchProfile(user.id)
      .then((nextProfile) => {
        if (active) setProfile(nextProfile);
      })
      .catch((error) => {
        if (active) setAppError(`Could not load your account profile: ${error.message}`);
      });

    fetchAnalyses(user.id)
      .then((savedAnalyses) => {
        if (!active) return;
        setAnalyses(savedAnalyses);
        setSelectedAnalysisId(savedAnalyses[0]?.id || null);
      })
      .catch((error) => {
        if (active) setAppError((current) => [current, `Could not load your saved analyses: ${error.message}`].filter(Boolean).join(' '));
      });

    return () => {
      active = false;
    };
  }, [user]);

  const handleNavigate = (view, params = {}) => {
    if (params.initialUrl) setInitialUrlForScan(params.initialUrl);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanComplete = async (resultOrId) => {
    if (typeof resultOrId === 'object' && resultOrId?.id) {
      setAnalyses((previous) => [
        resultOrId,
        ...previous.filter((analysis) => analysis.id !== resultOrId.id)
      ]);
      setSelectedAnalysisId(resultOrId.id);
      try {
        await saveAnalysis(user.id, resultOrId);
      } catch (error) {
        setAppError(`Analysis completed but could not be saved to Supabase: ${error.message}`);
      }
    } else {
      setSelectedAnalysisId(resultOrId);
    }
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAnalysis = async (updatedAnalysis) => {
    setAnalyses((previous) => [
      updatedAnalysis,
      ...previous.filter((analysis) => analysis.id !== updatedAnalysis.id)
    ]);
    setSelectedAnalysisId(updatedAnalysis.id);
    try {
      await saveAnalysis(user.id, updatedAnalysis);
    } catch (error) {
      setAppError(`Report updated but could not be saved to Supabase: ${error.message}`);
    }
  };

  const handleSelectSample = (sampleId) => {
    setSelectedAnalysisId(sampleId);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const handleUpdateProfile = async (displayName) => {
    const updatedProfile = await updateProfile(user.id, displayName);
    setProfile(updatedProfile);
  };

  const handleLoadAdminProfiles = useCallback(() => fetchAdminProfiles(), []);

  if (authLoading) {
    return (
      <div className="auth-overlay">
        <div className="card" role="status" style={{ padding: '28px', color: '#475569' }}>
          Restoring your TruthLens session…
        </div>
      </div>
    );
  }

  if (!user) return <SupabaseAuthModal initialError={appError} />;

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchApp={(view = 'dashboard') => setCurrentView(view)}
          onOpenAuth={() => setCurrentView('settings')}
          onSelectSample={handleSelectSample}
          onScanComplete={handleScanComplete}
        />
        {appError && <div role="alert" className="account-message account-message-error app-error-banner">{appError}</div>}
      </>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAuth={() => setCurrentView('settings')}
        user={user}
        profile={profile}
      />

      <div className="main-content">
        <Topbar
          onNewScan={() => setCurrentView('analyze')}
          onOpenAuth={() => setCurrentView('settings')}
        />

        {appError && <div role="alert" className="account-message account-message-error app-error-banner">{appError}</div>}

        {currentView === 'dashboard' && (
          <DashboardView
            analyses={analyses}
            onSelectAnalysis={(id) => {
              setSelectedAnalysisId(id);
              setCurrentView('report');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'analyze' && (
          <AnalyzeView
            initialUrl={initialUrlForScan}
            onScanComplete={handleScanComplete}
          />
        )}

        {currentView === 'report' && (
          <ReportView
            analysis={currentAnalysis}
            analyses={analyses}
            onSelectAnalysis={(id) => setSelectedAnalysisId(id)}
            onBack={() => setCurrentView('dashboard')}
            onUpdateAnalysis={handleUpdateAnalysis}
            onRescan={(query) => handleNavigate('analyze', { initialUrl: query })}
          />
        )}

        {currentView === 'sources' && <SourcesView />}

        {currentView === 'history' && (
          <HistoryView
            analyses={analyses}
            onSelectAnalysis={(id) => setSelectedAnalysisId(id)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'extension' && <ExtensionSimulatorView />}

        {currentView === 'settings' && (
          <AccountSettingsView
            user={user}
            profile={profile}
            onSignOut={handleSignOut}
            onUpdateProfile={handleUpdateProfile}
            onLoadAdminProfiles={handleLoadAdminProfiles}
          />
        )}
      </div>
    </div>
  );
}
