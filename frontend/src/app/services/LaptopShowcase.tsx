import laptopImage from '@/assets/services/shopify/shopify-001-laptop-showcase.png';

export function LaptopShowcase() {
  return (
    <section className="w-full block m-0 p-0 leading-none">
      <img 
        src={laptopImage} 
        alt="Our PR Services" 
        className="w-full h-auto block m-0 p-0 leading-none"
        style={{ verticalAlign: 'bottom', display: 'block' }}
      />
    </section>
  );
}