import React, { CSSProperties } from 'react';

interface TestimonialWidgetProps {
  content: {
    quote: string;
    author: string;
    position: string;
    avatar: string;
    rating: number;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function TestimonialWidget({ content, styles, settings, isPreview }: TestimonialWidgetProps) {
  const containerStyles: CSSProperties = {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    ...styles,
  };

  return (
    <div style={containerStyles} className="widget-testimonial">
      {/* Rating Stars */}
      {content.rating > 0 && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < content.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <div className="mb-6">
        <svg className="w-10 h-10 text-gray-300 mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700 text-lg leading-relaxed italic">
          {content.quote || 'Add your testimonial quote here'}
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {content.avatar && (
          <img
            src={content.avatar}
            alt={content.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-bold text-gray-900">{content.author || 'John Doe'}</div>
          <div className="text-sm text-gray-600">{content.position || 'CEO, Company'}</div>
        </div>
      </div>
    </div>
  );
}
