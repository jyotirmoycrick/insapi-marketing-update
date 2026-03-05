import howWeWorkImage from '@/assets/services/build-a-brand/build-a-brand-003-how-we-work.png';

export function HowWeWorkShowcase() {
  return (
    <section className="w-full block m-0 p-0 leading-none">
      <img 
        src={howWeWorkImage} 
        alt="How We Work" 
        className="w-full h-auto block m-0 p-0 leading-none align-bottom"
      />
    </section>
  );
}
