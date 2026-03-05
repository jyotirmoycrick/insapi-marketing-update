import React, { CSSProperties } from 'react';

interface HeadingWidgetProps {
  content: {
    text: string;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    link?: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function HeadingWidget({ content, styles, settings, isPreview }: HeadingWidgetProps) {
  const Tag = content.tag || 'h2';
  
  const headingStyles: CSSProperties = {
    ...styles,
    margin: styles.margin || '0',
  };

  const headingContent = (
    <Tag style={headingStyles} className="widget-heading">
      {content.text || 'Your Heading Text'}
    </Tag>
  );

  if (content.link) {
    return (
      <a 
        href={content.link} 
        style={{ textDecoration: 'none', color: 'inherit' }}
        className="heading-link"
      >
        {headingContent}
      </a>
    );
  }

  return headingContent;
}
