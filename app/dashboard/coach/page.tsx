'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, AlertTriangle, TrendingUp, Zap, ChevronRight, X, Activity, BrainCircuit, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TEAM_DATA = [
  { name: 'Virat Kohli', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Virat_Kohli.jpg', mental: 92, recovery: 85, readiness: 88, burnout: 10, risk: 'Low', sport: 'Cricket', injury: false, role: 'Batter' },
  { name: 'Faf du Plessis', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Faf_du_Plessis.jpg', mental: 88, recovery: 82, readiness: 85, burnout: 15, risk: 'Low', sport: 'Cricket', injury: false, role: 'Batter' },
  { name: 'Glenn Maxwell', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Glenn_Maxwell.jpg', mental: 75, recovery: 70, readiness: 72, burnout: 45, risk: 'Moderate', sport: 'Cricket', injury: true, role: 'All-Rounder' },
  { name: 'Rajat Patidar', mental: 80, recovery: 78, readiness: 80, burnout: 20, risk: 'Low', sport: 'Cricket', injury: false, role: 'Batter' },
  { name: 'Cameron Green', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Cameron_Green.jpg', mental: 65, recovery: 60, readiness: 62, burnout: 60, risk: 'High', sport: 'Cricket', injury: false, role: 'All-Rounder' },
  { name: 'Dinesh Karthik', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Dinesh_Karthik.jpg', mental: 90, recovery: 88, readiness: 90, burnout: 12, risk: 'Low', sport: 'Cricket', injury: false, role: 'Wicket-Keeper' },
  { name: 'Mohammed Siraj', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Mohammed_Siraj.jpg', mental: 55, recovery: 50, readiness: 52, burnout: 80, risk: 'Critical', sport: 'Cricket', injury: false, role: 'Bowler' },
  { name: 'Yash Dayal', mental: 70, recovery: 68, readiness: 70, burnout: 35, risk: 'Moderate', sport: 'Cricket', injury: false, role: 'Bowler' },
  { name: 'Will Jacks', mental: 85, recovery: 80, readiness: 83, burnout: 18, risk: 'Low', sport: 'Cricket', injury: false, role: 'All-Rounder' },
  { name: 'Lockie Ferguson', mental: 68, recovery: 65, readiness: 66, burnout: 55, risk: 'Moderate', sport: 'Cricket', injury: true, role: 'Bowler' },
  { name: 'Karn Sharma', mental: 82, recovery: 80, readiness: 81, burnout: 22, risk: 'Low', sport: 'Cricket', injury: false, role: 'Bowler' },
  { name: 'Alzarri Joseph', mental: 60, recovery: 55, readiness: 58, burnout: 70, risk: 'High', sport: 'Cricket', injury: false, role: 'Bowler' },
];

const weekTrend = [
  { day: 'Mon', teamAvg: 74, burnoutAvg: 35 },
  { day: 'Tue', teamAvg: 71, burnoutAvg: 38 },
  { day: 'Wed', teamAvg: 76, burnoutAvg: 32 },
  { day: 'Thu', teamAvg: 73, burnoutAvg: 40 },
  { day: 'Fri', teamAvg: 78, burnoutAvg: 30 },
  { day: 'Sat', teamAvg: 80, burnoutAvg: 27 },
  { day: 'Sun', teamAvg: 75, burnoutAvg: 33 },
];

const radarData = [
  { metric: 'Mental', score: 74 },
  { metric: 'Recovery', score: 68 },
  { metric: 'Focus', score: 76 },
  { metric: 'Cohesion', score: 72 },
  { metric: 'Motivation', score: 70 },
  { metric: 'Confidence', score: 73 },
];

function getRiskColor(risk: string) {
  return risk === 'Critical' ? '#ef4444' : risk === 'High' ? '#f59e0b' : risk === 'Moderate' ? '#E5B80B' : '#10b981';
}

function getBurnoutBg(burnout: number) {
  if (burnout >= 70) return 'rgba(239,68,68,0.2)';
  if (burnout >= 50) return 'rgba(245,158,11,0.15)';
  if (burnout >= 30) return 'rgba(229,184,11,0.12)';
  return 'rgba(16,185,129,0.1)';
}

function getBurnoutBorder(burnout: number) {
  if (burnout >= 70) return 'rgba(239,68,68,0.3)';
  if (burnout >= 50) return 'rgba(245,158,11,0.25)';
  if (burnout >= 30) return 'rgba(229,184,11,0.2)';
  return 'rgba(16,185,129,0.2)';
}

export default function CoachDashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof TEAM_DATA[0] | null>(null);

  const criticalCount = TEAM_DATA.filter(a => a.risk === 'Critical' || a.risk === 'High').length;
  const avgReadiness = Math.round(TEAM_DATA.reduce((s, a) => s + a.readiness, 0) / TEAM_DATA.length);
  const avgMental = Math.round(TEAM_DATA.reduce((s, a) => s + a.mental, 0) / TEAM_DATA.length);
  const injuredCount = TEAM_DATA.filter(a => a.injury).length;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontSize: '48px', textShadow: '2px 2px 0px #e5e7eb' }}>THE SQUAD</h1>
          <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>Royal Challengers Bengaluru · {TEAM_DATA.length} athletes monitored</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" id="coach-export-btn" onClick={() => alert('Generating full squad report... The PDF will download shortly.')}>
            <Activity size={15} /> Export Report
          </button>
          <Link href="/dashboard/coach/alerts" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" id="coach-alert-btn">
              <AlertTriangle size={15} />
              {criticalCount} Alerts
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Avg Team Readiness', value: `${avgReadiness}%`, color: 'var(--color-accent)', icon: <Zap size={16} />, sub: 'Squad fitness score' },
          { label: 'Avg Mental Fitness', value: `${avgMental}/100`, color: 'var(--color-primary)', icon: <Users size={16} />, sub: 'Team mental avg' },
          { label: 'High Risk Athletes', value: criticalCount, color: '#ef4444', icon: <AlertTriangle size={16} />, sub: 'Needs intervention' },
          { label: 'Injury Affected', value: injuredCount, color: '#f59e0b', icon: <TrendingUp size={16} />, sub: 'Limited availability' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(circle, ${s.color}18 0%, transparent 70%)`, borderRadius: '0 20px 0 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{s.label}</p>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: s.color, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Team Radar */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: 'var(--color-accent)' }}>Team Mental Profile</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Aggregate squad psychometric snapshot</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(229,184,11,0.2)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
              <Radar dataKey="score" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-accent)' }}>Team Trend (7 days)</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mental fitness vs burnout risk</p>
            </div>
            <Link href="/dashboard/coach/performance" style={{ fontSize: '12px', color: 'var(--color-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
              Detail <ChevronRight size={12} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weekTrend} margin={{ left: -20, right: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(229,184,11,0.1)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(26,10,10,0.95)', border: '1px solid var(--color-accent)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-primary)' }} />
              <Line type="monotone" dataKey="teamAvg" stroke="var(--color-accent)" strokeWidth={2.5} dot={false} name="Team Mental Avg" />
              <Line type="monotone" dataKey="burnoutAvg" stroke="var(--color-primary)" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Burnout Risk Avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Burnout Heatmap */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--color-primary)" />
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Burnout Heatmap</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time burnout risk across squad</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px' }}>
            {[{ label: 'Safe', color: '#10b981' }, { label: 'Moderate', color: '#E5B80B' }, { label: 'High', color: '#f59e0b' }, { label: 'Critical', color: '#ef4444' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {TEAM_DATA.map((athlete, i) => (
            <div
              key={i}
              onClick={() => setSelectedPlayer(athlete)}
              style={{ background: '#ffffff', border: `1px solid var(--color-border)`, borderBottom: `4px solid ${getRiskColor(athlete.risk)}`, borderRadius: '12px', padding: '14px 10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative', boxShadow: 'var(--card-shadow)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {athlete.injury && (
                <div style={{ position: 'absolute', top: 6, right: 6, color: '#f59e0b' }}>
                  <HeartPulse size={14} />
                </div>
              )}
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{athlete.name}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'Space Grotesk, sans-serif', color: getRiskColor(athlete.risk), lineHeight: 1 }}>{athlete.burnout}</div>
              <div style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>burnout%</div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '99px', background: `${getRiskColor(athlete.risk)}20`, color: getRiskColor(athlete.risk), textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {athlete.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <AlertTriangle size={20} color="#ef4444" />
             <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Active Alerts</h3>
          </div>
          <Link href="/dashboard/coach/alerts" style={{ fontSize: '12px', color: 'var(--color-accent)', textDecoration: 'none' }}>View all</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { athlete: 'Mohammed Siraj', alert: 'CRITICAL: Burnout risk at 80%. Immediate intervention required.', color: '#ef4444', icon: <AlertTriangle size={18} />, action: 'Refer to Psychologist' },
            { athlete: 'Cameron Green', alert: 'HIGH: Mental fitness dropped 15 points in 3 days. Monitor closely.', color: '#f59e0b', icon: <AlertTriangle size={18} />, action: 'Schedule 1-on-1' },
            { athlete: 'Glenn Maxwell', alert: 'HIGH: Training load + injury history = elevated risk. Reduce workload.', color: '#f59e0b', icon: <AlertTriangle size={18} />, action: 'Modify Training' },
          ].map((alert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: `${alert.color}10`, border: `1px solid ${alert.color}25`, borderRadius: '12px' }}>
              <span style={{ color: alert.color, flexShrink: 0, marginTop: '2px' }}>{alert.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: alert.color, marginBottom: '4px' }}>{alert.athlete}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{alert.alert}</div>
              </div>
              <button style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${alert.color}30`, background: `${alert.color}15`, color: alert.color, fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}>
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Player Detail Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ width: '100%', maxWidth: '1000px', background: 'var(--color-bg-primary)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '40px', boxShadow: '0 -10px 40px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPlayer(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.05)', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.1)'} onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.05)'}>
                <X size={20} />
              </button>

              <div style={{ display: 'flex', gap: '40px' }}>
                {/* Left Column: Player Info & Recent Form */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                    {selectedPlayer.imageUrl ? (
                      <img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-accent)' }} />
                    ) : (
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary)', border: '3px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '700', color: 'white' }}>
                        {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <h2 style={{ fontSize: '40px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--color-primary)', lineHeight: 1, letterSpacing: '0.05em' }}>{selectedPlayer.name.toUpperCase()}</h2>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedPlayer.role} · INDIA</p>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Latest Performance</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { runs: '69*', balls: '38', opp: 'vs SRH' },
                      { runs: '28', balls: '18', opp: 'vs CSK' },
                      { runs: '32', balls: '16', opp: 'vs RR' },
                      { runs: '50', balls: '38', opp: 'vs MI' },
                    ].map((stat, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        key={i} 
                        style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}
                      >
                        <span style={{ fontSize: '48px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: 1 }}>{stat.runs}</span>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-secondary)' }}>({stat.balls})</span>
                        <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{stat.opp}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Fitness & Risk Metrics */}
                <div style={{ flex: 1 }}>
                  <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: 'rgba(212,25,44,0.05)', border: '1px solid rgba(212,25,44,0.15)', borderRadius: '16px', padding: '20px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', marginBottom: '12px' }}>
                          <BrainCircuit size={18} />
                          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Mental Fitness</span>
                       </div>
                       <div style={{ fontSize: '40px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)', lineHeight: 1 }}>{selectedPlayer.mental}/100</div>
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ background: 'rgba(200,169,81,0.05)', border: '1px solid rgba(200,169,81,0.15)', borderRadius: '16px', padding: '20px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', marginBottom: '12px' }}>
                          <Activity size={18} />
                          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Readiness</span>
                       </div>
                       <div style={{ fontSize: '40px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)', lineHeight: 1 }}>{selectedPlayer.readiness}%</div>
                    </motion.div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ background: getBurnoutBg(selectedPlayer.burnout), border: `1px solid ${getBurnoutBorder(selectedPlayer.burnout)}`, borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: getRiskColor(selectedPlayer.risk), marginBottom: '16px' }}>
                        <TrendingUp size={20} />
                        <span style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Burnout Risk Assessment</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
                        <div style={{ fontSize: '56px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', color: getRiskColor(selectedPlayer.risk), lineHeight: 1 }}>{selectedPlayer.burnout}%</div>
                        <div style={{ paddingBottom: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', padding: '4px 10px', borderRadius: '99px', background: `${getRiskColor(selectedPlayer.risk)}20`, color: getRiskColor(selectedPlayer.risk), textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {selectedPlayer.risk} Risk Level
                          </span>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card" style={{ padding: '24px' }}>
                     <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Action & Recovery</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>Recovery Status</span>
                           <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-accent)' }}>{selectedPlayer.recovery}%</span>
                        </div>
                        <div className="progress-bar" style={{ height: '8px', borderRadius: '4px' }}>
                           <div className="progress-fill" style={{ width: `${selectedPlayer.recovery}%`, background: 'var(--color-accent)', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                           <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>Injury Status</span>
                           <span style={{ fontSize: '14px', fontWeight: '800', color: selectedPlayer.injury ? '#ef4444' : '#10b981' }}>{selectedPlayer.injury ? 'Needs Assessment' : 'Cleared'}</span>
                        </div>
                     </div>
                     <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>Full Profile</button>
                        <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '14px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--text-primary)' }}>Schedule Intervention</button>
                     </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
