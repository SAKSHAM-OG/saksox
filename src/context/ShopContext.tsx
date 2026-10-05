import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  Address,
  Order,
  UserProfile,
  LoyaltyReward,
  LoyaltyTransaction,
  EmailPreferences,
  ReturnRequest,
  ReturnItem,
  ReturnType,
  ReturnStatus,
  SavedOutfit
} from '../types';
import { PRODUCTS, COUPONS } from '../data/products';
import { INITIAL_REVIEWS } from '../data/reviews';

interface ShopContextType {
  // Products
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & UI
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  notification: string | null;
  showNotification: (msg: string) => void;

  // User & Auth
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  updateAvatar: (avatarUrl: string | null) => void;
  redeemLoyaltyReward: (reward: LoyaltyReward) => { success: boolean; message: string; couponCode?: string };
  updateEmailPreferences: (prefs: Partial<EmailPreferences>) => void;

  // Orders
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'orderStatus'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Returns & Exchanges
  returnRequests: ReturnRequest[];
  initiateReturnRequest: (data: Omit<ReturnRequest, 'id' | 'dateRequested' | 'status' | 'shippingLabelGenerated' | 'returnTrackingNumber' | 'pickupScheduledDate' | 'estimatedResolutionDate'> & {
    carrier?: string;
    pickupScheduledDate?: string;
    estimatedResolutionDate?: string;
  }) => ReturnRequest;
  cancelReturnRequest: (returnId: string) => void;
  getReturnRequestById: (returnId: string) => ReturnRequest | undefined;

  // Style Archive / Curated Outfits
  savedOutfits: SavedOutfit[];
  saveOutfit: (outfit: Omit<SavedOutfit, 'id' | 'dateSaved'> & { name?: string }) => SavedOutfit;
  removeSavedOutfit: (outfitId: string) => void;
  updateSavedOutfitName: (outfitId: string, newName: string) => void;
  activeBuilderPresetOutfit: SavedOutfit | null;
  setActiveBuilderPresetOutfit: (outfit: SavedOutfit | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  CART: 'saksox_cart_v1',
  WISHLIST: 'saksox_wishlist_v1',
  USER: 'saksox_user_v1',
  ORDERS: 'saksox_orders_v1',
  COUPON: 'saksox_coupon_v1',
  RETURNS: 'saksox_returns_v1',
  OUTFITS: 'saksox_style_archive_v1'
};

const DEFAULT_USER: UserProfile = {
  name: 'Aryan Varma',
  email: 'aryan.varma@saksox.com',
  phone: '+91 98112 45890',
  loyaltyPoints: 1450,
  loyaltyTier: 'Gold Atelier',
  loyaltyHistory: [
    {
      id: 'tx-01',
      date: '24 Feb 2026',
      description: 'Points earned on Order #SX-2026-94812 (Winter Drops)',
      points: 340,
      type: 'earned',
      orderId: 'SX-2026-94812'
    },
    {
      id: 'tx-02',
      date: '20 Feb 2026',
      description: 'Verified Review: Midnight Noir Extrait de Parfum',
      points: 150,
      type: 'earned'
    },
    {
      id: 'tx-03',
      date: '10 Feb 2026',
      description: 'Points earned on Order #SX-2026-89210 (Velvet Cashmere)',
      points: 220,
      type: 'earned',
      orderId: 'SX-2026-89210'
    },
    {
      id: 'tx-04',
      date: '01 Feb 2026',
      description: 'SAKSOX Atelier VIP Early Access Welcome Grant',
      points: 1000,
      type: 'earned'
    },
    {
      id: 'tx-05',
      date: '15 Feb 2026',
      description: 'Redeemed for Flat ₹250 Discount Voucher',
      points: 250,
      type: 'redeemed',
      codeGenerated: 'SX-PTS-250-X84'
    }
  ],
  savedAddresses: [
    {
      id: 'addr-01',
      name: 'Aryan Varma',
      phone: '+91 98112 45890',
      addressLine: 'A-42, Gulmohar Enclave, Near Hauz Khas',
      landmark: 'Opposite Metro Station Gate 2',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      isDefault: true
    }
  ],
  emailPreferences: {
    newSeasonDrops: true,
    fragranceReleases: true,
    exclusiveSales: true,
    weeklyDigest: false,
    orderUpdates: true,
    frequency: 'instant'
  }
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'SX-2026-94812',
    date: '24 Feb 2026',
    items: [
      {
        id: 'frag-01-100ml-',
        product: PRODUCTS[11], // Midnight Noir
        selectedSize: '100ml',
        quantity: 1
      },
      {
        id: 'acc-01-One Size-Onyx Black',
        product: PRODUCTS[27], // Beanie
        selectedSize: 'One Size',
        selectedColor: 'Onyx Black',
        quantity: 1
      }
    ],
    subtotal: 3398,
    discountAmount: 340,
    shippingFee: 0,
    totalAmount: 3058,
    couponCode: 'WELCOME10',
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BLUEDART-IND-7789420',
    shippingAddress: DEFAULT_USER.savedAddresses[0],
    estimatedDelivery: 'Tomorrow by 4:00 PM'
  },
  {
    id: 'SX-2026-98104',
    date: '28 Feb 2026',
    items: [
      {
        id: 'men-01-L-Matte Black',
        product: PRODUCTS[0], // SAKSOX Arctic Down Oversized Puffer
        selectedSize: 'L',
        selectedColor: 'Matte Black',
        quantity: 1
      }
    ],
    subtotal: 5499,
    discountAmount: 550,
    shippingFee: 0,
    totalAmount: 4949,
    couponCode: 'WINTERVIP',
    paymentMethod: 'Credit Card (HDFC Visa Infinite)',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    carrier: 'Delhivery Express Air',
    trackingNumber: 'DELHIVERY-SX-9938210',
    shippingAddress: DEFAULT_USER.savedAddresses[0],
    estimatedDelivery: 'In 2 days by 7:00 PM'
  },
  {
    id: 'SX-2026-89210',
    date: '10 Feb 2026',
    items: [
      {
        id: 'frag-02-100ml-',
        product: PRODUCTS[12], // Velvet Cashmere
        selectedSize: '100ml',
        quantity: 1
      }
    ],
    subtotal: 2199,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 2199,
    paymentMethod: 'UPI (PhonePe)',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    carrier: 'BlueDart Express Air',
    trackingNumber: 'BLUEDART-IND-6640192',
    shippingAddress: DEFAULT_USER.savedAddresses[0],
    estimatedDelivery: 'Delivered on 13 Feb 2026'
  }
];

