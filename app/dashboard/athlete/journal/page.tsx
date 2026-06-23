'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Mic, TrendingUp, ChevronRight, Edit3, History, Search, Save, Bot, Smile, Meh, Frown, SmilePlus } from 'lucide-react';

const sentimentTrend = [
  { date: 'Jun 1', sentiment: 0.6, emotion: 'Calm' },
  { date: 'Jun 5', sentiment: 0.4, emotion: 'Anxious' },
  { date: 'Jun 8', sentiment: 0.7, emotion: 'Motivated' },
  { date: 'Jun 12', sentiment: 0.55, emotion: 'Neutral' },
  { date: 'Jun 15', sentiment: 0.3, emotion: 'Stressed' },
  { date: 'Jun 18', sentiment: 0.65, emotion: 'Confident' },
  { date: 'Jun 23', sentiment: 0.78, emotion: 'Focused' },
];

const pastEntries = [
  { date: 'June 22', mood: <SmilePlus size={28} color="var(--color-primary)" />, title: 'Great training session', snippet: 'Felt really in the zone today. Coach gave positive feedback on my positioning...', sentiment: 'Positive', tags: ['confident', 'focused'], score: 0.78 },
  { date: 'June 20', mood: <Meh size={28} color="var(--color-accent)" />, title: 'Mixed feelings before match', snippet: "Struggled with pre-match anxiety. Couldn't sleep well. Used the breathing technique...", sentiment: 'Neutral', tags: ['anxious', 'breathing'], score: 0.5 },
  { date: 'June 18', mood: <Frown size={28} color="#ef4444" />, title: 'Tough day', snippet: "Made errors during practice. Feeling the pressure of selection. Team morale seems low...", sentiment: 'Negative', tags: ['self-doubt', 'pressure'], score: 0.3 },
  { date: 'June 15', mood: <Smile size={28} color="var(--color-primary)" />, title: 'Victory vibes', snippet: 'Won the practice match! Confidence is sky high. The visualization training is working...', sentiment: 'Positive', tags: ['motivated', 'happy'], score: 0.92 },
];

function SentimentBadge({ score }: { score: number }) {
  const config = score > 0.65
    ? { label: 'Positive', className: 'badge-success' }
    : score > 0.4
      ? { label: 'Neutral', className: 'badge-warning' }
      : { label: 'Negative', className: 'badge-danger' };
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}

