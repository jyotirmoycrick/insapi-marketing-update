import { useState, useEffect, memo } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import { UniversalForm } from '@/components/UniversalForm';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';

// Lazy load images with caching
const heroImageDesktop = new URL('@/assets/home/hero-desktop.png', import.meta.url).href;
const heroImageMobile = new URL('@/assets/home/hero-mobile.png', import.meta.url).href;

// Preload images for faster subsequent loads
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

// Memoized image component with lazy loading
const LazyImage = memo(({ src, alt, className, style }: { 
  src: string; 
  alt: string; 
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check if image is cached in browser
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative ${className}`} style={style}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#2D5A87] animate-pulse" />
      )}
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={alt} 
          className={`w-full h-auto block m-0 p-0 leading-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ verticalAlign: 'bottom', display: 'block' }}
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  );
});

export function HeroSection() {
  const [formHeading, setFormHeading] = useState('Talk To Our Expert');
  const [buttonText, setButtonText] = useState('GET STARTED NOW');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload both images immediately
    preloadImage(heroImageDesktop);
    preloadImage(heroImageMobile);

    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        
        const heroHeading = content.find(
          (c: any) => c.section === 'hero' && c.key === 'formHeading'
        );
        const heroButton = content.find(
          (c: any) => c.section === 'hero' && c.key === 'buttonText'
        );
        
        if (heroHeading) setFormHeading(heroHeading.value);
        if (heroButton) setButtonText(heroButton.value);
      } catch (error) {
        // Silently use default content
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);

  if (isLoading) {
    return (
      <section className="relative w-full bg-gradient-to-br from-[#1E3A5F] to-[#2D5A87] min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <EditableSection
      sectionId="hero"
      sectionName="Hero Section"
      page="home"
      fields={[
        {
          key: 'formHeading',
          label: 'Form Heading',
          type: 'text',
          value: formHeading
        },
        {
          key: 'buttonText',
          label: 'Button Text',
          type: 'text',
          value: buttonText
        }
      ]}
      onSave={(data) => {
        setFormHeading(data.formHeading);
        setButtonText(data.buttonText);
      }}
    >
      <section className="relative w-full block m-0 p-0 leading-none" data-testid="hero-section">
        {/* Desktop Hero Image */}
        <div className="hidden md:block w-full m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <LazyImage 
            src={heroImageDesktop} 
            alt="Build A Brand People Trust" 
            className="w-full"
          />
        </div>
        
        {/* Mobile Hero Image */}
        <div className="block md:hidden w-full m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <LazyImage 
            src={heroImageMobile} 
            alt="Build A Brand People Trust" 
            className="w-full"
          />
        </div>
        
        {/* Form Overlay - Desktop */}
        <div className="hidden md:flex absolute top-0 right-0 w-full h-full items-start justify-end pt-2 sm:pt-3 md:pt-4 lg:pt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 pointer-events-none">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] pointer-events-auto mr-1 sm:mr-2 md:mr-3 lg:mr-4">
            <UniversalForm 
              formHeading={formHeading}
              buttonText={buttonText}
              pageId="home"
            />
          </div>
        </div>
        
        {/* Form Overlay - Mobile */}
        <div className="flex md:hidden absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
          <div className="w-full max-w-[380px] pointer-events-auto">
            <UniversalFormMobile 
              formHeading={formHeading}
              buttonText={buttonText}
              pageId="home"
            />
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
