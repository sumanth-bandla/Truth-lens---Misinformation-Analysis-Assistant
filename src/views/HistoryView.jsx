import React, { useState } from 'react';
import { History, Search, Download, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';

export default function HistoryView({ analyses, onSelectAnalysis, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.domain.toLowerCase().includes(search.toLowerCase());

    if (filter === 'false') return matchesSearch && item.verdictType === 'false';
    if (filter === 'warning') return matchesSearch && item.verdictType === 'warning';
    if (filter === 'verified') return matchesSearch && item.verdictType === 'verified';
    return matchesSearch;
  });

  const exportCSV = () => {
    const rows = [
      ['ID', 'Title', 'Domain', 'Date', 'Score', 'Verdict'],
      ...analyses.map((a) => [a.id, `"${a.title.replace(/"/g, '""')}"`, a.domain, a.date, a.trustScore, a.verdict])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'truthlens_audit_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Audit Log & Scan History</h1>
          <p className="section-subtitle">
            Archive of historical content analyses, extracted claims, and credibility verification audits.
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={exportCSV}>
          <Download size={15} />
          <span>Export CSV Audit</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '22px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search past scans by title, source, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 36px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff'
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All ({analyses.length})
          </button>
          <button
            onClick={() => setFilter('false')}
            className={`btn btn-sm ${filter === 'false' ? 'btn-primary' : 'btn-secondary'}`}
          >
            False / Hoaxes
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`btn btn-sm ${filter === 'warning' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Misleading
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`btn btn-sm ${filter === 'verified' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Verified Authentic
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Scan ID & Title</th>
              <th>Source / Publisher</th>
              <th>Audited</th>
              <th>Truth Index</th>
              <th>Verdict</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalyses.map((item) => (
              <tr key={item.id}>
                <td style={{ maxWidth: '380px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>{item.id}</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginTop: '2px' }}>
                    {item.title}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{item.source}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.domain}</div>
                </td>
                <td style={{ whiteSpace: 'nowrap', fontSize: '0.84rem', color: '#64748b' }}>
                  {item.date}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CredibilityGauge score={item.trustScore} size={42} strokeWidth={4} showLabel={false} />
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{item.trustScore}%</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      item.verdictType === 'false'
                        ? 'badge-false'
                        : item.verdictType === 'warning'
                        ? 'badge-warning'
                        : 'badge-verified'
                    }`}
                  >
                    {item.verdict}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      onSelectAnalysis(item.id);
                      onNavigate('report');
                    }}
                  >
                    <span>View Audit</span>
                    <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
