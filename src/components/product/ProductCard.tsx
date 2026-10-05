import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Sparkles, ArrowLeftRight } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onNavigateToDetail?: (slug: string) => void;
  onToggleCompare?: (product: Product) => void;
  isComparing?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigateToDetail,
  onToggleCompare,
  isComparing
}) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.no-card-nav')) {
      return;
    }
    if (onNavigateToDetail) {
      onNavigateToDetail(product.slug);
    } else {
      window.location.hash = `#/product/${product.slug}`;
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
    addToCart(product, selectedSize, defaultColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Switch image on hover if available
  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col bg-[#14161b] border transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 ${
        isComparing
          ? 'border-[#dfbe7d] ring-1 ring-[#dfbe7d] shadow-lg shadow-[#dfbe7d]/10'
          : 'border-[#232731] hover:border-[#383e4d]'
      }`}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d0e12]">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isComparing && (
            <span className="inline-flex items-center gap-1 bg-[#dfbe7d] text-[#0a0b0d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm">
              <ArrowLeftRight className="h-2.5 w-2.5" />
              Comparing
            </span>
          )}
          {product.isNewDrop && (
            <span className="inline-flex items-center gap-1 bg-[#0b0c0e]/90 backdrop-blur-md border border-[#c9a96e]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#dfbe7d]">
              <Sparkles className="h-2.5 w-2.5 text-[#dfbe7d]" />
              New Drop
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-[#b91c1c]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {product.discount}% OFF
            </span>
          )}
          {product.category === 'fragrances' && (
            <span className="bg-[#1b1e25]/90 border border-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#d6ccbe]">
              {product.fragranceFamily || 'EDP'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#0e1014]/75 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-black hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'fill-[#e11d48] text-[#e11d48]' : 'text-white/80 hover:text-white'
            }`}
          />
        </button>

        {/* Compare Toggle Button */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            aria-label={isComparing ? 'Remove from comparison' : 'Compare product'}
            title={isComparing ? 'Remove from comparison' : 'Compare product'}
            className={`absolute top-12 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md border transition-all hover:scale-110 active:scale-95 cursor-pointer ${
              isComparing
                ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] shadow-md ring-2 ring-[#dfbe7d]/40'
                : 'bg-[#0e1014]/75 border-white/10 text-white/80 hover:text-white hover:bg-black'
            }`}
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Quick View Button (hover reveal) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#111317]/90 hover:bg-[#1b1e26] border border-white/15 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[11px] font-semibold uppercase tracking-wider text-[#0a0b0d] transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4">
        {/* Subcategory & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[#88909e] mb-1">
          <span className="uppercase tracking-widest">{product.subcategory}</span>
          <div className="flex items-center gap-1 text-[#f5f3ef]">
            <Star className="h-3 w-3 fill-[#c9a96e] text-[#c9a96e]" />
            <span className="font-semibold text-xs">{product.rating}</span>
            <span className="text-[#88909e] text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-sans font-medium text-sm text-[#f5f3ef] tracking-wide line-clamp-1 mb-1 group-hover:text-[#dfbe7d] transition-colors">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-[12px] text-[#88909e] line-clamp-1 mb-3">
          {product.description}
        </p>

        {/* Price & Size / Color row */}
        <div className="mt-auto pt-2 border-t border-[#232731] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#f5f3ef] tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#6f7684] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Size or Fragrance volume badge */}
          <div className="text-[11px] text-[#88909e] border border-[#2b313d] px-1.5 py-0.5">
            {product.sizes[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
