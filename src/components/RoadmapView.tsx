import React from 'react';
import { RoadmapPhase } from '../types';
import { Calendar, CheckCircle, TrendingUp, Cpu } from 'lucide-react';

interface RoadmapViewProps {
  phase1: RoadmapPhase;
  phase2: RoadmapPhase;
  phase3: RoadmapPhase;
}

export default function RoadmapView({ phase1, phase2, phase3 }: RoadmapViewProps) {
  const phases = [
    {
      data: phase1,
      num: "01",
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      tagColor: "bg-purple-100 text-purple-700",
      accentBorder: "border-purple-400"
    },
    {
      data: phase2,
      num: "02",
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      tagColor: "bg-blue-100 text-blue-700",
      accentBorder: "border-blue-400"
    },
    {
      data: phase3,
      num: "03",
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      tagColor: "bg-emerald-100 text-emerald-700",
      accentBorder: "border-emerald-400"
    }
  ];

  return (
    <div className="space-y-6 print-card" id="roadmap-snapshot-panel">
      <div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          🎯 E-E-A-T Growth & Entity Roadmap
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          A prioritized 30/60/90-day consulting Action Plan to secure your site rankings and build search and AI citation engine authority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases.map((phase, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-extrabold text-slate-100 select-none">
              {phase.num}
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                  {phase.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-none">{phase.data.title || `Phase ${i+1}`}</h4>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${phase.tagColor}`}>
                    {phase.data.timeline}
                  </span>
                </div>
              </div>

              <div className="h-0.5 w-full bg-slate-100">
                <div className={`h-full w-2/3 rounded bg-gradient-to-r ${phase.num === "01" ? "from-purple-500 to-purple-400" : phase.num === "02" ? "from-blue-500 to-blue-400" : "from-emerald-500 to-emerald-400"}`}></div>
              </div>

              <ul className="space-y-3 pt-2 text-xs text-slate-600">
                {phase.data.items && phase.data.items.slice(0, 4).map((item, index) => (
                  <li key={index} className="flex gap-2.5 leading-relaxed">
                    <span className="mt-0.5 text-purple-600 shrink-0 select-none">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-semibold tracking-wide flex items-center justify-between">
              <span>ESTIMATED DURATION: {phase.data.timeline}</span>
              <span>PRIORITY ACTION</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
