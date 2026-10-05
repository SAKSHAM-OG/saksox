import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToCart: () => void;
  onNavigateToDetail: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToCart,
  onNavigateToDetail
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
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    addToCart
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 1999;
  const freeShippingDiff = freeShippingThreshold - subtotal;
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  // Cross-sell items that are not in cart
  const crossSellProducts = PRODUCTS.filter(
    (p) => !cart.some((item) => item.product.id === p.id) && (p.isBestSeller || p.id === 'frag-11' || p.id === 'acc-01')
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#111317] border-l border-[#242832] text-[#f5f3ef] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#242832] bg-[#0c0d10]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#c9a96e]" />
              <h2 className="text-base font-serif tracking-wider font-semibold uppercase">
                Your Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#88909e] hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-[#16181e] border-b border-[#242832]">
            <div className="flex justify-between text-xs mb-1.5">
              {freeShippingDiff > 0 ? (
                <span className="text-[#a2a9b7]">
                  Add <strong className="text-[#dfbe7d]">₹{freeShippingDiff.toLocaleString('en-IN')}</strong> for Free Express Shipping
                </span>
              ) : (
                <span className="text-[#22c55e] font-semibold flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Congratulations! You unlocked Free Express Shipping
                </span>
              )}
              <span className="text-[11px] font-mono text-[#88909e]">{freeShippingPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#242832] overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-[#c9a96e] to-[#dfbe7d] transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="h-12 w-12 text-[#343a47] mb-3" />
                <p className="text-sm font-medium text-white mb-1">Your cart is empty</p>
                <p className="text-xs text-[#88909e] max-w-xs mb-4">
                  Winter drops and signature scents are moving fast. Find your pieces today.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#16181f] p-3 border border-[#232731] transition-all hover:border-[#333a49]"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      onNavigateToDetail(item.product.slug);
                    }}
                    className="h-20 w-16 flex-shrink-0 bg-[#0c0d10] cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            onNavigateToDetail(item.product.slug);
                          }}
                          className="text-xs font-medium text-white hover:text-[#c9a96e] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#646a78] hover:text-[#e11d48] ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#88909e] mt-1">
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <>
                            <span>•</span>
                            <span>{item.selectedColor}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#232731]">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#292e3a] bg-[#0c0d10]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#88909e] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#88909e] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-semibold text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* YOU MAY ALSO LIKE cross-sells */}
            {crossSellProducts.length > 0 && cart.length > 0 && (
              <div className="pt-4 mt-4 border-t border-[#232731]">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#88909e] mb-3">
                  You May Also Like
                </h4>
                <div className="space-y-2">
                  {crossSellProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-[#14161c] p-2 border border-[#222631]"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-10 w-8 object-cover"
                        />
                        <div className="text-left">
                          <p className="text-[11px] font-medium text-white line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-[#c9a96e]">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors?.[0]?.name, 1)}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#222733] hover:bg-[#c9a96e] hover:text-[#0a0b0d] text-white transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#0d0e12] border-t border-[#242832] space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#17221b] border border-[#22c55e]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#22c55e]">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#88909e] hover:text-[#e11d48]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon (e.g. WELCOME10)"
                    className="flex-1 bg-[#16181f] border border-[#2a2f3c] px-3 py-1.5 text-xs text-white uppercase placeholder:normal-case placeholder:text-[#5d6371] focus:outline-none focus:border-[#c9a96e]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#252a36] hover:bg-[#343b4c] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-[#e11d48]">{couponError}</p>}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-[#a2a9b7] pt-2 border-t border-[#242832]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#22c55e]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shippingFee === 0 ? (
                      <span className="text-[#22c55e]">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#242832]">
                  <span>Total</span>
                  <span className="text-base text-[#dfbe7d]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigateToCheckout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigateToCart();
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-[#88909e] hover:text-white uppercase tracking-wider transition-colors"
                >
                  View Full Cart
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#636977] pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c9a96e]" />
                <span>100% Secure Checkout • Official SAKSOX Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
