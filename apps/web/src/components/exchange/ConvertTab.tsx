'use client';

import { memo, useState, useCallback } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type CurrencyType = 'SOL' | 'BNB';

interface ConvertTabProps {
  readonly exchangeRate: number;
  readonly solPrice: number;
}

function ConvertTabComponent({ exchangeRate, solPrice }: ConvertTabProps): JSX.Element {
  const [convertingAmount, setConvertingAmount] = useState('0.0');
  const [gainingAmount, setGainingAmount] = useState('0.0');
  const [fromCurrency, setFromCurrency] = useState<CurrencyType>('SOL');
  const [toCurrency, setToCurrency] = useState<CurrencyType>('BNB');
  const [fromCurrencyOpen, setFromCurrencyOpen] = useState(false);
  const [toCurrencyOpen, setToCurrencyOpen] = useState(false);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency((prev) => (prev === 'SOL' ? 'BNB' : 'SOL'));
    setToCurrency((prev) => (prev === 'SOL' ? 'BNB' : 'SOL'));
    setConvertingAmount('0.0');
    setGainingAmount('0.0');
  }, []);

  const handleFromCurrencyChange = useCallback((currency: CurrencyType) => {
    if (currency === toCurrency) {
      setToCurrency(fromCurrency);
    }
    setFromCurrency(currency);
    setFromCurrencyOpen(false);
    setConvertingAmount('0.0');
    setGainingAmount('0.0');
  }, [fromCurrency, toCurrency]);

  const handleToCurrencyChange = useCallback((currency: CurrencyType) => {
    if (currency === fromCurrency) {
      setFromCurrency(toCurrency);
    }
    setToCurrency(currency);
    setToCurrencyOpen(false);
    setConvertingAmount('0.0');
    setGainingAmount('0.0');
  }, [fromCurrency, toCurrency]);

  const handleConvertingAmountChange = useCallback((value: string) => {
    setConvertingAmount(value);
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      const amount = Number(value);
      const converted = fromCurrency === 'SOL' 
        ? (amount * exchangeRate).toFixed(4)
        : (amount / exchangeRate).toFixed(4);
      setGainingAmount(converted);
    } else {
      setGainingAmount('0.0');
    }
  }, [fromCurrency, exchangeRate]);

  const handleGainingAmountChange = useCallback((value: string) => {
    setGainingAmount(value);
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      const amount = Number(value);
      const converted = toCurrency === 'BNB'
        ? (amount / exchangeRate).toFixed(4)
        : (amount * exchangeRate).toFixed(4);
      setConvertingAmount(converted);
    } else {
      setConvertingAmount('0.0');
    }
  }, [toCurrency, exchangeRate]);

  return (
    <div className="space-y-2">
      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
        Swap {fromCurrency} for {toCurrency}
      </p>

      <div className="p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Converting</span>
          <span className="text-xs text-gray-400">Balance: <span className="text-blue-400">0</span></span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={convertingAmount}
            onChange={(e) => handleConvertingAmountChange(e.target.value)}
            className="flex-1 bg-transparent text-lg sm:text-xl font-medium text-white outline-none min-w-0"
            placeholder="0.0"
          />
          <Popover open={fromCurrencyOpen} onOpenChange={setFromCurrencyOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 shrink-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  fromCurrency === 'SOL' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-yellow-500'
                }`}>
                  <span className="text-white text-[10px] font-bold">
                    {fromCurrency === 'SOL' ? '≡' : 'B'}
                  </span>
                </div>
                <span className="text-white font-medium">{fromCurrency}</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-1 bg-gray-800 border-gray-700">
              <button
                onClick={() => handleFromCurrencyChange('SOL')}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">≡</span>
                </div>
                <span className="text-white text-sm">SOL</span>
              </button>
              <button
                onClick={() => handleFromCurrencyChange('BNB')}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">B</span>
                </div>
                <span className="text-white text-sm">BNB</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
        {fromCurrency === 'SOL' && (
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              (${solPrice})
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center py-2">
        <button
          onClick={handleSwapCurrencies}
          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Gaining</span>
          <span className="text-xs text-gray-400">Balance: <span className="text-white">0</span></span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={gainingAmount}
            onChange={(e) => handleGainingAmountChange(e.target.value)}
            className="flex-1 bg-transparent text-xl font-medium text-white outline-none min-w-0"
            placeholder="0.0"
          />
          <Popover open={toCurrencyOpen} onOpenChange={setToCurrencyOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 shrink-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  toCurrency === 'BNB' ? 'bg-yellow-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  <span className="text-white text-[10px] font-bold">
                    {toCurrency === 'BNB' ? '⬡' : '≡'}
                  </span>
                </div>
                <span className="text-white font-medium">{toCurrency}</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-1 bg-gray-800 border-gray-700">
              <button
                onClick={() => handleToCurrencyChange('SOL')}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">≡</span>
                </div>
                <span className="text-white text-sm">SOL</span>
              </button>
              <button
                onClick={() => handleToCurrencyChange('BNB')}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">⬡</span>
                </div>
                <span className="text-white text-sm">BNB</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-500">
            1 {fromCurrency} ≈ {fromCurrency === 'SOL' ? exchangeRate.toFixed(4) : (1 / exchangeRate).toFixed(4)} {toCurrency}
          </span>
        </div>
      </div>

      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors mt-3">
        Confirm
      </button>
    </div>
  );
}

const ConvertTab = memo(ConvertTabComponent);

export { ConvertTab };

