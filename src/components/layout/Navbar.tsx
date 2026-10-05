import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, Sparkles, ChevronRight, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCircleModal?: () => void;
  onOpenTrackModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenCircleModal,
  onOpenTrackModal
}) => {
  const {
    cartCount,
    wishlist,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    setIsAuthModalOpen,
    user
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  const navLinks = [
    { label: 'NEW', path: '/shop?filter=new' },
    { label: 'MEN', path: '/shop?cat=men' },
    { label: 'WOMEN', path: '/shop?cat=women' },
    { label: 'FRAGRANCES', path: '/fragrances' },
    { label: 'WINTER EDIT', path: '/winter-edit' },
    { label: 'ACCESSORIES', path: '/shop?cat=accessories' },
    { label: 'SALE', path: '/shop?filter=sale', isHighlight: true }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0e1014] border-b border-[#222631] py-2 px-4 text-center text-[11px] tracking-wider text-[#d6ccbe] uppercase font-mono flex items-center justify-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1 text-[#dfbe7d]">
          <Sparkles className="h-3 w-3" />
          WINTER DROP 2026 LIVE
        </span>
        <span className="hidden sm:inline">•</span>
        {onOpenCircleModal ? (
          <button
            type="button"
            onClick={onOpenCircleModal}
            className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 group"
          >
            <span>JOIN THE CIRCLE: GET <strong className="text-[#dfbe7d] bg-[#1e232e] px-1.5 py-0.5 border border-[#dfbe7d]/40 group-hover:border-[#dfbe7d]">15% OFF</strong> YOUR FIRST ORDER</span>
          </button>
        ) : (
          <span>USE CODE <strong className="text-white bg-[#1e232e] px-1.5 py-0.5 border border-[#c9a96e]/40">CIRCLE15</strong> FOR 15% OFF</span>
        )}
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline text-[#a2a9b7]">COMPLIMENTARY EXPRESS DELIVERY OVER ₹1,999</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0b0d]/95 backdrop-blur-md border-b border-[#222731] shadow-2xl py-3.5'
            : 'bg-[#0a0b0d] border-b border-[#1b1e26] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Search trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-[#d6ccbe] hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-[#d6ccbe] hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left group flex flex-col focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white uppercase group-hover:text-[#dfbe7d] transition-colors">
                SAKSOX
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#88909e] uppercase -mt-1 font-mono">
                WEAR YOUR MOOD
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`text-[12px] font-semibold uppercase tracking-[0.16em] transition-all relative py-1 ${
                  link.isHighlight
                    ? 'text-[#e11d48] hover:text-[#f43f5e]'
                    : currentPath === link.path
                    ? 'text-[#dfbe7d]'
                    : 'text-[#d6ccbe] hover:text-white'
                }`}
              >
                {link.label}
                {currentPath === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#dfbe7d]" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Quick-Access Track My Order Button */}
            {onOpenTrackModal && (
              <button
                type="button"
                onClick={onOpenTrackModal}
                className="flex items-center gap-1.5 text-xs font-mono text-[#88909e] hover:text-white hover:border-[#dfbe7d]/50 transition-colors py-1.5 px-2 sm:px-2.5 bg-[#14161d] border border-[#232834] cursor-pointer"
                aria-label="Track My Order"
                title="Track My Order"
              >
                <Truck className="h-3.5 w-3.5 text-[#dfbe7d]" />
                <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Track Order</span>
              </button>
            )}

            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#88909e] hover:text-white transition-colors py-1.5 px-2.5 bg-[#14161d] border border-[#232834]"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 text-[#c9a96e]" />
              <span>SEARCH</span>
              <span className="text-[10px] text-[#555b68] border border-[#2c3240] px-1 ml-1">/</span>
            </button>

            {/* Account */}
            <button
              onClick={() => {
                if (user) {
                  handleNavClick('/account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-1 text-[#d6ccbe] hover:text-white transition-colors relative flex items-center justify-center"
              aria-label="Account"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover border border-[#dfbe7d]"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              {user && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#22c55e]" />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="p-1 text-[#d6ccbe] hover:text-white transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e11d48] text-[9px] font-bold text-white font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 py-1.5 px-3 bg-[#181a22] hover:bg-[#222631] border border-[#272d3a] text-white transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-4 w-4 text-[#c9a96e]" />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">BAG</span>
              <span className="flex h-4 w-4 items-center justify-center bg-[#c9a96e] text-[10px] font-bold text-[#0a0b0d] font-mono">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0b0c0e] text-[#f5f3ef]">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#20242e]">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
              SAKSOX
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#88909e] hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Quick Search inside Mobile Menu */}
          <div className="p-4 border-b border-[#20242e]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 bg-[#13151b] border border-[#242936] text-xs text-[#88909e]"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#c9a96e]" />
                Search winter clothing & scents...
              </span>
              <span className="text-[10px] font-mono uppercase text-[#dfbe7d]">Search</span>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`w-full flex items-center justify-between py-2 text-left font-serif text-2xl tracking-wider transition-colors border-b border-[#1b1f28] ${
                  link.isHighlight
                    ? 'text-[#e11d48]'
                    : currentPath === link.path
                    ? 'text-[#dfbe7d]'
                    : 'text-[#f5f3ef] hover:text-[#dfbe7d]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-5 w-5 text-[#4e5564]" />
              </button>
            ))}

            {/* Quick interactive shortcuts */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => handleNavClick('/scent-quiz')}
                className="w-full p-3 bg-[#14161e] border border-[#c9a96e]/30 flex items-center justify-between text-left"
              >
                <div>
                  <div className="text-xs font-semibold text-[#dfbe7d] uppercase tracking-wider">
                    Find Your Scent Quiz
                  </div>
                  <div className="text-[11px] text-[#88909e]">
                    Take the 2-min interactive fragrance match
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#dfbe7d]" />
              </button>

              <button
                onClick={() => handleNavClick('/look-builder')}
                className="w-full p-3 bg-[#14161e] border border-[#2c3240] flex items-center justify-between text-left"
              >
                <div>
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    Outfit Builder
                  </div>
                  <div className="text-[11px] text-[#88909e]">
                    Build complete winter looks with 15% off
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#88909e]" />
              </button>

              {onOpenTrackModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTrackModal();
                  }}
                  className="w-full p-3 bg-[#14161e] border border-[#2c3240] flex items-center justify-between text-left cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-[#dfbe7d]" />
                      <span>Track My Order</span>
                    </div>
                    <div className="text-[11px] text-[#88909e]">
                      Instant courier radar & delivery milestone tracking
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#dfbe7d]" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Footer / Account & Currency */}
          <div className="p-5 border-t border-[#20242e] bg-[#0e1014] flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (user) {
                  onNavigate('/account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center gap-2 text-white hover:text-[#dfbe7d]"
            >
              <User className="h-4 w-4 text-[#c9a96e]" />
              <span>{user ? user.name : 'Sign In / Register'}</span>
            </button>
            <span className="font-mono text-[#88909e]">INR (₹) • India</span>
          </div>
        </div>
      )}
    </>
  );
};
