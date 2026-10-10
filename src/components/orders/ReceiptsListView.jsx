import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Receipt,
  Search,
  Printer,
  Calendar,
  Building,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { PaymentReceiptModal } from './PaymentReceiptModal';

export const ReceiptsListView = () => {
  const { receipts, activeReceiptModal, setActiveReceiptModal } = useERP();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReceipts = receipts.filter(r =>
    r.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-indigo-600" />
            Official Payment Receipts & Vouchers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse, print, and audit all order advance and settlement receipts issued to buyers.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search receipt #, order ID, or buyer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReceipts.map(rc => (
          <div
            key={rc.receiptNo}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {rc.receiptNo}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  {rc.type}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {rc.clientName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Order Reference: <strong className="font-mono text-slate-700">{rc.orderId}</strong>
                </p>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Received:</span>
                  <span className="font-mono font-black text-slate-900 text-sm">
                    ৳{rc.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="font-semibold text-slate-700">{rc.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remaining Due:</span>
                  <span className={`font-mono font-bold ${rc.remainingDue === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    ৳{rc.remainingDue.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 truncate">
                Date: {rc.date} &bull; Ref: {rc.bankRef}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">By: {rc.receivedBy.split(' ')[0]}</span>
              <button
                onClick={() => setActiveReceiptModal(rc)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                View & Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeReceiptModal && (
        <PaymentReceiptModal
          receipt={activeReceiptModal}
          onClose={() => setActiveReceiptModal(null)}
        />
      )}
    </div>
  );
};
