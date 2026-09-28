import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  Filter,
  User,
  Building
} from 'lucide-react';
import { Project, InvestigationStatus } from '../types';

interface InvestigationsQueueViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onUpdateStatus: (projectId: string, status: InvestigationStatus) => void;
}

export const InvestigationsQueueView: React.FC<InvestigationsQueueViewProps> = ({
  projects,
  onSelectProject,
  onUpdateStatus,
}) => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('All Active');

  const statusColumns: InvestigationStatus[] = [
    'New Alert',
    'Under Review',
    'Evidence Requested',
    'Field Verification Required',
    'Escalated',
    'Resolved'
  ];

  // Projects that have an active status or risk >= 40
  const activeCases = projects.filter(p => p.riskScore >= 40 || p.status !== 'Resolved');

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Audit Operations
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-medium border border-rose-200">
              Active Triage Queue
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Active Forensic Investigations Kanban Board
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Triage and track flagged MPLADS projects across investigation lifecycle stages.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs shrink-0 flex items-center gap-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">In-Flight Inquiries</div>
            <div className="text-base font-bold font-mono text-rose-700">
              {activeCases.length} Works
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Critical Escalations</div>
            <div className="text-base font-bold font-mono text-rose-800">
              4 Cases
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {statusColumns.map((colStatus) => {
          const colProjects = projects.filter(p => p.status === colStatus);

          return (
            <div 
              key={colStatus} 
              className="bg-slate-100/70 border border-slate-200 rounded p-2.5 flex flex-col min-h-[520px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-2">
                <span className="text-[11px] font-bold text-slate-800 truncate" title={colStatus}>
                  {colStatus}
                </span>
                <span className="font-mono text-xs font-bold text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                  {colProjects.length}
                </span>
              </div>

              {/* Cards in column */}
              <div className="space-y-2 flex-1 overflow-y-auto">
                {colProjects.length === 0 ? (
                  <div className="py-8 text-center text-[10px] text-slate-400">
                    No cases in this stage
                  </div>
                ) : (
                  colProjects.map((p) => {
                    const isMainCase = p.id === 'MPLADS 4821';

                    return (
                      <div
                        key={p.id}
                        onClick={() => onSelectProject(p.id)}
                        className={`p-2.5 rounded bg-white border cursor-pointer transition-all hover:shadow-xs hover:border-slate-400 space-y-1.5 ${
                          isMainCase
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono font-bold text-slate-900">
                            {p.id}
                          </span>
                          <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                            p.riskScore >= 80 ? 'text-rose-700 bg-rose-50' : 'text-slate-700 bg-slate-100'
                          }`}>
                            {p.riskScore}/100
                          </span>
                        </div>

                        <div className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug">
                          {p.name}
                        </div>

                        <div className="text-[10px] text-slate-500">
                          {p.district} · ₹{p.allocatedAmountLakhs.toFixed(1)}L
                        </div>

                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="truncate max-w-[120px]">{p.contractor}</span>
                          <span className="text-slate-800 font-semibold hover:underline">
                            Open →
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
