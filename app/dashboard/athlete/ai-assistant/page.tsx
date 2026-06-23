'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, Wind, Eye, Target } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: "Hello Arjun! I'm your AI Sports Psychology Assistant. I'm here to support your mental performance journey.\n\nI can help you with:\n• **Pre-match anxiety management**\n• **Confidence building exercises**\n• **Visualization and mental rehearsal**\n• **Stress management techniques**\n• **Goal setting frameworks**\n\nWhat's on your mind today?",
  timestamp: new Date(),
};

const QUICK_PROMPTS = [
  "I'm feeling anxious before tomorrow's match",
  "Help me with a breathing exercise",
  "Teach me visualization techniques",
  "I need confidence boosting",
  "How do I handle performance pressure?",
];

const AI_RESPONSES: Record<string, string> = {
  anxious: "I hear you. Pre-match anxiety is completely normal — even elite athletes experience it. Let's channel it into performance energy.\n\n**3-Step Anxiety Reset:**\n\n1. **Box Breathing (2 min)** — Inhale 4s → Hold 4s → Exhale 4s → Hold 4s. This activates your parasympathetic system.\n\n2. **Body Scan** — Notice where you're holding tension (shoulders? jaw?). Consciously release it.\n\n3. **Power Phrase** — Repeat your personal mantra 3 times: *\"I am prepared. I am focused. I perform at my best.\"\n\nWould you like me to guide you through a live breathing exercise?",
  breathing: "Let's do a **4-7-8 Breathing Exercise** together.\n\nFind a comfortable position. We'll do 4 cycles:\n\n[IN] **Inhale** through your nose for **4 counts**\n[HOLD] **Hold** your breath for **7 counts**\n[OUT] **Exhale** completely through mouth for **8 counts**\n\nThis technique activates the vagus nerve and reduces cortisol within 60 seconds.\n\n*Click \"Start Breathing Exercise\" below to begin the guided session.*",
  visualization: "**Mental Rehearsal Protocol** — Elite athletes use this before every major performance:\n\n**Step 1: Environment** (2 min)\nClose your eyes. Picture the venue in vivid detail — the crowd, the lighting, the sounds.\n\n**Step 2: The Perfect Performance** (5 min)\nSee yourself executing your skills flawlessly. Feel the confidence in your body.\n\n**Step 3: Handling Challenges** (2 min)\nVisualize a difficult moment — then see yourself overcoming it calmly.\n\n**Step 4: The Outcome** (1 min)\nFeel the emotion of success. Let it fill your body.\n\nPractice this nightly for 21 days for maximum impact.",
  confidence: "Building authentic confidence is a skill. Here's your **7-Day Confidence Protocol:**\n\n**Daily:**\n• Morning affirmations (3 statements you believe)\n• Review your best performances (memory anchoring)\n• Physical posture — stand tall, breathe deep\n\n**This week:**\n• Write 10 past successes you're proud of\n• Identify your top 3 competitive strengths\n• Set micro-wins: small daily goals you can achieve\n\n**Remember:** Confidence follows action, not the other way around. Act confident first — the feeling follows.",
  default: "That's a great question. Based on your recent assessment data, I can see you've been showing strong focus scores but some stress indicators.\n\nLet me provide some personalized support based on your profile:\n\n**Your Current Strengths:**\n• Focus: 85/100 (Strong)\n• Motivation: 80/100 (Strong)\n\n**Areas to Work On:**\n• Stress Management: 65/100 (Needs Attention)\n• Pre-match Anxiety control\n\nWould you like me to create a personalized weekly mental conditioning plan for you?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('anxi') || lower.includes('nervous') || lower.includes('worry')) return AI_RESPONSES.anxious;
  if (lower.includes('breath') || lower.includes('calm') || lower.includes('relax')) return AI_RESPONSES.breathing;
  if (lower.includes('visual') || lower.includes('imagin') || lower.includes('picture')) return AI_RESPONSES.visualization;
  if (lower.includes('confid') || lower.includes('belief') || lower.includes('doubt')) return AI_RESPONSES.confidence;
  return AI_RESPONSES.default;
}

