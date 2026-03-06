import React from 'react';
import { BoxModelControl } from '../controls/BoxModelControl';

interface BoxModelValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
  linked: boolean;
}

interface SpacingStyles {
  margin?: BoxModelValue;
  padding?: BoxModelValue;
}

interface SpacingPanelProps {
  styles: SpacingStyles;
  onChange: (styles: Partial<SpacingStyles>) => void;
}

export function SpacingPanel({ styles, onChange }: SpacingPanelProps) {
  const defaultBoxModel: BoxModelValue = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    linked: true
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Spacing</h3>
      
      <BoxModelControl
        label="Margin"
        value={styles.margin || defaultBoxModel}
        onChange={(value) => onChange({ margin: value })}
        unit="px"
      />
      
      <BoxModelControl
        label="Padding"
        value={styles.padding || defaultBoxModel}
        onChange={(value) => onChange({ padding: value })}
        unit="px"
      />
    </div>
  );
}
