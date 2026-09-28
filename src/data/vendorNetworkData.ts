import { VendorNetworkGraph } from '../types';

export const VENDOR_NETWORK_DATA: VendorNetworkGraph = {
  summary: {
    primaryVendor: 'Shreeram Infrastructure & Projects Ltd.',
    winRate: '81.8% (9 of 11 Tenders Won)',
    tendersWon: 9,
    tendersTotal: 11,
    connectedEntities: 12,
    flagsIdentified: [
      'Unusual vendor concentration across 2 contiguous assembly constituencies',
      'Shared Director (DIN: 08412901) across 2 bidding entities',
      'Common registered office address in MIDC Ambad shared with competing bidder',
      'Synchronous IP submission log (115.112.44.18) during e-tender uploads'
    ]
  },
  nodes: [
    {
      id: 'v-shreeram',
      name: 'Shreeram Infrastructure & Projects Ltd.',
      type: 'contractor',
      riskScore: 89,
      details: {
        role: 'Primary Implementing Contractor',
        pan: 'AAACS8921K',
        location: 'Nashik, Maharashtra',
        registeredCapital: '₹2.50 Cr',
        tendersWon: 9,
        tendersBidded: 11,
        winRate: '81.8%',
        flagNote: 'Unusual vendor concentration detected. Won 9 of 11 related tenders across Dindori and Igatpuri blocks.'
      }
    },
    {
      id: 'p-4821',
      name: 'Project #4821: Rural Road Widening',
      type: 'project',
      riskScore: 91,
      details: {
        role: 'Sanctioned MPLADS Project (₹42.6L)',
        location: 'Dindori (ST), Nashik',
        flagNote: 'Core audit subject: 78% funds utilised vs 31% verified completion.'
      }
    },
    {
      id: 'p-4899',
      name: 'Project #4899: Girna Canal Bridge Culvert',
      type: 'project',
      riskScore: 76,
      details: {
        role: 'Sanctioned MPLADS Project (₹34.0L)',
        location: 'Nashik, Maharashtra',
        flagNote: 'Contract awarded to Shreeram Infra; shared plant machinery billing detected.'
      }
    },
    {
      id: 'p-4395',
      name: 'Project #4395: Vineyard Access Road A',
      type: 'project',
      riskScore: 65,
      details: {
        role: 'Sanctioned MPLADS Project (₹28.4L)',
        location: 'Dindori, Nashik',
        flagNote: 'Won by Shreeram Infra with single-bidder threshold relaxation.'
      }
    },
    {
      id: 'p-4440',
      name: 'Project #4440: Vineyard Access Road B',
      type: 'project',
      riskScore: 63,
      details: {
        role: 'Sanctioned MPLADS Project (₹26.2L)',
        location: 'Dindori, Nashik',
        flagNote: 'Adjacent contract awarded within 14 days of Project #4395.'
      }
    },
    {
      id: 'v-maratha',
      name: 'Maratha Civilworks LLP',
      type: 'sister_firm',
      riskScore: 72,
      details: {
        role: 'Affiliated Construction Entity',
        pan: 'AAACM4402Q',
        location: 'Pune / Nashik, Maharashtra',
        registeredCapital: '₹50 Lakh',
        tendersWon: 2,
        tendersBidded: 8,
        winRate: '25.0%',
        flagNote: 'Relationship requires review: Common Designated Partner identified with Shreeram Infra.'
      }
    },
    {
      id: 'v-omkar',
      name: 'Omkar Earthmovers & Transport',
      type: 'sister_firm',
      riskScore: 68,
      details: {
        role: 'Frequent Bidding Competitor / Co-Bidder',
        pan: 'AAABO9012D',
        location: 'Nashik, Maharashtra',
        registeredCapital: '₹25 Lakh',
        tendersWon: 0,
        tendersBidded: 7,
        winRate: '0.0%',
        flagNote: 'Repeated bidding pattern identified: Participated in 7 tenders as L2 cover bidder to Shreeram Infra.'
      }
    },
    {
      id: 'd-kadam',
      name: 'Rajesh V. Kadam',
      type: 'director',
      riskScore: 84,
      details: {
        role: 'Managing Director / Designated Partner',
        din: 'DIN: 08412901',
        location: 'Nashik, Maharashtra',
        flagNote: 'Holds 62% equity in Shreeram Infra and 50% profit share in Maratha Civilworks LLP.'
      }
    },
    {
      id: 'd-sunita',
      name: 'Sunita R. Kadam',
      type: 'director',
      riskScore: 70,
      details: {
        role: 'Director & Authorized Signatory',
        din: 'DIN: 08412945',
        location: 'Nashik, Maharashtra',
        flagNote: 'Signatory for Shreeram Infra bank guarantees and tender bids.'
      }
    },
    {
      id: 'a-ambad',
      name: 'Gala 14, MIDC Ambad, Nashik 422010',
      type: 'address',
      riskScore: 75,
      details: {
        role: 'Shared Physical & Registered Office Address',
        location: 'MIDC Ambad Industrial Area, Nashik',
        flagNote: 'Common physical premises listed in MCA filings for both Shreeram Infra and Omkar Earthmovers.'
      }
    },
    {
      id: 't-081',
      name: 'Tender TN-2025-081 (Dindori Road)',
      type: 'project',
      riskScore: 85,
      details: {
        role: 'District e-Procurement Tender Event',
        location: 'Dindori Division',
        flagNote: 'Winning bid by Shreeram Infra; runner-up bid by Omkar Earthmovers submitted from identical IP.'
      }
    }
  ],
  edges: [
    {
      id: 'e-1',
      source: 'v-shreeram',
      target: 'p-4821',
      label: 'Won Tender',
      riskLevel: 'critical',
      note: 'Awarded contract at ₹42.6L (L1 bid) following qualification of only 2 bidders.'
    },
    {
      id: 'e-2',
      source: 'v-shreeram',
      target: 'p-4899',
      label: 'Won Tender',
      riskLevel: 'high',
      note: 'Awarded ₹34.0L canal culvert work without independent technical review.'
    },
    {
      id: 'e-3',
      source: 'v-shreeram',
      target: 'p-4395',
      label: 'Won Tender',
      riskLevel: 'medium',
      note: 'Won consecutive road package in Dindori block.'
    },
    {
      id: 'e-4',
      source: 'v-shreeram',
      target: 'p-4440',
      label: 'Won Tender',
      riskLevel: 'medium',
      note: 'Won adjacent road package within same financial quarter.'
    },
    {
      id: 'e-5',
      source: 'd-kadam',
      target: 'v-shreeram',
      label: 'Shared Director',
      riskLevel: 'critical',
      note: 'Rajesh V. Kadam serves as Managing Director (DIN 08412901) with 62% controlling interest.'
    },
    {
      id: 'e-6',
      source: 'd-kadam',
      target: 'v-maratha',
      label: 'Shared Director',
      riskLevel: 'critical',
      note: 'Designated partner in Maratha Civilworks LLP since incorporation in 2021.'
    },
    {
      id: 'e-7',
      source: 'd-sunita',
      target: 'v-shreeram',
      label: 'Shared Director',
      riskLevel: 'high',
      note: 'Directorship and co-signatory for commercial bank guarantees.'
    },
    {
      id: 'e-8',
      source: 'v-shreeram',
      target: 'a-ambad',
      label: 'Shared Address',
      riskLevel: 'high',
      note: 'Registered office as per Ministry of Corporate Affairs (MCA) records.'
    },
    {
      id: 'e-9',
      source: 'v-omkar',
      target: 'a-ambad',
      label: 'Shared Address',
      riskLevel: 'critical',
      note: 'Omkar Earthmovers operates from identical Gala 14 unit in MIDC Ambad.'
    },
    {
      id: 'e-10',
      source: 'v-omkar',
      target: 't-081',
      label: 'Cover Bidder',
      riskLevel: 'critical',
      note: 'Submitted L2 bid +3.4% above Shreeram Infra from matching IP address (115.112.44.18).'
    },
    {
      id: 'e-11',
      source: 'v-shreeram',
      target: 't-081',
      label: 'Won Tender',
      riskLevel: 'critical',
      note: 'Won tender at ₹42.6L against non-competitive sister company bid.'
    },
    {
      id: 'e-12',
      source: 't-081',
      target: 'p-4821',
      label: 'Worked On',
      riskLevel: 'high',
      note: 'Tender TN-2025-081 corresponds to Project #4821 work order.'
    }
  ]
};
