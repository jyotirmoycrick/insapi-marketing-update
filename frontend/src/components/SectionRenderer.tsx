import React, { CSSProperties } from 'react';
import { ContainerRenderer } from './ContainerRenderer';

interface Section {
  id: string;
  name: string;
  layout: 'full' | 'boxed';
  contentWidth?: string;
  containers: any[];
  background: {
    type: 'color' | 'gradient' | 'image' | 'video';
    color?: string;
    gradient?: string;
    image?: string;
    videoUrl?: string;
    overlay?: string;
    overlayOpacity?: number;
    attachment?: 'scroll' | 'fixed';
    position?: string;
    size?: string;
  };
  shapeDividerTop?: {
    enabled: boolean;
    type?: string;
    color?: string;
    height?: string;
    flip?: boolean;
  };
  shapeDividerBottom?: {
    enabled: boolean;
    type?: string;
    color?: string;
    height?: string;
    flip?: boolean;
  };
  styles: Record<string, any>;
  settings: Record<string, any>;
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

interface SectionRendererProps {
  section: Section;
  isPreview?: boolean;
}

export function SectionRenderer({ section, isPreview = false }: SectionRendererProps) {
  // Check visibility based on screen size
  const getVisibilityClasses = () => {
    const classes = [];
    if (!section.visibility.desktop) classes.push('hidden lg:hidden');
    if (!section.visibility.tablet) classes.push('md:hidden lg:block');
    if (!section.visibility.mobile) classes.push('hidden md:block');
    return classes.join(' ');
  };

  // Build section styles
  const sectionStyles: CSSProperties = {
    position: 'relative',
    ...section.styles,
  };

  // Background styles
  const backgroundStyles: CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  };

  if (section.background) {
    const bg = section.background;
    
    if (bg.type === 'color' && bg.color) {
      backgroundStyles.backgroundColor = bg.color;
    } else if (bg.type === 'gradient' && bg.gradient) {
      backgroundStyles.backgroundImage = bg.gradient;
    } else if (bg.type === 'image' && bg.image) {
      backgroundStyles.backgroundImage = `url(${bg.image})`;
      backgroundStyles.backgroundSize = bg.size || 'cover';
      backgroundStyles.backgroundPosition = bg.position || 'center center';
      backgroundStyles.backgroundAttachment = bg.attachment || 'scroll';
    } else if (bg.type === 'video' && bg.videoUrl) {
      // Video background will be handled separately
    }
  }

  // Content wrapper styles
  const contentStyles: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    margin: '0 auto',
  };

  if (section.layout === 'boxed') {
    contentStyles.maxWidth = section.contentWidth || '1200px';
    contentStyles.padding = '0 20px';
  }

  // Sort containers by order
  const sortedContainers = [...section.containers].sort((a, b) => a.order - b.order);

  return (
    <section 
      id={section.id}
      className={`page-section ${getVisibilityClasses()}`}
      style={sectionStyles}
      data-section-name={section.name}
    >
      {/* Shape Divider Top */}
      {section.shapeDividerTop?.enabled && (
        <ShapeDivider 
          position="top"
          type={section.shapeDividerTop.type || 'wave'}
          color={section.shapeDividerTop.color || '#ffffff'}
          height={section.shapeDividerTop.height || '100px'}
          flip={section.shapeDividerTop.flip}
        />
      )}

      {/* Background Layer */}
      <div className="section-background" style={backgroundStyles}>
        {/* Video Background */}
        {section.background?.type === 'video' && section.background.videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={section.background.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Overlay */}
        {section.background?.overlay && (
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: section.background.overlay,
              opacity: section.background.overlayOpacity || 0.5
            }}
          />
        )}
      </div>

      {/* Content Layer */}
      <div className="section-content" style={contentStyles}>
        {section.layout === 'full' ? (
          // Full width layout - containers take full width
          <div className="w-full">
            {sortedContainers.map((container) => (
              <ContainerRenderer 
                key={container.id} 
                container={container}
                isPreview={isPreview}
              />
            ))}
          </div>
        ) : (
          // Boxed layout - containers in flex row
          <div className="flex flex-wrap -mx-2">
            {sortedContainers.map((container) => (
              <ContainerRenderer 
                key={container.id} 
                container={container}
                isPreview={isPreview}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shape Divider Bottom */}
      {section.shapeDividerBottom?.enabled && (
        <ShapeDivider 
          position="bottom"
          type={section.shapeDividerBottom.type || 'wave'}
          color={section.shapeDividerBottom.color || '#ffffff'}
          height={section.shapeDividerBottom.height || '100px'}
          flip={section.shapeDividerBottom.flip}
        />
      )}
    </section>
  );
}

// Shape Divider Component
interface ShapeDividerProps {
  position: 'top' | 'bottom';
  type: string;
  color: string;
  height: string;
  flip?: boolean;
}

function ShapeDivider({ position, type, color, height, flip }: ShapeDividerProps) {
  const containerStyle: CSSProperties = {
    position: 'absolute',
    [position]: 0,
    left: 0,
    right: 0,
    height,
    overflow: 'hidden',
    lineHeight: 0,
    zIndex: 1,
    transform: flip ? 'scaleX(-1)' : undefined,
  };

  const svgStyle: CSSProperties = {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height,
  };

  // SVG paths for different shapes
  const shapes: Record<string, string> = {
    wave: 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z',
    curve: 'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z',
    tilt: 'M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z',
    triangle: 'M0,0 L1200,0 L600,200 Z',
    blob: 'M0,100 C150,200 350,0 600,50 C750,75 900,150 1200,50 L1200,0 L0,0 Z',
  };

  const pathData = shapes[type] || shapes.wave;

  return (
    <div className="shape-divider" style={containerStyle}>
      <svg
        style={svgStyle}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d={pathData}
          fill={color}
        />
      </svg>
    </div>
  );
}
