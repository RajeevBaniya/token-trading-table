'use client';

import { memo } from 'react';

function BuyTabComponent(): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">⬡</span>
          </div>
          <span className="text-white font-medium">BNB</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Balance:</span>
          <span className="text-white text-sm">0 BNB</span>
        </div>
      </div>

      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Buying</span>
          <span className="text-xs text-gray-400">BNB Price: <span className="text-white">833.00</span></span>
        </div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <input
            type="text"
            defaultValue="0.0"
            className="flex-1 bg-transparent text-xl font-medium text-white outline-none min-w-0"
            placeholder="0.0"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black text-[10px] font-bold">⬡</span>
            </div>
            <span className="text-white font-medium">BNB</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-orange-400">Minimum: 20 USD</span>
          <span className="text-xs text-gray-500">≈ 0 USD</span>
        </div>
      </div>

      <div className="flex-1 min-h-[120px] flex items-center justify-center">
        <span className="text-gray-500 text-sm">powered by <span className="text-white font-semibold">Onramper</span></span>
      </div>

      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
        Buy
      </button>
    </div>
  );
}

const BuyTab = memo(BuyTabComponent);

export { BuyTab };

