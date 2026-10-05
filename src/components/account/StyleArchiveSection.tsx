import React, { useState, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  ShoppingBag,
  Trash2,
  Edit2,
  ArrowRight,
  ExternalLink,
  Plus,
  Check,
  Search,
  Tag,
  Clock,
  Shirt,
  Calendar,
  X
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { SavedOutfit, Product } from '../../types';

interface StyleArchiveSectionProps {
  onNavigateToDetail?: (slug: string) => void;
  onNavigateToBuilder?: () => void;
}

export const StyleArchiveSection: React.FC<StyleArchiveSectionProps> = ({
  onNavigateToDetail,
  onNavigateToBuilder
}) => {
  const {
    savedOutfits,
    removeSavedOutfit,
    updateSavedOutfitName,
    addToCart,
    showNotification,
    setActiveBuilderPresetOutfit
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingOutfitId, setEditingOutfitId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Handle navigate to builder with outfit loaded
  const handleOpenInBuilder = (outfit: SavedOutfit) => {
    setActiveBuilderPresetOutfit(outfit);
    if (onNavigateToBuilder) {
      onNavigateToBuilder();
    } else {
      window.location.hash = '#/look-builder';
    }
  };

  // One-click Add Entire 4-Piece Look to Bag
  const handleAddEntireLookToBag = (outfit: SavedOutfit) => {
    addToCart(outfit.jacket, outfit.jacket.sizes[1] || outfit.jacket.sizes[0]);
    addToCart(outfit.hoodie, outfit.hoodie.sizes[1] || outfit.hoodie.sizes[0]);
    addToCart(outfit.bottom, outfit.bottom.sizes[1] || outfit.bottom.sizes[0]);
    addToCart(outfit.perfume, outfit.perfume.sizes[0]);
    showNotification(`Complete "${outfit.name}" (4 Pieces) added to your shopping bag!`);
  };

  const handleStartRename = (outfit: SavedOutfit) => {
    setEditingOutfitId(outfit.id);
    setEditingName(outfit.name);
  };

  const handleSaveRename = (outfitId: string) => {
    if (editingName.trim()) {
      updateSavedOutfitName(outfitId, editingName.trim());
    }
    setEditingOutfitId(null);
  };

  // Filter outfits by search query
  const filteredOutfits = useMemo(() => {
    if (!searchQuery.trim()) return savedOutfits;
    const q = searchQuery.toLowerCase().trim();
    return savedOutfits.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.jacket.name.toLowerCase().includes(q) ||
        o.hoodie.name.toLowerCase().includes(q) ||
        o.bottom.name.toLowerCase().includes(q) ||
        o.perfume.name.toLowerCase().includes(q) ||
        (o.notes && o.notes.toLowerCase().includes(q)) ||
        (o.tags && o.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [savedOutfits, searchQuery]);

  // Aggregate stats
  const totalValuation = useMemo(() => {
    return savedOutfits.reduce((sum, o) => sum + o.discountedTotal, 0);
  }, [savedOutfits]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#111319] border border-[#212632] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-[#dfbe7d]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#dfbe7d]/10 border border-[#dfbe7d]/30 text-[#dfbe7d] text-[10px] font-mono uppercase font-bold tracking-wider">
                Atelier Lookbook
              </span>
              <span className="text-[11px] font-mono text-[#88909e]">• Complete The Look Archive</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight uppercase">
              Style Archive
            </h2>
            <p className="text-xs text-[#9aa0b0] leading-relaxed">
              Curated 4-piece winter silhouettes saved from your Outfit Builder. Review your seasonal
              layering concepts, add entire outfits to your bag with the 15% bundle discount, or re-open
              them in the studio.
            </p>
          </div>

          {/* Quick Metrics & Action */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-[#161822] border border-[#272d3d] p-3 text-center min-w-[110px]">
              <div className="text-[10px] font-mono uppercase text-[#88909e]">Curated Looks</div>
              <div className="text-lg font-bold font-mono text-[#dfbe7d] mt-0.5">
                {savedOutfits.length}
              </div>
            </div>

            <div className="bg-[#161822] border border-[#272d3d] p-3 text-center min-w-[125px]">
              <div className="text-[10px] font-mono uppercase text-[#88909e]">Archive Value</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                ₹{totalValuation.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => {
                if (onNavigateToBuilder) onNavigateToBuilder();
                else window.location.hash = '#/look-builder';
              }}
              className="px-4 py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              <span>Curate In Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar if user has multiple looks */}
      {savedOutfits.length > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="h-3.5 w-3.5 text-[#88909e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search looks by title, garment, or perfume..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111319] border border-[#212632] pl-8 pr-3 py-2 text-xs text-white placeholder-[#5d6575] focus:outline-none focus:border-[#dfbe7d]"
            />
          </div>

          <div className="text-[11px] font-mono text-[#88909e]">
            Showing {filteredOutfits.length} of {savedOutfits.length} saved looks
          </div>
        </div>
      )}

      {/* Outfits List / Empty State */}
      {savedOutfits.length === 0 ? (
        <div className="text-center py-20 bg-[#111319] border border-[#212632] px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#161924] border border-[#272e3e] flex items-center justify-center mx-auto text-[#dfbe7d]">
            <Layers className="h-8 w-8" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
              Your Style Archive is Empty
            </h3>
            <p className="text-xs text-[#88909e] leading-relaxed">
              Design your signature cold-weather ensembles using our 4-piece Complete The Look
              Builder. Save your favorite outerwear, knit, cargo, and extrait combinations here for quick
              access anytime.
            </p>
          </div>

          <button
            onClick={() => {
              if (onNavigateToBuilder) onNavigateToBuilder();
              else window.location.hash = '#/look-builder';
            }}
            className="px-6 py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-all"
          >
            Launch Outfit Builder
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOutfits.map((outfit) => {
            const pieces = [
              { label: 'Outerwear', product: outfit.jacket, step: '1' },
              { label: 'Heavy Layer', product: outfit.hoodie, step: '2' },
              { label: 'Bottom', product: outfit.bottom, step: '3' },
              { label: 'Scent Profile', product: outfit.perfume, step: '4' }
            ];

            const isEditing = editingOutfitId === outfit.id;

            return (
              <div
                key={outfit.id}
                className="bg-[#111319] border border-[#232836] rounded-sm overflow-hidden shadow-lg transition-all"
              >
                {/* Outfit Header */}
                <div className="p-4 sm:p-5 bg-[#141620] border-b border-[#212634] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="bg-[#0e1017] border border-[#dfbe7d] px-2.5 py-1 text-xs text-white font-mono flex-1 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(outfit.id)}
                          className="p-1.5 bg-[#dfbe7d] text-[#0a0b0d] hover:bg-[#c9a96e] cursor-pointer"
                          title="Save title"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingOutfitId(null)}
                          className="p-1.5 bg-[#1f2432] text-[#88909e] hover:text-white cursor-pointer"
                          title="Cancel"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-serif font-bold text-white uppercase tracking-wide">
                          {outfit.name}
                        </h3>
                        <button
                          onClick={() => handleStartRename(outfit)}
                          className="text-[#6d7585] hover:text-[#dfbe7d] transition-colors p-1 cursor-pointer"
                          title="Rename curated look"
                          aria-label={`Rename ${outfit.name}`}
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#88909e] font-mono">
                      <span>Saved on: {outfit.dateSaved}</span>
                      <span>•</span>
                      <span className="text-[#dfbe7d]">4 Curated Items</span>
                      {outfit.tags && outfit.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-[#88909e]">
                            Tags: {outfit.tags.join(', ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => handleOpenInBuilder(outfit)}
                      className="px-3 py-1.5 bg-[#171a24] hover:bg-[#202534] border border-[#293040] hover:border-[#dfbe7d]/50 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Load this combination into Outfit Builder to customize"
                    >
                      <Layers className="h-3.5 w-3.5 text-[#dfbe7d]" />
                      <span>Edit in Studio</span>
                    </button>

                    <button
                      onClick={() => removeSavedOutfit(outfit.id)}
                      className="p-1.5 bg-[#171a24] hover:bg-[#271920] border border-[#293040] hover:border-red-900/50 text-[#6a7182] hover:text-red-400 text-xs transition-colors cursor-pointer"
                      title="Remove from Style Archive"
                      aria-label="Remove outfit"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Optional Style Notes Callout */}
                {outfit.notes && (
                  <div className="px-5 py-2.5 bg-[#0e1017] border-b border-[#1c202c] text-xs font-mono text-[#a3abbd] flex items-center gap-2">
                    <span className="text-[#dfbe7d] font-bold text-[10px] uppercase">Notes:</span>
                    <span className="italic">{outfit.notes}</span>
                  </div>
                )}

                {/* 4-Piece Visual Grid */}
                <div className="p-4 sm:p-5 bg-[#0b0c10]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {pieces.map(({ label, product, step }) => (
                      <div
                        key={step}
                        className="bg-[#12141c] border border-[#202532] p-2.5 flex flex-col justify-between group hover:border-[#dfbe7d]/50 transition-all"
                      >
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-[#dfbe7d] mb-1.5">
                            <span>{label}</span>
                            <span className="text-[#555d70]">Step {step}</span>
                          </div>

                          <div
                            onClick={() =>
                              onNavigateToDetail && onNavigateToDetail(product.slug)
                            }
                            className="aspect-[3/4] bg-[#08090d] border border-[#1b1f2b] overflow-hidden cursor-pointer relative mb-2"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div
                            onClick={() =>
                              onNavigateToDetail && onNavigateToDetail(product.slug)
                            }
                            className="text-xs font-semibold text-white group-hover:text-[#dfbe7d] transition-colors truncate cursor-pointer"
                            title={product.name}
                          >
                            {product.name}
                          </div>
                        </div>

                        <div className="pt-2 mt-2 border-t border-[#1c202c] flex items-center justify-between text-xs font-mono">
                          <span className="text-[#88909e] text-[11px] capitalize truncate">
                            {product.subcategory || product.category}
                          </span>
                          <span className="font-bold text-white">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Pricing & Add to Bag CTA */}
                <div className="p-4 sm:p-5 bg-[#141620] border-t border-[#212634] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Price Calculations */}
                  <div className="flex flex-wrap items-baseline gap-3 text-xs font-mono">
                    <span className="text-[#88909e]">Individual Total:</span>
                    <span className="line-through text-[#6a7180]">
                      ₹{outfit.rawTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="px-2 py-0.5 bg-green-950/40 border border-green-800/40 text-green-400 text-[10px] font-bold">
                      15% Bundle Savings: -₹{outfit.savings.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-bold text-white ml-1">
                      Bundle Price:{' '}
                      <strong className="text-base text-[#dfbe7d]">
                        ₹{outfit.discountedTotal.toLocaleString('en-IN')}
                      </strong>
                    </span>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleOpenInBuilder(outfit)}
                      className="px-4 py-2.5 bg-[#1c202e] hover:bg-[#252c3e] border border-[#2d3648] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Tweak Look
                    </button>

                    <button
                      onClick={() => handleAddEntireLookToBag(outfit)}
                      className="px-5 py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add Entire 4-Piece Look to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
