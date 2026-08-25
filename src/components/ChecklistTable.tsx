import React from 'react';
import { ChecklistRow } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface ChecklistTableProps {
  rows: ChecklistRow[];
}

export default function ChecklistTable({ rows }: ChecklistTableProps) {
  // Helpers to assign semantic color styling based on status strings
  const getStatusStyle = (status: ChecklistRow['status']) => {
    const s = status.toLowerCase();
    if (s.includes('valid') || s.includes('strong')) {
      return {
        bg: 'bg-green-50 text-green-700 border-green-100',
        badge: '●',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline mr-1" />
      };
    } else if (s.includes('partial')) {
      return {
        bg: 'bg-yellow-50 text-yellow-700 border-yellow-100',
        badge: '▲',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 inline mr-1" />
      };
    } else if (s.includes('needs') || s.includes('improvement')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-100',
        badge: '▲',
        icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 inline mr-1" />
      };
    } else {
      return {
        bg: 'bg-red-50 text-red-700 border-red-100',
        badge: '✖',
        icon: <XCircle className="w-3.5 h-3.5 text-red-600 inline mr-1" />
      };
    }
  };

  const getImpactStyle = (impact: string) => {
    const imp = impact.toLowerCase();
    if (imp.includes('high') || imp.includes('strong')) {
      return 'text-red-600 bg-red-50 font-bold';
    }
    if (imp.includes('medium')) {
      return 'text-amber-600 bg-amber-50 font-semibold';
    }
    return 'text-slate-500 bg-slate-50';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden print-card" id="checklist-panel-card">
      <div className="p-6 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-600" />
          E-E-A-T & AI Visibility Snapshot Checklist
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Detailed breakdown of foundational, authorial, leadership, and structured schema markup parameters checked during the audit.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              <th className="py-3 px-5">Area of Analysis</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Impact</th>
              <th className="py-3 px-5">Strategic Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {rows.map((row, index) => {
              const statusCfg = getStatusStyle(row.status);
              return (
                <tr key={index} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    {row.area}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-semibold rounded-md ${statusCfg.bg}`}>
                      {statusCfg.icon}
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${getImpactStyle(row.impact)}`}>
                      {row.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 leading-relaxed font-sans max-w-sm">
                    {row.recommendation}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
