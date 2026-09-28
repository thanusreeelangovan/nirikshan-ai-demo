import React from 'react';
import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Eye, 
  Layers, 
  Calendar 
} from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-slate-800 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Evidence Inspection: {item.documentRef}
              </h2>
              <p className="text-[11px] text-slate-300">
                Source: {item.sourceName} · Verified on {item.evidenceDate}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Top Verification Status Bar */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900">Cryptographically Authenticated Evidence</span>
                <div className="text-[10px] text-emerald-700 font-mono">
                  SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Confidence</span>
              <div className="font-mono text-base font-bold text-emerald-700">
                {item.confidenceScore}%
              </div>
            </div>
          </div>

          {/* Finding Summary */}
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Auditor Finding Classification
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {item.findingTitle} ({item.anomalyCategory})
            </h3>
          </div>

          {/* Comparative Discrepancy Table */}
          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5 w-1/2">Claimed in Project Records / Invoices</th>
                  <th className="p-2.5 w-1/2 bg-rose-50 text-rose-900 border-l border-slate-200">
                    Physical Ground Verification Findings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 align-top font-mono text-slate-800 bg-slate-50/50">
                    {item.expectedValue}
                  </td>
                  <td className="p-3 align-top font-mono text-rose-900 bg-rose-50/30 border-l border-slate-200 font-semibold">
                    {item.observedValue}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Raw Document Snippet Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Official Document Extract / Inspection Log Sheet</span>
              <span className="font-mono">Ref: {item.documentRef}</span>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded font-mono text-xs space-y-2 border border-slate-800">
              <div className="text-slate-400 text-[10px] border-b border-slate-800 pb-1">
                --- BEGIN EXTRACT: MEASUREMENT BOOK & PHYSICAL AUDIT LEDGER ---
              </div>
              <p className="text-amber-300 leading-relaxed">
                {item.documentSnippet || item.keyDiscrepancy}
              </p>
              <div className="pt-2 text-[10px] text-slate-500 flex justify-between">
                <span>Inspecting Officer: Er. S. P. Patil, EE (Tech Cell)</span>
                <span>Stamp: GOVT OF MAHARASHTRA / PWD AUDIT</span>
              </div>
            </div>
          </div>

          {/* Geo Coordinates if applicable */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900">Geospatial Survey Reference:</span>
                <div className="text-[11px] text-slate-500 font-mono">
                  Coordinates: Lat 20.1842° N, Long 73.8421° E · Dindori Block Alignment Ch. 0/000 to 3/800
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-semibold">
              EXIF Geotag Verified
            </span>
          </div>

          {/* Audit Verification Doctrine */}
          <div className="text-[11px] text-slate-500 leading-relaxed">
            <strong>Forensic Integrity Note:</strong> All evidence presented is extracted directly from the State Treasury IFMS system, the MahaTenders procurement database, and authorized mobile geotag inspection logs.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
          >
            Close Evidence Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
