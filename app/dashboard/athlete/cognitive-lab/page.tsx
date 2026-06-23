'use client';

import { useState, useEffect, useRef } from 'react';
import { Cpu, Timer, Zap, Brain, Target, ChevronRight, MousePointer2, Hourglass, CheckCircle2, Star, Trophy, Flame, Gem, Medal, Crown, Lightbulb } from 'lucide-react';

type TestType = 'menu' | 'reaction' | 'focus' | 'memory' | 'results';

// ===================== REACTION TIME TEST =====================
function ReactionTest({ onComplete }: { onComplete: (avgMs: number) => void }) {
  const [phase, setPhase] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTest = () => {
    setPhase('ready');
    setReactionTime(null);
    const delay = 1500 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setPhase('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (phase === 'go') {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setAttempts(prev => {
        const newAttempts = [...prev, rt];
        if (newAttempts.length >= 5) {
          const avg = newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length;
          setTimeout(() => onComplete(avg), 1500);
        }
        return newAttempts;
      });
      setPhase('result');
    } else if (phase === 'ready') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('waiting');
    }
  };

  const getPhaseColor = () => phase === 'go' ? 'var(--color-success)' : phase === 'ready' ? 'var(--color-accent)' : 'var(--color-primary)';

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Attempt {attempts.length + 1} of 5</div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '32px' }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i < attempts.length ? 'var(--color-success)' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
      <button
        onClick={phase === 'waiting' ? startTest : handleClick}
        style={{ width: '220px', height: '220px', borderRadius: '50%', border: `4px solid ${getPhaseColor()}`, background: phase === 'waiting' ? 'rgba(216,44,39,0.15)' : phase === 'ready' ? 'rgba(229,184,11,0.15)' : 'rgba(16,185,129,0.15)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'all 0.2s ease', boxShadow: phase === 'go' ? `0 0 40px ${getPhaseColor()}60` : 'none', margin: '0 auto' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {phase === 'waiting' ? <MousePointer2 size={48} color={getPhaseColor()} /> : phase === 'ready' ? <Hourglass size={48} color={getPhaseColor()} /> : phase === 'go' ? <Zap size={48} color={getPhaseColor()} /> : <CheckCircle2 size={48} color={getPhaseColor()} />}
        </span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: getPhaseColor() }}>
          {phase === 'waiting' ? 'Tap to Start' : phase === 'ready' ? 'Get Ready...' : phase === 'go' ? 'TAP NOW!' : 'Great!'}
        </span>
        {reactionTime && phase === 'result' && (
          <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--color-success)' }}>{reactionTime}ms</span>
        )}
      </button>
      {phase === 'result' && attempts.length < 5 && (
        <button className="btn-primary" style={{ marginTop: '24px' }} onClick={startTest}>Next Attempt →</button>
      )}
      {attempts.length > 0 && (
        <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Best: <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>{Math.min(...attempts)}ms</span>
          {' '} · Avg: <span style={{ color: 'var(--color-primary-light)', fontWeight: '700' }}>{Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)}ms</span>
        </div>
      )}
    </div>
  );
}

