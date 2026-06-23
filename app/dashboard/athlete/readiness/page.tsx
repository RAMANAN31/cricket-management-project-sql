'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Zap } from 'lucide-react';

const radarMetrics = [
  { metric: 'Mental Score', key: 'mental' },
  { metric: 'Sleep Quality', key: 'sleep' },
  { metric: 'Recovery', key: 'recovery' },
  { metric: 'Workload Fit', key: 'workload' },
  { metric: 'Injury Free', key: 'injury' },
  { metric: 'Confidence', key: 'confidence' },
];

export default function ReadinessPage() {
  const [inputs, setInputs] = useState({ mental: 7, sleep: 7, recovery: 7, workload: 6, injury: 9, confidence: 7 });
  const [result, setResult] = useState<null | { pct: number; risks: string[]; actions: string[] }>(null);

  const set = (key: string, v: number) => setInputs(p => ({ ...p, [key]: v }));

  const calculate = () => {
    const { mental, sleep, recovery, workload, injury, confidence } = inputs;
    const score = (mental * 1.8 + sleep * 1.4 + recovery * 1.6 + workload * 1.2 + injury * 1.0 + confidence * 1.5) / 7.5 * 10;
    const pct = Math.min(100, Math.max(0, Math.round(score)));
    const risks = [];
    const actions = [];
    if (sleep < 6) { risks.push('Poor sleep quality impairs cognitive function'); actions.push('Prioritize 8+ hours tonight'); }
    if (recovery < 6) { risks.push('Insufficient recovery time since last match'); actions.push('Active recovery session recommended'); }
    if (workload < 5) { risks.push('Training load mismatch detected'); actions.push('Gradual load increase protocol'); }
    if (mental < 6) { risks.push('Mental fatigue indicators present'); actions.push('Pre-match mindfulness session'); }
    if (confidence < 6) { risks.push('Below-threshold confidence level'); actions.push('Confidence-building routine with coach'); }
    setResult({ pct, risks: risks.length ? risks : ['No significant risk factors detected'], actions: actions.length ? actions : ['Maintain current preparation routine', 'Stay hydrated and nutritionally fueled'] });
  };

  const radarData = radarMetrics.map(m => ({ metric: m.metric, score: (inputs[m.key as keyof typeof inputs] || 0) * 10 }));

  return (
    <div className="fade-in" style={{ maxWidth: '900px' }}>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={28} color="#06b6d4" />
          Match Readiness Predictor
        </h1>
        <p className="page-subtitle">XGBoost + LightGBM ensemble · Predict performance readiness for upcoming matches</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Inputs */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px' }}>Input Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {radarMetrics.map(m => (
              <div key={m.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>{m.metric}</label>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#06b6d4' }}>{inputs[m.key as keyof typeof inputs]}/10</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button key={n} onClick={() => set(m.key, n)} style={{ flex: 1, height: '32px', borderRadius: '6px', border: `1px solid ${n <= inputs[m.key as keyof typeof inputs] ? '#06b6d4' : 'rgba(255,255,255,0.08)'}`, background: n <= inputs[m.key as keyof typeof inputs] ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.1s ease' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={calculate} id="calc-readiness-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '24px', padding: '13px' }}>
            <Zap size={15} />
            Calculate Match Readiness
          </button>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Radar */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Performance Radar</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Results */}
          {result && (
            <div className="glass-card fade-in" style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '64px', fontWeight: '900', fontFamily: 'Space Grotesk, sans-serif', color: result.pct >= 75 ? '#10b981' : result.pct >= 50 ? '#f59e0b' : '#ef4444', lineHeight: 1 }}>{result.pct}%</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: result.pct >= 75 ? '#10b981' : result.pct >= 50 ? '#f59e0b' : '#ef4444', marginTop: '4px' }}>
                  {result.pct >= 75 ? 'Ready to Perform' : result.pct >= 50 ? 'Moderate Readiness' : 'Not Ready — Rest Recommended'}
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Risk Factors</div>
                {result.risks.map((r, i) => <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px', marginBottom: '5px' }}><span style={{ color: '#f59e0b', flexShrink: 0 }}>▸</span>{r}</div>)}
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Suggested Actions</div>
                {result.actions.map((a, i) => <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px', marginBottom: '5px' }}><span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>{a}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
