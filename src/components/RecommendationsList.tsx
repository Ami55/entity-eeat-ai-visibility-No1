import React, { useState, useMemo } from 'react';
import { RecommendationItem } from '../types';
import { ShieldCheck, HelpCircle, ArrowUpCircle, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface RecommendationsListProps {
  items: RecommendationItem[];
}

export default function RecommendationsList({ items }: RecommendationsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Derive all unique categories available for filter buttons
  const categories = useMemo(() => {
    const list = new Set(['All']);
    items.forEach(it => {
      if (it.category) list.add(it.category);
    });
    return Array.from(list);
  }, [items]);

  // Handle priority impacts sequence ordering: High -> Medium -> Low
  const priorityScore = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const filteredItems = useMemo(() => {
    return items
      .filter(it => {
        const matchesCategory = categoryFilter === 'All' || it.category === categoryFilter;
        const matchesSearch = it.recommendation.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              it.whyItMatters.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => priorityScore(b.impact) - priorityScore(a.impact));
  }, [items, categoryFilter, searchTerm]);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'low': return 'bg-green-50 text-green-700';
      case 'medium': return 'bg-blue-50 text-blue-700';
      default: return 'bg-purple-50 text-purple-700';
    }
  };

  return (
    <div className="space-y-6 print-card" id="recommendations-container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-purple-600 w-5 h-5 animate-pulse" />
            10 Priority Recommendations Action Plan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Sortable, curated strategic changes required to align page elements with organic schema requirements and AI crawler readability.
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all bg-white"
            placeholder="Search recommendations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide mr-2 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filters:
        </span>
        {categories.map((cat, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              categoryFilter === cat 
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3" id="recommendations-list">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/55 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">No recommendations match your active filter tags.</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
              className="text-xs font-bold text-purple-600 mt-2 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((it, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border rounded-2xl transition-all ${
                  isExpanded ? 'border-purple-200 shadow-sm ring-1 ring-purple-50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className="p-4 md:p-5 flex items-start gap-4 cursor-pointer select-none"
                >
                  <div className="p-2 md:p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-purple-600 font-mono text-sm font-extrabold shrink-0 mt-0.5">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1.5">
                      <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {it.category}
                      </span>
                      <span className={`border text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getImpactBadge(it.impact)}`}>
                        IMPACT: {it.impact}
                      </span>
                      <span className="text-slate-400 text-[10px] font-sans font-medium flex items-center gap-1">
                        ⏱ {it.timeline}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 leading-snug tracking-tight">
                      {it.recommendation}
                    </h4>
                  </div>

                  <button className="text-slate-400 shrink-0 self-center">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-50 text-xs text-slate-600 space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px] mb-1 flex items-center gap-1">
                        <ArrowUpCircle className="w-3.5 h-3.5 text-purple-600" />
                        Strategic Significance
                      </p>
                      <p className="leading-relaxed text-slate-600">
                        {it.whyItMatters}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-400 font-medium">
                      <span>TIMELINE: <strong className="text-slate-700">{it.timeline}</strong></span>
                      <span>DIFFICULTY: <strong className={`px-1.5 py-0.5 rounded text-[10px] ${getDifficultyBadge(it.difficulty)}`}>{it.difficulty}</strong></span>
                      <span>CATEGORY NODE: <strong className="text-slate-700">{it.category}</strong></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
