import aboutImageDesktop from "@/assets/home/desk-about.png";
import aboutImageMobile from "@/assets/home/mobile-about.png";

export function AboutSection() {
  return (
    <section className="relative bg-white">
      
      {/* Desktop Image */}
      <div className="hidden md:block">
        <img
          src={aboutImageDesktop}
          alt="About Us"
          className="w-full h-auto block"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden">
        <img
          src={aboutImageMobile}
          alt="About Us"
          className="w-full h-auto block"
        />
      </div>

    </section>
  );
}