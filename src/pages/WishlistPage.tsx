import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface WishlistPageProps {
  onNavigateToDetail: (slug: string) => void;
  onNavigateToShop: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onNavigateToDetail,
  onNavigateToShop
}) => {
  const { wishlist, products, toggleWishlist, addToCart } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] pb-28">
      {/* Header */}
      <div className="bg-[#111318] border-b border-[#212632] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
              SAVED ARCHIVES
            </span>
            <h1 className="text-3xl font-serif text-white tracking-wide uppercase mt-1">
              My Wishlist
            </h1>
          </div>
          <span className="text-xs font-mono text-[#88909e]">{savedProducts.length} Items Saved</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#12141a] border border-[#212632] p-8 max-w-md mx-auto">
            <Heart className="h-12 w-12 text-[#353b4c] mx-auto mb-3" />
            <h2 className="text-xl font-serif text-white mb-2">No Saved Items</h2>
            <p className="text-xs text-[#88909e] mb-6">
              Tap the heart icon on any outerwear piece, fragrance bottle, or accessory to save it here for later.
            </p>
            <button
              onClick={onNavigateToShop}
              className="px-6 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Explore Drops
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#12141a] border border-[#212632] overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div
                  onClick={() => onNavigateToDetail(product.slug)}
                  className="aspect-[3/4] bg-[#0c0d10] overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full text-[#e11d48] hover:scale-110 transition-transform"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#dfbe7d]">
                      {product.subcategory}
                    </span>
                    <h3
                      onClick={() => onNavigateToDetail(product.slug)}
                      className="text-xs font-medium text-white hover:text-[#dfbe7d] cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs font-bold text-white mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1f232d] flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0]);
                        toggleWishlist(product.id);
                      }}
                      className="flex-1 py-2 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
