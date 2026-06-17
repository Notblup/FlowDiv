import React from 'react';
import { ArrowRight, ChevronRight, Settings, BarChart3, Binary, Activity } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: 'service-cfd-auto',
      title: 'CFD Workflow Automation',
      description: 'Automate tedious geometry setups, boundary conditions, meshing algorithms, solver configs, post-processing pipelines, and formatting routines.',
      bullets: [
        'CAD cleanup scripting (Parasolid, STEP, IGES)',
        'Custom automated meshing presets & solver rules',
        'Headless command queueing (OpenFOAM / Fluent)',
        'One-click engineering report compilation'
      ],
      icon: (
        <svg className="w-8 h-8 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Workflow/pipeline mesh icon */}
          <path d="M4 10h12M4 14h12" />
          <path d="M12 4v16" strokeDasharray="3 3"/>
          <rect x="16" y="8" width="5" height="8" rx="1" />
          <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="4" cy="14" r="1.5" fill="currentColor"/>
        </svg>
      ),
      ctaText: 'Explore Platform Tools'
    },
    {
      id: 'service-simulation',
      title: 'Simulation Setup & Analysis',
      description: 'Acquire high-precision physical solvers for mechanical ventilation systems, passive cooling designs, and localized microclimate environments.',
      bullets: [
        'HVAC airflow distribution & thermal comfort (PMV, PPD)',
        'Basement jet fan optimization & carbon monoxide clearance',
        'Smoke evacuation modeling & fire containment paths',
        'External wind analysis & structural pressure profile maps'
      ],
      icon: (
        <svg className="w-8 h-8 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Airflow/Wind currents schematic icon */}
          <path d="M2 8h15a3 3 0 1 0-3-3" />
          <path d="M2 12h19a3 3 0 1 1-3 3" />
          <path d="M2 16h11a3 3 0 1 0-3-3" />
        </svg>
      ),
      ctaText: 'Request Airflow Study'
    },
    {
      id: 'service-result-viz',
      title: 'Result Visualization & Reporting',
      description: 'Turn cryptic vector arrays and massive raw output parameters into highly-impactful visual stories that win client and municipal approvals.',
      bullets: [
        'Fluid streamline velocity trajectories (Beziers)',
        'Temperature/pressure contour gradients (filled)',
        'Dead-zone stagnant pocket identification charts',
        'Professional executive reports ready for submittal'
      ],
      icon: (
        <svg className="w-8 h-8 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Vector flow/arrows array icon */}
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M18 6L6 18" />
          <path d="M14 6h4v4" />
          <path d="M10 18H6v-4" />
        </svg>
      ),
      ctaText: 'View Sample Report'
    },
    {
      id: 'service-workflow-audit',
      title: 'CFD Workflow Audit',
      description: 'We run structured, bottom-up audits of your current CAD-to-Simulation pipeline to isolate bottlenecks, friction points, and wasted hours.',
      bullets: [
        'Software API capabilities & scripting analysis',
        'Infrastructure benchmark evaluation (VPC/SaaS)',
        'Reclaimed staff hours ROI calculations',
        'Implementation roadmap & customized integration toolsets'
      ],
      icon: (
        <svg className="w-8 h-8 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Checklist mesh / audit icon */}
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12l2 2 4-4" />
          <path d="M8 8h8" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M8 16h8" strokeWidth="1" strokeDasharray="2 2"/>
        </svg>
      ),
      ctaText: 'Schedule Audit Now'
    }
  ];

  const handleServiceClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'service-workflow-audit') {
      const element = document.querySelector('#workflow-audit');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const contactSection = document.querySelector('#contact-form-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-gridgray relative overflow-hidden">
      {/* Background blueprint details */}
      <div className="absolute right-0 top-0 w-96 h-96 blueprint-grid opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase bg-cobalt/10 px-3 py-1 rounded-full">
            CORE CAPABILITIES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mt-4">
            Automated CFD workflows. Deliver better outcomes.
          </h2>
          <p className="font-sans text-base text-steel mt-4 leading-relaxed">
            We bridge the gap between architectural layout modeling and final airflow verification. From automated mesh creation to executive report publishing, we turn complex computational fluid dynamics into a repeatable, automated asset.
          </p>
        </div>

        {/* 4-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              id={srv.id}
              className="bg-offwhite/50 hover:bg-white border border-gridgray hover:border-cobalt/40 p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-tech transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Header with line icon */}
                <div className="flex items-center justify-between border-b border-gridgray/50 pb-4 mb-5">
                  <div className="p-3 bg-white border border-gridgray/60 rounded-md group-hover:bg-cobalt/5 group-hover:border-cobalt/20 transition-all flex items-center justify-center">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-mono text-steel uppercase bg-gridgray/40 px-2 py-0.5 rounded leading-none">
                    {srv.id === 'service-cfd-auto' ? 'Automation' : srv.id === 'service-simulation' ? 'Aero Solvers' : srv.id === 'service-result-viz' ? 'Graphics' : 'Process'}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-navy group-hover:text-cobalt transition-colors duration-200">
                  {srv.title}
                </h3>
                <p className="font-sans text-sm text-steel mt-3 leading-relaxed">
                  {srv.description}
                </p>

                {/* Bullets */}
                <ul className="mt-5 space-y-2 border-t border-gridgray/40 pt-4">
                  {srv.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-navy/80">
                      <ChevronRight className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Link */}
              <div className="mt-8 pt-4 border-t border-gridgray/30 flex justify-between items-center">
                <a
                  href={srv.id === 'service-workflow-audit' ? '#workflow-audit' : '#contact-form-section'}
                  onClick={(e) => handleServiceClick(e, srv.id)}
                  className="text-xs font-sans font-bold text-navy group-hover:text-cobalt transition-colors flex items-center gap-1.5 uppercase tracking-wide"
                  id={`srv-cta-link-${srv.id}`}
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Quote context */}
        <div className="mt-16 bg-navy text-white rounded-lg p-6 sm:p-10 blueprint-grid-dark relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-tech">
          <div className="relative z-10 max-w-2xl">
            <h4 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-normal">
              Need a bespoke automation interface for Revit or ANSYS?
            </h4>
            <p className="font-sans text-xs text-sans text-white/70 mt-2 leading-relaxed">
              We engineer standalone client plugins, cloud scheduler microservices, and automatic batch pipeline tools tailored explicitly to Nepalese construction practices and standard sizing regulations.
            </p>
          </div>
          <a
            href="#contact-form-section"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative z-10 px-5 py-3 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-bold tracking-wide uppercase transition-all flex items-center gap-2 shadow-sm whitespace-nowrap inline-flex self-stretch md:self-auto justify-center"
            id="capabilities-audit-cta"
          >
            <span>Custom Core Request</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
