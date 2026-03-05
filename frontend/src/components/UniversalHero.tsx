import { useState, useEffect } from 'react';
import { EditableSection } from './EditableSection';
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
  const [formHeading, setFormHeading] = useState(defaultHeading);
  const [buttonText, setButtonText] = useState(defaultButtonText);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent(page);
        const heroHeading = content.find((c: any) => c.section === 'hero' && c.key === 'formHeading');
        const heroButton = content.find((c: any) => c.section === 'hero' && c.key === 'buttonText');
        
        if (heroHeading) setFormHeading(heroHeading.value);
        if (heroButton) setButtonText(heroButton.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, [page]);

  if (isLoading) {
    return (
      <section className="relative w-full h-96 flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </section>
    );
  }

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
      <section className="relative w-full block m-0 p-0 leading-none">
        <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto block m-0 p-0 leading-none"
            style={{ verticalAlign: 'bottom', display: 'block' }}
          />
        </div>
        
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
