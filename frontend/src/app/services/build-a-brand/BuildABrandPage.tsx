import { BuildABrandDesktopHero } from './BuildABrandDesktopHero';
import { DesktopAfterHero } from './DesktopAfterHero';
import { DesktopZigZagSections } from './DesktopZigZagSections';
import { DesktopWhoThisIsFor } from './DesktopWhoThisIsFor';
import { DesktopNextSection } from './DesktopNextSection';
import { DesktopAfterNextSection } from './DesktopAfterNextSection';
import { DesktopFAQSection } from './DesktopFAQSection';
import { BuildABrandMobilePage } from './BuildABrandMobilePage';
import { Footer } from '../../components/Footer';

export function BuildABrandPage() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-white m-0 p-0">
        <BuildABrandDesktopHero />
        <DesktopAfterHero />
        <DesktopZigZagSections />
        <DesktopWhoThisIsFor />
        <DesktopNextSection />
        <DesktopAfterNextSection />
        <DesktopFAQSection />
        <Footer />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <BuildABrandMobilePage />
      </div>
    </>
  );
}
