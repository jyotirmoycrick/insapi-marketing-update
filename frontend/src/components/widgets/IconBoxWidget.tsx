import React, { CSSProperties } from 'react';

interface IconBoxWidgetProps {
  content: {
    icon: string;
    title: string;
    description: string;
    link?: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function IconBoxWidget({ content, styles, settings, isPreview }: IconBoxWidgetProps) {
  const boxStyles: CSSProperties = {
    ...styles,
  };

  const iconStyles: CSSProperties = {
    fontSize: '48px',
    marginBottom: '16px',
  };

  const titleStyles: CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '12px',
  };

  const descStyles: CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.6',
  };

  const boxContent = (
    <div style={boxStyles} className="widget-icon-box">
      <div style={iconStyles} className="icon-box-icon">
        {content.icon || '★'}
      </div>
      <h3 style={titleStyles} className="icon-box-title">
        {content.title || 'Feature Title'}
      </h3>
      <p style={descStyles} className="icon-box-description">
        {content.description || 'Feature description goes here'}
      </p>
    </div>
  );

  if (content.link) {
    return (
      <a href={content.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {boxContent}
      </a>
    );
  }

  return boxContent;
}
