import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface WinterEditPageProps {
  onNavigateToDetail: (slug: string) => void;
  onNavigateToShop: (cat?: string) => void;
}

export const WinterEditPage: React.FC<WinterEditPageProps> = ({
  onNavigateToDetail,
  onNavigateToShop
}) => {
  const { addToCart, setQuickViewProduct } = useShop();

  const sections = [
    {
      title: 'Winter Streetwear',
      subtitle: 'Sub-zero down puffers, 500GSM acid hoods, and modular tactical cargos.',
      badge: 'STREET CULTURE',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Winter Streetwear')
    },
    {
      title: 'Quiet Luxury',
      subtitle: 'Double-faced cashmere coats, brushed mohair sweaters, and subtle second-skin musks.',
      badge: 'MINIMAL COUTURE',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Quiet Luxury')
    },
    {
      title: 'Night Out',
      subtitle: 'Bonded suede aviators, liquid chrome textures, and intoxicating ruby cherry extracts.',
      badge: 'MIDNIGHT GLAMOUR',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Night Out')
    },
    {
      title: 'Everyday Essentials',
      subtitle: 'Ribbed turtlenecks, blanket scarves, and fisherman merino beanies.',
      badge: 'COLD ESSENTIALS',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Everyday Essentials')
    },
    {
      title: 'Couple / Matching Looks',
      subtitle: 'Harmonious oversized fleece silhouettes and velvet knit loungewear designed to be shared.',
      badge: 'DUAL HARMONY',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Couple / Matching Looks')
    },
    {
      title: 'Winter Fragrance',
      subtitle: 'Extreme 14+ hour winter projection formulated with smoked woods, spices and dark bourbon vanilla.',
      badge: 'HAUTE PERFUMERY',
      products: PRODUCTS.filter((p) => p.winterCollection === 'Winter Fragrance')
    }
  ];

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-28">
      {/* Cinematic Hero */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0d0e14] border-b border-[#1e222a] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=2000&q=80"
            alt="Winter Edit Lookbook"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#dfbe7d] uppercase">
            SEASONAL LOOKBOOK 2026
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide uppercase mt-2">
            THE WINTER EDIT 2026
          </h1>
          <p className="text-sm sm:text-base text-[#d6ccbe] font-light mt-4 tracking-wider max-w-xl mx-auto">
            Layers. Textures. Scents. Your winter, your way.
          </p>
        </div>
      </section>

      {/* Editorial Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-28">
        {sections.map((sec, idx) => (
          <section key={sec.title} className="relative">
            {/* Section Header with Magazine Typography */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#212632] mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#c9a96e] uppercase">
                  EDIT 0{idx + 1} • {sec.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-wide mt-1">
                  {sec.title}
                </h2>
                <p className="text-xs text-[#88909e] mt-1 max-w-lg">{sec.subtitle}</p>
              </div>

              <button
                onClick={() => onNavigateToShop()}
                className="mt-3 md:mt-0 text-xs font-semibold text-[#dfbe7d] hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1 font-mono"
              >
                <span>Shop Full Edit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Editorial Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sec.products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#111319] border border-[#20242f] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#383e4e]"
                >
                  {/* Image */}
                  <div
                    onClick={() => onNavigateToDetail(product.slug)}
                    className="aspect-[4/5] bg-[#0c0d10] overflow-hidden relative cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-[#88909e] uppercase font-mono mb-1">
                        <span>{product.subcategory}</span>
                        <div className="flex items-center gap-1 text-[#dfbe7d]">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onNavigateToDetail(product.slug)}
                        className="text-sm font-medium text-white group-hover:text-[#dfbe7d] transition-colors cursor-pointer truncate"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#88909e] line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#20242f] flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="p-2 bg-[#181b24] hover:bg-[#252a38] text-[#88909e] hover:text-white border border-[#292f3d] transition-colors"
                          title="Quick View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => addToCart(product, product.sizes[0])}
                          className="px-3 py-1.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
