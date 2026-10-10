import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Briefcase,
  ShieldCheck,
  Award,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Users,
  Vote,
  FileText
} from 'lucide-react';

export const ManagingBody = () => {
  const { managingBody } = useERP();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" />
            Managing Body & Board of Governance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Executive leadership, Board of Directors, governance committees, compliance officers, and organizational mandates.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-900 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Board Quorum: 100% Active</span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Board & Officers</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{managingBody.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Executive & independent directors</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Governance Committees</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">5</p>
          <p className="text-[11px] text-slate-400 mt-1">Audit, ESG, Plant, Compliance</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Compliance Standard</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">ISO 9001</p>
          <p className="text-[11px] text-slate-400 mt-1">OEKO-TEX & WRAP Certified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">Strategic Focus</p>
          <p className="text-2xl font-black text-slate-900 mt-1">LEED Plat.</p>
          <p className="text-[11px] text-slate-400 mt-1">Automation & Green Factory</p>
        </div>
      </div>

      {/* Managing Body Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {managingBody.map(member => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-50 shadow-xs"
                />
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                    {member.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-mono">
                    Vote: <strong className="text-slate-700">{member.votingPower}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  {member.designation}
                </p>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Assigned Committee</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{member.committee}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Credentials & Background</span>
                  <p className="text-slate-700">{member.qualification}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed italic">
                "{member.bio}"
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0 font-mono">Since {member.appointedDate.split('-')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
