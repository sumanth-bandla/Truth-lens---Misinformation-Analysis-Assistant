import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, ExternalLink, Globe, ShieldAlert } from 'lucide-react';
import { sampleSources } from '../data/sampleData';

export default function SourcesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredSources = sampleSources.filter((source) => {
    const matchesSearch =
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.domain.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'high') return matchesSearch && source.score >= 80;
    if (selectedFilter === 'mixed') return matchesSearch && source.score >= 50 && source.score < 80;
    if (selectedFilter === 'low') return matchesSearch && source.score < 50;
    return matchesSearch;
  });

  const getScoreBadge = (score) => {
    if (score >= 85) return <span className="badge badge-verified">{score}% Trust</span>;
    if (score >= 60) return <span className="badge badge-warning">{score}% Mixed</span>;
    return <span className="badge badge-false">{score}% Low Trust</span>;
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Source Reliability & Media Watchlist</h1>
          <p className="section-subtitle">
            Reputation index, bias assessment, and editorial transparency records for major online news domains.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <input
            type="text"
            placeholder="Search news outlets or domains (e.g., reuters, nature, theonion)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 38px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              backgroundColor: '#fff'
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`btn btn-sm ${selectedFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Sources
          </button>
          <button
            onClick={() => setSelectedFilter('high')}
            className={`btn btn-sm ${selectedFilter === 'high' ? 'btn-primary' : 'btn-secondary'}`}
          >
            High Trust (80+)
          </button>
          <button
            onClick={() => setSelectedFilter('mixed')}
            className={`btn btn-sm ${selectedFilter === 'mixed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Mixed / Moderate
          </button>
          <button
            onClick={() => setSelectedFilter('low')}
            className={`btn btn-sm ${selectedFilter === 'low' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Flagged Low Trust
          </button>
        </div>
      </div>

      {/* Sources Table Card */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Publisher / Domain</th>
              <th>Category</th>
              <th>Bias Leaning</th>
              <th>Trust Rating</th>
              <th>Editorial Accountability & History</th>
            </tr>
          </thead>
          <tbody>
            {filteredSources.map((s, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: '#eff6ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563eb'
                      }}
                    >
                      <Globe size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{s.domain}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-navy" style={{ fontSize: '0.74rem' }}>
                    {s.category}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    {s.bias}
                  </span>
                </td>
                <td>{getScoreBadge(s.score)}</td>
                <td style={{ maxWidth: '340px', fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                  {s.factCheckHistory}
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '3px' }}>
                    Owner: {s.ownership}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
