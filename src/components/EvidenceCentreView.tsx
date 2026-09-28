import React, { useState } from 'react';
import { 
  FileCheck2, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  MapPin,
  Calendar,
  Shield,
  Layers
} from 'lucide-react';
import { Project, EvidenceItem } from '../types';

interface EvidenceCentreViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onInspectEvidenceItem: (item: EvidenceItem) => void;
}

export const EvidenceCentreView: React.FC<EvidenceCentreViewProps> = ({
  projects,
  onSelectProject,
  onInspectEvidenceItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all evidence items from projects
  const allEvidence = projects.flatMap(p => 
    p.evidenceItems.map(item => ({
      ...item,
      projectRefId: p.id,
      projectName: p.name,
      district: p.district
    }))
  );

  const filteredEvidence = allEvidence.filter(item => {
    if (selectedCategory !== 'All' && item.sourceType !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.findingTitle.toLowerCase().includes(q);
      const matchesSource = item.sourceName.toLowerCase().includes(q);
      const matchesProject = item.projectRefId.toLowerCase().includes(q);
      const matchesDoc = item.documentRef.toLowerCase().includes(q);
      if (!matchesTitle && !matchesSource && !matchesProject && !matchesDoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Forensic Repository
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
              Audit Evidence Vault
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Evidence Centre & Document Verification Ledger
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Audit chain: Finding → Evidence → Source → Confidence. Browse verified utilisation certificates, third-party inspection reports, and geo-tagged survey photos.
          </p>
        </div>

        {/* Total Documents Stats */}
        <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs shrink-0 flex items-center gap-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Indexed Documents</div>
            <div className="text-base font-bold font-mono text-slate-900">
              {allEvidence.length} Verified Files
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Avg. Confidence</div>
            <div className="text-base font-bold font-mono text-emerald-700">
              91.4%
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'All', label: 'All Evidence' },
            { id: 'financial', label: 'Treasury & UCs' },
            { id: 'inspection', label: 'Technical Field Audits' },
            { id: 'satellite_geo', label: 'Geospatial & GPS' },
            { id: 'tender_doc', label: 'e-Tenders & Bids' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 font-medium rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fast Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document ref, project ID, source..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded p-4 space-y-3 flex flex-col justify-between hover:border-slate-400 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {item.documentRef}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  {item.confidenceScore}% Conf.
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {item.findingTitle}
                </h4>
                <div 
                  onClick={() => onSelectProject(item.projectRefId)}
                  className="text-[11px] text-slate-500 hover:text-slate-900 cursor-pointer font-medium mt-0.5"
                >
                  {item.projectRefId}: {item.projectName} ({item.district})
                </div>
              </div>

              {/* Observed vs Expected */}
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                <div className="text-slate-800 text-[11px]">
                  <strong className="text-slate-900">Finding:</strong> {item.observedValue}
                </div>
                <div className="text-slate-500 text-[10px]">
                  <strong>Key Gap:</strong> {item.keyDiscrepancy}
                </div>
              </div>

              {/* Document Excerpt if available */}
              {item.documentSnippet && (
                <div className="p-2 bg-amber-50/50 rounded border border-amber-200 text-[10px] text-slate-700 font-mono line-clamp-3">
                  "{item.documentSnippet}"
                </div>
              )}

              {/* Metadata */}
              <div className="text-[10px] text-slate-500 space-y-0.5 pt-1">
                <div><strong>Source:</strong> {item.sourceName}</div>
                <div><strong>Timestamp:</strong> {item.evidenceDate}</div>
                <div><strong>Audit Method:</strong> {item.verificationMethod}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onSelectProject(item.projectRefId)}
                className="text-[11px] text-slate-600 hover:text-slate-900 font-medium"
              >
                Go to Project Case →
              </button>
              <button
                onClick={() => onInspectEvidenceItem(item)}
                className="px-2.5 py-1 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded transition-colors flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>Inspect Source</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
