import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Truck,
  Search,
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTrack: (orderId: string) => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTrack
}) => {
  const { orders } = useShop();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = orderIdInput.trim().toUpperCase();

    if (!cleanId) {
      setError('Please enter a valid Order ID or tracking number.');
      return;
    }

    setError('');
    onClose();
    onNavigateToTrack(cleanId);
  };

  const handleSelectQuickOrder = (id: string) => {
    setOrderIdInput(id);
    setError('');
    onClose();
    onNavigateToTrack(id);
  };

  // Recent order candidates
  const recentOrders = orders.slice(0, 3);
  const sampleOrderId = 'SX-2026-94812';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-[#0e1015] border border-[#232733] shadow-2xl p-6 sm:p-7 text-[#f5f3ef] my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#88909e] hover:text-white p-2 cursor-pointer transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5 pointer-events-none" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-full bg-[#dfbe7d]/15 border border-[#dfbe7d]/35 flex items-center justify-center text-[#dfbe7d] flex-shrink-0">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase block">
              Logistics Radar
            </span>
            <h2 className="text-xl font-serif font-bold text-white tracking-wide uppercase">
              Track My Order
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#88909e] leading-relaxed mb-6 font-mono">
          Enter your Order ID (e.g. <strong className="text-white">SX-2026-94812</strong>) or courier AWB number to inspect live fulfillment milestones and expected delivery.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#a0a7b7] mb-1.5 font-semibold">
              Order ID / Tracking Number
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#606778]" />
              <input
                ref={inputRef}
                type="text"
                value={orderIdInput}
                onChange={(e) => {
                  setOrderIdInput(e.target.value.toUpperCase());
                  if (error) setError('');
                }}
                placeholder="e.g. SX-2026-94812"
                className="w-full bg-[#14161f] border border-[#262c3b] pl-10 pr-10 py-3 text-xs text-white placeholder-[#505766] focus:outline-none focus:border-[#dfbe7d] font-mono tracking-wider transition-colors uppercase"
              />
              {orderIdInput && (
                <button
                  type="button"
                  onClick={() => setOrderIdInput('')}
                  className="absolute right-3 top-3 text-[#666e80] hover:text-white p-1 cursor-pointer"
                  aria-label="Clear input"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 mt-2 font-mono">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-lg shadow-[#dfbe7d]/15"
          >
            <span>Track Shipment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Recent Orders / Sample ID */}
        <div className="mt-6 pt-5 border-t border-[#1f2431]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#88909e] block mb-2.5">
            {recentOrders.length > 0 ? 'Your Recent Orders' : 'Sample Order for Testing'}
          </span>

          <div className="space-y-2">
            {recentOrders.length > 0 ? (
              recentOrders.map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => handleSelectQuickOrder(ord.id)}
                  className="w-full flex items-center justify-between p-2.5 bg-[#131620] hover:bg-[#1b1f2d] border border-[#232938] hover:border-[#dfbe7d]/50 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="h-4 w-4 text-[#dfbe7d]" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-[#dfbe7d] transition-colors">
                        {ord.id}
                      </div>
                      <div className="text-[10px] font-mono text-[#88909e]">
                        {ord.items.length} item{ord.items.length > 1 ? 's' : ''} • ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#1b1f2a] border border-white/10 text-[#dfbe7d]">
                      {ord.orderStatus}
                    </span>
                    <ArrowRight className="h-3 w-3 text-[#555d70] group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => handleSelectQuickOrder(sampleOrderId)}
                className="w-full flex items-center justify-between p-2.5 bg-[#131620] hover:bg-[#1b1f2d] border border-[#232938] hover:border-[#dfbe7d]/50 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 text-[#dfbe7d]" />
                  <div>
                    <div className="text-xs font-mono font-bold text-white group-hover:text-[#dfbe7d] transition-colors">
                      {sampleOrderId}
                    </div>
                    <div className="text-[10px] font-mono text-[#88909e]">
                      Demo Shipment • In Transit via BlueDart Air
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#1b1f2a] border border-white/10 text-[#dfbe7d]">
                    Dispatched
                  </span>
                  <ArrowRight className="h-3 w-3 text-[#555d70] group-hover:text-white transition-colors" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
