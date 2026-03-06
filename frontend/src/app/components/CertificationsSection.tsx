import { useState, useEffect } from 'react';
import { EditableImage } from '@/components/EditableImage';
import { contentAPI } from '@/services/api';
import certificationsImageDesktop from '@/assets/home/home-004-certifications.png';
import certificationsImageMobile from '@/assets/home/home-009-certifications-mobile.png';

export function CertificationsSection() {
  const [desktopSrc, setDesktopSrc] = useState(certificationsImageDesktop);
  const [mobileSrc, setMobileSrc] = useState(certificationsImageMobile);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const desktop = content.find((c: any) => c.section === 'certifications' && c.key === 'desktop');
        const mobile = content.find((c: any) => c.section === 'certifications' && c.key === 'mobile');
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
          alt="Our Certifications"
          className="w-full block"
          imageKey="desktop"
          page="home"
          section="certifications"
          onImageChange={setDesktopSrc}
        />
      </div>
      <div className="block md:hidden">
        <EditableImage
          src={mobileSrc}
          alt="Our Certifications"
          className="w-full block"
          imageKey="mobile"
          page="home"
          section="certifications"
          onImageChange={setMobileSrc}
        />
      </div>
    </section>
  );
}