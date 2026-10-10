import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  TrendingUp,
  TrendingDown,
  ReceiptText,
  Package,
  Users,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShoppingBag,
  FileText
} from 'lucide-react';

export const OverviewDashboard = () => {
  const {
    todayIncome,
    todayExpense,
    orders,
    employees,
    attendance,
    rawMaterials,
    materialUsages,
    stats,
    setActiveTab,
    permissions
  } = useERP();

  // Material usage summary aggregate
  const totalMetersUsedToday = materialUsages.reduce((sum, u) => sum + (u.consumedQty || 0), 0);
  const totalWastageLogged = materialUsages.reduce((sum, u) => sum + (u.wastageQty || 0), 0);

  // Net Cash Flow for Today
  const todayNetCashFlow = todayIncome - todayExpense;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Live Manufacturing Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Garment Factory Management & ERP
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time oversight across cutting, sewing, finished goods, client advances, and daily workforce metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {permissions?.orders && (
              <button
                onClick={() => setActiveTab('orders')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Manage Orders
              </button>
            )}
            {permissions?.attendance && (
              <button
                onClick={() => setActiveTab('attendance')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-semibold text-xs text-white border border-white/20 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Attendance Log
              </button>
            )}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      </div>

      {/* MODULE 2 REQUIREMENT: Daily Report Summary (Income, Expense, Material Usage) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Daily Report Summary ({new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
          </h2>
          <span className="text-xs text-slate-500">Live operational ledger</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Today's Total Income */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Today's Total Income
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ৳{todayIncome.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-emerald-600 font-medium">
                <span className="flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
                <span className="text-slate-400 font-normal">vs yesterday settlement</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                Sources: Client order advances + Final delivery clearances
              </p>
            </div>
          </div>

          {/* Today's Total Expense */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Today's Total Expense
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ৳{todayExpense.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600 font-medium">
                <span className="text-rose-600">Material POs & Overtime</span>
                <span className="text-slate-400 font-normal">daily disbursements</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100 flex justify-between">
                <span>Overtime Payout: <strong className="text-slate-700">৳{stats.totalOvertimeCost.toLocaleString()}</strong></span>
                <span>Net Flow: <strong className={todayNetCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'}>৳{todayNetCashFlow.toLocaleString()}</strong></span>
              </p>
            </div>
          </div>

          {/* Daily Material Usage Summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Daily Material Usage
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalMetersUsedToday.toLocaleString()} <span className="text-base font-semibold text-slate-500">Meters</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-blue-600 font-medium">
                <span>Wastage logged: {totalWastageLogged.toLocaleString()} M ({((totalWastageLogged / (totalMetersUsedToday || 1)) * 100).toFixed(1)}%)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100 truncate">
                Active Cutting: French Terry & Raw Selvedge Denim
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2 REQUIREMENT: Quick Stats on Active Orders, Present Employees, Low Stock Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            Operational Quick Stats
          </h2>
          <span className="text-xs text-slate-500">Real-time alerts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Active Orders */}
          <div
            onClick={() => permissions?.orders && setActiveTab('orders')}
            className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs transition-all ${
              permissions?.orders ? 'cursor-pointer hover:border-indigo-300 hover:shadow-md' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Pipeline
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-500">Active Production Orders</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {stats.activeOrdersCount}{' '}
                <span className="text-xs font-normal text-slate-400">orders</span>
              </h3>
              <div className="mt-2 text-xs text-slate-600 flex justify-between">
                <span>Value: <strong>৳{(stats.totalOrderValue / 1000000).toFixed(2)}M</strong></span>
                <span className="text-emerald-600">Profit: <strong>৳{(stats.totalProjectedProfit / 1000000).toFixed(2)}M</strong></span>
              </div>
            </div>
          </div>

          {/* Present Employees */}
          <div
            onClick={() => permissions?.attendance && setActiveTab('attendance')}
            className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs transition-all ${
              permissions?.attendance ? 'cursor-pointer hover:border-emerald-300 hover:shadow-md' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Floor Attendance
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-500">Present Employees Today</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {stats.presentEmployees}{' '}
                <span className="text-xs font-normal text-slate-400">/ {stats.totalEmployees} on duty</span>
              </h3>
              <div className="mt-2 text-xs text-slate-600 flex justify-between">
                <span className="text-rose-500">Absent: {stats.absentEmployees}</span>
                <span className="text-slate-500">OT: {stats.totalOtHours} hrs</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div
            onClick={() => permissions?.stock && setActiveTab('stock')}
            className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs transition-all ${
              permissions?.stock ? 'cursor-pointer hover:border-amber-300 hover:shadow-md' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Warehouse Reorder
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-500">Low Stock Alert Items</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {stats.lowStockCount}{' '}
                <span className="text-xs font-normal text-slate-400">materials below threshold</span>
              </h3>
              <p className="mt-2 text-xs text-amber-700 truncate font-medium">
                {stats.lowStockCount > 0
                  ? stats.lowStockItems.map(i => i.name.split(' ')[0]).join(', ')
                  : 'All materials well-stocked'}
              </p>
            </div>
          </div>

          {/* Payment History Inflow */}
          <div
            onClick={() => permissions?.payment_history && setActiveTab('payment_history')}
            className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs transition-all ${
              permissions?.payment_history ? 'cursor-pointer hover:border-blue-300 hover:shadow-md' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ReceiptText className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Payment History
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-500">Outstanding Due Balance</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                ৳{stats.totalOutstandingDue.toLocaleString()}
              </h3>
              <div className="mt-2 text-xs text-slate-600 flex justify-between">
                <span>Advance Paid: ৳{stats.totalAdvanceReceived.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Floor Pipeline & Active Orders Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Production Orders Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Production Batches</h3>
              <p className="text-xs text-slate-500">Live stages across manufacturing floor</p>
            </div>
            {permissions.orders && (
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View All Orders &rarr;
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {order.companyName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {order.itemName} &bull; <span className="font-semibold">{order.quantity.toLocaleString()} Pcs</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                      {order.status}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Delivery: <strong className="text-slate-700">{order.deliveryDate}</strong>
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[11px] text-slate-500">Floor Completion</span>
                    <span className="text-[11px] font-bold text-indigo-600">{order.productionProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${order.productionProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Inventory Stock Levels */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Material Stock Health</h3>
                <p className="text-xs text-slate-500">Raw materials in warehouse</p>
              </div>
              {permissions.inventory && (
                <button
                  onClick={() => setActiveTab('inventory')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Manage &rarr;
                </button>
              )}
            </div>

            <div className="mt-4 space-y-3.5">
              {rawMaterials.slice(0, 5).map(mat => {
                const isLow = mat.currentStock <= mat.reorderLevel;
                return (
                  <div key={mat.id} className="flex items-center justify-between text-xs">
                    <div className="pr-2">
                      <p className="font-semibold text-slate-800 leading-tight truncate max-w-[170px]">
                        {mat.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{mat.location}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-mono font-bold ${isLow ? 'text-amber-600' : 'text-slate-800'}`}>
                        {mat.currentStock.toLocaleString()} {mat.unit}
                      </span>
                      {isLow && (
                        <p className="text-[10px] text-rose-500 font-semibold uppercase">Reorder</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Finished Goods Ready:</span>
              <span className="font-bold text-slate-800">10,200 Pieces (Warehouse E)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
