import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  Users
} from 'lucide-react';

export const EmployeeAttendance = () => {
  const {
    attendance,
    logAttendance,
    employees,
    permissions,
    stats
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Attendance update modal
  const [attendanceModalEmp, setAttendanceModalEmp] = useState(null);
  const [attForm, setAttForm] = useState({
    checkIn: '08:00 AM',
    checkOut: '06:30 PM',
    overtimeHours: 2.0,
    status: 'Present'
  });

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    if (!attendanceModalEmp) return;

    logAttendance(
      attendanceModalEmp.id,
      attForm.checkIn,
      attForm.checkOut,
      attForm.overtimeHours,
      attForm.status
    );
    setAttendanceModalEmp(null);
  };

  const filteredAttendance = attendance.filter(att => {
    const matchesSearch =
      att.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      att.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || att.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-indigo-600" />
            Employee Daily Attendance & Overtime Register
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time shift check-in, check-out, absenteeism tracking, and automatic overtime hours & payout calculations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-2xs">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>Shift Register: <strong>Today (Shift A - Day)</strong></span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Present Today</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {stats.presentEmployees}{' '}
            <span className="text-xs font-normal text-slate-400">/ {stats.totalEmployees}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Floor capacity: {Math.round((stats.presentEmployees / (stats.totalEmployees || 1)) * 100)}%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-rose-500 uppercase">Absent Today</p>
          <p className="text-2xl font-black text-rose-600 mt-1">{stats.absentEmployees}</p>
          <p className="text-[11px] text-slate-400 mt-1">Unexcused or leave</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Total Overtime Hours</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalOtHours} hrs</p>
          <p className="text-[11px] text-slate-400 mt-1">Logged across lines today</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Today's OT Cash Payout</p>
          <p className="text-2xl font-black text-slate-900 mt-1">৳{stats.totalOvertimeCost.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Auto-added to daily expense</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee name, ID, or line..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Attendance Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Daily Floor Attendance & Overtime Calculation Table
            </h3>
            <p className="text-[11px] text-slate-500">
              Formula: <code>Overtime Payment = Overtime Hours × Employee Hourly Rate</code>
            </p>
          </div>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/50">
            Auto Payroll Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4">Check-Out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Overtime (Hrs)</th>
                <th className="py-3 px-4">OT Payout (TK)</th>
                <th className="py-3 px-4 text-right">Floor Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAttendance.map(att => {
                const emp = employees.find(e => e.id === att.employeeId);

                return (
                  <tr key={att.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {att.employeeId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {att.employeeName}
                      <span className="block text-[11px] font-normal text-slate-500">
                        {att.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {att.checkIn}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {att.checkOut}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          att.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : att.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {att.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {att.overtimeHours > 0 ? `${att.overtimeHours} hrs` : '--'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                      {att.otPayment > 0 ? `৳${att.otPayment.toLocaleString()}` : '৳0'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {permissions?.canEditEmployees && (
                        <button
                          onClick={() => {
                            setAttendanceModalEmp(emp || { id: att.employeeId, name: att.employeeName, hourlyOtRate: 200 });
                            setAttForm({
                              checkIn: att.checkIn !== '--' ? att.checkIn : '08:00 AM',
                              checkOut: att.checkOut !== '--' ? att.checkOut : '06:00 PM',
                              overtimeHours: att.overtimeHours || 1.5,
                              status: att.status === 'Absent' ? 'Present' : att.status
                            });
                          }}
                          className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
                        >
                          Update Check-in / OT
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

      {/* QUICK ATTENDANCE & OVERTIME LOGGING MODAL */}
      {attendanceModalEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Update Attendance & Overtime</h3>
                <p className="text-xs text-indigo-600 font-semibold">
                  {attendanceModalEmp.name} ({attendanceModalEmp.id})
                </p>
              </div>
              <button
                onClick={() => setAttendanceModalEmp(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAttendanceSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attendance Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Present', 'Late', 'Absent'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setAttForm({ ...attForm, status: st })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        attForm.status === st
                          ? st === 'Present'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : st === 'Late'
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {attForm.status !== 'Absent' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Check-In Time
                      </label>
                      <input
                        type="text"
                        value={attForm.checkIn}
                        onChange={(e) => setAttForm({ ...attForm, checkIn: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Check-Out Time
                      </label>
                      <input
                        type="text"
                        value={attForm.checkOut}
                        onChange={(e) => setAttForm({ ...attForm, checkOut: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
                    <label className="block text-xs font-bold text-indigo-900 mb-1">
                      Overtime Hours (Logged Today)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={attForm.overtimeHours}
                      onChange={(e) => setAttForm({ ...attForm, overtimeHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none font-bold text-indigo-900"
                    />

                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-indigo-200/50">
                      <span className="text-slate-600">Calculated OT Payment:</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        ৳{Math.round((attForm.overtimeHours || 0) * (attendanceModalEmp.hourlyOtRate || 200)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAttendanceModalEmp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Save Attendance Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
