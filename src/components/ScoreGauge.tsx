import React from 'react';

interface ScoreGaugeProps {
  overallScore: number;
  snapshotScore: number;
}

export default function ScoreGauge({ overallScore, snapshotScore }: ScoreGaugeProps) {
  const maxScore = 500;
  const percentage = (overallScore / maxScore) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine active color theme based on score thresholds
  let scoreColorClass = "text-purple-600 stroke-purple-600";
  let bgFillClass = "bg-purple-50 text-purple-700";
  let levelText = "Excellent E-E-A-T Strength";

  if (snapshotScore < 40) {
    scoreColorClass = "text-red-500 stroke-red-500";
    bgFillClass = "bg-red-50 text-red-700";
    levelText = "Critical Gaps Detected";
  } else if (snapshotScore < 70) {
    scoreColorClass = "text-amber-500 stroke-amber-500";
    bgFillClass = "bg-amber-50 text-amber-700";
    levelText = "Moderate Trust Profile";
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100" id="overall-score-gauge">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* SVG Circular Progress Track */}
        <svg className="w-full h-full rotate-270 transform">
          {/* Base Background Track Circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-200 fill-transparent"
            strokeWidth="12"
          />
          {/* Active Colored Score Circle Arc */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`fill-transparent transition-all duration-1000 ease-out ${scoreColorClass}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Floating Core Score Text Labels */}
        <div className="absolute text-center">
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">SNAPSHOT</p>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{snapshotScore}</p>
          <div className="h-px bg-slate-200 w-12 mx-auto my-1"></div>
          <p className="text-xs font-semibold text-slate-500">{overallScore} / 500 PTS</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${bgFillClass}`}>
          {levelText}
        </span>
        <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
          Mathematical index combining Foundation, Executive, Author, proof vectors, and LLM readability factors.
        </p>
      </div>
    </div>
  );
}
