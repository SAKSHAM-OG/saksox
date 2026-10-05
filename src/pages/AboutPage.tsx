import React from 'react';
import { Sparkles, Compass, ShieldCheck, Droplets, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
  onNavigateToFragrances: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToShop,
  onNavigateToFragrances
}) => {
  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-28">
      {/* Editorial Hero */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0c0e14] border-b border-[#1e222a] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80"
            alt="SAKSOX House"
            className="w-full h-full object-cover filter contrast-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#dfbe7d] uppercase">
            THE SAKSOX GENESIS
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide uppercase mt-2">
            “WEAR THE MOOD. <br />
            <span className="italic text-gradient-gold">OWN THE MOMENT.”</span>
          </h1>
          <p className="text-sm sm:text-base text-[#b7becd] font-light mt-5 leading-relaxed max-w-2xl mx-auto">
            SAKSOX was born from a singular obsession: the sensory duality of freezing winter air and electrifying human warmth.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
              01 / FASHION & STREET CULTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1 mb-4">
              Heavyweight Architecture, Zero Compromise.
            </h2>
            <p className="text-xs sm:text-sm text-[#88909e] leading-relaxed mb-4">
              We rejected the flimsy, paper-thin winter wear dominating mass retail. Every SAKSOX garment begins with substance: 500 GSM loopback cotton, RDS-certified thermal goose down, welded Japanese ripstops, and sculptural silhouettes built for sub-zero urban streets.
            </p>
            <p className="text-xs sm:text-sm text-[#88909e] leading-relaxed">
              Boxy drops, stiff standing hoods, and functional tactical utility designed specifically for India’s brisk winters — from Delhi’s fog-laden nights to Manali’s snow peaks.
            </p>
          </div>
          <div className="aspect-[4/5] bg-[#12141a] overflow-hidden border border-[#212632]">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
              alt="Heavyweight down"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2">
            <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
              02 / THE OLFACTORY ATELIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1 mb-4">
              Haute Parfumerie for the Nocturnal Soul.
            </h2>
            <p className="text-xs sm:text-sm text-[#88909e] leading-relaxed mb-4">
              A winter fit is incomplete without an invisible armor. Our scents are conceived in Grasse, France, and handcrafted in New Delhi. We brew Extraits de Parfum with up to 30% oil concentration, macerated for 90 days.
            </p>
            <p className="text-xs sm:text-sm text-[#88909e] leading-relaxed">
              No chemical screech. Just intoxicating smoked tonka, black leather, Mysore sandalwood, and velvety saffron roses that cling to your heavy wool coats for 48 hours.
            </p>
          </div>
          <div className="md:order-1 aspect-[4/5] bg-[#12141a] overflow-hidden border border-[#212632]">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
              alt="Perfumery"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#1f232d]">
          <div className="p-6 bg-[#111319] border border-[#212632]">
            <span className="text-xl mb-3 block">⚡</span>
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-2">
              Gen Z Self-Expression
            </h3>
            <p className="text-xs text-[#88909e] leading-relaxed">
              Fashion that speaks without shouting. Bold, minimal, fluid, and unapologetic.
            </p>
          </div>

          <div className="p-6 bg-[#111319] border border-[#212632]">
            <span className="text-xl mb-3 block">❄️</span>
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-2">
              Engineered For Cold
            </h3>
            <p className="text-xs text-[#88909e] leading-relaxed">
              Tested for real sub-zero thermal retention and wind-stopping performance.
            </p>
          </div>

          <div className="p-6 bg-[#111319] border border-[#212632]">
            <span className="text-xl mb-3 block">⚜️</span>
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-2">
              Accessible Luxury
            </h3>
            <p className="text-xs text-[#88909e] leading-relaxed">
              Direct-to-consumer architecture in India. Premium craft without arbitrary retail markups.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="text-center pt-10">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToShop}
              className="px-8 py-3.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-widest transition-all"
            >
              Shop Current Season
            </button>
            <button
              onClick={onNavigateToFragrances}
              className="px-8 py-3.5 bg-[#171a24] hover:bg-[#232734] border border-[#272d3b] text-white text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Explore Fragrance Atelier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
