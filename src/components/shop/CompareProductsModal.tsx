import React, { useState } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  Star,
  ArrowLeftRight,
  Sparkles,
  ExternalLink,
  Tag,
  ShieldCheck,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface CompareProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product1: Product | null;
  product2: Product | null;
  onRemoveProduct: (productId: string) => void;
  onNavigateToDetail?: (slug: string) => void;
  onSwapProduct?: (slot: 1 | 2, newProduct: Product) => void;
  allProducts?: Product[];
}

export const CompareProductsModal: React.FC<CompareProductsModalProps> = ({
  isOpen,
  onClose,
  product1,
  product2,
  onRemoveProduct,
  onNavigateToDetail,
  onSwapProduct,
  allProducts = []
}) => {
  const { addToCart, showNotification } = useShop();

  const [selectedSize1, setSelectedSize1] = useState<string>('');
  const [selectedSize2, setSelectedSize2] = useState<string>('');
  const [swappingSlot, setSwappingSlot] = useState<1 | 2 | null>(null);
  const [searchSwapQuery, setSearchSwapQuery] = useState('');

  // Keep sizes updated
  React.useEffect(() => {
    if (product1?.sizes?.[0]) setSelectedSize1(product1.sizes[0]);
    if (product2?.sizes?.[0]) setSelectedSize2(product2.sizes[0]);
  }, [product1, product2]);

  if (!isOpen || (!product1 && !product2)) return null;

  const handleAddToCart = (product: Product, size: string) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = product.colors?.[0]?.name;
    addToCart(product, chosenSize, chosenColor, 1);
    showNotification(`${product.name} (Size: ${chosenSize}) added to your bag!`);
  };

  const handleSelectSwap = (product: Product) => {
    if (swappingSlot && onSwapProduct) {
      onSwapProduct(swappingSlot, product);
    }
    setSwappingSlot(null);
    setSearchSwapQuery('');
  };

  // Price difference calculation
  const priceDiff =
    product1 && product2 ? Math.abs(product1.price - product2.price) : 0;
  const cheaperProduct =
    product1 && product2
      ? product1.price < product2.price
        ? product1
        : product2.price < product1.price
        ? product2
        : null
      : null;

  const hasFragrance =
    product1?.category === 'fragrances' || product2?.category === 'fragrances';

  const swapOptions = allProducts.filter(
    (p) =>
      p.id !== product1?.id &&
      p.id !== product2?.id &&
      (!searchSwapQuery ||
        p.name.toLowerCase().includes(searchSwapQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchSwapQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl bg-[#0c0d12] border border-[#232733] shadow-2xl text-[#f5f3ef] my-6 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#101218] border-b border-[#1f2430] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-[#dfbe7d]/10 border border-[#dfbe7d]/30 flex items-center justify-center text-[#dfbe7d]">
              <ArrowLeftRight className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide uppercase">
                Product Specification Comparison
              </h2>
              <p className="text-[11px] font-mono text-[#88909e]">
                Side-by-side technical breakdown, tailoring specs, and olfactory profiles
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#88909e] hover:text-white p-2 transition-colors cursor-pointer"
            aria-label="Close Comparison"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Difference Callout Banner (if both selected) */}
        {product1 && product2 && (
          <div className="px-5 py-2.5 bg-[#141722] border-b border-[#202534] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#a2a9ba] flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#dfbe7d]" />
              {cheaperProduct ? (
                <span>
                  Price Difference: <strong className="text-white">{cheaperProduct.name}</strong> is{' '}
                  <span className="text-[#22c55e] font-bold">
                    ₹{priceDiff.toLocaleString('en-IN')}
                  </span>{' '}
                  lower in price.
                </span>
              ) : (
                <span>Both items share identical pricing at ₹{product1.price.toLocaleString('en-IN')}.</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              {product1.rating !== product2.rating && (
                <span>
                  Higher Rated:{' '}
                  <strong className="text-[#dfbe7d]">
                    {product1.rating > product2.rating ? product1.name : product2.name} (★{' '}
                    {Math.max(product1.rating, product2.rating)})
                  </strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Main Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-8 flex-1">
          {/* Top Hero Product Columns */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {/* Slot 1 */}
            {product1 ? (
              <div className="bg-[#12141c] border border-[#222634] p-4 sm:p-5 flex flex-col justify-between relative group">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#88909e] uppercase mb-2">
                    <span className="text-[#dfbe7d] font-bold">Item 01</span>
                    {onSwapProduct && (
                      <button
                        type="button"
                        onClick={() => setSwappingSlot(1)}
                        className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Change Piece</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Image & Quick Link */}
                  <div
                    onClick={() => onNavigateToDetail && onNavigateToDetail(product1.slug)}
                    className="aspect-[3/4] max-h-60 sm:max-h-80 mx-auto w-full bg-[#090a0e] border border-[#1d212c] overflow-hidden mb-3.5 cursor-pointer relative"
                  >
                    <img
                      src={product1.images[0]}
                      alt={product1.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product1.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                        {product1.discount}% OFF
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => onNavigateToDetail && onNavigateToDetail(product1.slug)}
                    className="text-sm sm:text-base font-semibold text-white hover:text-[#dfbe7d] transition-colors cursor-pointer truncate mb-1"
                    title={product1.name}
                  >
                    {product1.name}
                  </h3>

                  <div className="text-xs text-[#88909e] font-mono capitalize mb-2">
                    {product1.subcategory} • {product1.gender}
                  </div>

                  {/* Price & Rating */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-bold text-[#dfbe7d]">
                      ₹{product1.price.toLocaleString('en-IN')}
                    </span>
                    {product1.originalPrice > product1.price && (
                      <span className="text-xs line-through text-[#6a7182]">
                        ₹{product1.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#88909e] mb-4">
                    <div className="flex items-center text-[#dfbe7d]">
                      <Star className="h-3.5 w-3.5 fill-[#dfbe7d]" />
                      <span className="font-bold ml-1 text-white">{product1.rating}</span>
                    </div>
                    <span>({product1.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Size Selector */}
                  {product1.sizes && product1.sizes.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-[10px] font-mono uppercase text-[#88909e] mb-1.5 font-semibold">
                        Select Size
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {product1.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSize1(s)}
                            className={`px-2.5 py-1 text-xs font-mono uppercase border transition-all cursor-pointer ${
                              selectedSize1 === s
                                ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] font-bold'
                                : 'bg-[#171a22] text-[#88909e] border-[#292f3e] hover:text-white hover:border-[#40495e]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="space-y-2 pt-2 border-t border-[#1d212c]">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product1, selectedSize1)}
                    className="w-full py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToDetail && onNavigateToDetail(product1.slug)}
                      className="flex-1 py-1.5 bg-[#171a22] hover:bg-[#212532] border border-[#272e3d] text-xs text-[#88909e] hover:text-white uppercase font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Product Page</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(product1.id)}
                      className="px-3 py-1.5 bg-[#171a22] hover:bg-red-950/40 border border-[#272e3d] hover:border-red-800 text-xs text-[#88909e] hover:text-red-400 font-mono transition-colors cursor-pointer"
                      title="Remove from comparison"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#12141c]/50 border-2 border-dashed border-[#242938] p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                <Layers className="h-8 w-8 text-[#555d70] mb-3" />
                <h4 className="text-sm font-semibold text-white uppercase font-mono mb-1">
                  Item Slot 01 Empty
                </h4>
                <p className="text-xs text-[#88909e] max-w-xs mb-4">
                  Select a product from the shop or pick from the catalog below to compare.
                </p>
                <button
                  type="button"
                  onClick={() => setSwappingSlot(1)}
                  className="px-4 py-2 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#2e3648] text-xs font-mono uppercase text-[#dfbe7d] cursor-pointer"
                >
                  Choose Product
                </button>
              </div>
            )}

            {/* Slot 2 */}
            {product2 ? (
              <div className="bg-[#12141c] border border-[#222634] p-4 sm:p-5 flex flex-col justify-between relative group">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#88909e] uppercase mb-2">
                    <span className="text-[#dfbe7d] font-bold">Item 02</span>
                    {onSwapProduct && (
                      <button
                        type="button"
                        onClick={() => setSwappingSlot(2)}
                        className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Change Piece</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Image & Quick Link */}
                  <div
                    onClick={() => onNavigateToDetail && onNavigateToDetail(product2.slug)}
                    className="aspect-[3/4] max-h-60 sm:max-h-80 mx-auto w-full bg-[#090a0e] border border-[#1d212c] overflow-hidden mb-3.5 cursor-pointer relative"
                  >
                    <img
                      src={product2.images[0]}
                      alt={product2.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product2.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                        {product2.discount}% OFF
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => onNavigateToDetail && onNavigateToDetail(product2.slug)}
                    className="text-sm sm:text-base font-semibold text-white hover:text-[#dfbe7d] transition-colors cursor-pointer truncate mb-1"
                    title={product2.name}
                  >
                    {product2.name}
                  </h3>

                  <div className="text-xs text-[#88909e] font-mono capitalize mb-2">
                    {product2.subcategory} • {product2.gender}
                  </div>

                  {/* Price & Rating */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-bold text-[#dfbe7d]">
                      ₹{product2.price.toLocaleString('en-IN')}
                    </span>
                    {product2.originalPrice > product2.price && (
                      <span className="text-xs line-through text-[#6a7182]">
                        ₹{product2.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#88909e] mb-4">
                    <div className="flex items-center text-[#dfbe7d]">
                      <Star className="h-3.5 w-3.5 fill-[#dfbe7d]" />
                      <span className="font-bold ml-1 text-white">{product2.rating}</span>
                    </div>
                    <span>({product2.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Size Selector */}
                  {product2.sizes && product2.sizes.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-[10px] font-mono uppercase text-[#88909e] mb-1.5 font-semibold">
                        Select Size
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {product2.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSize2(s)}
                            className={`px-2.5 py-1 text-xs font-mono uppercase border transition-all cursor-pointer ${
                              selectedSize2 === s
                                ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] font-bold'
                                : 'bg-[#171a22] text-[#88909e] border-[#292f3e] hover:text-white hover:border-[#40495e]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="space-y-2 pt-2 border-t border-[#1d212c]">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product2, selectedSize2)}
                    className="w-full py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToDetail && onNavigateToDetail(product2.slug)}
                      className="flex-1 py-1.5 bg-[#171a22] hover:bg-[#212532] border border-[#272e3d] text-xs text-[#88909e] hover:text-white uppercase font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Product Page</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(product2.id)}
                      className="px-3 py-1.5 bg-[#171a22] hover:bg-red-950/40 border border-[#272e3d] hover:border-red-800 text-xs text-[#88909e] hover:text-red-400 font-mono transition-colors cursor-pointer"
                      title="Remove from comparison"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#12141c]/50 border-2 border-dashed border-[#242938] p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                <Layers className="h-8 w-8 text-[#555d70] mb-3" />
                <h4 className="text-sm font-semibold text-white uppercase font-mono mb-1">
                  Item Slot 02 Empty
                </h4>
                <p className="text-xs text-[#88909e] max-w-xs mb-4">
                  Select a second piece from the shop to view the full side-by-side spec comparison.
                </p>
                <button
                  type="button"
                  onClick={() => setSwappingSlot(2)}
                  className="px-4 py-2 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#2e3648] text-xs font-mono uppercase text-[#dfbe7d] cursor-pointer"
                >
                  Choose Product
                </button>
              </div>
            )}
          </div>

          {/* Specifications Table (Side-by-Side Breakdown) */}
          {product1 && product2 && (
            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfbe7d] flex items-center gap-2">
                <span>Detailed Specification Analysis</span>
                <div className="h-px bg-[#202534] flex-1" />
              </h3>

              {/* SECTION 1: Essential Metrics */}
              <div className="bg-[#11131a] border border-[#202534] overflow-hidden">
                <div className="p-3 bg-[#151822] border-b border-[#202534] text-[11px] font-mono uppercase font-bold text-white tracking-wider">
                  Pricing & Commercials
                </div>
                <div className="divide-y divide-[#1c202a] text-xs font-mono">
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Selling Price</span>
                    <span className="font-bold text-white">₹{product1.price.toLocaleString('en-IN')}</span>
                    <span className="font-bold text-white">₹{product2.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Original MRP</span>
                    <span className="line-through text-[#686f80]">₹{product1.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="line-through text-[#686f80]">₹{product2.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Discount Offered</span>
                    <span className="text-[#22c55e] font-semibold">{product1.discount}% OFF</span>
                    <span className="text-[#22c55e] font-semibold">{product2.discount}% OFF</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Net Savings</span>
                    <span className="text-[#dfbe7d]">₹{(product1.originalPrice - product1.price).toLocaleString('en-IN')}</span>
                    <span className="text-[#dfbe7d]">₹{(product2.originalPrice - product2.price).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Stock Status</span>
                    <span className={product1.inStock ? 'text-green-400' : 'text-red-400'}>
                      {product1.inStock ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
                    </span>
                    <span className={product2.inStock ? 'text-green-400' : 'text-red-400'}>
                      {product2.inStock ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Material & Construction */}
              <div className="bg-[#11131a] border border-[#202534] overflow-hidden">
                <div className="p-3 bg-[#151822] border-b border-[#202534] text-[11px] font-mono uppercase font-bold text-white tracking-wider">
                  Material, Fabric & Silhouette
                </div>
                <div className="divide-y divide-[#1c202a] text-xs font-mono">
                  <div className="grid grid-cols-3 p-3 items-start">
                    <span className="text-[#88909e]">Materials & Weight</span>
                    <span className="text-white pr-2">{product1.materials || 'Luxury blend composition'}</span>
                    <span className="text-white pr-2">{product2.materials || 'Luxury blend composition'}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Gender / Fit Type</span>
                    <span className="text-white capitalize">{product1.gender} • Oversized Drape</span>
                    <span className="text-white capitalize">{product2.gender} • Oversized Drape</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-center">
                    <span className="text-[#88909e]">Winter Collection</span>
                    <span className="text-[#dfbe7d]">{product1.winterCollection || 'Winter Capsule 2026'}</span>
                    <span className="text-[#dfbe7d]">{product2.winterCollection || 'Winter Capsule 2026'}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-start">
                    <span className="text-[#88909e]">Colorways</span>
                    <div>
                      {product1.colors && product1.colors.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {product1.colors.map((c) => (
                            <span
                              key={c.name}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#171a22] border border-[#262c3b] text-[10px]"
                            >
                              <span
                                className="h-2 w-2 rounded-full border border-white/20"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-[#b1b8c8]">{c.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#6a7182]">Standard Monochrome</span>
                      )}
                    </div>
                    <div>
                      {product2.colors && product2.colors.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {product2.colors.map((c) => (
                            <span
                              key={c.name}
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#171a22] border border-[#262c3b] text-[10px]"
                            >
                              <span
                                className="h-2 w-2 rounded-full border border-white/20"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-[#b1b8c8]">{c.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#6a7182]">Standard Monochrome</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 p-3 items-start">
                    <span className="text-[#88909e]">Key Tailoring Details</span>
                    <ul className="text-white space-y-1 list-disc list-inside text-[11px] pr-2">
                      {product1.details?.slice(0, 4).map((d, i) => (
                        <li key={i} className="truncate">{d}</li>
                      ))}
                    </ul>
                    <ul className="text-white space-y-1 list-disc list-inside text-[11px] pr-2">
                      {product2.details?.slice(0, 4).map((d, i) => (
                        <li key={i} className="truncate">{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Olfactory Architecture (if either is fragrance) */}
              {hasFragrance && (
                <div className="bg-[#11131a] border border-[#202534] overflow-hidden">
                  <div className="p-3 bg-[#151822] border-b border-[#202534] text-[11px] font-mono uppercase font-bold text-white tracking-wider flex items-center justify-between">
                    <span>Olfactory Scent Diagnostics</span>
                    <span className="text-[10px] text-[#dfbe7d]">Extrait & EDP Profiles</span>
                  </div>
                  <div className="divide-y divide-[#1c202a] text-xs font-mono">
                    <div className="grid grid-cols-3 p-3 items-center">
                      <span className="text-[#88909e]">Fragrance Family</span>
                      <span className="text-white capitalize">{product1.fragranceFamily || 'N/A (Garment)'}</span>
                      <span className="text-white capitalize">{product2.fragranceFamily || 'N/A (Garment)'}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3 items-center">
                      <span className="text-[#88909e]">Concentration</span>
                      <span className="text-white">{product1.concentration || 'N/A'}</span>
                      <span className="text-white">{product2.concentration || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3 items-center">
                      <span className="text-[#88909e]">Longevity & Sillage</span>
                      <span className="text-[#dfbe7d]">{product1.longevity || 'N/A'}</span>
                      <span className="text-[#dfbe7d]">{product2.longevity || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3 items-start">
                      <span className="text-[#88909e]">Top / Heart / Base Notes</span>
                      <div>
                        {product1.fragranceNotes ? (
                          <div className="text-[11px] space-y-1">
                            <div><strong className="text-[#dfbe7d]">Top:</strong> {product1.fragranceNotes.top.join(', ')}</div>
                            <div><strong className="text-[#dfbe7d]">Heart:</strong> {product1.fragranceNotes.heart.join(', ')}</div>
                            <div><strong className="text-[#dfbe7d]">Base:</strong> {product1.fragranceNotes.base.join(', ')}</div>
                          </div>
                        ) : (
                          <span className="text-[#6a7182]">Non-Fragrance Apparel</span>
                        )}
                      </div>
                      <div>
                        {product2.fragranceNotes ? (
                          <div className="text-[11px] space-y-1">
                            <div><strong className="text-[#dfbe7d]">Top:</strong> {product2.fragranceNotes.top.join(', ')}</div>
                            <div><strong className="text-[#dfbe7d]">Heart:</strong> {product2.fragranceNotes.heart.join(', ')}</div>
                            <div><strong className="text-[#dfbe7d]">Base:</strong> {product2.fragranceNotes.base.join(', ')}</div>
                          </div>
                        ) : (
                          <span className="text-[#6a7182]">Non-Fragrance Apparel</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Swap / Change Product Popover Drawer */}
        {swappingSlot && (
          <div className="absolute inset-0 bg-[#0c0d12]/95 backdrop-blur-md z-30 flex flex-col p-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#212634] mb-4">
              <div>
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                  Select Replacement Piece for Slot 0{swappingSlot}
                </h3>
                <p className="text-xs text-[#88909e] font-mono">
                  Pick any apparel or fragrance item from the Saksox catalog
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSwappingSlot(null)}
                className="text-[#88909e] hover:text-white p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={searchSwapQuery}
                onChange={(e) => setSearchSwapQuery(e.target.value)}
                placeholder="Search catalog pieces by name or subcategory..."
                className="w-full bg-[#14161f] border border-[#272d3c] px-3.5 py-2.5 text-xs text-white placeholder-[#555d70] focus:outline-none focus:border-[#dfbe7d]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-y-auto flex-1 pr-1">
              {swapOptions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSwap(item)}
                  className="bg-[#12141c] border border-[#222735] hover:border-[#dfbe7d] p-2.5 cursor-pointer flex flex-col justify-between group transition-colors"
                >
                  <div>
                    <div className="aspect-[3/4] bg-[#090a0d] overflow-hidden mb-2">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#dfbe7d] transition-colors truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#88909e] capitalize truncate font-mono">
                      {item.subcategory}
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#1d222e] flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#dfbe7d]">₹{item.price}</span>
                    <span className="text-[10px] text-[#88909e]">Select</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
