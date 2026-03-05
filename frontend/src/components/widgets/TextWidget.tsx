import React, { CSSProperties } from 'react';

interface TextWidgetProps {
  content: {
    html: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function TextWidget({ content, styles, settings, isPreview }: TextWidgetProps) {
  const textStyles: CSSProperties = {
    ...styles,
  };

  return (
    <div 
      className="widget-text"
      style={textStyles}
      dangerouslySetInnerHTML={{ __html: content.html || '<p>Your text content goes here...</p>' }}
    />
  );
}
