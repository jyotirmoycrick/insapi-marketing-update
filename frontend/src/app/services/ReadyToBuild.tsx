import readyToBuildImage from '@/assets/shared/shared-001-branding-desk.png';

export function ReadyToBuild() {
  return (
    <section className="bg-gradient-to-r from-[#2E7D32] to-[#66BB6A] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready To Build A Strong Brand?
          </h2>
          <p className="text-white text-base md:text-lg mb-8 max-w-2xl mx-auto">
            If people don't trust your brand, they won't choose you.
          </p>
          <button className="bg-[#1E3A8A] hover:bg-[#2B5AA0] text-white font-bold py-4 px-8 rounded-lg text-sm md:text-base transition-colors">
            BOOK A FREE BRANDING & PR CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
}