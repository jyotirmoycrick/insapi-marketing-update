import React, { CSSProperties } from 'react';

interface PricingTableWidgetProps {
  content: {
    title: string;
    price: string;
    period: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    featured: boolean;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function PricingTableWidget({ content, styles, settings, isPreview }: PricingTableWidgetProps) {
  const containerStyles: CSSProperties = {
    padding: '40px 30px',
    backgroundColor: content.featured ? '#1E3A5F' : '#ffffff',
    borderRadius: '12px',
    boxShadow: content.featured
      ? '0 10px 30px rgba(0,0,0,0.2)'
      : '0 2px 10px rgba(0,0,0,0.1)',
    transform: content.featured ? 'scale(1.05)' : 'scale(1)',
    position: 'relative',
    ...styles,
  };

  const textColor = content.featured ? '#ffffff' : '#000000';

  return (
    <div style={containerStyles} className="widget-pricing-table">
      {content.featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
          POPULAR
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
        {content.title || 'Basic Plan'}
      </h3>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold" style={{ color: textColor }}>
          {content.price || '$29'}
        </span>
        <span className="text-lg ml-1" style={{ color: textColor, opacity: 0.7 }}>
          {content.period || '/month'}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {(content.features || []).map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: content.featured ? '#4ade80' : '#22c55e' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span style={{ color: textColor }}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <a
        href={content.buttonLink || '#'}
        className="block w-full text-center py-3 rounded-lg font-semibold transition-all"
        style={{
          backgroundColor: content.featured ? '#FFCE00' : '#1E3A5F',
          color: content.featured ? '#000000' : '#ffffff',
        }}
        onClick={(e) => isPreview && e.preventDefault()}
      >
        {content.buttonText || 'Get Started'}
      </a>
    </div>
  );
}
