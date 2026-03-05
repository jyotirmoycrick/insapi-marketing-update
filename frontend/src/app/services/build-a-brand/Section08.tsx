import sectionImage from '@/assets/services/build-a-brand/section-08.png';

export function Section08() {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white">
      <img src={sectionImage} alt="Build a Brand Section" className="w-full block" />
      
      {/* Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pt-40">
        <button
          onClick={handleButtonClick}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-2"
        >
          BOOK A FREE BRANDING & PR CONSULTATION
          <span className="text-lg">→</span>
        </button>
      </div>
    </section>
  );
}
