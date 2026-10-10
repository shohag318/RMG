import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Boxes,
  PlusCircle,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Package,
  Layers,
  ArrowDownCircle,
  ArrowUpCircle,
  Warehouse
} from 'lucide-react';

export const StockManagement = () => {
  const {
    rawMaterials,
    finishedGoods,
    restockMaterial,
    addRawMaterial,
    permissions,
    stats
  } = useERP();

  const [activeTab, setActiveTab] = useState('raw'); // 'raw' or 'finished'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  // Restock Modal
  const [restockItem, setRestockItem] = useState(null);
  const [restockQty, setRestockQty] = useState('');

  // Add Item Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMatForm, setNewMatForm] = useState({
    name: '',
    category: 'Fabric',
    unit: 'Meters',
    unitCost: 4.50,
    currentStock: 5000,
    reorderLevel: 1500,
    location: 'Warehouse Bay A-18',
    supplier: 'Apex Textile Mills'
  });

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockItem || !restockQty) return;
    restockMaterial(restockItem.id, restockQty);
    setRestockItem(null);
    setRestockQty('');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMatForm.name) return;
    addRawMaterial(newMatForm);
    setShowAddModal(false);
    setNewMatForm({
      name: '',
      category: 'Fabric',
      unit: 'Meters',
      unitCost: 4.50,
      currentStock: 5000,
      reorderLevel: 1500,
      location: 'Warehouse Bay A-18',
      supplier: 'Apex Textile Mills'
    });
  };

  const filteredRawMaterials = rawMaterials.filter(mat => {
    const matchesSearch =
      mat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mat.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || mat.category === categoryFilter;
    const matchesLowStock = !onlyLowStock || mat.currentStock <= mat.reorderLevel;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Boxes className="w-6 h-6 text-indigo-600" />
            Stock & Warehouse Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of raw materials (fabrics, trims, packaging) & finished garment goods with automatic floor deductions.
          </p>
        </div>

        {permissions?.canEditStock && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Add Material Item
          </button>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Raw Material SKUs</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{rawMaterials.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Fabrics, accessories, trims</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Low Stock Alerts</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{stats.lowStockCount}</p>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Below safety reorder level</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Finished Goods Ready</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {finishedGoods.reduce((sum, g) => sum + g.quantity, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Pieces ready in dispatch bays</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Auto Deduction Sync</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Active with Floor Log
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Instant deduction on floor usage</p>
        </div>
      </div>

      {/* Switcher Tab */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('raw')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'raw'
              ? 'text-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Raw Materials & Accessories ({rawMaterials.length})
          {activeTab === 'raw' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('finished')}
          className={`pb-3 px-4 text-xs font-bold transition-all relative ${
            activeTab === 'finished'
              ? 'text-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Finished Garment Goods ({finishedGoods.length})
          {activeTab === 'finished' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* VIEW 1: RAW MATERIALS */}
      {activeTab === 'raw' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search material SKU, name, or rack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
              >
                <option value="All">All Categories</option>
                <option value="Fabric">Fabrics</option>
                <option value="Accessories">Accessories (Zippers/Buttons)</option>
                <option value="Trims">Trims & Threads</option>
                <option value="Packaging">Packaging Cartons</option>
              </select>

              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyLowStock}
                  onChange={(e) => setOnlyLowStock(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-amber-600">Only Low Stock ({stats.lowStockCount})</span>
              </label>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Item SKU</th>
                    <th className="py-3 px-4">Material Description</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Reorder Safety Level</th>
                    <th className="py-3 px-4">Unit Cost (TK)</th>
                    <th className="py-3 px-4">Warehouse Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRawMaterials.map(mat => {
                    const isLow = mat.currentStock <= mat.reorderLevel;

                    return (
                      <tr key={mat.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {mat.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900">{mat.name}</p>
                          <p className="text-[11px] text-slate-400">Supplier: {mat.supplier}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                            {mat.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-black text-sm">
                          <span className={isLow ? 'text-amber-600' : 'text-slate-900'}>
                            {mat.currentStock.toLocaleString()}
                          </span>{' '}
                          <span className="text-xs font-normal text-slate-500">{mat.unit}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {mat.reorderLevel.toLocaleString()} {mat.unit}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold">
                          ৳{mat.unitCost.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                          {mat.location}
                        </td>
                        <td className="py-3.5 px-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              <AlertTriangle className="w-3 h-3" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3" />
                              Healthy
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {permissions?.canEditStock && (
                            <button
                              onClick={() => {
                                setRestockItem(mat);
                                setRestockQty('1000');
                              }}
                              className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
                            >
                              + Restock
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FINISHED GOODS INVENTORY */}
      {activeTab === 'finished' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Finished Garment Batches Ready for Shipment
            </h3>
            <p className="text-[11px] text-slate-500">
              Completed items passing QC audit, packed into export cartons and staged in warehouse dispatch bays.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Batch ID</th>
                  <th className="py-3 px-4">Garment Description</th>
                  <th className="py-3 px-4">Buyer / Client</th>
                  <th className="py-3 px-4">Tied Order ID</th>
                  <th className="py-3 px-4">Pieces Ready</th>
                  <th className="py-3 px-4">Carton Count</th>
                  <th className="py-3 px-4">Warehouse Staging Bay</th>
                  <th className="py-3 px-4 text-right">Dispatch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {finishedGoods.map(fg => (
                  <tr key={fg.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {fg.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {fg.itemName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {fg.client}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                      {fg.orderId}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                      {fg.quantity.toLocaleString()} Pcs
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {fg.cartonCount} Boxes
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {fg.location}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        {fg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: RESTOCK MATERIAL */}
      {restockItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Restock Material</h3>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">
              {restockItem.name} ({restockItem.id})
            </p>

            <form onSubmit={handleRestockSubmit} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Stock:</span>
                  <span className="font-mono font-bold text-slate-800">{restockItem.currentStock} {restockItem.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reorder Threshold:</span>
                  <span className="font-mono text-amber-600">{restockItem.reorderLevel} {restockItem.unit}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity to Add ({restockItem.unit}) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-indigo-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Confirm Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW MATERIAL ITEM */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Raw Material to Catalog</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  ID will be auto-generated: MAT-{rawMaterials.length + 101}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Heavy Cotton Interlock Knit 280 GSM"
                  value={newMatForm.name}
                  onChange={(e) => setNewMatForm({ ...newMatForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newMatForm.category}
                    onChange={(e) => setNewMatForm({ ...newMatForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Fabric">Fabric</option>
                    <option value="Accessories">Accessories (Zippers/Buttons)</option>
                    <option value="Trims">Trims & Threads</option>
                    <option value="Packaging">Packaging Cartons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Measurement Unit *
                  </label>
                  <select
                    value={newMatForm.unit}
                    onChange={(e) => setNewMatForm({ ...newMatForm, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Meters">Meters</option>
                    <option value="Kg">Kg</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Cones">Cones</option>
                    <option value="Gross (144 pcs)">Gross (144 pcs)</option>
                    <option value="Boxes">Boxes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={newMatForm.currentStock}
                    onChange={(e) => setNewMatForm({ ...newMatForm, currentStock: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reorder Threshold *
                  </label>
                  <input
                    type="number"
                    required
                    value={newMatForm.reorderLevel}
                    onChange={(e) => setNewMatForm({ ...newMatForm, reorderLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
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
                    value={newMatForm.unitCost}
                    onChange={(e) => setNewMatForm({ ...newMatForm, unitCost: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Warehouse Rack / Bay
                  </label>
                  <input
                    type="text"
                    value={newMatForm.location}
                    onChange={(e) => setNewMatForm({ ...newMatForm, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Supplier
                  </label>
                  <input
                    type="text"
                    value={newMatForm.supplier}
                    onChange={(e) => setNewMatForm({ ...newMatForm, supplier: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
