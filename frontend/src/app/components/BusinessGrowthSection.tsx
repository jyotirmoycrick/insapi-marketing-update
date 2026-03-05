import businessGrowthImageDesktop from '@/assets/home/desktop-business-grow.svg';
import businessGrowthImageMobile from '@/assets/home/mobile-business-grow.svg';

export function BusinessGrowthSection() {
  return (
    <section className="bg-white">
      <div className="hidden md:block">
        <img src={businessGrowthImageDesktop} alt="How Can We Help Your Business Grow" className="w-full block" />
      </div>
      <div className="block md:hidden">
        <img src={businessGrowthImageMobile} alt="How Can We Help Your Business Grow" className="w-full block" />
      </div>
    </section>
  );
}