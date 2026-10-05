import React, { useState, useEffect } from 'react';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  Check,
  Clock,
  Truck,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Download,
  FileText,
  Printer,
  Award,
  Mail,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { OrderInvoiceModal } from '../components/account/OrderInvoiceModal';
import { AvatarProfileCamera } from '../components/account/AvatarProfileCamera';
import { LoyaltyRewardsSection } from '../components/account/LoyaltyRewardsSection';
import { MyOrdersSection } from '../components/account/MyOrdersSection';
import { EmailPreferencesSection } from '../components/account/EmailPreferencesSection';
import { ReturnsAndExchangesSection } from '../components/account/ReturnsAndExchangesSection';
import { StyleArchiveSection } from '../components/account/StyleArchiveSection';
import { Order } from '../types';

export { AvatarProfileCamera };

interface AccountPageProps {
  onNavigateToDetail: (slug: string) => void;
  onNavigateToTrack: (orderId: string) => void;
  onNavigateToBuilder?: () => void;
}

// 4 Specific Progress Markers: Processing -> Dispatched -> Out for Delivery -> Delivered
export type OrderTrackingStep = 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';

export interface TrackingStepDefinition {
  key: OrderTrackingStep;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TRACKING_STEPS: TrackingStepDefinition[] = [
  {
    key: 'Processing',
    title: 'Processing',
    subtitle: 'Atelier packaging & quality inspection',
    icon: Package
  },
  {
    key: 'Dispatched',
    title: 'Dispatched',
    subtitle: 'Departed air transit hub via BlueDart Air',
    icon: Truck
  },
  {
    key: 'Out for Delivery',
    title: 'Out for Delivery',
    subtitle: 'Assigned courier partner en route to doorstep',
    icon: MapPin
  },
  {
    key: 'Delivered',
    title: 'Delivered',
    subtitle: 'Verified & received at destination',
    icon: CheckCircle2
  }
];

/**
 * Maps the orderStatus field from the order data model to 0..3 index
 */
export function getStepIndexFromStatus(status: Order['orderStatus']): number {
  switch (status) {
    case 'Order Confirmed':
    case 'Processing':
      return 0; // Processing
    case 'Shipped':
    case 'Dispatched':
      return 1; // Dispatched
    case 'Out for Delivery':
      return 2; // Out for Delivery
    case 'Delivered':
      return 3; // Delivered
    default:
      return 0;
  }
}

/**
 * =========================================================================
 * OrderTrackingStepper Component
 * Visual progress stepper component that dynamically updates its progress markers:
 * ('Processing', 'Dispatched', 'Out for Delivery', 'Delivered')
 * based on the orderStatus property within the user's order data.
 * =========================================================================
 */
export interface OrderTrackingStepperProps {
  orderStatus: Order['orderStatus'];
  onStepClick?: (step: OrderTrackingStep) => void;
  interactive?: boolean;
}

export const OrderTrackingStepper: React.FC<OrderTrackingStepperProps> = ({
  orderStatus,
  onStepClick,
  interactive = true
}) => {
  const currentStepIndex = getStepIndexFromStatus(orderStatus);
  const progressPercent = (currentStepIndex / (TRACKING_STEPS.length - 1)) * 100;

  return (
    <div className="w-full py-3">
      {/* Connecting Gradient Track Line */}
      <div className="relative mb-6">
        <div className="h-1.5 w-full bg-[#232733] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c9a96e] via-[#dfbe7d] to-[#22c55e] transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Circular Node Indicators along the line */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between pointer-events-none">
          {TRACKING_STEPS.map((step, idx) => {
            const isPassed = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'border-[#dfbe7d] bg-[#dfbe7d] text-[#0a0b0d] scale-125 shadow-lg shadow-[#dfbe7d]/30 ring-4 ring-[#dfbe7d]/20'
                      : isPassed
                      ? 'border-[#dfbe7d] bg-[#14161f] text-[#dfbe7d]'
                      : 'border-[#2e3442] bg-[#14161f] text-[#4d5361]'
                  }`}
                >
                  {isPassed ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-[#0a0b0d]" />
                  ) : (
                    <span className="text-[10px] font-mono">{idx + 1}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Markers Grid: Processing -> Dispatched -> Out for Delivery -> Delivered */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {TRACKING_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.key}
              type="button"
              disabled={!interactive}
              onClick={() => onStepClick && onStepClick(step.key)}
              className={`p-3 text-left border transition-all relative overflow-hidden group ${
                isCurrent
                  ? 'bg-[#1b1f2b] border-[#dfbe7d] text-white shadow-lg'
                  : isPassed
                  ? 'bg-[#161822] border-[#292f3d] text-[#dfbe7d]'
                  : 'bg-[#111319] border-[#212632] text-[#6d7483] hover:border-[#313747] hover:text-[#a0a7b5]'
              } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isCurrent || isPassed ? 'text-[#dfbe7d]' : 'text-[#5d6373]'
                    }`}
                  />
                  <span className="text-[9px] font-mono uppercase font-semibold">
                    Step 0{idx + 1}
                  </span>
                </div>
                {isCurrent && (
                  <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-ping" />
                )}
                {isPassed && (
                  <Check className="h-3 w-3 text-[#22c55e]" />
                )}
              </div>
              <h4 className="text-xs font-bold leading-tight truncate text-white">
                {step.title}
              </h4>
              <p className="text-[10px] text-[#88909e] truncate mt-0.5">
                {step.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * OrderTracking Component
 * Full Order Tracking Card with Stepper, live simulation, and contextual info
 * =========================================================================
 */
export interface OrderTrackingProps {
  order: Order;
  onNavigateToDetail?: (slug: string) => void;
  onNavigateToTrack?: (orderId: string) => void;
  onOpenInvoice?: (order: Order) => void;
  showItemsPreview?: boolean;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  order,
  onNavigateToDetail,
  onNavigateToTrack,
  onOpenInvoice,
  showItemsPreview = true
}) => {
  const { updateOrderStatus } = useShop();

  const currentStepIndex = getStepIndexFromStatus(order.orderStatus);
  const activeStep = TRACKING_STEPS[currentStepIndex] || TRACKING_STEPS[0];

  // Real-time automatic simulation ticker state
  const [isSimulating, setIsSimulating] = useState(false);
  const [countdown, setCountdown] = useState<number>(4);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Automatically advance simulation steps
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSimulating) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            const nextIdx = (currentStepIndex + 1) % TRACKING_STEPS.length;
            const nextStatus = TRACKING_STEPS[nextIdx].key;
            updateOrderStatus(order.id, nextStatus);

            if (nextIdx === TRACKING_STEPS.length - 1) {
              setIsSimulating(false);
            }
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isSimulating, currentStepIndex, order.id, updateOrderStatus]);

  const handleManualStepChange = (targetStatus: OrderTrackingStep) => {
    setIsSimulating(false);
    updateOrderStatus(order.id, targetStatus);
  };

  const toggleSimulation = () => {
    if (!isSimulating) {
      setCountdown(4);
      setIsSimulating(true);
    } else {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-[#111319] border border-[#232733] hover:border-[#383e4e] transition-all p-5 sm:p-6 text-xs space-y-6">
      {/* Order Summary & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#212632] gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-white text-base tracking-wide">
              {order.id}
            </span>
            <span className="text-[#88909e]">• Placed on {order.date}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#88909e]">
            <span>
              Carrier: <strong className="text-white">{order.carrier || 'Delhivery Express Air'}</strong>
            </span>
            <span>•</span>
            <span className="font-mono text-[#dfbe7d]">AWB #{order.trackingNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Active Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#152119] border border-[#22c55e]/30 text-[#22c55e] font-mono text-[11px] font-bold uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
            </span>
            <span>{activeStep.title}</span>
          </div>

          {/* Quick Invoice Button in Header */}
          {onOpenInvoice && (
            <button
              onClick={() => onOpenInvoice(order)}
              className="px-3 py-1 bg-[#1a1e28] hover:bg-[#252c3b] border border-[#2c3345] text-white text-[11px] uppercase font-mono tracking-wider transition-colors flex items-center gap-1.5"
              title="Download Tax Invoice"
            >
              <FileText className="h-3 w-3 text-[#dfbe7d]" />
              <span>Invoice</span>
            </button>
          )}

          {onNavigateToTrack && (
            <button
              onClick={() => onNavigateToTrack(order.id)}
              className="px-3 py-1 bg-[#1a1e28] hover:bg-[#252c3b] border border-[#2c3345] text-white text-[11px] uppercase font-mono tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Truck className="h-3 w-3 text-[#dfbe7d]" />
              <span>Full Radar</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================== VISUAL PROGRESS STEPPER ==================== */}
      <div className="bg-[#14161f] border border-[#242936] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#dfbe7d]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Visual Order Tracking Stepper (Status: {order.orderStatus})
            </span>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSimulation}
              className={`px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                isSimulating
                  ? 'bg-[#dfbe7d] text-[#0a0b0d] animate-pulse shadow-md'
                  : 'bg-[#1e222d] hover:bg-[#282f40] text-white border border-[#2e3646]'
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span>Advancing ({countdown}s)...</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-[#dfbe7d]" />
                  <span>Simulate Real-Time Progress</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleManualStepChange('Processing')}
              className="p-1 text-[#88909e] hover:text-white"
              title="Reset to Processing"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Stepper Component Instance */}
        <OrderTrackingStepper
          orderStatus={order.orderStatus}
          onStepClick={handleManualStepChange}
          interactive={true}
        />

        {/* Dynamic Context Information for the Active Status */}
        <div className="p-4 bg-[#101217] border border-[#212632] text-xs space-y-2">
          {activeStep.key === 'Processing' && (
            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-[#dfbe7d] flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">Atelier Packaging & Thermal Quality Inspection</p>
                  <span className="text-[10px] font-mono text-[#dfbe7d] bg-[#dfbe7d]/10 px-1.5 py-0.2 border border-[#dfbe7d]/20">
                    Okhla Phase III, New Delhi
                  </span>
                </div>
                <p className="text-[#88909e] text-[11px] mt-0.5">
                  Garment seams inspected. Fragrance flacon packaged in shock-absorbing presentation box with tamper-evident hallmark seal.
                </p>
              </div>
            </div>
          )}

          {activeStep.key === 'Dispatched' && (
            <div className="flex items-start gap-3">
              <Truck className="h-4 w-4 text-[#dfbe7d] flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">In Transit via BlueDart Express Air</p>
                  <span className="text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.2 border border-[#22c55e]/20">
                    Flight AI-8492
                  </span>
                </div>
                <p className="text-[#88909e] text-[11px] mt-0.5">
                  Air consignment dispatched from IGI Cargo Terminal 2. Handed over to regional hub for direct delivery.
                </p>
              </div>
            </div>
          )}

          {activeStep.key === 'Out for Delivery' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">Out for Doorstep Handover</p>
                    <span className="text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.2 border border-[#22c55e]/20">
                      ETA: ~35 Mins
                    </span>
                  </div>
                  <p className="text-[#88909e] text-[11px] mt-0.5">
                    Delivery Partner: <strong className="text-white">Vikramaditya S.</strong> (+91 98711 02931) • EV Van DL 01 AB 8492
                  </p>
                </div>
              </div>

              {/* Handover OTP */}
              <div className="p-2.5 bg-[#17221b] border border-[#22c55e]/30 text-center flex-shrink-0">
                <span className="text-[9px] font-mono text-[#88909e] uppercase block">
                  Contactless Handover OTP
                </span>
                <span className="text-sm font-mono font-bold text-[#22c55e] tracking-widest">
                  8492
                </span>
              </div>
            </div>
          )}

          {activeStep.key === 'Delivered' && (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">Delivered & Verified at Doorstep</p>
                  <span className="text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.2 border border-[#22c55e]/20">
                    Handover Complete
                  </span>
                </div>
                <p className="text-[#88909e] text-[11px] mt-0.5">
                  Handed over to {order.shippingAddress.name}. 7-day seamless doorstep exchange window is active.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items Preview (Collapsible) */}
      {showItemsPreview && (
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#212632] mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7d]">
              Package Items ({order.items.length})
            </span>
            <button
              type="button"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="text-[11px] text-[#88909e] hover:text-white flex items-center gap-1 font-mono"
            >
              <span>{isDetailsOpen ? 'Hide Items' : 'View Items'}</span>
              {isDetailsOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {isDetailsOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {order.items.map((it) => (
                <div
                  key={it.id}
                  onClick={() => onNavigateToDetail && onNavigateToDetail(it.product.slug)}
                  className="flex items-center gap-3 bg-[#151720] p-2.5 border border-[#232733] cursor-pointer hover:border-[#383f52] transition-colors"
                >
                  <img
                    src={it.product.images[0]}
                    alt={it.product.name}
                    className="h-12 w-10 object-cover bg-[#0d0e12]"
                  />
                  <div className="flex-1 truncate">
                    <h4 className="font-medium text-white truncate">{it.product.name}</h4>
                    <span className="text-[11px] text-[#88909e]">
                      Qty: {it.quantity} • Size: {it.selectedSize} {it.selectedColor ? `• ${it.selectedColor}` : ''}
                    </span>
                  </div>
                  <span className="font-mono text-white text-xs">
                    ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Destination, Total & Download Invoice Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-[#1e222d] text-xs text-[#88909e] gap-3">
        <span>
          Delivery to: <strong className="text-white">{order.shippingAddress.city}, {order.shippingAddress.pincode}</strong> ({order.shippingAddress.state})
        </span>

        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
          {/* Prominent Download Invoice Button in Order Details */}
          {onOpenInvoice && (
            <button
              type="button"
              onClick={() => onOpenInvoice(order)}
              className="px-3.5 py-1.5 bg-[#181a24] hover:bg-[#252a3a] text-white border border-[#2e3546] text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-[#dfbe7d]" />
              <span>Download Invoice</span>
            </button>
          )}

          <span className="text-sm font-bold text-[#dfbe7d] font-mono">
            Total Paid: ₹{order.totalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * Main AccountPage Component
 * =========================================================================
 */
export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigateToDetail,
  onNavigateToTrack,
  onNavigateToBuilder
}) => {
  const {
    user,
    logout,
    orders,
    wishlist,
    products,
    addAddress,
    removeAddress,
    setIsAuthModalOpen,
    returnRequests,
    savedOutfits
  } = useShop();

  const [activeTab, setActiveTab] = useState<'tracking' | 'orders' | 'archive' | 'returns' | 'loyalty' | 'addresses' | 'preferences' | 'wishlist' | 'profile'>('tracking');
  const [selectedReturnOrderId, setSelectedReturnOrderId] = useState<string | undefined>(undefined);
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string>(
    orders[0]?.id || ''
  );

  // Invoice Modal State
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // New Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrLine, setAddrLine] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('Delhi');
  const [addrPincode, setAddrPincode] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] flex items-center justify-center p-6">
        <div className="text-center bg-[#111319] border border-[#232733] p-8 max-w-md">
          <User className="h-12 w-12 text-[#dfbe7d] mx-auto mb-3" />
          <h2 className="text-xl font-serif text-white mb-2">Member Sign In Required</h2>
          <p className="text-xs text-[#88909e] mb-6">
            Sign in to view your orders, real-time live dispatch tracking, saved addresses, and tailored scent matches.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-6 py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrName || !addrLine || !addrCity || !addrPincode) return;

    addAddress({
      name: addrName,
      phone: addrPhone || user.phone,
      addressLine: addrLine,
      landmark: addrLandmark,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      isDefault: false
    });

    setIsAddingAddress(false);
    setAddrName('');
    setAddrPhone('');
    setAddrLine('');
    setAddrLandmark('');
    setAddrCity('');
    setAddrPincode('');
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const activeTrackingOrder = orders.find((o) => o.id === selectedTrackingOrderId) || orders[0];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] pb-28">
      {/* Profile Header */}
      <div className="bg-[#111318] border-b border-[#212632] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AvatarProfileCamera size="lg" showDetails={false} />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
                VIP MEMBER ATELIER
              </span>
              <h1 className="text-2xl font-serif text-white tracking-wide mt-0.5">
                {user.name}
              </h1>
              <p className="text-xs text-[#88909e]">{user.email} • {user.phone}</p>

              {/* Loyalty Points Quick Balance Pill & Redeem Link */}
              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('loyalty')}
                  className="px-2.5 py-0.5 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#dfbe7d]/40 text-[#dfbe7d] text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="View Loyalty Rewards Balance"
                >
                  <Award className="h-3 w-3 text-[#dfbe7d]" />
                  <span>{user.loyaltyTier || 'Gold Atelier'}</span>
                  <span>•</span>
                  <strong>{(user.loyaltyPoints ?? 1450).toLocaleString('en-IN')} PTS</strong>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('loyalty')}
                  className="text-[11px] font-mono text-[#dfbe7d] hover:text-white underline transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Redeem Points for Codes &rarr;</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="self-start sm:self-auto px-4 py-2 bg-[#171922] hover:bg-[#232734] border border-[#272d3b] text-xs font-semibold uppercase tracking-wider text-white transition-colors flex items-center gap-2"
          >
            <LogOut className="h-3.5 w-3.5 text-[#88909e]" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#212632] gap-2 sm:gap-6 overflow-x-auto pb-px mb-8">
          {[
            { id: 'tracking', label: 'Order Tracking', icon: Truck, count: orders.length },
            { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
            { id: 'archive', label: 'Style Archive', icon: Layers, count: savedOutfits.length },
            { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw, count: returnRequests.length },
            { id: 'loyalty', label: 'Loyalty Rewards', icon: Award, count: `${(user.loyaltyPoints ?? 1450).toLocaleString('en-IN')} pts` },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: user.savedAddresses.length },
            { id: 'preferences', label: 'Email Preferences', icon: Mail },
            { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
            { id: 'profile', label: 'Profile Settings', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-2 sm:px-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 border-b-2 flex-shrink-0 ${
                  isActive
                    ? 'border-[#dfbe7d] text-[#dfbe7d]'
                    : 'border-transparent text-[#88909e] hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="font-mono text-[10px] bg-[#1a1c26] px-1.5 py-0.5 border border-[#272d3b]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Dedicated Order Tracking Visual Stepper Component */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#111319] border border-[#212632]">
                <Truck className="h-10 w-10 text-[#3d4454] mx-auto mb-2" />
                <p className="text-sm font-medium text-white mb-1">No active shipments to track</p>
                <p className="text-xs text-[#88909e]">Place an order from our winter drops to track live transit steps.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Order Selector Chips if user has multiple orders */}
                {orders.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span className="text-xs text-[#88909e] font-mono mr-1">Select Order:</span>
                    {orders.map((ord) => (
                      <button
                        key={ord.id}
                        onClick={() => setSelectedTrackingOrderId(ord.id)}
                        className={`px-3 py-1.5 text-xs font-mono uppercase border transition-colors flex items-center gap-2 ${
                          (activeTrackingOrder?.id === ord.id)
                            ? 'bg-[#dfbe7d] text-[#0a0b0d] font-bold border-[#dfbe7d]'
                            : 'bg-[#14161f] text-[#88909e] border-[#252b38] hover:text-white'
                        }`}
                      >
                        <span>{ord.id}</span>
                        <span className="text-[10px] opacity-80 font-normal">({ord.orderStatus})</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* The Visual OrderTracking Stepper Component */}
                {activeTrackingOrder && (
                  <OrderTracking
                    order={activeTrackingOrder}
                    onNavigateToDetail={onNavigateToDetail}
                    onNavigateToTrack={onNavigateToTrack}
                    onOpenInvoice={(ord) => setSelectedInvoiceOrder(ord)}
                    showItemsPreview={true}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Orders (Lists purchase history with order status, dates, and View Details link) */}
        {activeTab === 'orders' && (
          <MyOrdersSection
            orders={orders}
            onNavigateToDetail={onNavigateToDetail}
            onNavigateToTrack={(id) => {
              setSelectedTrackingOrderId(id);
              setActiveTab('tracking');
            }}
            onOpenInvoice={(o) => setSelectedInvoiceOrder(o)}
            onInitiateReturn={(orderId) => {
              setSelectedReturnOrderId(orderId);
              setActiveTab('returns');
            }}
          />
        )}

        {/* Tab: Style Archive (Saved curated outfit combinations from Outfit Builder) */}
        {activeTab === 'archive' && (
          <StyleArchiveSection
            onNavigateToDetail={onNavigateToDetail}
            onNavigateToBuilder={onNavigateToBuilder}
          />
        )}

        {/* Tab: Returns & Exchanges (Initiate return requests, view shipping labels, track return status) */}
        {activeTab === 'returns' && (
          <ReturnsAndExchangesSection
            onNavigateToDetail={onNavigateToDetail}
            initialSelectedOrderId={selectedReturnOrderId}
          />
        )}

        {/* Tab: Loyalty Rewards */}
        {activeTab === 'loyalty' && (
          <LoyaltyRewardsSection />
        )}

        {/* Tab 3: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Saved Shipping Addresses
              </h2>
              <button
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="px-4 py-2 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>{isAddingAddress ? 'Cancel' : 'Add New Address'}</span>
              </button>
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <form
                onSubmit={handleSaveAddress}
                className="bg-[#111319] border border-[#262c3b] p-5 space-y-3 max-w-xl text-xs"
              >
                <h3 className="font-semibold text-white uppercase tracking-wider text-xs mb-2">
                  New Delivery Location
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    className="bg-[#161822] border border-[#272d3b] p-2 text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile (+91)"
                    value={addrPhone}
                    onChange={(e) => setAddrPhone(e.target.value)}
                    className="bg-[#161822] border border-[#272d3b] p-2 text-white"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Address Line (Flat / Building / Road)"
                  value={addrLine}
                  onChange={(e) => setAddrLine(e.target.value)}
                  className="w-full bg-[#161822] border border-[#272d3b] p-2 text-white"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="bg-[#161822] border border-[#272d3b] p-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="bg-[#161822] border border-[#272d3b] p-2 text-white"
                  />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="PIN Code"
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    className="bg-[#161822] border border-[#272d3b] p-2 text-white font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#dfbe7d] text-[#0a0b0d] font-bold uppercase tracking-wider text-xs mt-2"
                >
                  Save Address
                </button>
              </form>
            )}

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-[#111319] border border-[#212632] p-5 space-y-2 text-xs relative"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white text-sm">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 bg-[#dfbe7d]/10 border border-[#dfbe7d]/30 text-[#dfbe7d] text-[10px] font-mono uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[#88909e]">{addr.addressLine}</p>
                  {addr.landmark && <p className="text-[#88909e]">Landmark: {addr.landmark}</p>}
                  <p className="text-[#88909e]">
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  <p className="text-[#88909e]">Phone: {addr.phone}</p>

                  <div className="pt-3 border-t border-[#1d212b] flex justify-end">
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-[#646a78] hover:text-[#e11d48] flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Email Preferences */}
        {activeTab === 'preferences' && (
          <EmailPreferencesSection />
        )}

        {/* Tab 4: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#111319] border border-[#212632]">
                <Heart className="h-10 w-10 text-[#3d4454] mx-auto mb-2" />
                <p className="text-sm font-medium text-white mb-1">Your wishlist is empty</p>
                <p className="text-xs text-[#88909e]">Tap the heart icon on any product to save it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onNavigateToDetail={onNavigateToDetail} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-[#111319] border border-[#212632] p-6 max-w-xl space-y-6 text-xs">
            <div>
              <h2 className="text-base font-serif font-bold text-white uppercase tracking-wider mb-1">
                Atelier Profile Customization
              </h2>
              <p className="text-[11px] text-[#88909e]">
                Personalize your member profile with your device camera. Photos are formatted with studio lighting profiles.
              </p>
            </div>

            {/* Profile Picture Camera Component Box */}
            <div className="p-4 sm:p-5 bg-[#141620] border border-[#252b3a] rounded-sm">
              <AvatarProfileCamera size="xl" showDetails={true} />
            </div>

            <div className="pt-2 border-t border-[#212632] space-y-4">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Member Credentials
              </h3>
              <div>
                <label className="text-[#88909e] uppercase font-mono text-[10px] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full bg-[#161822] border border-[#272d3b] p-2 text-white"
                />
              </div>
              <div>
                <label className="text-[#88909e] uppercase font-mono text-[10px] block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-[#161822] border border-[#272d3b] p-2 text-white"
                />
              </div>
              <div>
                <label className="text-[#88909e] uppercase font-mono text-[10px] block mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  disabled
                  value={user.phone}
                  className="w-full bg-[#161822] border border-[#272d3b] p-2 text-white"
                />
              </div>
              <p className="text-[11px] text-[#6d7483] pt-2">
                To update your primary member credentials or phone authentication, contact our concierge desk.
              </p>
            </div>

            {/* Email Preferences Shortcut Card */}
            <div className="pt-4 border-t border-[#212632] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-white text-xs font-semibold flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#dfbe7d]" />
                  <span>Email & Dispatch Preferences</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('preferences')}
                  className="text-[#dfbe7d] hover:text-white underline font-mono text-[11px] transition-colors cursor-pointer"
                >
                  Manage Preferences &rarr;
                </button>
              </div>
              <p className="text-[#88909e] text-[11px] leading-relaxed">
                Choose alerts for New Season Drops, Fragrance Releases, and Exclusive Sales, or adjust delivery frequency.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Printable PDF-Style Invoice Summary Modal */}
      <OrderInvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
};
