'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Zap } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'alert' | 'info' | 'success';
  time: string;
  read: boolean;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: '1', title: '🚨 Crisis Alert', body: 'Arjun Kumar shows severe stress indicators', type: 'alert', time: '2m ago', read: false },
  { id: '2', title: '⚠️ Burnout Risk', body: 'Ravi Singh approaching high burnout threshold', type: 'alert', time: '15m ago', read: false },
  { id: '3', title: '✅ Assessment Complete', body: 'Pre-match assessment submitted by 18/22 players', type: 'success', time: '1h ago', read: true },
  { id: '4', title: '📊 Weekly Report Ready', body: "Team mental fitness report for this week", type: 'info', time: '3h ago', read: true },
];

export default function TopBar() {
  const [search, setSearch] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('Demo User');
  const [role, setRole] = useState('athlete');

  useEffect(() => {
    const storedUser = localStorage.getItem('athlon_demo_user');
    const storedRole = localStorage.getItem('athlon_demo_role');
    if (storedUser) {
      try { setUserName(JSON.parse(storedUser).full_name); } catch {}
    }
    if (storedRole) setRole(storedRole);
  }, []);

  const unreadCount = DEMO_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="topbar">
      {/* Left: Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <div style={{ position: 'relative', maxWidth: '320px', width: '100%' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '15px', height: '15px' }} />
          <input
            type="text"
            placeholder="Search athletes, reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input"
            style={{ paddingLeft: '36px', paddingTop: '8px', paddingBottom: '8px', fontSize: '13px' }}
          />
        </div>

        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '99px' }}>
          <div className="pulse-dot pulse-dot-success" style={{ width: '6px', height: '6px' }} />
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#34d399', letterSpacing: '0.04em' }}>LIVE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
          <Zap size={12} style={{ color: '#6366f1' }} />
          <span>AI Active</span>
        </div>
      </div>

      {/* Right: Notif + Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            id="topbar-notifications"
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', transition: 'all 0.2s ease' }}
          >
            <Bell size={16} color="var(--text-secondary)" />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: '#ef4444', borderRadius: '50%', fontSize: '9px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div style={{ position: 'absolute', top: '48px', right: 0, width: '360px', background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 100, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>Notifications</span>
                <span className="badge badge-danger">{unreadCount} new</span>
              </div>
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {DEMO_NOTIFICATIONS.map((n) => (
                  <div key={n.id} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: n.read ? 'transparent' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'background 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{n.title}</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '8px' }}>{n.time}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.body}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 20px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                <button style={{ fontSize: '12px', color: 'var(--color-primary-light)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            id="topbar-profile"
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px 6px 6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'white' }}>
              {userName.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: 1.2 }}>{userName.split(' ')[0]}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{role.replace('_', ' ')}</div>
            </div>
            <ChevronDown size={13} color="var(--text-muted)" />
          </button>

          {showProfile && (
            <div style={{ position: 'absolute', top: '48px', right: 0, width: '200px', background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 100, overflow: 'hidden' }}>
              {[
                { icon: '👤', label: 'My Profile' },
                { icon: '⚙️', label: 'Settings' },
                { icon: '🔒', label: 'Privacy' },
                { icon: '🚪', label: 'Sign Out' },
              ].map((item) => (
                <div key={item.label} style={{ padding: '12px 16px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: item.label === 'Sign Out' ? '#f87171' : 'var(--text-primary)', transition: 'background 0.2s', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
