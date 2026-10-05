import React, { useState } from 'react';
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

interface CartPageProps {
  onNavigateToCheckout: () => void;
  onNavigateToDetail: (slug: string) => void;
  onNavigateToShop: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToCheckout,
  onNavigateToDetail,
  onNavigateToShop
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponStatus(res.message);
    if (res.success) setCouponCode('');
  };

  const crossSell = PRODUCTS.filter(
    (p) => !cart.some((i) => i.product.id === p.id) && (p.isBestSeller || p.id === 'frag-11' || p.id === 'acc-01')
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] pb-28">
      {/* Header */}
      <div className="bg-[#111318] border-b border-[#212632] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
              BAG REVIEW
            </span>
            <h1 className="text-3xl font-serif text-white tracking-wide uppercase mt-1">
              Your Shopping Bag
            </h1>
          </div>
          <span className="text-xs font-mono text-[#88909e]">
            {cart.reduce((t, i) => t + i.quantity, 0)} Items
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#12141a] border border-[#212632] p-8 max-w-xl mx-auto">
            <ShoppingBag className="h-16 w-16 text-[#303544] mx-auto mb-4" />
            <h2 className="text-xl font-serif text-white mb-2">Your Bag is Empty</h2>
            <p className="text-xs text-[#88909e] mb-6 max-w-sm mx-auto">
              Our winter drop pieces and haute perfumes sell quickly. Explore the current season now.
            </p>
            <button
              onClick={onNavigateToShop}
              className="px-6 py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider"
            >
              Start Exploring SAKSOX
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Items List (8 COLS) */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 bg-[#12141a] border border-[#212632] p-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => onNavigateToDetail(item.product.slug)}
                      className="h-24 w-20 object-cover bg-[#0d0e12] cursor-pointer"
                    />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#dfbe7d]">
                        {item.product.subcategory}
                      </span>
                      <h3
                        onClick={() => onNavigateToDetail(item.product.slug)}
                        className="text-sm font-semibold text-white hover:text-[#dfbe7d] cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex gap-3 text-xs text-[#88909e] mt-1">
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-white mt-2">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1f232d]">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#262b3a] bg-[#161822]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-xs text-[#88909e] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-mono font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-xs text-[#88909e] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <span className="text-sm font-bold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#686f7e] hover:text-[#e11d48] p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary Box (4 COLS) */}
            <div className="lg:col-span-4 bg-[#12141a] border border-[#212632] p-6 h-fit space-y-4">
              <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-white pb-3 border-b border-[#212632]">
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div>
                {appliedCoupon ? (
                  <div className="p-3 bg-[#152119] border border-[#22c55e]/30 flex justify-between items-center text-xs">
                    <span className="text-[#22c55e] font-medium flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      Code: {appliedCoupon.code}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#88909e] hover:text-[#e11d48]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#161822] border border-[#282d3b] px-3 py-2 text-xs uppercase text-white placeholder:normal-case placeholder:text-[#505562] focus:outline-none focus:border-[#c9a96e]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#252a36] hover:bg-[#343b4c] text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponStatus && <p className="text-[11px] text-[#dfbe7d] mt-1.5">{couponStatus}</p>}
              </div>

              {/* Price Rows */}
              <div className="space-y-2 pt-2 border-t border-[#212632] text-xs text-[#88909e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#22c55e]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Delivery</span>
                  <span className="text-white">
                    {shippingFee === 0 ? <span className="text-[#22c55e]">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-[#212632]">
                  <span>Total Amount</span>
                  <span className="text-[#dfbe7d]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onNavigateToCheckout}
                className="w-full py-3.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#6d7483] pt-2">
                <ShieldCheck className="h-4 w-4 text-[#c9a96e]" />
                <span>Encrypted 256-Bit SSL Checkout • Razorpay Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* Cross-Sell Recommendations */}
        {cart.length > 0 && (
          <section className="mt-20 pt-10 border-t border-[#212632]">
            <h2 className="text-xl font-serif text-white tracking-wide mb-6">
              Complete Your Look
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {crossSell.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigateToDetail={onNavigateToDetail}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
