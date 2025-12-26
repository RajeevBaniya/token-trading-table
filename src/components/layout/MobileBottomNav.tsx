'use client';

import { useState } from 'react';

function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('Pulse');

  const navItems = [
    { id: 'Trade', label: 'Trade', icon: '📊' },
    { id: 'Pulse', label: 'Pulse', icon: '⚡' },
    { id: 'Markets', label: 'Markets', icon: '📈' },
    { id: 'Portfolio', label: 'Portfolio', icon: '💼' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
              activeTab === item.id
                ? 'text-blue-400'
                : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

export { MobileBottomNav };
