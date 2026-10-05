import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  Copy,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Tag,
  Gift
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface JoinTheCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShop?: () => void;
}

export const JoinTheCircleModal: React.FC<JoinTheCircleModalProps> = ({
  isOpen,
  onClose,
  onNavigateToShop
}) => {
  const { applyCoupon, showNotification } = useShop();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsSms, setWantsSms] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<'all' | 'men' | 'women' | 'fragrances'>('all');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDismiss = () => {
    localStorage.setItem('saksox_circle_modal_dismissed', 'true');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');

    // Save lead record in localStorage for attribution
    try {
      const existingLeads = JSON.parse(localStorage.getItem('saksox_circle_leads') || '[]');
      const newLead = {
        email: email.trim().toLowerCase(),
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        interest: selectedInterest,
        discountCode: 'CIRCLE15',
        timestamp: new Date().toISOString()
      };
      existingLeads.push(newLead);
      localStorage.setItem('saksox_circle_leads', JSON.stringify(existingLeads));
      localStorage.setItem('saksox_circle_modal_dismissed', 'true');
      localStorage.setItem('saksox_circle_subscribed', 'true');
    } catch {
      // ignore storage errors
    }

    setIsSubmitted(true);
    showNotification('Welcome to The Circle! Discount code CIRCLE15 unlocked.');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CIRCLE15');
    setCopied(true);
    showNotification('Promo code CIRCLE15 copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyAndShop = () => {
    applyCoupon('CIRCLE15');
    handleDismiss();
    if (onNavigateToShop) {
      onNavigateToShop();
    } else {
      window.location.hash = '#/shop';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleDismiss}
      />

      <div className="relative z-10 w-full max-w-3xl bg-[#0c0d12] border border-[#262c3b] shadow-2xl text-[#f5f3ef] my-6 overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 text-[#88909e] hover:text-white p-2 cursor-pointer transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5 pointer-events-none" />
        </button>

        {/* Left Column: Visual Editorial Card */}
        <div className="md:w-5/12 bg-[#12141c] relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#212634]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
              alt="Editorial Winter Capsule"
              className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/70 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dfbe7d]/15 border border-[#dfbe7d]/40 text-[#dfbe7d] text-[10px] font-mono uppercase tracking-widest mb-4">
              <Sparkles className="h-3 w-3" />
              <span>Privileged Atelier</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white tracking-wide uppercase leading-tight mb-2">
              The Circle
            </h3>
            <p className="text-xs text-[#a0a6b7] leading-relaxed">
              An exclusive inner sanctum for patrons of architectural streetwear and high-concentration extrait perfumery.
            </p>
          </div>

          {/* Value Props Bullet Box */}
          <div className="relative z-10 pt-6 space-y-3 border-t border-[#232938] mt-6">
            <div className="flex items-center gap-2.5 text-xs text-[#dfbe7d] font-mono">
              <Tag className="h-3.5 w-3.5 flex-shrink-0" />
              <span>15% Off Your First Order</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#b8bfd0] font-mono">
              <Gift className="h-3.5 w-3.5 flex-shrink-0 text-[#dfbe7d]" />
              <span>Secret Midnight Drop Links</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#b8bfd0] font-mono">
              <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-[#dfbe7d]" />
              <span>Complimentary Expedited Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Capture Form or Success State */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-center bg-[#0d0e14]">
          {!isSubmitted ? (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#dfbe7d] mb-1.5 flex items-center gap-1.5">
                <span>First Order Privilege</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mb-2 uppercase">
                Join The Circle
              </h2>
              <p className="text-xs text-[#88909e] leading-relaxed mb-5">
                Subscribe to our private registry to unlock <strong className="text-white">15% off</strong> your maiden acquisition and reserve early allocations on winter capsules.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email (Required) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#a0a7b7] mb-1.5 font-semibold">
                    Email Address <span className="text-[#dfbe7d]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#636c7e]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="atelier@domain.com"
                      required
                      className="w-full bg-[#131620] border border-[#232938] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-[#525969] focus:outline-none focus:border-[#dfbe7d] font-mono transition-colors"
                    />
                  </div>
                  {error && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{error}</p>
                  )}
                </div>

                {/* Name (Optional) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#a0a7b7] mb-1.5 font-semibold">
                    First Name <span className="text-[#636c7e]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-[#636c7e]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya or Vikram"
                      className="w-full bg-[#131620] border border-[#232938] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-[#525969] focus:outline-none focus:border-[#dfbe7d] font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Style Interest Category Pills */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#a0a7b7] mb-1.5 font-semibold">
                    Style Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      { id: 'all', label: 'All Winter Edits' },
                      { id: 'men', label: 'Men’s Streetwear' },
                      { id: 'women', label: 'Women’s Capsule' },
                      { id: 'fragrances', label: 'Haute Fragrances' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedInterest(opt.id as any)}
                        className={`py-1.5 px-2.5 text-left border transition-all cursor-pointer text-[11px] truncate ${
                          selectedInterest === opt.id
                            ? 'bg-[#dfbe7d]/15 border-[#dfbe7d] text-[#dfbe7d] font-bold'
                            : 'bg-[#12151e] border-[#222837] text-[#88909e] hover:text-white hover:border-[#384157]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional SMS Toggle */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] font-mono text-[#88909e] hover:text-white">
                    <input
                      type="checkbox"
                      checked={wantsSms}
                      onChange={(e) => setWantsSms(e.target.checked)}
                      className="h-3.5 w-3.5 rounded-none bg-[#141721] border-[#282f40] text-[#dfbe7d] focus:ring-0 cursor-pointer"
                    />
                    <span>Notify me of midnight drop releases via WhatsApp / SMS</span>
                  </label>

                  {wantsSms && (
                    <div className="mt-2 relative">
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-[#636c7e]" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#131620] border border-[#232938] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-[#525969] focus:outline-none focus:border-[#dfbe7d] font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-lg shadow-[#dfbe7d]/15 mt-2"
                >
                  <span>Claim 15% First Order Code</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Dismiss Link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-[11px] font-mono text-[#666f82] hover:text-[#88909e] transition-colors cursor-pointer"
                  >
                    No thanks, I prefer paying full price
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-2 space-y-5 animate-fadeIn">
              <div className="h-12 w-12 rounded-full bg-[#dfbe7d]/15 border border-[#dfbe7d]/40 flex items-center justify-center mx-auto text-[#dfbe7d]">
                <Check className="h-6 w-6 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#dfbe7d] block mb-1">
                  Registration Complete
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide uppercase">
                  Welcome to The Circle
                </h2>
                <p className="text-xs text-[#88909e] max-w-sm mx-auto mt-2 leading-relaxed">
                  Your 15% maiden order privilege has been registered to <strong className="text-white">{email}</strong>.
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="bg-[#12151f] border-2 border-dashed border-[#dfbe7d]/60 p-4 max-w-xs mx-auto">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#88909e] mb-1">
                  First Order Promo Code
                </div>
                <div className="text-xl font-mono font-bold tracking-widest text-white mb-2">
                  CIRCLE15
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full py-2 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#2d3549] text-xs font-mono uppercase tracking-wider text-[#dfbe7d] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-green-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Promo Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleApplyAndShop}
                  className="w-full py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono"
                >
                  <Tag className="h-4 w-4" />
                  <span>Apply Code & Explore Collection</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full py-2 text-xs font-mono text-[#88909e] hover:text-white transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
