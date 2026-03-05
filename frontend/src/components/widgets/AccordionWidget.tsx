import React, { useState, CSSProperties } from 'react';

interface AccordionWidgetProps {
  content: {
    items: Array<{
      title: string;
      content: string;
      open: boolean;
    }>;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function AccordionWidget({ content, styles, settings, isPreview }: AccordionWidgetProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    content.items?.map((item, index) => (item.open ? index : -1)).filter((i) => i !== -1) || []
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const items = content.items || [];

  if (items.length === 0) {
    return <div className="p-4 text-center text-gray-400">No accordion items</div>;
  }

  const containerStyles: CSSProperties = {
    ...styles,
  };

  return (
    <div style={containerStyles} className="widget-accordion space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
              <svg
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
