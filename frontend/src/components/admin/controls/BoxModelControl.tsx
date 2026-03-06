import React, { useState } from 'react';
import { Link, Unlink } from 'lucide-react';

interface BoxModelValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
  linked: boolean;
}

interface BoxModelControlProps {
  label: string;
  value: BoxModelValue;
  onChange: (value: BoxModelValue) => void;
  unit?: string;
}

export function BoxModelControl({ label, value, onChange, unit = 'px' }: BoxModelControlProps) {
  const handleChange = (side: keyof Omit<BoxModelValue, 'linked'>, newValue: number) => {
    if (value.linked) {
      // Update all sides
      onChange({
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
        linked: true
      });
    } else {
      // Update only the specified side
      onChange({
        ...value,
        [side]: newValue
      });
    }
  };

  const toggleLinked = () => {
    onChange({
      ...value,
      linked: !value.linked
    });
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          onClick={toggleLinked}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title={value.linked ? 'Unlink values' : 'Link values'}
        >
          {value.linked ? <Link size={16} /> : <Unlink size={16} />}
        </button>
      </div>
      
      <div className="relative bg-gray-50 border border-gray-300 rounded-lg p-4">
        {/* Visual Box Model */}
        <div className="relative">
          {/* Top */}
          <div className="flex justify-center mb-2">
            <input
              type="number"
              value={value.top}
              onChange={(e) => handleChange('top', Number(e.target.value))}
              className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded bg-white"
              placeholder="Top"
            />
          </div>
          
          {/* Middle row */}
          <div className="flex justify-between items-center mb-2">
            <input
              type="number"
              value={value.left}
              onChange={(e) => handleChange('left', Number(e.target.value))}
              className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded bg-white"
              placeholder="Left"
            />
            <div className="flex-1 mx-2 py-4 bg-blue-50 border border-blue-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">Element</span>
            </div>
            <input
              type="number"
              value={value.right}
              onChange={(e) => handleChange('right', Number(e.target.value))}
              className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded bg-white"
              placeholder="Right"
            />
          </div>
          
          {/* Bottom */}
          <div className="flex justify-center">
            <input
              type="number"
              value={value.bottom}
              onChange={(e) => handleChange('bottom', Number(e.target.value))}
              className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded bg-white"
              placeholder="Bottom"
            />
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-2">{unit}</div>
      </div>
    </div>
  );
}
