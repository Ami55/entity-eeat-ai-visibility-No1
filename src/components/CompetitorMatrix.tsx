import React from 'react';
import { CompetitorRow } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';

interface CompetitorMatrixProps {
  competitors: CompetitorRow[];
  brandName: string;
  websiteUrl: string;
}

export default function CompetitorMatrix({ competitors, brandName, websiteUrl }: CompetitorMatrixProps) {
  // Helpers to assign styling based on rating strength (Strong, Moderate, Weak, Missing)
  const getBadgeStyle = (rating: 'Strong' | 'Moderate' | 'Weak' | 'Missing') => {
    switch (rating) {
      case 'Strong':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Moderate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Weak':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden print-card animate-fade-in" id="competitor-comparison-card">
      <div className="p-6 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Competitor Entity & Trust Matrix
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Comparative overview of off-site brand mentions, schema integration depth, and structured authority markers against listed market competitors.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <th className="py-3 px-5">Brand Entity</th>
              <th className="py-3 px-4">Trust Signals</th>
              <th className="py-3 px-4">Author Visibility</th>
              <th className="py-3 px-4">Schema Usage</th>
              <th className="py-3 px-4">Brand Mentions</th>
              <th className="py-3 px-4">Content Depth</th>
              <th className="py-3 px-5">AI Citation Readiness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {/* Primary Checked Website Row */}
            <tr className="bg-purple-50/30 font-semibold border-b-2 border-purple-100">
              <td className="py-4 px-5">
                <span className="text-purple-700 font-bold">{brandName} (Site)</span>
                <span className="block text-[10px] text-purple-500 font-normal font-mono">{websiteUrl.replace(/https?:\/\//, '')}</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-blue-50 text-blue-700 border-blue-100">Moderate</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-amber-50 text-amber-700 border-amber-100">Weak</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-red-50 text-red-700 border-red-100">Missing</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-amber-50 text-amber-700 border-amber-100">Weak</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-blue-50 text-blue-700 border-blue-100">Moderate</span>
              </td>
              <td className="py-4 px-4">
                <span className="inline-block px-2 py-0.5 border text-[10px] rounded font-semibold bg-red-50 text-red-700 border-red-100">Weak</span>
              </td>
            </tr>

            {/* Competitor Listings */}
            {competitors.map((comp, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                <td className="py-3.5 px-5 font-medium text-slate-800">
                  <span>{comp.competitorName}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.trustSignals)}`}>
                    {comp.trustSignals}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.authorVisibility)}`}>
                    {comp.authorVisibility}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.schemaUsage)}`}>
                    {comp.schemaUsage}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.brandMentions)}`}>
                    {comp.brandMentions}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.contentDepth)}`}>
                    {comp.contentDepth}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2 py-0.5 border text-[10px] rounded font-semibold ${getBadgeStyle(comp.aiCitationReadiness)}`}>
                    {comp.aiCitationReadiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5 leading-snug border-t border-slate-100">
        <span className="text-purple-600 font-bold">★ Consultant Insight:</span>
        <span>Competitors with <strong>Strong Schema Usage</strong> and <strong>Strong Brand Mentions</strong> hold a distinct advantage for AI inclusion loops. Resolving marked gaps can facilitate direct citation hijacking over competitor results.</span>
      </div>
    </div>
  );
}
