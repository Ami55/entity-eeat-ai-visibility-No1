import React, { useState, useEffect } from 'react';
import { AuditInput, AuditReportData, CategoryDetail } from './types';
import AuditForm from './components/AuditForm';
import ScoreGauge from './components/ScoreGauge';
import ChecklistTable from './components/ChecklistTable';
import RoadmapView from './components/RoadmapView';
import RecommendationsList from './components/RecommendationsList';
import CompetitorMatrix from './components/CompetitorMatrix';
import HowItWorksModal from './components/HowItWorksModal';

import { 
  Globe, Shield, Award, Users, Key, Sparkles, Download, 
  ArrowLeft, Terminal, CheckCircle, RefreshCw, Layers, AlertTriangle, Info, HelpCircle
} from 'lucide-react';

const LOADING_MESSAGES = [
  "Resolving DNS properties & analyzing security redirects...",
  "Running SSL certificate inspections (HTTPS layers checks)...",
  "Scanning robots.txt, sitemaps, and core brand authority folders...",
  "Querying Google Knowledge Graph database for brand entity mappings...",
  "Scraping homepage metadata searching for Organization, Owner, & LocalBusiness JSON-LD...",
  "Detecting corporate founders, executives & mapped SameAs links...",
  "Checking author credits & background subject-matter credentials...",
  "Cataloguing proof signals (customer case reviews and quantifiable trust metrics)...",
  "Running LLM readability metrics & evaluating citing probability indexes...",
  "Generating final E-E-A-T consulting breakdown and action plan..."
];

