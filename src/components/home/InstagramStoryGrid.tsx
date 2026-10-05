import React, { useState } from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export interface StoryPost {
  id: string;
  creatorHandle: string;
  creatorName: string;
  creatorAvatar: string;
  isVerified: boolean;
  location: string;
  imageUrl: string;
  category: 'Streetwear Drops' | 'Haute Parfumerie' | 'Creator Looks' | 'Behind The Atelier';
  caption: string;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  taggedProductSlugs: string[];
  date: string;
}

export const LIFESTYLE_STORY_POSTS: StoryPost[] = [
  {
    id: 'post-1',
    creatorHandle: 'aarav.vortex',
    creatorName: 'Aarav Sen',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    location: 'Connaught Place, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    category: 'Streetwear Drops',
    caption: 'Midnight in CP. Sub-10°C breeze, brutalist concrete silhouettes, and 500GSM fleece that completely shuts out the cold. The SAKSOX winter heavyweight drop has officially taken over my rotation.',
    hashtags: ['#SAKSOXCULT', '#WinterStreetwear', '#DelhiNights', '#OversizedFit'],
    likesCount: 2410,
    commentsCount: 118,
    taggedProductSlugs: ['tokyo-heavyweight-hoodie', 'distressed-acid-wash-hoodie'],
    date: '2 hours ago'
  },
  {
    id: 'post-2',
    creatorHandle: 'saksox.atelier',
    creatorName: 'SAKSOX Perfumery Lab',
    creatorAvatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    location: 'Old Delhi Olfactory Atelier',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    category: 'Haute Parfumerie',
    caption: 'Macerating Bourbon vanilla, smoked birch tar, and dark aged rum for 60 nights. Extrait concentration at 32% oil volume. Scent is architectural memory captured in dark glass.',
    hashtags: ['#ExtraitDeParfum', '#SmokedVanilla', '#SAKSOXCULT', '#AtelierNotes'],
    likesCount: 4120,
    commentsCount: 204,
    taggedProductSlugs: ['smoked-vanilla-extrait', 'midnight-oud-extrait'],
    date: '5 hours ago'
  },
  {
    id: 'post-3',
    creatorHandle: 'zoya.noir',
    creatorName: 'Zoya Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    location: 'Hauz Khas Village, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
    category: 'Creator Looks',
    caption: 'Strict monochrome layers. Dropped shoulders, sculptural drape, and chunky boots that hit the pavement just right. Wearing the Arctic Down Puffer over the fine gauge knit.',
    hashtags: ['#MonochromeAesthetic', '#SAKSOXCULT', '#WinterLayering'],
    likesCount: 3890,
    commentsCount: 156,
    taggedProductSlugs: ['arctic-down-puffer', 'chunky-ribbed-beanie'],
    date: '1 day ago'
  },
  {
    id: 'post-4',
    creatorHandle: 'karan_winter',
    creatorName: 'Karan Malhotra',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isVerified: false,
    location: 'Terminal 3, IGI Airport',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85',
    category: 'Streetwear Drops',
    caption: 'En route to Manali. Heavy ribbed cuffs, deep hood, and thermal insulation that doesn’t restrict movement. The airport uniform for the entire winter season.',
    hashtags: ['#TravelInStyle', '#WinterReady', '#SAKSOXCULT'],
    likesCount: 1940,
    commentsCount: 92,
    taggedProductSlugs: ['artisanal-cable-knit', 'cashmere-fringe-scarf'],
    date: '1 day ago'
  },
  {
    id: 'post-5',
    creatorHandle: 'priya.scents',
    creatorName: 'Priya Varma',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    location: 'The Lodhi Lounge, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
    category: 'Haute Parfumerie',
    caption: 'Winter fragrance masterclass: Mist your extrait de parfum directly onto your wool lapels and scarf edges. The natural organic fibers lock the cedar and smoked amber notes for over 48 hours.',
    hashtags: ['#ScentLayering', '#WinterScents', '#ExtraitDeParfum', '#SAKSOXCULT'],
    likesCount: 5610,
    commentsCount: 340,
    taggedProductSlugs: ['kyoto-moss-extrait', 'artisanal-solid-scent-balm'],
    date: '2 days ago'
  },
  {
    id: 'post-6',
    creatorHandle: 'saksox.records',
    creatorName: 'Saksox Underground',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    location: 'Warehouse 7, Okhla Industrial Area',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
    category: 'Behind The Atelier',
    caption: 'Behind the scenes of our Winter ’26 nocturnal campaign shoot. Analog 35mm grain, warehouse acoustics, and raw unedited street energy. New visual drops incoming.',
    hashtags: ['#BehindTheScenes', '#SAKSOXCULT', '#Lookbook2026'],
    likesCount: 2780,
    commentsCount: 145,
    taggedProductSlugs: ['padded-tech-bomber', 'tokyo-heavyweight-hoodie'],
    date: '3 days ago'
  }
];

