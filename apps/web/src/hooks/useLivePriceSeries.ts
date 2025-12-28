import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface PricePoint {
  readonly time: number;
  readonly price: number;
  readonly direction: 'up' | 'down' | 'neutral';
}

interface LivePriceSeriesResult {
  readonly series: readonly PricePoint[];
  readonly currentPrice: number;
  readonly previousPrice: number;
  readonly isUp: boolean;
}

const MAX_POINTS = 100;
const INITIAL_POINTS = 50;

function generateInitialHistory(basePrice: number): readonly PricePoint[] {
  const now = Date.now();
  
  interface AccumulatorState {
    readonly points: readonly PricePoint[];
    readonly currentPrice: number;
  }
  
  const initialState: AccumulatorState = {
    points: [],
    currentPrice: basePrice * 0.8,
  };
  
  const indices = Array.from({ length: INITIAL_POINTS }, (_, i) => i);
  
  const result = indices.reduce<AccumulatorState>((acc, i) => {
    const timeOffset = (INITIAL_POINTS - i) * 2000;
    const deterministicChange = ((i % 7) - 3) * 0.01;
    const changePercent = deterministicChange;
    const prevPrice = acc.currentPrice;
    let newPrice = acc.currentPrice * (1 + changePercent);
    
    if (newPrice <= 0) {
      newPrice = prevPrice * 0.95;
    }
    
    const direction: 'up' | 'down' | 'neutral' = 
      newPrice > prevPrice ? 'up' : 
      newPrice < prevPrice ? 'down' : 'neutral';
    
    const newPoint: PricePoint = {
      time: now - timeOffset,
      price: newPrice,
      direction,
    };
    
    return {
      points: [...acc.points, newPoint],
      currentPrice: newPrice,
    };
  }, initialState);
  
  const lastPoint = result.points[result.points.length - 1];
  
  if (lastPoint) {
    const finalPoint: PricePoint = {
      time: now,
      price: basePrice,
      direction: basePrice >= lastPoint.price ? 'up' : 'down',
    };
    return [...result.points, finalPoint];
  }
  
  return result.points;
}

function appendPoint(
  series: readonly PricePoint[],
  newPoint: PricePoint
): readonly PricePoint[] {
  const newSeries = [...series, newPoint];
  
  if (newSeries.length > MAX_POINTS) {
    return newSeries.slice(newSeries.length - MAX_POINTS);
  }
  
  return newSeries;
}

function useLivePriceSeries(tokenId: string | null): LivePriceSeriesResult {
  const [series, setSeries] = useState<readonly PricePoint[]>([]);
  const previousPriceRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  const currentPrice = useSelector((state: RootState) => {
    if (!tokenId) {
      return 0;
    }
    const token = state.token.tokens[tokenId];
    return token?.price ?? 0;
  });

  useEffect(() => {
    if (!tokenId || currentPrice === 0) {
      setSeries([]);
      previousPriceRef.current = 0;
      isInitializedRef.current = false;
      return;
    }

    if (!isInitializedRef.current) {
      const initialSeries = generateInitialHistory(currentPrice);
      setSeries(initialSeries);
      previousPriceRef.current = currentPrice;
      isInitializedRef.current = true;
      return;
    }

    if (previousPriceRef.current !== currentPrice) {
      const direction: 'up' | 'down' | 'neutral' = 
        currentPrice > previousPriceRef.current ? 'up' :
        currentPrice < previousPriceRef.current ? 'down' : 'neutral';
      
      const newPoint: PricePoint = {
        time: Date.now(),
        price: currentPrice,
        direction,
      };

      setSeries((prevSeries) => appendPoint(prevSeries, newPoint));
      previousPriceRef.current = currentPrice;
    }
  }, [tokenId, currentPrice]);

  const lastTwoPoints = series.slice(-2);
  const previousPrice = lastTwoPoints.length >= 2 
    ? lastTwoPoints[0].price 
    : currentPrice;
  const isUp = currentPrice >= previousPrice;

  return {
    series,
    currentPrice,
    previousPrice,
    isUp,
  };
}

export { useLivePriceSeries };
export type { PricePoint, LivePriceSeriesResult };
