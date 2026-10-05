import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Check,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Layers,
  FileText,
  X
} from 'lucide-react';
import { PRODUCTS, COMPLETE_THE_LOOK_BUNDLES } from '../data/products';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

export const OutfitBuilderPage: React.FC = () => {
  const {
    addToCart,
    showNotification,
    saveOutfit,
    activeBuilderPresetOutfit,
    setActiveBuilderPresetOutfit
  } = useShop();

  const jackets = PRODUCTS.filter((p) => p.subcategory === 'Winter Jackets');
  const hoodiesAndKnits = PRODUCTS.filter(
    (p) =>
      p.subcategory === 'Oversized Hoodies' ||
      p.subcategory === 'Oversized Sweaters' ||
      p.subcategory === 'Knitwear'
  );
  const bottoms = PRODUCTS.filter(
    (p) => p.subcategory === 'Cargo Pants' || p.subcategory === 'Co-ord Sets'
  );
  const perfumes = PRODUCTS.filter((p) => p.category === 'fragrances');

  // Currently selected items in the custom builder
  const [selectedJacket, setSelectedJacket] = useState<Product>(jackets[0]);
  const [selectedHoodie, setSelectedHoodie] = useState<Product>(hoodiesAndKnits[0]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(bottoms[0]);
  const [selectedPerfume, setSelectedPerfume] = useState<Product>(perfumes[0]);

  // Style Archive save dialog state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [outfitNotes, setOutfitNotes] = useState('');
  const [hasSavedCurrent, setHasSavedCurrent] = useState(false);

  // If opening an outfit from Style Archive, load it
  useEffect(() => {
    if (activeBuilderPresetOutfit) {
      setSelectedJacket(activeBuilderPresetOutfit.jacket);
      setSelectedHoodie(activeBuilderPresetOutfit.hoodie);
      setSelectedBottom(activeBuilderPresetOutfit.bottom);
      setSelectedPerfume(activeBuilderPresetOutfit.perfume);
      setOutfitName(activeBuilderPresetOutfit.name);
      // clear preset so user can freely edit
      setActiveBuilderPresetOutfit(null);
    }
  }, [activeBuilderPresetOutfit, setActiveBuilderPresetOutfit]);

  const rawTotal =
    selectedJacket.price + selectedHoodie.price + selectedBottom.price + selectedPerfume.price;

  const bundleDiscountPercent = 15;
  const discountedTotal = Math.round(rawTotal * (1 - bundleDiscountPercent / 100));
  const savings = rawTotal - discountedTotal;

  const handleAddBundleToCart = () => {
    addToCart(selectedJacket, selectedJacket.sizes[1] || selectedJacket.sizes[0]);
    addToCart(selectedHoodie, selectedHoodie.sizes[1] || selectedHoodie.sizes[0]);
    addToCart(selectedBottom, selectedBottom.sizes[1] || selectedBottom.sizes[0]);
    addToCart(selectedPerfume, selectedPerfume.sizes[0]);
    showNotification('Complete 4-Piece Winter Look added to your bag!');
  };

  const handleSaveToArchive = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name =
      outfitName.trim() ||
      `${selectedJacket.name.split(' ')[0]} × ${selectedPerfume.name} Look`;

    saveOutfit({
      name,
      jacket: selectedJacket,
      hoodie: selectedHoodie,
      bottom: selectedBottom,
      perfume: selectedPerfume,
      rawTotal,
      discountedTotal,
      savings,
      notes: outfitNotes.trim() || undefined,
      tags: [selectedJacket.category, selectedPerfume.fragranceFamily || 'Winter Luxe']
    });

    setHasSavedCurrent(true);
    setIsSaveModalOpen(false);
    setTimeout(() => setHasSavedCurrent(false), 3500);
  };

  const handleQuickPreset = (bundleId: string) => {
    const bundle = COMPLETE_THE_LOOK_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    const j = PRODUCTS.find((p) => p.id === bundle.jacketId);
    const h = PRODUCTS.find((p) => p.id === bundle.hoodieId);
    const b = PRODUCTS.find((p) => p.id === bundle.pantOrSkirtId);
    const pf = PRODUCTS.find((p) => p.id === bundle.perfumeId);
    if (j) setSelectedJacket(j);
    if (h) setSelectedHoodie(h);
    if (b) setSelectedBottom(b);
    if (pf) setSelectedPerfume(pf);
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-28">
      {/* Hero Header */}
      <div className="bg-[#0f1117] border-b border-[#212632] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
            GEN Z STUDIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-wide uppercase mt-1">
            COMPLETE THE LOOK BUILDER
          </h1>
          <p className="text-xs sm:text-sm text-[#88909e] max-w-xl mx-auto mt-2">
            Harmonize your winter presence. Select 1 Jacket + 1 Hoodie/Knit + 1 Bottom + 1 Signature Perfume and receive an automatic 15% bundle discount.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs text-[#6a7180] font-mono mr-2">Presets:</span>
            {COMPLETE_THE_LOOK_BUNDLES.map((b) => (
              <button
                key={b.id}
                onClick={() => handleQuickPreset(b.id)}
                className="px-3 py-1.5 bg-[#171a24] hover:bg-[#232838] border border-[#272d3d] text-xs text-[#dfbe7d] font-mono uppercase transition-colors"
              >
                {b.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: 4 Selected Items Display (5 COLS) */}
          <div className="lg:col-span-5 bg-[#12141a] border border-[#212632] p-6 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#212632] mb-4">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-white">
                Your Curated Look
              </h2>
              <span className="text-[11px] font-mono text-[#dfbe7d] bg-[#dfbe7d]/10 px-2 py-0.5 border border-[#dfbe7d]/30">
                15% Bundle Discount
              </span>
            </div>

            <div className="space-y-3">
              {[
                { title: '1. Outerwear', item: selectedJacket },
                { title: '2. Heavy Layer', item: selectedHoodie },
                { title: '3. Bottom', item: selectedBottom },
                { title: '4. Scent Profile', item: selectedPerfume }
              ].map(({ title, item }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-2 bg-[#171922] border border-[#262c3a]"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-16 w-14 object-cover flex-shrink-0 bg-[#0d0e12]"
                  />
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-mono uppercase text-[#dfbe7d]">
                      {title}
                    </span>
                    <h3 className="text-xs font-semibold text-white truncate">{item.name}</h3>
                    <span className="text-xs font-mono text-[#a2a9b7]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="mt-6 pt-4 border-t border-[#212632] space-y-1.5 text-xs text-[#88909e]">
              <div className="flex justify-between">
                <span>Individual Total:</span>
                <span className="line-through text-[#6a7180]">
                  ₹{rawTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#22c55e]">
                <span>15% Bundle Savings:</span>
                <span>-₹{savings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#212632]">
                <span>Complete Look Total:</span>
                <span className="text-[#dfbe7d]">
                  ₹{discountedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTA: Add To Bag */}
            <button
              onClick={handleAddBundleToCart}
              className="mt-6 w-full py-3.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add 4-Piece Look to Bag</span>
            </button>

            {/* CTA: Save to Style Archive */}
            <button
              onClick={() => {
                setOutfitName(`${selectedJacket.name.split(' ')[0]} × ${selectedPerfume.name} Ensemble`);
                setIsSaveModalOpen(true);
              }}
              className="mt-2.5 w-full py-3 bg-[#171922] hover:bg-[#202534] border border-[#2b3244] hover:border-[#dfbe7d]/50 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {hasSavedCurrent ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-[#dfbe7d]" />
                  <span className="text-[#dfbe7d]">Saved to Style Archive!</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 text-[#dfbe7d]" />
                  <span>Save to Style Archive</span>
                </>
              )}
            </button>

            <div className="mt-3 text-center">
              <a
                href="#/account"
                className="text-[11px] font-mono text-[#88909e] hover:text-[#dfbe7d] transition-colors inline-flex items-center gap-1"
              >
                <span>Access your saved looks in Account → Style Archive</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right: Component Selectors (7 COLS) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Jackets */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  Step 1: Choose Winter Outerwear
                </h3>
                <span className="text-xs text-[#88909e]">{jackets.length} options</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {jackets.slice(0, 6).map((j) => {
                  const isSelected = selectedJacket.id === j.id;
                  return (
                    <div
                      key={j.id}
                      onClick={() => setSelectedJacket(j)}
                      className={`p-2.5 bg-[#12141a] border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#c9a96e] ring-1 ring-[#c9a96e]'
                          : 'border-[#232733] hover:border-[#383f50]'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-[#0c0d10] mb-2 overflow-hidden">
                        <img src={j.images[0]} alt={j.name} className="h-full w-full object-cover" />
                      </div>
                      <h4 className="text-xs font-medium text-white truncate">{j.name}</h4>
                      <p className="text-xs font-semibold text-[#dfbe7d] mt-1">₹{j.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Hoodies / Knits */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  Step 2: Choose Heavyweight Layer
                </h3>
                <span className="text-xs text-[#88909e]">{hoodiesAndKnits.length} options</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hoodiesAndKnits.slice(0, 6).map((h) => {
                  const isSelected = selectedHoodie.id === h.id;
                  return (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHoodie(h)}
                      className={`p-2.5 bg-[#12141a] border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#c9a96e] ring-1 ring-[#c9a96e]'
                          : 'border-[#232733] hover:border-[#383f50]'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-[#0c0d10] mb-2 overflow-hidden">
                        <img src={h.images[0]} alt={h.name} className="h-full w-full object-cover" />
                      </div>
                      <h4 className="text-xs font-medium text-white truncate">{h.name}</h4>
                      <p className="text-xs font-semibold text-[#dfbe7d] mt-1">₹{h.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Bottoms */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  Step 3: Choose Trousers / Bottom
                </h3>
                <span className="text-xs text-[#88909e]">{bottoms.length} options</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bottoms.slice(0, 6).map((b) => {
                  const isSelected = selectedBottom.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBottom(b)}
                      className={`p-2.5 bg-[#12141a] border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#c9a96e] ring-1 ring-[#c9a96e]'
                          : 'border-[#232733] hover:border-[#383f50]'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-[#0c0d10] mb-2 overflow-hidden">
                        <img src={b.images[0]} alt={b.name} className="h-full w-full object-cover" />
                      </div>
                      <h4 className="text-xs font-medium text-white truncate">{b.name}</h4>
                      <p className="text-xs font-semibold text-[#dfbe7d] mt-1">₹{b.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Perfume */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  Step 4: Choose Signature Extrait Scent
                </h3>
                <span className="text-xs text-[#88909e]">{perfumes.length} options</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {perfumes.slice(0, 6).map((pf) => {
                  const isSelected = selectedPerfume.id === pf.id;
                  return (
                    <div
                      key={pf.id}
                      onClick={() => setSelectedPerfume(pf)}
                      className={`p-2.5 bg-[#12141a] border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#c9a96e] ring-1 ring-[#c9a96e]'
                          : 'border-[#232733] hover:border-[#383f50]'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-[#0c0d10] mb-2 overflow-hidden">
                        <img src={pf.images[0]} alt={pf.name} className="h-full w-full object-cover" />
                      </div>
                      <h4 className="text-xs font-medium text-white truncate">{pf.name}</h4>
                      <p className="text-xs font-semibold text-[#dfbe7d] mt-1">₹{pf.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save to Style Archive Modal Dialog */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#111319] border border-[#242b3a] shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#212634] mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-[#dfbe7d]" />
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                  Save to Style Archive
                </h3>
              </div>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="text-[#88909e] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveToArchive} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[11px] uppercase text-[#88909e] mb-1 font-semibold">
                  Curated Look Title
                </label>
                <input
                  type="text"
                  required
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  placeholder="e.g. Nordic Stealth Monochrome"
                  className="w-full bg-[#161822] border border-[#272d3d] p-2.5 text-white placeholder-[#555d70] focus:outline-none focus:border-[#dfbe7d]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase text-[#88909e] mb-1 font-semibold">
                  Style Notes & Occasion (Optional)
                </label>
                <textarea
                  rows={2}
                  value={outfitNotes}
                  onChange={(e) => setOutfitNotes(e.target.value)}
                  placeholder="e.g. For chilly evening dinners and weekend gallery walks..."
                  className="w-full bg-[#161822] border border-[#272d3d] p-2.5 text-white placeholder-[#555d70] focus:outline-none focus:border-[#dfbe7d]"
                />
              </div>

              {/* 4 Items Preview Summary */}
              <div className="p-3 bg-[#151722] border border-[#212634] space-y-1.5 text-[11px]">
                <div className="text-[10px] uppercase text-[#88909e]">Look Breakdown (4 Items):</div>
                <div className="text-white truncate">• {selectedJacket.name}</div>
                <div className="text-white truncate">• {selectedHoodie.name}</div>
                <div className="text-white truncate">• {selectedBottom.name}</div>
                <div className="text-white truncate">• {selectedPerfume.name}</div>
                <div className="pt-2 text-right text-xs font-bold text-[#dfbe7d]">
                  Bundle Total: ₹{discountedTotal.toLocaleString('en-IN')} (15% Off)
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 bg-[#171a24] hover:bg-[#202534] border border-[#262c3c] text-[#88909e] hover:text-white uppercase tracking-wider text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>Save Look</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
