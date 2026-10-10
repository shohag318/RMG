import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  History,
  Search,
  Filter,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Receipt,
  Download,
  Building
} from 'lucide-react';
import { PaymentReceiptModal } from './PaymentReceiptModal';

export const PaymentHistory = () => {
  const { payments, orders, activeReceiptModal, setActiveReceiptModal, stats } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredPayments = payments.filter(p => {
    const matchesSearch =
      p.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.bankRef && p.bankRef.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'All' || p.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-indigo-600" />
            Payment History & Financial Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete transaction ledger of buyer order advances, milestone tranches, settlements, and bank verifications.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 self-start md:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All Transactions Cleared with Bank Ref</span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Realized Inflow</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            ৳{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Cleared in company bank accounts</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Pending Due Receivables</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            ৳{stats.totalOutstandingDue.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Against active production runs</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Logged Transactions</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{payments.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Wire, LC & Corporate Cheques</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Average Inflow / Txn</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ৳{Math.round(payments.reduce((sum, p) => sum + p.amount, 0) / (payments.length || 1)).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Per contractual voucher</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Txn ID, Order ID, Buyer, or Bank Ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Payment Types</option>
            <option value="Advance">Advance Payments</option>
            <option value="Settlement">Final Settlements</option>
            <option value="LC">Letter of Credit (LC)</option>
          </select>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Order ID & Buyer</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Payment Category</th>
                <th className="py-3 px-4">Method & Bank Reference</th>
                <th className="py-3 px-4">Amount Paid (TK)</th>
                <th className="py-3 px-4">Remaining Due (TK)</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Receipt Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No payment transaction records match your criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map(pay => (
                  <tr key={pay.txnId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {pay.txnId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{pay.clientName}</p>
                      <p className="text-[11px] font-mono text-indigo-600 font-semibold">{pay.orderId}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {pay.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {pay.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{pay.paymentMethod}</p>
                      <p className="text-[10px] font-mono text-slate-400">{pay.bankRef}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-emerald-600 text-sm">
                      +৳{pay.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      <span className={pay.remainingDue === 0 ? 'text-slate-400' : 'text-amber-600'}>
                        ৳{pay.remainingDue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        {pay.status || 'Cleared'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveReceiptModal({
                            receiptNo: pay.receiptNo,
                            orderId: pay.orderId,
                            clientName: pay.clientName,
                            date: pay.date,
                            type: pay.type,
                            amount: pay.amount,
                            paymentMethod: pay.paymentMethod,
                            bankRef: pay.bankRef,
                            receivedBy: pay.receivedBy,
                            remainingDue: pay.remainingDue,
                            notes: pay.notes
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        View / Print
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
