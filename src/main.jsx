import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Ensure API key from environment is initialized in localStorage if not set
if (typeof window !== 'undefined' && window.localStorage) {
  const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (envKey && !localStorage.getItem('truthlens_gemini_api_key')) {
    localStorage.setItem('truthlens_gemini_api_key', envKey);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
