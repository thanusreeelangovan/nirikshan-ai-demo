import React, { useState } from 'react';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { RiskRadarView } from './components/RiskRadarView';
import { InvestigationWorkspaceView } from './components/InvestigationWorkspaceView';
import { VendorNetworkView } from './components/VendorNetworkView';
import { EvidenceCentreView } from './components/EvidenceCentreView';
import { PeerBenchmarkModal } from './components/PeerBenchmarkModal';
import { CompareProjectModal } from './components/CompareProjectModal';
import { InvestigationBriefModal } from './components/InvestigationBriefModal';
import { EvidenceModal } from './components/EvidenceModal';
import { SystemInsightsView } from './components/SystemInsightsView';
import { InvestigationsQueueView } from './components/InvestigationsQueueView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { INITIAL_PROJECTS, EXECUTIVE_STATS } from './data/mockData';
import { Project, InvestigationStatus, EvidenceItem } from './types';
import { Play, Sparkles, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('MPLADS 4821');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');

  // Modals state
  const [isPeerBenchmarkOpen, setIsPeerBenchmarkOpen] = useState<boolean>(false);
  const [isCompareProjectsOpen, setIsCompareProjectsOpen] = useState<boolean>(false);
  const [isInvestigationBriefOpen, setIsInvestigationBriefOpen] = useState<boolean>(false);
  const [inspectedEvidenceItem, setInspectedEvidenceItem] = useState<EvidenceItem | null>(null);

  // Presenter Demo Journey Walkthrough Bar Toggle
  const [showDemoGuide, setShowDemoGuide] = useState<boolean>(true);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Selected project for workspace
  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const normalControlProject = projects.find(p => p.id === 'MPLADS 3914') || projects[1];

  // Handler for selecting a project
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentTab('projects'); // Projects tab acts as the Investigation Workspace for the selected project
  };

  // Handler for opening the demo suspicious project
  const handleOpenDemoProject = () => {
    setSelectedProjectId('MPLADS 4821');
    setCurrentTab('projects');
  };

  // Handler for updating investigation status and appending notes
  const handleUpdateStatus = (projectId: string, newStatus: InvestigationStatus, noteText?: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const updatedNotes = [...p.auditNotes];
      if (noteText && noteText.trim()) {
        updatedNotes.unshift({
          id: `an-${Date.now()}`,
          author: 'P. Deshmukh',
          designation: 'Senior Audit Officer, AG Maharashtra',
          timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          content: noteText.trim(),
          statusChangedTo: newStatus
        });
      }

      return {
        ...p,
        status: newStatus,
        auditNotes: updatedNotes
      };
    }));
  };

  // Primary SIH Live Demo Steps
  const demoSteps = [
    {
      step: 1,
      title: 'Executive Overview',
      subtitle: '342 Active Projects, 25 Priority Cases, ₹8.4 Cr Under Review',
      action: () => {
        setCurrentTab('overview');
        setDemoStep(1);
      }
    },
    {
      step: 2,
      title: 'Risk Radar',
      subtitle: 'Filtered by 25 High Priority & Critical Works',
      action: () => {
        setRiskFilter('High Priority & Critical');
        setCurrentTab('risk-radar');
        setDemoStep(2);
      }
    },
    {
      step: 3,
      title: 'Open Project #4821',
      subtitle: 'Suspicious Case: Risk jumped from 64 to 91',
      action: () => {
        setSelectedProjectId('MPLADS 4821');
        setCurrentTab('projects');
        setDemoStep(3);
      }
    },
    {
      step: 4,
      title: 'Peer Benchmark Analysis',
      subtitle: '+128.4% Cost Outlier vs 37 Rural Road Works',
      action: () => {
        setSelectedProjectId('MPLADS 4821');
        setCurrentTab('projects');
        setIsPeerBenchmarkOpen(true);
        setDemoStep(4);
      }
    },
    {
      step: 5,
      title: 'Vendor Network Graph',
      subtitle: 'Shreeram Infra won 9 of 11 tenders; common DIN & IP match',
      action: () => {
        setIsPeerBenchmarkOpen(false);
        setCurrentTab('vendor-network');
        setDemoStep(5);
      }
    },
    {
      step: 6,
      title: 'Control Benchmark (Project #3914)',
      subtitle: 'Side-by-side: Proves Nirikshan does NOT flag everything',
      action: () => {
        setIsCompareProjectsOpen(true);
        setDemoStep(6);
      }
    },
    {
      step: 7,
      title: 'Generate Investigation Brief',
      subtitle: 'Evidence-backed statutory audit brief for PAG',
      action: () => {
        setIsCompareProjectsOpen(false);
        setSelectedProjectId('MPLADS 4821');
        setIsInvestigationBriefOpen(true);
        setDemoStep(7);
      }
    },
    {
      step: 8,
      title: 'System Architecture',
      subtitle: 'Explainable 10-step AI & rule verification pipeline',
      action: () => {
        setIsInvestigationBriefOpen(false);
        setCurrentTab('system-insights');
        setDemoStep(8);
      }
    }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          if (tab === 'projects' && !selectedProjectId) {
            setSelectedProjectId('MPLADS 4821');
          }
        }}
        highPriorityCount={EXECUTIVE_STATS.highPriorityProjects}
        newAlertsCount={EXECUTIVE_STATS.newAlertsThisWeek}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedProjectId={currentTab === 'projects' ? selectedProject.id : undefined}
          onOpenDemoProject={handleOpenDemoProject}
          onOpenInvestigationBrief={() => setIsInvestigationBriefOpen(true)}
        />

        {/* Presenter SIH Evaluation Walkthrough Strip */}
        {showDemoGuide && (
          <div className="bg-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0 border-b border-slate-800 no-print">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIH Jury Demo Journey:</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">
                Click sequential milestones for the live presentation:
              </span>
            </div>

            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full">
              {demoSteps.map((ds) => (
                <button
                  key={ds.step}
                  onClick={ds.action}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors flex items-center gap-1 ${
                    demoStep === ds.step
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={`${ds.title}: ${ds.subtitle}`}
                >
                  <span>{ds.step}. {ds.title}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDemoGuide(false)}
              className="text-slate-400 hover:text-white text-xs px-1"
              title="Dismiss Demo Bar"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dynamic Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          {currentTab === 'overview' && (
            <OverviewView
              projects={projects}
              onSelectProject={handleSelectProject}
              onFilterRiskLevel={(lvl) => setRiskFilter(lvl)}
              onFilterDistrict={(dist) => setDistrictFilter(dist)}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'risk-radar' && (
            <RiskRadarView
              projects={projects}
              onSelectProject={handleSelectProject}
              selectedRiskFilter={riskFilter}
              onFilterRiskLevel={setRiskFilter}
              selectedDistrictFilter={districtFilter}
              onFilterDistrict={setDistrictFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentTab === 'projects' && (
            <InvestigationWorkspaceView
              project={selectedProject}
              onUpdateStatus={handleUpdateStatus}
              onOpenPeerBenchmark={() => setIsPeerBenchmarkOpen(true)}
              onOpenVendorNetwork={() => setCurrentTab('vendor-network')}
              onOpenCompareProjects={() => setIsCompareProjectsOpen(true)}
              onOpenInvestigationBrief={() => setIsInvestigationBriefOpen(true)}
              onInspectEvidenceItem={(item) => setInspectedEvidenceItem(item)}
            />
          )}

          {currentTab === 'investigations' && (
            <InvestigationsQueueView
              projects={projects}
              onSelectProject={handleSelectProject}
              onUpdateStatus={(pId, st) => handleUpdateStatus(pId, st)}
            />
          )}

          {currentTab === 'vendor-network' && (
            <VendorNetworkView
              onSelectProject={handleSelectProject}
            />
          )}

          {currentTab === 'evidence-centre' && (
            <EvidenceCentreView
              projects={projects}
              onSelectProject={handleSelectProject}
              onInspectEvidenceItem={(item) => setInspectedEvidenceItem(item)}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenInvestigationBrief={() => setIsInvestigationBriefOpen(true)}
            />
          )}

          {currentTab === 'system-insights' && (
            <SystemInsightsView />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <PeerBenchmarkModal
        isOpen={isPeerBenchmarkOpen}
        onClose={() => setIsPeerBenchmarkOpen(false)}
      />

      <CompareProjectModal
        isOpen={isCompareProjectsOpen}
        onClose={() => setIsCompareProjectsOpen(false)}
        suspiciousProject={selectedProject}
        normalProject={normalControlProject}
      />

      <InvestigationBriefModal
        isOpen={isInvestigationBriefOpen}
        onClose={() => setIsInvestigationBriefOpen(false)}
        project={selectedProject}
        onMarkFieldInspection={() => {
          handleUpdateStatus(selectedProject.id, 'Field Verification Required', 'Marked for mandatory on-site physical core verification by Superintending Engineer.');
        }}
      />

      <EvidenceModal
        item={inspectedEvidenceItem}
        onClose={() => setInspectedEvidenceItem(null)}
      />
    </div>
  );
}
