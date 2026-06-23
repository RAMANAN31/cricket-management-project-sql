'use client';

import { Activity, BrainCircuit, X, MessageSquare, HeartPulse, TrendingUp, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceArea } from 'recharts';

const SQUAD_DATA = [
  { name: 'Virat Kohli', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Virat_Kohli.jpg', mental: 92, readiness: 88, role: 'Batter', stats: { matches: 10, runs: 443, avg: 63.28, sr: 148.5 } },
  { name: 'Faf du Plessis', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Faf_du_Plessis.jpg', mental: 88, readiness: 85, role: 'Batter', stats: { matches: 10, runs: 320, avg: 35.5, sr: 142.0 } },
  { name: 'Glenn Maxwell', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Glenn_Maxwell.jpg', mental: 75, readiness: 72, role: 'All-Rounder', stats: { matches: 8, runs: 185, sr: 165.2, wickets: 4 } },
  { name: 'Rajat Patidar', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rajat_Patidar.jpg', mental: 80, readiness: 80, role: 'Batter', stats: { matches: 9, runs: 245, avg: 30.6, sr: 155.0 } },
  { name: 'Cameron Green', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Cameron_Green.jpg', mental: 65, readiness: 62, role: 'All-Rounder', stats: { matches: 10, runs: 190, wickets: 8, econ: 8.9 } },
  { name: 'Dinesh Karthik', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Dinesh_Karthik.jpg', mental: 90, readiness: 90, role: 'Wicket-Keeper', stats: { matches: 10, runs: 280, sr: 195.4, dismissals: 12 } },
  { name: 'Mohammed Siraj', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Mohammed_Siraj.jpg', mental: 55, readiness: 52, role: 'Bowler', stats: { matches: 10, wickets: 12, econ: 8.5, best: '3/22' } },
  { name: 'Yash Dayal', imageUrl: '', mental: 70, readiness: 70, role: 'Bowler', stats: { matches: 8, wickets: 9, econ: 9.1, best: '2/18' } },
  { name: 'Will Jacks', imageUrl: '', mental: 85, readiness: 83, role: 'All-Rounder', stats: { matches: 6, runs: 160, sr: 175.0, wickets: 3 } },
  { name: 'Lockie Ferguson', imageUrl: '', mental: 68, readiness: 66, role: 'Bowler', stats: { matches: 5, wickets: 6, econ: 8.8, best: '2/24' } },
];

const EXTENDED_SQUAD_DATA = SQUAD_DATA.map(player => ({
  ...player,
  morale: Math.floor(Math.random() * 20 + 80), // 80-100
  feedback: player.mental > 80 ? 'Exceptional focus. Ready for high-pressure situations.' : 'Monitoring progress. Needs to focus on recovery between fixtures.',
  stats: { ...player.stats, catches: Math.floor(Math.random() * 5), runOuts: Math.floor(Math.random() * 2) },
  comments: [
    { author: 'Player', text: player.mental > 80 ? 'Feeling great, ready for the next match.' : 'Feeling a bit fatigued after the last travel day.' },
    { author: 'Physio', text: player.mental > 80 ? 'Cleared for full training.' : 'Scheduled extra massage session. Light training recommended.' }
  ]
}));

const generateTrendData = (baseScore: number) => {
  const data = [];
  for (let i = 1; i <= 14; i++) {
    let score = baseScore + (Math.random() * 15 - 5);
    if (i >= 5 && i <= 9) score -= 12; // mid tournament dip
    if (i > 11) score += 5; // end of tournament hype
    if (score > 100) score = 100;
    if (score < 0) score = 0;
    data.push({ match: `M${i}`, readiness: Math.round(score) });
  }
  return data;
};

export default function TeamReadinessPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<typeof EXTENDED_SQUAD_DATA[0] | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--color-bg-card)', padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)' }}>{label}</p>
          <p style={{ margin: 0, color: 'var(--color-accent)', fontWeight: 'bold' }}>Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fade-in">
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <h1 className="page-title" style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontSize: '48px', textShadow: '2px 2px 0px #e5e7eb' }}>SQUAD MANAGEMENT</h1>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>Player profiles, individual statistics, and readiness metrics</p>
      </div>

      {/* Grid of Players */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', paddingBottom: '40px' }}>
        {EXTENDED_SQUAD_DATA.map((player, i) => (
          <div key={i} onClick={() => setSelectedPlayer(player)} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}>
            {/* Header / Image Area */}
            <div style={{ height: '120px', background: 'var(--gradient-primary)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '-40px', left: '24px', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--color-bg-primary)', background: 'var(--color-bg-card)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {player.imageUrl ? (
                  <img src={player.imageUrl} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)' }}>{player.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>
            </div>
            
            {/* Body */}
            <div style={{ padding: '50px 24px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{player.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '20px' }}>{player.role}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--color-bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', marginBottom: '4px' }}>
                    <BrainCircuit size={14} /> <span style={{ fontSize: '11px', fontWeight: '700' }}>MENTAL</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif' }}>{player.mental}</div>
                </div>
                <div style={{ background: 'var(--color-bg-primary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)', marginBottom: '4px' }}>
                    <Activity size={14} /> <span style={{ fontSize: '11px', fontWeight: '700' }}>READINESS</span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif' }}>{player.readiness}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 100 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'fixed', top: '50%', left: '50%', width: '95%', maxWidth: '1400px', maxHeight: '90vh', background: 'var(--color-bg-primary)', borderRadius: '24px', zIndex: 101, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflowY: 'auto' }}
            >
              <button
                onClick={() => setSelectedPlayer(null)}
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--color-bg-card)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={20} color="var(--text-secondary)" />
              </button>

              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  {selectedPlayer.imageUrl ? (
                    <img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--color-accent)' }} />
                  ) : (
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-primary)', border: '4px solid var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '800', color: 'white' }}>
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <h2 style={{ fontSize: '64px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--color-primary)', lineHeight: 1, letterSpacing: '0.05em' }}>{selectedPlayer.name.toUpperCase()}</h2>
                    <p style={{ fontSize: '18px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>{selectedPlayer.role} · RCB</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                  {/* Left Column: Stats & Comms */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Extended Stats */}
                    <div className="glass-card">
                      <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-bebas-neue)', marginBottom: '20px', color: 'var(--text-primary)' }}><Activity size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />EXTENDED TOURNAMENT STATS</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {Object.entries(selectedPlayer.stats).map(([key, value]) => (
                          <div key={key} style={{ background: 'var(--color-bg-primary)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-bebas-neue)' }}>{value}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700' }}>{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Morale & Feedback */}
                    <div className="glass-card" style={{ display: 'flex', gap: '24px' }}>
                       <div style={{ flex: 1 }}>
                         <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px' }}>Team Morale Impact</h3>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <HeartPulse color="var(--color-accent)" size={28} />
                            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>{selectedPlayer.morale}%</span>
                         </div>
                       </div>
                       <div style={{ flex: 2, borderLeft: '1px solid var(--color-border)', paddingLeft: '24px' }}>
                         <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px' }}>Coach Feedback</h3>
                         <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: '500' }}>"{selectedPlayer.feedback}"</p>
                       </div>
                    </div>

                    {/* Communication Hub */}
                    <div className="glass-card">
                      <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-bebas-neue)', marginBottom: '20px', color: 'var(--text-primary)' }}><MessageSquare size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />MANAGEMENT COMMUNICATIONS</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {selectedPlayer.comments.map((comment, idx) => (
                          <div key={idx} style={{ background: comment.author === 'Player' ? 'rgba(216,44,39,0.05)' : 'var(--color-bg-primary)', padding: '16px', borderRadius: '12px', borderLeft: comment.author === 'Player' ? '4px solid var(--color-primary)' : '4px solid var(--color-accent)' }}>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: comment.author === 'Player' ? 'var(--color-primary)' : 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>{comment.author}</div>
                            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Graphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-bebas-neue)', marginBottom: '8px', color: 'var(--text-primary)' }}><TrendingUp size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />COGNITIVE READINESS PROGRESSION</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Tracking cognitive readiness across 14 tournament matches. Divided into Start, Middle, and End phases.</p>
                      
                      <div style={{ flex: 1, minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateTrendData(selectedPlayer.readiness)} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                            <XAxis dataKey="match" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            
                            {/* Phase Highlight Areas */}
                            <ReferenceArea x1="M1" x2="M4" fill="rgba(0,0,0,0.02)" />
                            <ReferenceArea x1="M5" x2="M9" fill="rgba(216,44,39,0.03)" />
                            <ReferenceArea x1="M10" x2="M14" fill="rgba(229,184,11,0.03)" />

                            <Line type="monotone" dataKey="readiness" stroke="var(--color-primary)" strokeWidth={4} dot={{ r: 4, fill: 'var(--color-bg-primary)', strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--color-accent)' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Phase Legend */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                         <div style={{ textAlign: 'center', flex: 1 }}><span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>START (M1-M4)</span></div>
                         <div style={{ textAlign: 'center', flex: 1 }}><span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>MIDDLE (M5-M9)</span></div>
                         <div style={{ textAlign: 'center', flex: 1 }}><span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>END (M10-M14)</span></div>
                      </div>

                    </div>
                    
                    {/* Current Cognitive Breakdown */}
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <div>
                         <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Current Cognitive Score</h3>
                         <div style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-bebas-neue)', color: 'var(--color-primary)' }}>{selectedPlayer.mental}/100</div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Focus: <span style={{ color: 'var(--color-accent)' }}>Optimal</span></div>
                         <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Fatigue: <span style={{ color: 'var(--color-accent)' }}>Low</span></div>
                         <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Reaction: <span style={{ color: 'var(--color-accent)' }}>Peak</span></div>
                       </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
