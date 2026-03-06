import React from 'react';

interface TabControlProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabControl({ tabs, activeTab, onChange }: TabControlProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
