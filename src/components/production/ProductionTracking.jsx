import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Factory,
  Layers,
  ShoppingBag,
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Truck
} from 'lucide-react';

export const ProductionTracking = () => {
  const {
    purchases,
    recordMaterialPurchase,
    materialUsages,
    recordMaterialUsage,
    orders,
    rawMaterials,
    permissions
  } = useERP();

  const [activeTab, setActiveTab] = useState('usage'); // 'usage' or 'purchases'
  const [searchTerm, setSearchTerm] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);

  // New Purchase Form
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

  // Material Usage Form
  const [usageForm, setUsageForm] = useState({
    orderId: 'ORD-7081',
    materialName: 'French Terry Cotton 380 GSM (Black)',
    allocatedQty: 18000,
    consumedQty: 2500,
    wastageQty: 45,
    unit: 'Meters',
    stage: 'Cutting Line 2'
  });

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    recordMaterialPurchase(purchaseForm);
    setShowPurchaseModal(false);
  };

  const handleUsageSubmit = (e) => {
    e.preventDefault();
    recordMaterialUsage(usageForm);
    setShowUsageModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Factory className="w-6 h-6 text-indigo-600" />
            Production & Order-Wise Material Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Order-specific raw material procurement, floor consumption logs, scrap calculation, and real-time inventory deductions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-all"
          >
            <Truck className="w-4 h-4 text-indigo-600" />
            + Order Material PO
          </button>

          <button
            onClick={() => setShowUsageModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Layers className="w-4 h-4" />
            + Log Floor Usage & Scrap
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Tracked Procurement POs</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{purchases.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Directly tied to buyer contracts</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Active Floor Usage Records</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{materialUsages.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Cutting & Sewing lines monitoring</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Average Fabric Efficiency</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">97.8%</p>
          <p className="text-[11px] text-slate-500 mt-1">Average scrap/wastage &lt; 2.2%</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('usage')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'usage'
              ? 'text-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Material Consumption & Remaining Balances ({materialUsages.length})
          {activeTab === 'usage' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'purchases'
              ? 'text-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Order-Wise Material Purchases ({purchases.length})
          {activeTab === 'purchases' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* VIEW 1: MATERIAL USAGE & REMAINING TRACKING */}
      {activeTab === 'usage' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Production Consumption & Remaining Material Auditor
              </h3>
              <p className="text-[11px] text-slate-500">
                Remaining Material = Allocated - Consumed. When logged, system automatically reduces Warehouse Stock!
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/50">
              Live Deductions Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Raw Material Item</th>
                  <th className="py-3 px-4">Allocated Qty</th>
                  <th className="py-3 px-4">Consumed on Floor</th>
                  <th className="py-3 px-4">Remaining Balance</th>
                  <th className="py-3 px-4">Wastage / Scrap</th>
                  <th className="py-3 px-4">Floor Stage</th>
                  <th className="py-3 px-4 text-right">Last Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {materialUsages.map(usage => {
                  const percentUsed = Math.min(100, Math.round((usage.consumedQty / (usage.allocatedQty || 1)) * 100));

                  return (
                    <tr key={usage.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        {usage.orderId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {usage.materialName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {usage.allocatedQty.toLocaleString()} {usage.unit}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                        {usage.consumedQty.toLocaleString()} {usage.unit}
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${percentUsed}%` }} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                        {usage.remainingQty.toLocaleString()} {usage.unit}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-rose-600">
                        {usage.wastageQty} {usage.unit} ({usage.wastagePercent}%)
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                          {usage.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 text-right">
                        {usage.lastLoggedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: ORDER-WISE PURCHASE TRACKING */}
      {activeTab === 'purchases' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Raw Materials Purchased for Specific Orders
            </h3>
            <p className="text-[11px] text-slate-500">
              Procurement ledger linking vendor deliveries directly to client production runs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">PO Reference</th>
                  <th className="py-3 px-4">Tied Order ID</th>
                  <th className="py-3 px-4">Material Purchased</th>
                  <th className="py-3 px-4">Mill / Supplier</th>
                  <th className="py-3 px-4">Purchased Qty</th>
                  <th className="py-3 px-4">Unit Cost (TK)</th>
                  <th className="py-3 px-4">Total PO Value (TK)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {purchases.map(po => (
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
                    <td className="py-3.5 px-4 text-slate-600">
                      {po.supplier}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {po.quantityPurchased.toLocaleString()} {po.unit}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      ৳{po.unitCost.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                      ৳{po.totalCost.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ORDER-WISE PURCHASE ENTRY */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Record Order-Wise Purchase</h3>
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
                    Select Target Order *
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

      {/* MODAL 2: LOG FLOOR USAGE & SCRAP */}
      {showUsageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Log Production Material Usage</h3>
                <p className="text-xs text-amber-600 font-semibold mt-0.5">
                  Stock will be automatically deducted from inventory!
                </p>
              </div>
              <button
                onClick={() => setShowUsageModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUsageSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Target Order *
                  </label>
                  <select
                    value={usageForm.orderId}
                    onChange={(e) => setUsageForm({ ...usageForm, orderId: e.target.value })}
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
                    Raw Material Consumed *
                  </label>
                  <select
                    value={usageForm.materialName}
                    onChange={(e) => {
                      const sel = rawMaterials.find(m => m.name === e.target.value);
                      setUsageForm({
                        ...usageForm,
                        materialName: e.target.value,
                        unit: sel ? sel.unit : 'Meters'
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {rawMaterials.map(m => (
                      <option key={m.id} value={m.name}>
                        {m.name} (Stock: {m.currentStock} {m.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Consumed Quantity on Floor ({usageForm.unit}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={usageForm.consumedQty}
                    onChange={(e) => setUsageForm({ ...usageForm, consumedQty: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Scrap / Wastage ({usageForm.unit})
                  </label>
                  <input
                    type="number"
                    value={usageForm.wastageQty}
                    onChange={(e) => setUsageForm({ ...usageForm, wastageQty: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Production Stage
                  </label>
                  <select
                    value={usageForm.stage}
                    onChange={(e) => setUsageForm({ ...usageForm, stage: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Cutting Line 1">Cutting Line 1</option>
                    <option value="Cutting Line 2">Cutting Line 2</option>
                    <option value="Sewing Floor A">Sewing Floor A</option>
                    <option value="Finishing & Trims">Finishing & Trims</option>
                    <option value="Packaging & Box">Packaging & Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Allocated for Order ({usageForm.unit})
                  </label>
                  <input
                    type="number"
                    value={usageForm.allocatedQty}
                    onChange={(e) => setUsageForm({ ...usageForm, allocatedQty: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUsageModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Log & Deduct Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
