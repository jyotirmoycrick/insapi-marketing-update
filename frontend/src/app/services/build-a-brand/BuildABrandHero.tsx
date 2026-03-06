import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import heroImage from '@/assets/services/build-a-brand/hero-mobile.png';

export function BuildABrandHero() {
  const [heroImageSrc, setHeroimageSrc] = useState(heroImage);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('build-a-brand');
        
        const heroImageSaved = content.find((c: any) => c.section === 'build-a-brand-hero' && c.key === 'image');
        if (heroImageSaved?.value) setHeroimageSrc(heroImageSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative w-full block m-0 p-0 leading-none">
      <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
        <EditableImage
          src={heroImageSrc}
          alt="Build a Brand - Branding & Digital PR"
          className="w-full h-auto block m-0 p-0 leading-none"
          imageKey="image"
          page="build-a-brand"
          section="build-a-brand-hero"
          onImageChange={setHeroimageSrc}
        />
      </div>
      
      {/* Form Overlay - Mobile */}
      <div className="flex absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
        <div className="w-full max-w-[380px] pointer-events-auto">
          <UniversalFormMobile 
            formHeading="Talk To Our Expert"
            buttonText="GET STARTED NOW"
            pageId="build-a-brand"
          />
        </div>
      </div>
    </section>
  );
}
