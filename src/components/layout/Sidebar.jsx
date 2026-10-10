import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  LayoutDashboard,
  Calculator,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CreditCard,
  Truck,
  Building2,
  Layers,
  Wrench,
  Factory,
  Boxes,
  Warehouse,
  Users,
  Briefcase,
  PieChart,
  ShieldCheck,
  Scissors,
  CheckCircle2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const {
    activeTab,
    setActiveTab,
    permissions,
    currentRole,
    currentRoleId,
    setCurrentRoleId,
    roles,
    stats,
    officeCosts,
    otherExpenses,
    purchases
  } = useERP();

  // Collapsible tree sections (default all expanded to match user diagram)
  const [sectionsOpen, setSectionsOpen] = useState({
    accountant: true,
    income: true,
    expense: true,
    operation: true,
    officeStaff: true,
    governance: true
  });

  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const toggleSection = (key) => {
    setSectionsOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-slate-900 text-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 text-white shrink-0">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              RGM Apparel ERP
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-semibold border border-indigo-400/30">
                v2.6
              </span>
            </h1>
            <p className="text-xs text-slate-400">Garment Manufacturing Cloud</p>
          </div>
        </div>

        {/* Tree Menu Navigation */}
        <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto font-sans text-xs select-none">
          {/* 1. ACTIVE ROLE (Top Item matching image) */}
          <div className="mb-2">
            <div
              onClick={() => setShowRoleSelector(prev => !prev)}
              className="group cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Active Role
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate max-w-[145px]">
                    {currentRole?.name || 'Super Admin'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-medium border border-indigo-400/30">
                {currentRoleId === 'super_admin' ? 'ALL' : 'RBAC'}
              </span>
            </div>

            {/* Quick Role Switcher Dropdown */}
            {showRoleSelector && (
              <div className="mt-1.5 p-2 bg-slate-800/95 border border-slate-700 rounded-xl space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Role Simulation:
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRoleId(r.id);
                      setShowRoleSelector(false);
                      setActiveTab('dashboard');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      currentRoleId === r.id
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{r.name}</span>
                    {r.id === 'super_admin' && <span className="text-amber-400 text-xs">★</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. MAIN DASHBOARD */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-400'}`} />
            <span className="tracking-tight text-xs">Main Dashboard</span>
          </button>

          {/* 3. SECTION: ACCOUNTANT */}
          <div className="pt-1">
            <button
              onClick={() => toggleSection('accountant')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="tracking-wide">Accountant</span>
              </div>
              {sectionsOpen.accountant ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sectionsOpen.accountant && (
              <div className="relative ml-5 pl-3 border-l border-dashed border-slate-700 space-y-1 py-1">
                {/* MENU: INCOME */}
                <div>
                  <button
                    onClick={() => toggleSection('income')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'orders'
                        ? 'text-emerald-400 bg-slate-800/70'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Income</span>
                    </div>
                    {sectionsOpen.income ? (
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    )}
                  </button>

                  {/* SUBMENU: ORDER */}
                  {sectionsOpen.income && (
                    <div className="relative ml-4 pl-3 border-l border-dashed border-slate-700/80 space-y-1 py-0.5">
                      <button
                        onClick={() => {
                          if (permissions?.orders) {
                            setActiveTab('orders');
                            setIsMobileOpen(false);
                          }
                        }}
                        disabled={!permissions?.orders}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !permissions?.orders
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : activeTab === 'orders'
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'orders' ? 'text-white' : 'text-slate-400'}`} />
                          <span>Order</span>
                        </div>
                        {stats.activeOrdersCount > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {stats.activeOrdersCount}
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* MENU: EXPENSE */}
                <div>
                  <button
                    onClick={() => toggleSection('expense')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      ['salary', 'purchase', 'office_cost', 'other_expense'].includes(activeTab)
                        ? 'text-rose-400 bg-slate-800/70'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Expense</span>
                    </div>
                    {sectionsOpen.expense ? (
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    )}
                  </button>

                  {/* SUBMENUS: Salary, Order Purchase, Office Cost, Other */}
                  {sectionsOpen.expense && (
                    <div className="relative ml-4 pl-3 border-l border-dashed border-slate-700/80 space-y-1 py-0.5">
                      {/* Salary */}
                      <button
                        onClick={() => {
                          if (permissions?.salary) {
                            setActiveTab('salary');
                            setIsMobileOpen(false);
                          }
                        }}
                        disabled={!permissions?.salary}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !permissions?.salary
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : activeTab === 'salary'
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'salary' ? 'text-white' : 'text-slate-400'}`} />
                          <span>Salary</span>
                        </div>
                        {stats.pendingSalariesCount > 0 && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                            activeTab === 'salary' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {stats.pendingSalariesCount} Due
                          </span>
                        )}
                      </button>

                      {/* Order Purchase */}
                      <button
                        onClick={() => {
                          if (permissions?.purchase) {
                            setActiveTab('purchase');
                            setIsMobileOpen(false);
                          }
                        }}
                        disabled={!permissions?.purchase}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !permissions?.purchase
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : activeTab === 'purchase'
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Truck className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'purchase' ? 'text-white' : 'text-slate-400'}`} />
                          <span>Order Purchase</span>
                        </div>
                        {purchases?.length > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                            activeTab === 'purchase' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {purchases.length}
                          </span>
                        )}
                      </button>

                      {/* Office Cost */}
                      <button
                        onClick={() => {
                          if (permissions?.office_cost) {
                            setActiveTab('office_cost');
                            setIsMobileOpen(false);
                          }
                        }}
                        disabled={!permissions?.office_cost}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !permissions?.office_cost
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : activeTab === 'office_cost'
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'office_cost' ? 'text-white' : 'text-slate-400'}`} />
                          <span>Office Cost</span>
                        </div>
                        {officeCosts?.length > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                            activeTab === 'office_cost' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {officeCosts.length}
                          </span>
                        )}
                      </button>

                      {/* Other */}
                      <button
                        onClick={() => {
                          if (permissions?.other_expense) {
                            setActiveTab('other_expense');
                            setIsMobileOpen(false);
                          }
                        }}
                        disabled={!permissions?.other_expense}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          !permissions?.other_expense
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : activeTab === 'other_expense'
                            ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Layers className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'other_expense' ? 'text-white' : 'text-slate-400'}`} />
                          <span>Other</span>
                        </div>
                        {otherExpenses?.length > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                            activeTab === 'other_expense' ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700'
                          }`}>
                            {otherExpenses.length}
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. SECTION: OPERATION */}
          <div className="pt-1">
            <button
              onClick={() => toggleSection('operation')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="tracking-wide">Operation</span>
              </div>
              {sectionsOpen.operation ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sectionsOpen.operation && (
              <div className="relative ml-5 pl-3 border-l border-dashed border-slate-700 space-y-1 py-1">
                {/* Purchase Unit */}
                <button
                  onClick={() => {
                    if (permissions?.purchase) {
                      setActiveTab('purchase');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.purchase}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.purchase
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'purchase'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'purchase' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Purchase Unit</span>
                  </div>
                </button>

                {/* Production Unit */}
                <button
                  onClick={() => {
                    if (permissions?.production) {
                      setActiveTab('production');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.production}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.production
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'production'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Factory className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'production' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Production Unit</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Floor</span>
                </button>

                {/* Stock (Highlighted with custom look as in user screenshot) */}
                <button
                  onClick={() => {
                    if (permissions?.stock) {
                      setActiveTab('stock');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.stock}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.stock
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'stock'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Boxes className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'stock' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Stock</span>
                  </div>
                  {stats.lowStockCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 text-amber-700">
                      {stats.lowStockCount} Low
                    </span>
                  )}
                </button>

                {/* Warehouse */}
                <button
                  onClick={() => {
                    if (permissions?.warehouse || permissions?.stock) {
                      setActiveTab('warehouse');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.warehouse && !permissions?.stock}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.warehouse && !permissions?.stock
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'warehouse'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Warehouse className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'warehouse' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Warehouse</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Bay/Racks</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. SECTION: OFFICE STAFF */}
          <div className="pt-1">
            <button
              onClick={() => toggleSection('officeStaff')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="tracking-wide">Office Staff</span>
              </div>
              {sectionsOpen.officeStaff ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sectionsOpen.officeStaff && (
              <div className="relative ml-5 pl-3 border-l border-dashed border-slate-700 space-y-1 py-1">
                {/* Employee list */}
                <button
                  onClick={() => {
                    if (permissions?.employee_list) {
                      setActiveTab('employee_list');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.employee_list}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.employee_list
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'employee_list'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'employee_list' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Employee list</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'employee_list' ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {stats.totalEmployees}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* 6. SECTION: GOVERNANCE & ADMIN */}
          <div className="pt-1">
            <button
              onClick={() => toggleSection('governance')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="tracking-wide">Governance & Admin</span>
              </div>
              {sectionsOpen.governance ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {sectionsOpen.governance && (
              <div className="relative ml-5 pl-3 border-l border-dashed border-slate-700 space-y-1 py-1">
                {/* Managing Director */}
                <button
                  onClick={() => {
                    if (permissions?.managing_body) {
                      setActiveTab('managing_body');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.managing_body}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.managing_body
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'managing_body'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'managing_body' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Managing Director</span>
                  </div>
                  <span className="text-[10px] text-indigo-300 font-mono">Board</span>
                </button>

                {/* Shareholder list and Dividends */}
                <button
                  onClick={() => {
                    if (permissions?.shareholders) {
                      setActiveTab('shareholders');
                      setIsMobileOpen(false);
                    }
                  }}
                  disabled={!permissions?.shareholders}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    !permissions?.shareholders
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : activeTab === 'shareholders'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PieChart className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'shareholders' ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">Shareholder list and Dividends</span>
                  </div>
                  <span className="text-[10px] text-purple-300 font-mono">100%</span>
                </button>

                {/* Role Admin Matrics */}
                <button
                  onClick={() => {
                    setActiveTab('roles');
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'roles'
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'roles' ? 'text-white' : 'text-slate-400'}`} />
                    <span>Role Admin Matrics</span>
                  </div>
                  <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.2 rounded font-mono">
                    RBAC
                  </span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Factory Quick Status Footer */}
        <div className="p-3 mx-4 my-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 text-[11px]">Factory Floor Status</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Active & Optimal
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Lines Operating</span>
              <span className="text-slate-200 font-mono">6 of 6 Active</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance Rate</span>
              <span className="text-slate-200 font-mono">
                {Math.round((stats.presentEmployees / (stats.totalEmployees || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
