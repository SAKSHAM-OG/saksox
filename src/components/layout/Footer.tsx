import React, { useState } from 'react';
import { ArrowRight, Check, Instagram, Youtube, Compass, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSizeGuide: () => void;
  onOpenCircleModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide, onOpenCircleModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (onOpenCircleModal) {
      onOpenCircleModal();
    } else {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#090a0c] border-t border-[#1e222a] text-[#88909e] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promises / Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-14 border-b border-[#1b1f28]">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#121419] border border-[#222733] text-[#c9a96e]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                Complimentary Express Shipping
              </h4>
              <p className="text-[11px] text-[#717887]">
                Free nationwide air delivery on all domestic orders over ₹1,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#121419] border border-[#222733] text-[#c9a96e]">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                7-Day Seamless Exchange
              </h4>
              <p className="text-[11px] text-[#717887]">
                Hassle-free doorstep pickup and size exchanges across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#121419] border border-[#222733] text-[#c9a96e]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                100% Authentic Formulation
              </h4>
              <p className="text-[11px] text-[#717887]">
                French Grasse perfume oils macerated 90 days. Zero compromises.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#121419] border border-[#222733] text-[#c9a96e]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                Curated Gen Z Aesthetic
              </h4>
              <p className="text-[11px] text-[#717887]">
                Engineered specifically for the modern Indian winter nightlife.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-b border-[#1b1f28] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-md">
            <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase">
              EXCLUSIVE WINTER ACCESS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide mt-1">
              GET THE DROP BEFORE EVERYONE ELSE.
            </h3>
            <p className="text-xs text-[#717887] mt-1.5 leading-relaxed">
              Sign up to receive private drop invitations, secret warehouse sales, and olfactory releases.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[380px]">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#13151b] border border-[#232834] px-4 py-2.5 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#22c55e] flex items-center gap-1.5 mt-2">
                <Check className="h-3.5 w-3.5" /> You're on the VIP list. Welcome to the SAKSOX circle.
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold tracking-[0.25em] text-white uppercase mb-2">
              SAKSOX
            </h3>
            <p className="text-xs text-[#717887] leading-relaxed mb-4">
              Premium Winter Fashion & Haute Fragrances tailored for modern Gen Z identity. Designed in New Delhi.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 bg-[#13151b] border border-[#222733] flex items-center justify-center text-[#88909e] hover:text-white hover:border-[#c9a96e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 bg-[#13151b] border border-[#222733] flex items-center justify-center text-[#88909e] hover:text-white hover:border-[#c9a96e] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 bg-[#13151b] border border-[#222733] flex items-center justify-center text-[#88909e] hover:text-white hover:border-[#c9a96e] transition-colors"
                aria-label="Pinterest"
              >
                <Compass className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/shop?cat=men')}
                  className="hover:text-white transition-colors"
                >
                  Men’s Winter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?cat=women')}
                  className="hover:text-white transition-colors"
                >
                  Women’s Winter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/fragrances')}
                  className="hover:text-white transition-colors"
                >
                  Haute Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/winter-edit')}
                  className="hover:text-white transition-colors"
                >
                  The Winter Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?cat=accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories & Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?filter=sale')}
                  className="text-[#e11d48] hover:text-[#f43f5e] transition-colors font-medium"
                >
                  Winter Sale (Up to 40% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/track-order')}
                  className="text-[#dfbe7d] hover:underline"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors">
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About SAKSOX
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  Our Olfactory Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/look-builder')}
                  className="hover:text-white transition-colors"
                >
                  Outfit Builder
                </button>
              </li>
              {onOpenCircleModal && (
                <li>
                  <button
                    onClick={onOpenCircleModal}
                    className="hover:text-[#dfbe7d] transition-colors flex items-center gap-1 text-[#dfbe7d]"
                  >
                    <span>Join The Circle (15% Off)</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate('/scent-quiz')}
                  className="hover:text-white transition-colors"
                >
                  Scent Match Quiz
                </button>
              </li>
              <li>
                <span className="text-[#646a78]">Privacy & Legal Terms</span>
              </li>
            </ul>
          </div>

          {/* SOCIAL / COMMUNITY */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-white mb-4">
              COMMUNITY
            </h4>
            <p className="text-xs text-[#717887] mb-3 leading-relaxed">
              Tag <span className="text-white font-mono">#SAKSOXCULT</span> on Instagram & TikTok to be featured in our seasonal winter campaign.
            </p>
            <div className="p-3 bg-[#121419] border border-[#222733] text-[11px] text-[#a2a9b7]">
              <span className="text-[#dfbe7d] font-semibold">Flagship Atelier:</span>
              <p className="mt-0.5">Mehrauli, New Delhi 110030</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Indian Payment Badges */}
        <div className="pt-8 border-t border-[#1b1f28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#636977]">
          <p>© 2026 SAKSOX India Pvt Ltd. All rights reserved. “Wear Your Mood.”</p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-[#88909e]">
            <span>UPI / GPAY</span>
            <span>•</span>
            <span>PHONEPE</span>
            <span>•</span>
            <span>RUPAY</span>
            <span>•</span>
            <span>VISA & MASTER</span>
            <span>•</span>
            <span>CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
