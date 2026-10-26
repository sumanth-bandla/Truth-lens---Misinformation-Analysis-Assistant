import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AuthModal from './components/AuthModal';

import LandingPage from './views/LandingPage';
import DashboardView from './views/DashboardView';
import AnalyzeView from './views/AnalyzeView';
import ReportView from './views/ReportView';
import SourcesView from './views/SourcesView';
import HistoryView from './views/HistoryView';
import ExtensionSimulatorView from './views/ExtensionSimulatorView';
import SettingsView from './views/SettingsView';

import { sampleAnalyses } from './data/sampleData';

export default function App() {
  const [currentView, setCurrentView] = useState('settings');
  const [analyses, setAnalyses] = useState(sampleAnalyses);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState('scan-9021');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [initialUrlForScan, setInitialUrlForScan] = useState('');

  const currentAnalysis =
    analyses.find((a) => a.id === selectedAnalysisId) || analyses[0];

  const handleNavigate = (view, params = {}) => {
    if (params.initialUrl) {
      setInitialUrlForScan(params.initialUrl);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanComplete = (resultOrId) => {
    if (typeof resultOrId === 'object' && resultOrId?.id) {
      setAnalyses((prev) => [resultOrId, ...prev.filter((a) => a.id !== resultOrId.id)]);
      setSelectedAnalysisId(resultOrId.id);
    } else {
      setSelectedAnalysisId(resultOrId);
    }
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (sampleId) => {
    setSelectedAnalysisId(sampleId);
  };

  // If on landing view, render full screen landing page
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchApp={(view = 'dashboard') => setCurrentView(view)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onSelectSample={handleSelectSample}
          onScanComplete={handleScanComplete}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </>
    );
  }

  // App layout with Sidebar & Topbar
  return (
    <div className="app-layout">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <div className="main-content">
        <Topbar
          onNewScan={() => setCurrentView('analyze')}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

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
            onUpdateAnalysis={(updated) => {
              setAnalyses((prev) => [updated, ...prev.filter((a) => a.id !== updated.id)]);
              setSelectedAnalysisId(updated.id);
            }}
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

        {currentView === 'settings' && <SettingsView />}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
