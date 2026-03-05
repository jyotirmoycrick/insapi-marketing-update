import whyBusinessesChooseImage from '@/assets/services/build-a-brand/build-a-brand-005-why-businesses-choose-new.png';

export function WhyBusinessesChooseShowcase() {
  return (
    <section className="w-full block m-0 p-0 leading-none">
      <img 
        src={whyBusinessesChooseImage} 
        alt="Why Businesses Choose" 
        className="w-full h-auto block m-0 p-0 leading-none align-bottom"
      />
    </section>
  );
}
