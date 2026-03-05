import React, { useState, CSSProperties } from 'react';

interface TabsWidgetProps {
  content: {
    tabs: Array<{
      title: string;
      content: string;
    }>;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function TabsWidget({ content, styles, settings, isPreview }: TabsWidgetProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = content.tabs || [];

  if (tabs.length === 0) {
    return <div className="p-4 text-center text-gray-400">No tabs added</div>;
  }

  const containerStyles: CSSProperties = {
    ...styles,
  };

  return (
    <div style={containerStyles} className="widget-tabs">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 gap-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === index
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-white">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={activeTab === index ? 'block' : 'hidden'}
            dangerouslySetInnerHTML={{ __html: tab.content }}
          />
        ))}
      </div>
    </div>
  );
}
