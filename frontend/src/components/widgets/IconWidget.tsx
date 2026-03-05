import React, { CSSProperties } from 'react';

interface IconWidgetProps {
  content: {
    icon: string;
    link?: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function IconWidget({ content, styles, settings, isPreview }: IconWidgetProps) {
  const iconStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...styles,
  };

  // For now, using emoji/text as placeholder
  // In production, integrate with icon library like FontAwesome or Lucide
  const iconContent = (
    <div style={iconStyles} className="widget-icon">
      {content.icon || '★'}
    </div>
  );

  if (content.link) {
    return (
      <a href={content.link} style={{ textDecoration: 'none' }}>
        {iconContent}
      </a>
    );
  }

  return iconContent;
}
