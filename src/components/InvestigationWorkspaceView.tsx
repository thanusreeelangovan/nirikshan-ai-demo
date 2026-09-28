import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Network, 
  Scale, 
  Clock, 
  Send, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  FileSpreadsheet, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronDown,
  Building,
  UserCheck
} from 'lucide-react';
import { Project, InvestigationStatus, RiskFactor, EvidenceItem } from '../types';

interface InvestigationWorkspaceViewProps {
  project: Project;
  onUpdateStatus: (projectId: string, newStatus: InvestigationStatus, note?: string) => void;
  onOpenPeerBenchmark: () => void;
  onOpenVendorNetwork: () => void;
  onOpenCompareProjects: () => void;
  onOpenInvestigationBrief: () => void;
  onInspectEvidenceItem: (item: EvidenceItem) => void;
}

export const InvestigationWorkspaceView: React.FC<InvestigationWorkspaceViewProps> = ({
  project,
  onUpdateStatus,
  onOpenPeerBenchmark,
  onOpenVendorNetwork,
  onOpenCompareProjects,
  onOpenInvestigationBrief,
  onInspectEvidenceItem,
}) => {
  const [showRiskBreakdownModal, setShowRiskBreakdownModal] = useState<boolean>(false);
  const [selectedFactor, setSelectedFactor] = useState<RiskFactor | null>(project.riskFactors[0] || null);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<InvestigationStatus>(project.status);
  const [activeTab, setActiveTab] = useState<'anomalies' | 'evidence' | 'timeline' | 'audit-log'>('anomalies');

  const handleStatusChange = (status: InvestigationStatus) => {
    setCurrentStatus(status);
    onUpdateStatus(project.id, status);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onUpdateStatus(project.id, currentStatus, newNoteText);
    setNewNoteText('');
  };

  const getMethodologyBadge = (type: string) => {
    switch (type) {
      case 'AI/Model Analysis':
        return 'text-indigo-700 bg-indigo-50 border border-indigo-200';
      case 'Deterministic Rules':
        return 'text-slate-800 bg-slate-100 border border-slate-300';
      case 'Database Calculations':
        return 'text-blue-800 bg-blue-50 border border-blue-200';
      case 'Evidence Verification':
        return 'text-emerald-800 bg-emerald-50 border border-emerald-200';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner: Project Forensic Master Lockup */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
        {/* Row 1: Identification & Status */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {project.id}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium">{project.district} District</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">{project.constituency}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-mono">FY {project.financialYear}</span>
            </div>

            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              {project.name}
            </h1>

            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
              <span><strong>Agency:</strong> {project.implementingAgency}</span>
              <span>·</span>
              <span><strong>Contractor:</strong> {project.contractor}</span>
            </div>
          </div>

          {/* Core Forensic Scoring Lockup */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Clickable Explainable Risk Score */}
            <button
              onClick={() => setShowRiskBreakdownModal(true)}
              title="Click to view granular risk explanation & math breakdown"
              className="text-left bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded p-2.5 transition-all group cursor-pointer"
            >
              <div className="text-[10px] uppercase font-bold text-rose-800 flex items-center justify-between gap-2">
                <span>Anomaly Risk Score</span>
                <HelpCircle className="w-3 h-3 text-rose-500 group-hover:text-rose-700" />
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-rose-700 tracking-tight">
                  {project.riskScore}
                </span>
                <span className="text-xs font-mono text-rose-500">/ 100</span>
              </div>
              <div className="text-[10px] text-rose-700 font-medium underline">
                View Explanation →
              </div>
            </button>

            {/* Evidence Confidence Metric */}
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <span>Evidence Confidence</span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-slate-800 tracking-tight">
                  {project.evidenceConfidencePct}%
                </span>
              </div>
              <div className="text-[10px] text-slate-500">
                4 Verified Sources
              </div>
            </div>

            {/* Severity Flag */}
            <div className="bg-rose-600 text-white rounded p-2.5 flex flex-col justify-center min-w-[120px]">
              <div className="text-[10px] uppercase tracking-wider text-rose-200 font-medium">
                Triage Tier
              </div>
              <div className="text-xs font-bold mt-0.5">
                {project.riskLevel}
              </div>
              <div className="text-[10px] text-rose-200 mt-0.5">
                Priority Review
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Action Notice (Audit Doctrine) */}
        <div className="p-3 bg-amber-50/70 border border-amber-300 rounded text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold">Recommended Action:</span>{' '}
              <span>"{project.recommendedAction}"</span>
            </div>
          </div>

          <div className="text-[11px] text-amber-800 italic shrink-0">
            *Nirikshan flags patterns for auditor review; no criminal finding declared.
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('evidence')}
              className="px-3 py-1.5 font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>View Supporting Evidence</span>
            </button>

            <button
              onClick={onOpenPeerBenchmark}
              className="px-3 py-1.5 font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-slate-600" />
              <span>Compare Similar Projects (37 Peers)</span>
            </button>

            <button
              onClick={onOpenVendorNetwork}
              className="px-3 py-1.5 font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <Network className="w-3.5 h-3.5 text-slate-600" />
              <span>Investigate Vendor Network</span>
            </button>

            <button
              onClick={onOpenCompareProjects}
              className="px-3 py-1.5 font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>Side-by-Side: Normal Project #3914</span>
            </button>
          </div>

          {/* Primary CTA: Generate Investigation Brief */}
          <button
            onClick={onOpenInvestigationBrief}
            className="px-4 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Generate Investigation Brief</span>
          </button>
        </div>
      </div>

      {/* WHY FLAGGED NOW? (Crucial Section) */}
      <div className="bg-white border border-rose-200 rounded p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-600" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Trigger Analysis
              </span>
              <span className="text-slate-300">·</span>
              <h2 className="text-sm font-bold text-slate-900">
                Why was this flagged now?
              </h2>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Trigger:</span> "{project.latestTrigger}"
            </p>

            <div className="p-3 bg-rose-50/50 rounded border border-rose-200/80 text-xs text-slate-800 space-y-1.5">
              <div className="font-semibold text-rose-900">
                Divergence Threshold Crossed:
              </div>
              <p className="text-slate-700 leading-relaxed">
                Fund utilisation recently increased sharply from <strong>52% to 78%</strong> (Tranche 2 disbursement of ₹18.22 Lakh). In contrast, verified physical progress certified by third-party inspection advanced only from <strong>28% to 31%</strong>.
              </p>
              <p className="text-rose-800 font-medium">
                This created a <strong>47 percentage point gap</strong>, exceeding the high-risk divergence threshold (25%) and causing the project risk score to jump from 64 to 91.
              </p>
            </div>
          </div>

          {/* Score Shift Delta Box */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs shrink-0 min-w-[210px]">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
              Risk Progression
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="text-[10px] text-slate-400">Previous</div>
                <div className="text-lg font-bold font-mono text-slate-600">
                  {project.previousRiskScore || 64}
                </div>
              </div>

              <div className="text-slate-400 font-bold">→</div>

              <div className="text-center">
                <div className="text-[10px] text-rose-600 font-bold">Current</div>
                <div className="text-xl font-bold font-mono text-rose-700">
                  {project.riskScore}
                </div>
              </div>

              <div className="ml-2 font-mono text-xs font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                +{(project.riskScore - (project.previousRiskScore || 64))} pts
              </div>
            </div>

            <div className="mt-2 text-[10px] text-slate-500 border-t border-slate-200 pt-1.5">
              Last evaluation: 24 Oct 2025
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-1 text-xs">
        <button
          onClick={() => setActiveTab('anomalies')}
          className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'anomalies'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Explainable Risk Breakdown ({project.riskFactors.length})
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'evidence'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Supporting Evidence ({project.evidenceItems.length})
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'timeline'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Project Milestone Timeline ({project.timelineEvents.length})
        </button>

        <button
          onClick={() => setActiveTab('audit-log')}
          className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'audit-log'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Investigation Workflow & Notes ({project.auditNotes.length})
        </button>
      </div>

      {/* TAB 1: EXPLAINABLE RISK SCORE BREAKDOWN */}
      {activeTab === 'anomalies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900">Explainable Anomaly Attribution:</span>{' '}
              Each contribution is derived mathematically from specific rules, AI models, or document checks.
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Sum of Contributions: <strong className="text-slate-900 font-bold">{project.riskScore} / 100</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: Factors List */}
            <div className="lg:col-span-2 space-y-2.5">
              {project.riskFactors.map((factor) => {
                const isSelected = selectedFactor?.id === factor.id;

                return (
                  <div
                    key={factor.id}
                    onClick={() => setSelectedFactor(factor)}
                    className={`p-3.5 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">
                            {factor.title}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${getMethodologyBadge(factor.methodologyType)}`}>
                            {factor.methodologyType}
                          </span>
                        </div>

                        <div className="text-xs text-slate-700">
                          <span className="text-slate-500">Observed:</span>{' '}
                          <span className="font-semibold text-rose-700">{factor.observed}</span>
                        </div>

                        <div className="text-[11px] text-slate-500">
                          <span>Benchmark:</span> {factor.benchmark}
                        </div>
                      </div>

                      {/* Contribution Badge */}
                      <div className="text-right shrink-0">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Risk Contrib.</div>
                        <div className="font-mono text-sm font-extrabold text-rose-700">
                          +{factor.riskContribution}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Factor Deep-Dive Panel */}
            <div className="bg-white border border-slate-200 rounded p-4 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Anomaly Deep Inspection
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedFactor?.title}
                </h3>
              </div>

              {selectedFactor && (
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">
                      Methodology Engine
                    </div>
                    <div className="font-medium text-slate-800 mt-0.5">
                      {selectedFactor.methodology}
                    </div>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-mono ${getMethodologyBadge(selectedFactor.methodologyType)}`}>
                      Source: {selectedFactor.methodologyType}
                    </span>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">
                      Detailed Finding
                    </div>
                    <p className="text-slate-700 mt-1 leading-relaxed">
                      {selectedFactor.explanation}
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">
                      Audit Verification Path
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Finding → Evidence Verification → External Cross-Validation
                    </div>
                  </div>

                  {/* Contextual Action based on selected factor */}
                  <div className="pt-2">
                    {selectedFactor.category === 'Cost Deviation' && (
                      <button
                        onClick={onOpenPeerBenchmark}
                        className="w-full py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Inspect Peer Cohort Distribution (37 Roads)</span>
                      </button>
                    )}

                    {selectedFactor.category === 'Vendor Concentration' && (
                      <button
                        onClick={onOpenVendorNetwork}
                        className="w-full py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Network className="w-3.5 h-3.5" />
                        <span>Open Shreeram Infra Tender Graph</span>
                      </button>
                    )}

                    {selectedFactor.category === 'Fund Progress Mismatch' && (
                      <button
                        onClick={() => setActiveTab('evidence')}
                        className="w-full py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect Utilisation Certificate & Photos</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPORTING EVIDENCE */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900">Audit Proof Chain:</span>{' '}
              Finding → Supporting Evidence → Verified Source → Confidence Score
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              All documents cryptographically timestamped
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.evidenceItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded p-4 space-y-3 flex flex-col justify-between hover:border-slate-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {item.anomalyCategory}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">
                        {item.findingTitle}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Confidence</div>
                      <div className="font-mono text-xs font-bold text-emerald-700">
                        {item.confidenceScore}%
                      </div>
                    </div>
                  </div>

                  {/* Discrepancy comparison */}
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                    <div className="text-slate-700">
                      <span className="font-semibold text-slate-900">Observed:</span> {item.observedValue}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      <span className="font-semibold text-slate-700">Expected:</span> {item.expectedValue}
                    </div>
                  </div>

                  {/* Document snippet */}
                  {item.documentSnippet && (
                    <div className="p-2.5 bg-amber-50/50 rounded border border-amber-200 text-[11px] text-slate-800 font-mono">
                      <div className="text-[10px] uppercase font-bold text-amber-800 mb-1">
                        Document Excerpt ({item.documentRef})
                      </div>
                      "{item.documentSnippet}"
                    </div>
                  )}

                  {/* Source Metadata */}
                  <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                    <div><strong>Source:</strong> {item.sourceName}</div>
                    <div><strong>Verification Date:</strong> {item.evidenceDate}</div>
                    <div><strong>Method:</strong> {item.verificationMethod}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Ref: {item.documentRef}
                  </span>
                  <button
                    onClick={() => onInspectEvidenceItem(item)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect Raw Source</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROJECT TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Chronological Milestone Audit Log
              </h3>
              <p className="text-[11px] text-slate-500">
                Sequence of sanctions, disbursements, site inspections, and automated anomaly escalations.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Sanction: 15 Jan 2025
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {project.timelineEvents.map((event, idx) => (
              <div key={event.id} className="relative group">
                {/* Dot */}
                <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                  event.type === 'escalation'
                    ? 'border-rose-600 bg-rose-50'
                    : event.type === 'detection'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-slate-400'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    event.type === 'escalation' ? 'bg-rose-600' : event.type === 'detection' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                </div>

                <div className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded border border-slate-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-slate-900">
                      {event.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {event.riskScoreAtPoint && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                          Risk: {event.riskScoreAtPoint}/100
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-mono">
                        {event.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVESTIGATION WORKFLOW & NOTES */}
      {activeTab === 'audit-log' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Status Triage & Add Note */}
          <div className="bg-white border border-slate-200 rounded p-4 space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Auditor Triage Decision
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Update the official inquiry status for this MPLADS work.
              </p>
            </div>

            {/* Status Select Buttons */}
            <div className="space-y-1.5 text-xs">
              {(['New Alert', 'Under Review', 'Evidence Requested', 'Field Verification Required', 'Escalated', 'Resolved'] as InvestigationStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${
                    currentStatus === st
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{st}</span>
                  {currentStatus === st && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Append Audit Note Form */}
            <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-semibold text-slate-800">
                Append Official Audit Note
              </label>
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                rows={3}
                placeholder="Record observation, direction to Executive Engineer, or field inspection instructions..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800"
              />
              <button
                type="submit"
                className="w-full py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Submit to Audit Trail</span>
              </button>
            </form>
          </div>

          {/* Right: Chronological Activity Log */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recorded Case Activity Log
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {project.auditNotes.length} entries
              </span>
            </div>

            <div className="space-y-3">
              {project.auditNotes.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No manual audit notes recorded yet. Use the triage console on the left to submit an observation.
                </div>
              ) : (
                project.auditNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900">
                        {note.author}{' '}
                        <span className="text-[11px] font-normal text-slate-500">
                          ({note.designation})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {note.timestamp}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {note.content}
                    </p>

                    {note.statusChangedTo && (
                      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 flex items-center gap-1 font-mono">
                        <span>Status Updated To:</span>
                        <span className="font-semibold text-slate-800 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {note.statusChangedTo}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* EXPLAINABLE RISK BREAKDOWN MODAL */}
      {showRiskBreakdownModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  Explainable Risk Score Model: Project #4821
                </h3>
                <p className="text-[11px] text-slate-300">
                  Granular mathematical attribution of the 91/100 composite anomaly score
                </p>
              </div>
              <button
                onClick={() => setShowRiskBreakdownModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    Total Risk Score: 91 / 100
                  </div>
                  <div className="text-[11px] text-rose-700">
                    Status: Critical Investigation Recommended
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-rose-700 bg-white px-2 py-1 rounded border border-rose-200">
                  Critical Threshold = 80
                </span>
              </div>

              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-xs">
                  Contribution Decomposition:
                </div>

                {project.riskFactors.map(f => (
                  <div key={f.id} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{f.title}</span>
                      <span className="font-mono font-bold text-rose-700">+{f.riskContribution} pts</span>
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      <strong>Observed:</strong> {f.observed}
                    </div>
                    <div className="text-slate-500 text-[10px]">
                      <strong>Engine:</strong> {f.methodology} ({f.methodologyType})
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-100 rounded text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">
                  Methodology Governance:
                </div>
                <p>
                  Risk calculations combine deterministic audit rules (PAG Audit Manual guidelines), peer benchmarking z-scores, and tender graph connectivity. The jury can inspect every input factor directly.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowRiskBreakdownModal(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
