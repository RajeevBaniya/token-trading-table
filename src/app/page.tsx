'use client';

import { TokenTable } from '@/components/token-table/TokenTable';
import { useTokenBootstrap } from '@/hooks/useTokenBootstrap';

function Home() {
  useTokenBootstrap();

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <TokenTable />
    </main>
  );
}

export default Home;
