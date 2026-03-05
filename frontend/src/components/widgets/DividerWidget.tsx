import React, { CSSProperties } from 'react';

interface DividerWidgetProps {
  content: {
    style?: 'solid' | 'dashed' | 'dotted';
    weight?: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function DividerWidget({ content, styles, settings, isPreview }: DividerWidgetProps) {
  const dividerStyles: CSSProperties = {
    borderTop: `${content.weight || '1px'} ${content.style || 'solid'} #ddd`,
    margin: '20px 0',
    ...styles,
  };

  return <hr style={dividerStyles} className="widget-divider" />;
}
