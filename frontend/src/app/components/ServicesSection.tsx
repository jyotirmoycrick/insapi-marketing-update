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

/* -------------------- Image Card -------------------- */

const LazyServiceImage = memo(
  ({
    src,
    alt,
    onClick,
    index
  }: {
    src: string;
    alt: string;
    onClick?: () => void;
    index: number;
  }) => {
    const isAboveFold = index < 3;

    return (
      <div
        onClick={onClick}
        className="cursor-pointer w-full h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <OptimizedImage
          src={src}
          alt={`${alt} - InsAPI Marketing Service`}
          width={1000}
          height={750}
          priority={isAboveFold}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }
);

/* -------------------- Services Section -------------------- */

export const ServicesSection = memo(function ServicesSection({
  onCardClick
}: ServicesSectionProps) {
  return (
    <section
      className="bg-[#E8E8E8] py-16 md:py-24"
      data-testid="services-section"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Title */}

        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 md:mb-16">
          Our Services
        </h2>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

  {services.map((service, index) => {

    const imagePath =
      serviceImages[
        `../../assets/home/services/${service.id}.webp`
      ]?.default;

    if (!imagePath) return null;

    return (
      <div
        key={service.id}
        className="w-full h-[320px] md:h-[420px] lg:h-[460px]"
      >
        <LazyServiceImage
          src={imagePath}
          alt={service.id}
          index={index}
          onClick={() => onCardClick?.()}
        />
      </div>
    );
  })}

</div>
      </div>
    </section>
  );
});
