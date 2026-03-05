import { ServiceHero } from './ServiceHero';
import { WhatWeHelp } from './WhatWeHelp';
import { DesignShowcase } from './DesignShowcase';
import { PRShowcase } from './PRShowcase';
import { StrengthShowcase } from './StrengthShowcase';
import { WhoThisIsForShowcase } from './WhoThisIsForShowcase';
import { HowWeWorkShowcase } from './HowWeWorkShowcase';
import { WhyBusinessesChooseShowcase } from './WhyBusinessesChooseShowcase';
import { ReadyToBuildShowcase } from './ReadyToBuildShowcase';
import { ServiceFAQShowcase } from './ServiceFAQShowcase';
import { Footer } from '../components/Footer';

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white m-0 p-0">
      <ServiceHero />
      <div className="-mt-1">
        <WhatWeHelp />
      </div>
      <DesignShowcase />
      <PRShowcase />
      <StrengthShowcase />
      <WhoThisIsForShowcase />
      <HowWeWorkShowcase />
      <WhyBusinessesChooseShowcase />
      <ReadyToBuildShowcase />
      <ServiceFAQShowcase />
      <Footer />
    </div>
  );
}