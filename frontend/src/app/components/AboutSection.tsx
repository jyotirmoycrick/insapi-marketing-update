import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import aboutImageDesktop from "@/assets/home/desk-about.png";
import aboutImageMobile from "@/assets/home/mobile-about.png";

export function AboutSection() {
  const [aboutImageDesktopSrc, setAboutimagedesktopSrc] = useState(aboutImageDesktop);
  const [aboutImageMobileSrc, setAboutimagemobileSrc] = useState(aboutImageMobile);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        
        const aboutImageDesktopSaved = content.find((c: any) => c.section === 'about-section' && c.key === 'image-0');
        if (aboutImageDesktopSaved?.value) setAboutimagedesktopSrc(aboutImageDesktopSaved.value);
        const aboutImageMobileSaved = content.find((c: any) => c.section === 'about-section' && c.key === 'image-1');
        if (aboutImageMobileSaved?.value) setAboutimagemobileSrc(aboutImageMobileSaved.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="relative bg-white" id='about-name-us-insapi'>
      
      {/* Desktop Image */}
      <div className="hidden md:block">
        <EditableImage
          src={aboutImageDesktopSrc}
          alt="About Us - InsAPI Marketing Team"
          className="w-full h-auto block"
          imageKey="image-0"
          page="home"
          section="about-section"
          onImageChange={setAboutimagedesktopSrc}
          width={1920}
          height={800}
          priority={true}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden">
        <EditableImage
          src={aboutImageMobileSrc}
          alt="About Us - InsAPI Marketing Team"
          className="w-full h-auto block"
          imageKey="image-1"
          page="home"
          section="about-section"
          onImageChange={setAboutimagemobileSrc}
          width={768}
          height={600}
          priority={true}
          loading="eager"
          fetchPriority="high"
        />
      </div>

    </section>
  );
}