const INITIAL_DEMO_RETURNS: ReturnRequest[] = [
  {
    id: 'RMA-SX-2026-7832',
    orderId: 'SX-2026-89210',
    dateRequested: '14 Feb 2026',
    type: 'return',
    status: 'In Transit',
    items: [
      {
        orderItemId: 'frag-02-100ml-',
        product: PRODUCTS[12], // Velvet Cashmere
        selectedSize: '100ml',
        quantity: 1,
        reason: 'Fragrance note not matching personal preference (Scent profile too sweet)'
      }
    ],
    refundMethod: 'original',
    pickupMethod: 'doorstep_pickup',
    pickupAddress: DEFAULT_USER.savedAddresses[0],
    carrier: 'BlueDart Express Air Return',
    returnTrackingNumber: 'R-BLUEDART-882194',
    pickupScheduledDate: '15 Feb 2026, 11:00 AM - 2:00 PM',
    estimatedResolutionDate: '20 Feb 2026',
    shippingLabelGenerated: true,
    totalRefundAmount: 2199,
    notes: 'Seal intact with original protective outer sleeve.'
  }
];

const INITIAL_DEMO_SAVED_OUTFITS: SavedOutfit[] = [
  {
    id: 'outfit-arch-01',
    name: 'Nordic Stealth Monochrome Look',
    dateSaved: '22 Feb 2026',
    jacket: PRODUCTS[0], // Arctic Down Oversized Puffer
    hoodie: PRODUCTS[4], // Distressed Heavyweight Zip Hoodie
    bottom: PRODUCTS[8], // Wide-Leg Tactical Cargo Pants
    perfume: PRODUCTS[11], // Midnight Noir
    rawTotal: 5499 + 3299 + 2899 + 1899,
    discountedTotal: Math.round((5499 + 3299 + 2899 + 1899) * 0.85),
    savings: (5499 + 3299 + 2899 + 1899) - Math.round((5499 + 3299 + 2899 + 1899) * 0.85),
    notes: 'Oversized silhouette with water-repellent shell and warm smoky amber notes.',
    tags: ['Stealth Black', 'Puffer + Heavyweight', 'Midnight Noir']
  },
  {
    id: 'outfit-arch-02',
    name: 'Alpine Atelier Layered Ensemble',
    dateSaved: '18 Feb 2026',
    jacket: PRODUCTS[1], // Sub-Zero Sherpa Lined Parka
    hoodie: PRODUCTS[5], // Raw Edge Knit Sweater
    bottom: PRODUCTS[9], // Relaxed Tech Parachute Pants
    perfume: PRODUCTS[12], // Velvet Cashmere
    rawTotal: 5999 + 2999 + 2799 + 2199,
    discountedTotal: Math.round((5999 + 2999 + 2799 + 2199) * 0.85),
    savings: (5999 + 2999 + 2799 + 2199) - Math.round((5999 + 2999 + 2799 + 2199) * 0.85),
    notes: 'Rich textural interplay of raw knitwear and cozy sherpa paired with powdery vanilla cedar.',
    tags: ['Cozy Luxe', 'Knitwear', 'Velvet Cashmere']
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['frag-01', 'men-01'];
    } catch {
      return ['frag-01', 'men-01'];
    }
  });

  // User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Returns & Exchanges State
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.RETURNS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_RETURNS;
    } catch {
      return INITIAL_DEMO_RETURNS;
    }
  });

  // Saved Outfits / Style Archive State
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.OUTFITS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_SAVED_OUTFITS;
    } catch {
      return INITIAL_DEMO_SAVED_OUTFITS;
    }
  });

  const [activeBuilderPresetOutfit, setActiveBuilderPresetOutfit] = useState<SavedOutfit | null>(null);

  // Coupon State
  const [customCoupons, setCustomCoupons] = useState<Coupon[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // UI Modals State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.RETURNS, JSON.stringify(returnRequests));
    } catch (e) {
      console.error(e);
    }
  }, [returnRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.OUTFITS, JSON.stringify(savedOutfits));
    } catch (e) {
      console.error(e);
    }
  }, [savedOutfits]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.COUPON);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color?: string, quantity: number = 1) => {
    const itemKey = `${product.id}-${size}-${color || ''}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === itemKey);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      }
      return [
        ...prevCart,
        {
          id: itemKey,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });
    showNotification(`Added ${product.name} to cart.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    showNotification('Item removed from cart');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFlat) {
      discountAmount = Math.min(appliedCoupon.discountFlat, subtotal);
    }
  }

  // Free shipping over ₹1999
  const shippingFee = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const allAvailable = [...COUPONS, ...customCoupons];
    const found = allAvailable.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try WELCOME10' };
    }
    if (found.minOrderValue && subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Code requires minimum order of ₹${found.minOrderValue.toLocaleString('en-IN')}`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showNotification(`Removed ${prod?.name || 'item'} from wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(`Added ${prod?.name || 'item'} to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Profile
  const login = (email: string, name?: string) => {
    const updatedUser: UserProfile = {
      name: name || email.split('@')[0].toUpperCase(),
      email,
      phone: '+91 98765 43210',
      savedAddresses: DEFAULT_USER.savedAddresses
    };
    setUser(updatedUser);
    setIsAuthModalOpen(false);
    showNotification(`Welcome back, ${updatedUser.name}!`);
  };

  const register = (name: string, email: string, phone: string) => {
    const updatedUser: UserProfile = {
      name,
      email,
      phone,
      savedAddresses: []
    };
    setUser(updatedUser);
    setIsAuthModalOpen(false);
    showNotification(`Account created successfully! Welcome to SAKSOX.`);
  };

  const logout = () => {
    setUser(null);
    showNotification('You have logged out.');
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    if (!user) return;
    const addressWithId: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    const updatedList = newAddr.isDefault
      ? user.savedAddresses.map((a) => ({ ...a, isDefault: false })).concat(addressWithId)
      : [...user.savedAddresses, addressWithId];
    setUser({ ...user, savedAddresses: updatedList });
    showNotification('Address saved successfully');
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.filter((a) => a.id !== id)
    });
    showNotification('Address removed');
  };

  const updateAvatar = (avatarUrl: string | null) => {
    if (!user) return;
    setUser({
      ...user,
      avatarUrl: avatarUrl || undefined
    });
    if (avatarUrl) {
      showNotification('Profile photo updated successfully!');
    } else {
      showNotification('Profile photo removed.');
    }
  };

  const redeemLoyaltyReward = (reward: LoyaltyReward) => {
    if (!user) {
      return { success: false, message: 'Please sign in to redeem rewards' };
    }
    const currentPoints = user.loyaltyPoints ?? 0;
    if (currentPoints < reward.pointsCost) {
      return {
        success: false,
        message: `Insufficient points balance. You need ${reward.pointsCost} pts, but have ${currentPoints} pts.`
      };
    }

    const generatedCode = `${reward.code}-${Math.floor(100 + Math.random() * 900)}`;
    const newCoupon: Coupon = {
      code: generatedCode,
      description: reward.description,
      minOrderValue: reward.minOrderValue,
      discountFlat: reward.discountType === 'flat' ? reward.discountValue : undefined,
      discountPercent: reward.discountType === 'percent' ? reward.discountValue : undefined
    };

    setCustomCoupons((prev) => [newCoupon, ...prev]);

    const newTx: LoyaltyTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: `Redeemed: ${reward.title}`,
      points: reward.pointsCost,
      type: 'redeemed',
      codeGenerated: generatedCode
    };

    const updatedUser: UserProfile = {
      ...user,
      loyaltyPoints: currentPoints - reward.pointsCost,
      loyaltyHistory: [newTx, ...(user.loyaltyHistory ?? [])]
    };

    setUser(updatedUser);
    showNotification(`Redeemed ${reward.title}! Code: ${generatedCode}`);
    return {
      success: true,
      message: `Reward unlocked! Use code ${generatedCode} at checkout.`,
      couponCode: generatedCode
    };
  };

  const updateEmailPreferences = (prefs: Partial<EmailPreferences>) => {
    if (!user) return;
    const currentPrefs = user.emailPreferences ?? {
      newSeasonDrops: true,
      fragranceReleases: true,
      exclusiveSales: true,
      weeklyDigest: false,
      orderUpdates: true,
      frequency: 'instant'
    };
    const updated: EmailPreferences = { ...currentPrefs, ...prefs };
    setUser({
      ...user,
      emailPreferences: updated
    });
    showNotification('Email preferences updated successfully');
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'orderStatus'>): Order => {
    const orderId = `SX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `DELHIVERY-AIR-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      trackingNumber,
      orderStatus: 'Order Confirmed',
      carrier: 'Delhivery Surface & Express Air'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase().trim());
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id.toLowerCase() === orderId.toLowerCase().trim() ? { ...o, orderStatus: status } : o))
    );
    showNotification(`Order ${orderId} updated to "${status}".`);
  };

  const getProductBySlug = (slug: string) => {
    return PRODUCTS.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return PRODUCTS.find((p) => p.id === id);
  };

  // Returns & Exchanges Operations
  const initiateReturnRequest = (
    data: Omit<ReturnRequest, 'id' | 'dateRequested' | 'status' | 'shippingLabelGenerated' | 'returnTrackingNumber' | 'pickupScheduledDate' | 'estimatedResolutionDate'> & {
      carrier?: string;
      pickupScheduledDate?: string;
      estimatedResolutionDate?: string;
    }
  ): ReturnRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const rmaId = `RMA-SX-${new Date().getFullYear()}-${randomSuffix}`;
    const returnAwb = `R-BD-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const today = new Date();
    const resolutionDate = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);
    const pickupDate = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);

    const newReturn: ReturnRequest = {
      ...data,
      id: rmaId,
      dateRequested: today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Requested',
      carrier: 'BlueDart Express Air Return',
      returnTrackingNumber: returnAwb,
      shippingLabelGenerated: true,
      pickupScheduledDate: `${pickupDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, 10:00 AM - 1:00 PM`,
      estimatedResolutionDate: resolutionDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setReturnRequests((prev) => [newReturn, ...prev]);
    showNotification(`Return Authorization ${rmaId} initiated. Shipping label ready!`);
    return newReturn;
  };

  const cancelReturnRequest = (returnId: string) => {
    setReturnRequests((prev) => prev.filter((r) => r.id !== returnId));
    showNotification(`Return request ${returnId} has been cancelled.`);
  };

  const getReturnRequestById = (returnId: string) => {
    return returnRequests.find((r) => r.id.toLowerCase() === returnId.toLowerCase().trim());
  };

  // Style Archive / Curated Outfits Operations
  const saveOutfit = (
    outfitData: Omit<SavedOutfit, 'id' | 'dateSaved'> & { name?: string }
  ): SavedOutfit => {
    const outfitId = `outfit-arch-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const finalName = outfitData.name?.trim() || `Winter Silhouette Look #${savedOutfits.length + 1}`;

    const newOutfit: SavedOutfit = {
      ...outfitData,
      id: outfitId,
      name: finalName,
      dateSaved: today
    };

    setSavedOutfits((prev) => [newOutfit, ...prev]);
    showNotification(`"${finalName}" saved to your Style Archive!`);
    return newOutfit;
  };

  const removeSavedOutfit = (outfitId: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== outfitId));
    showNotification('Look removed from Style Archive.');
  };

  const updateSavedOutfitName = (outfitId: string, newName: string) => {
    setSavedOutfits((prev) =>
      prev.map((o) => (o.id === outfitId ? { ...o, name: newName.trim() } : o))
    );
    showNotification('Outfit title updated.');
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        getProductBySlug,
        getProductById,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        notification,
        showNotification,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        addAddress,
        removeAddress,
        updateAvatar,
        redeemLoyaltyReward,
        updateEmailPreferences,
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        returnRequests,
        initiateReturnRequest,
        cancelReturnRequest,
        getReturnRequestById,
        savedOutfits,
        saveOutfit,
        removeSavedOutfit,
        updateSavedOutfitName,
        activeBuilderPresetOutfit,
        setActiveBuilderPresetOutfit
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
