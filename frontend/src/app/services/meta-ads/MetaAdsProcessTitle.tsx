import { useState, useEffect } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';

export function MetaAdsProcessTitle() {
  const [title, setTitle] = useState('Our Meta Ads Process');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('meta-ads');
        const titleContent = content.find((c: any) => c.section === 'process-title' && c.key === 'title');
        if (titleContent) setTitle(titleContent.value);
      } catch (error) {
        console.log('Using default content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
    return <section className="bg-white py-12 md:py-16 h-32 flex items-center justify-center"><div className="text-gray-600">Loading...</div></section>;
  }

  return (
    <EditableSection
      sectionId="process-title"
      sectionName="Process Title"
      page="meta-ads"
      fields={[
        { key: 'title', label: 'Title', type: 'text', value: title }
      ]}
      onSave={(data) => setTitle(data.title)}
    >
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            {title}
          </h2>
        </div>
      </section>
    </EditableSection>
  );
}
