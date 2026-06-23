import RcbNavbar from '@/components/layout/RcbNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <RcbNavbar />
      <main className="main-content fade-in">
        {children}
      </main>
    </div>
  );
}
