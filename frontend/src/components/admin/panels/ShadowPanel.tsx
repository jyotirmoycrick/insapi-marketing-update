import React from 'react';
import { SliderControl } from '../controls/SliderControl';
import { ColorPicker } from '../controls/ColorPicker';

interface ShadowStyles {
  boxShadowH?: number;
  boxShadowV?: number;
  boxShadowBlur?: number;
  boxShadowSpread?: number;
  boxShadowColor?: string;
}

interface ShadowPanelProps {
  styles: ShadowStyles;
  onChange: (styles: Partial<ShadowStyles>) => void;
}

export function ShadowPanel({ styles, onChange }: ShadowPanelProps) {
  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Box Shadow</h3>
      
      <SliderControl
        label="Horizontal Offset"
        value={styles.boxShadowH || 0}
        onChange={(value) => onChange({ boxShadowH: value })}
        min={-50}
        max={50}
        unit="px"
      />
      
      <SliderControl
        label="Vertical Offset"
        value={styles.boxShadowV || 0}
        onChange={(value) => onChange({ boxShadowV: value })}
        min={-50}
        max={50}
        unit="px"
      />
      
      <SliderControl
        label="Blur Radius"
        value={styles.boxShadowBlur || 0}
        onChange={(value) => onChange({ boxShadowBlur: value })}
        min={0}
        max={100}
        unit="px"
      />
      
      <SliderControl
        label="Spread Radius"
        value={styles.boxShadowSpread || 0}
        onChange={(value) => onChange({ boxShadowSpread: value })}
        min={-50}
        max={50}
        unit="px"
      />
      
      <ColorPicker
        label="Shadow Color"
        value={styles.boxShadowColor || 'rgba(0,0,0,0.3)'}
        onChange={(value) => onChange({ boxShadowColor: value })}
        showAlpha
      />
    </div>
  );
}
