import React, { CSSProperties } from 'react';

interface ServiceCardWidgetProps {
  content: {
    icon: string;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function ServiceCardWidget({ content, styles, settings, isPreview }: ServiceCardWidgetProps) {
  const cardStyles: CSSProperties = {
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    ...styles,
  };

  return (
    <div style={cardStyles} className="widget-service-card">
      <div className="text-4xl mb-4">{content.icon || '💼'}</div>
      <h3 className="text-2xl font-bold mb-3 text-[#1E3A5F]">
        {content.title || 'Service Name'}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {content.description || 'Service description goes here'}
      </p>
      {content.link && (
        <a 
          href={content.link}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          {content.linkText || 'Learn More'}
          <span className="ml-1">→</span>
        </a>
      )}
    </div>
  );
}
