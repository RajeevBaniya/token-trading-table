'use client';

import { memo, useState, useCallback } from 'react';

type ToolType =
  | 'crosshair'
  | 'trendLine'
  | 'horizontalLine'
  | 'verticalLine'
  | 'fibonacci'
  | 'measure'
  | 'text'
  | 'brush'
  | 'emoji'
  | 'magnet'
  | 'zoom';

interface ToolConfig {
  readonly id: ToolType;
  readonly icon: JSX.Element;
  readonly label: string;
}

const TOOLS: readonly ToolConfig[] = [
  {
    id: 'crosshair',
    label: 'Crosshair',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    id: 'trendLine',
    label: 'Trend Line',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20l16-16" />
      </svg>
    ),
  },
  {
    id: 'horizontalLine',
    label: 'Horizontal Line',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
      </svg>
    ),
  },
  {
    id: 'verticalLine',
    label: 'Vertical Line',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16" />
      </svg>
    ),
  },
  {
    id: 'fibonacci',
    label: 'Fibonacci',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'measure',
    label: 'Measure',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'text',
    label: 'Text',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 'brush',
    label: 'Brush',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 'emoji',
    label: 'Emoji',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'magnet',
    label: 'Magnet',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    id: 'zoom',
    label: 'Zoom',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
  },
];

function DrawingToolsSidebarComponent(): JSX.Element {
  const [activeTool, setActiveTool] = useState<ToolType>('crosshair');

  const handleToolSelect = useCallback((tool: ToolType) => {
    setActiveTool(tool);
  }, []);

  return (
    <div className="flex flex-row lg:flex-col bg-black border-r border-gray-800 py-2 px-1 lg:px-0 w-auto lg:w-10 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto">
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          className={`p-2 transition-colors ${
            activeTool === tool.id
              ? 'text-blue-400 bg-gray-800'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
          }`}
          onClick={() => handleToolSelect(tool.id)}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
}

const DrawingToolsSidebar = memo(DrawingToolsSidebarComponent);

export { DrawingToolsSidebar };

