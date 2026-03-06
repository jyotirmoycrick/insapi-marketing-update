import { useState, useEffect } from 'react';
import { EditableSection } from './EditableSection';
import { EditableImage } from './EditableImage';
import { contentAPI } from '../services/api';
import { UniversalForm } from './UniversalForm';

interface UniversalHeroProps {
  page: string;
  imageSrc: string;
  imageAlt: string;
  defaultHeading?: string;
  defaultButtonText?: string;
}

export function UniversalHero({ 
  page, 
  imageSrc, 
  imageAlt,
  defaultHeading = 'Talk To Our Expert',
  defaultButtonText = 'GET STARTED NOW'
}: UniversalHeroProps) {
  // Initialize with defaults immediately - no loading state
  const [formHeading, setFormHeading] = useState(defaultHeading);
  const [buttonText, setButtonText] = useState(defaultButtonText);
  const [heroImage, setHeroImage] = useState(imageSrc);

  // Load CMS content in background - updates after initial render
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent(page);
        const heroHeading = content.find((c: any) => c.section === 'hero' && c.key === 'formHeading');
        const heroButton = content.find((c: any) => c.section === 'hero' && c.key === 'buttonText');
        const heroImageContent = content.find((c: any) => c.section === 'hero' && c.key === 'heroImage');
        
        // Only update if CMS has custom content
        if (heroHeading?.value) setFormHeading(heroHeading.value);
        if (heroButton?.value) setButtonText(heroButton.value);
        if (heroImageContent?.value) setHeroImage(heroImageContent.value);
      } catch (error) {
        console.log('Using default content for', page);
      }
    };
    loadContent();
  }, [page]);

  // No loading state - render immediately with defaults
  return (
    <EditableSection
      sectionId="hero"
      sectionName="Hero Section"
      page={page}
      fields={[
        { key: 'formHeading', label: 'Form Heading', type: 'text', value: formHeading },
        { key: 'buttonText', label: 'Button Text', type: 'text', value: buttonText }
      ]}
      onSave={(data) => {
        setFormHeading(data.formHeading);
        setButtonText(data.buttonText);
      }}
    >
      <section 
        className="relative w-full block m-0 p-0 leading-none"
        style={{ minHeight: '400px' }} // Reserve space to prevent layout shift
      >
        {/* Editable Hero Background Image with Performance Optimization */}
        <EditableImage
          src={heroImage}
          alt={imageAlt}
          imageKey="heroImage"
          page={page}
          section="hero"
          onImageChange={(newUrl) => setHeroImage(newUrl)}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto block m-0 p-0 leading-none"
          style={{ verticalAlign: 'bottom', display: 'block' }}
        />
        
        <div className="absolute top-0 right-0 w-full h-full flex items-start justify-end pt-2 sm:pt-3 md:pt-4 lg:pt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 pointer-events-none">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] pointer-events-auto mr-1 sm:mr-2 md:mr-3 lg:mr-4">
            <UniversalForm 
              formHeading={formHeading}
              buttonText={buttonText}
              pageId={page}
            />
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
