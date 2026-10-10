import React, { useState } from 'react';
import { ERPProvider, useERP } from './context/ERPContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// 12 Redesigned Operational Modules (User Request)
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { OrderManagement } from './components/orders/OrderManagement';
import { PaymentHistory } from './components/orders/PaymentHistory';
import { PurchaseManagement } from './components/purchase/PurchaseManagement';
import { ProductionFloor } from './components/production/ProductionFloor';
import { StockManagement } from './components/inventory/StockManagement';
import { InventoryManagement } from './components/inventory/InventoryManagement';
import { EmployeeList } from './components/employees/EmployeeList';
import { EmployeeAttendance } from './components/employees/EmployeeAttendance';
import { SalaryManagement } from './components/salary/SalaryManagement';
import { OfficeCostManagement } from './components/accounting/OfficeCostManagement';
import { OtherExpenseManagement } from './components/accounting/OtherExpenseManagement';
import { ManagingBody } from './components/management/ManagingBody';
import { ShareholderDividends } from './components/shareholders/ShareholderDividends';
import { AccessControlGuide } from './components/roles/AccessControlGuide';

const MainLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { activeTab, setActiveTab, permissions, currentRole } = useERP();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OverviewDashboard />;
      case 'orders':
        return permissions?.orders ? <OrderManagement /> : <PermissionDeniedFallback />;
      case 'payment_history':
        return permissions?.payment_history ? <PaymentHistory /> : <PermissionDeniedFallback />;
      case 'purchase':
        return permissions?.purchase ? <PurchaseManagement /> : <PermissionDeniedFallback />;
      case 'production':
        return permissions?.production ? <ProductionFloor /> : <PermissionDeniedFallback />;
      case 'stock':
        return permissions?.stock ? <StockManagement /> : <PermissionDeniedFallback />;
      case 'warehouse':
        return permissions?.warehouse ? <InventoryManagement /> : <PermissionDeniedFallback />;
      case 'employee_list':
        return permissions?.employee_list ? <EmployeeList /> : <PermissionDeniedFallback />;
      case 'attendance':
        return permissions?.attendance ? <EmployeeAttendance /> : <PermissionDeniedFallback />;
      case 'salary':
        return permissions?.salary ? <SalaryManagement /> : <PermissionDeniedFallback />;
      case 'office_cost':
        return permissions?.office_cost ? <OfficeCostManagement /> : <PermissionDeniedFallback />;
      case 'other_expense':
        return permissions?.other_expense ? <OtherExpenseManagement /> : <PermissionDeniedFallback />;
      case 'managing_body':
        return permissions?.managing_body ? <ManagingBody /> : <PermissionDeniedFallback />;
      case 'shareholders':
        return permissions?.shareholders ? <ShareholderDividends /> : <PermissionDeniedFallback />;
      case 'roles':
        return <AccessControlGuide />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/80 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setIsMobileOpen={setIsMobileOpen} />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const PermissionDeniedFallback = () => {
  const { currentRole, setActiveTab } = useERP();

  return (
    <div className="min-h-[500px] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-lg font-black text-slate-900">Restricted Section</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Your current role (<strong className="text-indigo-600 font-bold">{currentRole?.name || 'Staff'}</strong>) does not have authorization to view or edit this operational module.
        </p>
        <p className="text-[11px] text-slate-400 mt-2">
          Use the role switcher in the top bar to switch to <strong>Super Admin</strong> or the designated section administrator.
        </p>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="mt-6 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 max-w-lg w-full">
            <h2 className="text-xl font-bold text-rose-400">Application Error Encountered</h2>
            <p className="text-xs text-slate-300 mt-2 font-mono bg-slate-950 p-3 rounded-xl text-left overflow-x-auto">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-md"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ERPProvider>
        <MainLayout />
      </ERPProvider>
    </ErrorBoundary>
  );
}
