import React, { memo, useState, useEffect } from "react";

interface ServicesSectionProps {
  onNavigate?: (page: string) => void;
}

const services = [
  { id: "social-media", page: "social-media" },
  { id: "seo", page: null },
  { id: "google-ads", page: "google-ads" },
  { id: "meta-ads", page: "meta-ads" },
  { id: "website", page: null },
  { id: "shopify", page: "shopify" },
  { id: "content", page: "content-marketing" },
  { id: "branding", page: "build-a-brand" }
];

const serviceImages = import.meta.glob(
  "../../assets/home/services/*.webp",
  { eager: true }
) as Record<string, { default: string }>;

// Memoized lazy image component
const LazyServiceImage = memo(({ src, alt, onClick }: { 
  src: string; 
  alt: string; 
  onClick?: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

export const ServicesSection = memo(function ServicesSection({ onNavigate }: ServicesSectionProps) {
  return (
    <section className="bg-[#E8E8E8] py-16 md:py-24" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16">
          Our Services
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">

          {services.map((service) => {

            const imagePath =
              serviceImages[
                `../../assets/home/services/${service.id}.webp`
              ]?.default;

            if (!imagePath) return null;

            return (
              <LazyServiceImage
                key={service.id}
                src={imagePath}
                alt={service.id}
                onClick={() => {
                  if (service.page && onNavigate) {
                    onNavigate(service.page);
                  }
                }}
              />
            );
          })}

        </div>
      </div>
    </section>
  );
});
