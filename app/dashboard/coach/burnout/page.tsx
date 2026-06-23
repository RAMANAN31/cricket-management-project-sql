'use client';

import { TrendingUp, Activity } from 'lucide-react';

export default function BurnoutPage() {
  return (
    <div className="fade-in" style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(216,44,39,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <TrendingUp size={40} color="var(--color-primary)" />
      </div>
      <h1 style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '16px' }}>
        BURNOUT TRACKER
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '32px' }}>
        Advanced burnout risk algorithms are currently analyzing the latest squad workload data. Detailed thermal mapping and predictive intervention models will be available shortly.
      </p>
      <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Activity size={18} /> Refresh Analysis
      </button>
    </div>
  );
}
