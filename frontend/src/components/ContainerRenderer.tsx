import React, { CSSProperties } from 'react';
import { WidgetRenderer } from './WidgetRenderer';

interface Container {
  id: string;
  type: 'column' | 'grid' | 'flex';
  width: string;
  widgets: any[];
  styles: Record<string, any>;
  settings: Record<string, any>;
  order: number;
}

interface ContainerRendererProps {
  container: Container;
  isPreview?: boolean;
}

export function ContainerRenderer({ container, isPreview = false }: ContainerRendererProps) {
  // Build container styles
  const containerStyles: CSSProperties = {
    width: container.width || '100%',
    ...container.styles,
  };

  // Add padding for boxed layouts
  if (!containerStyles.padding && !containerStyles.paddingLeft) {
    containerStyles.padding = '10px';
  }

  // Sort widgets by order
  const sortedWidgets = [...container.widgets].sort((a, b) => a.order - b.order);

  // Determine container class based on type
  let containerClass = 'page-container';
  
  if (container.type === 'grid') {
    containerClass += ' grid';
    // Grid columns from settings or styles
    const columns = container.settings?.columns || 3;
    const gap = container.settings?.gap || '20px';
    containerStyles.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    containerStyles.gap = gap;
  } else if (container.type === 'flex') {
    containerClass += ' flex';
    // Flex properties from settings
    containerStyles.flexDirection = container.settings?.direction || 'row';
    containerStyles.justifyContent = container.settings?.justify || 'flex-start';
    containerStyles.alignItems = container.settings?.align || 'stretch';
    containerStyles.gap = container.settings?.gap || '20px';
  }

  return (
    <div 
      className={containerClass}
      style={containerStyles}
      data-container-id={container.id}
    >
      {sortedWidgets.length === 0 ? (
        isPreview ? (
          <div className="text-center p-8 text-gray-400 border-2 border-dashed border-gray-300 rounded">
            Drop widgets here
          </div>
        ) : null
      ) : (
        sortedWidgets.map((widget) => (
          <WidgetRenderer 
            key={widget.id} 
            widget={widget}
            isPreview={isPreview}
          />
        ))
      )}
    </div>
  );
}
