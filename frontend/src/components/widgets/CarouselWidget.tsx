import React, { useState, useEffect, CSSProperties } from 'react';

interface CarouselWidgetProps {
  content: {
    slides: Array<{
      image: string;
      title?: string;
      description?: string;
      link?: string;
    }>;
    autoplay: boolean;
    interval: number;
    showDots: boolean;
    showArrows: boolean;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function CarouselWidget({ content, styles, settings, isPreview }: CarouselWidgetProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content.slides || [];

  useEffect(() => {
    if (content.autoplay && slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, content.interval || 5000);
      return () => clearInterval(timer);
    }
  }, [content.autoplay, content.interval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return <div className="p-8 text-center text-gray-400">No slides added</div>;
  }

  const containerStyles: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...styles,
  };

  return (
    <div style={containerStyles} className="widget-carousel">
      {/* Slides */}
      <div className="relative h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {(slide.title || slide.description) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  {slide.title && <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>}
                  {slide.description && <p className="text-lg">{slide.description}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {content.showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {content.showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
