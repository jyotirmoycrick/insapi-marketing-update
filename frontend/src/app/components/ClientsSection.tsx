import clientsImage from '@/assets/home/clients.svg';

export function ClientsSection() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Our Clients</h2>
        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Trusted by leading brands worldwide
        </p>
      </div>
      
      {/* Clients Image with Animation */}
      <div className="relative overflow-hidden">
        <div className="clients-scroll-wrapper">
          <div className="clients-scroll-track">
            {/* First set */}
            <img src={clientsImage} alt="Our Clients" className="clients-image" />
            {/* Second set for seamless loop */}
            <img src={clientsImage} alt="Our Clients" className="clients-image" />
            {/* Third set for extra smoothness */}
            <img src={clientsImage} alt="Our Clients" className="clients-image" />
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .clients-scroll-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
        }
        
        .clients-scroll-track {
          display: flex;
          animation: clients-scroll 30s linear infinite;
          white-space: nowrap;
        }
        
        .clients-image {
          display: block;
          height: auto;
          width: auto;
          max-width: none;
          flex-shrink: 0;
        }
        
        @keyframes clients-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @media (max-width: 768px) {
          .clients-scroll-track {
            animation: clients-scroll 20s linear infinite;
          }
        }
      `}} />
    </section>
  );
}
