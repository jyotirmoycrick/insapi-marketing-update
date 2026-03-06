import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import industriesImageDesktop from '@/assets/home/desktop-partners.svg';
import industriesImageMobile from '@/assets/home/partners-mobile.svg';

export function PartnersSection() {
  const [desktopSrc, setDesktopSrc] = useState(industriesImageDesktop);
  const [mobileSrc, setMobileSrc] = useState(industriesImageMobile);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const desktop = content.find((c: any) => c.section === 'partners' && c.key === 'desktop');
        const mobile = content.find((c: any) => c.section === 'partners' && c.key === 'mobile');
        if (desktop?.value) setDesktopSrc(desktop.value);
        if (mobile?.value) setMobileSrc(mobile.value);
      } catch (error) {
        // Use defaults
      }
    };
    loadImages();
  }, []);

  return (
    <section className="bg-[#E5E5E5]">
      <div className="hidden md:block">
        <EditableImage
          src={desktopSrc}
          alt="Industries We Serve"
          className="w-full block"
          imageKey="desktop"
          page="home"
          section="partners"
          onImageChange={setDesktopSrc}
        />
      </div>
      <div className="block md:hidden">
        <EditableImage
          src={mobileSrc}
          alt="Industries We Serve"
          className="w-full block"
          imageKey="mobile"
          page="home"
          section="partners"
          onImageChange={setMobileSrc}
        />
      </div>
    </section>
  );
}