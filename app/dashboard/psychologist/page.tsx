'use client';

import { Shield, Users, Brain, TrendingUp, AlertTriangle, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function PsychologistDashboard() {
  const athletes = [
    { name: 'Anand Patel', mfs: 28, status: 'Crisis', color: '#ef4444', lastSeen: '2h ago', sessions: 3, next: 'Today 3PM' },
    { name: 'Ravi Kumar', mfs: 42, status: 'High Risk', color: '#f59e0b', lastSeen: '5h ago', sessions: 2, next: 'Tomorrow' },
    { name: 'Vikram Rao', mfs: 65, status: 'Monitoring', color: '#06b6d4', lastSeen: '1d ago', sessions: 5, next: 'Wed' },
    { name: 'Raj Thakur', mfs: 66, status: 'Monitoring', color: '#06b6d4', lastSeen: '1d ago', sessions: 4, next: 'Thu' },
    { name: 'Arjun Sharma', mfs: 85, status: 'Stable', color: '#10b981', lastSeen: '3h ago', sessions: 8, next: 'Fri' },
    { name: 'Priya Mehta', mfs: 90, status: 'Excellent', color: '#10b981', lastSeen: 'Today', sessions: 6, next: 'Next week' },
  ];

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={28} color="#8b5cf6" />
            Psychologist Dashboard
          </h1>
          <p className="page-subtitle">Clinical mental performance overview · Dr. Priya Nair</p>
        </div>
        <Link href="/dashboard/psychologist/crisis">
          <button className="btn-danger" id="view-crisis-btn">
            <AlertTriangle size={15} />
            2 Crisis Alerts
          </button>
        </Link>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Athletes Under Care', value: '12', color: '#8b5cf6', icon: <Users size={16} /> },
          { label: 'Crisis Alerts', value: '2', color: '#ef4444', icon: <AlertTriangle size={16} /> },
          { label: 'Sessions This Week', value: '8', color: '#06b6d4', icon: <Brain size={16} /> },
          { label: 'Avg Team MFS', value: '71', color: '#10b981', icon: <Activity size={16} /> },
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

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Athlete Clinical Overview</h3>
          <Link href="/dashboard/psychologist/profiles" style={{ fontSize: '12px', color: 'var(--color-primary-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
            View all profiles <ChevronRight size={12} />
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>MFS Score</th>
              <th>Clinical Status</th>
              <th>Sessions</th>
              <th>Next Session</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((a, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{a.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: a.color, fontFamily: 'Space Grotesk, sans-serif' }}>{a.mfs}</span>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', minWidth: '60px' }}>
                      <div style={{ height: '100%', borderRadius: '99px', background: a.color, width: `${a.mfs}%` }} />
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ padding: '3px 10px', borderRadius: '99px', background: `${a.color}15`, border: `1px solid ${a.color}30`, color: a.color, fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                    {a.status === 'Crisis' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: a.color, animation: 'pulse 1s infinite' }} />}
                    {a.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{a.sessions} total</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{a.next}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{a.lastSeen}</td>
                <td>
                  <button style={{ padding: '5px 12px', borderRadius: '7px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.1)', color: '#818cf8', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    View Profile
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
