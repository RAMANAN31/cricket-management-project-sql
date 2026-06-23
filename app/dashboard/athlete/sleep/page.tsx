'use client';

import Link from 'next/link';
import { TrendingUp, Activity, Heart, Moon, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sleepData = [
  { day: 'Mon', hours: 7.5, quality: 82, hrv: 52 },
  { day: 'Tue', hours: 6.8, quality: 65, hrv: 44 },
  { day: 'Wed', hours: 8.2, quality: 90, hrv: 58 },
  { day: 'Thu', hours: 7.0, quality: 71, hrv: 48 },
  { day: 'Fri', hours: 6.5, quality: 60, hrv: 42 },
  { day: 'Sat', hours: 8.5, quality: 92, hrv: 62 },
  { day: 'Sun', hours: 7.8, quality: 85, hrv: 55 },
];

export default function SleepPage() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Moon size={28} color="#8b5cf6" />
          Sleep & Recovery Analytics
        </h1>
        <p className="page-subtitle">Wearable integration · Fitbit, Garmin, Apple Health, Google Fit</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Avg Sleep', value: '7.5h', color: '#8b5cf6', icon: <Moon size={16} />, trend: '+0.3h vs last week' },
          { label: 'Sleep Quality', value: '78%', color: '#6366f1', icon: <Activity size={16} />, trend: '+5% improved' },
          { label: 'Recovery Score', value: '74', color: '#10b981', icon: <Heart size={16} />, trend: 'Good shape' },
          { label: 'Avg HRV', value: '52ms', color: '#06b6d4', icon: <TrendingUp size={16} />, trend: 'Optimal range' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: 'absolute', top: 0, right: 0, width: '70px', height: '70px', background: `radial-gradient(circle, ${s.color}18 0%, transparent 70%)`, borderRadius: '0 20px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</p>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: s.color, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-success)', color: '#34d399' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>7-Day Sleep & Recovery Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={sleepData} margin={{ left: -20, right: 5 }}>
            <defs>
              <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="qualityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} fill="url(#qualityGrad)" name="Sleep Quality %" />
            <Area type="monotone" dataKey="hrv" stroke="#8b5cf6" strokeWidth={2} fill="url(#sleepGrad)" name="HRV (ms)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Wearable Connect */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>Connected Wearables</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { name: 'Fitbit', icon: '⌚', connected: true, lastSync: '2h ago' },
            { name: 'Garmin', icon: '🏃', connected: false, lastSync: 'Not connected' },
            { name: 'Apple Health', icon: '🍎', connected: true, lastSync: '30m ago' },
            { name: 'Google Fit', icon: '📊', connected: false, lastSync: 'Not connected' },
          ].map((w, i) => (
            <div key={i} style={{ background: w.connected ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${w.connected ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{w.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{w.name}</div>
              <div style={{ fontSize: '11px', color: w.connected ? '#34d399' : 'var(--text-muted)', marginBottom: '10px' }}>
                {w.connected ? `✓ ${w.lastSync}` : 'Not connected'}
              </div>
              <button style={{ width: '100%', padding: '6px', borderRadius: '8px', border: `1px solid ${w.connected ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.3)'}`, background: w.connected ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)', color: w.connected ? '#f87171' : '#818cf8', fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                {w.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
