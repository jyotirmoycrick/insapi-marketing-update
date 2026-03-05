import React, { CSSProperties } from 'react';
import { HeadingWidget } from './widgets/HeadingWidget';
import { TextWidget } from './widgets/TextWidget';
import { ImageWidget } from './widgets/ImageWidget';
import { ButtonWidget } from './widgets/ButtonWidget';
import { IconWidget } from './widgets/IconWidget';
import { IconBoxWidget } from './widgets/IconBoxWidget';
import { DividerWidget } from './widgets/DividerWidget';
import { SpacerWidget } from './widgets/SpacerWidget';
import { StatsWidget } from './widgets/StatsWidget';
import { ServiceCardWidget } from './widgets/ServiceCardWidget';
import { CarouselWidget } from './widgets/CarouselWidget';
import { AccordionWidget } from './widgets/AccordionWidget';
import { TabsWidget } from './widgets/TabsWidget';
import { TestimonialWidget } from './widgets/TestimonialWidget';
import { PricingTableWidget } from './widgets/PricingTableWidget';
import { CounterWidget } from './widgets/CounterWidget';
import { ProgressBarWidget } from './widgets/ProgressBarWidget';
import { VideoWidget } from './widgets/VideoWidget';
import { ContactFormWidget } from './widgets/ContactFormWidget';

interface Widget {
  id: string;
  type: string;
  content: Record<string, any>;
  styles: Record<string, any>;
  settings: Record<string, any>;
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

interface WidgetRendererProps {
  widget: Widget;
  isPreview?: boolean;
}

export function WidgetRenderer({ widget, isPreview = false }: WidgetRendererProps) {
  // Check visibility based on screen size
  const getVisibilityClasses = () => {
    const classes = [];
    if (!widget.visibility.desktop) classes.push('hidden lg:hidden');
    if (!widget.visibility.tablet) classes.push('md:hidden lg:block');
    if (!widget.visibility.mobile) classes.push('hidden md:block');
    return classes.join(' ');
  };

  // Build widget wrapper styles
  const wrapperStyles: CSSProperties = {
    ...widget.styles,
  };

  // Apply responsive styles
  // (In a production app, you'd use CSS media queries or styled-components)
  
  // Widget component mapping
  const widgetComponents: Record<string, React.ComponentType<any>> = {
    'heading': HeadingWidget,
    'text': TextWidget,
    'image': ImageWidget,
    'button': ButtonWidget,
    'icon': IconWidget,
    'icon-box': IconBoxWidget,
    'divider': DividerWidget,
    'spacer': SpacerWidget,
    'stats-section': StatsWidget,
    'service-card': ServiceCardWidget,
    'carousel': CarouselWidget,
    'accordion': AccordionWidget,
    'tabs': TabsWidget,
    'testimonial': TestimonialWidget,
    'pricing-table': PricingTableWidget,
    'counter': CounterWidget,
    'progress-bar': ProgressBarWidget,
    'video': VideoWidget,
    'contact-form': ContactFormWidget,
    // Add more as we create them
  };

  const WidgetComponent = widgetComponents[widget.type];

  if (!WidgetComponent) {
    if (isPreview) {
      return (
        <div className={`widget-placeholder ${getVisibilityClasses()}`} style={wrapperStyles}>
          <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded text-center">
            <p className="text-sm text-gray-500">
              Widget type "{widget.type}" not yet implemented
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div 
      className={`widget-${widget.type} ${getVisibilityClasses()}`}
      style={wrapperStyles}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <WidgetComponent 
        content={widget.content}
        styles={widget.styles}
        settings={widget.settings}
        isPreview={isPreview}
      />
    </div>
  );
}
