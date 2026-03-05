import performanceImageDesktop from '@/assets/home/performace-desktop.svg';
import performanceImageMobile from '@/assets/home/performance-mobile.svg';

export function PerformanceSection() {
  return (
    <section className="bg-white">
      {/* Desktop */}
      <div className="hidden md:block">
        <img src={performanceImageDesktop} alt="Our Performance-Driven Process" className="w-full block" />
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <img src={performanceImageMobile} alt="Our Performance-Driven Process" className="w-full block" />
      </div>
    </section>
  );
}