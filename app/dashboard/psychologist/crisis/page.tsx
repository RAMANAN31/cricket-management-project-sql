'use client';

import { AlertTriangle, Phone, FileText, CheckCircle, ShieldAlert } from 'lucide-react';

const CRISIS_ALERTS = [
  {
    id: 1, name: 'Anand Patel', sport: 'Cricket', severity: 'CRITICAL', triggers: ['Extreme burnout (85%)', 'Self-doubt indicators in journal', 'Sleep disorder signals', 'Social withdrawal noted'],
    lastEntry: '"I don\'t know if I can continue. Everything feels too heavy. I haven\'t been sleeping properly in two weeks..."',
    sentiment: -0.82, assessmentScore: 28, time: '2h ago', avatar: 'AP',
    recommended: ['Immediate 1-on-1 session with sports psychologist', 'Contact family/support system', 'Temporary training load reduction', 'Daily check-ins for next 14 days'],
  },
  {
    id: 2, name: 'Ravi Kumar', sport: 'Cricket', severity: 'HIGH', triggers: ['Anxiety spike (+40% in 5 days)', 'Pre-match panic patterns', 'Poor recovery quality'],
    lastEntry: '"The pressure is getting to me. I can\'t stop thinking about failing during the final..."',
    sentiment: -0.55, assessmentScore: 42, time: '5h ago', avatar: 'RK',
    recommended: ['Anxiety management protocol', 'Cognitive behavioral exercises', 'Pre-match routine restructuring'],
  },
];

function SeverityBadge({ severity }: { severity: string }) {
  const config = severity === 'CRITICAL'
    ? { color: 'var(--color-primary)', bg: 'rgba(216,44,39,0.15)', border: 'rgba(216,44,39,0.3)' }
    : { color: 'var(--color-accent)', bg: 'rgba(229,184,11,0.15)', border: 'rgba(229,184,11,0.3)' };
  return (
    <span style={{ padding: '4px 12px', borderRadius: '99px', background: config.bg, border: `1px solid ${config.border}`, color: config.color, fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color, animation: 'pulse 1s infinite' }} />
      {severity}
    </span>
  );
}

export default function CrisisPage() {
  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(216,44,39,0.15)', border: '1px solid rgba(216,44,39,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} color="var(--color-primary)" />
          </div>
          <div>
            <h1 className="page-title" style={{ marginBottom: 0, fontSize: '24px' }}>Crisis Detection System</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>AI-detected severe mental health risk indicators</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="alert-crisis" style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', color: 'var(--color-primary)' }}><ShieldAlert size={24} /></span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-light)', marginBottom: '4px' }}>Clinical Safeguarding Notice</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            These AI-detected signals require immediate human clinical assessment. Do not rely solely on algorithmic outputs. Contact a qualified sports psychologist or mental health professional immediately for all CRITICAL alerts.
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {CRISIS_ALERTS.map(alert => (
          <div key={alert.id} className="glass-card" style={{ padding: '28px', border: `1px solid ${alert.severity === 'CRITICAL' ? 'rgba(216,44,39,0.3)' : 'rgba(229,184,11,0.3)'}` }}>
            {/* Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: alert.severity === 'CRITICAL' ? 'rgba(216,44,39,0.15)' : 'rgba(229,184,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: alert.severity === 'CRITICAL' ? 'var(--color-primary-light)' : 'var(--color-accent)' }}>
                  {alert.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>{alert.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{alert.sport} · Detected {alert.time}</div>
                </div>
              </div>
              <SeverityBadge severity={alert.severity} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Triggers */}
              <div style={{ background: 'rgba(216,44,39,0.06)', border: '1px solid rgba(216,44,39,0.12)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>AI Detected Triggers</div>
                {alert.triggers.map((t, i) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                    {t}
                  </div>
                ))}
              </div>

              {/* Journal Excerpt */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Journal Excerpt (AI Flagged)</div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>{alert.lastEntry}</p>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sentiment: <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{(alert.sentiment * 100).toFixed(0)}%</span></div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MFS: <span style={{ color: 'var(--color-primary-light)', fontWeight: '700' }}>{alert.assessmentScore}/100</span></div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ background: 'rgba(229,184,11,0.06)', border: '1px solid rgba(229,184,11,0.15)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Recommended Actions</div>
                {alert.recommended.map((r, i) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <CheckCircle size={11} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button className="btn-primary" id={`crisis-contact-${alert.id}`}>
                <Phone size={14} />
                Contact Psychologist Now
              </button>
              <button className="btn-secondary" id={`crisis-report-${alert.id}`}>
                <FileText size={14} />
                Generate Full Report
              </button>
              <button className="btn-secondary" id={`crisis-resolve-${alert.id}`}>
                <CheckCircle size={14} />
                Mark as Handled
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* All Clear */}
      <div className="glass-card" style={{ padding: '20px', marginTop: '20px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={18} color="var(--color-success)" />
          <div style={{ fontSize: '13px', color: 'var(--color-success)', fontWeight: '600' }}>10 other athletes show no crisis indicators</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>System monitoring 24/7 · Last scan: 2 min ago</div>
        </div>
      </div>
    </div>
  );
}
