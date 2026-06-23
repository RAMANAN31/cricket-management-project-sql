'use client';

import { Activity } from 'lucide-react';
import Image from 'next/image';

const MOCK_LEADERBOARD = {
  runs: [
    { rank: 1, name: 'V. Kohli', team: 'Royal Challengers Bengaluru', m: 10, avg: 63.28, value: 443 },
    { label: 'S. Yadav', team: 'Indians', m: 10, avg: 61.00, value: 427 },
    { label: 'S. Sudharsan', team: 'Titans', m: 8, avg: 52.12, value: 417 },
    { label: 'N. Pooran', team: 'Super Giants', m: 10, avg: 44.88, value: 404 },
    { label: 'M. Marsh', team: 'Super Giants', m: 9, avg: 42.00, value: 378 },
  ],
  average: [
    { rank: 1, label: 'T. David', team: 'Royal Challengers Bengaluru', m: 10, runs: 184, value: 92.00 },
    { label: 'J. Buttler', team: 'Titans', m: 8, runs: 356, value: 71.20 },
    { label: 'V. Kohli', team: 'Royal Challengers Bengaluru', m: 10, runs: 443, value: 63.28 },
    { label: 'S. Yadav', team: 'Indians', m: 10, runs: 427, value: 61.00 },
    { label: 'KL Rahul', team: 'Capitals', m: 8, runs: 364, value: 60.66 },
  ],
  wickets: [
    { rank: 1, label: 'J. Hazlewood', team: 'Royal Challengers Bengaluru', m: 10, econ: 8.44, value: 18 },
    { label: 'P. Krishna', team: 'Titans', m: 8, econ: 7.29, value: 16 },
    { label: 'N. Ahmad', team: 'Super Kings', m: 9, econ: 8.03, value: 14 },
    { label: 'H. Patel', team: 'Sunrisers', m: 8, econ: 9.03, value: 13 },
    { label: 'K. Pandya', team: 'Royal Challengers Bengaluru', m: 10, econ: 8.62, value: 13 },
  ],
  fifties: [
    { rank: 1, label: 'V. Kohli', team: 'Royal Challengers Bengaluru', m: 10, runs: 443, value: 6 },
    { label: 'S. Sudharsan', team: 'Titans', m: 8, runs: 417, value: 5 },
    { label: 'A. Markram', team: 'Super Giants', m: 10, runs: 335, value: 4 },
    { label: 'M. Marsh', team: 'Super Giants', m: 9, runs: 378, value: 4 },
    { label: 'N. Pooran', team: 'Super Giants', m: 10, runs: 404, value: 4 },
  ]
};

function LeaderboardCard({ title, data, valueLabel, subLabel1, subLabel2, dataKey }: { title: string, data: any[], valueLabel: string, subLabel1: string, subLabel2: string, dataKey: string }) {
  return (
    <div className="stat-card" style={{ padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)', padding: '0 24px', marginBottom: '24px' }}>
        {title}
      </h3>
      
      {/* Table Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 24px 12px 24px', borderBottom: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
        <div style={{ width: '30px' }}></div>
        <div style={{ flex: 1 }}>Player</div>
        <div style={{ width: '40px', textAlign: 'center' }}>{subLabel1}</div>
        <div style={{ width: '50px', textAlign: 'center' }}>{subLabel2}</div>
        <div style={{ width: '50px', textAlign: 'right' }}>{valueLabel}</div>
      </div>

      {/* Table Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((row, i) => {
          const isHighlight = row.team.includes('Royal Challengers');
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: i < data.length - 1 ? '1px solid var(--color-border)' : 'none', background: isHighlight ? 'var(--color-bg-card-hover)' : 'transparent', transition: 'background 0.2s' }}>
              <div style={{ width: '30px', fontSize: '14px', fontWeight: '700', color: i < 3 ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--color-primary)' }}>
                  {(row.label || row.name).charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{row.label || row.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{row.team}</div>
                </div>
              </div>
              <div style={{ width: '40px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {row.m}
              </div>
              <div style={{ width: '50px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {row[dataKey] || row.avg || row.econ || row.runs}
              </div>
              <div style={{ width: '50px', textAlign: 'right', fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {row.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PlayerStatsPage() {
  return (
    <div className="fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title" style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontSize: '48px', textShadow: '2px 2px 0px #e5e7eb' }}>PLAYER STATS</h1>
          <p className="page-subtitle" style={{ color: 'var(--text-secondary)' }}>Tournament leaderboards and player rankings</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary">
            <Activity size={15} /> Filter Stats
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', paddingBottom: '40px' }}>
        <LeaderboardCard title="Runs" data={MOCK_LEADERBOARD.runs} valueLabel="Runs" subLabel1="M" subLabel2="Avg" dataKey="avg" />
        <LeaderboardCard title="Batting Average" data={MOCK_LEADERBOARD.average} valueLabel="Avg" subLabel1="M" subLabel2="Runs" dataKey="runs" />
        <LeaderboardCard title="Wickets" data={MOCK_LEADERBOARD.wickets} valueLabel="W" subLabel1="M" subLabel2="Econ" dataKey="econ" />
        <LeaderboardCard title="Most Fifties" data={MOCK_LEADERBOARD.fifties} valueLabel="50s" subLabel1="M" subLabel2="Runs" dataKey="runs" />
      </div>
    </div>
  );
}
