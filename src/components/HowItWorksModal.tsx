import React, { useState } from 'react';
import { 
  X, ShieldCheck, Sparkles, BookOpen, Layers, Cpu, Search, CheckCircle2, 
  ArrowRight, Award, Users, Globe, Key, FileText, ChevronRight
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [activeTab, setActiveTab] = useState<'methodology' | 'pillars' | 'workflow' | 'ai_citations'>('workflow');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print" id="how-it-works-modal-backdrop">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        id="how-it-works-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 md:px-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 text-purple-200 text-[10px] font-bold rounded-full backdrop-blur-md uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-purple-300" /> Methodology &amp; Engine Guide
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
              How the Entity E-E-A-T &amp; AI Visibility Snapshot Works
            </h2>
            <p className="text-xs text-slate-300">
              A comprehensive guide to how our consulting engine measures trust, entity nodes, and AI citation probability.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/70 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('methodology')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'methodology'
                ? 'border-purple-600 text-purple-700 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Core Methodology
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'pillars'
                ? 'border-purple-600 text-purple-700 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" /> 5-Pillar 500-Point Model
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-purple-600 text-purple-700 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" /> Instructions &amp; Workflow
          </button>
          <button
            onClick={() => setActiveTab('ai_citations')}
            className={`py-3.5 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'ai_citations'
                ? 'border-purple-600 text-purple-700 font-bold bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Overviews &amp; AEO
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-600 text-xs md:text-sm leading-relaxed">
          
          {/* TAB 1: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5">
                <h3 className="text-sm md:text-base font-bold text-purple-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  From Keywords to Knowledge Entities
                </h3>
                <p className="mt-2 text-slate-700 leading-relaxed text-xs md:text-sm">
                  Traditional SEO focused on keywords, backlinks, and meta tags. In the modern era of <strong>Google Search Quality Raters Guidelines</strong> and Large Language Models (ChatGPT, Gemini, Perplexity, Claude), search engines rank <strong>verified entities</strong> (Organizations, Founders, Authors, Brands) backed by structured consensus and authoritative provenance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-2">
                  <span className="text-purple-600 font-mono font-bold text-xs">WHAT IS E-E-A-T?</span>
                  <h4 className="font-bold text-slate-900 text-sm">Experience, Expertise, Authoritativeness, Trust</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    <strong>Trust</strong> is the central hub of E-E-A-T. Search engines evaluate whether a human expert with genuine first-hand experience and verified professional credentials authored the content, supported by physical business evidence and transparent corporate ownership.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-2">
                  <span className="text-indigo-600 font-mono font-bold text-xs">WHAT IS ENTITY SEO?</span>
                  <h4 className="font-bold text-slate-900 text-sm">Knowledge Graphs &amp; SameAs Relationships</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Entities are discrete concepts or things (like a company or a doctor) that exist independently of language. We evaluate whether your site clearly defines its entity relationships using JSON-LD schema, linking to Wikidata, LinkedIn, Google Knowledge Graph, and authoritative directories.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">How the Evaluation Is Grounded</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our system leverages <strong>Google Gemini with live Google Search Grounding</strong>. Rather than guessing or relying on static rules, it performs real-time queries to inspect the actual brand footprint, founder credentials, corporate registrations, Wikidata entries, and competitor benchmarks.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: 5-PILLAR MODEL */}
          {activeTab === 'pillars' && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-slate-600 text-xs">
                The snapshot evaluates 5 foundational pillars, each scored out of 100 points, totaling a <strong>500-point maximum composite score</strong>:
              </p>

              <div className="space-y-3">
                {/* Pillar 1 */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl hover:border-purple-200 transition-all flex items-start gap-4">
                  <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl font-bold shrink-0 text-sm">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">1. Foundation &amp; Basic Trust (100 pts)</h4>
                      <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Core Trust</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Physical business address, active HTTPS/SSL certificates, robust About Us and Contact pages, clear Terms of Service and Privacy policies, and transparent customer service channels.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl hover:border-blue-200 transition-all flex items-start gap-4">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl font-bold shrink-0 text-sm">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">2. Executive &amp; Corporate Leadership (100 pts)</h4>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Accountability</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Clear founder and executive leadership profiles, corporate registration transparency, active executive LinkedIn/Wikidata profiles, and explicit corporate entity ownership.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl hover:border-indigo-200 transition-all flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-bold shrink-0 text-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">3. Author Credibility &amp; Credentials (100 pts)</h4>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Expertise</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Dedicated author archive pages, verified subject-matter qualifications, awards, editorial review boards, medical/legal peer review badges, and Person schema markup.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl hover:border-amber-200 transition-all flex items-start gap-4">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl font-bold shrink-0 text-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">4. Experience Proof &amp; Information Gain (100 pts)</h4>
                      <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">First-Hand Data</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Original research, first-hand testing data, proprietary case studies, client testimonials, original photography/video demonstrations, and unique insights not scraped from other sites.
                    </p>
                  </div>
                </div>

                {/* Pillar 5 */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl hover:border-emerald-200 transition-all flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold shrink-0 text-sm">
                    <Key className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">5. AI Visibility &amp; Citation Readiness (100 pts)</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Answer Engines</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Structured JSON-LD schema (Organization, Article, FAQ, MedicalEntity), Google Knowledge Graph presence, digital PR brand citations on high-authority news sites, and crawlable text formatting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-5 animate-fade-in">
              <div className="relative pl-6 border-l-2 border-purple-200 space-y-6 my-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100"></div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 1: Input Brand Information</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide the Target Website URL, Brand Name, Industry, and optionally founder/author names and top competitors.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 2: Real-time Search Grounding &amp; Entity Analysis</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    The backend triggers Gemini with Google Search Grounding to evaluate real-time web consensus, verify brand citations, review schema architecture, and detect authority gaps.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 3: Score Synthesis &amp; Checklist Verification</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Each pillar is computed into an exact point score. A 12-item snapshot checklist is generated with status flags (Strong, Partial, Needs Improvement, Critical).
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></div>
                  <h4 className="font-bold text-slate-900 text-sm">Step 4: Strategic Action Plan &amp; 30/60/90-Day Roadmap</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    You receive 10 prioritized recommendations with impact and difficulty ratings, a structured 3-phase growth roadmap, and a competitive trust comparison matrix.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI OVERVIEWS & AEO */}
          {activeTab === 'ai_citations' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-br from-indigo-950 to-purple-950 text-white rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  Answer Engine Optimization (AEO) in 2026
                </h4>
                <p className="text-purple-200/90 text-xs leading-relaxed">
                  When Google AI Overviews or Perplexity generates a synthesized direct answer, it retrieves information from sources that possess high entity authority, clean information architecture, and structured data proof.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <h5 className="font-bold text-slate-800">Why Most Websites Get Ignored by AI:</h5>
                  <ul className="space-y-1 text-slate-500 list-disc pl-4">
                    <li>Anonymous or generic author bylines ("Admin" / "Staff").</li>
                    <li>Missing or broken JSON-LD Organization and Person markup.</li>
                    <li>No original research, testing data, or first-hand experience proof.</li>
                    <li>Lack of external citations on Wikipedia, Wikidata, or trusted industry directories.</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <h5 className="font-bold text-slate-800">How to Win AI Citation Real Estate:</h5>
                  <ul className="space-y-1 text-slate-500 list-disc pl-4">
                    <li>Add rich <code>sameAs</code> properties pointing to authoritative profiles.</li>
                    <li>Include clear, direct statistical summaries and key takeaway boxes.</li>
                    <li>Establish verified author profiles with accredited background credentials.</li>
                    <li>Implement consistent NAP (Name, Address, Phone) and corporate registration data.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-slate-700">© 2026 Entity E-E-A-T &amp; AI Visibility Snapshot.</span>
            <span className="mx-1.5">•</span>
            <span>Developed by Ami - SEO Girl. All rights reserved.</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
