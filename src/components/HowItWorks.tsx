import React, { useState } from 'react';
import { Database, Laptop, Play, BarChart, CheckSquare, ArrowDown, ChevronRight, Globe, Code } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      index: 0,
      title: 'Data Intake',
      subtitle: 'Input ingestion',
      icon: <Database className="w-5 h-5 text-cobalt" />,
      tag: '01. INPUT',
      desc: 'Upload standard 3D building models (Revit, AutoCAD, STEP, Parasolid) alongside regional environmental limits (such as Kathmandu wind speeds or design summer air humidity).',
      checklist: [
        'Automatic watertight check for architectural models',
        'Ingestion of ventilation schedules & design airflow limits',
        'Integration of local weather datasets from DHM Nepal',
        'Self-extracting geometric boundaries layer separation'
      ]
    },
    {
      index: 1,
      title: 'Auto Setup',
      subtitle: 'Algorithmic configuration',
      icon: <Laptop className="w-5 h-5 text-cobalt" />,
      tag: '02. MESHING',
      desc: 'FlowDiv engines automatically build surrounding volume fields, mesh grids (structured hexahedral cells with boundary prism layers), and inject boundary inputs directly.',
      checklist: [
        'Algorithmic wall-clump correction',
        'Refinement regions centered on HVAC outlets & dampers',
        'Automatic fluid-solid-interaction boundary detection',
        'Turbulent closure models chosen based on architectural duct width'
      ]
    },
    {
      index: 2,
      title: 'Run & Monitor',
      subtitle: 'High performance solving',
      icon: <Play className="w-5 h-5 text-cobalt" />,
      tag: '03. SOLVER',
      desc: 'Solver runs are dispatched safely to our dedicated cloud clusters. The core simulation is executed on parallel multi-core architectures with convergence logging.',
      checklist: [
        'Parallel CPU solver clustering (OpenFOAM core daemon)',
        'Real-time residual plotting and continuity monitoring',
        'Under-relaxation factors tweaked on-the-fly for stability',
        'Automated node allocation & parallel domain decomposition'
      ]
    },
    {
      index: 3,
      title: 'Post-Process',
      subtitle: 'Analytical synthesis',
      icon: <BarChart className="w-5 h-5 text-cobalt" />,
      tag: '04. VISUALS',
      desc: 'Our engine extracts flow vectors, velocity slices, static pressure loads, and temperature indices across 3D planar cuts to construct beautiful, high-contrast visual contour maps.',
      checklist: [
        'Bezier streamline vector generation around obstructions',
        'Dynamic dead-zone (vortex stagnation) tracking',
        'ASHRAE-55 Thermal Comfort PMV indices calculation',
        'Automatic export of viewport image arrays'
      ]
    },
    {
      index: 4,
      title: 'Deliver & Iterate',
      subtitle: 'Continuous revision',
      icon: <CheckSquare className="w-5 h-5 text-cobalt" />,
      tag: '05. REPORT',
      desc: 'Review structural reports with design revisions instantly. If metrics show stagnation or excessive pressure drops, rerun tweaked geometry in a single, rapid manual step.',
      checklist: [
        'Automated PDF, Word, and HTML executive reports generation',
        'Baseline vs. Revised mechanical system comparisons',
        'Digital signature & review workflow validation',
        'Direct download links for 3D state visualizer files'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-offwhite border-t border-gridgray relative">
      <div className="absolute left-0 bottom-0 w-80 h-80 blueprint-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase bg-cobalt/10 px-3 py-1 rounded-full">
            OUR PIPELINE METHODOLOGY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mt-4">
            How FlowDiv Automates Your CFD Workflow
          </h2>
          <p className="font-sans text-base text-steel mt-4">
            We transform a tedious, highly manual multi-day modeling process into a streamlined pipeline requiring next to zero code.
          </p>
        </div>

        {/* Desktop Pipeline Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative mb-12">
          {/* Connecting Line behind items */}
          <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gridgray -translate-y-10 z-0"></div>

          {steps.map((st) => {
            const isActive = activeStep === st.index;
            return (
              <button
                key={st.index}
                id={`how-step-pill-${st.index}`}
                onClick={() => setActiveStep(st.index)}
                className="relative z-10 text-left focus:outline-none group"
              >
                {/* Flow Node Bubble */}
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-navy border-navy text-white shadow-tech'
                      : 'bg-white border-gridgray text-steel hover:border-cobalt/50 group-hover:scale-105'
                  }`}>
                    {st.icon}
                  </div>
                  
                  {/* Title & subtitle */}
                  <span className="block text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase mt-4">
                    {st.tag}
                  </span>
                  <h3 className="font-display font-bold text-sm text-navy mt-1">
                    {st.title}
                  </h3>
                  <span className="text-[11px] text-steel">
                    {st.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Contents Container (Desktop / Large screen cards) */}
        <div className="hidden lg:block bg-white border border-gridgray rounded-lg shadow-tech overflow-hidden min-h-[300px]">
          <div className="grid grid-cols-12">
            
            {/* Step Left: Descriptive text */}
            <div className="col-span-6 p-8 flex flex-col justify-between border-r border-gridgray/50">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-cobalt px-2.5 py-0.5 rounded">
                    STAGE {activeStep + 1}
                  </span>
                  <span className="font-sans text-xs text-steel">Sequential Solver Process</span>
                </div>
                <h4 className="font-display font-bold text-2xl text-navy">
                  {steps[activeStep].title} – {steps[activeStep].subtitle}
                </h4>
                <p className="font-sans text-sm text-steel leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>

              {/* Automation micro tagline */}
              <div className="pt-6 border-t border-gridgray/40 flex items-center gap-2.5 text-xs text-cobalt font-mono">
                <Code className="w-4 h-4" />
                <span>FLOWDIV INFRASTRUCTURE AUTOMATION MODULE AGENT</span>
              </div>
            </div>

            {/* Step Right: Checklist & details */}
            <div className="col-span-6 p-8 bg-offwhite/50 space-y-4 blueprint-grid blueprint-grid-fine">
              <span className="block text-xs font-mono font-bold text-navy uppercase tracking-wider">
                AUTOMATION CHECKS & TASKS EXECUTED
              </span>
              <ul className="space-y-3">
                {steps[activeStep].checklist.map((check, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-3 bg-white p-3 rounded border border-gridgray/60 shadow-sm" id={`how-check-${activeStep}-${cIdx}`}>
                    <div className="w-5 h-5 rounded-full bg-cobalt/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-mono font-extrabold text-cobalt">{activeStep + 1}.{cIdx + 1}</span>
                    </div>
                    <span className="text-xs font-sans text-navy/95 font-medium leading-relaxed">
                      {check}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>


        {/* Mobile / Vertical Navigation for smaller screens */}
        <div className="block lg:hidden space-y-6">
          {steps.map((st) => (
            <div
              key={st.index}
              id={`step-card-mobile-${st.index}`}
              className="bg-white border border-gridgray p-5 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3.5 border-b border-gridgray/50 pb-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cobalt/10 border border-cobalt flex items-center justify-center flex-shrink-0">
                  {st.icon}
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-cobalt leading-none uppercase">{st.tag}</span>
                  <h3 className="font-display font-bold text-base text-navy mt-1">
                    {st.title} – <span className="font-normal text-xs text-steel">{st.subtitle}</span>
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs text-steel leading-relaxed">
                {st.desc}
              </p>

              <div className="mt-4 bg-offwhite/80 p-3.5 rounded border border-gridgray/40 space-y-2">
                <span className="block text-[10px] font-mono text-navy font-bold uppercase">AUTOMATED TASKS</span>
                {st.checklist.map((check, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-xs">
                    <ChevronRight className="w-3.5 h-3.5 text-cobalt mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-navy/90 font-medium leading-normal">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
