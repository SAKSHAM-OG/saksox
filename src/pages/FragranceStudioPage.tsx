import React, { useState } from 'react';
import { Sparkles, Droplets, Compass, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/products';
import { FragranceFamily } from '../types';

interface FragranceStudioPageProps {
  initialFamily?: string;
  onNavigateToDetail: (slug: string) => void;
  onOpenScentQuiz: () => void;
}

export const FragranceStudioPage: React.FC<FragranceStudioPageProps> = ({
  initialFamily,
  onNavigateToDetail,
  onOpenScentQuiz
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>(initialFamily || 'all');

  const fragrances = PRODUCTS.filter((p) => p.category === 'fragrances');

  const filteredFragrances =
    selectedFamily === 'all'
      ? fragrances
      : fragrances.filter((f) => f.fragranceFamily === selectedFamily);

  const fragranceFamilies = [
    {
      id: 'all',
      name: 'ALL CREATIONS',
      desc: 'Explore complete atelier archives',
      icon: '✨'
    },
    {
      id: 'woody',
      name: 'WOODY',
      desc: 'Smoked cedar, agarwood, mysore sandalwood',
      icon: '🌲'
    },
    {
      id: 'sweet',
      name: 'SWEET',
      desc: 'Dark chocolate amber, wild cherry, praline',
      icon: '🍒'
    },
    {
      id: 'spicy',
      name: 'SPICY',
      desc: 'Malabar green cardamom, ceylon cinnamon, pink pepper',
      icon: '🔥'
    },
    {
      id: 'musky',
      name: 'MUSKY',
      desc: 'Warm cashmere skin, ambrette seeds, powdery iris',
      icon: '☁️'
    },
    {
      id: 'fresh',
      name: 'FRESH',
      desc: 'Frozen grapefruit, haitian vetiver, crisp aldehydes',
      icon: '❄️'
    },
    {
      id: 'aquatic',
      name: 'AQUATIC',
      desc: 'Sub-zero alpine breezes, ocean salt spray',
      icon: '🌊'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-24">
      {/* Editorial Luxury Perfume House Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0d12] border-b border-[#1d212b] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1800&q=80"
            alt="Atelier"
            className="w-full h-full object-cover filter contrast-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141720]/80 border border-[#c9a96e]/40 backdrop-blur-md mb-6">
            <Droplets className="h-3.5 w-3.5 text-[#dfbe7d]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#dfbe7d] uppercase">
              GRASSE ESSENCES • CRAFTED IN INDIA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-wide uppercase leading-tight">
            FIND YOUR <span className="italic text-gradient-gold">SIGNATURE.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#b8bfcc] mt-4 leading-relaxed tracking-wide">
            Where Haute French perfumery converges with nocturnal streetwear soul. Extraits de Parfum macerated for 90 days with up to 30% fragrance oils for unmatched winter sillage.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenScentQuiz}
              className="py-3.5 px-7 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Scent Match Diagnostic</span>
            </button>
            <a
              href="#atelier-catalog"
              className="py-3.5 px-6 bg-[#161822] hover:bg-[#202432] border border-[#2b3142] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Explore All Scents ({fragrances.length})
            </a>
          </div>
        </div>
      </section>

      {/* Fragrance Families Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7d]">
            OLFACTORY ACCORDS
          </span>
          <h2 className="text-2xl font-serif text-white mt-1">Select By Scent Family</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {fragranceFamilies.map((fam) => {
            const isSelected = selectedFamily === fam.id;
            return (
              <button
                key={fam.id}
                onClick={() => setSelectedFamily(fam.id)}
                className={`p-3 text-center border transition-all ${
                  isSelected
                    ? 'bg-[#1b1f2b] border-[#c9a96e] text-white'
                    : 'bg-[#111319] border-[#20242f] text-[#88909e] hover:border-[#333a4a] hover:text-white'
                }`}
              >
                <span className="text-xl block mb-1">{fam.icon}</span>
                <span className="text-xs font-mono font-bold tracking-wider uppercase block">
                  {fam.name}
                </span>
                <span className="text-[10px] text-[#6d7483] block truncate mt-1">
                  {fam.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Catalog Grid */}
      <section id="atelier-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#1f232d] mb-8">
          <span className="text-xs font-mono text-[#88909e]">
            Showing <strong className="text-white">{filteredFragrances.length}</strong> creations
          </span>
          {selectedFamily !== 'all' && (
            <button
              onClick={() => setSelectedFamily('all')}
              className="text-xs text-[#dfbe7d] hover:underline uppercase font-mono"
            >
              Reset Family Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFragrances.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateToDetail={onNavigateToDetail}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
