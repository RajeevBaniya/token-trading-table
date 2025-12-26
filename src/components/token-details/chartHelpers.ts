import type { PricePoint } from '@/hooks/useLivePriceSeries';

interface Segment {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly color: string;
}

interface XTick {
  readonly x: number;
  readonly label: string;
}

interface Domain {
  readonly min: number;
  readonly max: number;
}

function formatPrice(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  if (value >= 1) {
    return value.toFixed(2);
  }
  if (value >= 0.01) {
    return value.toFixed(4);
  }
  return value.toFixed(8);
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });
}

function calculateDomain(series: readonly PricePoint[]): Domain {
  if (series.length === 0) {
    return { min: 0, max: 1 };
  }
  
  const prices = series.map((p) => p.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  
  if (maxPrice === minPrice) {
    const padding = maxPrice * 0.1 || 0.001;
    return { min: minPrice - padding, max: maxPrice + padding };
  }
  
  const range = maxPrice - minPrice;
  const padding = range * 0.08;
  
  return {
    min: Math.max(0, minPrice - padding),
    max: maxPrice + padding,
  };
}

function buildStepSegments(
  series: readonly PricePoint[],
  chartWidth: number,
  chartHeight: number,
  domain: Domain,
  paddingLeft: number,
  paddingRight: number,
  paddingTop: number,
  paddingBottom: number
): readonly Segment[] {
  if (series.length < 2) {
    return [];
  }

  const drawWidth = chartWidth - paddingLeft - paddingRight;
  const drawHeight = chartHeight - paddingTop - paddingBottom;
  const { min, max } = domain;
  const priceRange = max - min;
  const maxX = chartWidth - paddingRight;

  const toX = (index: number): number => {
    if (series.length < 2) return paddingLeft;
    const ratio = index / (series.length - 1);
    const x = paddingLeft + ratio * drawWidth;
    return Math.min(x, maxX - 0.5);
  };

  const toY = (price: number): number => {
    return paddingTop + drawHeight * (1 - (price - min) / priceRange);
  };

  const indices = Array.from({ length: series.length - 1 }, (_, i) => i);

  return indices.reduce<readonly Segment[]>((acc, i) => {
    const curr = series[i];
    const next = series[i + 1];

    const x1 = toX(i);
    const x2 = toX(i + 1);
    const y1 = toY(curr.price);
    const y2 = toY(next.price);

    const color = next.price > curr.price ? '#22c55e' : '#ef4444';

    const horizontalSegment: Segment = {
      x1,
      y1,
      x2,
      y2: y1,
      color,
    };

    if (Math.abs(y1 - y2) > 0.5) {
      const verticalSegment: Segment = {
        x1: x2,
        y1,
        x2,
        y2,
        color,
      };
      return [...acc, horizontalSegment, verticalSegment];
    }

    return [...acc, horizontalSegment];
  }, []);
}

function generateYTicks(min: number, max: number, count: number): readonly number[] {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => min + step * i);
}

function generateXTicks(
  series: readonly PricePoint[],
  chartWidth: number,
  paddingLeft: number,
  paddingRight: number,
  count: number
): readonly XTick[] {
  if (series.length < 2) {
    return [];
  }

  const drawWidth = chartWidth - paddingLeft - paddingRight;
  const step = Math.max(1, Math.floor((series.length - 1) / (count - 1)));
  const indices = Array.from({ length: count }, (_, i) => i);

  return indices
    .map((i) => {
      const index = Math.min(i * step, series.length - 1);
      const point = series[index];
      if (point) {
        const x = paddingLeft + (index / (series.length - 1)) * drawWidth;
        return { x, label: formatTime(point.time) };
      }
      return null;
    })
    .filter((tick): tick is XTick => tick !== null);
}

export type { Segment, XTick, Domain };

export {
  formatPrice,
  formatTime,
  formatDate,
  calculateDomain,
  buildStepSegments,
  generateYTicks,
  generateXTicks,
};

