import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category = 'men'
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [tab, setTab] = useState<'men' | 'women'>(category === 'women' ? 'women' : 'men');

  if (!isOpen) return null;

  const menSizes = [
    { size: 'S', chest: unit === 'inches' ? '38-40"' : '96-102 cm', shoulder: unit === 'inches' ? '18.5"' : '47 cm', length: unit === 'inches' ? '28.0"' : '71 cm' },
    { size: 'M', chest: unit === 'inches' ? '41-43"' : '104-109 cm', shoulder: unit === 'inches' ? '19.5"' : '49.5 cm', length: unit === 'inches' ? '29.0"' : '73.5 cm' },
    { size: 'L', chest: unit === 'inches' ? '44-46"' : '112-117 cm', shoulder: unit === 'inches' ? '20.5"' : '52 cm', length: unit === 'inches' ? '30.0"' : '76 cm' },
    { size: 'XL', chest: unit === 'inches' ? '47-49"' : '119-124 cm', shoulder: unit === 'inches' ? '21.5"' : '54.5 cm', length: unit === 'inches' ? '31.0"' : '78.5 cm' },
    { size: 'XXL', chest: unit === 'inches' ? '50-52"' : '127-132 cm', shoulder: unit === 'inches' ? '22.5"' : '57 cm', length: unit === 'inches' ? '32.0"' : '81 cm' }
  ];

  const womenSizes = [
    { size: 'XS', bust: unit === 'inches' ? '32-34"' : '81-86 cm', waist: unit === 'inches' ? '24-26"' : '61-66 cm', length: unit === 'inches' ? '21.5"' : '54.5 cm' },
    { size: 'S', bust: unit === 'inches' ? '35-37"' : '89-94 cm', waist: unit === 'inches' ? '27-29"' : '68-74 cm', length: unit === 'inches' ? '22.5"' : '57 cm' },
    { size: 'M', bust: unit === 'inches' ? '38-40"' : '96-101 cm', waist: unit === 'inches' ? '30-32"' : '76-81 cm', length: unit === 'inches' ? '23.5"' : '59.5 cm' },
    { size: 'L', bust: unit === 'inches' ? '41-43"' : '104-109 cm', waist: unit === 'inches' ? '33-35"' : '84-89 cm', length: unit === 'inches' ? '24.5"' : '62 cm' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#121419] border border-[#272d3a] shadow-2xl p-6 sm:p-8 text-[#f5f3ef]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#88909e] hover:text-white p-1"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <Ruler className="h-5 w-5 text-[#c9a96e]" />
          <h2 className="text-xl font-serif font-medium text-white tracking-wide">
            SAKSOX Precision Fit Guide
          </h2>
        </div>
        <p className="text-xs text-[#88909e] mb-6">
          Our winter outerwear is cut with an intended modern boxy / relaxed drape. For a fitted look, consider sizing down one size.
        </p>

        {/* Tab Selector & Unit Switcher */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252b38] mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('men')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'men'
                  ? 'bg-[#c9a96e] text-[#0a0b0d]'
                  : 'bg-[#181a22] text-[#88909e] hover:text-white'
              }`}
            >
              Men’s Fit
            </button>
            <button
              onClick={() => setTab('women')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'women'
                  ? 'bg-[#c9a96e] text-[#0a0b0d]'
                  : 'bg-[#181a22] text-[#88909e] hover:text-white'
              }`}
            >
              Women’s Fit
            </button>
          </div>

          <div className="flex items-center border border-[#282e3b] bg-[#161820] text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 transition-colors ${
                unit === 'inches' ? 'bg-[#2b3140] text-white font-semibold' : 'text-[#88909e]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 transition-colors ${
                unit === 'cm' ? 'bg-[#2b3140] text-white font-semibold' : 'text-[#88909e]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#252b38]">
            <thead className="bg-[#181b23] text-[#88909e] uppercase font-mono">
              <tr>
                <th className="p-3 border-b border-[#252b38]">Size</th>
                <th className="p-3 border-b border-[#252b38]">
                  {tab === 'men' ? 'Chest Width' : 'Bust'}
                </th>
                <th className="p-3 border-b border-[#252b38]">
                  {tab === 'men' ? 'Shoulder' : 'Waist'}
                </th>
                <th className="p-3 border-b border-[#252b38]">Back Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252b38]">
              {tab === 'men'
                ? menSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-[#181a22]">
                      <td className="p-3 font-bold text-[#c9a96e]">{row.size}</td>
                      <td className="p-3 text-white">{row.chest}</td>
                      <td className="p-3 text-[#d1d5db]">{row.shoulder}</td>
                      <td className="p-3 text-[#d1d5db]">{row.length}</td>
                    </tr>
                  ))
                : womenSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-[#181a22]">
                      <td className="p-3 font-bold text-[#c9a96e]">{row.size}</td>
                      <td className="p-3 text-white">{row.bust}</td>
                      <td className="p-3 text-[#d1d5db]">{row.waist}</td>
                      <td className="p-3 text-[#d1d5db]">{row.length}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-[#161820] border border-[#252b38] text-[11px] text-[#88909e] space-y-1">
          <p className="font-semibold text-white">How to measure:</p>
          <p>• Chest: Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          <p>• Fragrance note: All perfumes are unisex and packaged in 50ml or 100ml luxury bottles.</p>
        </div>
      </div>
    </div>
  );
};
