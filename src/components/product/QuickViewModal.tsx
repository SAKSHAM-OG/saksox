import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToDetail: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigateToDetail
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor || undefined, quantity);
    onClose();
  };

  const handleGoToFullPage = () => {
    onClose();
    onNavigateToDetail(product.slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex flex-col md:flex-row max-h-[90vh] w-full max-w-4xl overflow-hidden bg-[#121419] border border-[#262c38] shadow-2xl text-[#f5f3ef]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center bg-[#0a0b0d]/70 text-[#88909e] hover:text-white hover:bg-black border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Gallery / Left Side */}
        <div className="flex flex-col md:w-1/2 bg-[#0c0d10] p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#222731]">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#14161c]">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-16 w-14 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-[#c9a96e]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details / Right Side */}
        <div className="flex flex-col flex-1 p-5 md:p-8 overflow-y-auto max-h-[85vh]">
          {/* Tag & Category */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c9a96e] mb-1 font-mono">
            <span>{product.category}</span>
            <span>•</span>
            <span className="text-[#88909e]">{product.subcategory}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-serif font-medium tracking-wide text-white mb-2">
            {product.name}
          </h2>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 text-sm text-[#88909e] mb-4">
            <div className="flex items-center gap-1 text-[#dfbe7d]">
              <Star className="h-4 w-4 fill-[#dfbe7d] text-[#dfbe7d]" />
              <span className="font-semibold text-white">{product.rating}</span>
            </div>
            <span>•</span>
            <span>{product.reviewsCount} verified reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-white tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-[#6f7684] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-[#22c55e] font-medium bg-[#22c55e]/10 px-2 py-0.5 border border-[#22c55e]/20">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-[#a2a9b7] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Perfume specific notes preview */}
          {product.category === 'fragrances' && product.fragranceNotes && (
            <div className="mb-6 bg-[#181a22] border border-[#272d3a] p-3 text-xs space-y-1.5">
              <div className="text-[11px] font-semibold text-[#c9a96e] uppercase tracking-wider">
                Olfactory Notes Pyramid
              </div>
              <div className="text-[#c1c7d2]">
                <strong className="text-white">Top:</strong> {product.fragranceNotes.top.join(', ')}
              </div>
              <div className="text-[#c1c7d2]">
                <strong className="text-white">Heart:</strong> {product.fragranceNotes.heart.join(', ')}
              </div>
              <div className="text-[#c1c7d2]">
                <strong className="text-white">Base:</strong> {product.fragranceNotes.base.join(', ')}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <div className="text-xs uppercase tracking-wider text-[#88909e] mb-2 font-medium">
                Color: <span className="text-white">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`h-7 w-7 rounded-full border-2 transition-transform ${
                      selectedColor === c.name ? 'border-[#c9a96e] scale-110' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#88909e] mb-2 font-medium">
              <span>{product.category === 'fragrances' ? 'Bottle Size' : 'Select Size'}:</span>
              <span className="text-white font-mono">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-12 px-3 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${
                    selectedSize === sz
                      ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e]'
                      : 'bg-[#15171e] text-white border-[#272d3a] hover:border-white/40'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#272d3a] bg-[#15171e]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-[#88909e] hover:text-white text-base transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-[#88909e] hover:text-white text-base transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-12 w-12 items-center justify-center border transition-colors ${
                  isFavorited
                    ? 'border-[#e11d48] bg-[#e11d48]/10 text-[#e11d48]'
                    : 'border-[#272d3a] bg-[#15171e] text-white hover:text-[#c9a96e]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* View Full Product Details Link */}
            <button
              onClick={handleGoToFullPage}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#88909e] hover:text-[#c9a96e] transition-colors"
            >
              <span>View complete product page & reviews</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
