import React, { useState, useMemo } from 'react';
import {
  Package,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Download,
  Search,
  Filter,
  CreditCard,
  MapPin,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { Order, CartItem } from '../../types';
import { useShop } from '../../context/ShopContext';

interface MyOrdersSectionProps {
  orders: Order[];
  onNavigateToDetail: (slug: string) => void;
  onNavigateToTrack: (orderId: string) => void;
  onOpenInvoice: (order: Order) => void;
  onInitiateReturn?: (orderId: string) => void;
}

export const MyOrdersSection: React.FC<MyOrdersSectionProps> = ({
  orders,
  onNavigateToDetail,
  onNavigateToTrack,
  onOpenInvoice,
  onInitiateReturn
}) => {
  const { addToCart } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== 'all' && order.orderStatus.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesAwb = order.trackingNumber.toLowerCase().includes(query);
        const matchesProduct = order.items.some((item) =>
          item.product.name.toLowerCase().includes(query)
        );
        if (!matchesId && !matchesAwb && !matchesProduct) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const getStatusBadge = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            <span>Delivered</span>
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-amber-950/60 border border-amber-500/40 text-amber-400">
            <Truck className="h-3 w-3" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'Dispatched':
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-sky-950/60 border border-sky-500/40 text-sky-400">
            <Truck className="h-3 w-3" />
            <span>In Transit</span>
          </span>
        );
      case 'Processing':
      case 'Order Confirmed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-[#1b1e2a] border border-[#dfbe7d]/40 text-[#dfbe7d]">
            <Clock className="h-3 w-3" />
            <span>Processing</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header with Controls */}
      <div className="bg-[#111319] border border-[#212632] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#dfbe7d]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Purchase History
              </h2>
            </div>
            <p className="text-xs text-[#88909e] mt-1">
              Review your past orders, delivery milestones, and purchased item details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#88909e]">Total Orders:</span>
            <span className="px-2.5 py-1 bg-[#1a1c26] border border-[#2c3344] text-[#dfbe7d] font-mono text-xs font-bold">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#1c202b]">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'Processing', label: 'Processing' },
              { id: 'Dispatched', label: 'In Transit' },
              { id: 'Delivered', label: 'Delivered' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 border text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-[#dfbe7d] text-[#0a0b0d] font-bold border-[#dfbe7d]'
                    : 'bg-[#14161f] text-[#88909e] border-[#252b38] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5e6678]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, AWB or product..."
              className="w-full bg-[#14161f] border border-[#252b38] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#5e6678] focus:outline-none focus:border-[#dfbe7d]/70 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-[#111319] border border-[#212632] p-8">
          <Package className="h-12 w-12 text-[#3d4454] mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-1">
            {orders.length === 0 ? 'No orders yet' : 'No matching orders found'}
          </h3>
          <p className="text-xs text-[#88909e] max-w-sm mx-auto">
            {orders.length === 0
              ? 'Your purchased winter edits and signature extraits will appear here once checked out.'
              : 'Try clearing your search query or switching your status filter.'}
          </p>
          {statusFilter !== 'all' || searchQuery ? (
            <button
              onClick={() => {
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#1b1f2b] border border-[#2e3648] hover:border-[#dfbe7d] text-xs font-mono text-white transition-colors"
            >
              Reset Filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#111319] border border-[#232733] hover:border-[#383e4e] transition-all overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-5 bg-[#141720] border-b border-[#212632] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#88909e] uppercase tracking-wider block">
                      Order Reference
                    </span>
                    <span className="text-sm font-mono font-bold text-white tracking-wider">
                      {order.id}
                    </span>
                  </div>

                  <div className="h-7 w-px bg-[#212632] hidden sm:block" />

                  <div>
                    <span className="text-[10px] font-mono text-[#88909e] uppercase tracking-wider block">
                      Date Placed
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#d6ccbe]">
                      <Calendar className="h-3 w-3 text-[#dfbe7d]" />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="h-7 w-px bg-[#212632] hidden sm:block" />

                  <div>
                    <span className="text-[10px] font-mono text-[#88909e] uppercase tracking-wider block">
                      Total Paid
                    </span>
                    <span className="text-sm font-mono font-bold text-[#dfbe7d]">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="h-7 w-px bg-[#212632] hidden sm:block" />

                  <div>
                    <span className="text-[10px] font-mono text-[#88909e] uppercase tracking-wider block mb-0.5">
                      Status
                    </span>
                    {getStatusBadge(order.orderStatus)}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => onNavigateToTrack(order.id)}
                    className="px-3 py-1.5 bg-[#1b1f2b] hover:bg-[#252b3c] border border-[#2d3546] hover:border-[#dfbe7d]/50 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="View live shipment tracker stepper"
                  >
                    <Truck className="h-3.5 w-3.5 text-[#dfbe7d]" />
                    <span>Track Shipment</span>
                  </button>

                  <button
                    onClick={() => onOpenInvoice(order)}
                    className="px-3 py-1.5 bg-[#181a24] hover:bg-[#222736] border border-[#2c3344] text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Download Official Tax Invoice PDF"
                  >
                    <Download className="h-3.5 w-3.5 text-[#88909e]" />
                    <span>Invoice</span>
                  </button>

                  {onInitiateReturn && (
                    <button
                      onClick={() => onInitiateReturn(order.id)}
                      className="px-3 py-1.5 bg-[#181a24] hover:bg-[#232738] border border-[#2c3344] hover:border-[#dfbe7d]/50 text-[#dfbe7d] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Initiate Return or Size Exchange for this order"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-[#dfbe7d]" />
                      <span>Return / Exchange</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-4 sm:p-5 divide-y divide-[#1d222e]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#88909e] pb-3">
                  Purchased Items ({order.items.length})
                </div>

                {order.items.map((item: CartItem) => {
                  const unitPrice = item.product.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="py-3.5 first:pt-3 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-start gap-4">
                        <div
                          onClick={() => onNavigateToDetail(item.product.slug)}
                          className="h-16 w-14 flex-shrink-0 bg-[#0c0d11] border border-[#232733] overflow-hidden cursor-pointer relative group/img"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-full w-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => onNavigateToDetail(item.product.slug)}
                            className="text-sm font-semibold text-white hover:text-[#dfbe7d] transition-colors text-left line-clamp-1 cursor-pointer"
                          >
                            {item.product.name}
                          </button>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#88909e] font-mono">
                            <span className="capitalize">{item.product.category}</span>
                            {item.selectedSize && (
                              <>
                                <span>•</span>
                                <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                              </>
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

                          <div className="text-xs font-mono text-[#d6ccbe] pt-0.5">
                            ₹{unitPrice.toLocaleString('en-IN')} each
                            {item.quantity > 1 && (
                              <span className="text-[#88909e] ml-1.5">
                                (Total: ₹{itemTotal.toLocaleString('en-IN')})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Explicit 'View Details' Link and Actions */}
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => onNavigateToDetail(item.product.slug)}
                          className="px-3.5 py-1.5 bg-[#1b1f2c] hover:bg-[#dfbe7d] text-[#dfbe7d] hover:text-[#0a0b0d] border border-[#dfbe7d]/40 hover:border-[#dfbe7d] text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          aria-label={`View Details for ${item.product.name}`}
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item.product, item.selectedSize, item.selectedColor, 1);
                          }}
                          className="p-1.5 bg-[#151720] hover:bg-[#202533] border border-[#272d3b] text-[#88909e] hover:text-white transition-colors cursor-pointer"
                          title="Buy again (Add to bag)"
                          aria-label="Buy again"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer Info */}
              <div className="p-3.5 sm:px-5 bg-[#0e1015] border-t border-[#1e2330] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#88909e] font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3 w-3 text-[#dfbe7d] flex-shrink-0" />
                  <span className="truncate">
                    Destination: {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.pincode}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[#88909e]">
                    Carrier: <strong className="text-white">{order.carrier || 'BlueDart Air'}</strong>
                  </span>
                  <span>•</span>
                  <span>AWB #{order.trackingNumber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
