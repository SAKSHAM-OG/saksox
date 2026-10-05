import { Product, Coupon } from '../types';

export const PRODUCTS: Product[] = [
  // ==================== MEN'S WINTER FASHION (11 items) ====================
  {
    id: 'men-01',
    name: 'SAKSOX Arctic Down Oversized Puffer',
    slug: 'saksox-arctic-down-oversized-puffer',
    category: 'men',
    subcategory: 'Winter Jackets',
    gender: 'men',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Engineered for sub-zero urban nights. Boxy silhouette, thermal recycled goose down filling, matte waterproof ripstop exterior, and tonal SAKSOX metallic branding on sleeve.',
    details: [
      'Matte waterproof shell with 10k water resistance',
      '80/20 RDS certified thermal insulation',
      'High-neck fleece lined storm collar',
      'Concealed double metal zippers and storm flap',
      'Interior glove drop pocket with headphone loop'
    ],
    materials: 'Shell: 100% Recycled Nylon, Lining: 100% Viscose, Fill: Thermal Down',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Onyx Black', hex: '#111215' },
      { name: 'Icy Concrete', hex: '#8a8f98' },
      { name: 'Midnight Charcoal', hex: '#262930' }
    ],
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Winter Streetwear',
    featuredLookGroup: 'look-tokyo-night'
  },
  {
    id: 'men-02',
    name: 'SAKSOX Heavyweight 500GSM Acid Frost Hoodie',
    slug: 'saksox-heavyweight-500gsm-acid-frost-hoodie',
    category: 'men',
    subcategory: 'Oversized Hoodies',
    gender: 'men',
    price: 1899,
    originalPrice: 2799,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-dense 500 GSM French Terry cotton hoodie with custom cold-mineral wash. Dropped shoulders, seamless kangaroo pocket, and double-layered stiff hood that stays structured.',
    details: [
      '500 GSM 100% combed ringspun cotton',
      'Pre-shrunk vintage mineral cold wash',
      'Thick ribbing at cuffs and hemline',
      'Embossed tonal rubber SAKSOX insignia on chest'
    ],
    materials: '100% Combed Heavy Cotton (500 GSM)',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Charcoal', hex: '#24252a' },
      { name: 'Frost Beige', hex: '#d4ccbe' },
      { name: 'Dusty Obsidian', hex: '#1b1d22' }
    ],
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isWinterEdit: true,
    winterCollection: 'Winter Streetwear',
    featuredLookGroup: 'look-tokyo-night'
  },
  {
    id: 'men-03',
    name: 'SAKSOX Tactical Modular Cargo Trousers',
    slug: 'saksox-tactical-modular-cargo-trousers',
    category: 'men',
    subcategory: 'Cargo Pants',
    gender: 'men',
    price: 2199,
    originalPrice: 3299,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Relaxed wide-leg cargo pants tailored from winter-weight Japanese twill. Features 8 multi-depth 3D utility pockets, adjustable bungee ankle cinches, and magnetic snap closures.',
    details: [
      'Relaxed balloon taper cut with articulate knee darts',
      'Reinforced seat and double-stitched stress points',
      'Heavy-duty YKK matte black hardware',
      'Internal drawstring waistband'
    ],
    materials: '98% Cotton Heavy Twill, 2% Spandex',
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Graphite Black', hex: '#151618' },
      { name: 'Military Olive', hex: '#3e4235' }
    ],
    rating: 4.7,
    reviewsCount: 84,
    inStock: true,
    isTrending: true,
    winterCollection: 'Winter Streetwear',
    featuredLookGroup: 'look-tokyo-night'
  },
  {
    id: 'men-04',
    name: 'SAKSOX Mohair Blend Distressed Oversized Knit',
    slug: 'saksox-mohair-blend-distressed-oversized-knit',
    category: 'men',
    subcategory: 'Knitwear',
    gender: 'men',
    price: 2499,
    originalPrice: 3599,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Plush fuzzy mohair knit with subtle distressed hem and cuff accents. Slouchy relaxed drape that brings high-fashion texture to layered cold-weather fits.',
    details: [
      'Soft brushed mohair & wool blend yarn',
      'Non-itchy skin-friendly interior finish',
      'Drop-shoulder silhouette with wide rib neckline'
    ],
    materials: '40% Mohair, 35% Wool, 25% Polyamide',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ash Bone', hex: '#dedad2' },
      { name: 'Smoky Noir', hex: '#1c1d21' }
    ],
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    isWinterEdit: true,
    winterCollection: 'Quiet Luxury',
    featuredLookGroup: 'look-cashmere-lounge'
  },
  {
    id: 'men-05',
    name: 'SAKSOX Bonded Suede Shearling Aviator',
    slug: 'saksox-bonded-suede-shearling-aviator',
    category: 'men',
    subcategory: 'Winter Jackets',
    gender: 'men',
    price: 4499,
    originalPrice: 6999,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Statement aviator jacket featuring plush faux shearling lining, bonded velvety vegan suede shell, heavy industrial buckle collar, and storm-proof cuffs.',
    details: [
      'Heavyweight faux shearling insulated interior',
      'Dual collar throat latches with gunmetal hardware',
      'Angled welt pockets with reinforced rivets'
    ],
    materials: 'Shell: 100% Micro-Suede, Lining: 100% Thermal Faux Fur',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Jet', hex: '#0f1012' },
      { name: 'Espresso Tobacco', hex: '#3a2e26' }
    ],
    rating: 5.0,
    reviewsCount: 76,
    inStock: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Night Out'
  },
  {
    id: 'men-06',
    name: 'SAKSOX Cashmere-Touch Half-Zip Pullover',
    slug: 'saksox-cashmere-touch-half-zip-pullover',
    category: 'men',
    subcategory: 'Sweatshirts',
    gender: 'men',
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Minimalist quiet-luxury half-zip sweater with custom engraved SAKSOX silver zipper pull and micro-ribbed stand collar.',
    details: [
      'Ultra-fine merino-touch blend',
      'Anti-pilling treatment for longevity',
      'Tailored European modern cut'
    ],
    materials: '70% Fine Viscose, 30% Virgin Wool',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Cream', hex: '#f0ede6' },
      { name: 'Deep Slate', hex: '#2c3038' }
    ],
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    winterCollection: 'Quiet Luxury'
  },
  {
    id: 'men-07',
    name: 'SAKSOX Double-Breasted Woolen Trench',
    slug: 'saksox-double-breasted-woolen-trench',
    category: 'men',
    subcategory: 'Winter Jackets',
    gender: 'men',
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Longline tailored overcoat in rich charcoal Melton wool blend. Wide peak lapels, horn buttons, back storm flap, and removable self-fabric waist belt.',
    details: [
      'Heavy Melton wool blend (850 GSM)',
      'Silky monogrammed satin interior lining',
      'Deep interior passport and phone pockets',
      'Calf-length editorial silhouette'
    ],
    materials: '60% Wool, 40% Polyester Melton',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Melange', hex: '#2f3238' },
      { name: 'Camel Warmth', hex: '#b59a7a' }
    ],
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    isWinterEdit: true,
    winterCollection: 'Quiet Luxury'
  },
  {
    id: 'men-08',
    name: 'SAKSOX Matrix Cyber Ribbed Turtleneck',
    slug: 'saksox-matrix-cyber-ribbed-turtleneck',
    category: 'men',
    subcategory: 'Knitwear',
    gender: 'men',
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Fitted winter rib-knit roll neck sweater designed for sleek cold-season layering under puffers and wool overcoats.',
    details: [
      'Engineered stretch vertical ribbing',
      'Comfort-fold turtleneck that holds shape',
      'Breathable thermal yarn'
    ],
    materials: '80% Modal, 20% Spun Wool',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Black', hex: '#0a0a0c' },
      { name: 'Snow Frost', hex: '#f7f6f2' }
    ],
    rating: 4.7,
    reviewsCount: 43,
    inStock: true,
    winterCollection: 'Everyday Essentials'
  },
  {
    id: 'men-09',
    name: 'SAKSOX Quilted Liner Kimono Jacket',
    slug: 'saksox-quilted-liner-kimono-jacket',
    category: 'men',
    subcategory: 'Winter Jackets',
    gender: 'men',
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'East-meets-West winter hybrid. Onion-quilted padded jacket with wrap tie closure, drop shoulder, and patch utility pockets.',
    details: [
      'Micro-ripstop diamond quilt stitch',
      'Recycled thermal insulation core',
      'Wrap cord tie and snap button front'
    ],
    materials: '100% Recycled Poly Ripstop',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Smoky Olive', hex: '#373a32' },
      { name: 'Matte Black', hex: '#16171a' }
    ],
    rating: 4.8,
    reviewsCount: 37,
    inStock: true,
    isNewDrop: true
  },
  {
    id: 'men-10',
    name: 'SAKSOX Raw Edge Club Sweatshirt',
    slug: 'saksox-raw-edge-club-sweatshirt',
    category: 'men',
    subcategory: 'Sweatshirts',
    gender: 'men',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Clean crewneck cut with distressed raw hems, thick collar bind, and micro-embroidered SAKSOX cursive script on wrist.',
    details: [
      '420 GSM Terry Loop interior',
      'Raw cut rolled hemline',
      'Double-stitched shoulder seams'
    ],
    materials: '100% Cotton Terry',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Heather Grey', hex: '#63666f' },
      { name: 'Washed Oat', hex: '#d9d0c1' }
    ],
    rating: 4.6,
    reviewsCount: 49,
    inStock: true
  },
  {
    id: 'men-11',
    name: 'SAKSOX Cyber Fleece Zip Vest',
    slug: 'saksox-cyber-fleece-zip-vest',
    category: 'men',
    subcategory: 'Winter Jackets',
    gender: 'men',
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heavyweight sherpa fleece vest with nylon contrast chest pocket and reflective storm zipper for effortless transitional layering.',
    details: [
      'Deep pile thermal sherpa',
      'Contrast woven nylon overlays',
      'Elastic armhole bindings'
    ],
    materials: '100% Recycled Polyester Fleece',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Ivory / Black', hex: '#e8e5dc' },
      { name: 'All Black', hex: '#111215' }
    ],
    rating: 4.8,
    reviewsCount: 31,
    inStock: true
  },

  // ==================== WOMEN'S WINTER FASHION (11 items) ====================
  {
    id: 'women-01',
    name: 'SAKSOX Cloud Cocoon Cropped Down Jacket',
    slug: 'saksox-cloud-cocoon-cropped-down-jacket',
    category: 'women',
    subcategory: 'Winter Jackets',
    gender: 'women',
    price: 3299,
    originalPrice: 4899,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The defining winter silhouette. Dramatic high funnel neck, cropped cinched waist, ultra-light thermal down fill, and satin-finish water-resistant fabric.',
    details: [
      'Dramatic exaggerated high neck collar',
      'Adjustable internal bungee waist stopper',
      'Concealed magnetic snap placket',
      'Lined with silky anti-static satin'
    ],
    materials: '100% Water-repellent Microfiber, 80/20 Duck Down Fill',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Frosted Vanilla', hex: '#f6f4ee' },
      { name: 'Midnight Onyx', hex: '#141417' },
      { name: 'Bronze Truffle', hex: '#5c4d3c' }
    ],
    rating: 5.0,
    reviewsCount: 168,
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Winter Streetwear',
    featuredLookGroup: 'look-frost-angel'
  },
  {
    id: 'women-02',
    name: 'SAKSOX Chunky Cable Knit Balloon Sweater',
    slug: 'saksox-chunky-cable-knit-balloon-sweater',
    category: 'women',
    subcategory: 'Oversized Sweaters',
    gender: 'women',
    price: 2199,
    originalPrice: 3299,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculptural hand-feel chunky knit featuring exaggerated balloon sleeves, architectural cable pattern, and soft rolled mock neck.',
    details: [
      'Ultra-soft zero-itch merino blend',
      'Exaggerated voluminous sleeves with tight cuffs',
      'Dropped shoulder slouchy profile'
    ],
    materials: '55% Wool, 45% Organic Cotton',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Alabaster', hex: '#ede8dd' },
      { name: 'Charcoal Mocha', hex: '#3b3531' }
    ],
    rating: 4.9,
    reviewsCount: 114,
    inStock: true,
    isTrending: true,
    isWinterEdit: true,
    winterCollection: 'Quiet Luxury',
    featuredLookGroup: 'look-frost-angel'
  },
  {
    id: 'women-03',
    name: 'SAKSOX Velvet Touch Knit Co-ord Lounge Set',
    slug: 'saksox-velvet-touch-knit-co-ord-lounge-set',
    category: 'women',
    subcategory: 'Co-ord Sets',
    gender: 'women',
    price: 2899,
    originalPrice: 4299,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Two-piece matching winter statement set: relaxed drop-shoulder pullover and high-waisted wide-leg knit trousers with elasticated waist.',
    details: [
      'Includes matching top and wide-leg bottoms',
      'Plush cloud-soft micro-chenille ribbed knit',
      'Flattering drape with seamless side finishing'
    ],
    materials: '85% Viscose, 15% Stretch Polyamide',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#d1c7b7' },
      { name: 'Noir Espresso', hex: '#1a1918' }
    ],
    rating: 4.9,
    reviewsCount: 89,
    inStock: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Couple / Matching Looks',
    featuredLookGroup: 'look-cashmere-lounge'
  },
  {
    id: 'women-04',
    name: 'SAKSOX Maxi Belted Cashmere Wool Coat',
    slug: 'saksox-maxi-belted-cashmere-wool-coat',
    category: 'women',
    subcategory: 'Winter Jackets',
    gender: 'women',
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Floor-grazing cinematic coat tailored from double-faced cashmere and virgin wool. Fluid drape with exaggerated lapels and detachable tie belt.',
    details: [
      'Double-faced handcrafted edge finishing',
      'Deep patch pockets with micro-welt openings',
      'Ankle-length dramatic drape'
    ],
    materials: '30% Cashmere, 70% Virgin Wool',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1c1e22' },
      { name: 'Rich Camel', hex: '#9d7c58' }
    ],
    rating: 5.0,
    reviewsCount: 78,
    inStock: true,
    isWinterEdit: true,
    winterCollection: 'Quiet Luxury'
  },
  {
    id: 'women-05',
    name: 'SAKSOX Gothic Chrome Rhinestone Zip Hoodie',
    slug: 'saksox-gothic-chrome-rhinestone-zip-hoodie',
    category: 'women',
    subcategory: 'Hoodies',
    gender: 'women',
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Y2K cyber luxury full-zip hoodie with heat-pressed diamond-cut crystals forming the SAKSOX crest. Heavyweight fleece with oversized hood.',
    details: [
      'Precision rhinestone embellishments rated for 100+ washes',
      'Custom gunmetal cross zip pull',
      'Double-stitched kangaroo pockets'
    ],
    materials: '100% Heavy Combed Cotton Fleece (480 GSM)',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Abyss Black', hex: '#0e0e11' },
      { name: 'Silver Smoke', hex: '#878c94' }
    ],
    rating: 4.8,
    reviewsCount: 135,
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    winterCollection: 'Winter Streetwear'
  },
  {
    id: 'women-06',
    name: 'SAKSOX Fluffy Mohair Off-Shoulder Sweater',
    slug: 'saksox-fluffy-mohair-off-shoulder-sweater',
    category: 'women',
    subcategory: 'Knitwear',
    gender: 'women',
    price: 1899,
    originalPrice: 2699,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1520591799316-6b30425429aa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sensual winter glamour. Delicate brushed mohair knit designed to slip effortlessly off one shoulder. Cloud-like softness against bare skin.',
    details: [
      'Wide foldover boatneck styling',
      'Ribbed cuffs and waistband that taper neatly',
      'Airy feather-light warmth'
    ],
    materials: '45% Kid Mohair, 35% Wool, 20% Nylon',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Frosted Blush', hex: '#e8dbd7' },
      { name: 'Icy White', hex: '#fbfbfb' },
      { name: 'Jet Noir', hex: '#121214' }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    isWinterEdit: true,
    winterCollection: 'Night Out'
  },
  {
    id: 'women-07',
    name: 'SAKSOX Faux Leather Shearling Trim Moto',
    slug: 'saksox-faux-leather-shearling-trim-moto',
    category: 'women',
    subcategory: 'Winter Jackets',
    gender: 'women',
    price: 3799,
    originalPrice: 5499,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Distressed vintage cracked vegan leather jacket lined with thick ivory faux fur. Asymmetric zipper and buckle belt waistband for the ultimate winter night-out statement.',
    details: [
      'Antiqued vegan leather with crackle finish',
      'Faux shearling lapel, cuff, and hem trims',
      'Zippered sleeve gussets'
    ],
    materials: '100% Polyurethane Vegan Leather, Fur: 100% Poly',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Distressed Black', hex: '#1c1b1a' },
      { name: 'Rich Espresso', hex: '#372a24' }
    ],
    rating: 4.9,
    reviewsCount: 92,
    inStock: true,
    isTrending: true,
    winterCollection: 'Night Out'
  },
  {
    id: 'women-08',
    name: 'SAKSOX Pleated Thermal Knit Maxi Skirt',
    slug: 'saksox-pleated-thermal-knit-maxi-skirt',
    category: 'women',
    subcategory: 'Knitwear',
    gender: 'women',
    price: 1799,
    originalPrice: 2599,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-waisted accordion pleated knit skirt crafted from heavy winter-weight yarn with an elasticated waistband and fluid motion.',
    details: [
      'Permanently set architectural accordion pleats',
      'Comfort stretch knit lining',
      'Pairs perfectly with cropped down jackets and high boots'
    ],
    materials: '75% Viscose, 25% Polyester',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Slate Charcoal', hex: '#2c2e35' },
      { name: 'Almond Beige', hex: '#d6c8b4' }
    ],
    rating: 4.7,
    reviewsCount: 54,
    inStock: true
  },
  {
    id: 'women-09',
    name: 'SAKSOX Liquid Silver Puffer Vest',
    slug: 'saksox-liquid-silver-puffer-vest',
    category: 'women',
    subcategory: 'Winter Jackets',
    gender: 'women',
    price: 2399,
    originalPrice: 3499,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-shine metallic silver sleeveless puffer with chunky snap buttons, bungee cropped hem, and insulated stand collar.',
    details: [
      'Ultra-glossy metallic finish nylon',
      'Thermal fiberfill down alternative',
      'Fleece-lined hand warmer pockets'
    ],
    materials: '100% Metallic Coated Nylon',
    sizes: ['XS', 'S', 'M'],
    colors: [
      { name: 'Chrome Silver', hex: '#d9dcde' },
      { name: 'Gloss Black', hex: '#0f1012' }
    ],
    rating: 4.8,
    reviewsCount: 41,
    inStock: true,
    isNewDrop: true
  },
  {
    id: 'women-10',
    name: 'SAKSOX Cashmere Rib Knit Beanie & Mitt Set',
    slug: 'saksox-cashmere-rib-knit-beanie-mitt-set',
    category: 'women',
    subcategory: 'Winter Accessories',
    gender: 'women',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cozy cashmere-blend cuffed beanie with matching fingerless texting mittens. Presented in a matte black SAKSOX gift box.',
    details: [
      'Includes ribbed beanie and matching arm warmers',
      'Gold foil embossed SAKSOX woven label',
      'Buttery soft 100% anti-itch weave'
    ],
    materials: '50% Cashmere Blend, 50% Fine Merino',
    sizes: ['One Size'],
    colors: [
      { name: 'Vanilla Cream', hex: '#eee9dd' },
      { name: 'Charcoal Black', hex: '#19191d' }
    ],
    rating: 4.9,
    reviewsCount: 104,
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'women-11',
    name: 'SAKSOX Slouchy Zip Fleece Pullover',
    slug: 'saksox-slouchy-zip-fleece-pullover',
    category: 'women',
    subcategory: 'Sweatshirts',
    gender: 'women',
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520591799316-6b30425429aa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Teddy bear textured fleece with silver ring zipper pull, oversized slouch silhouette, and cinched elastic hem.',
    details: [
      'High-loft microfleece insulation',
      'Breathable jersey knit interior',
      'Deep kangaroo pocket'
    ],
    materials: '100% Recycled Poly Sherpa',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Desert Camel', hex: '#bfa78a' },
      { name: 'Midnight', hex: '#16171b' }
    ],
    rating: 4.7,
    reviewsCount: 46,
    inStock: true
  },

  // ==================== FRAGRANCES (16 items) ====================
  {
    id: 'frag-01',
    name: 'SAKSOX Midnight Noir Extrait de Parfum',
    slug: 'saksox-midnight-noir-extrait-de-parfum',
    category: 'fragrances',
    subcategory: 'Unisex Perfumes',
    gender: 'unisex',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The definitive SAKSOX signature scent. A mesmerizing collision of smoked tonka bean, Madagascar vanilla, black leather, and mysterious nocturnal amber that lingers until dawn.',
    details: [
      '30% Extrait de Parfum oil concentration',
      'Crafted in Grasse, France & bottled in India',
      'Macerated for 90 days for peak depth and projection',
      'Heavy magnetic zamak cap with engraved SAKSOX monogram'
    ],
    fragranceFamily: 'woody',
    fragranceNotes: {
      top: ['Smoked Bergamot', 'Pink Peppercorn', 'Cardamom Pod'],
      heart: ['Dark Leather Accord', 'Atlas Cedarwood', 'Rum Absolute'],
      base: ['Roasted Tonka Bean', 'Madagascar Vanilla', 'Smoky Amber', 'Vetiver']
    },
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    longevity: '14+ Hours on Skin, 48 Hours on Coats',
    sillage: 'Intense & Magnetic (Leaves a cinematic trail)',
    occasion: 'Winter Evenings, VIP Events, Midnight Intimacy',
    sizes: ['50ml', '100ml'],
    rating: 4.98,
    reviewsCount: 320,
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Winter Fragrance',
    featuredLookGroup: 'look-tokyo-night'
  },
  {
    id: 'frag-02',
    name: 'SAKSOX Velvet Night EDP',
    slug: 'saksox-velvet-night-edp',
    category: 'fragrances',
    subcategory: 'Women’s Perfumes',
    gender: 'women',
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An intoxicating, velvety elixir of midnight damask rose drenched in saffron and aged dark chocolate amber. Opulent, seductive, and undeniably Gen Z high fashion.',
    details: [
      '24% Eau de Parfum concentration',
      'Sensual cold-weather gourmand floral profile',
      'Frosted smoked glass bottle with gold collar'
    ],
    fragranceFamily: 'sweet',
    fragranceNotes: {
      top: ['Persian Saffron', 'Blood Orange', 'Candied Violet'],
      heart: ['Velvet Damask Rose', 'Gourmand Cocoa', 'Jasmine Sambac'],
      base: ['Liquid Amber', 'Sandalwood Mysore', 'White Musk', 'Praline']
    },
    concentration: 'Eau de Parfum (24% Oil Concentration)',
    longevity: '12+ Hours on Skin',
    sillage: 'Moderate to Heavy (Enveloping bubble)',
    occasion: 'Date Nights, Club Lounge, Festive Galas',
    sizes: ['50ml', '100ml'],
    rating: 4.95,
    reviewsCount: 215,
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isWinterEdit: true,
    winterCollection: 'Winter Fragrance',
    featuredLookGroup: 'look-frost-angel'
  },
  {
    id: 'frag-03',
    name: 'SAKSOX Cyber Oud & Fireplace EDP',
    slug: 'saksox-cyber-oud-fireplace-edp',
    category: 'fragrances',
    subcategory: 'Men’s Perfumes',
    gender: 'men',
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crackling birch wood, chestnut praline, and modern transparent Cambodian oud. Warm as an open hearth on a freezing December night in Delhi.',
    details: [
      '26% concentration for unmatched winter radiance',
      'Zero synthetic screech — smooth aged woods',
      'Hand-polished heavyweight bottle'
    ],
    fragranceFamily: 'woody',
    fragranceNotes: {
      top: ['Clove Bud', 'Orange Blossom', 'Pink Pepper'],
      heart: ['Roasted Chestnut', 'Guaiac Wood', 'Juniper'],
      base: ['Cambodian Oud', 'Peru Balsam', 'Cashmere Wood', 'Vanilla']
    },
    concentration: 'Eau de Parfum (26% Oil Concentration)',
    longevity: '14+ Hours on Skin',
    sillage: 'Heavy & Cozy',
    occasion: 'Cold Winter Evenings, Outdoor Gatherings',
    sizes: ['50ml', '100ml'],
    rating: 4.88,
    reviewsCount: 180,
    inStock: true,
    isBestSeller: true,
    winterCollection: 'Winter Fragrance'
  },
  {
    id: 'frag-04',
    name: 'SAKSOX Glacier Glaze Pure Extrait',
    slug: 'saksox-glacier-glaze-pure-extrait',
    category: 'fragrances',
    subcategory: 'Unisex Perfumes',
    gender: 'unisex',
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crisp, sub-zero mountain air crystallized with sparkling iced aldehydes, peppermint frost, crisp juniper berries, and mineral white amber.',
    details: [
      'Pure frosted aquatic cold-weather profile',
      'Metallic silver chrome bottle with magnetic cap',
      'Unique icy sillage that turns heads in closed spaces'
    ],
    fragranceFamily: 'aquatic',
    fragranceNotes: {
      top: ['Sub-zero Aldehydes', 'Frosted Mint', 'Frozen Lemon'],
      heart: ['Alpine Juniper', 'Eucalyptus Blossom', 'Ozonic Crisp Breeze'],
      base: ['Mineral Ambergris', 'White Musk', 'Nordic Pine', 'Clean Cedar']
    },
    concentration: 'Extrait de Parfum (28% Oil Concentration)',
    longevity: '10-12 Hours on Skin',
    sillage: 'Sharp & Radiant',
    occasion: 'Daily Signature, Studio Sessions, Winter Sunsets',
    sizes: ['50ml', '100ml'],
    rating: 4.9,
    reviewsCount: 132,
    inStock: true,
    isNewDrop: true,
    winterCollection: 'Winter Fragrance'
  },
  {
    id: 'frag-05',
    name: 'SAKSOX Smoke & Vanilla Bourbon',
    slug: 'saksox-smoke-vanilla-bourbon',
    category: 'fragrances',
    subcategory: 'Unisex Perfumes',
    gender: 'unisex',
    price: 2399,
    originalPrice: 3499,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Rich oak-barrel aged bourbon whiskey blended with charred vanilla beans, honeyed pipe tobacco, and spicy cinnamon bark.',
    details: [
      'Matured in charred French oak casks prior to bottling',
      'Deep amber liquid tint without artificial coloring',
      'Ultimate cozy indulgence'
    ],
    fragranceFamily: 'spicy',
    fragranceNotes: {
      top: ['Bourbon Whiskey Accord', 'Ceylon Cinnamon', 'Nutmeg'],
      heart: ['Blonde Tobacco Leaf', 'Dark Honey', 'Cacao Pod'],
      base: ['Charred Bourbon Vanilla', 'Benzoin Resin', 'Smoky Oak']
    },
    concentration: 'Eau de Parfum (25% Oil Concentration)',
    longevity: '14+ Hours on Skin',
    sillage: 'Intoxication Room-Filler',
    occasion: 'Late Night Parties, Winter Dates, Fireside Talks',
    sizes: ['50ml', '100ml'],
    rating: 4.94,
    reviewsCount: 175,
    inStock: true,
    isTrending: true,
    winterCollection: 'Winter Fragrance'
  },
  {
    id: 'frag-06',
    name: 'SAKSOX Cashmere Skin Clean Musk',
    slug: 'saksox-cashmere-skin-clean-musk',
    category: 'fragrances',
    subcategory: 'Women’s Perfumes',
    gender: 'women',
    price: 1899,
    originalPrice: 2699,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The epitome of Quiet Luxury. Smells like expensive clean cashmere against warm skin, delicate powdery iris, ambrette seed, and silky white musk.',
    details: [
      'Hypoallergenic fragrance base formulation',
      'Subtle yet unforgettable second-skin intimacy',
      'Minimalist frosted ivory bottle'
    ],
    fragranceFamily: 'musky',
    fragranceNotes: {
      top: ['Ambrette Seed', 'White Tea Leaf', 'Bergamot Zest'],
      heart: ['Florentine Iris', 'Orris Butter', 'Powdery Heliotrope'],
      base: ['Clean Skin Musk', 'Cashmeran', 'White Sandalwood', 'Iso E Super']
    },
    concentration: 'Eau de Parfum (22% Oil Concentration)',
    longevity: '10-12 Hours close to skin',
    sillage: 'Intimate & Alluring (Close radius)',
    occasion: 'Office, University, Daily Luxury, Layering Base',
    sizes: ['50ml', '100ml'],
    rating: 4.91,
    reviewsCount: 148,
    inStock: true,
    isBestSeller: true,
    winterCollection: 'Quiet Luxury'
  },
  {
    id: 'frag-07',
    name: 'SAKSOX Citrus Frost & Vetiver',
    slug: 'saksox-citrus-frost-vetiver',
    category: 'fragrances',
    subcategory: 'Men’s Perfumes',
    gender: 'men',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crisp winter morning in a bottle. Blood grapefruit and icy lime chilled over earthy Haitian vetiver and sharp black pepper.',
    details: [
      'Energizing cold-season fresh profile',
      'Long-lasting natural citrus distillation',
      'Day-to-night versatility'
    ],
    fragranceFamily: 'fresh',
    fragranceNotes: {
      top: ['Frozen Grapefruit', 'Finger Lime', 'Pink Pepper'],
      heart: ['Vetiver Root', 'Geranium Leaf', 'Black Pepper'],
      base: ['Cedarwood', 'Benzoin', 'Clean Amber']
    },
    concentration: 'Eau de Parfum (22% Oil Concentration)',
    longevity: '9-11 Hours',
    sillage: 'Fresh & Crisp',
    occasion: 'Daytime, Workwear, Gym & Active Days',
    sizes: ['50ml', '100ml'],
    rating: 4.75,
    reviewsCount: 96,
    inStock: true
  },
  {
    id: 'frag-08',
    name: 'SAKSOX Spiced Cardamom & Black Amber',
    slug: 'saksox-spiced-cardamom-black-amber',
    category: 'fragrances',
    subcategory: 'Unisex Perfumes',
    gender: 'unisex',
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ode to Indian winter spices elevated into haute perfumery. Green Malabar cardamom paired with black pepper, saffron oil, and heavy crystalline black amber.',
    details: [
      'Locally sourced sustainable Malabar cardamom oils',
      'Deep, mysterious spicy amber signature',
      'Unisex powerhouse longevity'
    ],
    fragranceFamily: 'spicy',
    fragranceNotes: {
      top: ['Crushed Green Cardamom', 'Black Peppercorn', 'Grapefruit'],
      heart: ['Smoked Saffron', 'Nutmeg', 'Coriander Seed'],
      base: ['Black Amber', 'Patchouli Heart', 'Ebony Wood']
    },
    concentration: 'Extrait de Parfum (28% Oil Concentration)',
    longevity: '14+ Hours on Skin',
    sillage: 'Loud & Seductive',
    occasion: 'Winter Weddings, Night Out, Festivals',
    sizes: ['50ml', '100ml'],
    rating: 4.92,
    reviewsCount: 118,
    inStock: true,
    isTrending: true
  },
  {
    id: 'frag-09',
    name: 'SAKSOX Santal Royale & Papyrus',
    slug: 'saksox-santal-royale-papyrus',
    category: 'fragrances',
    subcategory: 'Unisex Perfumes',
    gender: 'unisex',
    price: 2399,
    originalPrice: 3399,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Creamy Australian and Mysore sandalwood woven with smoky Egyptian papyrus, dry violet leaf, and spicy cardamom.',
    details: [
      'Cult favorite aesthetic woody scent profile',
      'Smooth, creamy, zero sharp edges',
      'Perfect unisex signature scent'
    ],
    fragranceFamily: 'woody',
    fragranceNotes: {
      top: ['Violet Leaf', 'Cardamom', 'Iris'],
      heart: ['Papyrus Reed', 'Ambrox', 'Cedarwood'],
      base: ['Mysore Sandalwood', 'Leather Accord', 'Warm Musk']
    },
    concentration: 'Eau de Parfum (25% Oil Concentration)',
    longevity: '12+ Hours on Skin',
    sillage: 'Sophisticated & Warm',
    occasion: 'Art Galleries, Cafes, Daily Signature',
    sizes: ['50ml', '100ml'],
    rating: 4.89,
    reviewsCount: 162,
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'frag-10',
    name: 'SAKSOX Cherry Smoke & Bitter Almond',
    slug: 'saksox-cherry-smoke-bitter-almond',
    category: 'fragrances',
    subcategory: 'Women’s Perfumes',
    gender: 'women',
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Dark, rebellious and addictive. Ripe black cherries soaked in amaretto liqueur, swirled with osmanthus blossom and smoldering woodsmoke.',
    details: [
      'Lethal gourmand smoky cherry profile',
      'Deep ruby glass bottle with heavy gold atomizer',
      'Guaranteed compliment magnet'
    ],
    fragranceFamily: 'sweet',
    fragranceNotes: {
      top: ['Black Cherry Nectar', 'Bitter Almond', 'Cherry Liqueur'],
      heart: ['Turkish Rose', 'Osmanthus', 'Smoked Saffron'],
      base: ['Peruvian Balsam', 'Roasted Tonka', 'Smoked Guaiac', 'Sandalwood']
    },
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    longevity: '14+ Hours on Skin',
    sillage: 'Heavy & Addictive',
    occasion: 'Club Nights, Winter Parties, Statement Dressing',
    sizes: ['50ml', '100ml'],
    rating: 4.97,
    reviewsCount: 204,
    inStock: true,
    isTrending: true,
    isNewDrop: true
  },
  {
    id: 'frag-11',
    name: 'SAKSOX Discovery Set — The Winter Collection (5x10ml)',
    slug: 'saksox-discovery-set-winter-collection',
    category: 'fragrances',
    subcategory: 'Gift Sets',
    gender: 'unisex',
    price: 1499,
    originalPrice: 2299,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Experience all 5 iconic SAKSOX winter creations in deluxe 10ml atomizers. Includes ₹500 store voucher redeemable against any 50ml/100ml bottle.',
    details: [
      '5 x 10ml travel spray bottles with metal shells',
      'Includes Midnight Noir, Velvet Night, Cyber Oud, Glacier Glaze, Cashmere Skin',
      'Packaged in an embossed magnetic keepsake box',
      'Includes ₹500 cashback gift card inside'
    ],
    fragranceFamily: 'woody',
    concentration: 'Collection of EDP & Extrait de Parfum (24-30%)',
    longevity: '12+ Hours each',
    sillage: 'Variable',
    occasion: 'Gifting, Sampling, Travel',
    sizes: ['5 x 10ml Vials'],
    rating: 4.99,
    reviewsCount: 410,
    inStock: true,
    isBestSeller: true,
    isNewDrop: true
  },
  {
    id: 'frag-12',
    name: 'SAKSOX Midnight Noir Pocket Travel Extrait (15ml)',
    slug: 'saksox-midnight-noir-pocket-travel-extrait-15ml',
    category: 'fragrances',
    subcategory: 'Travel Size',
    gender: 'unisex',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Your favorite Midnight Noir signature scent housed in an aircraft-grade aluminum twist-up atomizing case. Shatterproof and refillable.',
    details: [
      '15ml aircraft-grade anodized aluminum travel case',
      'Twist-up spray mechanism — no cap to lose',
      'Approved for carry-on luggage across all airlines'
    ],
    fragranceFamily: 'woody',
    fragranceNotes: {
      top: ['Smoked Bergamot', 'Pink Peppercorn'],
      heart: ['Dark Leather Accord', 'Atlas Cedarwood'],
      base: ['Tonka Bean', 'Smoky Amber', 'Vanilla']
    },
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    longevity: '14+ Hours',
    sillage: 'Magnetic',
    occasion: 'Travel, Everyday Carry, Touch-ups',
    sizes: ['15ml'],
    rating: 4.88,
    reviewsCount: 88,
    inStock: true
  },
  {
    id: 'frag-13',
    name: 'SAKSOX Aqua Frost Ocean Mineral EDP',
    slug: 'saksox-aqua-frost-ocean-mineral-edp',
    category: 'fragrances',
    subcategory: 'Eau de Parfum',
    gender: 'men',
    price: 1699,
    originalPrice: 2399,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chilled sea salt spray crashing against frozen coastal rocks. Calone, mineral driftwood, sea kelp, and a cool mint blast.',
    details: [
      'Mineral marine fragrance for cold weather dynamism',
      'Crisp high-diffusion atomizer',
      'Long-lasting aquatic base'
    ],
    fragranceFamily: 'aquatic',
    fragranceNotes: {
      top: ['Sea Salt Spray', 'Frozen Bergamot', 'Marine Calone'],
      heart: ['Sea Kelp', 'Rosemary', 'Driftwood'],
      base: ['Mineral Ambergris', 'Cedar', 'White Musk']
    },
    concentration: 'Eau de Parfum (22% Oil Concentration)',
    longevity: '10 Hours',
    sillage: 'Moderate Fresh',
    occasion: 'Daywear, Post-workout, Casual Brunches',
    sizes: ['50ml', '100ml'],
    rating: 4.72,
    reviewsCount: 65,
    inStock: true
  },
  {
    id: 'frag-14',
    name: 'SAKSOX White Musk & Frosted Lily EDP',
    slug: 'saksox-white-musk-frosted-lily-edp',
    category: 'fragrances',
    subcategory: 'Women’s Perfumes',
    gender: 'women',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal veil of frosted Casablanca lilies, sparkling aldehyde bubbles, velvety white musk, and delicate coconut water nectar.',
    details: [
      'Clean floral musk with frosty cold sparkle',
      'Soft pastel ivory bottle design',
      'Perfect romantic daytime scent'
    ],
    fragranceFamily: 'musky',
    fragranceNotes: {
      top: ['Frosted Lily', 'Coconut Water', 'Dewy Pear'],
      heart: ['Casablanca Lily', 'Jasmine Petals', 'White Peony'],
      base: ['Clean White Musk', 'Blonde Woods', 'Cacao Butter']
    },
    concentration: 'Eau de Parfum (22% Oil Concentration)',
    longevity: '9-11 Hours',
    sillage: 'Delicate & Charming',
    occasion: 'Brunch, College, Day Outings',
    sizes: ['50ml', '100ml'],
    rating: 4.84,
    reviewsCount: 89,
    inStock: true
  },
  {
    id: 'frag-15',
    name: 'SAKSOX Velvet Night Travel Spray (15ml)',
    slug: 'saksox-velvet-night-travel-spray-15ml',
    category: 'fragrances',
    subcategory: 'Travel Size',
    gender: 'women',
    price: 749,
    originalPrice: 1099,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The viral Velvet Night scent in an elegant rose-gold twist travel casing. Keep it in your micro-bag for spontaneous evening touches.',
    details: [
      '15ml refillable twist-up capsule',
      'Matte rose-gold anodized finish',
      'Fits inside mini handbags and evening clutches'
    ],
    fragranceFamily: 'sweet',
    fragranceNotes: {
      top: ['Persian Saffron', 'Blood Orange'],
      heart: ['Velvet Damask Rose', 'Gourmand Cocoa'],
      base: ['Liquid Amber', 'Sandalwood', 'White Musk']
    },
    concentration: 'Eau de Parfum (24% Oil Concentration)',
    longevity: '12+ Hours',
    sillage: 'Enveloping',
    occasion: 'Evening touch-ups, Travel',
    sizes: ['15ml'],
    rating: 4.91,
    reviewsCount: 73,
    inStock: true
  },
  {
    id: 'frag-16',
    name: 'SAKSOX The Royal Duo Gift Set (2x50ml)',
    slug: 'saksox-the-royal-duo-gift-set-2x50ml',
    category: 'fragrances',
    subcategory: 'Gift Sets',
    gender: 'unisex',
    price: 3699,
    originalPrice: 5299,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The power couple box: 50ml Midnight Noir Extrait + 50ml Velvet Night EDP in a velvet-lined collector display case.',
    details: [
      'Includes two full 50ml bottles with magnetic caps',
      'Velvet-lined luxury presentation box with satin ribbon',
      'Ideal anniversary or luxury holiday gift'
    ],
    fragranceFamily: 'woody',
    concentration: 'Dual Extrait & EDP set',
    longevity: '14+ Hours',
    sillage: 'Magnetic',
    occasion: 'Weddings, Anniversaries, Luxury Gifting',
    sizes: ['2 x 50ml Bottles'],
    rating: 5.0,
    reviewsCount: 154,
    inStock: true,
    isBestSeller: true
  },

  // ==================== ACCESSORIES (12 items) ====================
  {
    id: 'acc-01',
    name: 'SAKSOX Heavy Ribbed Merino Beanie',
    slug: 'saksox-heavy-ribbed-merino-beanie',
    category: 'accessories',
    subcategory: 'Beanies',
    gender: 'unisex',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Thick fisherman-style ribbed beanie with fold-over cuff and brushed metallic gunmetal SAKSOX clip tag.',
    details: [
      '100% Extrafine Merino Wool',
      'Zero forehead itching guarantee',
      'Snug fit that stretches comfortably'
    ],
    materials: '100% Merino Wool',
    sizes: ['One Size'],
    colors: [
      { name: 'Onyx Black', hex: '#121214' },
      { name: 'Frost Bone', hex: '#ede8dd' },
      { name: 'Charcoal Grey', hex: '#484b54' }
    ],
    rating: 4.88,
    reviewsCount: 185,
    inStock: true,
    isBestSeller: true,
    featuredLookGroup: 'look-tokyo-night'
  },
  {
    id: 'acc-02',
    name: 'SAKSOX Shadow Shield Minimalist Sunglasses',
    slug: 'saksox-shadow-shield-minimalist-sunglasses',
    category: 'accessories',
    subcategory: 'Sunglasses',
    gender: 'unisex',
    price: 1499,
    originalPrice: 2299,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Futuristic angular rectangular sunglasses with pitch-black polarized lenses, UV400 protection, and bevel-cut acetate frame.',
    details: [
      'CAT-3 UV400 polarized black lenses',
      'Hand-polished bio-acetate frame with metal core',
      'Laser engraved SAKSOX temple logo',
      'Includes magnetic leather case and microfiber cloth'
    ],
    materials: 'Italian Bio-Acetate & TAC Polarized Lenses',
    sizes: ['One Size'],
    colors: [
      { name: 'Gloss Black', hex: '#0d0d0f' },
      { name: 'Tortoise Amber', hex: '#5c381c' }
    ],
    rating: 4.92,
    reviewsCount: 142,
    inStock: true,
    isTrending: true,
    featuredLookGroup: 'look-frost-angel'
  },
  {
    id: 'acc-03',
    name: 'SAKSOX Chunky Fringe Woolen Blanket Scarf',
    slug: 'saksox-chunky-fringe-woolen-blanket-scarf',
    category: 'accessories',
    subcategory: 'Scarves',
    gender: 'unisex',
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Oversized plush blanket scarf with twisted thick tassel fringes. Wrap yourself in pure warmth against biting winter chill.',
    details: [
      'Massive 220cm x 50cm editorial size',
      'Brushed thermal mohair-feel finish',
      'Woven contrast SAKSOX corner patch'
    ],
    materials: '60% Wool, 40% Acrylic',
    sizes: ['220cm x 50cm'],
    colors: [
      { name: 'Oatmeal Check', hex: '#cfc4b2' },
      { name: 'Solid Charcoal', hex: '#23252a' }
    ],
    rating: 4.85,
    reviewsCount: 93,
    inStock: true,
    isWinterEdit: true,
    winterCollection: 'Everyday Essentials'
  },
  {
    id: 'acc-04',
    name: 'SAKSOX Modular Padded Crossbody Sling',
    slug: 'saksox-modular-padded-crossbody-sling',
    category: 'accessories',
    subcategory: 'Bags',
    gender: 'unisex',
    price: 1899,
    originalPrice: 2799,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Padded ripstop nylon cross-body bag with FIDLOCK magnetic quick-release buckle, waterproof zippers, and internal tablet sleeve.',
    details: [
      'Waterproof Cordura & micro-ripstop shell',
      'German Fidlock magnetic buckle mechanism',
      'Padded shockproof compartment for iPad Mini & Kindle'
    ],
    materials: 'Waterproof Nylon Ripstop',
    sizes: ['4 Liters'],
    colors: [
      { name: 'Stealth Black', hex: '#131417' },
      { name: 'Frost Grey', hex: '#777d88' }
    ],
    rating: 4.93,
    reviewsCount: 110,
    inStock: true,
    isTrending: true
  },
  {
    id: 'acc-05',
    name: 'SAKSOX Obsidian All-Black Chronograph',
    slug: 'saksox-obsidian-all-black-chronograph',
    category: 'accessories',
    subcategory: 'Watches',
    gender: 'unisex',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Matte black DLC coated 316L surgical stainless steel timepiece with sapphire crystal glass, Japanese quartz movement, and interchangeable metal mesh strap.',
    details: [
      '316L Surgical Grade Stainless Steel (DLC Matte Coated)',
      'Scratch-resistant anti-reflective Sapphire Crystal',
      '50M Water Resistance (5 ATM)',
      'Luminescent hour markers that glow cold-blue in darkness'
    ],
    materials: '316L Stainless Steel & Sapphire Glass',
    sizes: ['40mm Dial'],
    colors: [
      { name: 'Matte Blackout', hex: '#111214' },
      { name: 'Brushed Titanium', hex: '#8a8e97' }
    ],
    rating: 4.96,
    reviewsCount: 84,
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'acc-06',
    name: 'SAKSOX Distressed Cyber Twill Cap',
    slug: 'saksox-distressed-cyber-twill-cap',
    category: 'accessories',
    subcategory: 'Caps',
    gender: 'unisex',
    price: 849,
    originalPrice: 1199,
    discount: 29,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Unstructured vintage dad cap crafted from heavy washed twill with subtle visor distressing and 3D gothic SAKSOX embroidery.',
    details: [
      '100% Washed Vintage Cotton Twill',
      'Metal buckle strapback closure',
      'Sweat-wicking interior band'
    ],
    materials: '100% Combed Twill',
    sizes: ['Adjustable Strapback'],
    colors: [
      { name: 'Washed Black', hex: '#232428' },
      { name: 'Bone Taupe', hex: '#d4cbbe' }
    ],
    rating: 4.79,
    reviewsCount: 76,
    inStock: true
  },
  {
    id: 'acc-07',
    name: 'SAKSOX Quilted Cloud Tote Bag',
    slug: 'saksox-quilted-cloud-tote-bag',
    category: 'accessories',
    subcategory: 'Bags',
    gender: 'women',
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The viral oversized pillow tote. Super-lightweight puffed cloud texture, wide ergonomic shoulder straps, and padded 16-inch laptop pocket.',
    details: [
      'Ultra-soft puffy quilted nylon',
      'Dedicated padded 16" laptop sleeve + bottle holder',
      'Magnetic top snap closure and interior zip pocket'
    ],
    materials: '100% Quilted Nylon Ripstop',
    sizes: ['20 Liters'],
    colors: [
      { name: 'Midnight Pitch', hex: '#111215' },
      { name: 'Frosted Ecru', hex: '#f0ede6' }
    ],
    rating: 4.95,
    reviewsCount: 162,
    inStock: true,
    isTrending: true,
    isBestSeller: true
  },
  {
    id: 'acc-08',
    name: 'SAKSOX Silver Monogram Leather Belt',
    slug: 'saksox-silver-monogram-leather-belt',
    category: 'accessories',
    subcategory: 'Caps',
    gender: 'unisex',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Full-grain Italian leather belt accented with custom sculpted SAKSOX silver buckle in brushed palladium finish.',
    details: [
      'Full Grain Vegetable Tanned Leather (3.5mm thick)',
      'Solid brass buckle with brushed palladium coating',
      'Width: 35mm — fits standard trouser loops'
    ],
    materials: '100% Genuine Full-Grain Leather',
    sizes: ['30-32', '34-36', '38-40'],
    colors: [
      { name: 'Classic Black', hex: '#0f1012' }
    ],
    rating: 4.83,
    reviewsCount: 58,
    inStock: true
  },
  {
    id: 'acc-09',
    name: 'SAKSOX Thermal Touchscreen Leather Gloves',
    slug: 'saksox-thermal-touchscreen-leather-gloves',
    category: 'accessories',
    subcategory: 'Caps',
    gender: 'unisex',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Supple lambskin leather gloves lined with 100% cashmere. Conductive nano-technology enables responsive smartphone scrolling in cold air.',
    details: [
      'Full conductive leather surface on thumb and index fingers',
      '100% Mongolian Cashmere knitted lining',
      'Water and wind resistant treated exterior'
    ],
    materials: '100% Lambskin Leather, Lining: Cashmere',
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Matte Jet Black', hex: '#111214' }
    ],
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    isWinterEdit: true
  },
  {
    id: 'acc-10',
    name: 'SAKSOX Metal Chain Carabiner Lanyard',
    slug: 'saksox-metal-chain-carabiner-lanyard',
    category: 'accessories',
    subcategory: 'Caps',
    gender: 'unisex',
    price: 699,
    originalPrice: 999,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heavy industrial curb chain with engraved quick-release climbing carabiner and woven nylon strap. Clips to belt loops or bags.',
    details: [
      'Heavyweight zinc alloy curb chain',
      'Spring-loaded tactical carabiner gate',
      'Laser engraved typography'
    ],
    materials: 'Zinc Alloy & Industrial Nylon',
    sizes: ['One Size (45cm)'],
    colors: [
      { name: 'Brushed Silver', hex: '#b8bcc4' },
      { name: 'Gunmetal Dark', hex: '#373a42' }
    ],
    rating: 4.81,
    reviewsCount: 52,
    inStock: true
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'CIRCLE15',
    discountPercent: 15,
    description: '15% off on your first order for The Circle members. No minimum spend.'
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    description: '10% off on your first order. No minimum spend.'
  },
  {
    code: 'WINTERDROP',
    discountPercent: 15,
    minOrderValue: 2499,
    description: '15% off on winter drops for orders above ₹2,499'
  },
  {
    code: 'SAKSOXVIP',
    discountFlat: 500,
    minOrderValue: 3999,
    description: 'Flat ₹500 off on luxury winter cart above ₹3,999'
  }
];

