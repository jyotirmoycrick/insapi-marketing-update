import React from 'react';
import { SelectControl } from '../controls/SelectControl';
import { SliderControl } from '../controls/SliderControl';
import { ColorPicker } from '../controls/ColorPicker';
import { IconButtonGroup } from '../controls/IconButtonGroup';
import { 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline
} from 'lucide-react';

interface TypographyStyles {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: string;
  textDecoration?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: string;
  textTransform?: string;
  color?: string;
}

interface TypographyPanelProps {
  styles: TypographyStyles;
  onChange: (styles: Partial<TypographyStyles>) => void;
}

export function TypographyPanel({ styles, onChange }: TypographyPanelProps) {
  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Typography</h3>
      
      <SelectControl
        label="Font Family"
        value={styles.fontFamily || 'inherit'}
        onChange={(value) => onChange({ fontFamily: value })}
        options={[
          { value: 'inherit', label: 'Default' },
          { value: 'Arial, sans-serif', label: 'Arial' },
          { value: 'Helvetica, sans-serif', label: 'Helvetica' },
          { value: 'Georgia, serif', label: 'Georgia' },
          { value: 'Times New Roman, serif', label: 'Times New Roman' },
          { value: 'Courier New, monospace', label: 'Courier New' },
          { value: 'Verdana, sans-serif', label: 'Verdana' },
          { value: 'Poppins, sans-serif', label: 'Poppins' },
          { value: 'Roboto, sans-serif', label: 'Roboto' },
          { value: 'Inter, sans-serif', label: 'Inter' }
        ]}
      />
      
      <SliderControl
        label="Font Size"
        value={styles.fontSize || 16}
        onChange={(value) => onChange({ fontSize: value })}
        min={8}
        max={120}
        unit="px"
      />
      
      <SelectControl
        label="Font Weight"
        value={String(styles.fontWeight || 400)}
        onChange={(value) => onChange({ fontWeight: Number(value) })}
        options={[
          { value: '100', label: 'Thin (100)' },
          { value: '200', label: 'Extra Light (200)' },
          { value: '300', label: 'Light (300)' },
          { value: '400', label: 'Normal (400)' },
          { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi Bold (600)' },
          { value: '700', label: 'Bold (700)' },
          { value: '800', label: 'Extra Bold (800)' },
          { value: '900', label: 'Black (900)' }
        ]}
      />
      
      <SliderControl
        label="Line Height"
        value={styles.lineHeight || 1.5}
        onChange={(value) => onChange({ lineHeight: value })}
        min={0.5}
        max={3}
        step={0.1}
        unit="em"
      />
      
      <SliderControl
        label="Letter Spacing"
        value={styles.letterSpacing || 0}
        onChange={(value) => onChange({ letterSpacing: value })}
        min={-5}
        max={10}
        step={0.1}
        unit="px"
      />
      
      <IconButtonGroup
        label="Text Align"
        value={styles.textAlign || 'left'}
        onChange={(value) => onChange({ textAlign: value })}
        options={[
          { value: 'left', icon: <AlignLeft size={18} />, tooltip: 'Align Left' },
          { value: 'center', icon: <AlignCenter size={18} />, tooltip: 'Align Center' },
          { value: 'right', icon: <AlignRight size={18} />, tooltip: 'Align Right' },
          { value: 'justify', icon: <AlignJustify size={18} />, tooltip: 'Justify' }
        ]}
      />
      
      <SelectControl
        label="Text Transform"
        value={styles.textTransform || 'none'}
        onChange={(value) => onChange({ textTransform: value })}
        options={[
          { value: 'none', label: 'None' },
          { value: 'uppercase', label: 'UPPERCASE' },
          { value: 'lowercase', label: 'lowercase' },
          { value: 'capitalize', label: 'Capitalize' }
        ]}
      />
      
      <ColorPicker
        label="Text Color"
        value={styles.color || '#000000'}
        onChange={(value) => onChange({ color: value })}
      />
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Style</label>
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ fontStyle: styles.fontStyle === 'italic' ? 'normal' : 'italic' })}
            className={`flex-1 p-2 border rounded transition-colors ${
              styles.fontStyle === 'italic'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            title="Italic"
          >
            <Italic size={18} className="mx-auto" />
          </button>
          <button
            onClick={() => onChange({ textDecoration: styles.textDecoration === 'underline' ? 'none' : 'underline' })}
            className={`flex-1 p-2 border rounded transition-colors ${
              styles.textDecoration === 'underline'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            title="Underline"
          >
            <Underline size={18} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