export default function JournalPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ sentiment: string; emotions: string[]; insights: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'write' | 'history'>('write');

  const handleAnalyze = () => {
    if (!content.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        sentiment: content.toLowerCase().includes('anxious') || content.toLowerCase().includes('stress') ? 'Mixed — Some stress indicators detected' : 'Positive — Confident and motivated tone',
        emotions: ['Confident', 'Focused', 'Slightly Anxious'],
        insights: 'Your writing reflects strong self-awareness. The mention of preparation aligns with positive pre-match readiness. Watch for recurring anxiety themes — consider the breathing protocol tonight.',
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={28} color="var(--color-primary)" />
            Athlete Journal
          </h1>
          <p className="page-subtitle">Your private space for reflection · AI-analyzed for insights</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px', width: 'fit-content', marginBottom: '24px' }}>
        {(['write', 'history'] as const).map(tab => (
          <button
            key={tab}
            id={`journal-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '8px', border: 'none', fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s ease', background: activeTab === tab ? 'rgba(216,44,39,0.2)' : 'transparent', color: activeTab === tab ? 'var(--color-primary-light)' : 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}
          >
            {tab === 'write' ? <Edit3 size={15} /> : <History size={15} />}
            {tab === 'write' ? 'Write Entry' : 'Past Entries'}
          </button>
        ))}
      </div>

      {activeTab === 'write' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
          {/* Editor */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Entry title (optional)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input"
                style={{ fontSize: '18px', fontWeight: '600', padding: '12px 16px' }}
              />
            </div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <button
                id="voice-record-btn"
                onClick={() => setIsRecording(!isRecording)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: `1px solid ${isRecording ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`, background: isRecording ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)', color: isRecording ? '#f87171' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}
              >
                <Mic size={13} style={{ animation: isRecording ? 'pulse 1s infinite' : 'none' }} />
                {isRecording ? 'Recording...' : 'Voice to Text'}
              </button>
            </div>
            <textarea
              id="journal-content"
              placeholder="What's on your mind today? How are you feeling about training, the upcoming match, your teammates...

The more you share, the better the AI can help you understand your mental patterns."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', minHeight: '320px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.8 }}
            />

            {/* Mood tags */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mood tags:</span>
              {['Confident', 'Anxious', 'Motivated', 'Tired', 'Focused', 'Stressed', 'Happy', 'Frustrated'].map(tag => (
                <button key={tag} style={{ padding: '4px 10px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button id="analyze-journal-btn" className="btn-secondary" onClick={handleAnalyze} disabled={!content.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={15} /> Analyze with AI
              </button>
              <button id="save-journal-btn" className="btn-primary" disabled={!content.trim()} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={15} /> Save Entry
              </button>
            </div>
          </div>

          {/* Sidebar: Trend + Analysis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Sentiment Trend */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <TrendingUp size={15} color="var(--color-accent)" />
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-accent)' }}>30-Day Emotional Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={sentimentTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(229,184,11,0.1)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
                  <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 1]} />
                  <Tooltip contentStyle={{ background: 'rgba(26,10,10,0.95)', border: '1px solid var(--color-accent)', borderRadius: '8px', fontSize: '11px', color: 'var(--text-primary)' }} formatter={(v: number) => [(v * 100).toFixed(0) + '%', 'Positivity']} />
                  <Area type="monotone" dataKey="sentiment" stroke="var(--color-primary)" strokeWidth={2} fill="url(#sentGrad)" dot={{ fill: 'var(--color-primary)', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Avg this month: <span style={{ color: 'var(--color-primary-light)', fontWeight: '700' }}>58%</span></span>
                <span>Latest: <span style={{ color: '#10b981', fontWeight: '700' }}>78%</span></span>
              </div>
            </div>

            {/* AI Analysis Result */}
            {analyzing ? (
              <div className="glass-card" style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', animation: 'pulse 1s infinite' }}>
                    <Bot size={28} color="var(--color-primary)" />
                  </div>
                  <div>BERT & Sentiment models analyzing...</div>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="glass-card" style={{ padding: '20px', background: 'rgba(216,44,39,0.06)', border: '1px solid rgba(216,44,39,0.2)' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bot size={14} /> AI Analysis
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Sentiment</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500' }}>{analysisResult.sentiment}</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Detected Emotions</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {analysisResult.emotions.map(e => (
                      <span key={e} className="badge" style={{ background: 'rgba(229,184,11,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(229,184,11,0.25)' }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Insights</div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{analysisResult.insights}</p>
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                  Detected Patterns
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Pre-match anxiety', count: 4, color: '#f59e0b' },
                    { label: 'Positive self-talk', count: 7, color: '#10b981' },
                    { label: 'Recovery mentions', count: 3, color: 'var(--color-accent)' },
                    { label: 'Team dynamics', count: 2, color: 'var(--color-primary)' },
                  ].map(p => (
                    <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: p.color }}>{p.count}x</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* History Tab */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pastEntries.map((entry, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ lineHeight: 1, flexShrink: 0 }}>{entry.mood}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>{entry.title}</h3>
                      <SentimentBadge score={entry.score} />
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{entry.snippet}</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                      {entry.tags.map(t => <span key={t} className="badge" style={{ background: 'rgba(216,44,39,0.15)', color: 'var(--color-primary-light)', border: '1px solid rgba(216,44,39,0.25)' }}>#{t}</span>)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{entry.date}</div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
