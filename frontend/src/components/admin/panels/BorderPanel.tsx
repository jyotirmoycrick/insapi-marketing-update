import React from 'react';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';
import { ColorPicker } from '../controls/ColorPicker';
import { BoxModelControl } from '../controls/BoxModelControl';

interface BorderStyles {
  borderStyle?: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    linked: boolean;
  };
}

interface BorderPanelProps {
  styles: BorderStyles;
  onChange: (styles: Partial<BorderStyles>) => void;
}

export function BorderPanel({ styles, onChange }: BorderPanelProps) {
  const defaultRadius = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    linked: true
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Border</h3>
      
      <SelectControl
        label="Border Type"
        value={styles.borderStyle || 'none'}
        onChange={(value) => onChange({ borderStyle: value })}
        options={[
          { value: 'none', label: 'None' },
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'double', label: 'Double' }
        ]}
      />

      {styles.borderStyle && styles.borderStyle !== 'none' && (
        <>
          <SliderControl
            label="Border Width"
            value={styles.borderWidth || 1}
            onChange={(value) => onChange({ borderWidth: value })}
            min={0}
            max={20}
            unit="px"
          />
          
          <ColorPicker
            label="Border Color"
            value={styles.borderColor || '#000000'}
            onChange={(value) => onChange({ borderColor: value })}
          />
        </>
      )}

      <div className="mt-4">
        <BoxModelControl
          label="Border Radius"
          value={styles.borderRadius || defaultRadius}
          onChange={(value) => onChange({ borderRadius: value })}
          unit="px"
        />
      </div>
    </div>
  );
}
