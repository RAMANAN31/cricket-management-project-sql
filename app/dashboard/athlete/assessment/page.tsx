'use client';

import { useState } from 'react';
import { Brain, ChevronRight, CheckCircle2, Circle, Smile, Zap, Activity, Target, Thermometer, Flame, Shield, SmilePlus, Meh, Frown, CheckCircle, Bot, Wind, Check } from 'lucide-react';

// --- Step Definitions ---
type Step = 'mood' | 'stress' | 'confidence' | 'focus' | 'anxiety' | 'motivation' | 'resilience' | 'results';

const STEPS: { id: Step; title: string; subtitle: string; icon: React.ReactNode }[] = [
  { id: 'mood', title: 'Mood Check-In', subtitle: 'How are you feeling right now?', icon: <Smile size={48} color="var(--color-primary)" /> },
  { id: 'stress', title: 'Stress Level', subtitle: 'Rate your current stress', icon: <Zap size={48} color="var(--color-primary)" /> },
  { id: 'confidence', title: 'Confidence', subtitle: 'How confident do you feel?', icon: <Activity size={48} color="var(--color-primary)" /> },
  { id: 'focus', title: 'Focus & Clarity', subtitle: 'Rate your mental sharpness', icon: <Target size={48} color="var(--color-primary)" /> },
  { id: 'anxiety', title: 'Anxiety Level', subtitle: 'Pre-match anxiety check', icon: <Thermometer size={48} color="var(--color-primary)" /> },
  { id: 'motivation', title: 'Motivation', subtitle: 'Drive and determination', icon: <Flame size={48} color="var(--color-primary)" /> },
  { id: 'resilience', title: 'Resilience', subtitle: 'Mental toughness today', icon: <Shield size={48} color="var(--color-primary)" /> },
];

const MOOD_OPTIONS = [
  { icon: <SmilePlus size={36} />, label: 'Excellent', value: 5 },
  { icon: <Smile size={36} />, label: 'Good', value: 4 },
  { icon: <Meh size={36} />, label: 'Neutral', value: 3 },
  { icon: <Frown size={36} />, label: 'Low', value: 2 },
  { icon: <Thermometer size={36} />, label: 'Anxious', value: 1 },
];

interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  color?: string;
  labels?: string[];
}

