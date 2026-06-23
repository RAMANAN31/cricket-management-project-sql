'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, UserRole } from '@/lib/supabase';

const DEMO_USERS: { role: UserRole; label: string; email: string; color: string }[] = [
  { role: 'athlete', label: 'Athlete', email: 'athlete@athlon.ai', color: '#6366f1' },
  { role: 'coach', label: 'Coach', email: 'coach@athlon.ai', color: '#06b6d4' },
  { role: 'psychologist', label: 'Psychologist', email: 'psych@athlon.ai', color: '#8b5cf6' },
  { role: 'fitness_coach', label: 'Fitness Coach', email: 'fitness@athlon.ai', color: '#10b981' },
  { role: 'team_manager', label: 'Team Manager', email: 'manager@athlon.ai', color: '#f59e0b' },
  { role: 'selector', label: 'Selector', email: 'selector@athlon.ai', color: '#ec4899' },
  { role: 'admin', label: 'Admin', email: 'admin@athlon.ai', color: '#ef4444' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDemoLogin = (role: UserRole) => {
    // Store role in localStorage for demo mode
    localStorage.setItem('athlon_demo_role', role);
    localStorage.setItem('athlon_demo_user', JSON.stringify({
      id: 'demo-' + role,
      email: role + '@athlon.ai',
      full_name: getDemoName(role),
      role,
    }));
    router.push(`/dashboard/${role}`);
  };

  const getDemoName = (role: UserRole) => {
    const names: Record<UserRole, string> = {
      athlete: 'Arjun Sharma',
      coach: 'Rahul Dravid',
      psychologist: 'Dr. Priya Nair',
      fitness_coach: 'Suresh Kumar',
      team_manager: 'Vikram Singh',
      selector: 'Anil Kumble',
      admin: 'Admin User',
    };
    return names[role];
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animated-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '60%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ATHLON AI
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Mental Fitness Intelligence
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Elite performance starts with mental readiness.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card" style={{ padding: '36px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>
            Sign In to Platform
          </h1>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                className="glass-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="glass-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button id="login-submit" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Quick Demo Access</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          </div>

          {/* Demo role buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {DEMO_USERS.map((u) => (
              <button
                key={u.role}
                id={`demo-${u.role}`}
                onClick={() => handleDemoLogin(u.role)}
                style={{
                  background: `rgba(${hexToRgb(u.color)}, 0.1)`,
                  border: `1px solid rgba(${hexToRgb(u.color)}, 0.25)`,
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: u.color,
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `rgba(${hexToRgb(u.color)}, 0.2)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = `rgba(${hexToRgb(u.color)}, 0.1)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {u.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--color-primary-light)', fontWeight: '600', textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Psychometric scores are not used as selection criteria.<br />
          This platform provides evidence-based mental wellness support only.
        </p>
      </div>
    </div>
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '99,102,241';
}
