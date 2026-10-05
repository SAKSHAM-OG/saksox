import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, Share2 } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigateToShop: () => void;
  onNavigateToTrack: (orderId: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onNavigateToShop,
  onNavigateToTrack
}) => {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f5f3ef] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[#111319] border border-[#232733] p-6 sm:p-10 shadow-2xl">
        {/* Success Header */}
        <div className="text-center pb-8 border-b border-[#212632]">
          <div className="h-16 w-16 bg-[#22c55e]/10 border border-[#22c55e]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#22c55e]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#dfbe7d] uppercase">
            TRANSACTION VERIFIED
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-wide uppercase mt-1">
            Order Confirmed
          </h1>
          <p className="text-xs text-[#88909e] mt-1.5">
            Thank you for ordering with SAKSOX. Your pieces are being inspected and packed at our Central Delhi Hub.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 p-2.5 bg-[#171923] border border-[#262c3b] text-xs font-mono">
            <span className="text-[#88909e]">ORDER ID:</span>
            <span className="text-[#dfbe7d] font-bold">{order.id}</span>
          </div>
        </div>

        {/* Order Logistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-[#212632] text-xs">
          <div>
            <span className="text-[#6d7483] block uppercase font-mono text-[10px]">
              Estimated Delivery
            </span>
            <span className="font-semibold text-white mt-0.5 block">
              {order.estimatedDelivery}
            </span>
          </div>

          <div>
            <span className="text-[#6d7483] block uppercase font-mono text-[10px]">
              Carrier & Air Waybill
            </span>
            <span className="font-semibold text-white mt-0.5 block truncate">
              {order.carrier || 'Delhivery Express Air'}
            </span>
            <span className="text-[10px] text-[#dfbe7d] font-mono">{order.trackingNumber}</span>
          </div>

          <div>
            <span className="text-[#6d7483] block uppercase font-mono text-[10px]">
              Payment Method
            </span>
            <span className="font-semibold text-white mt-0.5 block">
              {order.paymentMethod}
            </span>
            <span className="text-[10px] text-[#22c55e] font-mono">{order.paymentStatus}</span>
          </div>
        </div>

        {/* Shipping Address Summary */}
        <div className="py-6 border-b border-[#212632] text-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7d] block mb-1">
            Delivery Address
          </span>
          <p className="font-semibold text-white">{order.shippingAddress.name}</p>
          <p className="text-[#88909e]">{order.shippingAddress.addressLine}</p>
          {order.shippingAddress.landmark && (
            <p className="text-[#88909e]">Landmark: {order.shippingAddress.landmark}</p>
          )}
          <p className="text-[#88909e]">
            {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
          </p>
          <p className="text-[#88909e] mt-1">Phone: {order.shippingAddress.phone}</p>
        </div>

        {/* Item List */}
        <div className="py-6 border-b border-[#212632]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7d] block mb-3">
            Package Contents ({order.items.length} Items)
          </span>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-14 w-12 object-cover bg-[#0d0e12]"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{item.product.name}</h4>
                  <p className="text-[#88909e] text-[11px]">
                    Size: {item.selectedSize} {item.selectedColor ? `• ${item.selectedColor}` : ''} • Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-mono text-white">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1d212b] space-y-1.5 text-xs text-[#88909e]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#22c55e]">
                <span>Discount Applied</span>
                <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-white">
                {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1d212b]">
              <span>Total Paid</span>
              <span className="text-[#dfbe7d]">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigateToTrack(order.id)}
            className="flex-1 py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Truck className="h-4 w-4" />
            <span>Track Live Shipment</span>
          </button>
          <button
            onClick={onNavigateToShop}
            className="px-6 py-3 bg-[#171a24] hover:bg-[#232734] border border-[#272d3b] text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
