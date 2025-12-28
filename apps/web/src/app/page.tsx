'use client';

import { TokenTable } from '@/components/token-table/TokenTable';
import { ErrorBoundary } from '@/components/system/ErrorBoundary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { useTokenBootstrap } from '@/hooks/useTokenBootstrap';

function Home() {
  useTokenBootstrap();

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ErrorBoundary>
          <TokenTable />
        </ErrorBoundary>
      </main>
      <Footer />
      <MobileBottomNav />
      </div>
  );
}

export default Home;