export default function App() {
  const [report, setReport] = useState<AuditReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("foundation");
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Multi-step animated loader message sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= LOADING_MESSAGES.length - 1) {
            return prev; // hold on last step
          }
          return prev + 1;
        });
      }, 1600);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleAuditSubmit = async (input: AuditInput) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Audit request failed with status: ${response.status}`);
      }

      const data: AuditReportData = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected issue occurred while compiling your trust signals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAudit = () => {
    setReport(null);
    setError(null);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 antialiased selection:bg-purple-100 selection:text-purple-900 pb-16">
      {/* Top Header / Nav Bar (Hidden in Printed Report) */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-40 no-print shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none uppercase">Entity E-E-A-T</h1>
            <p className="text-[10px] text-purple-600 font-bold tracking-wide mt-1">&amp; AI Visibility Snapshot</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsHowItWorksOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700 transition hover:bg-purple-100 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" /> How It Works
          </button>
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ● Enterprise Analytics Version
          </span>
          {report && (
            <button
              onClick={resetAudit}
              className="text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Start New
            </button>
          )}
        </div>
      </header>

      {/* Main Core Content Stage */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        
        {/* Error Notification Alert banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 mb-6 flex items-start gap-3 alert-banner animate-fade-in" id="error-banner">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">System Compliance Alert</p>
              <p className="text-xs mt-0.5 leading-relaxed">{error}</p>
              <button onClick={() => setError(null)} className="text-[10px] font-bold underline mt-1.5 focus:outline-none">Dismiss notification</button>
            </div>
          </div>
        )}

        {/* 1. STATE INITIAL: Landing Welcome Page & Input Form Panel */}
        {!isLoading && !report && (
          <div className="space-y-8 no-print animate-fade-in" id="landing-stage">
            {/* Visual Welcome Banner Hero */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -translate-x-12 translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/10 text-purple-200 text-xs font-bold rounded-full backdrop-blur-md">
                  <span className="animate-ping w-1.5 h-1.5 bg-purple-400 rounded-full inline-block mr-1"></span>
                  E-E-A-T Quality Raters Standard
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Evaluate Your Entity Authority for LLMs &amp; Google AI Overviews
                </h1>
                
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Search engines like Google, and LLM chat assistants (ChatGPT, Gemini, Perplexity) do not just index keywords anymore. They index certified <strong className="text-white">Entities</strong>, validating physical credibility, verified author achievements, and executive transparency.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                    <p className="text-purple-300 text-xs font-bold font-mono">1. Foundation</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Trust &amp; Legal Nodes</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                    <p className="text-blue-300 text-xs font-bold font-mono">2. Executive</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Leadership Trust</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                    <p className="text-indigo-300 text-xs font-bold font-mono">3. Author</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Expert Verification</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                    <p className="text-emerald-300 text-xs font-bold font-mono">4. Visibility</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">AI Engine Citations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form Card */}
            <AuditForm onSubmit={handleAuditSubmit} isLoading={isLoading} />
            
            {/* Explanatory Educational Sidebar Block */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-600" />
                Frequently Checked Parameters in the Score Calculations:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-500 leading-relaxed">
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-700">✓ Foundation &amp; Basic Trust</p>
                  <p>Analyzes About pages, physical location records, active HTTPS, customer policy documentation, and speed factors.</p>
                </div>
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-700">✓ Experience &amp; Author Proof</p>
                  <p>Evaluates creator author biographics, professional citations, social accounts validation (SameAs schema), and case telemetry.</p>
                </div>
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-700">✓ Digital Shadow Mapping</p>
                  <p>Calculates citation likelihood within LLM datasets based on Structured data schema depth and unique, original research data points.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. STATE LOADING: Interactive Consulting Steps Loader */}
        {isLoading && (
          <div className="no-print py-12 flex flex-col items-center justify-center min-h-[500px]" id="audit-loader">
            <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm max-w-xl w-full text-center space-y-6">
              
              {/* Rotating Gear Icon */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100 mb-2">
                <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
                <Sparkles className="w-4 h-4 absolute top-1 right-1 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Compiling E-E-A-T Trust Indices</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Running a specialized multi-layer analysis on your brand entities against modern search quality benchmarks.
                </p>
              </div>

              {/* Progress Indicator Slider bar */}
              <div className="h-2 bg-slate-100 w-full rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500 easy-out"
                  style={{ width: `${((loadingStep + 1) / LOADING_MESSAGES.length) * 100}%` }}
                ></div>
              </div>

              {/* Ticking Active Terminal Code Block */}
              <div className="bg-slate-900 rounded-2xl p-4 text-left font-mono text-[11px] text-green-400 leading-relaxed border border-slate-800 shadow-inner">
                <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2 text-slate-500">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CRAWLER CONSOLE ENGINE: ACTIVE</span>
                </div>
                <div className="space-y-1.5">
                  {LOADING_MESSAGES.slice(0, loadingStep).map((msg, idx) => (
                    <p key={idx} className="text-slate-500 flex items-center gap-1.5">
                      <span className="text-green-500 font-bold">✔</span> {msg}
                    </p>
                  ))}
                  <p className="text-green-400 font-bold animate-pulse flex items-center gap-1.5">
                    <span>❯</span> {LOADING_MESSAGES[loadingStep]}
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                ESTIMATED COMPLETION: {Math.max((LOADING_MESSAGES.length - loadingStep) * 2, 2)} SECONDS
              </p>
            </div>
          </div>
        )}

        {/* 3. STATE COMPLETED: Premium Executive Consulting Snapshot Report Output */}
        {!isLoading && report && (
          <div className="space-y-8 report-container animate-fade-in" id="report-stage">
            
            {/* REPORT HEADER SECTION */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print-card">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-purple-700 font-bold leading-none">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>E-E-A-T &amp; AI VISIBILITY SNAPSHOT REPORT</span>
                  <span className="h-3 w-px bg-slate-200"></span>
                  <span className="font-mono text-slate-500 uppercase tracking-wider">{report.analyzedAt}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  Snapshot Audit for <span className="text-purple-600 block sm:inline">{report.brandName}</span>
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1 pl-0.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 inline shrink-0" />
                  <span>TARGET DOMAIN:</span>
                  <a href={report.websiteUrl} target="_blank" rel="noreferrer" className="text-purple-600 underline font-semibold font-mono hover:text-purple-700">
                    {report.websiteUrl}
                  </a>
                </p>
              </div>

              {/* Utility Download & Reset panel (Hidden in printed PDF) */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto no-print">
                <button
                  type="button"
                  onClick={triggerPrint}
                  className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  id="download-pdf-btn"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF Report
                </button>
                <button
                  type="button"
                  onClick={resetAudit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200/50 transition-all flex items-center gap-1.5 cursor-pointer"
                  id="reset-audit-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Run Another
                </button>
              </div>
            </div>

            {/* SCORE INDEX AND EXECUTIVE SUMMARY VIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Radial Score card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between print-card">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Scorings Mapping</span>
                <div className="py-4">
                  <ScoreGauge overallScore={report.overallScore} snapshotScore={report.snapshotScore} />
                </div>
                <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-medium leading-normal">
                  Snapshot match tracks 50 trust criteria across 5 columns. Target index is 400+ for stable AI OVERVIEWS citation inclusion rules.
                </div>
              </div>

              {/* Executive Summary Narrative Text */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:col-span-2 flex flex-col justify-between print-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Executive Summary</span>
                    <span className="text-[11px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md font-bold">Consulting Diagnostic</span>
                  </div>
                  
                  <p className="text-slate-700 text-sm leading-relaxed font-sans font-normal" id="executive-summary-text">
                    {report.executiveSummary.text}
                  </p>

                  <div className="pt-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide mb-2">Detected Security & Trust Status Labels:</p>
                    <div className="flex flex-wrap gap-1.5" id="summary-badges-container">
                      {report.executiveSummary.badges.map((b, i) => {
                        let statusColor = "bg-green-50 text-green-700 border-green-200";
                        if (b.status === "warning") statusColor = "bg-yellow-50 text-yellow-700 border-yellow-200";
                        if (b.status === "danger") statusColor = "bg-red-50 text-red-700 border-red-200";
                        
                        return (
                          <span key={i} className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${statusColor}`}>
                            {b.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-snug">
                  <strong>* Disclaimer Notice:</strong> This audit provides a preliminary snapshot of visible search index data. A deeper crawl is recommended to secure exact compliance with proprietary algorithms.
                </div>
              </div>
            </div>

            {/* BUSINESS IMPACTS CARDS PANEL */}
            <div className="space-y-4 print-card">
              <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">Business Impact analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="business-impact-panel">
                {/* Missed Organic Traffic */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2.5 hover:border-purple-200 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xl">📉</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">Missed Organic Traffic</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {report.businessImpact.missedOrganicTraffic}
                    </p>
                  </div>
                  <div className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded font-mono font-bold uppercase self-start">Algorithm Penality risk</div>
                </div>

                {/* Potentially Wasted Ad Spend */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2.5 hover:border-purple-200 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xl">💸</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">Potentially Wasted Ad Spend</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {report.businessImpact.potentiallyWastedAdSpend}
                    </p>
                  </div>
                  <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold uppercase self-start">Conversion Drain warning</div>
                </div>

                {/* Lower Customer Confidence */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-2.5 hover:border-purple-200 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xl">🤖</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">Lower Customer Confidence</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {report.businessImpact.lowerCustomerConfidence}
                    </p>
                  </div>
                  <div className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-mono font-bold uppercase self-start">AI Ignored exclusion</div>
                </div>
              </div>
            </div>

            {/* DETAILED CATEGORIES PERFORMANCE MATRIX */}
            <div className="space-y-4 print-card">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">Detailed E-E-A-T Categories</h3>
                <span className="text-xs text-slate-400 hidden sm:inline">Select cards to inspect sub-item points</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4" id="eeat-categories-panel">
                {Object.keys(report.categories).map((key) => {
                  const cat: CategoryDetail = report.categories[key as keyof typeof report.categories];
                  const isCur = expandedCategory === key;
                  
                  // Icons select
                  let icObj = <Globe className="w-5 h-5 text-purple-600" />;
                  if (key === "executive") icObj = <Users className="w-5 h-5 text-blue-600" />;
                  if (key === "author") icObj = <Award className="w-5 h-5 text-indigo-600" />;
                  if (key === "experience") icObj = <Sparkles className="w-5 h-5 text-amber-500" />;
                  if (key === "ai_visibility") icObj = <Key className="w-5 h-5 text-emerald-600" />;

                  return (
                    <button
                      key={key}
                      onClick={() => setExpandedCategory(isCur ? null : key)}
                      type="button"
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between relative cursor-pointer min-h-[160px] ${
                        isCur 
                          ? 'bg-white border-purple-500 ring-2 ring-purple-100 shadow-sm md:col-span-1' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                            {icObj}
                          </div>
                          <span className="text-slate-900 font-extrabold text-sm font-mono">{cat.scoredPoints} / 100</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-[13px] tracking-tight truncate leading-tight">{cat.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-1 pr-1 truncate">{cat.shortDefinition}</p>
                        </div>
                      </div>

                      <div className="w-full mt-3">
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" 
                            style={{ width: `${cat.scoredPoints}%`}}
                          ></div>
                        </div>
                        <span className="text-[9px] text-purple-600 font-bold block mt-1.5 uppercase font-sans tracking-wide">
                          {isCur ? "▼ ACTIVE DETAILS" : "▶ VIEW CORE METRICS"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Category Sub-Items details Drawer */}
              {expandedCategory && report.categories[expandedCategory as keyof typeof report.categories] && (
                <div className="bg-white rounded-3xl border border-purple-100 ring-2 ring-purple-50/50 p-6 animate-fade-in" id="category-drawer">
                  {/* Category Title and Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                        {report.categories[expandedCategory as keyof typeof report.categories].name} Details
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {report.categories[expandedCategory as keyof typeof report.categories].shortDefinition}
                      </p>
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-3.5 py-1 rounded-xl text-xs font-mono font-extrabold shrink-0 border border-purple-200">
                      CATEGORY RATING: {report.categories[expandedCategory as keyof typeof report.categories].scoredPoints} / 100 PTS
                    </div>
                  </div>

                  {/* High Quality findings box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-purple-700 font-bold block mb-1">★ Primary Section Finding:</strong>
                    {report.categories[expandedCategory as keyof typeof report.categories].keyFinding}
                  </div>

                  {/* Subscore Items Grid checklist */}
                  <div className="space-y-3.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">Diagnostic Audit Sub-Items Weights:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.categories[expandedCategory as keyof typeof report.categories].items.map((sub, idx) => {
                        let indicatorColor = "bg-green-50 text-green-700 border-green-100";
                        if (sub.status === "moderate") indicatorColor = "bg-blue-50 text-blue-700 border-blue-100";
                        if (sub.status === "weak" || sub.status === "not-detected") indicatorColor = "bg-amber-50 text-amber-700 border-amber-100";
                        if (sub.status === "missing") indicatorColor = "bg-red-50 text-red-700 border-red-100";

                        return (
                          <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4 transition-all hover:border-slate-200 flex flex-col justify-between space-y-2 shadow-sm">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h5 className="font-bold text-xs text-slate-800 leading-none">{sub.name}</h5>
                                <span className={`inline-block mt-1.5 px-2 py-0.5 border text-[9px] font-bold rounded uppercase tracking-wider ${indicatorColor}`}>
                                  {sub.status}
                                </span>
                              </div>
                              <div className="font-mono text-xs font-extrabold text-slate-950 shrink-0">
                                {sub.scoredPoints} / {sub.maxPoints} PTS
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                              {sub.notes}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI VISIBILITY & ENTITY MOOD SCOREBOARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-card">
              {/* Entity Strength Bento */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">AI Chat Engine Citation Readiness</h3>
                  <p className="text-xs text-slate-500 mt-1">评估 AI (Gemini, ChatGPT) 是否可以轻松获取、理解并引用该品牌的网页数据。</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" id="ai-strength-bento">
                  {/* Org Strength */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Organization Node</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.organizationEntity}</p>
                  </div>
                  {/* Creator entity */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Author Person Node</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.authorPersonEntity}</p>
                  </div>
                  {/* KG readiness */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Knowledge Graph Panel</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.knowledgeGraphReadiness}</p>
                  </div>
                  {/* Schema Coverage */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Schema LD Coverage</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.schemaCoverage}</p>
                  </div>
                  {/* Digital shadow */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Digital PR Profile</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.digitalShadowStrength}</p>
                  </div>
                  {/* Information gain */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold tracking-tight">Information Gain index</p>
                    <p className="font-bold text-slate-800 text-sm mt-1">{report.aiVisibilityStrength.informationGainScore}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide mb-2">Topological Entity Relationships Status Mappings:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[11px] text-slate-500 font-mono">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-green-500 font-bold">✔</span>
                      <span>Brand ──► Services</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <span className={report.executiveName ? "text-green-500 font-bold" : "text-amber-500 font-bold"}>
                        {report.executiveName ? "✔" : "✖"}
                      </span>
                      <span>Founder ──► Company</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <span className={report.authorName ? "text-green-500 font-bold" : "text-amber-500 font-bold"}>
                        {report.authorName ? "✔" : "✖"}
                      </span>
                      <span>Author ──► Expertise</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Citation info block */}
              <div className="bg-purple-950 text-purple-100 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-extrabold text-white/5 select-none">AI</div>
                <div className="space-y-4">
                  <span className="inline-flex items-center px-2 py-0.5 bg-white/10 text-purple-200 text-[9px] font-bold rounded font-mono uppercase tracking-widest">
                    AI OVERVIEWS GATE
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                    Maximizing Your LLM Digital Footprint
                  </h4>
                  <p className="text-xs text-purple-200/90 leading-relaxed font-sans">
                    Conversational neural engines citations require <strong className="text-white">Structured SameAs markup</strong>, tying corporate domains with public resources, Wikidata accounts, and verified expert author references.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-purple-300 font-semibold tracking-wide uppercase">
                  AI READYNESS SCORE: {report.snapshotScore} / 100
                </div>
              </div>
            </div>

            {/* 12 KEY ANALYSIS CHECKLIST TABLE */}
            <ChecklistTable rows={report.checklist} />

            {/* ROADMAP ACTION PLAN */}
            <RoadmapView phase1={report.roadmap.phase1} phase2={report.roadmap.phase2} phase3={report.roadmap.phase3} />

            {/* COMPETITOR MARIX (Conditional) */}
            {report.competitorComparison && report.competitors && report.competitors.length > 0 && (
              <CompetitorMatrix 
                competitors={report.competitorComparison} 
                brandName={report.brandName} 
                websiteUrl={report.websiteUrl} 
              />
            )}

            {/* ACTIONABLE RECOMMENDATIONS LIST */}
            <RecommendationsList items={report.recommendations} />

            {/* BOTTOM CONSULTANT SIGNOFF ACCENTS (Visible in print) */}
            <div className="pt-8 border-t border-slate-200 text-center space-y-2 h-20 print-only">
              <p className="text-xs font-bold font-mono text-slate-800 uppercase tracking-widest">Audit Conducted by Enterprise Entity E-E-A-T Engine</p>
              <p className="text-[10px] text-slate-400">Verifying structures matching published Search Quality Raters Guidelines thresholds.</p>
            </div>

          </div>
        )}

      </main>

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* FOOTER SECTION */}
      <footer className="mt-16 text-center text-xs text-slate-400 no-print space-y-1">
        <p>© 2026 Entity E-E-A-T &amp; AI Visibility Snapshot. Developed by <strong className="text-slate-600">SEO Girl - Ami</strong>. All rights reserved.</p>
        <p className="text-[10px] text-slate-400/80">Entity authority, E-E-A-T and AI citation-readiness analysis</p>
      </footer>
    </div>
  );
}
