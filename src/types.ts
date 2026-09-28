export type RiskLevel = 'Critical Investigation' | 'High Priority' | 'Needs Review' | 'Normal';

export type InvestigationStatus = 
  | 'New Alert' 
  | 'Under Review' 
  | 'Evidence Requested' 
  | 'Field Verification Required' 
  | 'Escalated' 
  | 'Resolved';

export type AnomalyMethodologyType = 
  | 'AI/Model Analysis' 
  | 'Deterministic Rules' 
  | 'Database Calculations' 
  | 'Evidence Verification';

export interface RiskFactor {
  id: string;
  title: string;
  category: 'Cost Deviation' | 'Fund Progress Mismatch' | 'Timeline Deviation' | 'Vendor Concentration' | 'Evidence Inconsistency';
  observed: string;
  benchmark: string;
  riskContribution: number; // e.g. +26
  methodology: string; // e.g. 'Peer Benchmarking Anomaly Detection'
  methodologyType: AnomalyMethodologyType;
  severity: 'critical' | 'high' | 'medium' | 'low';
  explanation: string;
  sourceDocId?: string;
}

export interface EvidenceItem {
  id: string;
  findingTitle: string;
  anomalyCategory: string;
  observedValue: string;
  expectedValue: string;
  sourceName: string;
  sourceType: 'financial' | 'inspection' | 'satellite_geo' | 'tender_doc';
  evidenceDate: string;
  confidenceScore: number;
  documentRef: string;
  keyDiscrepancy: string;
  documentSnippet?: string;
  verificationMethod: string;
  geoCoords?: { lat: number; lng: number; locationName: string };
  inspectionPhotos?: { url: string; caption: string; timestamp: string; verifiedProgress: number }[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'sanction' | 'release' | 'milestone' | 'detection' | 'escalation' | 'inspection';
  riskScoreAtPoint?: number;
  details?: string;
}

export interface AuditNote {
  id: string;
  author: string;
  designation: string;
  timestamp: string;
  content: string;
  statusChangedTo?: InvestigationStatus;
}

export interface Project {
  id: string; // e.g. 'MPLADS 4821'
  numericId: number;
  name: string;
  district: string;
  constituency: string;
  state: string;
  type: string;
  implementingAgency: string;
  contractor: string;
  contractorPanOrId?: string;
  financialYear: string;
  allocatedAmountLakhs: number; // e.g. 42.6
  releasedAmountLakhs: number; // e.g. 33.2
  fundUtilisationPct: number; // e.g. 78
  physicalProgressPct: number; // e.g. 31
  riskScore: number; // e.g. 91
  previousRiskScore?: number; // e.g. 64
  evidenceConfidencePct: number; // e.g. 87
  riskLevel: RiskLevel;
  status: InvestigationStatus;
  latestTrigger: string;
  sanctionedDate: string;
  targetCompletionDate: string;
  costDeviationPct?: number; // e.g. +128
  timelineDeviationPct?: number; // e.g. +157
  roadLengthKm?: number;
  terrain?: string;
  recommendedAction: string;
  riskFactors: RiskFactor[];
  evidenceItems: EvidenceItem[];
  timelineEvents: TimelineEvent[];
  auditNotes: AuditNote[];
}

export interface PeerProjectPoint {
  id: string;
  name: string;
  district: string;
  costPerKm: number;
  sanctionYear: string;
  isTarget?: boolean;
}

export interface PeerBenchmarkData {
  cohortName: string;
  sampleSize: number;
  comparisonDimensions: { label: string; value: string }[];
  medianCostPerKm: number; // e.g. 5.8
  expectedCostMin: number; // e.g. 5.1
  expectedCostMax: number; // e.g. 6.9
  targetProjectCostPerKm: number; // e.g. 11.2
  deviationPct: number; // +128%
  methodologyNote: string;
  peerPoints: PeerProjectPoint[];
}

export interface VendorNode {
  id: string;
  name: string;
  type: 'contractor' | 'sister_firm' | 'project' | 'director' | 'address';
  riskScore?: number;
  details: {
    role?: string;
    din?: string;
    pan?: string;
    location?: string;
    registeredCapital?: string;
    tendersWon?: number;
    tendersBidded?: number;
    winRate?: string;
    flagNote?: string;
  };
}

export interface VendorEdge {
  id: string;
  source: string;
  target: string;
  label: 'Won Tender' | 'Participated In' | 'Shared Director' | 'Shared Address' | 'Worked On' | 'Cover Bidder';
  riskLevel: 'critical' | 'high' | 'medium' | 'normal';
  note: string;
}

export interface VendorNetworkGraph {
  nodes: VendorNode[];
  edges: VendorEdge[];
  summary: {
    primaryVendor: string;
    winRate: string;
    tendersWon: number;
    tendersTotal: number;
    connectedEntities: number;
    flagsIdentified: string[];
  };
}
