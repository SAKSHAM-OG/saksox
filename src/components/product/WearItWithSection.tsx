import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Plus,
  Check,
  Star,
  ExternalLink,
  Layers,
  Droplets,
  Tag
} from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

interface WearItWithSectionProps {
  currentProduct: Product;
  onNavigateToDetail: (slug: string) => void;
}

export const WearItWithSection: React.FC<WearItWithSectionProps> = ({
  currentProduct,
  onNavigateToDetail
}) => {
  const { addToCart, showNotification } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'fragrances' | 'accessories' | 'apparel'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  // Dynamic Suggestion Engine based on product category & tags
  const getSuggestions = (): Product[] => {
    const allExceptCurrent = PRODUCTS.filter((p) => p.id !== currentProduct.id);

    if (currentProduct.category === 'fragrances') {
      // Suggest high-end winter outerwear, heavy fleece, and accessories
      const luxuryGarments = allExceptCurrent.filter(
        (p) => p.category === 'men' || p.category === 'women'
      );
      const accessories = allExceptCurrent.filter((p) => p.category === 'accessories');

      // Sort by best sellers or matching mood
      const apparelPicks = luxuryGarments.slice(0, 3);
      const accessoryPicks = accessories.slice(0, 2);
      return [...apparelPicks, ...accessoryPicks];
    } else if (currentProduct.category === 'accessories') {
      // Suggest matching garments and signature fragrances
      const fragrances = allExceptCurrent.filter((p) => p.category === 'fragrances');
      const apparel = allExceptCurrent.filter(
        (p) => p.category === 'men' || p.category === 'women'
      );
      return [...fragrances.slice(0, 2), ...apparel.slice(0, 3)];
    } else {
      // Apparel (men or women): Suggest complementary Accessories + Haute Fragrances
      const fragrances = allExceptCurrent.filter((p) => p.category === 'fragrances');
      const accessories = allExceptCurrent.filter((p) => p.category === 'accessories');

      // Tailor fragrance choice to fragranceFamily if mentioned or pick best sellers
      const fragrancePicks = fragrances.slice(0, 2);
      const accessoryPicks = accessories.slice(0, 3);
      return [...accessoryPicks, ...fragrancePicks];
    }
  };

  const suggestions = getSuggestions();

  const filteredSuggestions = suggestions.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'fragrances') return item.category === 'fragrances';
    if (activeTab === 'accessories') return item.category === 'accessories';
    if (activeTab === 'apparel') return item.category === 'men' || item.category === 'women';
    return true;
  });

  // Stylist Pairing Notes generator based on combination
  const getPairingNote = (item: Product): string => {
    if (item.category === 'fragrances') {
      return `Olfactory Layer: The ${item.fragranceFamily || 'woody'} trail of ${item.name} adheres directly to natural fibers, developing a rich cold-air sillage.`;
    }
    if (item.category === 'accessories') {
      return `Silhouette Accent: Complements the structured volume and tone with textured winter insulation.`;
    }
    return `Architectural Layering: Pairs seamlessly under or over this piece for cold-weather temperature control.`;
  };

  const handleSelectSize = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleQuickAdd = (item: Product) => {
    const size = selectedSizes[item.id] || item.sizes[0] || 'Standard';
    const color = item.colors?.[0]?.name;
    addToCart(item, size, color, 1);
    showNotification(`${item.name} (Size: ${size}) added to your bag!`);
  };

  // Top Pairing Hero Bundle (Current Product + First Recommendation)
  const heroCompanion = suggestions[0];
  const bundleDiscountPercent = 10;
  const bundleRawPrice = heroCompanion ? currentProduct.price + heroCompanion.price : 0;
  const bundlePrice = Math.round(bundleRawPrice * (1 - bundleDiscountPercent / 100));
  const bundleSavings = bundleRawPrice - bundlePrice;

  const handleAddBundle = () => {
    if (!heroCompanion) return;

    // Add current product
    const size1 = currentProduct.sizes[0] || 'Standard';
    addToCart(currentProduct, size1, currentProduct.colors?.[0]?.name, 1);

    // Add companion product
    const size2 = selectedSizes[heroCompanion.id] || heroCompanion.sizes[0] || 'Standard';
    addToCart(heroCompanion, size2, heroCompanion.colors?.[0]?.name, 1);

    setIsBundleAdded(true);
    showNotification(`Pairing bundle added to bag with 10% synergy discount!`);
    setTimeout(() => setIsBundleAdded(false), 3000);
  };

  return (
    <section className="mt-20 pt-12 border-t border-[#1f232d]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CURATED ATELIER PAIRINGS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase">
            Wear It With
          </h2>
          <p className="text-xs text-[#88909e] mt-1 max-w-xl">
            {currentProduct.category === 'fragrances'
              ? 'Tactile winter outerwear and accessories engineered to capture and project this extrait formulation.'
              : 'Complementary haute fragrances and winter accessories tailored to complete this cold-weather look.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Pairings' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'fragrances', label: 'Scents' },
            { id: 'apparel', label: 'Apparel' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] font-bold'
                  : 'bg-[#131620] text-[#88909e] border-[#222838] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero "Complete The Pairing" Bundle Card */}
      {heroCompanion && (
        <div className="bg-[#11131b] border border-[#262d3e] p-5 sm:p-6 mb-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#dfbe7d]/15 border-l border-b border-[#dfbe7d]/30 text-[#dfbe7d] px-3 py-1 text-[10px] font-mono uppercase font-bold tracking-wider">
            Pairing Synergy • Save 10%
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Visual Pairing Duo */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Product 1: Current */}
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-black overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={currentProduct.images[0]}
                    alt={currentProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="max-w-[140px] sm:max-w-[170px]">
                  <span className="text-[10px] font-mono text-[#dfbe7d] uppercase block">This Piece</span>
                  <div className="text-xs font-semibold text-white truncate">{currentProduct.name}</div>
                  <div className="text-xs font-bold text-white font-mono mt-0.5">
                    ₹{currentProduct.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Plus Icon Divider */}
              <div className="h-8 w-8 rounded-full bg-[#1b1f2b] border border-[#2e374c] flex items-center justify-center text-[#dfbe7d] flex-shrink-0">
                <Plus className="h-4 w-4" />
              </div>

              {/* Product 2: Companion */}
              <div
                onClick={() => onNavigateToDetail(heroCompanion.slug)}
                className="flex items-center gap-3 cursor-pointer group/comp"
              >
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-black overflow-hidden flex-shrink-0 border border-white/10 group-hover/comp:border-[#dfbe7d] transition-colors">
                  <img
                    src={heroCompanion.images[0]}
                    alt={heroCompanion.name}
                    className="h-full w-full object-cover group-hover/comp:scale-105 transition-transform"
                  />
                </div>
                <div className="max-w-[140px] sm:max-w-[170px]">
                  <span className="text-[10px] font-mono text-[#88909e] uppercase block">Suggested Pairing</span>
                  <div className="text-xs font-semibold text-white group-hover/comp:text-[#dfbe7d] transition-colors truncate">
                    {heroCompanion.name}
                  </div>
                  <div className="text-xs font-bold text-[#dfbe7d] font-mono mt-0.5">
                    ₹{heroCompanion.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Bundle Price & Combined CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 border-[#1e2330] pt-4 lg:pt-0">
              <div>
                <div className="text-[11px] font-mono text-[#88909e]">Combined Pair Price:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-bold text-white font-mono">
                    ₹{bundlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs line-through text-[#666f80] font-mono">
                    ₹{bundleRawPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono text-[#22c55e] font-bold">
                    (Save ₹{bundleSavings.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#dfbe7d]/15"
              >
                {isBundleAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added Both to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add Pair to Bag (Save 10%)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Individual Complementary Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredSuggestions.map((item) => {
          const selectedSize = selectedSizes[item.id] || item.sizes[0] || 'Standard';
          const isFragrance = item.category === 'fragrances';

          return (
            <div
              key={item.id}
              className="bg-[#12141c] border border-[#222736] hover:border-[#dfbe7d]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Visual Thumbnail */}
                <div
                  onClick={() => onNavigateToDetail(item.slug)}
                  className="aspect-[3/4] w-full bg-[#0a0b0e] overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-[#0b0c10]/90 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-[#dfbe7d]">
                      {isFragrance ? item.fragranceFamily || 'Extrait' : item.subcategory}
                    </span>
                  </div>

                  {item.discount > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-[#b91c1c] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase font-mono">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between text-[11px] text-[#88909e] mb-1 font-mono">
                    <span className="capitalize">{item.category}</span>
                    <div className="flex items-center gap-1 text-[#dfbe7d]">
                      <Star className="h-3 w-3 fill-[#dfbe7d]" />
                      <span className="font-bold text-white text-xs">{item.rating}</span>
                    </div>
                  </div>

                  {/* Name */}
                  <h4
                    onClick={() => onNavigateToDetail(item.slug)}
                    className="text-sm font-semibold text-white group-hover:text-[#dfbe7d] transition-colors cursor-pointer truncate mb-1"
                    title={item.name}
                  >
                    {item.name}
                  </h4>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2.5 font-mono">
                    <span className="text-sm font-bold text-[#dfbe7d]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs line-through text-[#606775]">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Stylist Pairing Note */}
                  <div className="p-2 bg-[#161924] border border-[#232a3a] text-[10px] text-[#9ba3b5] leading-relaxed mb-3 font-mono">
                    {getPairingNote(item)}
                  </div>

                  {/* Sizes (if available) */}
                  {item.sizes && item.sizes.length > 1 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {item.sizes.slice(0, 4).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSelectSize(item.id, sz)}
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase border transition-colors cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] font-bold'
                                : 'bg-[#151720] text-[#88909e] border-[#252b39] hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(item)}
                  className="w-full py-2 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add To Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateToDetail(item.slug)}
                  className="w-full py-1.5 bg-[#171a23] hover:bg-[#202532] text-xs font-mono text-[#88909e] hover:text-white uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
