import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Project } from '../types';

interface ReportsViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onOpenInvestigationBrief: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  projects,
  onSelectProject,
  onOpenInvestigationBrief,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const sampleReports = [
    {
      id: 'REP-2025-Q3-01',
      title: 'Comprehensive Investigation Brief: Project #4821 (Rural Road Widening)',
      type: 'Statutory Investigation Brief',
      date: '24 Oct 2025',
      status: 'Ready for Review',
      subject: 'MPLADS-4821 · Nashik District',
      findingsSummary: '78% funds spent vs 31% verified execution. +128.4% cost outlier. Vendor concentration across 9 tenders.',
      isFlagged: true
    },
    {
      id: 'REP-2025-Q3-02',
      title: 'Statewide Anomaly Prioritisation Digest (Q3 FY 2024-25)',
      type: 'Executive Digest',
      date: '22 Oct 2025',
      status: 'Published to PAG',
      subject: '342 Monitored Works · Maharashtra State',
      findingsSummary: '25 priority cases identified representing ₹8.4 Cr under review. Fund progress divergence leads triggers.',
      isFlagged: false
    },
    {
      id: 'REP-2025-Q3-03',
      title: 'Vendor Procurement Syndicate Assessment: North Maharashtra Region',
      type: 'Vendor Network Inquiry',
      date: '19 Oct 2025',
      status: 'Under AG Review',
      subject: 'Shreeram Infrastructure Cluster · 11 Tenders',
      findingsSummary: 'Shared DIN 08412901 across sister entities and synchronous IP 115.112.44.18 submission logs.',
      isFlagged: true
    },
    {
      id: 'REP-2025-Q3-04',
      title: 'Control Benchmark Validation: Project #3914 Compliance Certificate',
      type: 'Routine Audit Clearance',
      date: '15 Oct 2025',
      status: 'Approved & Cleared',
      subject: 'MPLADS-3914 · Pune District',
      findingsSummary: 'Cost aligns (-4%) with peer benchmark. Progress (49%) leads funds (46%). Cleared for milestone tranche.',
      isFlagged: false
    }
  ];

  const handleDownloadReport = (repId: string) => {
    setDownloadSuccess(repId);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Forensic Reporting Hub
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
              Audit-Ready Outputs
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Investigation Briefs & Executive Audit Summaries
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Download and export formal inquiry briefs for the Principal Accountant General (PAG) and District Collectors.
          </p>
        </div>

        {/* Generate Brief CTA */}
        <button
          onClick={onOpenInvestigationBrief}
          className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5 shadow-xs shrink-0 self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Generate Brief: Project #4821</span>
        </button>
      </div>

      {/* Reports Listing */}
      <div className="space-y-3">
        {sampleReports.map((rep) => (
          <div
            key={rep.id}
            className={`p-4 bg-white border rounded transition-all hover:border-slate-400 space-y-3 ${
              rep.isFlagged ? 'border-l-4 border-l-rose-600 border-slate-200' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.2 rounded">
                    {rep.id}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-medium">{rep.type}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-mono">{rep.date}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {rep.title}
                </h3>

                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  Subject: {rep.subject}
                </div>
              </div>

              {/* Status pill */}
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded self-start shrink-0 ${
                rep.isFlagged
                  ? 'text-rose-700 bg-rose-50 border border-rose-200 font-semibold'
                  : 'text-emerald-800 bg-emerald-50 border border-emerald-200 font-medium'
              }`}>
                {rep.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
              <strong className="text-slate-900">Summary:</strong> {rep.findingsSummary}
            </p>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Digital Signature Verified (CAG Compliance Code: CAG-IN-2025-V2)
              </span>

              <div className="flex items-center gap-2">
                {rep.id.includes('01') ? (
                  <button
                    onClick={onOpenInvestigationBrief}
                    className="px-3 py-1 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1"
                  >
                    <span>View Interactive Brief</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownloadReport(rep.id)}
                    className="px-3 py-1 font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>{downloadSuccess === rep.id ? 'Exported!' : 'Export File'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
