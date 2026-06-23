'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRoot() {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem('athlon_demo_role') || 'athlete';
    router.replace(`/dashboard/${role}`);
  }, [router]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)', fontSize: '14px' }}>
      Redirecting to your dashboard...
    </div>
  );
}
