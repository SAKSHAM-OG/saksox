import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  HelpCircle,
  Search,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Check,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Order, ReturnRequest, ReturnItem, ReturnType, CartItem } from '../../types';
import { ShippingLabelModal } from './ShippingLabelModal';

interface ReturnsAndExchangesSectionProps {
  onNavigateToDetail?: (slug: string) => void;
  initialSelectedOrderId?: string;
}

// 5-Stage Return Tracking Milestones
const RETURN_TRACKING_STEPS = [
  {
    key: 'Requested',
    label: 'RMA Requested',
    description: 'Return authorization issued & label generated',
    icon: Package
  },
  {
    key: 'Pickup Scheduled',
    label: 'Pickup Scheduled',
    description: 'BlueDart courier doorstep pickup assigned',
    icon: Clock
  },
  {
    key: 'In Transit',
    label: 'In Transit',
    description: 'Waybill scanned on route to Delhi Atelier Hub',
    icon: Truck
  },
  {
    key: 'Inspected & Approved',
    label: 'Quality Inspection',
    description: 'Garments verified unworn with original tags',
    icon: ShieldCheck
  },
  {
    key: 'Refund Issued',
    label: 'Refund / Exchange',
    description: 'Funds credited or replacement drop dispatched',
    icon: CheckCircle2
  }
];

const RETURN_REASONS = [
  'Wrong size / fit issue',
  'Exchange for different size or color',
  'Item defective or damaged upon arrival',
  'Different from website description / photos',
  'Changed styling preference',
  'Ordered multiple sizes to try'
];

