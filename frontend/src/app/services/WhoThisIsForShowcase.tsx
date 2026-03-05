import whoThisIsForImage from '@/assets/services/build-a-brand/build-a-brand-002-who-this-is-for.png';

export function WhoThisIsForShowcase() {
  return (
    <section className="w-full block m-0 p-0 leading-none">
      <img 
        src={whoThisIsForImage} 
        alt="Who This Is For" 
        className="w-full h-auto block m-0 p-0 leading-none align-bottom"
      />
    </section>
  );
}
