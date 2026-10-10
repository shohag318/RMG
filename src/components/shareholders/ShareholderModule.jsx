import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  PieChart,
  TrendingUp,
  Percent,
  CheckCircle2,
  Calendar,
  Building,
  UserCheck,
  FileSpreadsheet,
  Coins,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ShareholderModule = () => {
  const {
    shareholders,
    dividendHistory,
    calculateDividends,
    disburseDividend,
    permissions,
    stats
  } = useERP();

  // Profit Simulation Inputs
  const [companyProfit, setCompanyProfit] = useState(480000);
  const [retainedReservePct, setRetainedReservePct] = useState(25); // 25% kept for growth
  const [periodLabel, setPeriodLabel] = useState('Q3 2026 Fiscal Dividend');
  const [disbursementSuccess, setDisbursementSuccess] = useState(false);

  // Live calculation
  const dividendCalc = calculateDividends(companyProfit, retainedReservePct);

  const handleDisburse = () => {
    disburseDividend(dividendCalc, periodLabel);
    setDisbursementSuccess(true);
    setTimeout(() => setDisbursementSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <PieChart className="w-6 h-6 text-indigo-600" />
            Shareholder & Management Module
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Managing board profiles, equity capitalization, automated dividend distribution formulas, and audited disbursement logs.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-900 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Total Equity: 100.0% Distributed</span>
        </div>
      </div>

      {/* Shareholder Profiles Grid (Module 8 requirement) */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Managing Members & Shareholder Capital Profiles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shareholders.map(sh => (
            <div
              key={sh.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <img
                    src={sh.avatar}
                    alt={sh.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 shadow-xs"
                  />
                  <span className="text-sm font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl">
                    {sh.equitySharePercent}%
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {sh.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-medium mt-0.5">{sh.role}</p>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Initial Capital:</span>
                    <span className="font-mono font-bold text-slate-800">
                      ৳{sh.totalInvestment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dividends Paid:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      ৳{sh.dividendsWithdrawn.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono truncate">
                {sh.bankAccount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AUTOMATED DIVIDEND CALCULATION ENGINE (Module 8 requirement) */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2 border border-indigo-400/30">
                <Coins className="w-3.5 h-3.5" />
                Automated Dividend Distribution Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">
                Profit Sharing & Dividend Simulator
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Set company net profit and retained reserve percentage. The system dynamically computes each shareholder's exact payout based on their registered equity stake.
              </p>
            </div>

            {/* Action button */}
            <div className="shrink-0">
              <button
                onClick={handleDisburse}
                disabled={!permissions.canDisburseDividends && permissions.currentRoleId !== 'super_admin'}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Declare & Disburse Dividends
              </button>
            </div>
          </div>

          {disbursementSuccess && (
            <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Dividend declared and successfully recorded to the ledger and shareholder balances!
            </div>
          )}

          {/* Calculator Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Total Company Net Profit (TK)
              </label>
              <input
                type="number"
                step="50000"
                value={companyProfit}
                onChange={(e) => setCompanyProfit(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-xl text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-[10px] text-slate-400 mt-1.5">
                From export contracts after deducting labor & overhead
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Retained Earnings Reserve (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={retainedReservePct}
                  onChange={(e) => setRetainedReservePct(parseFloat(e.target.value) || 0)}
                  className="flex-1 accent-indigo-400 cursor-pointer"
                />
                <span className="font-mono font-bold text-indigo-300 text-sm w-12 text-right">
                  {retainedReservePct}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Reserved for factory upgrades: <strong className="text-white">৳{dividendCalc.retainedAmount.toLocaleString()}</strong>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Fiscal Period Label
              </label>
              <input
                type="text"
                value={periodLabel}
                onChange={(e) => setPeriodLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-[10px] text-slate-400 mt-1.5">
                Appears on distribution vouchers
              </p>
            </div>
          </div>

          {/* Real-time Share Distribution Grid */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-slate-300">
                Total Distributable Dividend Pool:
              </span>
              <span className="text-xl font-black font-mono text-emerald-400">
                ৳{dividendCalc.distributablePool.toLocaleString()} TK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {dividendCalc.allocations.map(alloc => (
                <div
                  key={alloc.id}
                  className="bg-white/10 p-3.5 rounded-xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-white truncate max-w-[140px]">
                        {alloc.name.split(' ')[0]}
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-300">
                        {alloc.equitySharePercent}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{alloc.role}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10">
                    <span className="text-[10px] text-slate-400 block">Payout Amount:</span>
                    <span className="text-base font-black font-mono text-emerald-300">
                      ৳{alloc.dividendAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDEND DISBURSEMENT AUDIT HISTORY */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Historical Dividend Declarations & Distributions
          </h3>
          <p className="text-[11px] text-slate-500">
            Immutable log of all dividend tranches distributed to shareholders.
          </p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {dividendHistory.map((rec, i) => (
            <div key={i} className="p-5 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {rec.period}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {rec.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Declared Date: {rec.declaredDate} &bull; Company Net Profit: ৳{rec.totalCompanyNetProfit.toLocaleString()} &bull; Retained Reserve: {rec.retainedReservePercent}%
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-400 block">Total Pool Distributed:</span>
                  <span className="text-base font-black font-mono text-indigo-600">
                    ৳{rec.distributablePool.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Allocation pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
                {rec.allocations.map((a, j) => (
                  <div key={j} className="bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                    <p className="font-semibold text-slate-800 truncate">{a.shareholder}</p>
                    <p className="text-indigo-600 font-mono font-bold mt-0.5">
                      ৳{a.amount.toLocaleString()} ({a.share}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
