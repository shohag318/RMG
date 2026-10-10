import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Building2,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  Trash2,
  TrendingDown
} from 'lucide-react';

export const OfficeCostManagement = () => {
  const {
    officeCosts,
    addOfficeCost,
    updateOfficeCostStatus,
    deleteOfficeCost,
    permissions
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeVoucherModal, setActiveVoucherModal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Utilities & Power',
    amount: '',
    month: 'September 2026',
    date: '2026-09-29',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Bank Transfer (City Bank)',
    reference: '',
    description: '',
    status: 'Paid'
  });

  const categories = [
    'All',
    'Rent & Facility',
    'Utilities & Power',
    'IT & Telecom',
    'Office Supplies',
    'IT & Software',
    'Pantry & Hospitality',
    'Maintenance & Facility'
  ];

  const filteredCosts = officeCosts.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.reference && item.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.paidBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCost = officeCosts.reduce((sum, c) => sum + (c.amount || 0), 0);
  const paidCost = officeCosts.filter(c => c.status === 'Paid').reduce((sum, c) => sum + (c.amount || 0), 0);
  const pendingCost = officeCosts.filter(c => c.status === 'Pending').reduce((sum, c) => sum + (c.amount || 0), 0);
  const pendingCount = officeCosts.filter(c => c.status === 'Pending').length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    addOfficeCost({
      ...formData,
      amount: parseFloat(formData.amount) || 0
    });
    setFormData({
      title: '',
      category: 'Utilities & Power',
      amount: '',
      month: 'September 2026',
      date: new Date().toISOString().split('T')[0],
      paidBy: 'Tanvir Hossain (CFO)',
      paymentMethod: 'Bank Transfer (City Bank)',
      reference: '',
      description: '',
      status: 'Paid'
    });
    setShowAddModal(false);
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Rent & Facility':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Utilities & Power':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'IT & Telecom':
      case 'IT & Software':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Office Supplies':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pantry & Hospitality':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Maintenance & Facility':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Accountant • Expense Module
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Office Cost Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Corporate office rent, electricity (DESCO), utilities, dedicated IT fiber, stationery & facility overheads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Ledger
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={!permissions?.canEditExpenses}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all ${
              permissions?.canEditExpenses
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Log Office Expense
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Office Cost</span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ৳{totalCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span>{officeCosts.length} logged expense vouchers</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Paid Expenses</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600">
            ৳{paidCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Settled via Bank & Petty Cash
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Pending Dues</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-600">
            ৳{pendingCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            {pendingCount} bills awaiting payment release
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Largest Cost Overhead</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 truncate">
            Head Office Rent
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            ৳350,000 / month (Banani HQ)
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search voucher, title, ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Office Cost Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Office Expense Records ({filteredCosts.length})
          </h2>
          <span className="text-xs text-slate-500">
            Current Fiscal Month: September 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-3.5">Voucher / Item</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Date & Month</th>
                <th className="px-6 py-3.5">Amount (BDT)</th>
                <th className="px-6 py-3.5">Disbursement Details</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No office cost records found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredCosts.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                        <span className="text-indigo-600 font-bold">{item.voucherNo}</span>
                        {item.reference && (
                          <>
                            <span>•</span>
                            <span>Ref: {item.reference}</span>
                          </>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 max-w-sm">
                          {item.description}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium border ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium">{item.date}</div>
                      <div className="text-[11px] text-slate-400">{item.month}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm font-mono">
                        ৳{item.amount.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium">{item.paidBy}</div>
                      <div className="text-[11px] text-slate-500">{item.paymentMethod}</div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          if (permissions?.canEditExpenses) {
                            updateOfficeCostStatus(
                              item.id,
                              item.status === 'Paid' ? 'Pending' : 'Paid'
                            );
                          }
                        }}
                        disabled={!permissions?.canEditExpenses}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          item.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {item.status === 'Paid' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Pending
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveVoucherModal(item)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Voucher"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        {permissions?.canEditExpenses && (
                          <button
                            onClick={() => deleteOfficeCost(item.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Voucher"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Office Cost Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Log Office Cost Voucher</h3>
                <p className="text-xs text-slate-500">Record a new administrative / facility expense</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expense Title / Head *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., DESCO Electricity Bill / Commercial Rent"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g., 45000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expense Month
                  </label>
                  <input
                    type="text"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Disbursed By
                  </label>
                  <input
                    type="text"
                    value={formData.paidBy}
                    onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Bank Transfer (City Bank)">Bank Transfer (City Bank)</option>
                    <option value="Bank Transfer (EBL)">Bank Transfer (EBL)</option>
                    <option value="Bank Transfer (DBBL)">Bank Transfer (DBBL)</option>
                    <option value="Corporate Petty Cash">Corporate Petty Cash</option>
                    <option value="Corporate Credit Card">Corporate Credit Card</option>
                    <option value="Bank Cheque">Bank Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reference / Meter / Bill No.
                </label>
                <input
                  type="text"
                  placeholder="e.g. METER-49912 / PO-881"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="Add additional details about this expense..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
                >
                  Record Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Voucher Detail Modal */}
      {activeVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-slate-900">Office Expense Voucher</span>
              </div>
              <button
                onClick={() => setActiveVoucherModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Voucher No:</span>
                <span className="font-mono font-bold text-indigo-600">{activeVoucherModal.voucherNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expense Title:</span>
                <span className="font-bold text-slate-800 text-right">{activeVoucherModal.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-700">{activeVoucherModal.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Month / Date:</span>
                <span className="text-slate-700">{activeVoucherModal.month} ({activeVoucherModal.date})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Disbursed By:</span>
                <span className="text-slate-700">{activeVoucherModal.paidBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="text-slate-700">{activeVoucherModal.paymentMethod}</span>
              </div>
              {activeVoucherModal.reference && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Reference:</span>
                  <span className="font-mono text-slate-700">{activeVoucherModal.reference}</span>
                </div>
              )}
              {activeVoucherModal.description && (
                <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-[11px] leading-relaxed">
                  {activeVoucherModal.description}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-800">Total Amount:</span>
                <span className="text-xl font-black text-indigo-600">৳{activeVoucherModal.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Voucher
              </button>
              <button
                onClick={() => setActiveVoucherModal(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