export interface CompleteTheLookBundle {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  jacketId: string;
  hoodieId: string;
  pantOrSkirtId: string;
  perfumeId: string;
  discountPercent: number;
}

export const COMPLETE_THE_LOOK_BUNDLES: CompleteTheLookBundle[] = [
  {
    id: 'bundle-tokyo-night',
    title: 'Tokyo Midnight Cyber Look',
    subtitle: 'Down Puffer + 500GSM Acid Hoodie + Modular Cargos + Midnight Noir Extrait',
    theme: 'Dark Streetwear & Sensual Amber',
    jacketId: 'men-01',
    hoodieId: 'men-02',
    pantOrSkirtId: 'men-03',
    perfumeId: 'frag-01',
    discountPercent: 15
  },
  {
    id: 'bundle-frost-angel',
    title: 'Winter High Society Look',
    subtitle: 'Cloud Cocoon Cropped Puffer + Cable Knit Balloon + Shadow Shield Glasses + Velvet Night EDP',
    theme: 'Frosted Vanilla & Gourmet Velvet Rose',
    jacketId: 'women-01',
    hoodieId: 'women-02',
    pantOrSkirtId: 'women-08',
    perfumeId: 'frag-02',
    discountPercent: 15
  },
  {
    id: 'bundle-quiet-luxury',
    title: 'Quiet Luxury Weekend Look',
    subtitle: 'Woolen Trench + Mohair Knit + Merino Beanie + Santal Royale',
    theme: 'Warm Neutral Layers & Creamy Sandalwood',
    jacketId: 'men-07',
    hoodieId: 'men-04',
    pantOrSkirtId: 'men-03',
    perfumeId: 'frag-09',
    discountPercent: 15
  }
];
