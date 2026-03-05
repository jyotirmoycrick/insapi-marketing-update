import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import heroImage from '@/assets/services/build-a-brand/hero-mobile.png';

export function BuildABrandHero() {
  return (
    <section className="relative w-full block m-0 p-0 leading-none">
      <div className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
        <img 
          src={heroImage} 
          alt="Build a Brand - Branding & Digital PR" 
          className="w-full h-auto block m-0 p-0 leading-none"
          style={{ verticalAlign: 'bottom', display: 'block' }}
        />
      </div>
      
      {/* Form Overlay - Mobile */}
      <div className="flex absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
        <div className="w-full max-w-[380px] pointer-events-auto">
          <UniversalFormMobile 
            formHeading="Talk To Our Expert"
            buttonText="GET STARTED NOW"
            pageId="build-a-brand"
          />
        </div>
      </div>
    </section>
  );
}
