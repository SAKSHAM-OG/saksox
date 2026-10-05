import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Droplets,
  Layers,
  MessageSquarePlus
} from 'lucide-react';
import { Product, Review } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { INITIAL_REVIEWS } from '../data/reviews';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductDetailPageProps {
  product: Product;
  onNavigateToDetail: (slug: string) => void;
  onNavigateToCheckout: () => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigateToDetail,
  onNavigateToCheckout,
  onOpenSizeGuide
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);

  // PIN code checker state
  const [pincode, setPincode] = useState('110001');
  const [pincodeResult, setPincodeResult] = useState<{
    checked: boolean;
    available: boolean;
    estimate: string;
    city: string;
  }>({
    checked: true,
    available: true,
    estimate: 'Delivered in 2 business days (Express Air)',
    city: 'New Delhi / NCR'
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    return INITIAL_REVIEWS.filter((r) => r.productId === product.id).concat(
      INITIAL_REVIEWS.filter((r) => r.productId !== product.id).slice(0, 2)
    );
  });
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeResult({
        checked: true,
        available: false,
        estimate: 'Please enter a valid 6-digit Indian PIN code',
        city: ''
      });
      return;
    }

    const firstDigit = cleanPin[0];
    let city = 'Metro Hub';
    let days = '2-3 Business Days';

    if (firstDigit === '1') {
      city = 'Delhi NCR / North India';
      days = 'Next-Day Delivery';
    } else if (firstDigit === '4') {
      city = 'Mumbai / Maharashtra Hub';
      days = '2 Business Days';
    } else if (firstDigit === '5') {
      city = 'Bengaluru / Hyderabad / South';
      days = '2 Business Days';
    } else if (firstDigit === '7') {
      city = 'Kolkata / East India';
      days = '3 Business Days';
    }

    setPincodeResult({
      checked: true,
      available: true,
      estimate: `Guaranteed delivery by ${days} via BlueDart / Delhivery Air`,
      city
    });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor || undefined, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor || undefined, quantity);
    onNavigateToCheckout();
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const addedReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      city: newReviewCity || 'India',
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle || 'Exquisite quality',
      comment: newReviewComment,
      verified: true
    };

    setReviews([addedReview, ...reviews]);
    setIsWritingReview(false);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#1b1e26] text-xs text-[#88909e] flex items-center gap-2">
        <a href="#/" className="hover:text-white transition-colors">
          Home
        </a>
        <ChevronRight className="h-3 w-3" />
        <a href={`#/shop?cat=${product.category}`} className="hover:text-white capitalize transition-colors">
          {product.category}
        </a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ==================== LEFT: IMAGE GALLERY (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[680px] pb-2 sm:pb-0 scrollbar-none flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-20 w-16 sm:h-24 sm:w-20 overflow-hidden bg-[#121419] border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#c9a96e]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Big Main Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#101217] overflow-hidden border border-[#212632]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />

              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                  {product.discount}% OFF
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 h-10 w-10 bg-[#0b0c0e]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black transition-all"
                aria-label="Wishlist"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-[#e11d48] text-[#e11d48]' : ''}`} />
              </button>
            </div>
          </div>

          {/* ==================== RIGHT: PRODUCT DETAILS & BUY (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category / Subcategory & Drop Tag */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#dfbe7d] mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-[#88909e]">{product.subcategory}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mb-3">
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-2 text-xs text-[#88909e] mb-4 pb-4 border-b border-[#212632]">
              <div className="flex items-center gap-1 text-[#dfbe7d]">
                <Star className="h-4 w-4 fill-[#dfbe7d] text-[#dfbe7d]" />
                <span className="font-semibold text-white">{product.rating}</span>
              </div>
              <span>•</span>
              <a href="#reviews-section" className="hover:text-white underline font-mono">
                {product.reviewsCount} customer reviews
              </a>
              {product.inStock ? (
                <span className="ml-auto inline-flex items-center gap-1 text-[#22c55e] text-[11px] font-semibold">
                  <Check className="h-3 w-3" /> In Stock
                </span>
              ) : (
                <span className="ml-auto text-[#e11d48] text-[11px] font-semibold">Sold Out</span>
              )}
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-white tracking-tight font-sans">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-[#6d7483] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 border border-[#22c55e]/20 font-mono">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[#717887] -mt-2 mb-6">
              Inclusive of all taxes. Free express shipping applied at checkout.
            </p>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#c5cbd6] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* ================= IF PERFUME: LUXURY OLFACTORY ACCORD ================= */}
            {product.category === 'fragrances' && (
              <div className="mb-6 p-4 bg-[#12141b] border border-[#262c3b] space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#212632]">
                  <span className="text-[#dfbe7d] font-mono uppercase font-semibold flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5" />
                    Olfactory Formulation
                  </span>
                  <span className="text-[#88909e] font-mono text-[11px]">
                    {product.concentration || 'Extrait de Parfum'}
                  </span>
                </div>

                {product.fragranceNotes && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex gap-2">
                      <strong className="text-white min-w-14">Top:</strong>
                      <span className="text-[#a2a9b7]">{product.fragranceNotes.top.join(', ')}</span>
                    </div>
                    <div className="flex gap-2">
                      <strong className="text-white min-w-14">Heart:</strong>
                      <span className="text-[#a2a9b7]">{product.fragranceNotes.heart.join(', ')}</span>
                    </div>
                    <div className="flex gap-2">
                      <strong className="text-white min-w-14">Base:</strong>
                      <span className="text-[#a2a9b7]">{product.fragranceNotes.base.join(', ')}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#212632] text-[11px] text-[#88909e]">
                  <div>
                    <span className="text-white block font-medium">Longevity:</span>
                    <span>{product.longevity || '12-14 Hours'}</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">Sillage:</span>
                    <span>{product.sillage || 'Intense Magnetic Trail'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= COLOR SELECTOR ================= */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex justify-between text-xs uppercase tracking-wider text-[#88909e] mb-2 font-medium">
                  <span>Color: <strong className="text-white">{selectedColor}</strong></span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${
                        selectedColor === c.name
                          ? 'border-[#dfbe7d] scale-110 shadow-lg'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================= SIZE SELECTOR ================= */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider text-[#88909e] mb-2 font-medium">
                <span>
                  {product.category === 'fragrances' ? 'Flacon Size:' : 'Select Size:'}{' '}
                  <strong className="text-white font-mono">{selectedSize}</strong>
                </span>
                {product.category !== 'fragrances' && (
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[#dfbe7d] hover:underline normal-case tracking-normal text-xs"
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#c9a96e] text-[#0a0b0d] border-[#c9a96e] font-bold shadow-lg'
                        : 'bg-[#14161f] text-white border-[#272d3b] hover:border-white/40'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= QUANTITY & ACTION BUTTONS ================= */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#272d3b] bg-[#14161f]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-[#88909e] hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-semibold min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-3 text-[#88909e] hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="py-3.5 px-6 bg-[#f5f3ef] hover:bg-white text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all"
              >
                Buy Now
              </button>
            </div>

            {/* ================= PINCODE ESTIMATOR ================= */}
            <div className="mb-6 p-4 bg-[#111318] border border-[#212632]">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-white mb-2">
                <span className="flex items-center gap-1.5 text-[#dfbe7d]">
                  <Truck className="h-3.5 w-3.5" /> Delivery Estimate
                </span>
                <span className="text-[10px] text-[#717887] font-mono">INDIA EXPRESS</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN Code"
                  className="flex-1 bg-[#171922] border border-[#292f3e] px-3 py-1.5 text-xs text-white placeholder:text-[#525764] focus:outline-none focus:border-[#c9a96e]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#252a36] hover:bg-[#343b4c] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeResult.checked && (
                <div className="mt-2 text-xs">
                  {pincodeResult.available ? (
                    <p className="text-[#22c55e] flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>{pincodeResult.estimate} ({pincodeResult.city})</span>
                    </p>
                  ) : (
                    <p className="text-[#e11d48]">{pincodeResult.estimate}</p>
                  )}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#212632] text-center text-[10px] text-[#88909e]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#c9a96e]" />
                <span>Complimentary Delivery &gt; ₹1,999</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-[#c9a96e]" />
                <span>7-Day Doorstep Exchange</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#c9a96e]" />
                <span>100% Genuine Atelier Stock</span>
              </div>
            </div>

            {/* Accordions / Materials & Care */}
            <div className="mt-6 space-y-4 text-xs text-[#a2a9b7]">
              <div>
                <h3 className="font-semibold text-white uppercase tracking-wider text-xs mb-1">
                  Product Details & Architecture
                </h3>
                <ul className="list-disc pl-4 space-y-1">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {product.materials && (
                <div>
                  <h3 className="font-semibold text-white uppercase tracking-wider text-xs mb-1">
                    Composition & Care
                  </h3>
                  <p>{product.materials}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================== REVIEWS SECTION ==================== */}
        <section id="reviews-section" className="mt-20 pt-12 border-t border-[#1f232d]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
                COMMUNITY FEEDBACK
              </span>
              <h2 className="text-2xl font-serif text-white tracking-wide mt-0.5">
                Verified Reviews ({reviews.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="px-4 py-2 bg-[#181a24] hover:bg-[#252938] border border-[#2b3142] text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center gap-2 self-start"
            >
              <MessageSquarePlus className="h-4 w-4 text-[#c9a96e]" />
              <span>{isWritingReview ? 'Cancel Review' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Write Review Form */}
          {isWritingReview && (
            <form
              onSubmit={handleAddReview}
              className="bg-[#12141a] border border-[#252b38] p-5 mb-8 space-y-3 max-w-xl"
            >
              <h3 className="text-sm font-semibold text-white">Share your experience</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="bg-[#171922] border border-[#272d3b] p-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                />
                <input
                  type="text"
                  placeholder="City (e.g. New Delhi)"
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  className="bg-[#171922] border border-[#272d3b] p-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span>Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setNewReviewRating(r)}
                      className="p-1"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          r <= newReviewRating
                            ? 'fill-[#dfbe7d] text-[#dfbe7d]'
                            : 'text-[#3c4250]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Review Headline (e.g., Unreal quality and fit)"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                className="w-full bg-[#171922] border border-[#272d3b] p-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
              />

              <textarea
                required
                rows={3}
                placeholder="Write your review..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full bg-[#171922] border border-[#272d3b] p-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
              />

              <button
                type="submit"
                className="px-5 py-2 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#12141a] border border-[#212632] p-5 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1 text-[#dfbe7d]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < rev.rating
                            ? 'fill-[#dfbe7d] text-[#dfbe7d]'
                            : 'text-[#323642]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#6d7483]">{rev.date}</span>
                </div>

                <h4 className="text-xs font-semibold text-white">{rev.title}</h4>
                <p className="text-xs text-[#a2a9b7] leading-relaxed">{rev.comment}</p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#6d7483] border-t border-[#1d212b]">
                  <span className="font-medium text-white">{rev.author}, {rev.city}</span>
                  {rev.verified && (
                    <span className="text-[#22c55e] flex items-center gap-1 font-mono text-[10px]">
                      <Check className="h-3 w-3" /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== RELATED PRODUCTS ==================== */}
        <section className="mt-20 pt-12 border-t border-[#1f232d]">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
                COMPLETE THE SYNERGY
              </span>
              <h2 className="text-2xl font-serif text-white tracking-wide mt-0.5">
                Related Pieces
              </h2>
            </div>
            <button
              onClick={() => onNavigateToDetail(relatedProducts[0]?.slug || '')}
              className="text-xs text-[#dfbe7d] hover:underline uppercase font-mono"
            >
              Explore Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigateToDetail={onNavigateToDetail}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
