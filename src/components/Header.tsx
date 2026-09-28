import React from 'react';
import { Search, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { NavigationTab } from './Sidebar';

interface HeaderProps {
  currentTab: NavigationTab;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedProjectId?: string;
  onOpenDemoProject: () => void;
  onOpenInvestigationBrief: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  searchQuery,
  onSearchChange,
  selectedProjectId,
  onOpenDemoProject,
  onOpenInvestigationBrief,
}) => {
  const getTabLabel = (tab: NavigationTab) => {
    switch (tab) {
      case 'overview': return 'Executive Overview';
      case 'risk-radar': return 'Risk Radar & Early Warning';
      case 'projects': return 'MPLADS Projects Registry';
      case 'investigations': return 'Active Investigation Queue';
      case 'vendor-network': return 'Vendor Network Intelligence';
      case 'evidence-centre': return 'Evidence Centre & Audit Trail';
      case 'reports': return 'Investigation Briefs & Reports';
      case 'system-insights': return 'Forensic Architecture & Methodology';
      case 'settings': return 'Audit Parameters & Thresholds';
      default: return 'Forensic Workspace';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 no-print">
      {/* Zone 1: Contextual Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">MPLADS Audit</span>
        <span>/</span>
        <span className="text-slate-900 font-medium">{getTabLabel(currentTab)}</span>
        {selectedProjectId && (
          <>
            <span>/</span>
            <span className="text-emerald-700 font-mono font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {selectedProjectId}
            </span>
          </>
        )}
      </div>

      {/* Zone 2: Fast Global Search */}
      <div className="w-80 relative hidden md:block">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search project ID, contractor, district, DIN..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 font-sans transition-all"
        />
      </div>

      {/* Zone 3: Actions & Demo Jump */}
      <div className="flex items-center gap-3">
        {/* Jump to Suspicious Demo Project Shortcut */}
        <button
          onClick={onOpenDemoProject}
          title="Click to immediately review the main suspicious case study Project #4821"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 transition-colors whitespace-nowrap"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Demo Case: Project #4821</span>
        </button>

        {/* Generate Brief Quick Trigger */}
        <button
          onClick={onOpenInvestigationBrief}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Generate Investigation Brief</span>
        </button>
      </div>
    </header>
  );
};
