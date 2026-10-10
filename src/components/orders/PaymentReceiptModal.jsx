import React from 'react';
import {
  Printer,
  X,
  CheckCircle,
  Scissors,
  Download,
  Building,
  Calendar,
  FileCheck
} from 'lucide-react';

export const PaymentReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 relative animate-in fade-in zoom-in-95 print:p-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Payment Receipt Generated
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Printer className="w-4 h-4" />
              Print Receipt / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT TEMPLATE */}
        <div className="mt-4 print:mt-0 p-6 rounded-2xl bg-white border border-slate-200 print:border-none">
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Scissors className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  RGM APPAREL GROUP LTD.
                </h2>
                <p className="text-[11px] text-slate-500">
                  Export Garment Manufacturers & Sourcing &bull; ISO 9001:2015
                </p>
                <p className="text-[10px] text-slate-400">
                  Plot 14-18, Export Processing Zone (EPZ), Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-mono font-bold rounded uppercase tracking-wider">
                Official Receipt
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-2">
                No: {receipt.receiptNo}
              </p>
              <p className="text-[11px] text-slate-500">
                Date: {receipt.date}
              </p>
            </div>
          </div>

          {/* Receipt Details Grid */}
          <div className="grid grid-cols-2 gap-6 my-6 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Received From (Buyer):
              </span>
              <p className="text-sm font-bold text-slate-900">{receipt.clientName}</p>
              <p className="text-slate-500">Order Reference: <strong className="font-mono text-indigo-600">{receipt.orderId}</strong></p>
              <p className="text-slate-500">Payment Category: <strong className="text-slate-800">{receipt.type}</strong></p>
            </div>

            <div className="space-y-1 text-right sm:text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Payment Channel & Reference:
              </span>
              <p className="text-sm font-semibold text-slate-800">{receipt.paymentMethod}</p>
              <p className="text-slate-500 font-mono">Txn / Bank Ref: {receipt.bankRef || 'SWIFT-TT-VERIFIED'}</p>
              <p className="text-slate-500">Issued by: {receipt.receivedBy || 'Accounts & Finance Desk'}</p>
            </div>
          </div>

          {/* Amount Paid Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200">
              <span>Description / Purpose</span>
              <span>Amount Paid</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {receipt.type} for Garment Production Order {receipt.orderId}
                </p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  {receipt.notes || 'Full advance / settlement received towards fabric sourcing & floor line allocation.'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900 font-mono">
                  ৳{(receipt.amount || 0).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block font-semibold">TK</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs font-semibold">
              <span className="text-slate-600">Remaining Balance Due:</span>
              <span className={`font-mono text-sm ${receipt.remainingDue === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                ৳{(receipt.remainingDue || 0).toLocaleString()} TK
              </span>
            </div>
          </div>

          {/* Signatures & Watermark */}
          <div className="flex items-end justify-between mt-12 pt-4 border-t border-dashed border-slate-300 text-xs">
            <div>
              <div className="w-28 border-b border-slate-400 mb-1"></div>
              <p className="text-[11px] text-slate-500">Authorized Officer</p>
              <p className="text-[10px] text-slate-400">Chief Accounts Dept.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-200 text-indigo-700 font-bold text-[9px] flex items-center justify-center text-center p-1 uppercase rotate-12 mx-auto">
                RGM SEAL VERIFIED
              </div>
            </div>

            <div className="text-right">
              <div className="w-28 border-b border-slate-400 mb-1 ml-auto"></div>
              <p className="text-[11px] text-slate-500">Client / Rep Signature</p>
              <p className="text-[10px] text-slate-400">Acknowledgment</p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-center text-slate-400 mt-6">
            This is a computer-generated official receipt issued by RGM Apparel ERP. Valid without manual stamp when verified online.
          </p>
        </div>
      </div>
    </div>
  );
};
