import React, { CSSProperties } from 'react';

interface StatsWidgetProps {
  content: {
    stats: Array<{
      number: string;
      suffix?: string;
      label: string;
    }>;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function StatsWidget({ content, styles, settings, isPreview }: StatsWidgetProps) {
  const containerStyles: CSSProperties = {
    display: 'flex',
    gap: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    ...styles,
  };

  const stats = content.stats || [];

  return (
    <div style={containerStyles} className="widget-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item text-center">
          <div className="stat-number text-4xl font-bold text-[#1E3A5F]">
            {stat.number}{stat.suffix || ''}
          </div>
          <div className="stat-label text-sm text-gray-600 mt-2">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
