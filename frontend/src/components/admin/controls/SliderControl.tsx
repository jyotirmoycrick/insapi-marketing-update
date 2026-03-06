import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onUnitChange?: (unit: string) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  showInput?: boolean;
  showUnitSelector?: boolean;
  availableUnits?: string[];
}

export function SliderControl({
  label,
  value,
  onChange,
  onUnitChange,
  min = 0,
  max = 100,
  step = 1,
  unit = 'px',
  showInput = true,
  showUnitSelector = false,
  availableUnits = ['px', '%', 'em', 'rem', 'vh', 'vw']
}: SliderControlProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {showInput && (
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={min}
              max={max}
              step={step}
            />
            {showUnitSelector && onUnitChange ? (
              <select
                value={unit}
                onChange={(e) => onUnitChange(e.target.value)}
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {availableUnits.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs text-gray-500">{unit}</span>
            )}
          </div>
        )}
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none'
        }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}} />
    </div>
  );
}
