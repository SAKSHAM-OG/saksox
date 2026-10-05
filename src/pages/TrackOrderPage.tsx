import React, { useState, useEffect } from 'react';
import { Search, Truck, CheckCircle2, Clock, Package, MapPin, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

interface TrackOrderPageProps {
  initialOrderId?: string;
  onNavigateToDetail: (slug: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderId = '',
  onNavigateToDetail
}) => {
  const { getOrderById, orders } = useShop();

  const [orderQuery, setOrderQuery] = useState(initialOrderId || (orders[0]?.id ?? 'SX-2026-94812'));
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return getOrderById(orderQuery) || orders[0] || null;
  });
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderQuery(initialOrderId);
      const found = getOrderById(initialOrderId);
      if (found) {
        setSearchedOrder(found);
        setSearchError(null);
      } else {
        setSearchError(`No order found matching "${initialOrderId}". Try demo order "SX-2026-94812".`);
      }
    }
  }, [initialOrderId, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const found = getOrderById(orderQuery);
    if (found) {
      setSearchedOrder(found);
      setSearchError(null);
    } else {
      setSearchError(`No order found matching "${orderQuery}". Try demo order "SX-2026-94812".`);
    }
  };

  const steps = [
    { label: 'Order Confirmed', time: '24 Feb, 10:15 AM', done: true },
    { label: 'Quality Checked & Packed', time: '24 Feb, 02:40 PM', done: true },
    { label: 'Dispatched from Delhi Hub', time: '24 Feb, 07:30 PM', done: true },
    { label: 'In Transit via BlueDart Air', time: '25 Feb, 04:10 AM', done: true },
    { label: 'Out for Doorstep Delivery', time: 'Pending', done: false },
    { label: 'Delivered', time: 'Expected Tomorrow', done: false }
  ];

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5f3ef] pb-28">
      {/* Header */}
      <div className="bg-[#101218] border-b border-[#212632] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
            LOGISTICS RADAR
          </span>
          <h1 className="text-3xl font-serif text-white tracking-wide uppercase mt-1">
            Track Your Shipment
          </h1>
          <p className="text-xs text-[#88909e] max-w-md mx-auto mt-2">
            Real-time status updates from our central fulfillment center in Delhi to your doorstep.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mt-6 flex gap-2">
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (e.g. SX-2026-94812)"
              className="flex-1 bg-[#161822] border border-[#272d3b] px-3.5 py-2.5 text-xs text-white uppercase placeholder:normal-case placeholder:text-[#525764] focus:outline-none focus:border-[#c9a96e]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Search className="h-4 w-4" />
              <span>Track</span>
            </button>
          </form>
          {searchError && <p className="text-xs text-[#e11d48] mt-2">{searchError}</p>}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {searchedOrder && (
          <div className="bg-[#111319] border border-[#212632] p-6 sm:p-8 space-y-8">
            {/* Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#212632] gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#88909e] uppercase">Order Number</span>
                <h3 className="text-xl font-mono font-bold text-white mt-0.5">{searchedOrder.id}</h3>
                <p className="text-xs text-[#88909e] mt-1">
                  Air Waybill: <span className="text-[#dfbe7d] font-mono">{searchedOrder.trackingNumber}</span>
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-mono text-[#88909e] uppercase">Current Status</span>
                <div className="inline-flex items-center gap-2 mt-0.5 px-3 py-1 bg-[#17221b] border border-[#22c55e]/30 text-[#22c55e] text-xs font-mono font-bold uppercase">
                  <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-ping" />
                  <span>{searchedOrder.orderStatus}</span>
                </div>
                <p className="text-xs text-white font-medium mt-1">
                  Estimated: {searchedOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Visual Tracking Stepper */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dfbe7d] mb-6">
                Shipment Progression
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#252a38]">
                {steps.map((st, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        st.done
                          ? 'bg-[#dfbe7d] border-[#dfbe7d] text-[#0a0b0d]'
                          : 'bg-[#12141a] border-[#292f3d] text-[#6d7483]'
                      }`}
                    >
                      {st.done && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${st.done ? 'text-white' : 'text-[#6d7483]'}`}>
                        {st.label}
                      </h5>
                      <span className="text-[11px] font-mono text-[#88909e]">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="pt-6 border-t border-[#212632] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#151720] border border-[#232733]">
                <span className="text-[10px] font-mono text-[#dfbe7d] uppercase block mb-1">
                  Destination Address
                </span>
                <p className="font-semibold text-white">{searchedOrder.shippingAddress.name}</p>
                <p className="text-[#88909e]">{searchedOrder.shippingAddress.addressLine}</p>
                <p className="text-[#88909e]">
                  {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} — {searchedOrder.shippingAddress.pincode}
                </p>
              </div>

              <div className="p-4 bg-[#151720] border border-[#232733]">
                <span className="text-[10px] font-mono text-[#dfbe7d] uppercase block mb-1">
                  Courier Information
                </span>
                <p className="font-semibold text-white">BlueDart Express Air / Delhivery</p>
                <p className="text-[#88909e]">Priority Cold-Supply Transport Chain</p>
                <p className="text-[#88909e] mt-1">Helpline: +91 1800 200 4880</p>
              </div>
            </div>

            {/* Package Contents */}
            <div className="pt-6 border-t border-[#212632]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#dfbe7d] block mb-3">
                Items In This Shipment
              </span>
              <div className="space-y-2">
                {searchedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigateToDetail(item.product.slug)}
                    className="flex items-center gap-3 bg-[#151720] p-2.5 border border-[#232733] cursor-pointer hover:border-[#383f52] transition-colors"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-12 w-10 object-cover bg-[#0d0e12]"
                    />
                    <div className="flex-1 truncate">
                      <h5 className="font-medium text-white text-xs truncate">{item.product.name}</h5>
                      <span className="text-[11px] text-[#88909e]">
                        Qty: {item.quantity} • Size: {item.selectedSize}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
