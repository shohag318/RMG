import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Lock,
  UserCheck,
  Key,
  Users,
  Building,
  Boxes,
  ShoppingBag,
  Factory,
  PieChart,
  Truck,
  CreditCard,
  Briefcase,
  History,
  CalendarCheck
} from 'lucide-react';

export const AccessControlGuide = () => {
  const { currentRoleId, setCurrentRoleId, roles } = useERP();

  // Exactly matching the 12 modules
  const matrix = [
    {
      module: '1. Main Dashboard Overview',
      superAdmin: true,
      hr: true,
      inventory: true,
      production: true,
      accounts: true,
      shareholder: true
    },
    {
      module: '2. Order (Creation & Pricing)',
      superAdmin: true,
      hr: false,
      inventory: false,
      production: false,
      accounts: true,
      shareholder: false
    },
    {
      module: '3. Payment History & Ledger',
      superAdmin: true,
      hr: false,
      inventory: false,
      production: false,
      accounts: true,
      shareholder: true
    },
    {
      module: '4. Purchase (Raw Material POs)',
      superAdmin: true,
      hr: false,
      inventory: true,
      production: true,
      accounts: true,
      shareholder: false
    },
    {
      module: '5. Production Floor & Usage',
      superAdmin: true,
      hr: false,
      inventory: false,
      production: true,
      accounts: false,
      shareholder: false
    },
    {
      module: '6. Stock (Inventory & Restock)',
      superAdmin: true,
      hr: false,
      inventory: true,
      production: true,
      accounts: false,
      shareholder: false
    },
    {
      module: '7. Employee List & Profiles',
      superAdmin: true,
      hr: true,
      inventory: false,
      production: false,
      accounts: false,
      shareholder: false
    },
    {
      module: '8. Employee Attendance & OT',
      superAdmin: true,
      hr: true,
      inventory: false,
      production: false,
      accounts: false,
      shareholder: false
    },
    {
      module: '9. Salary (Payroll & Payslips)',
      superAdmin: true,
      hr: true,
      inventory: false,
      production: false,
      accounts: true,
      shareholder: false
    },
    {
      module: '10. Managing Body (Governance)',
      superAdmin: true,
      hr: false,
      inventory: false,
      production: false,
      accounts: false,
      shareholder: true
    },
    {
      module: '11. Shareholder List & Dividends',
      superAdmin: true,
      hr: false,
      inventory: false,
      production: false,
      accounts: false,
      shareholder: true
    },
    {
      module: '12. Role Access Matrix',
      superAdmin: true,
      hr: true,
      inventory: true,
      production: true,
      accounts: true,
      shareholder: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          Role-Based Access Control (RBAC) System
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Segregation of duties between Super Administrator and departmental Section Staff across all 12 operational modules.
        </p>
      </div>

      {/* Interactive Role Switcher Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Simulate User Perspective (Click to Test Live)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map(r => {
            const isSelected = currentRoleId === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setCurrentRoleId(r.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{r.name}</span>
                  {isSelected ? (
                    <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Switch &rarr;</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {r.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Permission Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            12-Module Enterprise Access Matrix
          </h3>
          <p className="text-[11px] text-slate-500">
            Explicit access grants for each module based on operational department.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-200 text-[11px] font-bold text-slate-600">
                <th className="py-3 px-4">Operational Module</th>
                <th className="py-3 px-3 text-center">Super Admin</th>
                <th className="py-3 px-3 text-center">HR Admin</th>
                <th className="py-3 px-3 text-center">Inventory Mgr</th>
                <th className="py-3 px-3 text-center">Production Mgr</th>
                <th className="py-3 px-3 text-center">Accounts & Sales</th>
                <th className="py-3 px-3 text-center">Shareholder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrix.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {row.module}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex justify-center text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.hr ? (
                      <span className="inline-flex justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex justify-center text-slate-300">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.inventory ? (
                      <span className="inline-flex justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex justify-center text-slate-300">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.production ? (
                      <span className="inline-flex justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex justify-center text-slate-300">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.accounts ? (
                      <span className="inline-flex justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex justify-center text-slate-300">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.shareholder ? (
                      <span className="inline-flex justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex justify-center text-slate-300">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
