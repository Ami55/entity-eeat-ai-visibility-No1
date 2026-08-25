import React, { useState } from 'react';
import { AuditInput } from '../types';
import { Globe, Building, User, Users, Compass, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface AuditFormProps {
  onSubmit: (input: AuditInput) => void;
  isLoading: boolean;
}

const INDUSTRIES = [
  "SaaS & Technology",
  "Professional Services & Consulting",
  "E-commerce & Retail",
  "Medical, Health & Wellness (YMYL)",
  "Finance, Wealth & Mortgages (YMYL)",
  "Legal, Trust & Compliance (YMYL)",
  "Real Estate & Property",
  "Education & Careers",
  "Local Services & Trade",
  "Other / General Business"
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Global Market",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Singapore",
  "India",
  "Other"
];

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [input, setInput] = useState<AuditInput>({
    websiteUrl: '',
    brandName: '',
    industry: INDUSTRIES[0],
    mainService: '',
    country: COUNTRIES[0],
    competitors: '',
    executiveName: '',
    authorName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSandbox, setShowSandbox] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!input.websiteUrl.trim()) {
      newErrors.websiteUrl = "Website domain URL is required";
    } else {
      // Basic URL structural validation
      const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!pattern.test(input.websiteUrl.trim())) {
        newErrors.websiteUrl = "Please enter a valid URL (e.g., example.com)";
      }
    }
    
    if (!input.brandName.trim()) {
      newErrors.brandName = "Brand / Organization name is required";
    }
    
    if (!input.mainService.trim()) {
      newErrors.mainService = "Main product or service explanation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Ensure URL has protocol if omitted
      let formattedUrl = input.websiteUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "https://" + formattedUrl;
      }
      onSubmit({
        ...input,
        websiteUrl: formattedUrl
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8" id="audit-form-card">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered E-E-A-T Auditor
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Website Trust Signals</h2>
        <p className="text-slate-500 text-sm mt-1">
          Provide your core business entities. Our engine leverages deep search grounding to evaluate your citations, schema structures, and visibility in modern AI engines.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Brand Name */}
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="brandName">
              Brand / Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Building className="w-4 h-4" />
              </span>
              <input
                id="brandName"
                type="text"
                className={`w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.brandName ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-500'
                }`}
                placeholder="e.g. Acme Corp"
                value={input.brandName}
                onChange={(e) => setInput({ ...input, brandName: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.brandName && (
              <p className="text-red-500 text-xs mt-1" id="err-brandName">{errors.brandName}</p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="websiteUrl">
              Website URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Globe className="w-4 h-4" />
              </span>
              <input
                id="websiteUrl"
                type="text"
                className={`w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.websiteUrl ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-500'
                }`}
                placeholder="e.g. acme.com or https://acme.com"
                value={input.websiteUrl}
                onChange={(e) => setInput({ ...input, websiteUrl: e.target.value })}
                disabled={isLoading}
              />
            </div>
            {errors.websiteUrl && (
              <p className="text-red-500 text-xs mt-1" id="err-websiteUrl">{errors.websiteUrl}</p>
            )}
          </div>

          {/* Industry Selection */}
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="industry">
              Industry Verticals <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="industry"
                className="w-full text-slate-800 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all appearance-none cursor-pointer"
                value={input.industry}
                onChange={(e) => setInput({ ...input, industry: e.target.value })}
                disabled={isLoading}
              >
                {INDUSTRIES.map((ind, i) => (
                  <option key={i} value={ind}>{ind}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none">
                <Compass className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Location / Country */}
          <div>
            <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="country">
              Target Market / Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="country"
                className="w-full text-slate-800 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all appearance-none cursor-pointer"
                value={input.country}
                onChange={(e) => setInput({ ...input, country: e.target.value })}
                disabled={isLoading}
              >
                {COUNTRIES.map((cty, i) => (
                  <option key={i} value={cty}>{cty}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none font-sans text-xs">
                🌐
              </span>
            </div>
          </div>
        </div>

        {/* Product/Service description */}
        <div>
          <label className="block text-slate-700 text-xs font-semibold mb-1.5" htmlFor="mainService">
            Main Service or Offering Explained <span className="text-red-500">*</span>
          </label>
          <textarea
            id="mainService"
            rows={2}
            className={`w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.mainService ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-500'
            }`}
            placeholder="Describe briefly what you sell or offer (e.g. cloud security audit software for healthcare providers)"
            value={input.mainService}
            onChange={(e) => setInput({ ...input, mainService: e.target.value })}
            disabled={isLoading}
          />
          {errors.mainService && (
            <p className="text-red-500 text-xs mt-1" id="err-mainService">{errors.mainService}</p>
          )}
        </div>

        {/* Expandable Executive / Author sections */}
        <div className="border-t border-slate-100 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Executive Founder Name (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-700 text-xs font-semibold" htmlFor="executiveName">
                  Main Executive / Founder Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <span className="text-[10px] text-purple-600 font-medium tracking-tight">Executive entity</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="executiveName"
                  type="text"
                  className="w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="e.g. Jane Doe, CEO"
                  value={input.executiveName}
                  onChange={(e) => setInput({ ...input, executiveName: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Author Expert Name (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-700 text-xs font-semibold" htmlFor="authorName">
                  Primary Author / Creator Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <span className="text-[10px] text-purple-600 font-medium tracking-tight">Author entity</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="authorName"
                  type="text"
                  className="w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all"
                  placeholder="e.g. Dr. Alan Turing"
                  value={input.authorName}
                  onChange={(e) => setInput({ ...input, authorName: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Competitors (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-slate-700 text-xs font-semibold" htmlFor="competitors">
              Main Competitors <span className="text-slate-400 font-normal">(Optional, comma-separated)</span>
            </label>
            <span className="text-[10px] text-slate-400">Competitive comparisons</span>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
              <Users className="w-4 h-4" />
            </span>
            <input
              id="competitors"
              type="text"
              className="w-full text-slate-800 placeholder-slate-400 text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all"
              placeholder="e.g. competitor1.com, competitor2.com"
              value={input.competitors}
              onChange={(e) => setInput({ ...input, competitors: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Advanced Sandbox Options Toggle */}
        <div className="border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setShowSandbox(!showSandbox)}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-purple-600 transition-colors"
            id="toggle-sandbox-btn"
          >
            {showSandbox ? "▼ Hide Audit Parameters" : "▶ Show Advanced Core Grounding Options"}
          </button>
          
          {showSandbox && (
            <div className="mt-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed space-y-2.5" id="sandbox-panel">
              <div className="flex items-center justify-between font-semibold text-slate-800 border-b border-slate-200/60 pb-1.5">
                <span>Model & Crawler Grounding Settings</span>
                <span className="bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0.5 rounded-md font-mono">Gemini 3.5 Flash</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" defaultChecked disabled className="mt-0.5 rounded text-purple-600 focus:ring-purple-200" id="grounding-chk" />
                <div>
                  <p className="font-semibold text-slate-700">Google Search Grounding (Highly Recommended)</p>
                  <p className="text-[11px] text-slate-500">Allows Gemini to query the active live Google web index and cross-link external directory claims about employees, authors, and organization names.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" defaultChecked disabled className="mt-0.5 rounded text-purple-600 focus:ring-purple-200" id="strict-eeat-chk" />
                <div>
                  <p className="font-semibold text-slate-700">Strict E-E-A-T Quality Raters Rule Compliance</p>
                  <p className="text-[11px] text-slate-500">Calculates category point indexes strictly referencing published March 2024 Google Quality Raters Guidelines thresholds.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          disabled={isLoading}
          id="submit-audit-btn"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Assembling Corporate Entity Data...</span>
            </>
          ) : (
            <>
              <span>Compile Executive E-E-A-T & AI Visibility Snapshot</span>
              <span className="text-base">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
