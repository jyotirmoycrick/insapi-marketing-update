import React, { useState, useRef, useEffect } from 'react';
import { Pipette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showAlpha?: boolean;
}

export function ColorPicker({ label, value, onChange, showAlpha = false }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors"
          style={{ backgroundColor: value }}
          title="Click to change color"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>

      {showPicker && (
        <div ref={pickerRef} className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="space-y-2">
            <input
              type="color"
              value={value.startsWith('#') ? value : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-32 cursor-pointer rounded"
            />
            {showAlpha && (
              <div>
                <label className="text-xs text-gray-600">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  className="w-full"
                />
              </div>
            )}
            <div className="grid grid-cols-6 gap-1">
              {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
                '#FF00FF', '#00FFFF', '#808080', '#C0C0C0', '#800000', '#008000'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onChange(color);
                    setShowPicker(false);
                  }}
                  className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
