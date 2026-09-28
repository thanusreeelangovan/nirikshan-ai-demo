import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ChevronRight,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { Project, RiskLevel, InvestigationStatus } from '../types';

interface RiskRadarViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  selectedRiskFilter: string;
  onFilterRiskLevel: (level: string) => void;
  selectedDistrictFilter: string;
  onFilterDistrict: (dist: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const RiskRadarView: React.FC<RiskRadarViewProps> = ({
  projects,
  onSelectProject,
  selectedRiskFilter,
  onFilterRiskLevel,
  selectedDistrictFilter,
  onFilterDistrict,
  searchQuery,
  onSearchChange,
}) => {
  // Filters state
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedFY, setSelectedFY] = useState<string>('All');
  const [selectedAgency, setSelectedAgency] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'riskScore' | 'fundUtil' | 'divergence' | 'budget'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Extract distinct filter options
  const districts = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.district))).sort();
    return ['All', ...list];
  }, [projects]);

  const projectTypes = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.type))).sort();
    return ['All', ...list];
  }, [projects]);

  const agencies = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.implementingAgency))).sort();
    return ['All', ...list];
  }, [projects]);

  const statuses = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.status))).sort();
    return ['All', ...list];
  }, [projects]);

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Risk filter
      if (selectedRiskFilter === 'High Priority & Critical') {
        if (p.riskLevel !== 'Critical Investigation' && p.riskLevel !== 'High Priority') return false;
      } else if (selectedRiskFilter !== 'All' && p.riskLevel !== selectedRiskFilter) {
        return false;
      }

      // District filter
      if (selectedDistrictFilter !== 'All' && p.district !== selectedDistrictFilter) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All' && p.type !== selectedType) {
        return false;
      }

      // Financial Year filter
      if (selectedFY !== 'All' && p.financialYear !== selectedFY) {
        return false;
      }

      // Agency filter
      if (selectedAgency !== 'All' && p.implementingAgency !== selectedAgency) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All' && p.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDist = p.district.toLowerCase().includes(q);
        const matchesContractor = p.contractor.toLowerCase().includes(q);
        const matchesTrigger = p.latestTrigger.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesDist && !matchesContractor && !matchesTrigger) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortBy === 'riskScore') {
        valA = a.riskScore;
        valB = b.riskScore;
      } else if (sortBy === 'fundUtil') {
        valA = a.fundUtilisationPct;
        valB = b.fundUtilisationPct;
      } else if (sortBy === 'divergence') {
        valA = a.fundUtilisationPct - a.physicalProgressPct;
        valB = b.fundUtilisationPct - b.physicalProgressPct;
      } else if (sortBy === 'budget') {
        valA = a.allocatedAmountLakhs;
        valB = b.allocatedAmountLakhs;
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [
    projects,
    selectedRiskFilter,
    selectedDistrictFilter,
    selectedType,
    selectedFY,
    selectedAgency,
    selectedStatus,
    searchQuery,
    sortBy,
    sortOrder
  ]);

  const resetFilters = () => {
    onFilterRiskLevel('All');
    onFilterDistrict('All');
    setSelectedType('All');
    setSelectedFY('All');
    setSelectedAgency('All');
    setSelectedStatus('All');
    onSearchChange('');
  };

  const getRiskStyle = (level: RiskLevel) => {
    switch (level) {
      case 'Critical Investigation':
        return 'text-rose-700 bg-rose-50 border border-rose-200 font-semibold';
      case 'High Priority':
        return 'text-orange-700 bg-orange-50 border border-orange-200 font-semibold';
      case 'Needs Review':
        return 'text-amber-800 bg-amber-50 border border-amber-200 font-medium';
      case 'Normal':
        return 'text-emerald-800 bg-emerald-50 border border-emerald-200 font-medium';
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Header Info Banner with Risk vs Confidence doctrine */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Risk Radar: Anomaly Prioritisation Index</span>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {filteredProjects.length} of {projects.length} Works Displayed
            </span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Ranked by multi-dimensional anomaly weightings. Auditing focuses first on high-divergence funds and procurement syndicates.
          </p>
        </div>

        {/* Risk vs Confidence Explanation Card */}
        <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-[11px] max-w-sm shrink-0">
          <div className="flex items-center gap-1 font-semibold text-slate-800 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Understanding Risk vs. Evidence Confidence</span>
          </div>
          <p className="text-slate-600 leading-snug">
            <span className="font-semibold text-rose-700">Risk Score:</span> How unusual or concerning observed project behavior is.
            <br />
            <span className="font-semibold text-slate-800">Evidence Confidence:</span> How strongly current cross-verified documents support the finding.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded p-3 space-y-3">
        {/* Row 1: Fast Search & Quick Risk Segmented Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Risk Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded overflow-x-auto">
            {[
              { id: 'All', label: 'All Projects' },
              { id: 'High Priority & Critical', label: 'Priority Triage (25)' },
              { id: 'Critical Investigation', label: 'Critical' },
              { id: 'High Priority', label: 'High' },
              { id: 'Needs Review', label: 'Needs Review' },
              { id: 'Normal', label: 'Normal' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => onFilterRiskLevel(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedRiskFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reset Filters Action */}
          <button
            onClick={resetFilters}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 self-end sm:self-center font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Row 2: Granular Dropdown Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          {/* District Selector */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              District
            </label>
            <select
              value={selectedDistrictFilter}
              onChange={(e) => onFilterDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Project Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              {projectTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Financial Year */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Financial Year
            </label>
            <select
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="All">All Years</option>
              <option value="2024-25">FY 2024-25</option>
              <option value="2023-24">FY 2023-24</option>
            </select>
          </div>

          {/* Implementing Agency */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Agency
            </label>
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 truncate"
            >
              {agencies.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Investigation Status */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Audit Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="All">All Statuses</option>
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sort By Metric */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Sort By
            </label>
            <div className="flex items-center gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value="riskScore">Risk Score</option>
                <option value="divergence">Fund Gap %</option>
                <option value="fundUtil">Fund Util %</option>
                <option value="budget">Allocated Budget</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                title="Toggle sort direction"
                className="p-1.5 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 text-slate-600"
              >
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Forensic Radar Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Project ID & Title</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Project Type</th>
                <th className="py-2.5 px-3">Implementing Agency</th>
                <th className="py-2.5 px-3 text-right">Allocated</th>
                <th className="py-2.5 px-3 text-right">Fund Util.</th>
                <th className="py-2.5 px-3 text-right">Physical</th>
                <th className="py-2.5 px-3 text-center">Risk Level</th>
                <th className="py-2.5 px-3 text-center">Risk Score</th>
                <th className="py-2.5 px-3 text-center">Confidence</th>
                <th className="py-2.5 px-3">Latest Trigger</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-500">
                    No projects found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const isMainSuspicious = p.id === 'MPLADS 4821';
                  const divergence = p.fundUtilisationPct - p.physicalProgressPct;

                  return (
                    <tr
                      key={p.id}
                      onClick={() => onSelectProject(p.id)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isMainSuspicious
                          ? 'bg-rose-50/40 ring-1 ring-inset ring-rose-200'
                          : ''
                      }`}
                    >
                      {/* Project ID & Title */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          {isMainSuspicious && (
                            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse shrink-0" />
                          )}
                          <span className="font-mono font-bold text-slate-900">
                            {p.id}
                          </span>
                        </div>
                        <div className="text-slate-800 font-medium truncate max-w-xs text-[11px] mt-0.5">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Contractor: {p.contractor}
                        </div>
                      </td>

                      {/* District */}
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {p.district}
                        <div className="text-[10px] text-slate-400">
                          {p.constituency}
                        </div>
                      </td>

                      {/* Project Type */}
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {p.type}
                      </td>

                      {/* Implementing Agency */}
                      <td className="py-3 px-3 text-slate-600 truncate max-w-[170px]" title={p.implementingAgency}>
                        {p.implementingAgency}
                      </td>

                      {/* Allocated Amount */}
                      <td className="py-3 px-3 text-right font-mono text-slate-800 whitespace-nowrap">
                        ₹{p.allocatedAmountLakhs.toFixed(1)}L
                      </td>

                      {/* Fund Utilisation */}
                      <td className="py-3 px-3 text-right font-mono font-semibold whitespace-nowrap">
                        <span className={p.fundUtilisationPct >= 75 ? 'text-rose-700' : 'text-slate-800'}>
                          {p.fundUtilisationPct}%
                        </span>
                      </td>

                      {/* Physical Progress */}
                      <td className="py-3 px-3 text-right font-mono whitespace-nowrap">
                        <span className="text-slate-800">{p.physicalProgressPct}%</span>
                        {divergence > 25 && (
                          <div className="text-[10px] font-mono text-rose-600 font-bold">
                            +{divergence}% gap
                          </div>
                        )}
                      </td>

                      {/* Risk Level */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded ${getRiskStyle(p.riskLevel)}`}>
                          {p.riskLevel}
                        </span>
                      </td>

                      {/* Risk Score */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                          p.riskScore >= 80 
                            ? 'text-rose-700 bg-rose-50 border border-rose-200' 
                            : p.riskScore >= 60 
                            ? 'text-orange-700 bg-orange-50' 
                            : p.riskScore >= 40 
                            ? 'text-amber-800 bg-amber-50' 
                            : 'text-emerald-700 bg-emerald-50'
                        }`}>
                          {p.riskScore}
                        </span>
                      </td>

                      {/* Evidence Confidence */}
                      <td className="py-3 px-3 text-center font-mono text-slate-700 whitespace-nowrap">
                        {p.evidenceConfidencePct}%
                      </td>

                      {/* Latest Trigger */}
                      <td className="py-3 px-3 text-slate-600 text-[11px] truncate max-w-[200px]" title={p.latestTrigger}>
                        {p.latestTrigger}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(p.id);
                          }}
                          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                            isMainSuspicious
                              ? 'bg-rose-700 text-white hover:bg-rose-800 shadow-xs'
                              : 'bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          Workspace
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Click any row to open the complete Investigation Workspace & Evidence Audit Trail.
          </span>
          <span className="font-mono text-[11px]">
            Data synced with MoSPI MPLADS Portal & Maharashtra State Treasury
          </span>
        </div>
      </div>
    </div>
  );
};
