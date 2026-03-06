import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import performanceImageDesktop from '@/assets/home/performace-desktop.svg';
import performanceImageMobile from '@/assets/home/performance-mobile.svg';

export function PerformanceSection() {
  const [desktopSrc, setDesktopSrc] = useState(performanceImageDesktop);
  const [mobileSrc, setMobileSrc] = useState(performanceImageMobile);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const desktop = content.find((c: any) => c.section === 'performance' && c.key === 'desktop');
        const mobile = content.find((c: any) => c.section === 'performance' && c.key === 'mobile');
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
      {/* Desktop */}
      <div className="hidden md:block">
        <EditableImage
          src={desktopSrc}
          alt="Our Performance-Driven Process"
          className="w-full block"
          imageKey="desktop"
          page="home"
          section="performance"
          onImageChange={setDesktopSrc}
        />
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <EditableImage
          src={mobileSrc}
          alt="Our Performance-Driven Process"
          className="w-full block"
          imageKey="mobile"
          page="home"
          section="performance"
          onImageChange={setMobileSrc}
        />
      </div>
    </section>
  );
}