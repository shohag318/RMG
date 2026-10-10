import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Menu,
  Shield,
  Bell,
  Search,
  PlusCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  UserCheck,
  Calculator,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CreditCard,
  Truck,
  Building2,
  Layers
} from 'lucide-react';

export const Header = ({ setIsMobileOpen }) => {
  const {
    currentRoleId,
    setCurrentRoleId,
    roles,
    currentRole,
    stats,
    setActiveTab,
    activeTab,
    permissions
  } = useERP();

  const [showNotifications, setShowNotifications] = useState(false);
  const [incomeMenuOpen, setIncomeMenuOpen] = useState(false);
  const [expenseMenuOpen, setExpenseMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200/70 px-3 py-1.5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-medium text-slate-700">Today:</span>
          <span>Tuesday, Sep 29, 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></span>
          <span className="text-[11px] text-emerald-700 font-medium">Shift A (Day)</span>
        </div>
      </div>

      {/* Center: Top Menu Bar - Section: Accountant */}
      <div className="hidden xl:flex items-center gap-1.5 bg-slate-50/90 border border-slate-200/80 px-2 py-1 rounded-xl shadow-2xs">
        <div className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 rounded-lg uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-indigo-600" />
          <span>Accountant</span>
        </div>

        {/* Menu: Income */}
        <div className="relative">
          <button
            onClick={() => {
              setIncomeMenuOpen(prev => !prev);
              setExpenseMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'orders' || activeTab === 'payment_history'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Income</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {incomeMenuOpen && (
            <div
              className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setIncomeMenuOpen(false)}
            >
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Income Submenu
              </div>
              <button
                onClick={() => {
                  setActiveTab('orders');
                  setIncomeMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors ${
                  activeTab === 'orders' ? 'bg-emerald-50 font-bold text-emerald-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Order</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded-full">
                  {stats.activeOrdersCount || 0}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Menu: Expense */}
        <div className="relative">
          <button
            onClick={() => {
              setExpenseMenuOpen(prev => !prev);
              setIncomeMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              ['salary', 'purchase', 'office_cost', 'other_expense'].includes(activeTab)
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span>Expense</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {expenseMenuOpen && (
            <div
              className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setExpenseMenuOpen(false)}
            >
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Expense Submenus (4)
              </div>
              <button
                onClick={() => {
                  setActiveTab('salary');
                  setExpenseMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition-colors ${
                  activeTab === 'salary' ? 'bg-rose-50 font-bold text-rose-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-rose-600" />
                  <span>Salary</span>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-1.5 py-0.5 rounded-full">
                  {stats.pendingSalariesCount > 0 ? `${stats.pendingSalariesCount} Due` : 'Done'}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('purchase');
                  setExpenseMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition-colors ${
                  activeTab === 'purchase' ? 'bg-rose-50 font-bold text-rose-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Order Purchase</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-700 font-semibold px-1.5 py-0.5 rounded-full">
                  Procurement
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('office_cost');
                  setExpenseMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition-colors ${
                  activeTab === 'office_cost' ? 'bg-rose-50 font-bold text-rose-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Office Cost</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-700 font-semibold px-1.5 py-0.5 rounded-full">
                  Rent/Power
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('other_expense');
                  setExpenseMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition-colors ${
                  activeTab === 'other_expense' ? 'bg-rose-50 font-bold text-rose-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Other</span>
                </div>
                <span className="text-[10px] bg-teal-100 text-teal-700 font-semibold px-1.5 py-0.5 rounded-full">
                  Port/Logistics
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Dropdown (Crucial for testing Role-Based Access Control) */}
        <div className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-200/80 px-3 py-1.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline text-xs font-semibold text-indigo-900">
              Role Simulation:
            </span>
          </div>
          <select
            value={currentRoleId}
            onChange={(e) => {
              setCurrentRoleId(e.target.value);
              // If current tab is not allowed under the newly selected role, fallback to dashboard
              setActiveTab('dashboard');
            }}
            className="text-xs font-semibold text-indigo-900 bg-white border border-indigo-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
          >
            {(roles || []).map(r => (
              <option key={r.id} value={r.id}>
                {r.name} {r.id === 'super_admin' ? '★' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Low Stock Alerts Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {stats.lowStockCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white">
                {stats.lowStockCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Factory Alerts
                </span>
                <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  {stats.lowStockCount} Critical
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto px-2 py-1 divide-y divide-slate-100">
                {stats.lowStockItems.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400">
                    All inventory levels are healthy!
                  </div>
                ) : (
                  stats.lowStockItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveTab('inventory');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800 leading-tight">
                            Low Stock: {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Remaining: <span className="font-bold text-amber-600">{item.currentStock} {item.unit}</span> (Threshold: {item.reorderLevel})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <div className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800 leading-tight">
                        Order #ORD-7084 Ready
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        6,000 Oxford Shirts cleared QC inspection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-3 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setActiveTab('inventory');
                    setShowNotifications(false);
                  }}
                  className="w-full text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 py-1"
                >
                  View Inventory & Restock
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {currentRole?.name ? currentRole.name.charAt(0) : 'U'}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {currentRole?.id === 'super_admin' ? 'Engr. Mahbubur R.' : 'Designated Staff'}
            </p>
            <p className="text-[10px] text-slate-500">
              {currentRole?.name || 'Staff'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