// Breathing Widget
function BreathingWidget({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [cycle, setCycle] = useState(0);
  const [count, setCount] = useState(4);
  const [active, setActive] = useState(false);

  const PHASES = {
    inhale: { next: 'hold1' as const, duration: 4, label: 'Inhale', color: 'var(--color-primary-light)', scale: 1.3 },
    hold1: { next: 'exhale' as const, duration: 7, label: 'Hold', color: 'var(--color-accent)', scale: 1.3 },
    exhale: { next: 'hold2' as const, duration: 8, label: 'Exhale', color: 'var(--color-primary)', scale: 0.8 },
    hold2: { next: 'inhale' as const, duration: 4, label: 'Hold', color: 'var(--color-accent)', scale: 0.8 },
  };

  useEffect(() => {
    if (!active) return;
    const current = PHASES[phase];
    setCount(current.duration);
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval);
          setPhase(current.next);
          if (current.next === 'inhale') setCycle(c => c + 1);
          return current.duration;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, active]);

  const currentPhase = PHASES[phase];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ padding: '48px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>4-7-8 Breathing</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>Cycle {cycle + 1} of 4</p>

        <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: `${currentPhase.color}15`, border: `3px solid ${currentPhase.color}40`, transform: `scale(${active ? currentPhase.scale : 1})`, transition: `transform ${currentPhase.duration}s ease` }} />
          <div style={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '50%', background: `${currentPhase.color}25`, border: `2px solid ${currentPhase.color}60`, transform: `scale(${active ? currentPhase.scale * 0.9 : 1})`, transition: `transform ${currentPhase.duration}s ease` }} />
          <div style={{ zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: currentPhase.color, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>{active ? count : '—'}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: currentPhase.color, marginTop: '4px' }}>{active ? currentPhase.label : 'Ready'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => setActive(!active)}>
            {active ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Main AI Assistant
export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      if (text.toLowerCase().includes('breath')) {
        setTimeout(() => setShowBreathing(true), 500);
      }
    }, 1200);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: i > 0 ? '8px' : 0 }}>{line.slice(2, -2)}</div>;
      }
      if (line.startsWith('• ')) {
        return <div key={i} style={{ paddingLeft: '12px', color: 'var(--text-secondary)', marginTop: '3px', fontSize: '13px' }}>• {line.slice(2)}</div>;
      }
      return <div key={i} style={{ marginTop: line === '' ? '6px' : '2px', fontSize: '13.5px', lineHeight: 1.6 }}>{line}</div>;
    });
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)' }}>
      {showBreathing && <BreathingWidget onClose={() => setShowBreathing(false)} />}

      {/* Header */}
      <div className="page-header" style={{ marginBottom: '16px', flexShrink: 0 }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot size={28} color="var(--color-primary)" />
          AI Sports Psychology Assistant
        </h1>
        <p className="page-subtitle">Powered by LLM + RAG · Evidence-based mental conditioning support</p>
      </div>

      {/* Quick Exercises */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', flexShrink: 0 }}>
        {[
          { icon: <Wind size={13} />, label: 'Breathing Exercise', action: () => setShowBreathing(true), color: 'var(--color-primary)' },
          { icon: <Eye size={13} />, label: 'Visualization', action: () => sendMessage('Teach me visualization techniques'), color: 'var(--color-accent)' },
          { icon: <Target size={13} />, label: 'Goal Setting', action: () => sendMessage('Help me set performance goals'), color: 'var(--color-primary-light)' },
          { icon: <Mic size={13} />, label: 'Voice Note', action: () => {}, color: 'var(--color-accent)' },
        ].map((btn, i) => (
          <button key={i} onClick={btn.action} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '99px', border: `1px solid ${btn.color}30`, background: `rgba(216,44,39,0.1)`, color: btn.color, fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(216,44,39,0.2)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `rgba(216,44,39,0.1)`; }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'flex-start' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(216,44,39,0.8), rgba(229,184,11,0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '2px' }}>
                  <Bot size={18} />
                </div>
              )}
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {formatMessage(msg.content)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(216,44,39,0.8), rgba(229,184,11,0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <Bot size={18} />
              </div>
              <div className="chat-bubble-ai" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '14px 18px' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)', animation: `pulse 1.4s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {QUICK_PROMPTS.map((p, i) => (
            <button key={i} onClick={() => sendMessage(p)} style={{ padding: '6px 12px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            id="ai-chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask anything about mental performance, anxiety, focus..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '10px 14px', color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.5, maxHeight: '100px', minHeight: '44px' }}
          />
          <button id="ai-send-btn" onClick={() => sendMessage()} className="btn-primary" style={{ padding: '11px 16px', flexShrink: 0 }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
