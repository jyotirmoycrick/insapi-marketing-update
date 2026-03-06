import React from 'react';
import { SliderControl } from '../controls/SliderControl';
import { IconButtonGroup } from '../controls/IconButtonGroup';
import { 
  ArrowRight, ArrowDown, ArrowLeft, ArrowUp,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal
} from 'lucide-react';

interface LayoutStyles {
  width?: number;
  widthUnit?: string;
  height?: number;
  heightUnit?: string;
  minHeight?: number;
  minHeightUnit?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: number;
  gapUnit?: string;
}

interface LayoutPanelProps {
  styles: LayoutStyles;
  onChange: (styles: Partial<LayoutStyles>) => void;
  componentType: string;
}

export function LayoutPanel({ styles, onChange, componentType }: LayoutPanelProps) {
  const isContainer = ['section', 'flexbox', 'grid'].includes(componentType);

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Layout</h3>
      
      {/* Width Control */}
      <SliderControl
        label="Width"
        value={styles.width || 100}
        onChange={(value) => onChange({ width: value })}
        onUnitChange={(unit) => onChange({ widthUnit: unit })}
        min={0}
        max={2000}
        unit={styles.widthUnit || 'px'}
        showUnitSelector={true}
        availableUnits={['px', '%', 'vw', 'em', 'rem']}
      />
      
      {/* Height Control */}
      <SliderControl
        label="Height"
        value={styles.height || 0}
        onChange={(value) => onChange({ height: value })}
        onUnitChange={(unit) => onChange({ heightUnit: unit })}
        min={0}
        max={1000}
        unit={styles.heightUnit || 'px'}
        showUnitSelector={true}
        availableUnits={['px', '%', 'vh', 'em', 'rem']}
      />
      
      {/* Min Height Control */}
      <SliderControl
        label="Min Height"
        value={styles.minHeight || 0}
        onChange={(value) => onChange({ minHeight: value })}
        onUnitChange={(unit) => onChange({ minHeightUnit: unit })}
        min={0}
        max={1000}
        unit={styles.minHeightUnit || 'px'}
        showUnitSelector={true}
        availableUnits={['px', '%', 'vh', 'em', 'rem']}
      />
      
      {/* Flexbox Controls - Only for containers */}
      {isContainer && (
        <>
          <IconButtonGroup
            label="Flex Direction"
            value={styles.flexDirection || 'row'}
            onChange={(value) => onChange({ flexDirection: value as any })}
            options={[
              { value: 'row', icon: <ArrowRight size={18} />, tooltip: 'Row' },
              { value: 'column', icon: <ArrowDown size={18} />, tooltip: 'Column' },
              { value: 'row-reverse', icon: <ArrowLeft size={18} />, tooltip: 'Row Reverse' },
              { value: 'column-reverse', icon: <ArrowUp size={18} />, tooltip: 'Column Reverse' }
            ]}
          />
          
          <IconButtonGroup
            label="Justify Content"
            value={styles.justifyContent || 'flex-start'}
            onChange={(value) => onChange({ justifyContent: value as any })}
            options={[
              { value: 'flex-start', icon: <AlignStartHorizontal size={18} />, tooltip: 'Start' },
              { value: 'center', icon: <AlignCenterHorizontal size={18} />, tooltip: 'Center' },
              { value: 'flex-end', icon: <AlignEndHorizontal size={18} />, tooltip: 'End' },
              { value: 'space-between', icon: <span className="text-xs">⟷</span>, tooltip: 'Space Between' },
              { value: 'space-around', icon: <span className="text-xs">⟺</span>, tooltip: 'Space Around' }
            ]}
          />
          
          <IconButtonGroup
            label="Align Items"
            value={styles.alignItems || 'stretch'}
            onChange={(value) => onChange({ alignItems: value as any })}
            options={[
              { value: 'flex-start', icon: <AlignStartVertical size={18} />, tooltip: 'Top' },
              { value: 'center', icon: <AlignCenterVertical size={18} />, tooltip: 'Center' },
              { value: 'flex-end', icon: <AlignEndVertical size={18} />, tooltip: 'Bottom' },
              { value: 'stretch', icon: <span className="text-xs">↕</span>, tooltip: 'Stretch' }
            ]}
          />
          
          <SliderControl
            label="Gap"
            value={styles.gap || 0}
            onChange={(value) => onChange({ gap: value })}
            onUnitChange={(unit) => onChange({ gapUnit: unit })}
            min={0}
            max={100}
            unit={styles.gapUnit || 'px'}
            showUnitSelector={true}
            availableUnits={['px', 'em', 'rem']}
          />
        </>
      )}
    </div>
  );
}
