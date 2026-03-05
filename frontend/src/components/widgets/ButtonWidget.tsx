import React, { CSSProperties } from 'react';

interface ButtonWidgetProps {
  content: {
    text: string;
    link: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function ButtonWidget({ content, styles, settings, isPreview }: ButtonWidgetProps) {
  const buttonStyles: CSSProperties = {
    display: 'inline-block',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 0.3s ease',
    ...styles,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) {
      e.preventDefault();
    }
  };

  return (
    <a 
      href={content.link || '#'}
      style={buttonStyles}
      className="widget-button"
      onClick={handleClick}
    >
      {content.icon && content.iconPosition === 'left' && (
        <span className="button-icon-left mr-2">{content.icon}</span>
      )}
      {content.text || 'Click Here'}
      {content.icon && content.iconPosition === 'right' && (
        <span className="button-icon-right ml-2">{content.icon}</span>
      )}
    </a>
  );
}
