import certificationsImageDesktop from '@/assets/home/home-004-certifications.png';
import certificationsImageMobile from '@/assets/home/home-009-certifications-mobile.png';

export function CertificationsSection() {
  return (
    <section className="bg-white">
      <div className="hidden md:block">
        <img src={certificationsImageDesktop} alt="Our Certifications" className="w-full block" />
      </div>
      <div className="block md:hidden">
        <img src={certificationsImageMobile} alt="Our Certifications" className="w-full block" />
      </div>
    </section>
  );
}