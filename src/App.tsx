import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FragranceStudioPage } from './pages/FragranceStudioPage';
import { WinterEditPage } from './pages/WinterEditPage';
import { OutfitBuilderPage } from './pages/OutfitBuilderPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { TrackOrderPage } from './pages/TrackOrderPage';

// Modals
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { AuthModal } from './components/modals/AuthModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { ScentQuizModal } from './components/fragrance/ScentQuizModal';
import { JoinTheCircleModal } from './components/common/JoinTheCircleModal';
import { TrackOrderModal } from './components/modals/TrackOrderModal';
import { Order, ProductCategory } from './types';

function MainApp() {
  const {
    products,
    quickViewProduct,
    setQuickViewProduct,
    notification,
    orders
  } = useShop();

  // Navigation State
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#/');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(orders[0] || null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isScentQuizOpen, setIsScentQuizOpen] = useState(false);
  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Dedicated 'Join the Circle' newsletter modal for new visitors
  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem('saksox_circle_modal_dismissed');
      const isSubscribed = localStorage.getItem('saksox_circle_subscribed');
      if (!isDismissed && !isSubscribed) {
        const timer = setTimeout(() => {
          setIsCircleModalOpen(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#${path.startsWith('/') ? path : '/' + path}`;
  };

  // Parse Hash Route & Query Params
  const hashWithoutPound = currentHash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = hashWithoutPound.split('?');
  const searchParams = new URLSearchParams(queryPart || '');

  // Open Scent Quiz modal if navigated to #/scent-quiz
  useEffect(() => {
    if (pathPart === '/scent-quiz') {
      setIsScentQuizOpen(true);
    }
  }, [pathPart]);

  // Render matching page
  let content = null;

  if (pathPart === '/' || pathPart === '') {
    content = (
      <HomePage
        onNavigate={navigate}
        onOpenScentQuiz={() => setIsScentQuizOpen(true)}
      />
    );
  } else if (pathPart.startsWith('/product/')) {
    const slug = pathPart.replace('/product/', '');
    const product = products.find((p) => p.slug === slug) || products[0];
    content = (
      <ProductDetailPage
        product={product}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToCheckout={() => navigate('/checkout')}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />
    );
  } else if (pathPart === '/shop') {
    const cat = (searchParams.get('cat') as ProductCategory) || 'all';
    const sub = searchParams.get('sub') || undefined;
    const filter = searchParams.get('filter') || undefined;
    content = (
      <ShopPage
        key={cat + (sub || '') + (filter || '')}
        initialCategory={cat}
        initialSubcategory={sub}
        initialFilter={filter}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
      />
    );
  } else if (pathPart === '/fragrances') {
    const family = searchParams.get('family') || undefined;
    content = (
      <FragranceStudioPage
        initialFamily={family}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onOpenScentQuiz={() => setIsScentQuizOpen(true)}
      />
    );
  } else if (pathPart === '/winter-edit') {
    content = (
      <WinterEditPage
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToShop={(c) => navigate(c ? `/shop?cat=${c}` : '/shop')}
      />
    );
  } else if (pathPart === '/look-builder') {
    content = <OutfitBuilderPage />;
  } else if (pathPart === '/cart') {
    content = (
      <CartPage
        onNavigateToCheckout={() => navigate('/checkout')}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToShop={() => navigate('/shop')}
      />
    );
  } else if (pathPart === '/checkout') {
    content = (
      <CheckoutPage
        onOrderSuccess={(order) => {
          setLastPlacedOrder(order);
          navigate('/order-confirmed');
        }}
        onNavigateToCart={() => navigate('/cart')}
      />
    );
  } else if (pathPart === '/order-confirmed') {
    const displayOrder = lastPlacedOrder || orders[0];
    content = (
      <OrderConfirmationPage
        order={displayOrder}
        onNavigateToShop={() => navigate('/shop')}
        onNavigateToTrack={(id) => navigate(`/track-order?id=${id}`)}
      />
    );
  } else if (pathPart === '/account') {
    content = (
      <AccountPage
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToTrack={(id) => navigate(`/track-order?id=${id}`)}
        onNavigateToBuilder={() => navigate('/look-builder')}
      />
    );
  } else if (pathPart === '/wishlist') {
    content = (
      <WishlistPage
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToShop={() => navigate('/shop')}
      />
    );
  } else if (pathPart === '/about') {
    content = (
      <AboutPage
        onNavigateToShop={() => navigate('/shop')}
        onNavigateToFragrances={() => navigate('/fragrances')}
      />
    );
  } else if (pathPart === '/track-order') {
    const id = searchParams.get('id') || undefined;
    content = (
      <TrackOrderPage
        initialOrderId={id}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
      />
    );
  } else if (pathPart === '/scent-quiz') {
    // If user navigates directly to scent quiz url, show Fragrance Studio with quiz modal open
    content = (
      <FragranceStudioPage
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onOpenScentQuiz={() => setIsScentQuizOpen(true)}
      />
    );
  } else {
    content = (
      <HomePage
        onNavigate={navigate}
        onOpenScentQuiz={() => setIsScentQuizOpen(true)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0b0d] text-[#f5f3ef]">
      {/* Navbar */}
      <Navbar
        currentPath={pathPart}
        onNavigate={navigate}
        onOpenCircleModal={() => setIsCircleModalOpen(true)}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1">{content}</main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenCircleModal={() => setIsCircleModalOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => navigate('/checkout')}
        onNavigateToCart={() => navigate('/cart')}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
      />

      {/* Search Modal */}
      <SearchModal
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
        onNavigateToCategory={(c) => navigate(`/shop?cat=${c}`)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
      />

      {/* Auth / Login Modal */}
      <AuthModal />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Scent Quiz Diagnostic Modal */}
      <ScentQuizModal
        isOpen={isScentQuizOpen}
        onClose={() => {
          setIsScentQuizOpen(false);
          navigate('/');
        }}
        onNavigateHome={() => {
          setIsScentQuizOpen(false);
          navigate('/');
        }}
        onNavigateToDetail={(s) => navigate(`/product/${s}`)}
      />

      {/* Join the Circle Newsletter Modal */}
      <JoinTheCircleModal
        isOpen={isCircleModalOpen}
        onClose={() => setIsCircleModalOpen(false)}
        onNavigateToShop={() => navigate('/shop')}
      />

      {/* Quick-Access Track My Order Modal */}
      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        onNavigateToTrack={(id) => navigate(`/track-order?id=${id}`)}
      />

      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161922] border border-[#dfbe7d] text-white py-3 px-4 shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-[#dfbe7d]" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
