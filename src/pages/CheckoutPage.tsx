import React, { useState } from 'react';
import { ShieldCheck, Lock, Truck, CreditCard, Smartphone, Banknote, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';

interface CheckoutPageProps {
  onOrderSuccess: (order: Order) => void;
  onNavigateToCart: () => void;
}

const INDIAN_STATES = [
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Haryana',
  'Punjab',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Kerala',
  'Madhya Pradesh',
  'Goa',
  'Chandigarh',
  'Jammu & Kashmir',
  'Uttarakhand',
  'Himachal Pradesh',
  'Assam',
  'Bihar',
  'Jharkhand',
  'Odisha',
  'Chhattisgarh',
  'Andhra Pradesh'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderSuccess,
  onNavigateToCart
}) => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    placeOrder,
    user
  } = useShop();

  // Form Fields
  const [fullName, setFullName] = useState(user?.name || 'Aryan Varma');
  const [email, setEmail] = useState(user?.email || 'aryan.varma@saksox.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98112 45890');
  const [addressLine, setAddressLine] = useState(
    user?.savedAddresses[0]?.addressLine || 'A-42, Gulmohar Enclave, Near Hauz Khas'
  );
  const [landmark, setLandmark] = useState(user?.savedAddresses[0]?.landmark || 'Opposite Metro Gate 2');
  const [city, setCity] = useState(user?.savedAddresses[0]?.city || 'New Delhi');
  const [state, setState] = useState(user?.savedAddresses[0]?.state || 'Delhi');
  const [pincode, setPincode] = useState(user?.savedAddresses[0]?.pincode || '110016');

  // Delivery Speed
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'id'>('gpay');
  const [upiId, setUpiId] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] flex items-center justify-center p-6">
        <div className="text-center bg-[#111319] border border-[#232733] p-8 max-w-md">
          <h2 className="text-xl font-serif text-white mb-2">No Items in Cart</h2>
          <p className="text-xs text-[#88909e] mb-6">
            Please add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={onNavigateToCart}
            className="px-5 py-2.5 bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  const calculatedShipping = deliverySpeed === 'express' ? 149 : shippingFee;
  const finalPayable = totalAmount + (deliverySpeed === 'express' ? 149 : 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      name: fullName,
      phone,
      addressLine,
      landmark,
      city,
      state,
      pincode,
      isDefault: true
    };

    let paymentMethodName = 'UPI';
    if (paymentMethod === 'upi') {
      paymentMethodName = `UPI (${upiApp === 'gpay' ? 'Google Pay' : upiApp === 'phonepe' ? 'PhonePe' : upiApp === 'paytm' ? 'Paytm' : upiId || 'UPI ID'})`;
    } else if (paymentMethod === 'card') {
      paymentMethodName = 'Credit / Debit Card (Razorpay)';
    } else if (paymentMethod === 'netbanking') {
      paymentMethodName = 'Net Banking';
    } else {
      paymentMethodName = 'Cash on Delivery';
    }

    setTimeout(() => {
      const placed = placeOrder({
        items: cart,
        subtotal,
        discountAmount,
        shippingFee: calculatedShipping,
        totalAmount: finalPayable,
        couponCode: appliedCoupon?.code,
        paymentMethod: paymentMethodName,
        paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid',
        shippingAddress,
        estimatedDelivery: deliverySpeed === 'express' ? 'Tomorrow by 2:00 PM' : 'In 2-3 Business Days'
      });

      setIsProcessing(false);
      onOrderSuccess(placed);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-28">
      {/* Checkout Header */}
      <div className="bg-[#101218] border-b border-[#212632] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase">
              SAKSOX
            </span>
            <span className="text-[#3b4251]">|</span>
            <span className="text-xs uppercase tracking-widest text-[#dfbe7d] font-mono flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Secure 256-Bit SSL Checkout
            </span>
          </div>
          <button
            onClick={onNavigateToCart}
            className="text-xs text-[#88909e] hover:text-white uppercase font-mono"
          >
            ← Back to Bag
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ==================== LEFT: CONTACT, ADDRESS & PAYMENT (7 COLS) ==================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Details */}
            <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#212632] mb-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-[#6d7483]">For tracking updates via SMS & Email</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Mobile Phone (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Indian Shipping Address */}
            <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#212632] mb-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  2. Shipping Destination (India)
                </h2>
                <span className="text-[11px] text-[#6d7483]">Doorstep delivery</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Full Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Flat / House No. / Building / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                      State / UT *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a96e]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#151720] border border-[#272d3b] px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Speed */}
            <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d] pb-3 border-b border-[#212632] mb-4">
                3. Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliverySpeed === 'standard'
                      ? 'bg-[#181b24] border-[#dfbe7d]'
                      : 'bg-[#14161f] border-[#252a36] text-[#88909e]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white uppercase">
                      Standard Express Air
                    </span>
                    <span className="text-xs font-mono text-[#22c55e]">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#88909e]">
                    Estimated delivery in 2-3 business days via BlueDart
                  </p>
                </div>

                <div
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliverySpeed === 'express'
                      ? 'bg-[#181b24] border-[#dfbe7d]'
                      : 'bg-[#14161f] border-[#252a36] text-[#88909e]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white uppercase flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#dfbe7d]" /> Priority Air 24H
                    </span>
                    <span className="text-xs font-mono text-white">₹149</span>
                  </div>
                  <p className="text-[11px] text-[#88909e]">
                    Guaranteed next-day dispatch for high-priority winter drops
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Method (Structured for Razorpay / Indian Gateways) */}
            <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#212632] mb-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d]">
                  4. Payment Gateway (India)
                </h2>
                <span className="text-[11px] text-[#6d7483]">Razorpay Secured</span>
              </div>

              {/* Payment Type Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Lock },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 text-center border transition-all ${
                        isSelected
                          ? 'bg-[#1a1e29] border-[#dfbe7d] text-white'
                          : 'bg-[#14161f] border-[#252a36] text-[#88909e] hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 mx-auto mb-1.5" />
                      <span className="text-[11px] font-semibold uppercase block truncate">
                        {pm.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Sub-options */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-[#141720] border border-[#272d3b] space-y-3">
                  <span className="text-xs text-[#88909e] block font-medium">
                    Select your preferred UPI provider:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'gpay', label: 'Google Pay' },
                      { id: 'phonepe', label: 'PhonePe' },
                      { id: 'paytm', label: 'Paytm UPI' },
                      { id: 'id', label: 'Enter UPI ID / VPA' }
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                          upiApp === app.id
                            ? 'bg-[#dfbe7d] text-[#0a0b0d] font-bold border-[#dfbe7d]'
                            : 'bg-[#191b24] text-[#88909e] border-[#292f3d]'
                        }`}
                      >
                        {app.label}
                      </button>
                    ))}
                  </div>

                  {upiApp === 'id' && (
                    <input
                      type="text"
                      placeholder="username@okhdfcbank / mobile@ybl"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-[#181b24] border border-[#282e3c] px-3 py-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                    />
                  )}
                  <p className="text-[10px] text-[#6b7382]">
                    Upon clicking place order, the UPI notification will be dispatched instantly to your registered mobile app.
                  </p>
                </div>
              )}

              {/* Card sub-options */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#141720] border border-[#272d3b] space-y-3 text-xs text-[#88909e]">
                  <p className="text-white font-medium">Credit & Debit Cards Supported</p>
                  <p className="text-[11px] leading-relaxed">
                    Visa, MasterCard, RuPay, Diners Club, and American Express cards processed via PCI-DSS Level 1 compliant gateway.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Card Number (4000 1234 ...)"
                      className="bg-[#181b24] border border-[#282e3c] p-2 text-xs text-white"
                      disabled
                      value="•••• •••• •••• 9012 (Razorpay Tokenized)"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="bg-[#181b24] border border-[#282e3c] p-2 text-xs text-white"
                      disabled
                      value="12/28"
                    />
                  </div>
                </div>
              )}

              {/* COD */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#141720] border border-[#272d3b] text-xs text-[#88909e]">
                  <p className="text-white font-medium mb-1">Cash on Delivery Available</p>
                  <p className="text-[11px] leading-relaxed">
                    Please keep exact cash ready upon delivery. An OTP verification code will be sent to <strong>{phone}</strong> prior to handover.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ==================== RIGHT: ORDER SUMMARY (5 COLS) ==================== */}
          <div className="lg:col-span-5 bg-[#111319] border border-[#212632] p-6 h-fit space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#dfbe7d] pb-3 border-b border-[#212632]">
              Items In Your Bag ({cart.length})
            </h2>

            {/* Thumbnails */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-14 w-12 object-cover bg-[#0d0e12] flex-shrink-0"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-white font-medium truncate">{item.product.name}</h4>
                    <p className="text-[#88909e] text-[11px]">
                      Qty: {item.quantity} • Size: {item.selectedSize}
                    </p>
                  </div>
                  <span className="font-mono text-white">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-[#212632] space-y-2 text-xs text-[#88909e]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#22c55e]">
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-white">
                  {calculatedShipping === 0 ? <span className="text-[#22c55e]">FREE</span> : `₹${calculatedShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-[#212632]">
                <span>Total Payable:</span>
                <span className="text-[#dfbe7d]">
                  ₹{finalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {isProcessing ? (
                <span>Generating Order Confirmation...</span>
              ) : (
                <>
                  <span>Confirm Order • ₹{finalPayable.toLocaleString('en-IN')}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#6d7483] pt-2">
              <ShieldCheck className="h-4 w-4 text-[#c9a96e]" />
              <span>Official SAKSOX Direct Atelier Fulfillment</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
