'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Brain, Zap, Heart, Moon, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// --- Shared Stat Card ---
interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  color: string;
  subtitle?: string;
}

export function StatCard({ title, value, unit, icon, trend, trendLabel, color, subtitle }: StatCardProps) {
  return (
    <div className="stat-card">
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`, borderRadius: '0 20px 0 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{title}</p>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}20`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
        <span style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', color, lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '6px' }}>{unit}</span>}
      </div>
      {subtitle && <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{subtitle}</p>}
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend >= 0
            ? <TrendingUp size={12} color="var(--color-success)" />
            : <TrendingDown size={12} color="var(--color-danger)" />}
          <span style={{ fontSize: '11px', color: trend >= 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: '600' }}>
            {Math.abs(trend)}% {trendLabel || 'vs last week'}
          </span>
        </div>
      )}
    </div>
  );
}

// --- Score Ring ---
interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ScoreRing({ score, size = 120, strokeWidth = 10, color = '#6366f1', label, sublabel }: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="score-ring-label">
        <span style={{ fontSize: size * 0.22, fontWeight: '800', color, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>{score}</span>
        {label && <span style={{ fontSize: size * 0.09, color: 'var(--text-muted)', marginTop: '2px' }}>{label}</span>}
        {sublabel && <span style={{ fontSize: size * 0.08, color: 'var(--text-secondary)' }}>{sublabel}</span>}
      </div>
    </div>
  );
}

// --- Trend Line Chart ---
const trendData = [
  { day: 'Mon', mental: 72, recovery: 68, readiness: 75 },
  { day: 'Tue', mental: 68, recovery: 71, readiness: 70 },
  { day: 'Wed', mental: 74, recovery: 65, readiness: 72 },
  { day: 'Thu', mental: 80, recovery: 78, readiness: 82 },
  { day: 'Fri', mental: 76, recovery: 74, readiness: 78 },
  { day: 'Sat', mental: 82, recovery: 80, readiness: 84 },
  { day: 'Sun', mental: 85, recovery: 82, readiness: 86 },
];

export function WeeklyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="mentalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="recoveryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
        <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '12px' }} labelStyle={{ color: '#f1f5f9', fontWeight: '600' }} />
        <Area type="monotone" dataKey="mental" stroke="#6366f1" strokeWidth={2} fill="url(#mentalGrad)" dot={false} name="Mental" />
        <Area type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2} fill="url(#recoveryGrad)" dot={false} name="Recovery" />
        <Line type="monotone" dataKey="readiness" stroke="#06b6d4" strokeWidth={2} dot={false} name="Readiness" strokeDasharray="5 5" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// --- Radar Chart ---
const radarData = [
  { metric: 'Confidence', score: 78 },
  { metric: 'Focus', score: 85 },
  { metric: 'Motivation', score: 72 },
  { metric: 'Resilience', score: 80 },
  { metric: 'Stress Ctrl', score: 65 },
  { metric: 'Sleep', score: 74 },
];

export function MentalRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// --- Main Athlete Dashboard ---
const recentInterventions = [
  { icon: '🧘', title: '5-min Breathing Exercise', category: 'Stress Relief', status: 'pending', time: 'Today 9:00 AM' },
  { icon: '🎯', title: 'Visualization Training', category: 'Pre-Match Focus', status: 'completed', time: 'Yesterday' },
  { icon: '💤', title: 'Sleep Optimization Protocol', category: 'Recovery', status: 'pending', time: 'Tonight' },
  { icon: '📝', title: 'Daily Journal Entry', category: 'Reflection', status: 'pending', time: 'Today' },
];

export default function AthleteDashboard() {
  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Good Evening, Arjun 👋</h1>
          <p className="page-subtitle">Monday, 23 June 2026 · Pre-match readiness: <span style={{ color: '#10b981', fontWeight: '600' }}>High</span></p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/dashboard/athlete/assessment">
            <button className="btn-primary" id="start-assessment-btn">
              <Brain size={15} />
              Daily Assessment
            </button>
          </Link>
          <Link href="/dashboard/athlete/journal">
            <button className="btn-secondary" id="journal-btn">
              📓 Journal
            </button>
          </Link>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard title="Mental Fitness" value={85} unit="/100" icon={<Brain size={16} />} trend={5} color="#6366f1" subtitle="Excellent state" />
        <StatCard title="Recovery Score" value={78} unit="/100" icon={<Heart size={16} />} trend={3} color="#10b981" subtitle="Good recovery" />
        <StatCard title="Match Readiness" value={82} unit="%" icon={<Zap size={16} />} trend={8} color="#06b6d4" subtitle="Ready to perform" />
        <StatCard title="Burnout Risk" value="Low" icon={<AlertTriangle size={16} />} color="#f59e0b" subtitle="Within safe zone" trend={-12} trendLabel="risk reduced" />
      </div>

      {/* Middle Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Mental Radar */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Mental Profile</h3>
            <span className="badge badge-primary">AI Scored</span>
          </div>
          <MentalRadarChart />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
            {[{ label: 'Strengths', val: 'Focus, Resilience', color: '#6366f1' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                <div style={{ fontSize: '12px', color: s.color, fontWeight: '600' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>7-Day Trend</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '2px', background: '#6366f1', display: 'inline-block', borderRadius: '2px' }} />Mental</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '2px', background: '#10b981', display: 'inline-block', borderRadius: '2px' }} />Recovery</span>
            </div>
          </div>
          <WeeklyTrendChart />
        </div>

        {/* Score Rings */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '20px' }}>Today&apos;s Scores</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <ScoreRing score={85} size={90} color="#6366f1" label="Mental" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <ScoreRing score={78} size={90} color="#10b981" label="Recovery" />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <ScoreRing score={82} size={70} color="#06b6d4" label="Readiness" />
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Next Assessment</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Pre-Match · Tomorrow 8 AM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Interventions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Today&apos;s Interventions</h3>
            <Link href="/dashboard/athlete/interventions" style={{ fontSize: '12px', color: 'var(--color-primary-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentInterventions.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.category} · {item.time}</div>
                </div>
                <span className={`badge ${item.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Journal + AI Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AI Insight */}
          <div className="glass-card" style={{ padding: '24px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                🤖
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary-light)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>AI Insight</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Your focus scores are trending upward (+12%) this week. Your sleep quality dip on Wednesday correlates with lower motivation. Consider an early bedtime tonight before the match.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <span className="badge badge-primary">Confidence ↑</span>
                  <span className="badge badge-accent">Sleep ⚠️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Journal */}
          <div className="glass-card" style={{ padding: '24px', flex: 1 }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>Quick Journal Entry</h3>
            <textarea
              placeholder="How are you feeling today? What's on your mind before the match..."
              style={{ width: '100%', minHeight: '100px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.6 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['😊', '😔', '😤', '😰', '🎯'].map(emoji => (
                  <button key={emoji} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <Link href="/dashboard/athlete/journal">
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Save Entry</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
