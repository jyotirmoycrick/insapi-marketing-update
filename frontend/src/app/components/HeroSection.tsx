import { useState, useEffect, memo } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { UniversalForm } from '@/components/UniversalForm';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';

// Default hero images - render immediately
const heroImageDesktop = new URL('@/assets/home/hero-desktop.png', import.meta.url).href;
const heroImageMobile = new URL('@/assets/home/hero-mobile.png', import.meta.url).href;

// Default content - render immediately
const DEFAULT_FORM_HEADING = 'Talk To Our Expert';
const DEFAULT_BUTTON_TEXT = 'GET STARTED NOW';

export function HeroSection() {
  // Initialize with default content immediately - no loading state
  const [formHeading, setFormHeading] = useState(DEFAULT_FORM_HEADING);
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
  const [heroDesktopSrc, setHeroDesktopSrc] = useState(heroImageDesktop);
  const [heroMobileSrc, setHeroMobileSrc] = useState(heroImageMobile);

  // Load CMS content in background - updates after initial render
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
        
        // Only update if CMS has custom content
        if (heroHeading?.value) setFormHeading(heroHeading.value);
        if (heroButton?.value) setButtonText(heroButton.value);
        if (desktopImage?.value) setHeroDesktopSrc(desktopImage.value);
        if (mobileImage?.value) setHeroMobileSrc(mobileImage.value);
      } catch (error) {
        // Silently keep default content
        console.log('Using default hero content');
      }
    };
    
    loadContent();
  }, []);

  // No loading state - render immediately with defaults

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
      {/* Reserve space to prevent layout shift - aspect ratio based on actual image dimensions */}
      <section 
        className="relative w-full block m-0 p-0 leading-none" 
        data-testid="hero-section"
        style={{ 
          minHeight: '400px', // Reserve minimum space
          aspectRatio: 'auto' // Let image determine final aspect ratio
        }}
      >
        {/* Desktop Hero Image - Highest Priority */}
        <div className="hidden md:block w-full m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <EditableImage
            src={heroDesktopSrc}
            alt="Build A Brand People Trust - InsAPI Marketing"
            className="w-full"
            imageKey="hero-desktop"
            page="home"
            section="hero"
            onImageChange={(newUrl) => setHeroDesktopSrc(newUrl)}
            priority={true}
            loading="eager"
            style={{ 
              display: 'block',
              width: '100%',
              height: 'auto',
              verticalAlign: 'bottom'
            }}
          />
        </div>
        
        {/* Mobile Hero Image - Highest Priority */}
        <div className="block md:hidden w-full m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <EditableImage
            src={heroMobileSrc}
            alt="Build A Brand People Trust - InsAPI Marketing"
            className="w-full"
            imageKey="hero-mobile"
            page="home"
            section="hero"
            onImageChange={(newUrl) => setHeroMobileSrc(newUrl)}
            priority={true}
            loading="eager"
            style={{ 
              display: 'block',
              width: '100%',
              height: 'auto',
              verticalAlign: 'bottom'
            }}
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
