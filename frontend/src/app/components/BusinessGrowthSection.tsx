import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import businessGrowthImageDesktop from '@/assets/home/desktop-business-grow.svg';
import businessGrowthImageMobile from '@/assets/home/mobile-business-grow.svg';

export function BusinessGrowthSection() {
  const [desktopSrc, setDesktopSrc] = useState(businessGrowthImageDesktop);
  const [mobileSrc, setMobileSrc] = useState(businessGrowthImageMobile);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const desktop = content.find((c: any) => c.section === 'business-growth' && c.key === 'desktop');
        const mobile = content.find((c: any) => c.section === 'business-growth' && c.key === 'mobile');
        if (desktop?.value) setDesktopSrc(desktop.value);
        if (mobile?.value) setMobileSrc(mobile.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="bg-white">
      <div className="hidden md:block">
        <EditableImage
          src={desktopSrc}
          alt="How Can We Help Your Business Grow"
          className="w-full block"
          imageKey="desktop"
          page="home"
          section="business-growth"
          onImageChange={setDesktopSrc}
        />
      </div>
      <div className="block md:hidden">
        <EditableImage
          src={mobileSrc}
          alt="How Can We Help Your Business Grow"
          className="w-full block"
          imageKey="mobile"
          page="home"
          section="business-growth"
          onImageChange={setMobileSrc}
        />
      </div>
    </section>
  );
}