import { useState, useEffect, useRef } from 'react';
import { EditableSection } from '@/components/EditableSection';
import { contentAPI } from '@/services/api';
import { UniversalForm } from '@/components/UniversalForm';
import { UniversalFormMobile } from '@/components/UniversalFormMobile';
import { useAdmin } from '@/contexts/AdminContext';

// Default hero images - WebP format for better performance
const heroImageDesktop = new URL('@/assets/home/hero-desktop.png', import.meta.url).href;
const heroImageMobile = new URL('@/assets/home/hero-mobile.png', import.meta.url).href;

// Default content - render immediately
const DEFAULT_FORM_HEADING = 'Talk To Our Expert';
const DEFAULT_BUTTON_TEXT = 'GET STARTED NOW';

// Hero image dimensions for aspect ratio calculation (prevent layout shift)
const DESKTOP_WIDTH = 1920;
const DESKTOP_HEIGHT = 800;
const MOBILE_WIDTH = 768;
const MOBILE_HEIGHT = 1024;

export function HeroSection() {
  const { isEditMode } = useAdmin();
  
  // Initialize with default content immediately - no loading state
  const [formHeading, setFormHeading] = useState(DEFAULT_FORM_HEADING);
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
  const [heroDesktopSrc, setHeroDesktopSrc] = useState(heroImageDesktop);
  const [heroMobileSrc, setHeroMobileSrc] = useState(heroImageMobile);
  const preloadLinkRef = useRef<HTMLLinkElement | null>(null);

  // Runtime preload injection - preload the hero image as soon as we know the URL
  useEffect(() => {
    // Determine which image to preload based on viewport
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const imageToPreload = isMobile ? heroMobileSrc : heroDesktopSrc;
    
    // Remove existing preload link if any
    if (preloadLinkRef.current) {
      preloadLinkRef.current.remove();
    }
    
    // Inject new preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageToPreload;
    link.fetchPriority = 'high';
    
    // Add media query for responsive preloading
    if (isMobile) {
      link.media = '(max-width: 767px)';
    } else {
      link.media = '(min-width: 768px)';
    }
    
    document.head.appendChild(link);
    preloadLinkRef.current = link;
    
    // Cleanup on unmount
    return () => {
      if (preloadLinkRef.current) {
        preloadLinkRef.current.remove();
      }
    };
  }, [heroDesktopSrc, heroMobileSrc]);

  // Load CMS content in background - updates after initial render
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await contentAPI.getPageContent('home');
        
        const heroHeading = content.find(
          (c: any) => c.section === 'hero' && c.key === 'formHeading'
        );
        const heroButton = content.find(
          (c: any) => c.section === 'hero' && c.key === 'buttonText'
        );
        const desktopImage = content.find(
          (c: any) => c.section === 'hero' && c.key === 'hero-desktop'
        );
        const mobileImage = content.find(
          (c: any) => c.section === 'hero' && c.key === 'hero-mobile'
        );
        
        // Only update if CMS has custom content
        if (heroHeading?.value) setFormHeading(heroHeading.value);
        if (heroButton?.value) setButtonText(heroButton.value);
        if (desktopImage?.value) setHeroDesktopSrc(desktopImage.value);
        if (mobileImage?.value) setHeroMobileSrc(mobileImage.value);
      } catch (error) {
        // Silently keep default content
        console.log('Using default hero content');
      }
    };
    
    loadContent();
  }, []);

  // Handle image upload in edit mode
  const handleImageUpload = async (file: File, type: 'desktop' | 'mobile') => {
    if (!isEditMode) return;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', localStorage.getItem('admin_token') || '');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        // Update state with new image URL
        if (type === 'desktop') {
          setHeroDesktopSrc(data.url);
        } else {
          setHeroMobileSrc(data.url);
        }
        
        // Save to CMS
        const imageKey = type === 'desktop' ? 'hero-desktop' : 'hero-mobile';
        await fetch(`${API_URL}/content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 'home',
            section: 'hero',
            key: imageKey,
            value: data.url,
            type: 'image',
            token: localStorage.getItem('admin_token')
          })
        });
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  // No loading state - render immediately with defaults

  return (
    <EditableSection
      sectionId="hero"
      sectionName="Hero Section"
      page="home"
      fields={[
        {
          key: 'formHeading',
          label: 'Form Heading',
          type: 'text',
          value: formHeading
        },
        {
          key: 'buttonText',
          label: 'Button Text',
          type: 'text',
          value: buttonText
        }
      ]}
      onSave={(data) => {
        setFormHeading(data.formHeading);
        setButtonText(data.buttonText);
      }}
    >
      {/* Reserve space to prevent layout shift - aspect ratio based on actual image dimensions */}
      <section 
        className="relative w-full block m-0 p-0 leading-none" 
        data-testid="hero-section"
        style={{ 
          minHeight: '400px', // Reserve minimum space
          aspectRatio: 'auto' // Let image determine final aspect ratio
        }}
      >
        {/* Responsive Picture Element - Browser downloads only one image */}
        <picture className="w-full block m-0 p-0 leading-none" style={{ fontSize: 0 }}>
          {/* Mobile source - loads on small screens */}
          <source
            media="(max-width: 767px)"
            srcSet={heroMobileSrc}
            width={MOBILE_WIDTH}
            height={MOBILE_HEIGHT}
          />
          
          {/* Desktop fallback - loads on larger screens */}
          <img
            src={heroDesktopSrc}
            alt="Build A Brand People Trust - InsAPI Marketing"
            width={DESKTOP_WIDTH}
            height={DESKTOP_HEIGHT}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto block m-0 p-0"
            style={{ 
              display: 'block',
              width: '100%',
              height: 'auto',
              verticalAlign: 'bottom'
            }}
          />
        </picture>
        
        {/* Edit overlay for CMS - only visible in edit mode */}
        {isEditMode && (
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              📱 Upload Mobile
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'mobile');
                }}
              />
            </label>
            <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              🖥️ Upload Desktop
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'desktop');
                }}
              />
            </label>
          </div>
        )}
        
        {/* Form Overlay - Desktop */}
        <div className="hidden md:flex absolute top-0 right-0 w-full h-full items-start justify-end pt-2 sm:pt-3 md:pt-4 lg:pt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 pointer-events-none">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] pointer-events-auto mr-1 sm:mr-2 md:mr-3 lg:mr-4">
            <UniversalForm 
              formHeading={formHeading}
              buttonText={buttonText}
              pageId="home"
            />
          </div>
        </div>
        
        {/* Form Overlay - Mobile */}
        <div className="flex md:hidden absolute top-0 left-0 w-full h-full items-start justify-center pt-2 px-2 pointer-events-none">
          <div className="w-full max-w-[380px] pointer-events-auto">
            <UniversalFormMobile 
              formHeading={formHeading}
              buttonText={buttonText}
              pageId="home"
            />
          </div>
        </div>
      </section>
    </EditableSection>
  );
}
