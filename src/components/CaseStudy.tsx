import React, { useState } from 'react';
import { Eye, TrendingUp, Cpu, Award, Zap, Check, CheckCircle2, ChevronRight, BarChart } from 'lucide-react';

export default function CaseStudy() {
  const [activeTab, setActiveTab] = useState<'baseline' | 'optimized'>('optimized');
  const [modalOpen, setModalOpen] = useState(false);

  // High-performance metrics from the prompt / brief
  const metrics = [
    { label: 'Air Distribution', value: '+35%', sub: 'Optimized airflow uniform circulation' },
    { label: 'System Pressure Drop', value: '-28%', sub: 'Reduced fan energy requirements' },
    { label: 'Draft Engineering Turnaround', value: '-42%', sub: 'Completed workflow cycle speedup' }
  ];

  return (
    <section id="case-studies" className="py-24 bg-white border-t border-gridgray relative">
      <div className="absolute right-0 top-1/4 w-80 h-80 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase bg-cobalt/10 px-3 py-1 rounded-full">
            REAL PROJECT DELIVERY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mt-4">
            Case Study: 20-Storey Kathmandu Landmark
          </h2>
          <p className="font-sans text-base text-steel mt-4">
            See how FlowDiv workflow automation helped optimizing airflow and structural HVAC pressure drops for an ultra-premium multi-tenant corporate office tower.
          </p>
        </div>

        {/* Major Showcase Card Grid */}
        <div className="border border-gridgray rounded-xl overflow-hidden shadow-tech grid grid-cols-1 lg:grid-cols-12 bg-offwhite/30">
          
          {/* Left Panel: Simulated Contour comparison viewport (col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between blueprint-grid-dark relative min-h-[350px] sm:min-h-[420px]">
            {/* Fine overlay */}
            <div className="absolute inset-0 blueprint-grid-fine-dark opacity-10"></div>

            {/* Viewport Top Headers */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-cobalt tracking-wider block uppercase">VENTILATION PROFILE MAP</span>
                <span className="font-display font-medium text-white text-sm">Kathmandu Office Tower – HVAC Zone 04</span>
              </div>
              
              {/* Tab Selector representing Baseline vs Optimized */}
              <div className="flex bg-white/5 border border-white/10 p-1 rounded-md">
                <button
                  id="cs-tab-baseline"
                  onClick={() => setActiveTab('baseline')}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    activeTab === 'baseline' ? 'bg-amber-500 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Baseline Draft
                </button>
                <button
                  id="cs-tab-optimized"
                  onClick={() => setActiveTab('optimized')}
                  className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                    activeTab === 'optimized' ? 'bg-cobalt text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  FlowDiv Optimized
                </button>
              </div>
            </div>

            {/* Real schematic visual rendering using interactive custom vectors */}
            <div className="relative z-10 my-8 flex-1 flex items-center justify-center">
              
              {/* Layout plan view outlines */}
              <svg className="w-full max-w-[450px] h-[220px]" viewBox="0 0 450 220" fill="none">
                {/* Structural Walls */}
                <rect x="20" y="20" width="410" height="180" rx="4" stroke="#4A5563" strokeWidth="2" strokeDasharray="3 3" className="opacity-40" />
                {/* Center Core columns */}
                <rect x="200" y="70" width="50" height="80" rx="2" fill="#1e293b" stroke="#4a5563" strokeWidth="1.5" />
                <text x="225" y="115" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">CORE</text>

                {/* Ventilation duct layout lines */}
                <path d="M 40 40 L 180 40 L 180 140 M 180 40 L 400 40" stroke="#0057D9" strokeWidth="3" className="opacity-30" />
                {/* Outlets represent air diffusers */}
                <circle cx="80" cy="40" r="5" fill="#FF7A00" className="opacity-80" />
                <circle cx="140" cy="40" r="5" fill="#FF7A00" className="opacity-80" />
                <circle cx="280" cy="40" r="5" fill="#FF7A00" className="opacity-80" />
                <circle cx="360" cy="40" r="5" fill="#FF7A00" className="opacity-80" />

                {activeTab === 'baseline' ? (
                  <g className="transition-all duration-300">
                    {/* BASELINE RENDER: highly stagnant regions, poor airflow streamlines */}
                    {/* Short dead stagnant flow paths */}
                    <path d="M 80 45 Q 80 120, 60 170" stroke="#FF7A00" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-60" />
                    <path d="M 140 45 Q 110 90, 80 110" stroke="#EF4444" strokeWidth="1.5" className="opacity-50" />
                    
                    {/* Noticeable dead-zone circles representing circular drafts */}
                    <circle cx="310" cy="140" r="26" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="310" y="142" textAnchor="middle" fill="#ef4444" className="text-[9px] font-mono font-bold">STAGNANT BLOCK</text>
                    
                    <circle cx="100" cy="150" r="20" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="100" y="152" textAnchor="middle" fill="#ef4444" className="text-[9px] font-mono font-bold">DEAD ZONE</text>
                  </g>
                ) : (
                  <g className="transition-all duration-300">
                    {/* OPTIMIZED RENDER: beautiful balanced recirculating streamlines */}
                    {/* Full room stream sweep */}
                    <path d="M 80 45 C 80 120, 150 160, 310 160" stroke="#60A5FA" strokeWidth="2" className="airflow-line opacity-95" />
                    <path d="M 140 45 C 140 90, 200 130, 280 180" stroke="#60A5FA" strokeWidth="2" className="airflow-line-fast opacity-90" />
                    <path d="M 280 45 C 330 90, 390 100, 410 150" stroke="#60A5FA" strokeWidth="2" className="airflow-line-slow opacity-80" />
                    <path d="M 360 45 C 390 90, 410 120, 410 180" stroke="#60A5FA" strokeWidth="1.5" className="airflow-line opacity-80" />

                    {/* Micro circulating flow loops around core */}
                    <path d="M 200 110 A 30 30 0 0 1 200 120" stroke="#38BDF8" strokeWidth="1.5" className="airflow-line-fast opacity-80" />
                    
                    {/* Perfect coverage indications */}
                    <rect x="290" y="130" width="40" height="20" rx="3" fill="#0057D9" className="opacity-20" />
                    <text x="310" y="143" textAnchor="middle" fill="#38bdf8" className="text-[8px] font-mono font-bold uppercase tracking-widest">A_MAX</text>
                  </g>
                )}
              </svg>

            </div>

            {/* Diagnostics and Legenda */}
            <div className="relative z-10 flex justify-between items-center text-xs border-t border-white/10 pt-4 bg-slate-950/40 p-3 rounded">
              <div className="flex items-center gap-1.5 font-mono text-white/50">
                <span className="w-2.5 h-2.5 rounded bg-cobalt"></span>
                <span>Air velocity vectors (m/s)</span>
              </div>
              <span className="font-mono text-[10px] text-amber-400">
                {activeTab === 'baseline' ? '▲ High Turbulence & Recirculation draft' : '✓ 100% Uniform Swept volume coverage'}
              </span>
            </div>
          </div>

          {/* Right Panel: Performance and Metrics Card with Saira Heading (col-span-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-cobalt font-mono font-bold uppercase block tracking-wider">PROJECT PROFILE</span>
                <h3 className="font-display font-extrabold text-2xl text-navy leading-snug mt-1">
                  20-Storey Landmark Tower Office Comfort STUDY
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-steel leading-relaxed">
                Our advanced automated geometry engines processed <strong>5 alternative diffuser locations</strong> and boundary combinations in mere hours, optimizing local air changes per hour (ACH) to exceed national requirements.
              </p>

              {/* Dynamic metrics block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 py-4 border-y border-gridgray/60">
                {metrics.map((met, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-3" id={`cs-metric-${mIdx}`}>
                    <div className="w-10 h-10 rounded bg-cobalt/5 border border-cobalt/10 flex items-center justify-center text-cobalt font-display font-bold text-sm flex-shrink-0">
                      {met.value}
                    </div>
                    <div>
                      <span className="block font-sans font-bold text-navy text-xs">{met.label}</span>
                      <span className="block text-[11px] text-steel leading-snug mt-0.5">{met.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                id="cs-btn-view-deep"
                onClick={() => setModalOpen(true)}
                className="w-full text-center py-3 border border-navy/30 hover:border-cobalt text-navy hover:text-white hover:bg-navy rounded font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Case Study Details</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal deep dive popup */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
            <div
              className="bg-white border-2 border-navy rounded-lg w-full max-w-2xl overflow-hidden shadow-tech flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              id="cs-modal-panel"
            >
              
              {/* Modal header */}
              <div className="bg-navy text-white px-5 py-4 border-b border-gridgray/20 flex justify-between items-center">
                <span className="font-display font-semibold uppercase tracking-wider text-sm">20-Storey Office Building Spec</span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded font-mono text-xs font-bold"
                  aria-label="Close modal dialog"
                >
                  ESC / CLOSE
                </button>
              </div>

              {/* Scrollable specs */}
              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                
                <div className="space-y-2">
                  <span className="text-[10px] text-cobalt font-mono font-bold uppercase block">THE CHALLENGE</span>
                  <p className="text-xs text-navy leading-relaxed">
                    The tower, located in a high-density, high-thermal sector of Kathmandu, suffered from structural draft limitations. Manual CFD draft analysis by MEP consultants would traditionally take <strong>8 days per structural floor</strong>, leading to delayed municipal approvals and rigid ventilation configurations.
                  </p>
                </div>

                <div className="space-y-2 border-t border-gridgray/60 pt-4">
                  <span className="text-[10px] display font-mono font-bold text-cobalt block uppercase">THE AUTOMATION SOLUTION</span>
                  <p className="text-xs text-navy leading-relaxed font-sans">
                    FlowDiv's proprietary mesh engine established native watertight CAD parsing directly from regional 2D floor plans. We structured parallel cloud solvers that processed boundary flows simultaneously, producing clean result contour mappings on a <strong>single-day schedule</strong>.
                  </p>
                </div>

                <div className="bg-offwhite border border-gridgray p-4 rounded-md space-y-3">
                  <span className="block text-[11px] font-mono text-navy font-bold uppercase">OUTCOME HIGHLIGHTS & DELIVERABLES</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-navy">Automatic PMV (Predicted Mean Vote) thermal comfort score graphs provided for every office corner.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-navy">Balanced pressure profiles optimized to support standard local Duct fans (saving NRs 3.2 Lakhs in initial equipment costs).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-navy">Seamless submission reports approved by Nepal structural engineering authorities in record time.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal footer action */}
              <div className="bg-offwhite border-t border-gridgray p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-steel">Ready to secure similar turnaround metrics for your firm?</span>
                <a
                  href="#contact-form-section"
                  onClick={() => {
                    setModalOpen(false);
                    document.querySelector('#contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-bold uppercase"
                  id="modal-cta-consult"
                >
                  Book free Audit consultation
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
