import React, { CSSProperties, useState } from 'react';

interface ImageWidgetProps {
  content: {
    src: string;
    alt: string;
    link?: string;
    lightbox?: boolean;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function ImageWidget({ content, styles, settings, isPreview }: ImageWidgetProps) {
  const [showLightbox, setShowLightbox] = useState(false);

  const imageStyles: CSSProperties = {
    ...styles,
    display: 'block',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (content.lightbox) {
      e.preventDefault();
      setShowLightbox(true);
    }
  };

  const imageElement = (
    <img 
      src={content.src || '/placeholder-image.png'}
      alt={content.alt || 'Image'}
      style={imageStyles}
      className="widget-image"
      onClick={handleClick}
      loading="lazy"
    />
  );

  const wrappedImage = content.link ? (
    <a href={content.link} style={{ display: 'block' }}>
      {imageElement}
    </a>
  ) : (
    imageElement
  );

  return (
    <>
      {wrappedImage}
      
      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setShowLightbox(false)}
          >
            ×
          </button>
          <img 
            src={content.src}
            alt={content.alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
