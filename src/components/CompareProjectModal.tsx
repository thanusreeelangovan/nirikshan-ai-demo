import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Project } from '../types';

interface CompareProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  suspiciousProject: Project;
  normalProject: Project;
}

export const CompareProjectModal: React.FC<CompareProjectModalProps> = ({
  isOpen,
  onClose,
  suspiciousProject,
  normalProject,
}) => {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      metric: 'Work Title & Scope',
      suspicious: suspiciousProject.name,
      normal: normalProject.name,
      forensicImpact: 'Both are sanctioned capital assets under MPLADS scheme guidelines.'
    },
    {
      metric: 'Jurisdiction & Agency',
      suspicious: `${suspiciousProject.district} · ${suspiciousProject.implementingAgency}`,
      normal: `${normalProject.district} · ${normalProject.implementingAgency}`,
      forensicImpact: 'Different regional implementation divisions.'
    },
    {
      metric: 'Sanctioned Budget',
      suspicious: `₹${suspiciousProject.allocatedAmountLakhs.toFixed(1)} Lakh`,
      normal: `₹${normalProject.allocatedAmountLakhs.toFixed(1)} Lakh`,
      forensicImpact: 'Comparable financial scale (₹35L - ₹45L bracket).'
    },
    {
      metric: 'Fund Utilisation vs Physical Progress',
      suspicious: `${suspiciousProject.fundUtilisationPct}% spent vs ${suspiciousProject.physicalProgressPct}% verified (47% gap)`,
      normal: `${normalProject.fundUtilisationPct}% spent vs ${normalProject.physicalProgressPct}% verified (+3% physical lead)`,
      forensicImpact: 'CRITICAL: Project #4821 exhibits severe fund-progress divergence; #3914 maintains healthy milestone equilibrium.',
      isMajorDivergence: true
    },
    {
      metric: 'Cost vs Regional Peer Benchmark',
      suspicious: '+128.4% above peer median (₹11.2L/km vs ₹5.8L/km)',
      normal: '-4.0% below MEDA peer benchmark rate',
      forensicImpact: 'CRITICAL: Project #4821 is an extreme statistical cost outlier; #3914 prices match established state schedules.',
      isMajorDivergence: true
    },
    {
      metric: 'Vendor Bidding Concentration',
      suspicious: 'Shreeram Infra won 9 of 11 tenders; co-bidder uploaded from identical IP',
      normal: 'Urja Clean Systems won through open 5-party competitive bidding with zero shared DIN/IP',
      forensicImpact: 'HIGH: Cartelization / cover bidding indicators present in #4821; #3914 has clean procurement pedigree.',
      isMajorDivergence: true
    },
    {
      metric: 'Schedule & Milestone Adherence',
      suspicious: '157% schedule deviation (14 months elapsed vs 9 months planned)',
      normal: '98% schedule pace (on track for December delivery)',
      forensicImpact: 'Project #4821 is overdue with 69% work remaining; #3914 is on schedule.',
      isMajorDivergence: true
    },
    {
      metric: 'Supporting Evidence Consistency',
      suspicious: 'Photographic geo-audit contradicts Measurement Book bituminous billing',
      normal: 'PV module serial barcodes independently reconciled on site',
      forensicImpact: 'Physical inspection fails to corroborate billing claims on #4821.',
      isMajorDivergence: true
    },
    {
      metric: 'Composite Risk Score',
      suspicious: `${suspiciousProject.riskScore} / 100 (Critical Investigation)`,
      normal: `${normalProject.riskScore} / 100 (Normal - Baseline)`,
      forensicImpact: 'Proves Nirikshan AI evaluates granular behavioral telemetry rather than blanket flagging.',
      isMajorDivergence: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
                Audit Validation Mode
              </span>
              <h2 className="text-sm font-bold text-white">
                Comparative Forensic Analysis: Flagged Case vs. Normal Baseline
              </h2>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Demonstrating why Project #4821 requires investigation while Project #3914 passes normal compliance screening.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Content Table */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Top Score Comparison Bar */}
          <div className="grid grid-cols-2 gap-4">
            {/* Suspicious Project Card */}
            <div className="p-3.5 bg-rose-50 border border-rose-300 rounded space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-rose-800 text-xs">
                  {suspiciousProject.id} (Subject Case)
                </span>
                <span className="font-mono font-bold text-sm text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                  Risk: {suspiciousProject.riskScore}/100
                </span>
              </div>
              <div className="font-semibold text-slate-900 text-xs">
                {suspiciousProject.name}
              </div>
              <div className="text-[11px] text-rose-700 font-medium">
                Triage Tier: Critical Investigation Required
              </div>
            </div>

            {/* Normal Project Card */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-800 text-xs">
                  {normalProject.id} (Control Baseline)
                </span>
                <span className="font-mono font-bold text-sm text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Risk: {normalProject.riskScore}/100
                </span>
              </div>
              <div className="font-semibold text-slate-900 text-xs">
                {normalProject.name}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Triage Tier: Normal (Nominal Milestone Monitoring)
              </div>
            </div>
          </div>

          {/* Detailed Metric-by-Metric Matrix */}
          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                  <th className="py-2.5 px-3 w-1/4">Forensic Checkpoint</th>
                  <th className="py-2.5 px-3 w-1/3 bg-rose-50/60 text-rose-900 border-x border-slate-200">
                    Project #4821 (Flagged)
                  </th>
                  <th className="py-2.5 px-3 w-1/3 bg-emerald-50/60 text-emerald-900">
                    Project #3914 (Normal)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={row.isMajorDivergence ? 'bg-slate-50/50' : ''}>
                    <td className="py-3 px-3 align-top">
                      <div className="font-bold text-slate-800">{row.metric}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {row.forensicImpact}
                      </div>
                    </td>

                    <td className="py-3 px-3 align-top font-medium bg-rose-50/30 border-x border-slate-200 text-rose-900">
                      <div className="flex items-start gap-1.5">
                        {row.isMajorDivergence && (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <span>{row.suspicious}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 align-top font-medium bg-emerald-50/30 text-emerald-900">
                      <div className="flex items-start gap-1.5">
                        {row.isMajorDivergence && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        <span>{row.normal}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Auditor Conclusion Note */}
          <div className="p-3 bg-slate-100 rounded text-slate-700 text-xs space-y-1">
            <span className="font-bold text-slate-900">Auditor Evaluation Summary:</span>
            <p className="text-[11px] leading-relaxed">
              Nirikshan AI demonstrates calibrated selectivity. Projects with aligned expenditure, verified ground execution, and competitive open procurement are validated as Normal (Score: 18/100). Only works exhibiting compounded deviations across costs, milestones, and contractor clusters are escalated for priority investigation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
