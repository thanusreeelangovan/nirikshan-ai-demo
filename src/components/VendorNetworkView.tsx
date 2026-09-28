import React, { useState } from 'react';
import { 
  Network, 
  Building2, 
  FolderKanban, 
  User, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { VENDOR_NETWORK_DATA } from '../data/vendorNetworkData';
import { VendorNode, VendorEdge } from '../types';

interface VendorNetworkViewProps {
  onSelectProject?: (projectId: string) => void;
}

export const VendorNetworkView: React.FC<VendorNetworkViewProps> = ({
  onSelectProject,
}) => {
  const data = VENDOR_NETWORK_DATA;
  const [selectedNodeId, setSelectedNodeId] = useState<string>('v-shreeram');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const selectedNode = data.nodes.find(n => n.id === selectedNodeId) || data.nodes[0];
  const selectedEdge = selectedEdgeId ? data.edges.find(e => e.id === selectedEdgeId) : null;

  // Filter edges connected to selected node
  const connectedEdges = data.edges.filter(
    e => e.source === selectedNodeId || e.target === selectedNodeId
  );

  // Position nodes nicely on an SVG layout coordinate space (800 x 500)
  const nodePositions: Record<string, { x: number; y: number }> = {
    'v-shreeram': { x: 380, y: 220 }, // Center primary contractor
    'd-kadam': { x: 200, y: 100 },    // Top-left director
    'd-sunita': { x: 380, y: 70 },    // Top-center director
    'v-maratha': { x: 100, y: 220 },  // Left sister firm
    'a-ambad': { x: 230, y: 360 },    // Bottom-left shared address
    'v-omkar': { x: 120, y: 440 },    // Bottom-left cover bidder
    't-081': { x: 340, y: 440 },      // Tender 081
    'p-4821': { x: 580, y: 380 },     // Flagged Project #4821
    'p-4899': { x: 650, y: 260 },     // Linked Project #4899
    'p-4395': { x: 620, y: 130 },     // Linked Project #4395
    'p-4440': { x: 490, y: 90 },      // Linked Project #4440
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'contractor': return Building2;
      case 'sister_firm': return Building2;
      case 'project': return FolderKanban;
      case 'director': return User;
      case 'address': return MapPin;
      default: return FileText;
    }
  };

  const getNodeColor = (node: VendorNode) => {
    if (node.id === selectedNodeId) return 'fill-slate-900 stroke-slate-900 text-white';
    if (node.id === 'v-shreeram') return 'fill-rose-700 stroke-rose-800 text-white';
    if (node.id === 'p-4821') return 'fill-rose-600 stroke-rose-700 text-white';
    if (node.type === 'director') return 'fill-amber-600 stroke-amber-700 text-white';
    if (node.type === 'sister_firm') return 'fill-orange-600 stroke-orange-700 text-white';
    if (node.type === 'address') return 'fill-indigo-600 stroke-indigo-700 text-white';
    return 'fill-slate-700 stroke-slate-800 text-white';
  };

  const getEdgeStroke = (edge: VendorEdge) => {
    const isConnected = edge.source === selectedNodeId || edge.target === selectedNodeId;
    if (edge.id === selectedEdgeId) return 'stroke-rose-600 stroke-[3]';
    if (isConnected) return 'stroke-slate-900 stroke-[2.2]';
    return 'stroke-slate-300 stroke-[1.2]';
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Procurement & Entity Forensics
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-medium border border-rose-200">
              Unusual Vendor Concentration Detected
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Vendor Network Intelligence: Shreeram Infrastructure Cluster
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Interactive entity graph highlighting bidding syndicates, common directorships (DIN), shared registered addresses, and project concentration.
          </p>
        </div>

        {/* Tenders Summary Metric */}
        <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs shrink-0 flex items-center gap-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Tenders Won / Bidded</div>
            <div className="text-base font-bold font-mono text-rose-700">
              {data.summary.tendersWon} of {data.summary.tendersTotal} Won (81.8%)
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Connected Entities</div>
            <div className="text-base font-bold font-mono text-slate-800">
              {data.summary.connectedEntities} Entities
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspection Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive SVG Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-slate-600 flex items-center gap-3">
              <span className="font-semibold text-slate-800">Interactive Forensic Graph:</span>
              <span className="text-[11px] text-slate-400">Click any node or relationship line to inspect</span>
            </div>

            {/* Entity Type Legend */}
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-700" />
                <span>Primary Contractor</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                <span>Sister / Co-Bidder</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span>Director (DIN)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Shared Address</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span>MPLADS Project</span>
              </div>
            </div>
          </div>

          {/* SVG Viewport */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded relative overflow-hidden h-[480px]">
            <svg 
              className="w-full h-full select-none" 
              viewBox="0 0 760 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
              </defs>

              {/* Edges */}
              {data.edges.map((edge) => {
                const sourcePos = nodePositions[edge.source];
                const targetPos = nodePositions[edge.target];
                if (!sourcePos || !targetPos) return null;

                const isSelected = edge.id === selectedEdgeId;
                const midX = (sourcePos.x + targetPos.x) / 2;
                const midY = (sourcePos.y + targetPos.y) / 2;

                return (
                  <g 
                    key={edge.id} 
                    className="cursor-pointer"
                    onClick={() => setSelectedEdgeId(edge.id)}
                  >
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      className={`${getEdgeStroke(edge)} transition-all`}
                      markerEnd="url(#arrow)"
                    />
                    {/* Edge Label Pill */}
                    <rect
                      x={midX - 38}
                      y={midY - 9}
                      width={76}
                      height={18}
                      rx={3}
                      className={isSelected ? 'fill-rose-700' : 'fill-white stroke-slate-300 stroke-1'}
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      className={`text-[9px] font-sans font-medium pointer-events-none ${
                        isSelected ? 'fill-white font-bold' : 'fill-slate-600'
                      }`}
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {data.nodes.map((node) => {
                const pos = nodePositions[node.id] || { x: 300, y: 250 };
                const isSelected = node.id === selectedNodeId;
                const isShreeram = node.id === 'v-shreeram';
                const isProject4821 = node.id === 'p-4821';

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      setSelectedEdgeId(null);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for critical nodes */}
                    {(isShreeram || isProject4821) && (
                      <circle
                        r={isShreeram ? 34 : 26}
                        className="fill-none stroke-rose-400 stroke-1 animate-ping opacity-30"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      r={isShreeram ? 28 : isSelected ? 22 : 18}
                      className={`${getNodeColor(node)} ${
                        isSelected ? 'stroke-slate-900 stroke-2 ring-2 ring-slate-400' : ''
                      } transition-all`}
                    />

                    {/* Label below node */}
                    <text
                      y={isShreeram ? 42 : 32}
                      textAnchor="middle"
                      className={`text-[10px] font-sans ${
                        isSelected ? 'font-bold fill-slate-900' : 'font-medium fill-slate-700'
                      }`}
                    >
                      {node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Subtext info */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Entities mapped from Ministry of Corporate Affairs (MCA) filings and MahaTenders e-procurement archives.
            </span>
            <span className="font-mono text-slate-600">
              IP: 115.112.44.18 (Matched in 2 tender logs)
            </span>
          </div>
        </div>

        {/* Right: Inspection Side Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Node Details Card */}
          <div className="bg-white border border-slate-200 rounded p-4 space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Entity Inspector
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase">
                  {selectedNode.type.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                {selectedNode.name}
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {selectedNode.details.role && (
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Classification:</span>
                  <div className="font-medium text-slate-800">{selectedNode.details.role}</div>
                </div>
              )}

              {selectedNode.details.din && (
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Director Identification Number:</span>
                  <div className="font-mono font-bold text-amber-700">{selectedNode.details.din}</div>
                </div>
              )}

              {selectedNode.details.pan && (
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Corporate PAN:</span>
                  <div className="font-mono text-slate-700">{selectedNode.details.pan}</div>
                </div>
              )}

              {selectedNode.details.location && (
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Registered Location:</span>
                  <div className="text-slate-700">{selectedNode.details.location}</div>
                </div>
              )}

              {selectedNode.details.winRate && (
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Bidding Concentration:</div>
                  <div className="font-mono font-bold text-rose-700 mt-0.5">
                    {selectedNode.details.winRate} ({selectedNode.details.tendersWon} Won of {selectedNode.details.tendersBidded} Bids)
                  </div>
                </div>
              )}

              {/* Forensic Rationale Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Why This Relationship Merits Review</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  {selectedNode.details.flagNote}
                </p>
              </div>

              {/* If it's a project node, offer jump to workspace */}
              {selectedNode.type === 'project' && selectedNode.id.includes('4821') && onSelectProject && (
                <button
                  onClick={() => onSelectProject('MPLADS 4821')}
                  className="w-full mt-2 py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Project #4821 Workspace</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Active Link Details (if link clicked) */}
          {selectedEdge && (
            <div className="bg-white border border-slate-200 rounded p-4 space-y-2 text-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Relationship Forensic Note
              </div>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="font-mono text-rose-700">{selectedEdge.label}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {selectedEdge.note}
              </p>
            </div>
          )}

          {/* Connected Links Summary */}
          <div className="bg-white border border-slate-200 rounded p-4 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 text-xs">
              Identified Network Flags (Summary)
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              {data.summary.flagsIdentified.map((flag, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold mt-0.5">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