// ===================== FOCUS TEST =====================
function FocusTest({ onComplete }: { onComplete: (score: number) => void }) {
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; hit: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); onComplete(score); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, score, onComplete]);

  useEffect(() => {
    if (!started) return;
    const spawnInterval = setInterval(() => {
      const id = Date.now();
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      setTargets(prev => [...prev.slice(-5), { id, x, y, hit: false }]);
    }, 800);
    return () => clearInterval(spawnInterval);
  }, [started]);

  const hitTarget = (id: number) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, hit: true } : t));
    setScore(s => s + 1);
    setTimeout(() => setTargets(prev => prev.filter(t => t.id !== id)), 200);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
        <span style={{ color: 'var(--color-primary-light)', fontWeight: '700' }}>Score: {score}</span>
        <span style={{ color: timeLeft <= 10 ? 'var(--color-primary)' : 'var(--text-secondary)', fontWeight: '700' }}>⏱ {timeLeft}s</span>
      </div>
      {!started ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><Target size={48} color="var(--color-primary-light)" /></div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6 }}>
            Tap the glowing targets as fast as possible.<br />30 seconds. Maximum focus required.
          </p>
          <button className="btn-primary" onClick={() => setStarted(true)}>Start Focus Test</button>
        </div>
      ) : (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '360px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
          {targets.filter(t => !t.hit).map(t => (
            <button
              key={t.id}
              onClick={() => hitTarget(t.id)}
              className="cognitive-target"
              style={{ position: 'absolute', left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, rgba(216,44,39,0.2), rgba(229,184,11,0.2))', border: '2px solid var(--color-primary)', boxShadow: '0 0 20px rgba(216,44,39,0.6)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-light)' }}
            >
              <Target size={24} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================== MEMORY TEST =====================
function MemoryTest({ onComplete }: { onComplete: (score: number) => void }) {
  const ICON_SIZE = 28;
  const ICON_COLOR = "var(--text-primary)";
  const ICONS = [
    <Trophy size={ICON_SIZE} color={ICON_COLOR} key="trophy" />,
    <Zap size={ICON_SIZE} color={ICON_COLOR} key="zap" />,
    <Target size={ICON_SIZE} color={ICON_COLOR} key="target" />,
    <Flame size={ICON_SIZE} color={ICON_COLOR} key="flame" />,
    <Gem size={ICON_SIZE} color={ICON_COLOR} key="gem" />,
    <Star size={ICON_SIZE} color={ICON_COLOR} key="star" />,
    <Medal size={ICON_SIZE} color={ICON_COLOR} key="medal" />,
    <Crown size={ICON_SIZE} color={ICON_COLOR} key="crown" />
  ];
  
  const [cards, setCards] = useState(() => {
    const pairs = [...ICONS, ...ICONS].map((icon, i) => ({ id: i, icon, flipped: false, matched: false }));
    return pairs.sort(() => Math.random() - 0.5);
  });
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const handleFlip = (id: number) => {
    if (!started || flipped.length >= 2) return;
    if (cards[id].matched || cards[id].flipped) return;
    const newFlipped = [...flipped, id];
    setCards(prev => prev.map((c, i) => i === id ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].icon.key === cards[b].icon.key) {
        setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, matched: true } : c));
        setFlipped([]);
        if (cards.filter(c => c.matched).length + 2 === cards.length) {
          setTimeout(() => onComplete(Math.max(10, 100 - moves * 5)), 500);
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 800);
      }
    }
  };

  if (!started) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><Brain size={48} color="var(--color-primary-light)" /></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6 }}>Match all pairs of cards.<br />Fewer moves = higher score.</p>
      <button className="btn-primary" onClick={() => setStarted(true)}>Start Memory Test</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
        <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>Moves: {moves}</span>
        <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>Pairs: {cards.filter(c => c.matched).length / 2} / {ICONS.length}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => handleFlip(i)}
            style={{ height: '70px', borderRadius: '12px', border: `2px solid ${card.matched ? 'rgba(16,185,129,0.4)' : card.flipped ? 'rgba(216,44,39,0.4)' : 'rgba(255,255,255,0.08)'}`, background: card.matched ? 'rgba(16,185,129,0.1)' : card.flipped ? 'rgba(216,44,39,0.1)' : 'rgba(255,255,255,0.04)', cursor: card.matched ? 'default' : 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {card.flipped || card.matched ? card.icon : <Lightbulb size={24} color="rgba(255,255,255,0.1)" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===================== MAIN PAGE =====================
export default function CognitiveLab() {
  const [activeTest, setActiveTest] = useState<TestType>('menu');
  const [results, setResults] = useState<{ reaction?: number; focus?: number; memory?: number }>({});

  const cognitiveScore = Object.keys(results).length > 0
    ? Math.round(Object.values(results).reduce((a, b) => a + b, 0) / Object.keys(results).length)
    : null;

  const tests = [
    { id: 'reaction' as TestType, icon: <Zap size={24} />, title: 'Reaction Time', desc: 'Measure your neural response speed', color: 'var(--color-primary)', status: results.reaction ? `${Math.round(results.reaction)}ms avg` : 'Not started' },
    { id: 'focus' as TestType, icon: <Target size={24} />, title: 'Focus & Attention', desc: 'Track moving targets under time pressure', color: 'var(--color-primary-light)', status: results.focus ? `Score: ${results.focus}` : 'Not started' },
    { id: 'memory' as TestType, icon: <Brain size={24} />, title: 'Working Memory', desc: 'Pattern recognition and recall speed', color: 'var(--color-accent)', status: results.memory ? `Score: ${results.memory}` : 'Not started' },
    { id: 'decision' as TestType, icon: <Lightbulb size={24} />, title: 'Decision Making', desc: 'Complex multi-step decisions under stress', color: '#f59e0b', status: 'Coming soon' },
  ];

  if (activeTest !== 'menu') {
    return (
      <div className="fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <button className="btn-secondary" onClick={() => setActiveTest('menu')} style={{ marginBottom: '24px' }}>
          ← Back to Lab
        </button>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', textAlign: 'center', color: 'var(--text-primary)' }}>
            {tests.find(t => t.id === activeTest)?.title}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '28px' }}>
            {tests.find(t => t.id === activeTest)?.desc}
          </p>
          {activeTest === 'reaction' && <ReactionTest onComplete={(avg) => { setResults(r => ({ ...r, reaction: avg })); setActiveTest('menu'); }} />}
          {activeTest === 'focus' && <FocusTest onComplete={(s) => { setResults(r => ({ ...r, focus: s })); setActiveTest('menu'); }} />}
          {activeTest === 'memory' && <MemoryTest onComplete={(s) => { setResults(r => ({ ...r, memory: s })); setActiveTest('menu'); }} />}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={28} color="var(--color-primary)" />
            Cognitive Performance Lab
          </h1>
          <p className="page-subtitle">Measure your mental sharpness, reaction speed, and decision-making</p>
        </div>
        {cognitiveScore && (
          <div style={{ textAlign: 'center', background: 'rgba(216,44,39,0.1)', border: '1px solid rgba(216,44,39,0.25)', borderRadius: '16px', padding: '16px 24px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--color-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>{cognitiveScore}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cognitive Score</div>
          </div>
        )}
      </div>

      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {tests.map(test => (
          <div key={test.id} className="glass-card" style={{ padding: '24px', cursor: test.id === 'decision' ? 'default' : 'pointer', opacity: test.id === 'decision' ? 0.5 : 1 }}
            onClick={() => test.id !== 'decision' && setActiveTest(test.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(216,44,39,0.1)', border: `1px solid ${test.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: test.color }}>
                {test.icon}
              </div>
              {results[test.id as keyof typeof results] ? (
                <span className="badge badge-success">✓ Done</span>
              ) : (
                <ChevronRight size={16} color="var(--text-muted)" />
              )}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>{test.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>{test.desc}</p>
            <div style={{ fontSize: '12px', fontWeight: '600', color: results[test.id as keyof typeof results] ? 'var(--color-success)' : 'var(--text-muted)' }}>
              {test.status}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '32px', overflowX: 'auto' }}>
          {[
            { icon: <Zap size={16} />, label: 'Avg Reaction Time', value: results.reaction ? `${Math.round(results.reaction)}ms` : '-', color: 'var(--color-primary)', note: results.reaction && results.reaction < 250 ? 'Elite level!' : 'Keep practicing' },
            { icon: <Target size={16} />, label: 'Focus Score', value: results.focus ? `${results.focus}/100` : '-', color: 'var(--color-primary-light)', note: 'Targets hit in 30s' },
            { icon: <Brain size={16} />, label: 'Memory Score', value: results.memory ? `${results.memory}/100` : '-', color: 'var(--color-accent)', note: 'Pair matching efficiency' },
            { icon: <Timer size={16} />, label: 'Tests Completed', value: `${Object.keys(results).length}/4`, color: '#f59e0b', note: 'Complete all for full score' },
          ].map((stat, i) => (
            <div key={i} style={{ flexShrink: 0, minWidth: '160px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: stat.color, marginBottom: '8px', fontSize: '12px' }}>
                {stat.icon}
                <span style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '10px' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{stat.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
