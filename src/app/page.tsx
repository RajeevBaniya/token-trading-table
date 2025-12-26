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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
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
