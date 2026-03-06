import React, { useState } from 'react';
import { TabControl } from '../controls/TabControl';
import { ColorPicker } from '../controls/ColorPicker';
import { ImageUploadControl } from '../controls/ImageUploadControl';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';

interface BackgroundStyles {
  backgroundType?: 'classic' | 'gradient' | 'image';
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

interface BackgroundPanelProps {
  styles: BackgroundStyles;
  onChange: (styles: Partial<BackgroundStyles>) => void;
  onUpload: (file: File) => Promise<string>;
}

export function BackgroundPanel({ styles, onChange, onUpload }: BackgroundPanelProps) {
  const [bgType, setBgType] = useState<string>(styles.backgroundType || 'classic');

  const handleTypeChange = (type: string) => {
    setBgType(type);
    onChange({ backgroundType: type as any });
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Background</h3>
      
      <TabControl
        tabs={['Classic', 'Gradient', 'Image']}
        activeTab={bgType.charAt(0).toUpperCase() + bgType.slice(1)}
        onChange={(tab) => handleTypeChange(tab.toLowerCase())}
      />

      {bgType === 'classic' && (
        <ColorPicker
          label="Background Color"
          value={styles.backgroundColor || '#ffffff'}
          onChange={(value) => onChange({ backgroundColor: value })}
        />
      )}

      {bgType === 'gradient' && (
        <div>
          <ColorPicker
            label="Color 1"
            value={styles.backgroundColor || '#ffffff'}
            onChange={(value) => onChange({ backgroundColor: value })}
          />
          <ColorPicker
            label="Color 2"
            value="#000000"
            onChange={(value) => {}}
          />
          <SliderControl
            label="Angle"
            value={0}
            onChange={(value) => {}}
            min={0}
            max={360}
            unit="°"
          />
        </div>
      )}

      {bgType === 'image' && (
        <div>
          <ImageUploadControl
            label="Background Image"
            value={styles.backgroundImage || ''}
            onChange={(value) => onChange({ backgroundImage: value })}
            onUpload={onUpload}
          />
          
          {styles.backgroundImage && (
            <>
              <SelectControl
                label="Position"
                value={styles.backgroundPosition || 'center center'}
                onChange={(value) => onChange({ backgroundPosition: value })}
                options={[
                  { value: 'center center', label: 'Center Center' },
                  { value: 'top left', label: 'Top Left' },
                  { value: 'top center', label: 'Top Center' },
                  { value: 'top right', label: 'Top Right' },
                  { value: 'center left', label: 'Center Left' },
                  { value: 'center right', label: 'Center Right' },
                  { value: 'bottom left', label: 'Bottom Left' },
                  { value: 'bottom center', label: 'Bottom Center' },
                  { value: 'bottom right', label: 'Bottom Right' }
                ]}
              />
              
              <SelectControl
                label="Size"
                value={styles.backgroundSize || 'cover'}
                onChange={(value) => onChange({ backgroundSize: value })}
                options={[
                  { value: 'auto', label: 'Auto' },
                  { value: 'cover', label: 'Cover' },
                  { value: 'contain', label: 'Contain' }
                ]}
              />
              
              <SelectControl
                label="Repeat"
                value={styles.backgroundRepeat || 'no-repeat'}
                onChange={(value) => onChange({ backgroundRepeat: value })}
                options={[
                  { value: 'no-repeat', label: 'No Repeat' },
                  { value: 'repeat', label: 'Repeat' },
                  { value: 'repeat-x', label: 'Repeat X' },
                  { value: 'repeat-y', label: 'Repeat Y' }
                ]}
              />
            </>
          )}
        </div>
      )}

      {/* Overlay */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Overlay</h4>
        <ColorPicker
          label="Overlay Color"
          value={styles.overlayColor || 'rgba(0,0,0,0)'}
          onChange={(value) => onChange({ overlayColor: value })}
          showAlpha
        />
        <SliderControl
          label="Overlay Opacity"
          value={styles.overlayOpacity || 0}
          onChange={(value) => onChange({ overlayOpacity: value })}
          min={0}
          max={1}
          step={0.01}
          unit=""
        />
      </div>
    </div>
  );
}
