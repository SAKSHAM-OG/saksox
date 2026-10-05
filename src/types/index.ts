export type ProductCategory = 'men' | 'women' | 'fragrances' | 'accessories';
export type Gender = 'men' | 'women' | 'unisex';

export type FragranceFamily = 'fresh' | 'woody' | 'musky' | 'spicy' | 'sweet' | 'aquatic';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  gender: Gender;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  description: string;
  details: string[];
  materials?: string;
  sizes: string[];
  colors?: ProductColor[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  tags?: string[];
  isNewDrop?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isWinterEdit?: boolean;
  winterCollection?: 'Winter Streetwear' | 'Quiet Luxury' | 'Night Out' | 'Everyday Essentials' | 'Couple / Matching Looks' | 'Winter Fragrance';
  fragranceFamily?: FragranceFamily;
  fragranceNotes?: FragranceNotes;
  concentration?: string;
  longevity?: string;
  sillage?: string;
  occasion?: string;
  featuredLookGroup?: string; // used for "Complete The Look"
}

export interface CartItem {
  id: string; // unique item id: productId + size + color
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderValue?: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Cash on Delivery';
  orderStatus: 'Order Confirmed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Shipped';
  carrier?: string;
  trackingNumber: string;
  shippingAddress: Address;
  estimatedDelivery: string;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number; // positive for earned, negative for redeemed
  type: 'earned' | 'redeemed';
  codeGenerated?: string;
  orderId?: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  code: string;
  discountType: 'flat' | 'percent';
  discountValue: number;
  minOrderValue?: number;
  badge?: string;
}

export interface EmailPreferences {
  newSeasonDrops: boolean;
  fragranceReleases: boolean;
  exclusiveSales: boolean;
  weeklyDigest: boolean;
  orderUpdates: boolean;
  frequency: 'instant' | 'weekly';
}

export type ReturnType = 'return' | 'exchange';

export type ReturnStatus =
  | 'Requested'
  | 'Pickup Scheduled'
  | 'In Transit'
  | 'Inspected & Approved'
  | 'Refund Issued'
  | 'Exchange Delivered';

export interface ReturnItem {
  orderItemId: string;
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  reason: string;
  exchangeSize?: string;
  exchangeColor?: string;
}

export interface ReturnRequest {
  id: string; // e.g. RMA-SX-2026-7832
  orderId: string;
  dateRequested: string;
  type: ReturnType;
  status: ReturnStatus;
  items: ReturnItem[];
  refundMethod: 'original' | 'store_credit';
  pickupMethod: 'doorstep_pickup' | 'hub_dropoff';
  pickupAddress: Address;
  carrier: string;
  returnTrackingNumber: string;
  pickupScheduledDate?: string;
  estimatedResolutionDate: string;
  shippingLabelGenerated: boolean;
  totalRefundAmount: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  savedAddresses: Address[];
  loyaltyPoints?: number;
  loyaltyTier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Gold Atelier' | 'Black Diamond VIP' | string;
  loyaltyHistory?: LoyaltyTransaction[];
  emailPreferences?: EmailPreferences;
}

export interface SavedOutfit {
  id: string;
  name: string;
  dateSaved: string;
  jacket: Product;
  hoodie: Product;
  bottom: Product;
  perfume: Product;
  rawTotal: number;
  discountedTotal: number;
  savings: number;
  notes?: string;
  tags?: string[];
}

