import React, { useState } from 'react';
import { Sliders, ShieldCheck, Check, RotateCcw, AlertTriangle, Scale, Database } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [divergenceThreshold, setDivergenceThreshold] = useState<number>(25);
  const [costOutlierThreshold, setCostOutlierThreshold] = useState<number>(40);
  const [vendorConcentrationCap, setVendorConcentrationCap] = useState<number>(30);
  const [scheduleTolerancePct, setScheduleTolerancePct] = useState<number>(25);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setDivergenceThreshold(25);
    setCostOutlierThreshold(40);
    setVendorConcentrationCap(30);
    setScheduleTolerancePct(25);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Audit Rule Governance
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              CAG / MoSPI Parameter Matrix
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Forensic Risk Thresholds & Anomaly Parameters
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Calibrate statistical sensitivity dials and deterministic audit alert triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Standards</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Settings Saved' : 'Save Parameters'}</span>
          </button>
        </div>
      </div>

      {/* Threshold Sliders */}
      <div className="bg-white border border-slate-200 rounded p-6 space-y-6 text-xs">
        {/* Slider 1: Fund-Progress Divergence */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm">
                Fund Utilisation vs. Ground Progress Gap Threshold
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Maximum allowable percentage point delta between treasury disbursements and verified site completion.
              </p>
            </div>
            <span className="font-mono text-base font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              &gt; {divergenceThreshold}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={divergenceThreshold}
            onChange={(e) => setDivergenceThreshold(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>10% (Strict)</span>
            <span className="font-bold text-slate-700">25% (Standard Audit Baseline)</span>
            <span>50% (Permissive)</span>
          </div>
        </div>

        {/* Slider 2: Cost Outlier Variance */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm">
                Regional Peer Benchmark Cost Outlier Threshold
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Trigger high-priority alert when project unit cost deviates beyond peer cohort median.
              </p>
            </div>
            <span className="font-mono text-base font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              &gt; +{costOutlierThreshold}%
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={costOutlierThreshold}
            onChange={(e) => setCostOutlierThreshold(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>+20%</span>
            <span className="font-bold text-slate-700">+40% (Standard Benchmark Trigger)</span>
            <span>+100%</span>
          </div>
        </div>

        {/* Slider 3: Vendor Concentration Cap */}
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 text-sm">
                Single Vendor Cluster Tender Share Cap
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Flags potential cartelization or procurement concentration within a contiguous legislative block.
              </p>
            </div>
            <span className="font-mono text-base font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              &gt; {vendorConcentrationCap}% Share
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="5"
            value={vendorConcentrationCap}
            onChange={(e) => setVendorConcentrationCap(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>15%</span>
            <span className="font-bold text-slate-700">30% (Recommended Diversification Limit)</span>
            <span>60%</span>
          </div>
        </div>

        {/* Active Rules List */}
        <div className="space-y-3 pt-2">
          <div className="font-bold text-slate-900 text-sm">
            Active Forensic Detection Heuristics
          </div>

          <div className="space-y-2">
            {[
              { title: 'Rule 01: Utilisation Certificate Milestone Parity', desc: 'Disbursements > 50% require independent technical inspection report before tranche 2 issue.' },
              { title: 'Rule 02: Cryptographic Geotag Distance Radius Check', desc: 'Photos uploaded outside 500m of project sanctioned coordinates trigger geo-falsification review.' },
              { title: 'Rule 03: Common DIN & Shared Registration Flagging', desc: 'Cross-references MCA database for shared directors among competing tender bidders.' },
              { title: 'Rule 04: Schedule Slippage Without Extension Order', desc: 'Projects running 25%+ beyond target completion without collector approvals are escalated.' },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">{r.title}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
