import { memo } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

interface ServicesSectionProps {
  onCardClick?: () => void;
}

const services = [
  { id: "social-media", page: null },
  { id: "seo", page: null },
  { id: "google-ads", page: null },
  { id: "meta-ads", page: null },
  { id: "website", page: null },
  { id: "shopify", page: null },
  { id: "content", page: null },
  { id: "branding", page: null }
];

const serviceImages = import.meta.glob(
  "../../assets/home/services/*.webp",
  { eager: true }
) as Record<string, { default: string }>;

// Memoized service image component with performance optimization
const LazyServiceImage = memo(({ src, alt, onClick, index }: { 
  src: string; 
  alt: string; 
  onClick?: () => void;
  index: number;
}) => {
  // First 3 service cards are above the fold on desktop, load eagerly
  const isAboveFold = index < 3;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden rounded-lg"
    >
      <OptimizedImage
        src={src}
        alt={`${alt} - InsAPI Marketing Service`}
        width={1000}
        height={750}
        priority={isAboveFold}
        className="w-full h-full object-contain scale-[1.14] sm:scale-[1.12] lg:scale-[1.08]"
      />
    </div>
  );
});

export const ServicesSection = memo(function ServicesSection({ onCardClick }: ServicesSectionProps) {
  return (
    <section className="bg-[#E8E8E8] py-16 md:py-24" data-testid="services-section">
      <div className="max-w-[1900px] mx-auto px-1 sm:px-3 lg:px-6">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16">
          Our Services
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">

          {services.map((service, index) => {

            const imagePath =
              serviceImages[
                `../../assets/home/services/${service.id}.webp`
              ]?.default;

            if (!imagePath) return null;

            return (
              <div className="w-full aspect-[4/3] mx-auto">
                <LazyServiceImage
                  key={service.id}
                  src={imagePath}
                  alt={service.id}
                  index={index}
                  onClick={() => {
                    // All cards scroll to hero section
                    if (onCardClick) {
                      onCardClick();
                    }
                  }}
                />
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
});