function ScaleSlider({ value, onChange, color = 'var(--color-primary)', labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'] }: SliderProps) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            style={{
              width: '38px', height: '38px', borderRadius: '10px', border: `2px solid ${n <= value ? color : 'rgba(255,255,255,0.1)'}`,
              background: n <= value ? `${color}25` : 'rgba(255,255,255,0.03)',
              color: n <= value ? color : 'var(--text-muted)',
              fontWeight: n === value ? '800' : '500',
              fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease',
              transform: n === value ? 'scale(1.15)' : 'scale(1)',
              boxShadow: n === value ? `0 0 12px ${color}60` : 'none',
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
        {labels.slice(0, 2).map((l, i) => <span key={i}>{l}</span>)}
        <span style={{ color }}>{value}/10</span>
        {labels.slice(3).map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

// --- SHAP Explanation ---
function SHAPExplanation({ scores }: { scores: Record<string, number> }) {
  const factors = [
    { label: 'Focus Score', impact: +0.18, value: scores.focus },
    { label: 'Sleep Quality', impact: +0.14, value: 7 },
    { label: 'Stress Level', impact: -0.22, value: scores.stress },
    { label: 'Confidence', impact: +0.16, value: scores.confidence },
    { label: 'Anxiety', impact: -0.12, value: scores.anxiety },
    { label: 'Motivation', impact: +0.11, value: scores.motivation },
  ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Activity size={14} /> SHAP Explainability
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {factors.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', width: '110px', flexShrink: 0 }}>{f.label}</div>
            <div style={{ flex: 1, position: 'relative', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', height: '100%', borderRadius: '99px', background: f.impact > 0 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'linear-gradient(90deg, #ef4444, #f59e0b)', width: `${Math.abs(f.impact) * 400}%`, left: f.impact > 0 ? '50%' : `calc(50% - ${Math.abs(f.impact) * 400}%)` }} />
              <div style={{ position: 'absolute', left: '50%', top: '-1px', width: '1px', height: '8px', background: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: f.impact > 0 ? '#10b981' : '#ef4444', width: '45px', textAlign: 'right' }}>
              {f.impact > 0 ? '+' : ''}{(f.impact * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Results Panel ---
function ResultsPanel({ scores }: { scores: Record<string, number> }) {
  const mfs = Math.round(
    (scores.mood * 10 + (10 - scores.stress) * 8 + scores.confidence * 9 + scores.focus * 9 + (10 - scores.anxiety) * 8 + scores.motivation * 8 + scores.resilience * 8) / 6
  );
  const clampedMfs = Math.min(100, Math.max(0, mfs));
  const level = clampedMfs >= 80 ? 'Excellent' : clampedMfs >= 65 ? 'Good' : clampedMfs >= 50 ? 'Moderate' : 'Needs Attention';
  const color = clampedMfs >= 80 ? '#10b981' : clampedMfs >= 65 ? 'var(--color-accent)' : clampedMfs >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Assessment Complete <CheckCircle size={16} color="var(--color-success)" />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '140px', height: '140px', borderRadius: '50%', background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, border: `3px solid ${color}40`, position: 'relative', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '52px', fontWeight: '900', color, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>{clampedMfs}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100</div>
          </div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: '700', color, marginBottom: '6px' }}>Mental Fitness: {level}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
          Your mental readiness is {level.toLowerCase()} today. {clampedMfs >= 65 ? 'You are well-prepared for performance.' : 'Consider working with your psychologist on stress management.'}
        </div>
      </div>

      {/* Scores Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Mood', val: scores.mood * 10, color: 'var(--color-primary)' },
          { label: 'Confidence', val: scores.confidence * 10, color: '#10b981' },
          { label: 'Focus', val: scores.focus * 10, color: 'var(--color-accent)' },
          { label: 'Motivation', val: scores.motivation * 10, color: '#8b5cf6' },
          { label: 'Resilience', val: scores.resilience * 10, color: '#f59e0b' },
          { label: 'Stress Ctrl', val: (10 - scores.stress) * 10, color: '#ec4899' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
            <div className="progress-bar" style={{ marginTop: '8px' }}>
              <div className="progress-fill" style={{ width: `${s.val}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div style={{ background: 'rgba(216,44,39,0.08)', border: '1px solid rgba(216,44,39,0.2)', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
          <Bot size={18} /> AI Recommended Interventions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { text: '10-minute guided meditation before warm-up', condition: scores.stress > 6, icon: <Wind size={14} />, goodIcon: <Check size={14} color="var(--color-success)" />, goodText: 'Stress levels are well managed' },
            { text: 'Confidence affirmations routine (15 min)', condition: scores.confidence < 6, icon: <Activity size={14} />, goodIcon: <Check size={14} color="var(--color-success)" />, goodText: 'Confidence is strong — maintain your routine' },
            { text: 'Pre-match visualization exercise (10 min)', condition: true, icon: <Target size={14} /> },
          ].map((rec, i) => (
            <div key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              {rec.condition ? rec.icon : (rec.goodIcon || <Check size={14} />)}
              <span>{rec.condition ? rec.text : (rec.goodText || rec.text)}</span>
            </div>
          ))}
        </div>
      </div>

      <SHAPExplanation scores={scores} />
    </div>
  );
}

// --- Main Assessment Page ---
export default function AssessmentPage() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [step, setStep] = useState<Step>('mood');
  const [scores, setScores] = useState<Record<string, number>>({ mood: 4, stress: 5, confidence: 7, focus: 7, anxiety: 4, motivation: 8, resilience: 7 });
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentStepDef = STEPS[currentStepIdx];
  const isLastStep = currentStepIdx === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setShowResults(true);
    } else {
      setCurrentStepIdx(prev => prev + 1);
      setStep(STEPS[currentStepIdx + 1].id);
    }
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
      setStep(STEPS[currentStepIdx - 1].id);
    }
  };

  const progressPct = ((currentStepIdx + 1) / STEPS.length) * 100;

  return (
    <div className="fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain size={28} color="var(--color-primary)" />
          Mental Assessment
        </h1>
        <p className="page-subtitle">AI-powered psychometric evaluation · Results are confidential</p>
      </div>

      <div className="glass-card" style={{ padding: '36px' }}>
        {!showResults ? (
          <>
            {/* Progress */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  Step {currentStepIdx + 1} of {STEPS.length}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-primary-light)', fontWeight: '700' }}>{Math.round(progressPct)}% Complete</span>
              </div>
              <div className="progress-bar" style={{ height: '8px' }}>
                <div className="progress-fill" style={{ width: `${progressPct}%`, background: 'var(--color-primary)', transition: 'width 0.4s ease' }} />
              </div>
              {/* Step indicators */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '16px', justifyContent: 'center' }}>
                {STEPS.map((s, i) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i < currentStepIdx
                      ? <CheckCircle2 size={18} color="var(--color-success)" />
                      : i === currentStepIdx
                        ? <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: 'rgba(216,44,39,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: 'var(--color-primary)' }}>{i + 1}</div>
                        : <Circle size={18} color="rgba(255,255,255,0.15)" />
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Current Step Content */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{currentStepDef.icon}</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{currentStepDef.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{currentStepDef.subtitle}</p>
            </div>

            {/* Mood: Icon selector */}
            {step === 'mood' && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {MOOD_OPTIONS.map(m => (
                  <button
                    key={m.value}
                    onClick={() => { setSelectedMood(m.value); setScores(prev => ({ ...prev, mood: m.value * 2 })); }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 20px', borderRadius: '14px', border: `2px solid ${selectedMood === m.value ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'}`, background: selectedMood === m.value ? 'rgba(216,44,39,0.15)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.2s ease', transform: selectedMood === m.value ? 'scale(1.05)' : 'scale(1)', color: selectedMood === m.value ? 'var(--color-primary)' : 'var(--text-secondary)' }}
                  >
                    <span>{m.icon}</span>
                    <span style={{ fontSize: '12px', color: selectedMood === m.value ? 'var(--color-primary-light)' : 'var(--text-secondary)', fontWeight: '600' }}>{m.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Other steps: Slider */}
            {step !== 'mood' && step !== 'results' && (
              <div style={{ padding: '0 20px', marginBottom: '32px' }}>
                <ScaleSlider
                  value={scores[step] || 5}
                  onChange={(v) => setScores(prev => ({ ...prev, [step]: v }))}
                  color={step === 'stress' || step === 'anxiety' ? '#ef4444' : 'var(--color-primary)'}
                />
                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Open Response (Optional)</div>
                  <textarea
                    placeholder={`Describe your ${step} level in more detail...`}
                    style={{ width: '100%', minHeight: '70px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <button
                className="btn-secondary"
                onClick={handleBack}
                disabled={currentStepIdx === 0}
                style={{ opacity: currentStepIdx === 0 ? 0.4 : 1 }}
              >
                ← Back
              </button>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                AI processes your response in real-time
              </div>
              <button className="btn-primary" onClick={handleNext} id="assessment-next-btn">
                {isLastStep ? 'Get Results' : 'Next'} <ChevronRight size={15} />
              </button>
            </div>
          </>
        ) : (
          <>
            <ResultsPanel scores={scores} />
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => { setShowResults(false); setCurrentStepIdx(0); setStep('mood'); }}>
                Retake Assessment
              </button>
              <button className="btn-primary" id="save-assessment-btn">
                Save & Continue →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
