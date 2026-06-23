'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserRole } from '@/lib/supabase';

interface NavSection {
  title: string;
  items: {
    icon: string;
    label: string;
    href: string;
    badge?: string;
    badgeColor?: string;
  }[];
}

const NAV_CONFIG: Record<UserRole, NavSection[]> = {
  athlete: [
    {
      title: 'My Dashboard',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/athlete' },
        { icon: '🧠', label: 'Mental Assessment', href: '/dashboard/athlete/assessment' },
        { icon: '📓', label: 'My Journal', href: '/dashboard/athlete/journal' },
        { icon: '🎯', label: 'Cognitive Lab', href: '/dashboard/athlete/cognitive-lab' },
        { icon: '🤖', label: 'AI Assistant', href: '/dashboard/athlete/ai-assistant' },
      ],
    },
    {
      title: 'Performance',
      items: [
        { icon: '📊', label: 'Match Readiness', href: '/dashboard/athlete/readiness' },
        { icon: '😴', label: 'Sleep & Recovery', href: '/dashboard/athlete/sleep' },
        { icon: '📈', label: 'Progress Tracking', href: '/dashboard/athlete/progress' },
        { icon: '🎖️', label: 'Interventions', href: '/dashboard/athlete/interventions' },
      ],
    },
  ],
  coach: [
    {
      title: 'Team Command',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/coach' },
        { icon: '👥', label: 'Team Readiness', href: '/dashboard/coach/team-readiness' },
        { icon: '🔥', label: 'Burnout Heatmap', href: '/dashboard/coach/burnout' },
        { icon: '⚡', label: 'Match Readiness', href: '/dashboard/coach/match-readiness' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { icon: '💬', label: 'Team Climate', href: '/dashboard/coach/team-climate' },
        { icon: '🏥', label: 'Injury Risk', href: '/dashboard/coach/injury-risk' },
        { icon: '📊', label: 'Performance Trends', href: '/dashboard/coach/performance' },
        { icon: '🚨', label: 'Alerts', href: '/dashboard/coach/alerts', badge: '3', badgeColor: '#ef4444' },
      ],
    },
  ],
  psychologist: [
    {
      title: 'Clinical',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/psychologist' },
        { icon: '👤', label: 'Athlete Profiles', href: '/dashboard/psychologist/profiles' },
        { icon: '🚨', label: 'Crisis Alerts', href: '/dashboard/psychologist/crisis', badge: '2', badgeColor: '#ef4444' },
        { icon: '💊', label: 'Interventions', href: '/dashboard/psychologist/interventions' },
      ],
    },
    {
      title: 'Analysis',
      items: [
        { icon: '🧬', label: 'Assessment Review', href: '/dashboard/psychologist/assessments' },
        { icon: '📓', label: 'Journal Analysis', href: '/dashboard/psychologist/journals' },
        { icon: '📊', label: 'Trend Reports', href: '/dashboard/psychologist/trends' },
      ],
    },
  ],
  fitness_coach: [
    {
      title: 'Fitness',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/fitness_coach' },
        { icon: '⚡', label: 'Workload Monitor', href: '/dashboard/fitness_coach/workload' },
        { icon: '🏥', label: 'Injury Risk', href: '/dashboard/fitness_coach/injury-risk' },
        { icon: '😴', label: 'Recovery Analytics', href: '/dashboard/fitness_coach/recovery' },
      ],
    },
  ],
  team_manager: [
    {
      title: 'Management',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/team_manager' },
        { icon: '👥', label: 'Squad Status', href: '/dashboard/team_manager/squad' },
        { icon: '📅', label: 'Match Readiness', href: '/dashboard/team_manager/readiness' },
        { icon: '📊', label: 'Team Reports', href: '/dashboard/team_manager/reports' },
      ],
    },
  ],
  selector: [
    {
      title: 'Selection',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/selector' },
        { icon: '📊', label: 'Performance Data', href: '/dashboard/selector/performance' },
        { icon: '📈', label: 'Trends', href: '/dashboard/selector/trends' },
      ],
    },
  ],
  admin: [
    {
      title: 'Administration',
      items: [
        { icon: '🏠', label: 'Overview', href: '/dashboard/admin' },
        { icon: '👥', label: 'Users', href: '/dashboard/admin/users' },
        { icon: '🏆', label: 'Teams', href: '/dashboard/admin/teams' },
        { icon: '📋', label: 'Assessments', href: '/dashboard/admin/assessments' },
      ],
    },
    {
      title: 'System',
      items: [
        { icon: '🤖', label: 'Model Monitor', href: '/dashboard/admin/models' },
        { icon: '🔒', label: 'Data Governance', href: '/dashboard/admin/governance' },
        { icon: '📜', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  athlete: '#6366f1',
  coach: '#06b6d4',
  psychologist: '#8b5cf6',
  fitness_coach: '#10b981',
  team_manager: '#f59e0b',
  selector: '#ec4899',
  admin: '#ef4444',
};

const ROLE_LABELS: Record<UserRole, string> = {
  athlete: 'Athlete',
  coach: 'Mental Conditioning Coach',
  psychologist: 'Sports Psychologist',
  fitness_coach: 'Fitness Coach',
  team_manager: 'Team Manager',
  selector: 'Selector',
  admin: 'Administrator',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>('athlete');
  const [userName, setUserName] = useState('Demo User');

  useEffect(() => {
    const storedRole = localStorage.getItem('athlon_demo_role') as UserRole;
    const storedUser = localStorage.getItem('athlon_demo_user');
    if (storedRole) setRole(storedRole);
    if (storedUser) {
      try { setUserName(JSON.parse(storedUser).full_name); } catch {}
    }
  }, []);

  const sections = NAV_CONFIG[role] || NAV_CONFIG.athlete;
  const roleColor = ROLE_COLORS[role];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ATHLON AI
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Mental Fitness
            </div>
          </div>
        </div>
      </div>

      {/* User Badge */}
      <div style={{ padding: '12px 16px', margin: '12px', background: `rgba(${hexToRgb(roleColor)}, 0.1)`, border: `1px solid rgba(${hexToRgb(roleColor)}, 0.2)`, borderRadius: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: roleColor, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {ROLE_LABELS[role]}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {userName}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="nav-section-title">{section.title}</div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard/' + role && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ background: item.badgeColor || '#6366f1', color: 'white', borderRadius: '99px', padding: '1px 7px', fontSize: '10px', fontWeight: '700', minWidth: '18px', textAlign: 'center' }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom: Switch Role + Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--glass-border)', flexShrink: 0 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="nav-item" style={{ color: 'var(--color-danger)', fontSize: '13px' }}>
            <span>🚪</span>
            <span>Sign Out</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99,102,241';
}
