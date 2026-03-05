import React, { CSSProperties } from 'react';

interface SpacerWidgetProps {
  content: {
    height: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function SpacerWidget({ content, styles, settings, isPreview }: SpacerWidgetProps) {
  const spacerStyles: CSSProperties = {
    height: content.height || '50px',
    ...styles,
  };

  return <div style={spacerStyles} className="widget-spacer" />;
}
