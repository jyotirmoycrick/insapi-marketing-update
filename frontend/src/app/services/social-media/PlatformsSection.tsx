import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { EditableSection } from '@/components/EditableSection';
import platformsImage from '@/assets/services/social-media/social-media-002-platforms.png';

export function PlatformsSection() {
  const [platformsImageSrc, setPlatformsimageSrc] = useState(platformsImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('social-media');
        
        const platformsImageSaved = content.find((c: any) => c.section === 'platforms-section' && c.key === 'image');
        if (platformsImageSaved?.value) setPlatformsimageSrc(platformsImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

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
        <EditableImage
          src={platformsImageSrc}
          alt="Platforms We Work With"
          className="w-full h-auto block"
          imageKey="image"
          page="social-media"
          section="platforms-section"
          onImageChange={setPlatformsimageSrc}
        />
      </section>
    </EditableSection>
  );
}
