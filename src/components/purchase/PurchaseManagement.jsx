import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Truck,
  PlusCircle,
  Search,
  Filter,
  Package,
  Layers,
  Calendar,
  CheckCircle2,
  Clock,
  Building,
  ArrowUpRight
} from 'lucide-react';

export const PurchaseManagement = () => {
  const {
    purchases,
    recordMaterialPurchase,
    orders,
    rawMaterials,
    permissions
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // New Purchase Order Form
  const [purchaseForm, setPurchaseForm] = useState({
    orderId: 'ORD-7081',
    materialId: 'MAT-101',
    materialName: 'French Terry Cotton 380 GSM (Black)',
    supplier: 'Apex Textile Mills',
    quantity: 5000,
    unit: 'Meters',
    unitCost: 4.80,
    invoiceNumber: ''
  });

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    recordMaterialPurchase(purchaseForm);
    setShowPurchaseModal(false);
  };

  const filteredPurchases = purchases.filter(p => {
    const matchesSearch =
      p.purchaseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalProcurementValue = purchases.reduce((sum, p) => sum + (p.totalCost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-indigo-600" />
            Purchase & Raw Material Procurement
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Order-tied raw material procurement POs, fabric mill deliveries, supplier billing, and stock intake.
          </p>
        </div>

        {permissions?.purchase && (
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Record Material Purchase PO
          </button>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Procurement Expense</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ৳{totalProcurementValue.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Across all order material batches</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Delivered to Floor</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {purchases.filter(p => p.status.includes('Delivered')).length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Ready for cutting & stitching</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Partially Received</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {purchases.filter(p => p.status.includes('Partially')).length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Staggered mill shipments</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">In Transit</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {purchases.filter(p => p.status.includes('Transit')).length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Expected this week</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search PO #, Order ID, Material, or Mill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Delivery Statuses</option>
            <option value="Delivered to Floor">Delivered to Floor</option>
            <option value="Partially Received">Partially Received</option>
            <option value="In Transit">In Transit</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">PO Reference</th>
                <th className="py-3 px-4">Tied Order ID</th>
                <th className="py-3 px-4">Raw Material Description</th>
                <th className="py-3 px-4">Fabric Mill / Supplier</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Unit Rate (TK)</th>
                <th className="py-3 px-4">Total Cost (TK)</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No purchase orders match your search.
                  </td>
                </tr>
              ) : (
                filteredPurchases.map(po => (
                  <tr key={po.purchaseId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {po.purchaseId}
                      <span className="block text-[10px] text-slate-400 font-normal">{po.invoiceNumber}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {po.orderId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {po.materialName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {po.supplier}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {po.quantityPurchased.toLocaleString()} {po.unit}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      ৳{po.unitCost.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                      ৳{po.totalCost.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {po.purchaseDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          po.status.includes('Delivered')
                            ? 'bg-emerald-100 text-emerald-800'
                            : po.status.includes('Partially')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD MATERIAL PURCHASE */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Record Material Purchase PO</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  Direct procurement tied to customer order
                </p>
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handlePurchaseSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Customer Order *
                  </label>
                  <select
                    value={purchaseForm.orderId}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, orderId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-mono font-bold"
                  >
                    {orders.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.id} - {o.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Raw Material *
                  </label>
                  <select
                    value={purchaseForm.materialName}
                    onChange={(e) => {
                      const sel = rawMaterials.find(m => m.name === e.target.value);
                      setPurchaseForm({
                        ...purchaseForm,
                        materialName: e.target.value,
                        materialId: sel ? sel.id : 'MAT-101',
                        unit: sel ? sel.unit : 'Meters',
                        unitCost: sel ? sel.unitCost : 4.50
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {rawMaterials.map(m => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mill / Supplier Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={purchaseForm.supplier}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, supplier: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vendor Invoice Ref
                  </label>
                  <input
                    type="text"
                    placeholder="INV-2026-XXXX"
                    value={purchaseForm.invoiceNumber}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Purchased Quantity ({purchaseForm.unit}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={purchaseForm.quantity}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, quantity: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unit Cost (TK) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={purchaseForm.unitCost}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, unitCost: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between">
                <span className="text-slate-600">Calculated PO Expense:</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  ৳{((parseFloat(purchaseForm.quantity) || 0) * (parseFloat(purchaseForm.unitCost) || 0)).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Save & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
