import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { Order } from '../../types';

interface OrderInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const invoiceNumber = `INV-SX-2026-${order.id.replace(/[^0-9]/g, '') || '94812'}`;
  const gstInclusiveTax = Math.round((order.totalAmount * 18) / 118); // 18% GST component (inclusive)

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadFile = () => {
    const printableElement = document.getElementById('printable-order-invoice');
    if (!printableElement) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoiceNumber} - SAKSOX</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #111;
      background: #fff;
      margin: 0;
      padding: 40px;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e5e7eb;
      padding: 32px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #111;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .logo {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin: 0;
    }
    .tagline {
      font-size: 10px;
      letter-spacing: 2px;
      color: #666;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .meta {
      text-align: right;
      font-size: 12px;
      color: #444;
      line-height: 1.5;
    }
    .meta strong {
      color: #000;
    }
    .parties {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: 12px;
      line-height: 1.6;
    }
    .party-col {
      width: 48%;
    }
    .section-title {
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 12px;
    }
    th {
      background: #f9fafb;
      border-bottom: 1px solid #d1d5db;
      padding: 10px 12px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #4b5563;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    .text-right {
      text-align: right;
    }
    .summary-box {
      margin-left: auto;
      width: 320px;
      font-size: 12px;
      line-height: 2;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
    }
    .total-row {
      border-top: 2px solid #111;
      padding-top: 8px;
      margin-top: 8px;
      font-size: 15px;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #6b7280;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="invoice-card">
    ${printableElement.innerHTML}
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SAKSOX-Tax-Invoice-${order.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity no-print"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#111318] border border-[#262c3b] shadow-2xl flex flex-col text-[#f5f3ef] my-auto max-h-[92vh]">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-[#212632] bg-[#0c0d12] no-print">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#dfbe7d]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Official Tax Invoice Summary
            </span>
            <span className="text-[11px] text-[#88909e] hidden sm:inline font-mono">
              • {order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#dfbe7d] hover:bg-[#ebd29c] text-[#0a0b0d] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 bg-[#1a1e28] hover:bg-[#252c3c] text-white border border-[#2d3546] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 hidden sm:flex"
            >
              <Download className="h-3.5 w-3.5 text-[#dfbe7d]" />
              <span>Download File</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#88909e] hover:text-white transition-colors ml-1"
              aria-label="Close invoice modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-[#0a0b0e]">
          {/* Printable Invoice Container */}
          <div
            id="printable-order-invoice"
            className="bg-[#ffffff] text-[#111111] p-6 sm:p-10 shadow-xl border border-[#e5e7eb] font-sans mx-auto max-w-3xl"
          >
            {/* Header: Brand & Invoice Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-[#111111] gap-4">
              <div>
                <h1 className="font-serif text-3xl font-extrabold tracking-[0.25em] text-[#0a0b0d] uppercase m-0 leading-none">
                  SAKSOX
                </h1>
                <p className="text-[9px] font-mono tracking-[0.3em] text-[#6b7280] uppercase mt-1">
                  HAUTE WINTER FASHION & SIGNATURE PERFUMERY
                </p>
                <div className="mt-3 text-[11px] text-[#4b5563] leading-relaxed">
                  <p className="font-semibold text-[#111827]">SAKSOX India Private Limited</p>
                  <p>Plot 42, Atelier Logistics Compound, Okhla Phase III</p>
                  <p>New Delhi, Delhi 110020, India</p>
                  <p>GSTIN: <strong className="text-[#111827]">07AAECS1492K1Z9</strong> | CIN: U18101DL2026PTC394812</p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-[#374151] leading-relaxed">
                <div className="inline-block bg-[#f3f4f6] border border-[#e5e7eb] px-2.5 py-1 text-[11px] font-mono font-bold text-[#111827] uppercase tracking-wider mb-2">
                  TAX INVOICE
                </div>
                <p><span className="text-[#6b7280]">Invoice No:</span> <strong className="font-mono text-[#111827]">{invoiceNumber}</strong></p>
                <p><span className="text-[#6b7280]">Order ID:</span> <strong className="font-mono text-[#111827]">{order.id}</strong></p>
                <p><span className="text-[#6b7280]">Invoice Date:</span> <strong className="text-[#111827]">{order.date}</strong></p>
                <p><span className="text-[#6b7280]">Order Status:</span> <strong className="text-[#059669] font-mono">{order.orderStatus}</strong></p>
              </div>
            </div>

            {/* Billed To & Logistics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#e5e7eb] text-xs">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#6b7280] uppercase block mb-1.5">
                  BILLED & DELIVERED TO:
                </span>
                <p className="text-sm font-bold text-[#111827]">{order.shippingAddress.name}</p>
                <p className="text-[#374151] mt-0.5">{order.shippingAddress.addressLine}</p>
                {order.shippingAddress.landmark && (
                  <p className="text-[#6b7280]">Landmark: {order.shippingAddress.landmark}</p>
                )}
                <p className="text-[#374151]">
                  {order.shippingAddress.city}, {order.shippingAddress.state} — <strong className="font-mono">{order.shippingAddress.pincode}</strong>
                </p>
                <p className="text-[#374151] mt-1">Phone: <strong className="font-mono">{order.shippingAddress.phone}</strong></p>
              </div>

              <div className="sm:text-right text-xs text-[#374151] space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#6b7280] uppercase block mb-1.5 sm:text-right">
                  PAYMENT & LOGISTICS:
                </span>
                <p><span className="text-[#6b7280]">Payment Method:</span> <strong className="text-[#111827]">{order.paymentMethod}</strong></p>
                <p><span className="text-[#6b7280]">Payment Status:</span> <strong className="text-[#059669]">{order.paymentStatus}</strong></p>
                <p><span className="text-[#6b7280]">Carrier:</span> <strong className="text-[#111827]">{order.carrier || 'Delhivery Express Air'}</strong></p>
                <p><span className="text-[#6b7280]">AWB Consignment:</span> <strong className="font-mono text-[#111827]">{order.trackingNumber}</strong></p>
                <p><span className="text-[#6b7280]">Delivery Timeline:</span> <strong className="text-[#111827]">{order.estimatedDelivery}</strong></p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="py-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#6b7280] uppercase block mb-3">
                ORDER ITEMS ({order.items.length})
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-[#111827] bg-[#f9fafb] text-[10px] font-mono uppercase text-[#374151]">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Description of Goods</th>
                      <th className="py-2.5 px-3 text-center">HSN</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-right">Net Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb]">
                    {order.items.map((item, index) => {
                      const hsn = item.product.category === 'fragrances' ? '3303' : item.product.category === 'accessories' ? '6505' : '6201';
                      const lineTotal = item.product.price * item.quantity;
                      return (
                        <tr key={item.id} className="text-xs">
                          <td className="py-3 px-3 font-mono text-[#6b7280]">{index + 1}</td>
                          <td className="py-3 px-3">
                            <p className="font-bold text-[#111827]">{item.product.name}</p>
                            <p className="text-[11px] text-[#6b7280]">
                              Category: {item.product.subcategory} | Size: {item.selectedSize} {item.selectedColor ? `| Color: ${item.selectedColor}` : ''}
                            </p>
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-[#6b7280]">{hsn}</td>
                          <td className="py-3 px-3 text-center font-bold text-[#111827]">{item.quantity}</td>
                          <td className="py-3 px-3 text-right font-mono text-[#374151]">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-[#111827]">
                            ₹{lineTotal.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Total Summary */}
            <div className="flex flex-col sm:flex-row justify-between pt-2 pb-6 border-b border-[#e5e7eb] gap-6 text-xs">
              <div className="max-w-xs text-[11px] text-[#6b7280] space-y-1.5">
                <p className="font-bold text-[#111827] uppercase tracking-wider text-[10px] font-mono">
                  TAX INFORMATION & NOTES:
                </p>
                <p>• All prices include GST (Integrated Goods and Services Tax).</p>
                <p>• Reverse Charge: No (Forward Charge Mechanism).</p>
                <p>• 7-Day Doorstep Replacement Guarantee on authentic packaging.</p>
              </div>

              <div className="w-full sm:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-[#4b5563]">
                  <span>Item Subtotal:</span>
                  <span className="font-mono text-[#111827]">₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-[#059669]">
                    <span>Discount ({order.couponCode || 'PROMO'}):</span>
                    <span className="font-mono">-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#4b5563]">
                  <span>GST Component (18% Incl.):</span>
                  <span className="font-mono text-[#111827]">₹{gstInclusiveTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#4b5563]">
                  <span>Express Delivery:</span>
                  <span className="font-mono text-[#111827]">
                    {order.shippingFee === 0 ? <span className="text-[#059669] font-bold">FREE</span> : `₹${order.shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#111827] pt-2 border-t-2 border-[#111827]">
                  <span>Grand Total:</span>
                  <span className="font-mono text-lg">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Digital Seal & Signatory Footer */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#6b7280] gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#059669]" />
                <div>
                  <p className="font-bold text-[#111827]">100% Verified Authentic SAKSOX Direct</p>
                  <p className="text-[10px]">Computer generated digital tax document. No physical stamp required.</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="inline-block border border-[#d1d5db] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#111827]">
                  CERTIFIED DIGITAL SIGNATURE
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-0.5">Authorised Signatory for SAKSOX India Pvt Ltd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
