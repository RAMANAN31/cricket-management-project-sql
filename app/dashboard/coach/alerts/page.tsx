'use client';

import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="fade-in" style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <AlertTriangle size={40} color="#ef4444" />
      </div>
      <h1 style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '16px' }}>
        ACTIVE ALERTS
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '32px' }}>
        The system has flagged 3 critical interventions. Detailed logs and direct communication channels to the team psychologist are being securely loaded.
      </p>
      <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ef4444', borderColor: '#ef4444' }}>
        <ShieldAlert size={18} /> View Security Logs
      </button>
    </div>
  );
}
