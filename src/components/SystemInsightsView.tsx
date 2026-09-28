import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Filter, 
  Scale, 
  Network, 
  FileCheck2, 
  Sliders, 
  UserCheck, 
  HelpCircle, 
  ArrowDown, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const SystemInsightsView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4); // Anomaly detection default

  const pipelineSteps = [
    {
      step: 1,
      title: 'Government Project Data Ingestion',
      subtitle: 'MoSPI Portal, State Treasury IFMS, MahaTenders',
      description: 'Continuous extraction of administrative sanctions, bank guarantee releases, contractor details, measurement book entries, and utilisation certificates.',
      sources: ['MPLADS Central Portal', 'Maharashtra Treasury IFMS', 'MahaTenders e-Procurement', 'District Planning Committee Minutes'],
      engineType: 'Automated Ingestion Pipeline'
    },
    {
      step: 2,
      title: 'Data Validation & Normalisation',
      subtitle: 'Schema reconciliation, geographic bounds, schedule alignment',
      description: 'Cleans, standardizes item rate measurements, resolves contractor corporate entity identities via Ministry of Corporate Affairs (MCA) DIN/CIN databases.',
      sources: ['MCA Director Database (DIN)', 'Geodetic District Shapefiles', 'CPWD & State PWD Schedule of Rates (DSR)'],
      engineType: 'Data Normalisation Engine'
    },
    {
      step: 3,
      title: 'Project Behavioural Fingerprinting',
      subtitle: 'Multi-dimensional temporal & physical profiling',
      description: 'Generates a behavioral vector capturing disbursement velocity, physical progress trajectory, contractor lead distance claims, and milestone adherence.',
      sources: ['Cumulative Tranche Velocities', 'Measurement Book Chronology', 'Site Inspection Log Series'],
      engineType: 'Feature Extraction Engine'
    },
    {
      step: 4,
      title: 'Peer Benchmarking & Cohort Construction',
      subtitle: 'k-Nearest Neighbor alignment across 6 physical dimensions',
      description: 'Matches the target project against 30-50 strictly comparable works (identical terrain, alignment scale, geotechnical conditions, and financial year) to establish empirical cost and timeline baselines.',
      sources: ['State Road Works Cohort', 'Regional Health Infrastructure Cohort', 'Rural Water Supply Cluster'],
      engineType: 'Comparative Benchmarking Engine'
    },
    {
      step: 5,
      title: 'Multi-Modal Anomaly Detection',
      subtitle: 'Fund-progress divergence, cost outliers, timeline slippage',
      description: 'Applies statistical anomaly detection (z-score > 3.0), deterministic rule trees (e.g. fund gap > 25%), and regression tests to identify suspicious behavioral deviations.',
      sources: ['Fund Divergence Rule (47% gap on #4821)', 'Cost Variance Model (+128.4%)', 'Schedule Slippage Engine (157%)'],
      engineType: 'Hybrid AI & Rule Detection'
    },
    {
      step: 6,
      title: 'Network Intelligence & Entity Graphs',
      subtitle: 'Cartel bidding, shared directors, common IP/address detection',
      description: 'Constructs knowledge graphs linking contractors, sister companies, directors, common notary advocates, and tender bidding timestamps to detect anti-competitive concentration.',
      sources: ['MahaTenders IP Access Logs', 'Common DIN 08412901 Network', 'Shared MIDC Ambad Premises'],
      engineType: 'Graph Entity Analyzer'
    },
    {
      step: 7,
      title: 'Evidence Verification & Cross-Referencing',
      subtitle: 'Photographic geo-audit reconciliation with Measurement Books',
      description: 'Cross-checks invoice line items with satellite/drone imagery and mobile geo-tagged inspection photos. Verifies whether claimed asphalt layers exist on the ground.',
      sources: ['MoSPI Mobile App Geotagged Photos', 'Measurement Book MB-402 Line Items', 'Cryptographic SHA-256 Timestamps'],
      engineType: 'Multimodal Document Verifier'
    },
    {
      step: 8,
      title: 'Risk Prioritisation & Triage Ranking',
      subtitle: 'Composite score weighted by evidence confidence',
      description: 'Synthesizes anomaly scores and separates Risk Score (concern severity) from Evidence Confidence (document backing), prioritizing cases for the auditor queue.',
      sources: ['Risk Score (0-100)', 'Confidence Score (0-100)', 'Priority Triage Classification'],
      engineType: 'Forensic Scoring System'
    },
    {
      step: 9,
      title: 'Explainable Findings Generation',
      subtitle: 'Deconstructed contributions with clear audit justification',
      description: 'Translates black-box signals into audit-standard explanations. Shows exactly which +26, +24, +18 points compose the score and whether they stem from rules or models.',
      sources: ['Mathematical Attribution', 'Audit Brief Synthesizer', 'Side-by-Side Control Comparisons'],
      engineType: 'Audit Explainability Interface'
    },
    {
      step: 10,
      title: 'Human Auditor Decision & Executive Action',
      subtitle: 'Final authority remains strictly with authorized officers',
      description: 'The auditor reviews the brief, validates evidence, issues directions to field engineers, schedules core drill tests, or freezes treasury tranches.',
      sources: ['Principal Accountant General (PAG)', 'District Collector / Nodal Officer', 'Superintending Engineer Flying Squad'],
      engineType: 'Human-in-the-Loop Governance'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            System Methodology & Architecture
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
            Smart India Hackathon Whitepaper Reference
          </span>
        </div>
        <h1 className="text-lg font-bold text-slate-900">
          How Nirikshan AI Detects Anomalies & Synthesizes Forensic Intelligence
        </h1>
        <p className="text-xs text-slate-600 max-w-4xl leading-relaxed">
          Nirikshan AI does not replace human judgment or declare corruption. It continuously analyzes procurement telemetry, funds flow, and ground audits to surface unexplained patterns and prioritize high-risk works for authorized officers.
        </p>

        {/* Core Doctrine Highlight Box */}
        <div className="p-3.5 bg-slate-900 text-white rounded text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Guiding Audit Constitution:</strong> "Nirikshan assists investigation. Final decisions remain strictly with authorised human officials."
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 shrink-0">
            Compliant with CAG & MoSPI Audit Standards
          </span>
        </div>
      </div>

      {/* 10-Step Visual Forensic Pipeline */}
      <div className="bg-white border border-slate-200 rounded p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              End-to-End Forensic Processing Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Click any stage in the audit pipeline to inspect its algorithmic logic and data inputs.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Stage {activeStep} of 10 Selected
          </span>
        </div>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {pipelineSteps.map((s) => {
            const isActive = activeStep === s.step;
            const isHumanStep = s.step === 10;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`text-left p-3 rounded border transition-all relative ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-400'
                    : isHumanStep
                    ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-100/60 text-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-slate-800 text-emerald-400' : 'bg-white text-slate-600 border border-slate-200'
                  }`}>
                    0{s.step}
                  </span>
                  {isHumanStep && (
                    <span className="text-[9px] font-bold text-emerald-700 bg-white px-1 rounded uppercase">
                      Final Decider
                    </span>
                  )}
                </div>

                <div className={`mt-2 text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </div>

                <div className={`mt-1 text-[10px] line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {s.engineType}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Deep-Dive Card */}
        {(() => {
          const current = pipelineSteps.find(s => s.step === activeStep) || pipelineSteps[3];

          return (
            <div className="bg-slate-50 border border-slate-200 rounded p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Stage 0{current.step} Architecture Deep-Dive
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {current.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {current.subtitle}
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
                  Engine: {current.engineType}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900">
                  Forensic Mechanics & Methodology:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed max-w-4xl">
                  {current.description}
                </p>
              </div>

              {/* Data inputs / sources */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-900 mb-2">
                  Ground-Truth Data Inputs & Verification Checkpoints:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  {current.sources.map((src, i) => (
                    <div key={i} className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SIH Jury Key Takeaways / Q&A Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Why Not Just Use LLM Prompts?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Government audits require deterministic explainability and evidentiary burden of proof. Nirikshan AI pairs statistical peer benchmarking and graph algorithms with auditable arithmetic, ensuring every risk contribution is legally defensible.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-slate-500" />
            <span>How False Positives Are Prevented</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Separating Risk Score from Evidence Confidence ensures works with preliminary data gaps are marked "Evidence Requested" rather than escalating into punitive inquiries, preserving contractor equity.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 space-y-2">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-slate-500" />
            <span>Institutional Compatibility</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Directly outputs into CAG and MoSPI formatted Inspection Briefs, fitting directly into existing statutory workflows without requiring legislative or regulatory amendments.
          </p>
        </div>
      </div>
    </div>
  );
};
