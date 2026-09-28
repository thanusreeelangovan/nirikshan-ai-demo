import React from 'react';
import { 
  LayoutDashboard, 
  Radar, 
  FolderKanban, 
  ShieldAlert, 
  Network, 
  FileCheck2, 
  FileText, 
  Cpu, 
  Settings,
  Scale
} from 'lucide-react';

export type NavigationTab = 
  | 'overview' 
  | 'risk-radar' 
  | 'projects' 
  | 'investigations' 
  | 'vendor-network' 
  | 'evidence-centre' 
  | 'reports' 
  | 'system-insights' 
  | 'settings';

interface SidebarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  highPriorityCount: number;
  newAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  highPriorityCount,
  newAlertsCount,
}) => {
  const navItems = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'risk-radar' as NavigationTab, label: 'Risk Radar', icon: Radar, badge: `${highPriorityCount} priority`, badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200' },
    { id: 'projects' as NavigationTab, label: 'Projects', icon: FolderKanban },
    { id: 'investigations' as NavigationTab, label: 'Investigations', icon: ShieldAlert, badge: `${newAlertsCount} new`, badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200' },
    { id: 'vendor-network' as NavigationTab, label: 'Vendor Network', icon: Network },
    { id: 'evidence-centre' as NavigationTab, label: 'Evidence Centre', icon: FileCheck2 },
    { id: 'reports' as NavigationTab, label: 'Reports', icon: FileText },
    { id: 'system-insights' as NavigationTab, label: 'System Insights', icon: Cpu },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 select-none no-print">
      {/* Platform Branding */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white leading-tight">
              Nirikshan AI
            </h1>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Audit Intelligence
            </div>
          </div>
        </div>
        
        <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
          AI powered early warning and forensic intelligence for MPLADS projects
        </p>

        {/* Audit Jurisdiction Tag */}
        <div className="mt-3 py-1.5 px-2 bg-slate-800/60 rounded border border-slate-700/50 flex items-center justify-between text-[11px] text-slate-300">
          <span className="text-slate-400">Jurisdiction</span>
          <span className="font-medium text-slate-200">MoSPI · Maharashtra</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Forensic Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-colors text-left ${
                isActive
                  ? 'bg-slate-800 text-white border-l-2 border-emerald-500 font-semibold shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded leading-none shrink-0 ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Auditor Identity & Core Doctrine */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-xs">
        <div className="p-2.5 rounded bg-slate-800/50 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Officer Session
          </div>
          <div className="mt-0.5 text-xs font-medium text-slate-200">
            P. Deshmukh, Sr. Audit Officer
          </div>
          <div className="text-[11px] text-slate-400">
            Office of PAG (Audit) · Mumbai
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-400 leading-tight text-center">
          Detect anomalies · Trace evidence · Prioritise
        </div>
      </div>
    </aside>
  );
};
