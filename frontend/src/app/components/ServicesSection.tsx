import { memo } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

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
      className="cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <OptimizedImage
        src={src}
        alt={`${alt} - InsAPI Marketing Service`}
        width={400}
        height={300}
        priority={isAboveFold}
        className="w-full h-auto object-contain"
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

          {services.map((service, index) => {

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
                index={index}
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
