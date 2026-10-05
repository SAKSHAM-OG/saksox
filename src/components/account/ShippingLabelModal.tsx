import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  QrCode,
  FileText,
  AlertCircle
} from 'lucide-react';
import { ReturnRequest } from '../../types';

interface ShippingLabelModalProps {
  returnRequest: ReturnRequest | null;
  onClose: () => void;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  returnRequest,
  onClose
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!returnRequest) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Simulate high-res PDF generation & download
    const blob = new Blob(
      [
        `SAKSOX ATELIER PRE-PAID RETURN SHIPPING LABEL\n` +
        `RMA Number: ${returnRequest.id}\n` +
        `Carrier: ${returnRequest.carrier}\n` +
        `Tracking AWB: ${returnRequest.returnTrackingNumber}\n` +
        `Date Issued: ${returnRequest.dateRequested}\n` +
        `Customer: ${returnRequest.pickupAddress.name}\n` +
        `Address: ${returnRequest.pickupAddress.addressLine}, ${returnRequest.pickupAddress.city}, ${returnRequest.pickupAddress.pincode}\n` +
        `Destination: SAKSOX ATELIER RETURNS HUB, Okhla Phase III, New Delhi 110020\n` +
        `Total Items: ${returnRequest.items.reduce((s, i) => s + i.quantity, 0)}\n` +
        `Estimated Resolution: ${returnRequest.estimatedResolutionDate}\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SAKSOX_Return_Label_${returnRequest.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3500);
  };

  const totalItemsCount = returnRequest.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0f1118] border border-[#262c3b] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Modal Top Control Bar (Screen Only) */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#141722] border-b border-[#242a3a] print:hidden">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-[#dfbe7d]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Return Shipping Label • {returnRequest.id}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#1c202d] hover:bg-[#282f42] border border-[#2d3547] text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Shipping Label"
            >
              <Printer className="h-3.5 w-3.5 text-[#dfbe7d]" />
              <span className="hidden sm:inline">Print Label</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download PDF Label"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#88909e] hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close shipping label modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Label Sheet */}
        <div className="p-4 sm:p-7 overflow-y-auto bg-[#0a0b0f] text-black">
          {/* Real Shipping Label Container (Designed to look like real courier labels with crisp white background) */}
          <div className="bg-white text-black p-6 sm:p-8 rounded-sm shadow-xl font-sans border-2 border-black max-w-xl mx-auto selection:bg-gray-200">
            {/* Header: Carrier & Priority Banner */}
            <div className="border-b-2 border-black pb-4 mb-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-2xl font-black tracking-tight font-serif text-black uppercase">
                    SAKSOX
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-gray-700">
                    Atelier Return Dispatch
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider">
                    PRIORITY RETURN
                  </div>
                  <div className="text-[9px] font-mono font-bold text-gray-800 mt-1 uppercase">
                    Postage Pre-Paid • No Stamp Required
                  </div>
                </div>
              </div>

              {/* Carrier & RMA Bar */}
              <div className="mt-3 pt-2.5 border-t border-dashed border-gray-400 flex flex-wrap justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-gray-600 uppercase text-[10px]">Carrier: </span>
                  <strong className="text-black font-bold uppercase">{returnRequest.carrier}</strong>
                </div>
                <div>
                  <span className="text-gray-600 uppercase text-[10px]">Service: </span>
                  <strong className="text-black font-bold">24-48 HR ATELIER EXPRESS</strong>
                </div>
              </div>
            </div>

            {/* Address Grid: Shipper (From) vs Consignee (To) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 border-black pb-4 mb-4 text-xs">
              {/* FROM (Customer) */}
              <div className="border-r-0 sm:border-r border-gray-300 pr-0 sm:pr-3">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-500 mb-1">
                  SHIP FROM (SENDER):
                </div>
                <div className="font-bold text-sm text-black">{returnRequest.pickupAddress.name}</div>
                <div className="text-gray-700 leading-tight mt-0.5">
                  {returnRequest.pickupAddress.addressLine}
                </div>
                {returnRequest.pickupAddress.landmark && (
                  <div className="text-gray-500 text-[11px] leading-tight">
                    Near: {returnRequest.pickupAddress.landmark}
                  </div>
                )}
                <div className="font-bold text-black mt-0.5">
                  {returnRequest.pickupAddress.city}, {returnRequest.pickupAddress.state} — {returnRequest.pickupAddress.pincode}
                </div>
                <div className="text-gray-700 mt-1 font-mono text-[11px]">
                  Phone: {returnRequest.pickupAddress.phone}
                </div>
              </div>

              {/* TO (Atelier Warehouse) */}
              <div className="pl-0 sm:pl-1">
                <div className="text-[9px] font-black uppercase tracking-wider text-gray-500 mb-1">
                  SHIP TO (CONSIGNEE):
                </div>
                <div className="font-bold text-sm text-black">SAKSOX ATELIER HUB</div>
                <div className="text-[11px] font-bold text-gray-800">
                  Returns & Quality Inspection Unit 3B
                </div>
                <div className="text-gray-700 leading-tight mt-0.5">
                  Plot 48, Okhla Industrial Area Phase-III
                </div>
                <div className="font-bold text-black mt-0.5">
                  New Delhi, Delhi — 110020, India
                </div>
                <div className="text-gray-700 mt-1 font-mono text-[11px]">
                  Toll-Free: 1800-SAKSOX-CARE
                </div>
              </div>
            </div>

            {/* Simulated Vector Barcode & Tracking Number */}
            <div className="border-b-2 border-black pb-4 mb-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                RETURN WAYBILL / AIRWAY BILL (AWB)
              </div>

              {/* Realistic SVG Barcode Graphic */}
              <div className="flex justify-center items-center py-2 px-4 bg-gray-50 border border-gray-300">
                <svg
                  className="w-full max-w-sm h-14"
                  viewBox="0 0 320 60"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Alternating realistic bar codes */}
                  {[
                    2, 5, 1, 3, 2, 4, 1, 6, 2, 3, 1, 4, 2, 5, 3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 2, 3,
                    1, 5, 2, 4, 3, 1, 2, 5, 1, 4, 2, 3, 1, 6, 2, 1, 4, 3, 2, 5, 1, 3, 4, 2, 1, 5,
                    2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 5, 3, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5
                  ].map((w, idx) => {
                    const xPos = idx * 4.1;
                    return (
                      <rect
                        key={idx}
                        x={xPos}
                        y="0"
                        width={w * 0.65}
                        height="54"
                        fill={idx % 2 === 0 ? '#000000' : 'transparent'}
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="font-mono text-base font-black tracking-widest text-black mt-1.5 uppercase">
                {returnRequest.returnTrackingNumber}
              </div>
              <div className="text-[10px] font-mono text-gray-600">
                RMA Authorization: <strong>{returnRequest.id}</strong> • Order Ref: <strong>{returnRequest.orderId}</strong>
              </div>
            </div>

            {/* Package Contents & Inspection Spec */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b-2 border-black pb-3 mb-4 text-center font-mono text-xs">
              <div className="bg-gray-100 p-2 border border-gray-300">
                <div className="text-[9px] uppercase text-gray-500 font-bold">PIECES</div>
                <div className="font-bold text-black text-sm">{totalItemsCount} ITEM(S)</div>
              </div>
              <div className="bg-gray-100 p-2 border border-gray-300">
                <div className="text-[9px] uppercase text-gray-500 font-bold">WEIGHT</div>
                <div className="font-bold text-black text-sm">{(totalItemsCount * 0.65).toFixed(2)} KG</div>
              </div>
              <div className="bg-gray-100 p-2 border border-gray-300">
                <div className="text-[9px] uppercase text-gray-500 font-bold">TYPE</div>
                <div className="font-bold text-black text-sm uppercase">{returnRequest.type}</div>
              </div>
              <div className="bg-gray-100 p-2 border border-gray-300">
                <div className="text-[9px] uppercase text-gray-500 font-bold">VALUATION</div>
                <div className="font-bold text-black text-sm">₹{returnRequest.totalRefundAmount.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Items Included in Return Summary */}
            <div className="mb-4">
              <div className="text-[9px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
                RETURN CONTENTS SUMMARY:
              </div>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-sm">
                {returnRequest.items.map((item, idx) => (
                  <div key={idx} className="p-2 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-black">{item.product.name}</div>
                      <div className="text-[10px] text-gray-600 font-mono">
                        {item.selectedSize ? `Size: ${item.selectedSize}` : ''}{' '}
                        {item.selectedColor ? `• Color: ${item.selectedColor}` : ''} • Qty: {item.quantity}
                      </div>
                      <div className="text-[10px] text-gray-500 italic mt-0.5">
                        Reason: {item.reason}
                        {item.exchangeSize && ` → Exchange for Size ${item.exchangeSize}`}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-black text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cut-Along-Line & Instructions */}
            <div className="pt-3 border-t-2 border-dashed border-gray-400 text-[10px] text-gray-600 flex items-start gap-3">
              <div className="flex-shrink-0 text-xl font-bold">✂</div>
              <div className="space-y-0.5 leading-snug">
                <div className="font-bold text-black uppercase">
                  Instructions for Sender:
                </div>
                <div>1. Securely tape this return label flat onto the largest surface of the package.</div>
                <div>2. Cover or remove any old shipping barcodes or addresses.</div>
                <div>3. Hand to the assigned BlueDart courier during your scheduled doorstep pickup.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3.5 bg-[#141722] border-t border-[#242a3a] flex flex-wrap justify-between items-center gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-[#88909e] font-mono">
            <ShieldCheck className="h-4 w-4 text-[#dfbe7d]" />
            <span>Complimentary insured shipping under SAKSOX Atelier Guarantee</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1b1f2c] hover:bg-[#252b3d] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#dfbe7d] hover:bg-[#c9a96e] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Label</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
