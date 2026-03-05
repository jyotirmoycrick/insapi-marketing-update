import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';

export function MarqueeSection() {
  const [service1, setService1] = useState('SEO');
  const [service2, setService2] = useState('Google Ads');
  const [service3, setService3] = useState('Meta Ads');
  const [service4, setService4] = useState('Social Media Marketing');
  const [service5, setService5] = useState('Website Development');
  const [service6, setService6] = useState('Content Marketing');
  const [service7, setService7] = useState('Branding & Digital PR');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        const s1 = content.find((c: any) => c.section === 'marquee' && c.key === 'service1');
        const s2 = content.find((c: any) => c.section === 'marquee' && c.key === 'service2');
        const s3 = content.find((c: any) => c.section === 'marquee' && c.key === 'service3');
        const s4 = content.find((c: any) => c.section === 'marquee' && c.key === 'service4');
        const s5 = content.find((c: any) => c.section === 'marquee' && c.key === 'service5');
        const s6 = content.find((c: any) => c.section === 'marquee' && c.key === 'service6');
        const s7 = content.find((c: any) => c.section === 'marquee' && c.key === 'service7');
        
        if (s1) setService1(s1.value);
        if (s2) setService2(s2.value);
        if (s3) setService3(s3.value);
        if (s4) setService4(s4.value);
        if (s5) setService5(s5.value);
        if (s6) setService6(s6.value);
        if (s7) setService7(s7.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const services = [service1, service2, service3, service4, service5, service6, service7];

  if (isLoading) {
    return <section className="bg-gradient-to-r from-[#2952CC] to-[#E63946] py-4 md:py-6 h-20 flex items-center justify-center"><div className="text-white">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="marquee"
      sectionName="Marquee Section"
      page="home"
      fields={[
        { key: 'service1', label: 'Service 1', type: 'text', value: service1 },
        { key: 'service2', label: 'Service 2', type: 'text', value: service2 },
        { key: 'service3', label: 'Service 3', type: 'text', value: service3 },
        { key: 'service4', label: 'Service 4', type: 'text', value: service4 },
        { key: 'service5', label: 'Service 5', type: 'text', value: service5 },
        { key: 'service6', label: 'Service 6', type: 'text', value: service6 },
        { key: 'service7', label: 'Service 7', type: 'text', value: service7 }
      ]}
      onSave={(data) => {
        setService1(data.service1);
        setService2(data.service2);
        setService3(data.service3);
        setService4(data.service4);
        setService5(data.service5);
        setService6(data.service6);
        setService7(data.service7);
      }}
    >
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#dc2626] py-4 md:py-6 overflow-hidden">
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {services.map((service, index) => (
              <span key={`set1-${index}`} className="inline-flex items-center px-4 md:px-8">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
                  ✦ {service}
                </span>
              </span>
            ))}
            {services.map((service, index) => (
              <span key={`set2-${index}`} className="inline-flex items-center px-4 md:px-8">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
                  ✦ {service}
                </span>
              </span>
            ))}
            {services.map((service, index) => (
              <span key={`set3-${index}`} className="inline-flex items-center px-4 md:px-8">
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
                  ✦ {service}
                </span>
              </span>
            ))}
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .marquee-wrapper { display: flex; width: 100%; }
          .marquee-track { display: flex; animation: marquee-scroll 15s linear infinite; white-space: nowrap; }
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        `}} />
      </section>
    </EditableSection>
  );
}
