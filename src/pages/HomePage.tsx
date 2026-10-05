import React from 'react';
import { ArrowRight, Sparkles, Star, Flame, Eye, Compass, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { SnowfallParticles } from '../components/home/SnowfallParticles';
import { InstagramStoryGrid } from '../components/home/InstagramStoryGrid';
import { PRODUCTS, COMPLETE_THE_LOOK_BUNDLES } from '../data/products';
import { useShop } from '../context/ShopContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenScentQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenScentQuiz }) => {
  const { addToCart, showNotification } = useShop();

  const newDrops = PRODUCTS.filter((p) => p.isNewDrop).slice(0, 4);
  const trendingItems = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const featuredFragrances = PRODUCTS.filter((p) => p.category === 'fragrances').slice(0, 4);

  // Bundle 1 for Complete The Look preview
  const primaryBundle = COMPLETE_THE_LOOK_BUNDLES[0];
  const bundleJacket = PRODUCTS.find((p) => p.id === primaryBundle.jacketId);
  const bundleHoodie = PRODUCTS.find((p) => p.id === primaryBundle.hoodieId);
  const bundlePant = PRODUCTS.find((p) => p.id === primaryBundle.pantOrSkirtId);
  const bundlePerfume = PRODUCTS.find((p) => p.id === primaryBundle.perfumeId);

  const bundleRawTotal =
    (bundleJacket?.price || 0) +
    (bundleHoodie?.price || 0) +
    (bundlePant?.price || 0) +
    (bundlePerfume?.price || 0);

  const bundleDiscountedTotal = Math.round(bundleRawTotal * (1 - primaryBundle.discountPercent / 100));

  const handleAddFullLook = () => {
    if (bundleJacket) addToCart(bundleJacket, bundleJacket.sizes[1] || bundleJacket.sizes[0]);
    if (bundleHoodie) addToCart(bundleHoodie, bundleHoodie.sizes[1] || bundleHoodie.sizes[0]);
    if (bundlePant) addToCart(bundlePant, bundlePant.sizes[1] || bundlePant.sizes[0]);
    if (bundlePerfume) addToCart(bundlePerfume, bundlePerfume.sizes[0]);
    showNotification('Complete Tokyo Midnight look added to your bag with 15% discount!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0b0d] text-[#f5f3ef] overflow-hidden">
      {/* ==================== 1. CINEMATIC HERO SECTION ==================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0d0e12]">
        {/* Background Editorial Visual with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85"
            alt="SAKSOX Winter Editorial 2026"
            className="h-full w-full object-cover object-center filter brightness-[0.42] contrast-[1.12] scale-105 transform animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/80 via-transparent to-[#0a0b0d]/80" />
        </div>

        {/* Lightweight Atmospheric Snow Particles */}
        <SnowfallParticles />

        {/* Hero Content Box */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12141a]/85 border border-[#c9a96e]/40 backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#dfbe7d]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#dfbe7d] uppercase">
              THE 2026 WINTER CAMPAIGN
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-[0.06em] text-white uppercase leading-[0.95] mb-6 drop-shadow-2xl">
            WINTER HAS A <span className="italic font-normal text-gradient-gold">SIGNATURE.</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#d6ccbe] font-light leading-relaxed mb-10 tracking-wide">
            Discover the new season of SAKSOX — winter fashion, signature scents and everyday luxury engineered for the nocturnal pulse.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
            <button
              onClick={() => onNavigate('/shop?cat=women')}
              className="flex-1 min-w-[130px] py-3.5 px-6 bg-[#f5f3ef] hover:bg-white text-[#0a0b0d] font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-xl hover:scale-[1.02]"
            >
              SHOP WOMEN
            </button>
            <button
              onClick={() => onNavigate('/shop?cat=men')}
              className="flex-1 min-w-[130px] py-3.5 px-6 bg-[#161820]/90 hover:bg-[#202430] border border-white/30 text-white font-bold text-xs uppercase tracking-[0.18em] backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            >
              SHOP MEN
            </button>
            <button
              onClick={() => onNavigate('/fragrances')}
              className="flex-1 min-w-[130px] py-3.5 px-6 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.02]"
            >
              EXPLORE FRAGRANCES
            </button>
          </div>

          {/* Subtle bottom ticker */}
          <div className="mt-14 flex items-center gap-6 text-[11px] font-mono text-[#88909e] uppercase tracking-widest">
            <span>HAUTE COUTURE</span>
            <span>•</span>
            <span>FRENCH OILS</span>
            <span>•</span>
            <span>NEW DELHI ATELIER</span>
          </div>
        </div>
      </section>

      {/* ==================== 2. THE WINTER EDIT — 4 CATEGORIES ==================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1f232d]">
          <div>
            <span className="text-[11px] font-mono text-[#c9a96e] tracking-widest uppercase">
              CURATED DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide mt-1">
              THE WINTER EDIT
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/winter-edit')}
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#dfbe7d] hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>View 2026 Lookbook</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 4 Premium Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Winter Essentials',
              subtitle: 'Sub-zero down puffers, wool coats & knitwear',
              img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
              link: '/shop?cat=men&sub=Winter%20Jackets'
            },
            {
              title: 'Streetwear',
              subtitle: '500GSM acid hoodies, tactical cargos & cyber layers',
              img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
              link: '/shop?cat=men&sub=Oversized%20Hoodies'
            },
            {
              title: 'Fragrances',
              subtitle: 'French-macerated Extraits & nocturnal signature scents',
              img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
              link: '/fragrances'
            },
            {
              title: 'Accessories',
              subtitle: 'Merino beanies, blackout watches & padded totes',
              img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
              link: '/shop?cat=accessories'
            }
          ].map((cat) => (
            <div
              key={cat.title}
              onClick={() => onNavigate(cat.link)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#111317] border border-[#20242e] cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.7] group-hover:brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-black/20" />
              <div className="absolute inset-x-5 bottom-5 z-10 flex flex-col justify-end">
                <span className="text-[10px] font-mono text-[#dfbe7d] uppercase tracking-widest mb-1">
                  Collection
                </span>
                <h3 className="text-xl font-serif font-bold text-white tracking-wide group-hover:text-[#dfbe7d] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#a2a9b7] mt-1 line-clamp-2">
                  {cat.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Drops</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#dfbe7d]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 3. NEW DROPS SECTION ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dfbe7d] uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              Fresh from the Atelier
            </div>
            <h2 className="text-3xl font-serif text-white tracking-wide mt-1">
              NEW DROPS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop?filter=new')}
            className="mt-2 sm:mt-0 text-xs font-semibold text-[#88909e] hover:text-white uppercase tracking-wider transition-colors"
          >
            View All New Arrivals ({PRODUCTS.filter((p) => p.isNewDrop).length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newDrops.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateToDetail={(slug) => onNavigate(`/product/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* ==================== 4. GEN Z VIRAL PICKS / TRENDING NOW ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#0d0f14] border-y border-[#1e222d]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#e11d48] uppercase tracking-widest">
              <Flame className="h-3.5 w-3.5" />
              Community Obsessions
            </div>
            <h2 className="text-3xl font-serif text-white tracking-wide mt-1">
              TRENDING NOW
            </h2>
          </div>
          <div className="flex gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => onNavigate('/shop?filter=under999')}
              className="px-3 py-1.5 bg-[#171a22] hover:bg-[#222733] border border-[#272d3b] text-xs text-[#dfbe7d] uppercase tracking-wider font-mono"
            >
              Under ₹999
            </button>
            <button
              onClick={() => onNavigate('/shop?filter=under1499')}
              className="px-3 py-1.5 bg-[#171a22] hover:bg-[#222733] border border-[#272d3b] text-xs text-[#dfbe7d] uppercase tracking-wider font-mono"
            >
              Under ₹1,499
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateToDetail={(slug) => onNavigate(`/product/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* ==================== 5. PERFUME EXPERIENCE — "FIND YOUR SIGNATURE" ==================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0c10] overflow-hidden">
        {/* Ambient Dark Luxury Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a96e]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#dfbe7d] uppercase">
              SAKSOX HAUTE PARFUMERIE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-wide mt-2">
              FIND YOUR SIGNATURE.
            </h2>
            <p className="text-xs sm:text-sm text-[#88909e] mt-3 leading-relaxed">
              Macerated in small batches with French Grasse essences. Formulated with up to 30% pure oil concentration for extreme 14+ hour winter projection.
            </p>

            {/* Scent Quiz CTA */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenScentQuiz}
                className="px-6 py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Take "Find Your Scent" Quiz</span>
              </button>
              <button
                onClick={() => onNavigate('/fragrances')}
                className="px-6 py-3 bg-[#151720] hover:bg-[#202430] border border-[#2b3140] text-white font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                Browse All Fragrances
              </button>
            </div>
          </div>

          {/* 6 Fragrance Families Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
            {[
              { name: 'FRESH', notes: 'Frozen Citrus & Alpine Pine', icon: '❄️' },
              { name: 'WOODY', notes: 'Smoked Cedar & Mysore Sandal', icon: '🌲' },
              { name: 'MUSKY', notes: 'Cashmere Skin & Powdery Iris', icon: '☁️' },
              { name: 'SPICY', notes: 'Malabar Cardamom & Saffron', icon: '🔥' },
              { name: 'SWEET', notes: 'Velvet Cherry & Roasted Cacao', icon: '🍒' },
              { name: 'AQUATIC', notes: 'Glacial Aldehydes & Sea Minerals', icon: '🌊' }
            ].map((fam) => (
              <div
                key={fam.name}
                onClick={() => onNavigate(`/fragrances?family=${fam.name.toLowerCase()}`)}
                className="p-4 bg-[#12141a] border border-[#20242e] hover:border-[#c9a96e]/60 transition-all cursor-pointer text-center group"
              >
                <span className="text-xl mb-1 block">{fam.icon}</span>
                <h4 className="text-xs font-bold text-white tracking-widest font-mono group-hover:text-[#dfbe7d]">
                  {fam.name}
                </h4>
                <p className="text-[10px] text-[#717887] mt-1 line-clamp-1">{fam.notes}</p>
              </div>
            ))}
          </div>

          {/* 4 Showcase Fragrance Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredFragrances.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigateToDetail={(slug) => onNavigate(`/product/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. "COMPLETE THE LOOK" OUTFIT BUILDER ==================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#111319] border border-[#232733] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:w-1/3">
              <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
                CURATED WINTER HARMONY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1">
                COMPLETE THE LOOK
              </h2>
              <p className="text-xs text-[#88909e] mt-2 leading-relaxed">
                A seamless cold-weather ensemble engineered for aesthetic synergy. Buy all 4 coordinated elements together and unlock an instant <strong className="text-white">15% bundle discount</strong>.
              </p>

              <div className="mt-6 p-4 bg-[#161822] border border-[#242936] space-y-2">
                <div className="flex justify-between text-xs text-[#88909e]">
                  <span>Items in this look:</span>
                  <span className="text-white font-mono">4 Pieces</span>
                </div>
                <div className="flex justify-between text-xs text-[#88909e]">
                  <span>Total Value:</span>
                  <span className="line-through">₹{bundleRawTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#242936]">
                  <span>Complete Look Price:</span>
                  <span className="text-[#dfbe7d] text-base">₹{bundleDiscountedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleAddFullLook}
                  className="w-full py-3 px-6 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Add Full Look to Cart • ₹{bundleDiscountedTotal.toLocaleString('en-IN')}
                </button>
                <button
                  onClick={() => onNavigate('/look-builder')}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#88909e] hover:text-white uppercase tracking-wider transition-colors"
                >
                  Customise Look in Outfit Builder →
                </button>
              </div>
            </div>

            {/* Right 4-Piece Preview Grid */}
            <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {[
                { label: 'Outerwear', item: bundleJacket },
                { label: 'Heavy Knit', item: bundleHoodie },
                { label: 'Trousers', item: bundlePant },
                { label: 'Signature Scent', item: bundlePerfume }
              ].map(({ label, item }) =>
                item ? (
                  <div
                    key={item.id}
                    onClick={() => onNavigate(`/product/${item.slug}`)}
                    className="bg-[#151720] border border-[#232733] p-3 flex flex-col cursor-pointer group hover:border-[#c9a96e] transition-colors"
                  >
                    <span className="text-[10px] font-mono text-[#88909e] uppercase mb-1">
                      {label}
                    </span>
                    <div className="aspect-[3/4] bg-[#0c0d10] overflow-hidden mb-2">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="text-xs font-medium text-white truncate">{item.name}</h4>
                    <span className="text-xs font-semibold text-[#dfbe7d] mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. BEST SELLERS ==================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dfbe7d] uppercase tracking-widest">
              <Star className="h-3.5 w-3.5 fill-[#dfbe7d] text-[#dfbe7d]" />
              Cult Classiques
            </div>
            <h2 className="text-3xl font-serif text-white tracking-wide mt-1">
              BEST SELLERS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="mt-2 sm:mt-0 text-xs font-semibold text-[#88909e] hover:text-white uppercase tracking-wider transition-colors"
          >
            Explore Complete Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateToDetail={(slug) => onNavigate(`/product/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* ==================== 8. GEN Z EDITORIAL BANNER ==================== */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0e1015] overflow-hidden border-t border-[#1e222a]">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80"
            alt="Editorial background"
            className="w-full h-full object-cover filter grayscale"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#c9a96e] uppercase">
            THE SAKSOX MANIFESTO
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-wide mt-3 mb-6">
            “WEAR THE MOOD. OWN THE MOMENT.”
          </h2>
          <p className="text-sm sm:text-base text-[#d6ccbe] font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Fashion is sensory. It begins with the tactile weight of a 500GSM fleece on a freezing night and ends with the intoxicating trail of smoked tonka bean left in your wake.
          </p>
          <button
            onClick={() => onNavigate('/about')}
            className="px-8 py-3.5 bg-transparent hover:bg-white text-white hover:text-black border border-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300"
          >
            READ OUR STORY
          </button>
        </div>
      </section>

      {/* ==================== 9. INSTAGRAM LIFESTYLE & CAMPAIGN GALLERY (#SAKSOXCULT) ==================== */}
      <InstagramStoryGrid
        onNavigateToDetail={(slug) => onNavigate(`/product/${slug}`)}
        onNavigateToShop={() => onNavigate('/shop')}
      />
    </div>
  );
};
