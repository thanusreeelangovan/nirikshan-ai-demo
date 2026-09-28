import React from 'react';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  FileWarning, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Project } from '../types';
import { EXECUTIVE_STATS } from '../data/mockData';

interface OverviewViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onFilterRiskLevel: (level: string) => void;
  onFilterDistrict: (district: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  projects,
  onSelectProject,
  onFilterRiskLevel,
  onFilterDistrict,
  onNavigateToTab,
}) => {
  // Demo focus project
  const project4821 = projects.find(p => p.id === 'MPLADS 4821') || projects[0];

  // Top flagged projects
  const topFlaggedProjects = [...projects]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  // Projects with recent risk changes
  const recentRiskShifts = projects
    .filter(p => p.previousRiskScore && p.riskScore !== p.previousRiskScore)
    .sort((a, b) => (b.riskScore - (b.previousRiskScore || 0)) - (a.riskScore - (a.previousRiskScore || 0)));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Platform Welcome & Core Doctrine Banner */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Executive Audit Console
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
              Early Warning Engine Active
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            MPLADS Forensic Monitoring & Anomaly Detection
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Detect anomalies · Trace evidence · Prioritise investigations. The system flags unusual behavioural and financial patterns for human auditor review without declaring definitive fraud.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => onSelectProject('MPLADS 4821')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-700 rounded hover:bg-rose-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-200" />
            <span>Open Flagged Case #4821</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen 1 Top Statistics (Fully Interactive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Metric 1: Active Projects */}
        <button
          onClick={() => {
            onFilterRiskLevel('All');
            onNavigateToTab('risk-radar');
          }}
          className="text-left bg-white border border-slate-200 hover:border-slate-400 rounded p-4 transition-all group relative"
        >
          <div className="text-xs font-medium text-slate-500 flex items-center justify-between">
            <span>Active Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tracking-tight">
            {EXECUTIVE_STATS.activeProjects}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Across 36 Maharashtra Districts
          </div>
        </button>

        {/* Metric 2: High Priority Projects (CLICKABLE TO FILTER!) */}
        <button
          onClick={() => {
            onFilterRiskLevel('High Priority & Critical');
            onNavigateToTab('risk-radar');
          }}
          className="text-left bg-rose-50/50 border border-rose-200 hover:border-rose-400 rounded p-4 transition-all group relative"
        >
          <div className="text-xs font-semibold text-rose-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              High Priority Projects
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 group-hover:text-rose-700 transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-700 tracking-tight">
            {EXECUTIVE_STATS.highPriorityProjects}
          </div>
          <div className="mt-1 text-[11px] text-rose-600 font-medium">
            Requires active audit triage · Click to filter
          </div>
        </button>

        {/* Metric 3: Funds Under Review */}
        <button
          onClick={() => {
            onFilterRiskLevel('High Priority & Critical');
            onNavigateToTab('risk-radar');
          }}
          className="text-left bg-white border border-slate-200 hover:border-slate-400 rounded p-4 transition-all group"
        >
          <div className="text-xs font-medium text-slate-500 flex items-center justify-between">
            <span>Funds Under Review</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-700 tracking-tight">
            ₹{EXECUTIVE_STATS.fundsUnderReviewCr} Cr
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Disbursements with recorded divergence
          </div>
        </button>

        {/* Metric 4: Overall Compliance */}
        <button
          onClick={() => {
            onFilterRiskLevel('Normal');
            onNavigateToTab('risk-radar');
          }}
          className="text-left bg-white border border-slate-200 hover:border-slate-400 rounded p-4 transition-all group"
        >
          <div className="text-xs font-medium text-slate-500 flex items-center justify-between">
            <span>Overall Compliance</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-700 tracking-tight">
            {EXECUTIVE_STATS.compliancePct}%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            249 of 342 within normal parameters
          </div>
        </button>

        {/* Metric 5: New Alerts This Week */}
        <button
          onClick={() => {
            onNavigateToTab('investigations');
          }}
          className="text-left bg-white border border-slate-200 hover:border-slate-400 rounded p-4 transition-all group"
        >
          <div className="text-xs font-medium text-slate-500 flex items-center justify-between">
            <span>New Alerts This Week</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tracking-tight">
            {EXECUTIVE_STATS.newAlertsThisWeek}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Triggered by recent UC & geo-audits
          </div>
        </button>
      </div>

      {/* Row 2: Risk Distribution Bar & Recent Risk Shifts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Distribution Card */}
        <div className="bg-white border border-slate-200 rounded p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Risk Tier Distribution
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              342 Total Works
            </span>
          </div>

          {/* Distribution Stacked Bar */}
          <div className="h-3 w-full bg-slate-100 rounded overflow-hidden flex">
            <div 
              style={{ width: `${(EXECUTIVE_STATS.riskDistribution.critical / 342) * 100}%` }} 
              className="bg-rose-600 h-full" 
              title="Critical: 4 projects"
            />
            <div 
              style={{ width: `${(EXECUTIVE_STATS.riskDistribution.high / 342) * 100}%` }} 
              className="bg-orange-500 h-full" 
              title="High Priority: 21 projects"
            />
            <div 
              style={{ width: `${(EXECUTIVE_STATS.riskDistribution.needsReview / 342) * 100}%` }} 
              className="bg-amber-400 h-full" 
              title="Needs Review: 68 projects"
            />
            <div 
              style={{ width: `${(EXECUTIVE_STATS.riskDistribution.normal / 342) * 100}%` }} 
              className="bg-emerald-500 h-full" 
              title="Normal: 249 projects"
            />
          </div>

          {/* Interactive Tier Click Targets */}
          <div className="mt-4 space-y-2 text-xs">
            <button
              onClick={() => {
                onFilterRiskLevel('Critical Investigation');
                onNavigateToTab('risk-radar');
              }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-rose-50 text-left transition-colors border border-transparent hover:border-rose-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-rose-600 shrink-0" />
                <span className="font-medium text-slate-800">Critical Investigation</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-rose-700">{EXECUTIVE_STATS.riskDistribution.critical}</span>
                <span className="text-slate-400 text-[11px]">1.2%</span>
              </div>
            </button>

            <button
              onClick={() => {
                onFilterRiskLevel('High Priority');
                onNavigateToTab('risk-radar');
              }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-orange-50 text-left transition-colors border border-transparent hover:border-orange-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-orange-500 shrink-0" />
                <span className="font-medium text-slate-800">High Priority</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-orange-700">{EXECUTIVE_STATS.riskDistribution.high}</span>
                <span className="text-slate-400 text-[11px]">6.1%</span>
              </div>
            </button>

            <button
              onClick={() => {
                onFilterRiskLevel('Needs Review');
                onNavigateToTab('risk-radar');
              }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-amber-50 text-left transition-colors border border-transparent hover:border-amber-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-400 shrink-0" />
                <span className="font-medium text-slate-800">Needs Review</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-amber-700">{EXECUTIVE_STATS.riskDistribution.needsReview}</span>
                <span className="text-slate-400 text-[11px]">19.9%</span>
              </div>
            </button>

            <button
              onClick={() => {
                onFilterRiskLevel('Normal');
                onNavigateToTab('risk-radar');
              }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-emerald-50 text-left transition-colors border border-transparent hover:border-emerald-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 shrink-0" />
                <span className="font-medium text-slate-800">Normal (Baseline)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-emerald-700">{EXECUTIVE_STATS.riskDistribution.normal}</span>
                <span className="text-slate-400 text-[11px]">72.8%</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Risk Shift / Triggers (Highlighting Project #4821 jump from 64 to 91!) */}
        <div className="bg-white border border-slate-200 rounded p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recent Changes in Project Risk (Weekly Deltas)
            </h3>
            <span className="text-[11px] text-slate-500">
              Sorted by largest risk progression
            </span>
          </div>

          <div className="space-y-2.5">
            {recentRiskShifts.slice(0, 4).map((p) => {
              const delta = p.riskScore - (p.previousRiskScore || 0);
              const isHighlight = p.id === 'MPLADS 4821';

              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p.id)}
                  className={`p-3 rounded border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isHighlight
                      ? 'bg-rose-50/60 border-rose-300 ring-1 ring-rose-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-xs text-slate-900">
                        {p.id}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-medium text-slate-800 truncate max-w-xs">
                        {p.name}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {p.district}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 line-clamp-1">
                      <span className="font-medium text-slate-700">Trigger:</span> {p.latestTrigger}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Score Shift</div>
                      <div className="flex items-center gap-1 font-mono text-xs font-bold">
                        <span className="text-slate-400">{p.previousRiskScore}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-rose-700 font-extrabold">{p.riskScore}</span>
                        <span className="text-rose-600 text-[11px] bg-rose-100 px-1 rounded ml-1">
                          +{delta}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(p.id);
                      }}
                      className="px-2.5 py-1 text-xs font-medium bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
                    >
                      Investigate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: District Wise Monitoring & Fund Utilisation vs Physical Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* District Wise Monitoring */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                District-Wise Project Monitoring
              </h3>
              <p className="text-[11px] text-slate-500">
                Click district row to filter Risk Radar
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('risk-radar')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
            >
              <span>View All 36 Districts</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 font-medium">District</th>
                  <th className="pb-2 font-medium text-right">Active</th>
                  <th className="pb-2 font-medium text-right">High Priority</th>
                  <th className="pb-2 font-medium text-right">Under Review</th>
                  <th className="pb-2 font-medium text-right">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXECUTIVE_STATS.districtBreakdown.map((d) => (
                  <tr
                    key={d.district}
                    onClick={() => {
                      if (d.district.includes('Others')) {
                        onFilterDistrict('All');
                      } else {
                        onFilterDistrict(d.district);
                      }
                      onNavigateToTab('risk-radar');
                    }}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 font-medium text-slate-800">
                      {d.district}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-600">
                      {d.active}
                    </td>
                    <td className="py-2.5 text-right font-mono font-semibold text-rose-700">
                      {d.highPriority > 0 ? d.highPriority : '-'}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-700">
                      ₹{d.fundsUnderReviewLakhs.toFixed(1)}L
                    </td>
                    <td className="py-2.5 text-right font-mono font-medium">
                      <span className={d.compliancePct < 80 ? 'text-amber-700' : 'text-emerald-700'}>
                        {d.compliancePct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fund Utilisation vs Physical Progress (The Visual Forensic Divergence) */}
        <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Fund Utilisation vs. Physical Progress Divergence
              </h3>
              <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                Critical Zone: Gap &gt; 35%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">
              Financial release exceeding verified ground execution is the primary early warning signal.
            </p>

            {/* Visual Scatter Grid of Selected Works */}
            <div className="space-y-3">
              {/* Highlight Case: Project #4821 */}
              <div 
                onClick={() => onSelectProject('MPLADS 4821')}
                className="p-3 rounded bg-rose-50/70 border border-rose-300 cursor-pointer hover:bg-rose-100/70 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>MPLADS 4821 (Nashik Rural Road)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                    47% Divergence Gap
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Funds Utilised: 78% (₹33.2L)</span>
                    <span className="text-rose-700 font-semibold font-mono">78%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                    <div className="bg-rose-600 h-full w-[78%]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                    <span>Verified Physical Progress: 31%</span>
                    <span className="text-slate-700 font-semibold font-mono">31%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                    <div className="bg-slate-700 h-full w-[31%]" />
                  </div>
                </div>
              </div>

              {/* Normal Case: Project #3914 for direct comparison */}
              <div 
                onClick={() => onSelectProject('MPLADS 3914')}
                className="p-3 rounded bg-emerald-50/50 border border-emerald-200 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MPLADS 3914 (Pune Health Centre Solar)</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                    Balanced (+3% Physical Lead)
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Funds Utilised: 46% (₹22.5L)</span>
                    <span className="text-emerald-800 font-semibold font-mono">46%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[46%]" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                    <span>Verified Physical Progress: 49%</span>
                    <span className="text-emerald-800 font-semibold font-mono">49%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                    <div className="bg-emerald-700 h-full w-[49%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Audit Rule: Trigger priority alert when Utilisation - Physical &gt; 25%
            </span>
            <button
              onClick={() => onNavigateToTab('risk-radar')}
              className="text-slate-900 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore Scatter Grid</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Top Projects Requiring Immediate Auditor Investigation */}
      <div className="bg-white border border-slate-200 rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Top Projects Requiring Immediate Auditor Attention
            </h3>
            <p className="text-[11px] text-slate-500">
              Ranked by composite forensic anomaly score
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('risk-radar')}
            className="text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1"
          >
            <span>View Full Risk Radar (25 Projects)</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium">
                <th className="pb-2.5">Project ID & Title</th>
                <th className="pb-2.5">District</th>
                <th className="pb-2.5">Implementing Agency</th>
                <th className="pb-2.5 text-right">Allocated</th>
                <th className="pb-2.5 text-right">Utilised</th>
                <th className="pb-2.5 text-right">Physical</th>
                <th className="pb-2.5 text-center">Risk Score</th>
                <th className="pb-2.5 text-center">Confidence</th>
                <th className="pb-2.5 text-right">Triage Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topFlaggedProjects.map((p) => {
                const isMainDemo = p.id === 'MPLADS 4821';

                return (
                  <tr
                    key={p.id}
                    onClick={() => onSelectProject(p.id)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      isMainDemo ? 'bg-rose-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {isMainDemo && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping shrink-0" />
                        )}
                        <span className="font-mono font-semibold text-slate-900">
                          {p.id}
                        </span>
                      </div>
                      <div className="text-slate-700 font-normal truncate max-w-xs text-[11px] mt-0.5">
                        {p.name}
                      </div>
                    </td>

                    <td className="py-3 text-slate-600">
                      {p.district}
                    </td>

                    <td className="py-3 text-slate-600 truncate max-w-[180px]">
                      {p.implementingAgency}
                    </td>

                    <td className="py-3 text-right font-mono text-slate-700">
                      ₹{p.allocatedAmountLakhs.toFixed(1)}L
                    </td>

                    <td className="py-3 text-right font-mono font-semibold text-rose-700">
                      {p.fundUtilisationPct}%
                    </td>

                    <td className="py-3 text-right font-mono text-slate-700">
                      {p.physicalProgressPct}%
                    </td>

                    <td className="py-3 text-center">
                      <span className="font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[11px]">
                        {p.riskScore}/100
                      </span>
                    </td>

                    <td className="py-3 text-center font-mono text-slate-600">
                      {p.evidenceConfidencePct}%
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(p.id);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded transition-colors whitespace-nowrap"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
