import React, { useState, useMemo } from 'react';
import { HelpCircle, Check, ArrowRight, BrainCircuit, Timer, TrendingUp, Sparkles, Building2, Globe } from 'lucide-react';
import { AuditSelection } from '../types';

export default function AuditCalculator() {
  const [selection, setSelection] = useState<AuditSelection>({
    firmSize: 'medium',
    projectsPerYear: 18,
    avgPreparationDays: 6,
    mainSoftware: 'ansys',
    bottleneck: 'geometry', // geometry | meshing | boundary | reporting
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dynamic calculations based on industry statistics in Nepal & Global MEP workflows
  const calculations = useMemo(() => {
    // Total manual engineering hours spent per year on CFD setup
    // Assuming 8 hours of dedicated geometry/mesh preparation per day
    const manualHoursPerProject = selection.avgPreparationDays * 8;
    const totalManualHoursAnnually = manualHoursPerProject * selection.projectsPerYear;

    // FlowDiv automation saves roughly 75% to 85% of geometry setup and meshing workflows
    let savingsFactor = 0.8;
    if (selection.bottleneck === 'geometry') savingsFactor = 0.85; // geometry preparation is heavily automated
    if (selection.bottleneck === 'reporting') savingsFactor = 0.90; // word/pdf formatting is fully streamlined

    const hoursSavedAnnually = Math.round(totalManualHoursAnnually * savingsFactor);
    const daysSavedAnnually = Math.round(hoursSavedAnnually / 8);

    // Turnaround speed improvement multiplication factor
    let speedUp = 4;
    if (selection.bottleneck === 'meshing') speedUp = 5;
    if (selection.bottleneck === 'boundary') speedUp = 6;

    // Cost savings calculated based on standard engineering day rates in Nepal MEP industry
    // Assuming professional MEP engineer cost of NPR (NRe) 3,500/day or roughly $35/hour normalized
    const averageHourlyRateNPR = 1800; // Average senior specialized engineer rate
    const totalSavingsNRP = hoursSavedAnnually * averageHourlyRateNPR;

    return {
      totalManualHoursAnnually,
      hoursSavedAnnually,
      daysSavedAnnually,
      speedUp,
      totalSavingsNRP,
    };
  }, [selection]);

  const handleAuditRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div id="workflow-audit" className="py-20 bg-offwhite border-t border-gridgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cobalt/10 border border-cobalt/20 rounded-full text-xs font-mono font-bold text-cobalt uppercase mb-4">
            <BrainCircuit className="w-4 h-4" />
            <span>Process Optimization Tool</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
            Perform a CFD Workflow Audit
          </h2>
          <p className="font-sans text-base text-steel mt-4">
            Measure how manual bottlenecks impact your delivery times in Nepal and evaluate the precise time and financial return of engineering automation.
          </p>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Inputs (col-span-12 on mobile, col-span-7 on desktop) */}
          <div className="lg:col-span-7 bg-white border border-gridgray rounded-lg p-6 sm:p-8 shadow-tech flex flex-col justify-between">
            <form onSubmit={handleAuditRequest} className="space-y-6">
              
              <div>
                <h3 className="font-display font-bold text-lg text-navy">CFD Workflow Parameters</h3>
                <p className="text-xs text-steel mt-1">Configure your firm's default workload to estimate automation returns.</p>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Firm Size Selection */}
                <div id="audit-firm-size-group" className="flex flex-col gap-1.5">
                  <span className="font-sans font-bold text-xs text-navy">MEP Firm Size</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        id={`firm-size-${size}`}
                        onClick={() => setSelection({ ...selection, firmSize: size })}
                        className={`py-2 text-xs font-mono font-medium rounded capitalize border transition-all ${
                          selection.firmSize === size
                            ? 'bg-navy text-white border-navy'
                            : 'bg-offwhite text-steel border-gridgray hover:bg-gridgray/10'
                        }`}
                      >
                        {size === 'small' ? '< 10 Eng' : size === 'medium' ? '10-50 Eng' : '50+ Eng'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Software Used */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="audit-input-software" className="font-sans font-bold text-xs text-navy">Primary Solver Environment</label>
                  <select
                    id="audit-input-software"
                    value={selection.mainSoftware}
                    onChange={(e) => setSelection({ ...selection, mainSoftware: e.target.value })}
                    className="w-full text-xs font-mono bg-offwhite border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors"
                  >
                    <option value="ansys">ANSYS Fluent / CFX</option>
                    <option value="openfoam">OpenFOAM (C++ Console)</option>
                    <option value="revit">Autodesk Revit Flow/Navis</option>
                    <option value="solidworks">SolidWorks Flow Simulation</option>
                    <option value="scstream">scStream / Cradle CFD</option>
                  </select>
                </div>
              </div>

              {/* Slider 1: CFD Projects / Year */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="audit-projects-count" className="font-sans font-bold text-navy">Annual CFD Projects</label>
                  <span className="font-mono font-bold text-cobalt bg-cobalt/10 px-2 py-0.5 rounded">
                    {selection.projectsPerYear} Projects
                  </span>
                </div>
                <input
                  id="audit-projects-count"
                  type="range"
                  min="2"
                  max="80"
                  step="1"
                  value={selection.projectsPerYear}
                  onChange={(e) => setSelection({ ...selection, projectsPerYear: parseInt(e.target.value) })}
                  className="w-full accent-cobalt h-1.5 bg-gridgray rounded-lg appearance-none cursor-ew-resize"
                />
                <div className="flex justify-between text-[10px] font-mono text-steel">
                  <span>2 projects (Small scale)</span>
                  <span>80 projects (Enterprise output)</span>
                </div>
              </div>

              {/* Slider 2: Average Setup & Refinement Days */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="audit-setup-days" className="font-sans font-bold text-navy">Manual Geometry Prep & Mesh (Days / Proj)</label>
                  <span className="font-mono font-bold text-cobalt bg-cobalt/10 px-2 py-0.5 rounded">
                    {selection.avgPreparationDays} Days
                  </span>
                </div>
                <input
                  id="audit-setup-days"
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={selection.avgPreparationDays}
                  onChange={(e) => setSelection({ ...selection, avgPreparationDays: parseInt(e.target.value) })}
                  className="w-full accent-cobalt h-1.5 bg-gridgray rounded-lg appearance-none cursor-ew-resize"
                />
                <div className="flex justify-between text-[10px] font-mono text-steel">
                  <span>1 day (Standard layouts)</span>
                  <span>15 days (Complex multi-story structures)</span>
                </div>
              </div>

              {/* Main Bottleneck Radio Selection */}
              <div className="space-y-2">
                <span className="block font-sans font-bold text-xs text-navy">What is your principal workflow bottleneck?</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'geometry', title: 'Geometry Clean-up', desc: 'Fixing watertight gaps, overlapping bodies in CAD' },
                    { id: 'meshing', title: 'Meshing generation', desc: 'Prism layer construction, volume mesh sizing' },
                    { id: 'boundary', title: 'Boundary setup', desc: 'Assigning HVAC inlets, dampers, and flow metrics manually' },
                    { id: 'reporting', title: 'Engineering Reports', desc: 'Plotting streamline vectors, exporting PDF contour graphs' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      id={`bottleneck-btn-${btn.id}`}
                      onClick={() => setSelection({ ...selection, bottleneck: btn.id })}
                      className={`text-left p-3.5 rounded-lg border-2 transition-all flex items-start gap-3 ${
                        selection.bottleneck === btn.id
                          ? 'border-cobalt bg-cobalt/5'
                          : 'border-gridgray/50 hover:border-gridgray bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selection.bottleneck === btn.id ? 'border-cobalt bg-cobalt' : 'border-gridgray'
                      }`}>
                        {selection.bottleneck === btn.id && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                      </div>
                      <div>
                        <span className="block font-sans font-bold text-navy text-xs">{btn.title}</span>
                        <span className="block text-[11px] text-steel mt-0.5 leading-normal">{btn.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action consultation area */}
              <div className="pt-4 border-t border-gridgray/50 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#contact-form-section"
                  className="w-full sm:w-auto text-center px-6 py-3 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow hover:shadow-md"
                  id="audit-cta-book-free"
                >
                  <span>Book Free Workflow Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-steel text-center sm:text-left">
                  Includes a structured <span className="font-semibold text-navy">ROI Roadmap Report</span> customized to your CAD pipeline.
                </p>
              </div>
            </form>
          </div>

          {/* Right Panel: ROI Statistics (col-span-12 on mobile, col-span-5 on desktop) */}
          <div className="lg:col-span-5 bg-navy text-white border border-navy rounded-lg p-6 sm:p-8 flex flex-col justify-between blueprint-grid-dark relative overflow-hidden shadow-tech">
            {/* Fine grid highlights */}
            <div className="absolute inset-0 blueprint-grid-fine-dark opacity-10"></div>
            
            <div className="relative z-10 space-y-6">
              <span className="font-mono text-xs font-bold text-cobalt tracking-wide uppercase px-2.5 py-1 bg-white/10 rounded border border-white/5">
                ESTIMATED ANNUAL SAVINGS WITH FLOWDIV
              </span>

              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="border-b border-white/10 pb-4" id="roi-hours-saved">
                  <span className="text-[11px] font-mono text-white/50 uppercase block">Engineering Time Reclaimed</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                      {calculations.hoursSavedAnnually}
                    </span>
                    <span className="text-sm font-sans text-white/70">Hours / year</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 mt-1.5 font-sans">
                    <Timer className="w-3.5 h-3.5 text-orange-accent" />
                    <span>Equates to <strong>{calculations.daysSavedAnnually} full engineering days</strong> freed from tedious setup</span>
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="border-b border-white/10 pb-4" id="roi-speedup">
                  <span className="text-[11px] font-mono text-white/50 uppercase block">CFD Setup Delivery Speed</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold text-cobalt">
                      {calculations.speedUp}x
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      FASTER SETUP TIME
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1 leading-normal">
                    We turn painful multi-day tasks into automated, self-meshing scripts ready for execution in minutes.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="pb-2" id="roi-npr-saved">
                  <span className="text-[11px] font-mono text-white/50 uppercase block flex items-center gap-1">
                    <Globe className="w-3 h-3 text-cobalt" />
                    <span>Estimated Professional Cost Savings</span>
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#22C55E]">
                      NRs. {calculations.totalSavingsNRP.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#22C55E]/80 block mt-1">
                    ~ $ {(calculations.totalSavingsNRP / 133).toFixed(0)} USD in reclaimed engineering capacity
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom credential chips */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-orange-accent" />
              </div>
              <div>
                <span className="block font-sans font-bold text-xs text-white">Local Technical Expertise</span>
                <p className="text-[11px] text-white/50">Specially optimized for Nepal building codes and weather profile constraints.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
