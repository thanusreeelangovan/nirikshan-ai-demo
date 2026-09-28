import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  User, 
  Check, 
  MapPin, 
  Scale
} from 'lucide-react';
import { Project } from '../types';

interface InvestigationBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onMarkFieldInspection?: () => void;
}

export const InvestigationBriefModal: React.FC<InvestigationBriefModalProps> = ({
  isOpen,
  onClose,
  project,
  onMarkFieldInspection,
}) => {
  if (!isOpen) return null;

  const [isShared, setIsShared] = useState(false);
  const [isMarkedField, setIsMarkedField] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
OFFICE OF THE PRINCIPAL ACCOUNTANT GENERAL (AUDIT)
EARLY WARNING & FORENSIC AUDIT BRIEF — MPLADS MONITORING
CONFIDENTIAL / FOR OFFICIAL AUDIT USE ONLY
Date of Generation: 25 October 2025
Platform: Nirikshan AI Early Warning System

============================================================
1. PROJECT DETAILS
============================================================
Project ID: ${project.id}
Project Name: ${project.name}
District / Constituency: ${project.district} / ${project.constituency}
Sanctioned Amount: ₹${project.allocatedAmountLakhs.toFixed(2)} Lakh
Disbursed Amount: ₹${project.releasedAmountLakhs.toFixed(2)} Lakh
Implementing Agency: ${project.implementingAgency}
Awarded Contractor: ${project.contractor}
Contractor PAN: ${project.contractorPanOrId || 'AAACS8921K'}
Financial Year: ${project.financialYear}
Sanction Date: ${project.sanctionedDate}

============================================================
2. FORENSIC RISK ASSESSMENT
============================================================
Composite Risk Score: ${project.riskScore} / 100
Evidence Confidence Index: ${project.evidenceConfidencePct}%
Current Triage Tier: ${project.riskLevel}
Trigger Event: ${project.latestTrigger}
Previous Risk Score: ${project.previousRiskScore || 64} -> Current Risk Score: ${project.riskScore} (+${project.riskScore - (project.previousRiskScore || 64)} points)

============================================================
3. KEY ANOMALY FINDINGS
============================================================
1. FUND-PROGRESS DIVERGENCE:
   - Reported Financial Utilisation: ${project.fundUtilisationPct}% (₹${project.releasedAmountLakhs.toFixed(1)} Lakh drawn)
   - Verified Physical Progress: ${project.physicalProgressPct}% (Certified by Technical Cell)
   - Divergence Variance: +${project.fundUtilisationPct - project.physicalProgressPct}% (Exceeds high risk threshold of 25%)

2. COST ABNORMALITY vs PEER COHORT:
   - Unit Cost: ₹11.21 Lakh per km (3.8 km alignment)
   - North Maharashtra Peer Median: ₹5.80 Lakh per km
   - Cost Deviation: +128.4% above benchmark (Extreme statistical outlier, z=4.2)

3. VENDOR NETWORK CONCENTRATION:
   - Contractor (${project.contractor}) secured 9 of 11 related tenders across Dindori/Igatpuri blocks (81.8% win rate).
   - Common Director (DIN: 08412901) links contractor to competing entity Maratha Civilworks LLP.
   - Synchronous bid uploads detected from identical IP address (115.112.44.18).

4. TIMELINE SLIPPAGE:
   - 157% schedule deviation. Contractual delivery expired with 69% civil work remaining uncompleted.

============================================================
4. SUPPORTING EVIDENCE RECORD
============================================================
- Utilisation Certificate: Ref UC-2025-NSK-4821 dated 18 Oct 2025
- Inspection Report: District Technical Inspection Cell Report Ref INSP-NSK-2025-R-089
- Geospatial Audit: Geo-tagged photographic verification (Lat 20.1842° N, Long 73.8421° E) confirming absence of bituminous wearing coat.
- MahaTenders Archive: Tender TN-2025-081 server submission audit log.

============================================================
5. RECOMMENDED AUDIT ACTIONS
============================================================
1. Immediate withholding of remaining MPLADS tranches pending forensic physical audit.
2. Deputation of Superintending Engineer for core drilling and bitumen sample laboratory testing.
3. Subpoena of Measurement Book MB-402 and weighbridge ballast delivery vouchers from PWD Division II.
4. Formal inquiry into common directorships and tender cartelization via Ministry of Corporate Affairs (MCA).

Certified by Senior Audit Officer, AG Maharashtra (Commercial & Local Bodies Audit).
Nirikshan AI Audit Engine v2.4 (MoSPI Compliant)
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `INVESTIGATION_BRIEF_${project.id.replace(' ', '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };

  const handleMarkField = () => {
    setIsMarkedField(true);
    if (onMarkFieldInspection) onMarkFieldInspection();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (No print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-slate-800 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Forensic Investigation Brief: {project.id}
              </h2>
              <p className="text-[11px] text-slate-300">
                Official Audit Summary · Office of the Principal Accountant General (Audit)
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors flex items-center gap-1 font-medium"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors flex items-center gap-1 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text Brief</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-lg font-bold px-2 ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Action Bar inside Modal */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="text-slate-600 flex items-center gap-2">
            <span className="font-semibold text-slate-800">Generated:</span>
            <span>25 October 2025</span>
            <span>·</span>
            <span>Nirikshan AI Forensic Audit Engine</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded transition-colors flex items-center gap-1 font-medium"
            >
              {isShared ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Dispatched to AG Portal</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 text-slate-500" />
                  <span>Share with Supervisor</span>
                </>
              )}
            </button>

            <button
              onClick={handleMarkField}
              className="px-3 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded transition-colors flex items-center gap-1 font-semibold shadow-xs"
            >
              {isMarkedField ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Marked for Field Inspection</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3 h-3" />
                  <span>Mark for Field Inspection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Printable Formal Audit Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-slate-800 bg-white font-sans leading-relaxed">
          {/* Government Formal Letterhead */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Government of India · Ministry of Statistics and Programme Implementation (MoSPI)
            </div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              OFFICE OF THE PRINCIPAL ACCOUNTANT GENERAL (AUDIT)
            </h1>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              MPLADS FORENSIC AUDIT & EARLY WARNING INVESTIGATION BRIEF
            </div>
            <div className="text-[11px] text-slate-500 font-mono pt-1">
              Case Ref: NIRIKSHAN-MH-NSK-2025-4821 · Confidential (Audit in Progress)
            </div>
          </div>

          {/* Section 1: Project Metadata Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              1. Project Identification & Sanction Profile
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-slate-500">Project ID:</span>
                <div className="font-mono font-bold text-slate-900">{project.id}</div>
              </div>
              <div>
                <span className="text-slate-500">District / Block:</span>
                <div className="font-semibold text-slate-900">{project.district} · {project.constituency}</div>
              </div>
              <div>
                <span className="text-slate-500">Sanctioned Budget:</span>
                <div className="font-mono font-bold text-slate-900">₹{project.allocatedAmountLakhs.toFixed(2)} Lakh</div>
              </div>
              <div>
                <span className="text-slate-500">Disbursed (Tranches 1 & 2):</span>
                <div className="font-mono font-bold text-slate-900">₹{project.releasedAmountLakhs.toFixed(2)} Lakh</div>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Implementing Agency:</span>
                <div className="font-medium text-slate-900">{project.implementingAgency}</div>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Contractor / PAN:</span>
                <div className="font-medium text-slate-900">{project.contractor} ({project.contractorPanOrId || 'AAACS8921K'})</div>
              </div>
            </div>
          </div>

          {/* Section 2: Executive Risk Assessment */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              2. Forensic Risk Assessment & Trigger Telemetry
            </h3>
            <div className="p-3 bg-rose-50 border border-rose-300 rounded space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-900">Composite Risk Score:</span>
                  <span className="font-mono font-bold text-sm text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                    {project.riskScore} / 100 (Critical Investigation)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Evidence Confidence:</span>
                  <span className="font-mono font-bold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {project.evidenceConfidencePct}% (4 Cross-Verified Sources)
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-800 leading-relaxed">
                <strong>Why Flagged Now:</strong> {project.latestTrigger}. Risk progression jumped from 64 to 91 points following the receipt of Utilisation Certificate (UC-2025-NSK-4821) claiming 78% expenditure against an independently verified physical site completion of only 31%.
              </p>
            </div>
          </div>

          {/* Section 3: Detailed Key Findings */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              3. Key Forensic Findings & Anomaly Decomposition
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-slate-900">
                  A. Severe Fund Utilisation vs. Ground Physical Completion Divergence
                </div>
                <p className="text-slate-700 mt-0.5">
                  Financial records indicate ₹33.22 Lakh (78.0%) disbursed from district treasury. However, the technical inspection conducted on 21 Oct 2025 confirms only 31.0% physical execution (sub-grade earthwork and partial WBM base). The resulting <strong>47 percentage point divergence</strong> violates Section 4.2 of the MPLADS Financial Control Guidelines.
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-slate-900">
                  B. Abnormal Unit Cost (+128.4% above Regional Peer Benchmark)
                </div>
                <p className="text-slate-700 mt-0.5">
                  Peer benchmarking across 37 rural blacktop road works in identical semi-arid terrain (North Maharashtra cohort) establishes an expected cost range of ₹5.1L - ₹6.9L per km (median ₹5.80L/km). Project #4821 was sanctioned at <strong>₹11.21 Lakh per km</strong>, driven by inflated material lead distance claims (billed 95 km vs actual 18 km quarry transit).
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-slate-900">
                  C. Vendor Network Concentration & Cartel Bidding Indicators
                </div>
                <p className="text-slate-700 mt-0.5">
                  Contractor Shreeram Infrastructure won 9 of 11 related civil tenders in Dindori and Igatpuri blocks. MCA filings reveal common directorship (Rajesh V. Kadam, DIN: 08412901) and shared physical premises in MIDC Ambad with co-bidding entity Omkar Earthmovers. MahaTenders server logs record both tender bids submitted from the identical IP address (115.112.44.18) within a 14-minute window.
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-slate-900">
                  D. Timeline Slippage & Execution Default
                </div>
                <p className="text-slate-700 mt-0.5">
                  157% schedule deviation recorded. Contract duration expired on 30 Oct 2025 with 69% of civil works pending. No formal time extension or liquidated damages have been processed by PWD Division II.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Supporting Evidence Ledger */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              4. Evidence Documents & Verification Ledger
            </h3>
            <table className="w-full text-left text-[11px] border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                  <th className="p-2">Document Reference</th>
                  <th className="p-2">Source Agency</th>
                  <th className="p-2">Date Verified</th>
                  <th className="p-2">Forensic Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-mono font-medium">UC-2025-NSK-4821</td>
                  <td className="p-2">District Treasury & PWD</td>
                  <td className="p-2">18 Oct 2025</td>
                  <td className="p-2">Records disbursement of Tranche 2 (₹18.22L) against Item 4.3 bituminous claims.</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-medium">INSP-NSK-2025-R-089</td>
                  <td className="p-2">District Tech Inspection Cell</td>
                  <td className="p-2">21 Oct 2025</td>
                  <td className="p-2">Certifies that bituminous wearing coat is non-existent on 2.5 km of alignment.</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-medium">GEO-IMG-2025-781</td>
                  <td className="p-2">MoSPI Mobile Geo-Audit</td>
                  <td className="p-2">21 Oct 2025</td>
                  <td className="p-2">GPS photos (Lat 20.1842° N, Long 73.8421° E) confirm unpaved sub-base only.</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-medium">TENDER-081-LOG</td>
                  <td className="p-2">MahaTenders Portal</td>
                  <td className="p-2">02 Feb 2025</td>
                  <td className="p-2">Corroborates IP match 115.112.44.18 between winning and cover bidder.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 5: Recommended Investigation Actions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              5. Recommended Formal Investigation Actions
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-[11px] text-slate-800">
              <li>
                <strong>Immediate Financial Freeze:</strong> Direct District Treasury Officer, Nashik to withhold any further tranche disbursements or security deposit refunds under Project #4821.
              </li>
              <li>
                <strong>Joint Physical Core Verification:</strong> Depute an independent Quality Control Flying Squad to extract core drill specimens from the road alignment to test pavement layer thickness and density.
              </li>
              <li>
                <strong>Measurement Book Audit:</strong> Reconcile all entries in Measurement Book MB-402 against physical site cross-sections and asphalt plant mixing batch tickets.
              </li>
              <li>
                <strong>Procurement Syndicate Inquiry:</strong> Forward tender bidding logs and DIN linkages to the Competition Commission / Vigilance Cell for examination of collusive bidding.
              </li>
            </ol>
          </div>

          {/* Official Signatures */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-600">
            <div>
              <div className="font-bold text-slate-900">P. Deshmukh</div>
              <div>Senior Audit Officer, AG Maharashtra</div>
              <div className="text-[10px] text-slate-400">Digital Seal: SHA256-4821-EVAL-VERIFIED</div>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-900">R. K. Sharma, IAS</div>
              <div>District Collector & Nodal Officer, Nashik</div>
              <div className="text-[10px] text-slate-400">Countersigned for Verification</div>
            </div>
          </div>
        </div>

        {/* Footer (No print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 no-print">
          <span className="text-[11px] text-slate-500">
            Nirikshan AI assists human audit officials in evidence prioritisation. Final findings are determined by competent audit authorities.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
};
