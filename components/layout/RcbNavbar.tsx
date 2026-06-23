'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserRole } from '@/lib/supabase';
import { ShoppingBag, Bell, LogOut } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  athlete: [
    { label: 'HOME', href: '/dashboard/athlete' },
    { label: 'ASSESSMENT', href: '/dashboard/athlete/assessment' },
    { label: 'JOURNAL', href: '/dashboard/athlete/journal' },
    { label: 'COGNITIVE LAB', href: '/dashboard/athlete/cognitive-lab' },
    { label: 'AI ASSISTANT', href: '/dashboard/athlete/ai-assistant' },
  ],
  coach: [
    { label: 'HOME', href: '/dashboard/coach' },
    { label: 'SQUAD', href: '/dashboard/coach/team-readiness' },
    { label: 'PLAYER STATS', href: '/dashboard/coach/stats' },
    { label: 'ASSESSMENT', href: '/dashboard/athlete/assessment' },
    { label: 'JOURNAL', href: '/dashboard/athlete/journal' },
    { label: 'COGNITIVE LAB', href: '/dashboard/athlete/cognitive-lab' },
    { label: 'BURNOUT', href: '/dashboard/coach/burnout' },
    { label: 'ANALYTICS', href: '/dashboard/coach/performance' },
    { label: 'ALERTS', href: '/dashboard/coach/alerts' },
  ],
  psychologist: [
    { label: 'HOME', href: '/dashboard/psychologist' },
    { label: 'PROFILES', href: '/dashboard/psychologist/profiles' },
    { label: 'CRISIS ALERTS', href: '/dashboard/psychologist/crisis' },
    { label: 'ANALYSIS', href: '/dashboard/psychologist/assessments' },
  ],
  fitness_coach: [
    { label: 'HOME', href: '/dashboard/fitness_coach' },
    { label: 'WORKLOAD', href: '/dashboard/fitness_coach/workload' },
    { label: 'INJURY RISK', href: '/dashboard/fitness_coach/injury-risk' },
  ],
  team_manager: [
    { label: 'HOME', href: '/dashboard/team_manager' },
    { label: 'SQUAD STATUS', href: '/dashboard/team_manager/squad' },
    { label: 'REPORTS', href: '/dashboard/team_manager/reports' },
  ],
  selector: [
    { label: 'HOME', href: '/dashboard/selector' },
    { label: 'PERFORMANCE', href: '/dashboard/selector/performance' },
    { label: 'TRENDS', href: '/dashboard/selector/trends' },
  ],
  admin: [
    { label: 'HOME', href: '/dashboard/admin' },
    { label: 'USERS', href: '/dashboard/admin/users' },
    { label: 'TEAMS', href: '/dashboard/admin/teams' },
    { label: 'SYSTEM', href: '/dashboard/admin/models' },
  ],
};

export default function RcbNavbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>('athlete');

  useEffect(() => {
    const storedRole = localStorage.getItem('athlon_demo_role') as UserRole;
    if (storedRole) setRole(storedRole);
  }, []);

  const items = NAV_CONFIG[role] || NAV_CONFIG.athlete;

  return (
    <nav className="rcb-navbar">
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {/* Logo Area */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginRight: '32px', height: '100%' }}>
            <div style={{ position: 'relative', width: '50px', height: '60px' }}>
               <Image src="/images/rcb-logo.png" alt="RCB Logo" fill sizes="50px" style={{ objectFit: 'contain' }} />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="rcb-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <span style={{ color: 'white', fontFamily: 'var(--font-bebas-neue)', fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.05em', borderRight: '2px solid rgba(255,255,255,0.15)', paddingRight: '32px' }}>#PLAYBOLD</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard/' + role && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rcb-nav-item ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'white' }}>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative', padding: '6px', borderRadius: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '14px', height: '14px', background: 'var(--color-accent)', borderRadius: '50%', fontSize: '9px', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-primary)' }}>
              2
            </span>
          </button>
          
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />
          
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', padding: '6px 12px', borderRadius: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            <LogOut size={16} />
            <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sign Out</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
