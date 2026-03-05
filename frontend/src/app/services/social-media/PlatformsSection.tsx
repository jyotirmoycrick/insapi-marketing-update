import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import platformsImage from '@/assets/services/social-media/social-media-002-platforms.png';

export function PlatformsSection() {
  const [heading, setHeading] = useState('Platforms We Work With');
  const [platforms, setPlatforms] = useState('Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        const h = content.find((c: any) => c.section === 'platforms' && c.key === 'heading');
        const p = content.find((c: any) => c.section === 'platforms' && c.key === 'platforms');
        
        if (h) setHeading(h.value);
        if (p) setPlatforms(p.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return <section className="relative w-full h-96 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="platforms"
      sectionName="Platforms We Work With"
      page="social-media"
      fields={[
        { key: 'heading', label: 'Heading', type: 'text', value: heading },
        { key: 'platforms', label: 'Platforms', type: 'text', value: platforms }
      ]}
      onSave={(data) => {
        setHeading(data.heading);
        setPlatforms(data.platforms);
      }}
    >
      <section className="relative w-full">
        <img 
          src={platformsImage} 
          alt="Platforms We Work With" 
          className="w-full h-auto block"
        />
        
        <div className="absolute top-1/2 right-[400px] transform -translate-y-1/2 w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] px-4 md:px-0">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {heading}
          </h2>
          
          <p className="text-gray-700 text-xs md:text-sm">
            {platforms}
          </p>
        </div>
      </section>
    </EditableSection>
  );
}
