import React from 'react';

interface IconButtonGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    icon: React.ReactNode;
    tooltip: string;
  }>;
}

export function IconButtonGroup({ label, value, onChange, options }: IconButtonGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            title={option.tooltip}
            className={`flex-1 p-2 border rounded transition-colors ${
              value === option.value
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
