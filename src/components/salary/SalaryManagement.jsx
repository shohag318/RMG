import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  CreditCard,
  Search,
  Filter,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  Scissors,
  FileCheck,
  Send,
  Download,
  AlertCircle
} from 'lucide-react';

export const SalaryManagement = () => {
  const {
    salaries,
    processSalaryPayment,
    processAllPendingSalaries,
    permissions,
    stats
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [activePayslipModal, setActivePayslipModal] = useState(null);

  const filteredSalaries = salaries.filter(sal => {
    const matchesSearch =
      sal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sal.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sal.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || sal.status === selectedStatus;
    const matchesDept = selectedDept === 'All' || sal.department === selectedDept;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const totalPayrollGross = salaries.reduce((sum, s) => sum + (s.grossSalary || 0), 0);
  const totalPayrollNet = salaries.reduce((sum, s) => sum + (s.netSalary || 0), 0);
  const totalPaidNet = salaries.filter(s => s.status === 'Paid').reduce((sum, s) => sum + (s.netSalary || 0), 0);
  const totalPendingNet = salaries.filter(s => s.status === 'Pending').reduce((sum, s) => sum + (s.netSalary || 0), 0);
  const totalOvertimePaid = salaries.reduce((sum, s) => sum + (s.overtimePay || 0), 0);

  const handlePrintPayslip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            Salary Management & Payroll Processing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Worker salary sheets, automatic overtime inclusion, provident fund deductions, monthly disbursement, and official payslips.
          </p>
        </div>

        {permissions?.canProcessSalary && stats.pendingSalariesCount > 0 && (
          <button
            onClick={processAllPendingSalaries}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto"
          >
            <CheckCircle2 className="w-4 h-4" />
            Disburse All Pending Salaries ({stats.pendingSalariesCount})
          </button>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Net Payroll (Sep 2026)</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ৳{totalPayrollNet.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Gross: ৳{totalPayrollGross.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Disbursed / Paid</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            ৳{totalPaidNet.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {salaries.filter(s => s.status === 'Paid').length} of {salaries.length} staff paid
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Pending Payroll Due</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            ৳{totalPendingNet.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {stats.pendingSalariesCount} workers awaiting payout
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Overtime Integrated</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ৳{totalOvertimePaid.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">From daily shift logs</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee, ID, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Payroll Statuses</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending Only</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Departments</option>
            <option value="Cutting">Cutting</option>
            <option value="Sewing">Sewing</option>
            <option value="Finishing">Finishing</option>
            <option value="Quality Control">Quality Control</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Department & Type</th>
                <th className="py-3 px-4">Base Salary (TK)</th>
                <th className="py-3 px-4">OT Pay (Hours)</th>
                <th className="py-3 px-4">Allowance</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Payable (TK)</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSalaries.map(sal => (
                <tr key={sal.payrollId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                    {sal.employeeId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{sal.employeeName}</p>
                    <p className="text-[11px] text-slate-400">{sal.designation}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{sal.department}</p>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                        sal.type === 'Permanent' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {sal.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    ৳{sal.baseSalary.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-indigo-600">+৳{sal.overtimePay.toLocaleString()}</span>
                    <span className="block text-[10px] text-slate-400">({sal.overtimeHours} hrs)</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    +৳{sal.attendanceAllowance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-rose-500">
                    -৳{sal.deductions.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                    ৳{sal.netSalary.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    {sal.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                    {sal.disbursedDate !== '--' && (
                      <span className="block text-[10px] font-mono text-slate-400 mt-0.5">{sal.disbursedDate}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {permissions?.canProcessSalary && sal.status === 'Pending' && (
                        <button
                          onClick={() => processSalaryPayment(sal.payrollId)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] transition-colors"
                        >
                          Disburse Pay
                        </button>
                      )}

                      <button
                        onClick={() => setActivePayslipModal(sal)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition-colors flex items-center gap-1"
                      >
                        <Printer className="w-3 h-3" />
                        Payslip
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYSLIP PRINTABLE MODAL */}
      {activePayslipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 relative animate-in fade-in zoom-in-95 print:p-0 print:border-none print:shadow-none">
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Monthly Staff Payslip Voucher
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPayslip}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  Print Payslip / PDF
                </button>
                <button
                  onClick={() => setActivePayslipModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Printable Payslip Sheet */}
            <div className="mt-4 print:mt-0 p-6 rounded-2xl bg-white border border-slate-200 print:border-none">
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 tracking-tight">
                      RGM APPAREL GROUP LTD.
                    </h2>
                    <p className="text-[10px] text-slate-500">
                      EPZ Manufacturing Division &bull; Staff Monthly Pay Advice
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                    {activePayslipModal.month}
                  </span>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">Ref: {activePayslipModal.payrollId}</p>
                </div>
              </div>

              {/* Employee Info Grid */}
              <div className="grid grid-cols-2 gap-4 my-4 p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Employee Name & ID</p>
                  <p className="font-bold text-slate-900 mt-0.5">{activePayslipModal.employeeName}</p>
                  <p className="font-mono text-indigo-600 font-semibold text-[11px]">{activePayslipModal.employeeId}</p>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Designation & Department</p>
                  <p className="font-bold text-slate-800 mt-0.5">{activePayslipModal.designation}</p>
                  <p className="text-slate-500 text-[11px]">{activePayslipModal.department} ({activePayslipModal.type})</p>
                </div>
              </div>

              {/* Earnings & Deductions Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Base Salary:</span>
                  <span className="font-mono font-semibold text-slate-800">৳{activePayslipModal.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Overtime Earnings ({activePayslipModal.overtimeHours} hrs @ ৳{activePayslipModal.hourlyOtRate}/hr):</span>
                  <span className="font-mono font-semibold text-emerald-600">+৳{activePayslipModal.overtimePay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Attendance & Performance Allowance:</span>
                  <span className="font-mono font-semibold text-emerald-600">+৳{activePayslipModal.attendanceAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Tax & Provident Fund Deductions:</span>
                  <span className="font-mono font-semibold text-rose-500">-৳{activePayslipModal.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2.5 bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-sm font-bold">
                  <span className="text-indigo-950">Net Take-Home Salary:</span>
                  <span className="font-mono font-black text-indigo-900 text-base">
                    ৳{activePayslipModal.netSalary.toLocaleString()} TK
                  </span>
                </div>
              </div>

              {/* Signatures */}
              <div className="flex items-end justify-between mt-10 pt-4 border-t border-dashed border-slate-300 text-xs">
                <div>
                  <div className="w-24 border-b border-slate-400 mb-1"></div>
                  <p className="text-[10px] text-slate-500">HR & Accounts Officer</p>
                </div>
                <div className="text-center text-[9px] uppercase font-bold text-slate-400">
                  Paid via: {activePayslipModal.paymentMethod}
                </div>
                <div className="text-right">
                  <div className="w-24 border-b border-slate-400 mb-1 ml-auto"></div>
                  <p className="text-[10px] text-slate-500">Employee Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
