import whyChooseImage from '@/assets/services/social-media/social-media-004-why-choose-new.png';

export function WhyChooseSection() {
  return (
    <section className="relative w-full">
      <img 
        src={whyChooseImage} 
        alt="Why Choose Our Social Media Marketing Service" 
        className="w-full h-auto block"
      />
    </section>
  );
}
