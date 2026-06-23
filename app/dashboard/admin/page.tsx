'use client';

import { Settings, Users, Database, Shield, Activity, ChevronRight } from 'lucide-react';

const USERS_DATA = [
  { name: 'Arjun Sharma', email: 'arjun@team.in', role: 'Athlete', status: 'Active', lastLogin: '2h ago', assessments: 24 },
  { name: 'Rahul Dravid', email: 'rahul@team.in', role: 'Coach', status: 'Active', lastLogin: '30m ago', assessments: 0 },
  { name: 'Dr. Priya Nair', email: 'priya@team.in', role: 'Psychologist', status: 'Active', lastLogin: '1h ago', assessments: 0 },
  { name: 'Vikram Singh', email: 'vikram@team.in', role: 'Team Manager', status: 'Active', lastLogin: '3h ago', assessments: 0 },
  { name: 'Anand Patel', email: 'anand@team.in', role: 'Athlete', status: 'Crisis', lastLogin: '2h ago', assessments: 18 },
  { name: 'Ravi Kumar', email: 'ravi@team.in', role: 'Athlete', status: 'High Risk', lastLogin: '4h ago', assessments: 21 },
  { name: 'Anil Kumble', email: 'anil@team.in', role: 'Selector', status: 'Active', lastLogin: '1d ago', assessments: 0 },
];

const ROLE_COLORS: Record<string, string> = {
  Athlete: '#6366f1', Coach: '#06b6d4', Psychologist: '#8b5cf6',
  'Team Manager': '#f59e0b', Selector: '#ec4899', Admin: '#ef4444',
};

const STATUS_COLORS: Record<string, string> = {
  Active: '#10b981', Crisis: '#ef4444', 'High Risk': '#f59e0b',
};

export default function AdminDashboard() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={28} color="#ef4444" />
          Admin Dashboard
        </h1>
        <p className="page-subtitle">System administration, user management, and platform governance</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Users', value: '47', color: '#6366f1', icon: <Users size={16} /> },
          { label: 'Active Teams', value: '4', color: '#06b6d4', icon: <Activity size={16} /> },
          { label: 'Assessments Today', value: '38', color: '#10b981', icon: <Database size={16} /> },
          { label: 'Model Accuracy', value: '94%', color: '#8b5cf6', icon: <Shield size={16} /> },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: 'absolute', top: 0, right: 0, width: '70px', height: '70px', background: `radial-gradient(circle, ${s.color}18 0%, transparent 70%)`, borderRadius: '0 20px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</p>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Model Monitor */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700' }}>🤖 ML Model Status</h3>
          <span className="badge badge-success">All Systems Operational</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { name: 'BERT (Assessment)', accuracy: 92, latency: '45ms', status: 'active' },
            { name: 'XGBoost (Readiness)', accuracy: 88, latency: '12ms', status: 'active' },
            { name: 'Random Forest (Burnout)', accuracy: 90, latency: '8ms', status: 'active' },
            { name: 'RoBERTa (Journal NLP)', accuracy: 94, latency: '60ms', status: 'active' },
            { name: 'Wav2Vec2 (Voice)', accuracy: 86, latency: '120ms', status: 'active' },
            { name: 'LightGBM (Injury)', accuracy: 89, latency: '10ms', status: 'training' },
          ].map((model, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{model.name}</div>
                <div className={`pulse-dot ${model.status === 'active' ? 'pulse-dot-success' : 'pulse-dot-warning'}`} style={{ width: '7px', height: '7px', marginTop: '3px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span>Accuracy: <span style={{ color: '#10b981', fontWeight: '700' }}>{model.accuracy}%</span></span>
                <span>Latency: <span style={{ color: '#06b6d4', fontWeight: '700' }}>{model.latency}</span></span>
              </div>
              <div className="progress-bar" style={{ marginTop: '8px' }}>
                <div className="progress-fill" style={{ width: `${model.accuracy}%`, background: model.status === 'active' ? '#10b981' : '#f59e0b' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700' }}>User Management</h3>
          <button className="btn-primary" id="admin-add-user" style={{ padding: '8px 14px', fontSize: '12px' }}>+ Add User</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th><th>Role</th><th>Status</th><th>Assessments</th><th>Last Login</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {USERS_DATA.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${ROLE_COLORS[u.role] || '#6366f1'}20`, border: `1px solid ${ROLE_COLORS[u.role] || '#6366f1'}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: ROLE_COLORS[u.role] || '#6366f1' }}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><span style={{ padding: '3px 8px', borderRadius: '6px', background: `${ROLE_COLORS[u.role]}15`, color: ROLE_COLORS[u.role], fontSize: '11px', fontWeight: '600' }}>{u.role}</span></td>
                <td><span style={{ fontSize: '12px', fontWeight: '700', color: STATUS_COLORS[u.status] || '#94a3b8' }}>{u.status}</span></td>
                <td style={{ color: 'var(--text-secondary)' }}>{u.assessments > 0 ? u.assessments : '—'}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{u.lastLogin}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.1)', color: '#818cf8', fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Edit</button>
                    <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Deactivate</button>
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