export const ReturnsAndExchangesSection: React.FC<ReturnsAndExchangesSectionProps> = ({
  onNavigateToDetail,
  initialSelectedOrderId
}) => {
  const {
    orders,
    returnRequests,
    initiateReturnRequest,
    cancelReturnRequest,
    user
  } = useShop();

  // Active view: 'tracking' | 'new-request' | 'policy'
  const [activeSubTab, setActiveSubTab] = useState<'tracking' | 'new-request' | 'policy'>('tracking');

  // Modal State for viewing & printing shipping label
  const [activeLabelReturn, setActiveLabelReturn] = useState<ReturnRequest | null>(null);

  // Search/Filter for return requests
  const [searchRma, setSearchRma] = useState('');

  // -------------------------------------------------------------
  // New Return Form State
  // -------------------------------------------------------------
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialSelectedOrderId || (orders[0]?.id || '')
  );

  // Map of selected items: orderItemId -> { selected: boolean, quantity: number, reason: string, type: ReturnType, exchangeSize?: string, exchangeColor?: string }
  const [selectedItemsMap, setSelectedItemsMap] = useState<
    Record<
      string,
      {
        selected: boolean;
        quantity: number;
        reason: string;
        type: ReturnType;
        exchangeSize?: string;
        exchangeColor?: string;
      }
    >
  >({});

  const [refundMethod, setRefundMethod] = useState<'original' | 'store_credit'>('original');
  const [pickupMethod, setPickupMethod] = useState<'doorstep_pickup' | 'hub_dropoff'>('doorstep_pickup');
  const [customerNotes, setCustomerNotes] = useState('');
  const [tagConfirmed, setTagConfirmed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Selected Order object
  const selectedOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId) || orders[0] || null;
  }, [orders, selectedOrderId]);

  // When order changes, reset selected items
  const handleOrderChange = (orderId: string) => {
    setSelectedOrderId(orderId);
    setSelectedItemsMap({});
    setFormError(null);
  };

  // Toggle item selection in new return
  const toggleItemSelection = (item: CartItem) => {
    setSelectedItemsMap((prev) => {
      const exists = prev[item.id];
      if (exists && exists.selected) {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return {
        ...prev,
        [item.id]: {
          selected: true,
          quantity: item.quantity,
          reason: RETURN_REASONS[0],
          type: 'return',
          exchangeSize: item.selectedSize ? item.selectedSize : undefined,
          exchangeColor: item.selectedColor ? item.selectedColor : undefined
        }
      };
    });
  };

  // Update item field in selection
  const updateSelectedItemField = (
    itemId: string,
    field: string,
    value: any
  ) => {
    setSelectedItemsMap((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  // Calculate total refund / valuation of currently selected items
  const currentSelectedTotal = useMemo(() => {
    if (!selectedOrder) return 0;
    let sum = 0;
    Object.entries(selectedItemsMap).forEach(([itemId, conf]) => {
      if (conf.selected) {
        const found = selectedOrder.items.find((i) => i.id === itemId);
        if (found) {
          sum += found.product.price * conf.quantity;
        }
      }
    });
    return sum;
  }, [selectedOrder, selectedItemsMap]);

  // Handle Form Submission
  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!selectedOrder) {
      setFormError('Please select a valid order from your history.');
      return;
    }

    const selectedKeys = Object.keys(selectedItemsMap).filter(
      (k) => selectedItemsMap[k].selected
    );

    if (selectedKeys.length === 0) {
      setFormError('Please select at least one item from the order to return or exchange.');
      return;
    }

    if (!tagConfirmed) {
      setFormError('Please confirm the garment condition inspection requirement.');
      return;
    }

    const itemsToReturn: ReturnItem[] = selectedKeys.map((itemId) => {
      const config = selectedItemsMap[itemId];
      const cartItem = selectedOrder.items.find((i) => i.id === itemId)!;
      return {
        orderItemId: itemId,
        product: cartItem.product,
        selectedSize: cartItem.selectedSize,
        selectedColor: cartItem.selectedColor,
        quantity: config.quantity,
        reason: config.reason,
        exchangeSize: config.type === 'exchange' ? config.exchangeSize : undefined,
        exchangeColor: config.type === 'exchange' ? config.exchangeColor : undefined
      };
    });

    const isAnyExchange = itemsToReturn.some((i) => {
      const conf = selectedItemsMap[i.orderItemId];
      return conf && conf.type === 'exchange';
    });

    const newRequest = initiateReturnRequest({
      orderId: selectedOrder.id,
      type: isAnyExchange ? 'exchange' : 'return',
      items: itemsToReturn,
      refundMethod,
      pickupMethod,
      pickupAddress: selectedOrder.shippingAddress || user?.savedAddresses[0] || {
        id: 'addr-default',
        name: user?.name || 'Aryan Varma',
        phone: user?.phone || '+91 98112 45890',
        addressLine: 'A-42, Gulmohar Enclave, Near Hauz Khas',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110016',
        isDefault: true
      },
      carrier: 'BlueDart Express Air Return',
      totalRefundAmount: currentSelectedTotal,
      notes: customerNotes.trim() || undefined
    });

    // Reset form and view shipping label
    setSelectedItemsMap({});
    setCustomerNotes('');
    setTagConfirmed(false);
    setActiveSubTab('tracking');
    setActiveLabelReturn(newRequest);
  };

  // Helper to get step index for progress bar
  const getStepProgressIndex = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'Requested':
        return 0;
      case 'Pickup Scheduled':
        return 1;
      case 'In Transit':
        return 2;
      case 'Inspected & Approved':
        return 3;
      case 'Refund Issued':
      case 'Exchange Delivered':
        return 4;
      default:
        return 0;
    }
  };

  // Filtered returns
  const filteredReturns = useMemo(() => {
    if (!searchRma.trim()) return returnRequests;
    const q = searchRma.toLowerCase().trim();
    return returnRequests.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.orderId.toLowerCase().includes(q) ||
        r.returnTrackingNumber.toLowerCase().includes(q) ||
        r.items.some((i) => i.product.name.toLowerCase().includes(q))
    );
  }, [returnRequests, searchRma]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Section Header & Policy Callout */}
      <div className="bg-[#111319] border border-[#212632] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-[#dfbe7d]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#dfbe7d]/10 border border-[#dfbe7d]/30 text-[#dfbe7d] text-[10px] font-mono uppercase font-bold tracking-wider">
                15-Day Complimentary
              </span>
              <span className="text-[11px] font-mono text-[#88909e]">• Doorstep Courier Pickup</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Returns & Exchanges Atelier
            </h2>
            <p className="text-xs text-[#9aa0b0] leading-relaxed">
              Initiate instant return requests for your SAKSOX wardrobe drops, generate pre-paid BlueDart
              airway shipping labels, and track quality inspection in real-time.
            </p>
          </div>

          {/* Quick Stats & Action Button */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-[#161822] border border-[#272d3d] p-3 text-center min-w-[110px]">
              <div className="text-[10px] font-mono uppercase text-[#88909e]">Active Requests</div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {returnRequests.length}
              </div>
            </div>

            <div className="bg-[#161822] border border-[#272d3d] p-3 text-center min-w-[120px]">
              <div className="text-[10px] font-mono uppercase text-[#88909e]">Eligible Orders</div>
              <div className="text-lg font-bold font-mono text-[#dfbe7d] mt-0.5">
                {orders.length}
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('new-request')}
              className="px-4 py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              <span>Initiate Return / Exchange</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex border-b border-[#252b3a] mt-6 pt-2 gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('tracking')}
            className={`pb-2.5 font-bold uppercase transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'tracking'
                ? 'border-[#dfbe7d] text-[#dfbe7d]'
                : 'border-transparent text-[#88909e] hover:text-white'
            }`}
          >
            <Truck className="h-3.5 w-3.5" />
            <span>Return Status Tracking ({returnRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('new-request')}
            className={`pb-2.5 font-bold uppercase transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'new-request'
                ? 'border-[#dfbe7d] text-[#dfbe7d]'
                : 'border-transparent text-[#88909e] hover:text-white'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Initiate New Request</span>
          </button>

          <button
            onClick={() => setActiveSubTab('policy')}
            className={`pb-2.5 font-bold uppercase transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'policy'
                ? 'border-[#dfbe7d] text-[#dfbe7d]'
                : 'border-transparent text-[#88909e] hover:text-white'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Policy & Guidelines</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUB-VIEW 1: RETURN STATUS TRACKING LIST */}
      {/* ============================================================== */}
      {activeSubTab === 'tracking' && (
        <div className="space-y-6">
          {/* Search RMA / Filter */}
          {returnRequests.length > 1 && (
            <div className="flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="h-3.5 w-3.5 text-[#88909e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by RMA, Order ID or Product..."
                  value={searchRma}
                  onChange={(e) => setSearchRma(e.target.value)}
                  className="w-full bg-[#111319] border border-[#212632] pl-8 pr-3 py-2 text-xs text-white placeholder-[#5d6575] focus:outline-none focus:border-[#dfbe7d]"
                />
              </div>

              <div className="text-[11px] font-mono text-[#88909e]">
                Showing {filteredReturns.length} of {returnRequests.length} returns
              </div>
            </div>
          )}

          {returnRequests.length === 0 ? (
            <div className="text-center py-16 bg-[#111319] border border-[#212632] px-4">
              <RotateCcw className="h-10 w-10 text-[#3d4454] mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">
                No Return Requests Active
              </h3>
              <p className="text-xs text-[#88909e] max-w-md mx-auto mb-5">
                All your orders are delivered and in order. If you need a size exchange or wish to
                return an unworn item, start a return anytime within 15 days.
              </p>
              <button
                onClick={() => setActiveSubTab('new-request')}
                className="px-5 py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider font-mono cursor-pointer"
              >
                Initiate A Return
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReturns.map((req) => {
                const currentStepIdx = getStepProgressIndex(req.status);
                const isExchange = req.type === 'exchange';

                return (
                  <div
                    key={req.id}
                    className="bg-[#111319] border border-[#232836] rounded-sm overflow-hidden shadow-lg transition-all"
                  >
                    {/* Header Bar */}
                    <div className="p-4 sm:p-5 bg-[#141620] border-b border-[#212634] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                            {req.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold border ${
                              isExchange
                                ? 'bg-purple-950/40 text-purple-300 border-purple-800/40'
                                : 'bg-[#dfbe7d]/10 text-[#dfbe7d] border-[#dfbe7d]/30'
                            }`}
                          >
                            {isExchange ? 'Exchange Request' : 'Standard Return'}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-950/40 text-blue-300 border border-blue-800/40 text-[10px] font-mono uppercase font-semibold">
                            {req.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#88909e] font-mono">
                          <span>
                            Order Ref: <strong className="text-white">{req.orderId}</strong>
                          </span>
                          <span>•</span>
                          <span>Requested on: {req.dateRequested}</span>
                          <span>•</span>
                          <span>AWB: {req.returnTrackingNumber}</span>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => setActiveLabelReturn(req)}
                          className="px-3.5 py-1.5 bg-[#dfbe7d]/10 hover:bg-[#dfbe7d] text-[#dfbe7d] hover:text-[#0a0b0d] border border-[#dfbe7d]/40 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                          title="View and print official return shipping label"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>Shipping Label</span>
                        </button>

                        {(req.status === 'Requested' || req.status === 'Pickup Scheduled') && (
                          <button
                            onClick={() => cancelReturnRequest(req.id)}
                            className="px-3 py-1.5 bg-[#171a24] hover:bg-[#271a20] border border-[#2b3040] hover:border-red-900/50 text-[#88909e] hover:text-red-400 text-xs font-mono transition-colors cursor-pointer"
                            title="Cancel this return request"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Visual 5-Stage Stepper Component */}
                    <div className="p-5 sm:p-6 bg-[#0c0d12] border-b border-[#1f2430]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono uppercase text-[#88909e] tracking-wider font-semibold">
                          Live Return Inspection & Transit Milestones
                        </span>
                        <span className="text-xs font-mono text-[#dfbe7d]">
                          Est. Resolution: <strong>{req.estimatedResolutionDate}</strong>
                        </span>
                      </div>

                      {/* Stepper Progress Bar */}
                      <div className="relative pt-2 pb-4">
                        {/* Connecting Line */}
                        <div className="absolute top-7 left-6 right-6 h-0.5 bg-[#1e2330] -z-0 hidden md:block">
                          <div
                            className="h-full bg-gradient-to-r from-[#dfbe7d] to-[#c9a96e] transition-all duration-700"
                            style={{
                              width: `${(currentStepIdx / (RETURN_TRACKING_STEPS.length - 1)) * 100}%`
                            }}
                          />
                        </div>

                        {/* Step Nodes */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                          {RETURN_TRACKING_STEPS.map((step, idx) => {
                            const isCompleted = idx < currentStepIdx;
                            const isCurrent = idx === currentStepIdx;
                            const isPending = idx > currentStepIdx;
                            const StepIcon = step.icon;

                            return (
                              <div
                                key={step.key}
                                className={`flex md:flex-col items-center md:items-center gap-3 text-left md:text-center p-2 rounded ${
                                  isCurrent ? 'bg-[#151824]/60 border border-[#dfbe7d]/20' : ''
                                }`}
                              >
                                {/* Circle Icon */}
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                                    isCompleted
                                      ? 'bg-[#dfbe7d] border-[#dfbe7d] text-[#0a0b0d]'
                                      : isCurrent
                                      ? 'bg-[#141724] border-[#dfbe7d] text-[#dfbe7d] ring-4 ring-[#dfbe7d]/15 animate-pulse'
                                      : 'bg-[#14161f] border-[#272d3b] text-[#555d70]'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <Check className="h-4 w-4 stroke-[3]" />
                                  ) : (
                                    <StepIcon className="h-4 w-4" />
                                  )}
                                </div>

                                {/* Label & Info */}
                                <div>
                                  <div
                                    className={`text-xs font-bold font-mono tracking-wide ${
                                      isCurrent
                                        ? 'text-[#dfbe7d]'
                                        : isCompleted
                                        ? 'text-white'
                                        : 'text-[#5d6577]'
                                    }`}
                                  >
                                    {step.label}
                                  </div>
                                  <div className="text-[10px] text-[#7d8597] leading-tight mt-0.5 hidden md:block">
                                    {step.description}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Status Description Box */}
                      <div className="mt-2 p-3 bg-[#13151f] border border-[#242938] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2 text-[#9da5b8]">
                          <Truck className="h-4 w-4 text-[#dfbe7d] flex-shrink-0" />
                          <span>
                            {req.pickupScheduledDate ? (
                              <>
                                Pickup Slot: <strong className="text-white">{req.pickupScheduledDate}</strong>
                              </>
                            ) : (
                              'Doorstep courier scan confirmed'
                            )}
                          </span>
                        </div>

                        <div className="text-[#88909e] flex items-center gap-2">
                          <span>Carrier: {req.carrier}</span>
                          <span>•</span>
                          <span>AWB #{req.returnTrackingNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Return Items Included */}
                    <div className="p-4 sm:p-5 divide-y divide-[#1e2330]">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#88909e] pb-3">
                        Items Under This Request ({req.items.length})
                      </div>

                      {req.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="py-3 first:pt-2 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            {/* Product Thumbnail */}
                            <div
                              onClick={() =>
                                onNavigateToDetail && onNavigateToDetail(item.product.slug)
                              }
                              className="h-16 w-14 bg-[#0a0b0f] border border-[#232733] overflow-hidden flex-shrink-0 cursor-pointer"
                            >
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="space-y-1">
                              <div
                                onClick={() =>
                                  onNavigateToDetail && onNavigateToDetail(item.product.slug)
                                }
                                className="text-sm font-semibold text-white hover:text-[#dfbe7d] transition-colors cursor-pointer"
                              >
                                {item.product.name}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#88909e] font-mono">
                                {item.selectedSize && (
                                  <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                                )}
                                {item.selectedColor && (
                                  <>
                                    <span>•</span>
                                    <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                                  </>
                                )}
                                <span>•</span>
                                <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                              </div>

                              <div className="text-[11px] text-[#dfbe7d] font-mono">
                                Reason: <span className="text-[#a5acbd]">{item.reason}</span>
                              </div>

                              {item.exchangeSize && (
                                <div className="text-[11px] text-purple-300 font-mono">
                                  Requested Exchange Size: <strong>{item.exchangeSize}</strong>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-right font-mono self-end sm:self-center">
                            <div className="text-xs text-[#88909e]">Refund Valuation</div>
                            <div className="text-sm font-bold text-white">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Return Footer Summary */}
                    <div className="p-3.5 sm:px-5 bg-[#0f1118] border-t border-[#1d222e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#88909e]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#dfbe7d]" />
                        <span>
                          Pickup Location: {req.pickupAddress.addressLine}, {req.pickupAddress.city} — {req.pickupAddress.pincode}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span>
                          Refund Method:{' '}
                          <strong className="text-white uppercase">
                            {req.refundMethod === 'store_credit' ? 'Atelier Store Credit' : 'Original Payment Source'}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-VIEW 2: INITIATE NEW RETURN / EXCHANGE FORM */}
      {/* ============================================================== */}
      {activeSubTab === 'new-request' && (
        <form onSubmit={handleSubmitReturn} className="space-y-6">
          <div className="bg-[#111319] border border-[#212632] p-5 sm:p-7 space-y-6">
            <div className="border-b border-[#212632] pb-4">
              <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
                Step 1: Select Order & Returnable Items
              </h3>
              <p className="text-xs text-[#88909e] mt-1">
                Choose the purchase from which you would like to initiate an atelier return or exchange.
              </p>
            </div>

            {/* Order Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#88909e] font-semibold">
                Select Order from Purchase History
              </label>

              {orders.length === 0 ? (
                <div className="p-4 bg-[#151722] border border-[#272d3b] text-xs text-[#88909e]">
                  No past orders found to return.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {orders.map((ord) => {
                    const isSelected = ord.id === selectedOrderId;
                    return (
                      <div
                        key={ord.id}
                        onClick={() => handleOrderChange(ord.id)}
                        className={`p-3.5 border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#181b26] border-[#dfbe7d] ring-1 ring-[#dfbe7d]'
                            : 'bg-[#13151f] border-[#222736] hover:border-[#353c50]'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs font-mono mb-1">
                          <span className={`font-bold ${isSelected ? 'text-[#dfbe7d]' : 'text-white'}`}>
                            {ord.id}
                          </span>
                          <span className="text-[10px] text-[#88909e]">{ord.date}</span>
                        </div>
                        <div className="text-[11px] text-[#88909e] font-mono">
                          {ord.items.length} item(s) • ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-green-400 mt-1 uppercase font-mono">
                          {ord.orderStatus}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selectable Items in the Selected Order */}
            {selectedOrder && (
              <div className="space-y-3 pt-3">
                <label className="text-xs font-mono uppercase text-[#88909e] font-semibold flex items-center justify-between">
                  <span>Select Items to Return or Exchange</span>
                  <span className="text-[10px] text-[#dfbe7d]">
                    Check the box next to each item
                  </span>
                </label>

                <div className="space-y-3">
                  {selectedOrder.items.map((item: CartItem) => {
                    const itemConfig = selectedItemsMap[item.id];
                    const isChecked = Boolean(itemConfig?.selected);

                    return (
                      <div
                        key={item.id}
                        className={`p-4 border transition-all ${
                          isChecked
                            ? 'bg-[#181b28] border-[#dfbe7d]/70 shadow-sm'
                            : 'bg-[#13151f] border-[#222736]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          {/* Left: Checkbox + Product Details */}
                          <div className="flex items-start gap-3.5 flex-1">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItemSelection(item)}
                              id={`item-${item.id}`}
                              className="mt-1 h-4 w-4 accent-[#dfbe7d] cursor-pointer"
                            />

                            <label
                              htmlFor={`item-${item.id}`}
                              className="h-14 w-12 bg-[#0a0b0e] border border-[#262c3b] overflow-hidden flex-shrink-0 cursor-pointer"
                            >
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </label>

                            <div className="space-y-1">
                              <label
                                htmlFor={`item-${item.id}`}
                                className="text-sm font-semibold text-white cursor-pointer hover:text-[#dfbe7d] transition-colors"
                              >
                                {item.product.name}
                              </label>

                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#88909e] font-mono">
                                <span>Price: ₹{item.product.price.toLocaleString('en-IN')}</span>
                                {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                                {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                                <span>• Purchased Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Valuation */}
                          <div className="text-right font-mono self-end sm:self-auto">
                            <div className="text-xs font-bold text-white">
                              ₹{(item.product.price * (itemConfig?.quantity || item.quantity)).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        {/* If Checked, Show Reason & Action Controls */}
                        {isChecked && (
                          <div className="mt-4 pt-4 border-t border-[#232938] grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn text-xs">
                            {/* Return Type */}
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-[#88909e] mb-1">
                                Action
                              </label>
                              <select
                                value={itemConfig.type}
                                onChange={(e) =>
                                  updateSelectedItemField(item.id, 'type', e.target.value as ReturnType)
                                }
                                className="w-full bg-[#111319] border border-[#282f40] p-2 text-white text-xs font-mono"
                              >
                                <option value="return">Return for Full Refund</option>
                                <option value="exchange">Exchange for Another Size</option>
                              </select>
                            </div>

                            {/* Reason Selector */}
                            <div className={itemConfig.type === 'exchange' ? 'sm:col-span-1' : 'sm:col-span-2'}>
                              <label className="block text-[10px] font-mono uppercase text-[#88909e] mb-1">
                                Reason for Return
                              </label>
                              <select
                                value={itemConfig.reason}
                                onChange={(e) =>
                                  updateSelectedItemField(item.id, 'reason', e.target.value)
                                }
                                className="w-full bg-[#111319] border border-[#282f40] p-2 text-white text-xs"
                              >
                                {RETURN_REASONS.map((r, i) => (
                                  <option key={i} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* If Exchange, Show New Size Selector */}
                            {itemConfig.type === 'exchange' && (
                              <div>
                                <label className="block text-[10px] font-mono uppercase text-[#88909e] mb-1">
                                  Preferred Exchange Size
                                </label>
                                <select
                                  value={itemConfig.exchangeSize || item.product.sizes[0]}
                                  onChange={(e) =>
                                    updateSelectedItemField(item.id, 'exchangeSize', e.target.value)
                                  }
                                  className="w-full bg-[#111319] border border-[#282f40] p-2 text-white text-xs font-mono"
                                >
                                  {item.product.sizes.map((s) => (
                                    <option key={s} value={s}>
                                      Size {s} {s === item.selectedSize ? '(Current)' : ''}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Refund Method & Pickup Details */}
            <div className="border-t border-[#212632] pt-6 space-y-6">
              <div className="border-b border-[#212632] pb-3">
                <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
                  Step 2: Refund & Logistics Preferences
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Refund Method Options */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-[#88909e] font-semibold">
                    Refund Resolution
                  </label>

                  <div className="space-y-2">
                    <label
                      onClick={() => setRefundMethod('original')}
                      className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                        refundMethod === 'original'
                          ? 'bg-[#181b26] border-[#dfbe7d]'
                          : 'bg-[#13151f] border-[#222736]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="refundMethod"
                        checked={refundMethod === 'original'}
                        onChange={() => setRefundMethod('original')}
                        className="mt-0.5 accent-[#dfbe7d]"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">
                          Original Payment Method
                        </div>
                        <div className="text-[11px] text-[#88909e]">
                          Credited to original UPI account or Bank card within 3-5 banking days after inspection.
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setRefundMethod('store_credit')}
                      className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                        refundMethod === 'store_credit'
                          ? 'bg-[#181b26] border-[#dfbe7d]'
                          : 'bg-[#13151f] border-[#222736]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="refundMethod"
                        checked={refundMethod === 'store_credit'}
                        onChange={() => setRefundMethod('store_credit')}
                        className="mt-0.5 accent-[#dfbe7d]"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            Atelier Store Credit
                          </span>
                          <span className="px-1.5 py-0.2 bg-[#dfbe7d]/20 text-[#dfbe7d] text-[10px] font-mono uppercase font-bold">
                            +5% Bonus
                          </span>
                        </div>
                        <div className="text-[11px] text-[#88909e]">
                          Instant store credit voucher generated immediately upon courier collection.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pickup Logistics Method */}
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase text-[#88909e] font-semibold">
                    Return Pickup Method
                  </label>

                  <div className="space-y-2">
                    <label
                      onClick={() => setPickupMethod('doorstep_pickup')}
                      className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                        pickupMethod === 'doorstep_pickup'
                          ? 'bg-[#181b26] border-[#dfbe7d]'
                          : 'bg-[#13151f] border-[#222736]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pickupMethod"
                        checked={pickupMethod === 'doorstep_pickup'}
                        onChange={() => setPickupMethod('doorstep_pickup')}
                        className="mt-0.5 accent-[#dfbe7d]"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Truck className="h-3.5 w-3.5 text-[#dfbe7d]" />
                          <span>Complimentary Doorstep BlueDart Pickup</span>
                        </div>
                        <div className="text-[11px] text-[#88909e]">
                          BlueDart courier representative collects the package directly from your saved address tomorrow.
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setPickupMethod('hub_dropoff')}
                      className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                        pickupMethod === 'hub_dropoff'
                          ? 'bg-[#181b26] border-[#dfbe7d]'
                          : 'bg-[#13151f] border-[#222736]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pickupMethod"
                        checked={pickupMethod === 'hub_dropoff'}
                        onChange={() => setPickupMethod('hub_dropoff')}
                        className="mt-0.5 accent-[#dfbe7d]"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">
                          Drop-Off at Nearest BlueDart Express Centre
                        </div>
                        <div className="text-[11px] text-[#88909e]">
                          Drop package with pre-paid shipping label at any BlueDart or Delhivery hub at your convenience.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Special Instructions Notes */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#88909e] mb-1.5 font-semibold">
                  Inspection Notes or Instructions for Courier (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="e.g. Please call before arrival; gate code is #402..."
                  className="w-full bg-[#141620] border border-[#272d3b] p-3 text-xs text-white placeholder-[#555c6d] focus:outline-none focus:border-[#dfbe7d]"
                />
              </div>

              {/* Garment Tag Condition Confirmation Checkbox */}
              <div className="p-3.5 bg-[#141724] border border-[#262d3e]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tagConfirmed}
                    onChange={(e) => setTagConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#dfbe7d] cursor-pointer"
                  />
                  <div className="text-xs text-[#a3abbd] leading-normal">
                    <strong className="text-white font-mono uppercase">
                      Condition Acknowledgment:{' '}
                    </strong>
                    I confirm that the selected items are unworn, unwashed, and in their original packaging
                    with all SAKSOX Atelier authenticity tags and security ribbons securely attached.
                  </div>
                </label>
              </div>

              {/* Error Message if any */}
              {formError && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            {/* Submit & Valuation Bar */}
            <div className="p-4 sm:p-5 bg-[#0e1015] border border-[#212634] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-[#88909e]">
                  Estimated Refund Valuation
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  ₹{currentSelectedTotal.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-[#88909e]">INR</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('tracking')}
                  className="px-4 py-2.5 bg-[#171a24] hover:bg-[#202534] border border-[#282f40] text-[#88909e] hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={currentSelectedTotal === 0}
                  className="px-6 py-2.5 bg-[#dfbe7d] hover:bg-[#c9a96e] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0b0d] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Submit & Generate Shipping Label</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* SUB-VIEW 3: POLICY & GUIDELINES */}
      {/* ============================================================== */}
      {activeSubTab === 'policy' && (
        <div className="bg-[#111319] border border-[#212632] p-6 sm:p-8 space-y-6 text-xs text-[#9aa0b0]">
          <div>
            <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider mb-2">
              SAKSOX Atelier Returns & Exchanges Policy
            </h3>
            <p className="leading-relaxed">
              We take pride in our artisanal outerwear and hand-blended fragrances. If your piece does
              not meet your exacting fit or aesthetic expectations, we offer complimentary return pickup
              and exchange services across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-4 bg-[#141622] border border-[#242938] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#dfbe7d]/10 flex items-center justify-center text-[#dfbe7d] font-bold font-mono">
                15
              </div>
              <h4 className="font-bold text-white font-mono uppercase">15-Day Return Window</h4>
              <p className="text-[11px] text-[#7d8597] leading-relaxed">
                Returns and size exchanges must be requested within 15 days of verified courier delivery
                confirmation.
              </p>
            </div>

            <div className="p-4 bg-[#141622] border border-[#242938] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#dfbe7d]/10 flex items-center justify-center text-[#dfbe7d] font-bold font-mono">
                🏷
              </div>
              <h4 className="font-bold text-white font-mono uppercase">Original Tags & Condition</h4>
              <p className="text-[11px] text-[#7d8597] leading-relaxed">
                Outerwear must be unworn and unperfumed with the SAKSOX seal intact. Fragrances must be
                in unopened, sealed cellophane packaging.
              </p>
            </div>

            <div className="p-4 bg-[#141622] border border-[#242938] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#dfbe7d]/10 flex items-center justify-center text-[#dfbe7d] font-bold font-mono">
                ⚡
              </div>
              <h4 className="font-bold text-white font-mono uppercase">24-Hr Instant Quality Check</h4>
              <p className="text-[11px] text-[#7d8597] leading-relaxed">
                Once received at our Delhi atelier depot, quality verification is finalized within 24
                hours, releasing your refund or dispatched replacement item.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f2432] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono">
            <span>Questions? Contact Atelier Concierge: support@saksox.com</span>
            <button
              onClick={() => setActiveSubTab('new-request')}
              className="text-[#dfbe7d] hover:underline uppercase font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Initiate Request Now</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Shipping Label Modal */}
      {activeLabelReturn && (
        <ShippingLabelModal
          returnRequest={activeLabelReturn}
          onClose={() => setActiveLabelReturn(null)}
        />
      )}
    </div>
  );
};
