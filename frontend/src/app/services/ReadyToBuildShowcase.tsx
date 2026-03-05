import readyToBuildImage from '@/assets/shared/shared-003-ready-to-grow.png';

export function ReadyToBuildShowcase() {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full">
      {/* Background Image */}
      <img 
        src={readyToBuildImage} 
        alt="Ready to Build a Strong Brand" 
        className="w-full h-auto block"
      />
      
      {/* Button Overlay - Centered at bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16 lg:pb-20">
        <button 
          onClick={handleButtonClick}
          className="bg-[#4A5FD9] hover:bg-[#3A4FC9] text-white font-semibold px-8 py-3 rounded-lg text-base md:text-lg transition-colors shadow-lg"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
