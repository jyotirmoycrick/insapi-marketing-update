import { useState, useEffect, memo } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { UniversalForm } from '@/components/UniversalForm';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';

// Lazy load images with caching
const heroImageDesktop = new URL('@/assets/home/hero-desktop.png', import.meta.url).href;
const heroImageMobile = new URL('@/assets/home/hero-mobile.png', import.meta.url).href;

export function HeroSection() {
  const [formHeading, setFormHeading] = useState('Talk To Our Expert');
  const [buttonText, setButtonText] = useState('GET STARTED NOW');
  const [isLoading, setIsLoading] = useState(true);
  const [heroDesktopSrc, setHeroDesktopSrc] = useState(heroImageDesktop);
  const [heroMobileSrc, setHeroMobileSrc] = useState(heroImageMobile);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        
        const heroHeading = content.find(
          (c: any) => c.section === 'hero' && c.key === 'formHeading'
        );
        const heroButton = content.find(
          (c: any) => c.section === 'hero' && c.key === 'buttonText'
        );
        const desktopImage = content.find(
          (c: any) => c.section === 'hero' && c.key === 'hero-desktop'
        );
        const mobileImage = content.find(
          (c: any) => c.section === 'hero' && c.key === 'hero-mobile'
        );
        
        if (heroHeading) setFormHeading(heroHeading.value);
        if (heroButton) setButtonText(heroButton.value);
        if (desktopImage && desktopImage.value) setHeroDesktopSrc(desktopImage.value);
        if (mobileImage && mobileImage.value) setHeroMobileSrc(mobileImage.value);
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
          <EditableImage
            src={heroDesktopSrc}
            alt="Build A Brand People Trust"
            className="w-full"
            imageKey="hero-desktop"
            page="home"
            section="hero"
            onImageChange={(newUrl) => setHeroDesktopSrc(newUrl)}
            priority={true}
            loading="eager"
          />
        </div>
        
        {/* Mobile Hero Image */}
        <div className="block md:hidden w-full m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <EditableImage
            src={heroMobileSrc}
            alt="Build A Brand People Trust"
            className="w-full"
            imageKey="hero-mobile"
            page="home"
            section="hero"
            onImageChange={(newUrl) => setHeroMobileSrc(newUrl)}
            priority={true}
            loading="eager"
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
