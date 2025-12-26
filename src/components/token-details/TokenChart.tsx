'use client';

import { memo, useMemo, useState, useCallback, useRef, useEffect } from 'react';
import type { PricePoint } from '@/hooks/useLivePriceSeries';
import {
  formatPrice,
  formatTime,
  formatDate,
  calculateDomain,
  buildStepSegments,
  generateYTicks,
  generateXTicks,
} from './chartHelpers';

interface TokenChartProps {
  readonly series: readonly PricePoint[];
  readonly currentPrice: number;
  readonly isUp: boolean;
}

interface CrosshairState {
  readonly x: number;
  readonly y: number;
  readonly price: number;
  readonly time: number;
  readonly visible: boolean;
}

const PADDING_TOP = 15;
const PADDING_BOTTOM = 28;
const PADDING_LEFT = 8;
const PADDING_RIGHT = 58;
const CHART_GAP_RIGHT = 15;

function TokenChartComponent({ series, currentPrice, isUp }: TokenChartProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 1200, height: 380 });
  const [crosshair, setCrosshair] = useState<CrosshairState>({
    x: 0,
    y: 0,
    price: 0,
    time: 0,
    visible: false,
  });

  useEffect(() => {
    function updateDimensions(): void {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            width: Math.max(400, rect.width),
            height: Math.max(200, rect.height),
          });
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    const rafId = requestAnimationFrame(() => {
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        updateDimensions();
      }
    });
    
    window.addEventListener('resize', updateDimensions);
    
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 100);
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const WIDTH = dimensions.width;
  const HEIGHT = dimensions.height;

  const domain = useMemo(() => calculateDomain(series), [series]);

  const segments = useMemo(
    () => buildStepSegments(series, WIDTH, HEIGHT, domain, PADDING_LEFT, PADDING_RIGHT + CHART_GAP_RIGHT, PADDING_TOP, PADDING_BOTTOM),
    [series, domain, WIDTH, HEIGHT]
  );

  const yTicks = useMemo(() => generateYTicks(domain.min, domain.max, 7), [domain]);
  const xTicks = useMemo(() => generateXTicks(series, WIDTH, PADDING_LEFT, PADDING_RIGHT + CHART_GAP_RIGHT, 6), [series, WIDTH]);

  const drawHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const chartEndX = WIDTH - PADDING_RIGHT - CHART_GAP_RIGHT;
  const drawWidth = chartEndX - PADDING_LEFT;
  const priceRange = domain.max - domain.min;

  const currentPriceY = PADDING_TOP + drawHeight * (1 - (currentPrice - domain.min) / priceRange);
  const priceColor = isUp ? '#22c55e' : '#ef4444';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || series.length < 2) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;

    const svgX = mouseX * scaleX;
    const svgY = mouseY * scaleY;

    if (svgX < PADDING_LEFT || svgX > WIDTH - PADDING_RIGHT - CHART_GAP_RIGHT ||
        svgY < PADDING_TOP || svgY > HEIGHT - PADDING_BOTTOM) {
      setCrosshair((prev) => ({ ...prev, visible: false }));
      return;
    }

    const relativeX = (svgX - PADDING_LEFT) / drawWidth;
    const index = Math.round(relativeX * (series.length - 1));
    const clampedIndex = Math.max(0, Math.min(series.length - 1, index));
    const point = series[clampedIndex];

    if (point) {
      const effectiveDrawWidth = chartEndX - PADDING_LEFT;
      const pointX = PADDING_LEFT + (clampedIndex / (series.length - 1)) * effectiveDrawWidth;
      const pointY = PADDING_TOP + drawHeight * (1 - (point.price - domain.min) / priceRange);

      setCrosshair({
        x: pointX,
        y: pointY,
        price: point.price,
        time: point.time,
        visible: true,
      });
    }
  }, [series, domain, chartEndX, drawHeight, priceRange]);

  const handleMouseLeave = useCallback(() => {
    setCrosshair((prev) => ({ ...prev, visible: false }));
  }, []);

  if (series.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <div className="text-gray-600 text-sm">Waiting for data...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-black overflow-hidden relative cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {yTicks.map((tick, i) => {
          const y = PADDING_TOP + drawHeight * (1 - (tick - domain.min) / priceRange);
          return (
            <g key={i}>
              <line
                x1={PADDING_LEFT}
                y1={y}
                x2={WIDTH - PADDING_RIGHT - CHART_GAP_RIGHT}
                y2={y}
                stroke="#181818"
                strokeWidth={1}
              />
              <text
                x={WIDTH - PADDING_RIGHT + 4}
                y={y + 3}
                fill="#555"
                fontSize={9}
                fontFamily="monospace"
              >
                {formatPrice(tick)}
              </text>
            </g>
          );
        })}

        {xTicks.map((tick, i) => (
          <text
            key={i}
            x={tick.x}
            y={HEIGHT - 6}
            fill="#444"
            fontSize={9}
            textAnchor="middle"
            fontFamily="monospace"
          >
            {tick.label}
          </text>
        ))}

        <line
          x1={PADDING_LEFT}
          y1={currentPriceY}
          x2={WIDTH - PADDING_RIGHT - CHART_GAP_RIGHT}
          y2={currentPriceY}
          stroke="#3b82f6"
          strokeWidth={1}
          strokeDasharray="4 3"
          strokeOpacity={0.5}
        />

        {segments.map((seg, i) => (
          <line
            key={i}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={seg.color}
            strokeWidth={2}
            strokeLinecap="square"
          />
        ))}

        {crosshair.visible && (
          <>
            <line
              x1={crosshair.x}
              y1={PADDING_TOP}
              x2={crosshair.x}
              y2={HEIGHT - PADDING_BOTTOM}
              stroke="#666"
              strokeWidth={1}
              strokeDasharray="2 2"
            />
            <line
              x1={PADDING_LEFT}
              y1={crosshair.y}
              x2={WIDTH - PADDING_RIGHT - CHART_GAP_RIGHT}
              y2={crosshair.y}
              stroke="#666"
              strokeWidth={1}
              strokeDasharray="2 2"
            />
            <circle
              cx={crosshair.x}
              cy={crosshair.y}
              r={4}
              fill={crosshair.price >= currentPrice ? '#22c55e' : '#ef4444'}
              stroke="#fff"
              strokeWidth={1}
            />
          </>
        )}

        <rect
          x={WIDTH - PADDING_RIGHT + 1}
          y={currentPriceY - 7}
          width={55}
          height={14}
          rx={2}
          fill={priceColor}
        />
        <text
          x={WIDTH - PADDING_RIGHT + 4}
          y={currentPriceY + 3}
          fill="#000"
          fontSize={8}
          fontFamily="monospace"
          fontWeight="600"
        >
          {formatPrice(currentPrice)}
        </text>

        {crosshair.visible && (
          <>
            <rect
              x={WIDTH - PADDING_RIGHT + 1}
              y={crosshair.y - 7}
              width={55}
              height={14}
              rx={2}
              fill="#444"
            />
            <text
              x={WIDTH - PADDING_RIGHT + 4}
              y={crosshair.y + 3}
              fill="#fff"
              fontSize={8}
              fontFamily="monospace"
            >
              {formatPrice(crosshair.price)}
            </text>

            <rect
              x={crosshair.x - 30}
              y={HEIGHT - PADDING_BOTTOM + 2}
              width={60}
              height={14}
              rx={2}
              fill="#444"
            />
            <text
              x={crosshair.x}
              y={HEIGHT - PADDING_BOTTOM + 12}
              fill="#fff"
              fontSize={8}
              fontFamily="monospace"
              textAnchor="middle"
            >
              {formatTime(crosshair.time)}
            </text>
          </>
        )}
      </svg>

      {crosshair.visible && (
        <div
          className="absolute bg-gray-900 border border-gray-700 rounded px-2 py-1 pointer-events-none z-10"
          style={{
            left: `${(crosshair.x / WIDTH) * 100}%`,
            top: `${((crosshair.y - 50) / HEIGHT) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-xs text-gray-400">{formatDate(crosshair.time)} {formatTime(crosshair.time)}</div>
          <div className="text-sm font-medium text-white">{formatPrice(crosshair.price)}</div>
        </div>
      )}
    </div>
  );
}

const TokenChart = memo(TokenChartComponent);

export { TokenChart };
