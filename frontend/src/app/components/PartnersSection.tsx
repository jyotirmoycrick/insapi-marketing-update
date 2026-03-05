import industriesImageDesktop from '@/assets/home/desktop-partners.svg';
import industriesImageMobile from '@/assets/home/partners-mobile.svg';

export function PartnersSection() {
  return (
    <section className="bg-[#E5E5E5]">
      <div className="hidden md:block">
        <img src={industriesImageDesktop} alt="Industries We Serve" className="w-full block" />
      </div>
      <div className="block md:hidden">
        <img src={industriesImageMobile} alt="Industries We Serve" className="w-full block" />
      </div>
    </section>
  );
}