interface InstagramStoryGridProps {
  onNavigateToDetail: (slug: string) => void;
  onNavigateToShop: () => void;
}

export const InstagramStoryGrid: React.FC<InstagramStoryGridProps> = ({
  onNavigateToDetail,
  onNavigateToShop
}) => {
  const { addToCart, showNotification } = useShop();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<StoryPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filterOptions = [
    'All',
    'Streetwear Drops',
    'Haute Parfumerie',
    'Creator Looks',
    'Behind The Atelier'
  ];

  const filteredPosts =
    activeFilter === 'All'
      ? LIFESTYLE_STORY_POSTS
      : LIFESTYLE_STORY_POSTS.filter((p) => p.category === activeFilter);

  const handleToggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      if (isLiked) {
        showNotification('Added to your liked community inspiration!');
      }
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleNextPost = () => {
    if (!selectedPost) return;
    const currentIndex = filteredPosts.findIndex((p) => p.id === selectedPost.id);
    const nextIndex = (currentIndex + 1) % filteredPosts.length;
    setSelectedPost(filteredPosts[nextIndex]);
  };

  const handlePrevPost = () => {
    if (!selectedPost) return;
    const currentIndex = filteredPosts.findIndex((p) => p.id === selectedPost.id);
    const prevIndex = (currentIndex - 1 + filteredPosts.length) % filteredPosts.length;
    setSelectedPost(filteredPosts[prevIndex]);
  };

  // Get tagged products for modal
  const getTaggedProducts = (slugs: string[]): Product[] => {
    return slugs
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header with Social Proof */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1d222e] mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase mb-2">
            <Instagram className="h-3.5 w-3.5" />
            <span>COMMUNITY & LIFESTYLE STORYTELLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide uppercase">
            #SAKSOXCULT
          </h2>
          <p className="text-xs sm:text-sm text-[#88909e] mt-1 max-w-lg">
            Winter campaign diaries, raw urban styling, and sensory extrait captures from tastemakers and night explorers across India.
          </p>
        </div>

        {/* Instagram Account Stat Badge & Follow Link */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono font-bold text-white">@SAKSOX</div>
            <div className="text-[10px] font-mono text-[#88909e]">128K Cult Patrons • Daily Drops</div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-[#14161f] hover:bg-[#1f2330] border border-[#272d3d] hover:border-[#dfbe7d] text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Instagram className="h-3.5 w-3.5 text-[#dfbe7d]" />
            <span>Follow Atelier</span>
          </a>
        </div>
      </div>

      {/* Story Filter Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-1">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setActiveFilter(opt)}
            className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
              activeFilter === opt
                ? 'bg-[#dfbe7d] text-[#0a0b0d] border-[#dfbe7d] font-bold shadow-md shadow-[#dfbe7d]/15'
                : 'bg-[#12141c] text-[#88909e] border-[#222736] hover:text-white hover:border-[#384055]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Modern Instagram-Style Responsive Story Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          const currentLikes = post.likesCount + (isLiked ? 1 : 0);
          const taggedProducts = getTaggedProducts(post.taggedProductSlugs);

          return (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative bg-[#11131a] border border-[#202534] hover:border-[#dfbe7d]/60 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Creator Card Header */}
              <div className="p-3.5 flex items-center justify-between bg-[#131620] border-b border-[#1c212e] z-10">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.creatorAvatar}
                    alt={post.creatorName}
                    className="h-8 w-8 rounded-full object-cover border border-[#dfbe7d]/40"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-white">
                      <span>@{post.creatorHandle}</span>
                      {post.isVerified && (
                        <CheckCircle2 className="h-3 w-3 text-[#dfbe7d] fill-[#dfbe7d]/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#88909e]">
                      <MapPin className="h-2.5 w-2.5 text-[#dfbe7d]" />
                      <span className="truncate max-w-[140px]">{post.location}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#717887]">
                  {post.date}
                </span>
              </div>

              {/* Main Visual Image with Hover Overlay */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0b0e]">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Tagged Product Count Badge */}
                {taggedProducts.length > 0 && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#090b0e]/90 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white">
                      <Tag className="h-3 w-3 text-[#dfbe7d]" />
                      <span>{taggedProducts.length} Pieces Tagged</span>
                    </span>
                  </div>
                )}

                {/* Hover Quick-Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-xs text-white font-mono flex items-center justify-between mb-2">
                    <span className="text-[#dfbe7d] uppercase tracking-wider font-semibold">
                      Click to Shop Look
                    </span>
                    <span className="text-[11px] text-[#88909e]">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bar (Likes, Comments, Tagged items) */}
              <div className="p-4 bg-[#11131a] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(post.id, e)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLiked ? 'text-red-500 font-bold' : 'text-[#88909e] hover:text-white'
                        }`}
                        aria-label="Like post"
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{currentLikes.toLocaleString()}</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-[#88909e]">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.commentsCount}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfbe7d] bg-[#dfbe7d]/10 px-2 py-0.5 border border-[#dfbe7d]/20">
                      {post.category}
                    </span>
                  </div>

                  {/* Caption */}
                  <p className="text-xs text-[#caced8] line-clamp-2 leading-relaxed mb-3">
                    <strong className="text-white font-mono mr-1">@{post.creatorHandle}</strong>
                    {post.caption}
                  </p>
                </div>

                {/* Tagged Products Mini Carousel / Strip */}
                {taggedProducts.length > 0 && (
                  <div className="pt-2.5 border-t border-[#1d222e] flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <div className="h-6 w-6 rounded-sm bg-black overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={taggedProducts[0].images[0]}
                          alt={taggedProducts[0].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-[#a2a8b9] truncate">
                        {taggedProducts[0].name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#dfbe7d] uppercase flex items-center gap-1 flex-shrink-0 ml-2">
                      <span>View Look</span>
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Invite Footer Strip */}
      <div className="mt-12 p-6 sm:p-8 bg-[#101219] border border-[#212736] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7d]">
            COMMUNITY SUBMISSIONS
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-white tracking-wide uppercase mt-0.5">
            Share Your Nocturnal Winter Fit
          </h3>
          <p className="text-xs text-[#88909e] max-w-md mt-1">
            Tag <strong className="text-white font-mono">@SAKSOX</strong> and use <strong className="text-[#dfbe7d] font-mono">#SAKSOXCULT</strong> on Instagram to be featured on our global gallery and receive private atelier invitations.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToShop}
          className="px-6 py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#dfbe7d]/15 flex-shrink-0"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Shop The Entire Winter Feed</span>
        </button>
      </div>

      {/* Instagram Story / Post Detailed Lightbox Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedPost(null)}
          />

          <div className="relative z-10 w-full max-w-4xl bg-[#0c0d12] border border-[#252b3a] shadow-2xl text-[#f5f3ef] my-6 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-30 text-[#88909e] hover:text-white p-2 cursor-pointer transition-colors focus:outline-none bg-black/50 backdrop-blur-sm rounded-full"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 pointer-events-none" />
            </button>

            {/* Left: High-Res Image with Post Nav Controls */}
            <div className="md:w-7/12 bg-black relative flex items-center justify-center overflow-hidden min-h-[350px] md:min-h-[550px]">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="h-full w-full object-contain max-h-[85vh]"
              />

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPost();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPost();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Right: Story Details, Caption, and Tagged Products */}
            <div className="md:w-5/12 bg-[#0f1118] border-t md:border-t-0 md:border-l border-[#202534] flex flex-col justify-between overflow-y-auto p-5 sm:p-6">
              <div>
                {/* Creator Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e2330]">
                  <img
                    src={selectedPost.creatorAvatar}
                    alt={selectedPost.creatorName}
                    className="h-10 w-10 rounded-full object-cover border border-[#dfbe7d]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-white">
                      <span>@{selectedPost.creatorHandle}</span>
                      {selectedPost.isVerified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#dfbe7d] fill-[#dfbe7d]/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#88909e] font-mono">
                      <MapPin className="h-3 w-3 text-[#dfbe7d]" />
                      <span>{selectedPost.location}</span>
                    </div>
                  </div>
                </div>

                {/* Caption & Storytelling Narrative */}
                <div className="py-4 space-y-3 border-b border-[#1e2330]">
                  <p className="text-xs sm:text-sm text-[#d4d9e5] leading-relaxed">
                    {selectedPost.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedPost.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#dfbe7d] hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#88909e] pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(selectedPost.id, e)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        likedPosts[selectedPost.id] ? 'text-red-500 font-bold' : 'hover:text-white'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedPosts[selectedPost.id] ? 'fill-current' : ''
                        }`}
                      />
                      <span>
                        {(
                          selectedPost.likesCount + (likedPosts[selectedPost.id] ? 1 : 0)
                        ).toLocaleString()}{' '}
                        likes
                      </span>
                    </button>
                    <span>•</span>
                    <span>{selectedPost.commentsCount} comments</span>
                  </div>
                </div>

                {/* Tagged Products in this Post */}
                <div className="pt-4">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#dfbe7d] mb-3">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Pieces in This Look</span>
                    </span>
                    <span className="text-[10px] text-[#88909e]">Instant Shop</span>
                  </div>

                  <div className="space-y-2.5">
                    {getTaggedProducts(selectedPost.taggedProductSlugs).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#151722] border border-[#242b3b] flex items-center justify-between gap-3 group hover:border-[#dfbe7d] transition-colors"
                      >
                        <div
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigateToDetail(item.slug);
                          }}
                          className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-12 w-12 object-cover bg-black flex-shrink-0 border border-white/10"
                          />
                          <div className="truncate">
                            <h4 className="text-xs font-semibold text-white group-hover:text-[#dfbe7d] transition-colors truncate">
                              {item.name}
                            </h4>
                            <div className="text-[10px] font-mono text-[#88909e] capitalize">
                              {item.subcategory} • ₹{item.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(item, item.sizes[0] || 'Standard');
                              showNotification(`Added ${item.name} to bag!`);
                            }}
                            className="p-2 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] transition-colors cursor-pointer"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPost(null);
                              onNavigateToDetail(item.slug);
                            }}
                            className="p-2 bg-[#1d222f] hover:bg-[#282f42] text-white transition-colors cursor-pointer"
                            title="View Piece"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action in Modal */}
              <div className="pt-4 border-t border-[#1e2330] mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#171a25] hover:bg-[#202534] border border-[#2a3246] text-xs font-mono uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#dfbe7d]" />
                  <span>Open On Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
