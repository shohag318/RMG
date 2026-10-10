import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Briefcase,
  FileText,
  Calendar,
  ChevronRight,
  ShieldAlert,
  Phone,
  Mail
} from 'lucide-react';

export const EmployeeList = () => {
  const {
    employees,
    addEmployee,
    permissions
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All'); // 'All', 'Permanent', 'Temporary'
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Modals & Drawers
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployeeProfile, setSelectedEmployeeProfile] = useState(null);

  // Form State for Adding Employee
  const [newEmpForm, setNewEmpForm] = useState({
    name: '',
    designation: '',
    department: 'Cutting',
    type: 'Permanent',
    phone: '',
    email: '',
    salary: 30000,
    hourlyOtRate: 200,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    if (!newEmpForm.name || !newEmpForm.designation) return;

    addEmployee(newEmpForm);
    setShowAddModal(false);
    setNewEmpForm({
      name: '',
      designation: '',
      department: 'Cutting',
      type: 'Permanent',
      phone: '',
      email: '',
      salary: 30000,
      hourlyOtRate: 200,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    });
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || emp.type === selectedType;
    const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Employee List & Staff Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete staff roster, automated unique IDs (EMP-2026-xxx), Permanent vs Temporary categorization, and work history tracking.
          </p>
        </div>

        {permissions?.canEditEmployees && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            Enrol Staff (Auto-ID)
          </button>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Workforce</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{employees.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Active factory employees</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Permanent Staff</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {employees.filter(e => e.type === 'Permanent').length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Full-time line leads & staff</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Temporary / Contract</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {employees.filter(e => e.type === 'Temporary').length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Seasonal cutters & packaging</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Departments</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">6</p>
          <p className="text-[11px] text-slate-400 mt-1">Cutting, Sewing, QC, Finishing</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee name, ID, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Employee Type Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
            >
              <option value="All">All Types (Permanent & Temp)</option>
              <option value="Permanent">Permanent Staff</option>
              <option value="Temporary">Temporary / Contract</option>
            </select>
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
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

      {/* Employee List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Category Type</th>
                <th className="py-3 px-4">Base Salary (TK)</th>
                <th className="py-3 px-4">OT Rate/Hr (TK)</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-right">Work History & Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    No employees found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {emp.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{emp.name}</p>
                          <p className="text-[11px] text-slate-500">{emp.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          emp.type === 'Permanent'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {emp.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      ৳{emp.salary.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      ৳{emp.hourlyOtRate}/hr
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                      {emp.phone || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedEmployeeProfile(emp)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Profile &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD NEW EMPLOYEE WITH AUTO-GENERATED ID */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Enrol New Staff Member</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  ID will be auto-generated: EMP-2026-00{employees.length + 1}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Anisur Rahman"
                  value={newEmpForm.name}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sewing Machine Operator"
                    value={newEmpForm.designation}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, designation: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={newEmpForm.department}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Cutting">Cutting</option>
                    <option value="Sewing">Sewing</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Accounts">Accounts</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              {/* Categorize as Permanent or Temporary */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Employee Category *
                  </label>
                  <select
                    value={newEmpForm.type}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, type: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-semibold text-indigo-700"
                  >
                    <option value="Permanent">Permanent Employee</option>
                    <option value="Temporary">Temporary / Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Salary (TK) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newEmpForm.salary}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, salary: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hourly Overtime Rate (TK)
                  </label>
                  <input
                    type="number"
                    value={newEmpForm.hourlyOtRate}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, hourlyOtRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+880 1700-000000"
                    value={newEmpForm.phone}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
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
                  Generate ID & Enrol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: COMPLETE EMPLOYEE WORK HISTORY PROFILE */}
      {selectedEmployeeProfile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {selectedEmployeeProfile.id}
                </span>
                <button
                  onClick={() => setSelectedEmployeeProfile(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 text-center">
                <img
                  src={selectedEmployeeProfile.avatar}
                  alt={selectedEmployeeProfile.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-indigo-50 shadow-md"
                />
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {selectedEmployeeProfile.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedEmployeeProfile.designation}</p>
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800">
                  {selectedEmployeeProfile.type} Staff
                </span>
              </div>

              <div className="mt-6 space-y-2.5 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800">{selectedEmployeeProfile.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Joining Date:</span>
                  <span className="font-mono text-slate-800">{selectedEmployeeProfile.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Compensation:</span>
                  <span className="font-mono font-bold text-slate-900">৳{selectedEmployeeProfile.salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Overtime Rate:</span>
                  <span className="font-mono text-indigo-600 font-bold">৳{selectedEmployeeProfile.hourlyOtRate}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Phone:</span>
                  <span className="text-slate-800">{selectedEmployeeProfile.phone || 'N/A'}</span>
                </div>
              </div>

              {/* Work History */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Work History & Activity Milestones
                </h4>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedEmployeeProfile.workHistory?.map((h, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
                      <p className="text-[11px] font-mono text-indigo-600 font-semibold">{h.date}</p>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{h.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEmployeeProfile(null)}
              className="mt-6 w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
