'use client';

import { BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="fade-in" style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(229,184,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <BarChart3 size={40} color="var(--color-accent)" />
      </div>
      <h1 style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '16px' }}>
        PERFORMANCE ANALYTICS
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.6, marginBottom: '32px' }}>
        Deep-dive statistical analysis and machine learning predictions are currently processing. Player vs. Opponent metrics and pitch condition overlays will be rendered soon.
      </p>
      <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TrendingUp size={18} /> View Raw Data
      </button>
    </div>
  );
}
