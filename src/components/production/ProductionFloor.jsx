import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Factory,
  Layers,
  Scissors,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
  Filter,
  Clock,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export const ProductionFloor = () => {
  const {
    materialUsages,
    recordMaterialUsage,
    orders,
    rawMaterials,
    permissions
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [showUsageModal, setShowUsageModal] = useState(false);

  // Form State
  const [usageForm, setUsageForm] = useState({
    orderId: 'ORD-7081',
    materialName: 'French Terry Cotton 380 GSM (Black)',
    allocatedQty: 18000,
    consumedQty: 2500,
    wastageQty: 45,
    unit: 'Meters',
    stage: 'Cutting Line 2'
  });

  const handleUsageSubmit = (e) => {
    e.preventDefault();
    recordMaterialUsage(usageForm);
    setShowUsageModal(false);
  };

  const filteredUsages = materialUsages.filter(u =>
    u.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalConsumed = materialUsages.reduce((sum, u) => sum + (u.consumedQty || 0), 0);
  const totalWastage = materialUsages.reduce((sum, u) => sum + (u.wastageQty || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Factory className="w-6 h-6 text-indigo-600" />
            Production Floor & Material Consumption
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manufacturing lines monitoring (Cutting, Sewing, Finishing, QC), material consumption tracking, and scrap calculation.
          </p>
        </div>

        {permissions?.production && (
          <button
            onClick={() => setShowUsageModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Log Material Usage & Scrap
          </button>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Floor Consumption</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {totalConsumed.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">Meters</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Logged across cutting & sewing</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-rose-600 uppercase">Total Scrap / Wastage</p>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {totalWastage.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">Meters</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Average scrap: {((totalWastage / (totalConsumed || 1)) * 100).toFixed(2)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Material Yield Efficiency</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">97.8%</p>
          <p className="text-[11px] text-slate-400 mt-1">Well within export standard &gt;96%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Stock Auto Deduction</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Trigger Active
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Instant deduction from Warehouse</p>
        </div>
      </div>

      {/* Production Lines Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Active Manufacturing Lines & Order Progression
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">
                    {order.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {order.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                  {order.itemName}
                </h3>
                <p className="text-[11px] text-slate-500">{order.companyName}</p>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-bold text-indigo-600 font-mono">{order.productionProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${order.productionProgress}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                <span>Batch: {order.quantity.toLocaleString()} Pcs</span>
                <span>Delivery: <strong>{order.deliveryDate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material Consumption & Remaining Register */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Material Consumption, Remaining Balances & Scrap Tracker
            </h3>
            <p className="text-[11px] text-slate-500">
              Allocated vs Consumed. Every entry automatically decreases the Warehouse Stock balance.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search order, material, or line..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
                <th className="py-3 px-4">Scrap / Wastage</th>
                <th className="py-3 px-4">Production Stage</th>
                <th className="py-3 px-4 text-right">Last Logged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsages.map(usage => {
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
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
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

      {/* MODAL: LOG FLOOR USAGE */}
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
