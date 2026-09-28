import React, { useState } from 'react';
import { Scale, HelpCircle, ArrowRight, ExternalLink, BarChart3, Info } from 'lucide-react';
import { PEER_BENCHMARK_ROAD_4821 } from '../data/peerBenchmarkData';

interface PeerBenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeerBenchmarkModal: React.FC<PeerBenchmarkModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const data = PEER_BENCHMARK_ROAD_4821;
  const [selectedPeer, setSelectedPeer] = useState<any | null>(data.peerPoints.find(p => p.isTarget) || null);

  // Group peers into cost buckets for distribution chart
  // Range: 4.5 to 12.0
  const buckets = [
    { label: '₹5.0 - 5.5L', min: 5.0, max: 5.5, count: 0, peers: [] as any[] },
    { label: '₹5.5 - 6.0L', min: 5.5, max: 6.0, count: 0, peers: [] as any[] },
    { label: '₹6.0 - 6.5L', min: 6.0, max: 6.5, count: 0, peers: [] as any[] },
    { label: '₹6.5 - 7.0L', min: 6.5, max: 7.0, count: 0, peers: [] as any[] },
    { label: '₹7.0 - 8.0L', min: 7.0, max: 8.0, count: 0, peers: [] as any[] },
    { label: '₹8.0 - 10.0L', min: 8.0, max: 10.0, count: 0, peers: [] as any[] },
    { label: '₹10.0L+ (Outlier)', min: 10.0, max: 15.0, count: 0, peers: [] as any[], isOutlierZone: true }
  ];

  data.peerPoints.forEach(p => {
    const bucket = buckets.find(b => p.costPerKm >= b.min && p.costPerKm < b.max);
    if (bucket) {
      bucket.count++;
      bucket.peers.push(p);
    }
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-slate-800 text-emerald-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Peer Benchmark Analysis: Project #4821 Cost Anomaly
              </h2>
              <p className="text-[11px] text-slate-300">
                Cohort Evaluation: {data.cohortName} ({data.sampleSize} Standardised Road Works)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Outlier Metric Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Peer Median Cost</div>
              <div className="mt-1 text-xl font-bold font-mono text-slate-800">
                ₹{data.medianCostPerKm.toFixed(2)} Lakh
              </div>
              <div className="text-[10px] text-slate-500">per kilometer</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Expected Normal Range</div>
              <div className="mt-1 text-base font-bold font-mono text-emerald-700">
                ₹{data.expectedCostMin.toFixed(2)}L – ₹{data.expectedCostMax.toFixed(2)}L
              </div>
              <div className="text-[10px] text-slate-500">IQR 25th - 75th percentile</div>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-300 rounded ring-1 ring-rose-200">
              <div className="text-[10px] text-rose-800 uppercase font-bold">Project #4821 Unit Cost</div>
              <div className="mt-1 text-xl font-bold font-mono text-rose-700">
                ₹{data.targetProjectCostPerKm.toFixed(2)} Lakh
              </div>
              <div className="text-[10px] text-rose-800 font-medium">per kilometer (Total ₹42.6L / 3.8 km)</div>
            </div>

            <div className="p-3 bg-rose-600 text-white rounded flex flex-col justify-center">
              <div className="text-[10px] uppercase font-bold text-rose-200">Variance vs Median</div>
              <div className="mt-0.5 text-2xl font-bold font-mono tracking-tight">
                +{data.deviationPct.toFixed(1)}%
              </div>
              <div className="text-[10px] text-rose-100 font-medium">Severe Statistical Outlier (z = 4.2)</div>
            </div>
          </div>

          {/* Interactive Distribution Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Cohort Unit Cost Distribution (₹ Lakhs / km)
                </h3>
                <p className="text-[11px] text-slate-500">
                  36 baseline road projects cluster between ₹5.1L and ₹6.9L. Project #4821 is an extreme right outlier at ₹11.21L.
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-slate-400" />
                  <span className="text-slate-600">Peers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-600" />
                  <span className="text-rose-700 font-bold">Project #4821</span>
                </div>
              </div>
            </div>

            {/* Distribution Bar Graph */}
            <div className="h-44 flex items-end gap-2 pt-6 pb-2 px-2 border-b border-slate-200 bg-white rounded">
              {buckets.map((b) => {
                const heightPct = Math.max(12, (b.count / 14) * 100);
                const hasTarget = b.peers.some(p => p.isTarget);

                return (
                  <div key={b.label} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] p-1.5 rounded whitespace-nowrap z-20 pointer-events-none shadow-md">
                      <div><strong>{b.label}:</strong> {b.count} projects</div>
                      {hasTarget && <div className="text-rose-300 font-bold">Includes Project #4821 (₹11.21L)</div>}
                    </div>

                    {/* Bar count badge */}
                    <span className="text-[10px] font-mono text-slate-400 mb-1">
                      {b.count}
                    </span>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all ${
                        hasTarget
                          ? 'bg-rose-600 group-hover:bg-rose-700 ring-2 ring-rose-400'
                          : b.isOutlierZone
                          ? 'bg-rose-200'
                          : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    />

                    {/* X-axis label */}
                    <span className="text-[9px] text-slate-500 font-mono mt-2 text-center truncate max-w-full">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Peer Selection Dimensions & Justification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>How This Peer Cohort Was Selected</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {data.methodologyNote}
              </p>
              <div className="pt-1 text-[11px] text-slate-500 font-mono">
                Ensures fair comparison: Same price index, identical geotechnical terrain, similar alignment scale.
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                Matching Criteria Dimensions (6 Factors)
              </div>
              <div className="space-y-1 text-[11px]">
                {data.comparisonDimensions.map((d, i) => (
                  <div key={i} className="flex justify-between py-0.5 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-500 font-medium">{d.label}:</span>
                    <span className="text-slate-800 font-semibold text-right max-w-xs truncate">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Peer Projects Table */}
          <div className="border border-slate-200 rounded overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 flex justify-between items-center">
              <span>Sample Peer Projects in North Maharashtra Cluster (Showing 8 of 37)</span>
              <span className="text-[11px] font-mono text-slate-500">Sorted by proximity to Project #4821</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] bg-slate-50">
                  <th className="py-2 px-3">Project ID</th>
                  <th className="py-2 px-3">Project Name</th>
                  <th className="py-2 px-3">District</th>
                  <th className="py-2 px-3 text-right">Cost / km</th>
                  <th className="py-2 px-3 text-right">Status vs Median</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Project #4821 on top */}
                <tr className="bg-rose-50 font-semibold">
                  <td className="py-2 px-3 font-mono text-rose-700">MPLADS-4821</td>
                  <td className="py-2 px-3 text-rose-900">Rural Road Widening & Improvement (Target)</td>
                  <td className="py-2 px-3 text-rose-800">Nashik</td>
                  <td className="py-2 px-3 text-right font-mono text-rose-700 font-bold">₹11.21L</td>
                  <td className="py-2 px-3 text-right text-rose-700 font-mono">+128.4% (Severe Outlier)</td>
                </tr>

                {data.peerPoints.slice(0, 7).map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono text-slate-700">{p.id}</td>
                    <td className="py-2 px-3 text-slate-800">{p.name}</td>
                    <td className="py-2 px-3 text-slate-600">{p.district}</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">₹{p.costPerKm.toFixed(2)}L</td>
                    <td className="py-2 px-3 text-right font-mono text-emerald-700">
                      {((p.costPerKm - data.medianCostPerKm) / data.medianCostPerKm * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Regional benchmark is grounded in MoSPI Schedule of Rates & active civil road contracts in Maharashtra.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
          >
            Close Benchmark View
          </button>
        </div>
      </div>
    </div>
  );
};
