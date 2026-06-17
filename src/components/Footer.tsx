import React from 'react';
import Logo from './Logo';
import { ArrowUp, Mail, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-navy relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & description (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" />
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-sm">
              FlowDiv is Nepalese engineering automation firm specializing in CFD workflow solvers and scripts. We support MEP consulting teams in reducing geometric cleanups and processing airflow validation deliverables faster.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22C55E]">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>NATIVE INFRASTRUCTURE COMPLIANT</span>
            </div>
          </div>

          {/* Quick links directory (col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-widest text-cobalt">
              Engine Modules
            </h4>
            <ul className="space-y-2 text-xs font-sans text-white/50">
              <li>
                <a href="#services" className="hover:text-white transition-colors">CFD Pipeline Automation</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">HVAC Air Displacement</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Smoke Evacuation Planning</a>
              </li>
              <li>
                <a href="#workflow-audit" className="hover:text-white transition-colors">Duct Pressure Optimizer</a>
              </li>
            </ul>
          </div>

          {/* Physical contact reference (col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-widest text-[#FF7A00]">
              FlowDiv Office
            </h4>
            <p className="font-sans text-xs text-white/50 leading-relaxed">
              FlowDiv Pvt. Ltd.<br />
              Kopundole, Lalitpur<br />
              Kathmandu Valley, Nepal
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50 pt-2 shrink-0">
              <Mail className="w-3.5 h-3.5 text-cobalt" />
              <span className="font-mono text-cobalt hover:underline">
                <a href="mailto:hello@flowdiv.com">hello@flowdiv.com</a>
              </span>
            </div>
          </div>

        </div>

        {/* Branding & legal row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} FlowDiv Pvt. Ltd. All rights reserved.</span>
            <span className="text-white/10 hidden sm:inline">|</span>
            <span>Kathmandu, Nepal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-white/30 truncate">
              AUTOMATE. OPTIMIZE. IMPACT.
            </span>
            <button
              id="scroll-to-top-footer"
              onClick={handleScrollToTop}
              className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded transition-all flex items-center gap-1 hover:text-white"
              title="Return to viewport header"
            >
              <span className="font-mono text-[10px]">UP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cobalt" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
