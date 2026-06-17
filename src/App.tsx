import React from 'react';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import FlowSimulator from './components/FlowSimulator';
import HowItWorks from './components/HowItWorks';
import CaseStudy from './components/CaseStudy';
import AuditCalculator from './components/AuditCalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HeroVentilationStudy from './components/HeroVentilationStudy';
import { ArrowRight, ArrowDown, Shield, CheckCircle2, Cpu, Globe, ArrowUpRight } from 'lucide-react';

export default function App() {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="flowdiv-application-root" className="min-h-screen bg-offwhite flex flex-col justify-between selection:bg-cobalt/20">
      
      {/* Global Navigation Shell */}
      <Navbar />

      {/* Main content flow */}
      <main className="flex-grow pt-20">
        
        {/* HOMEPAGE HERO SECTION */}
        <section id="hero-section" className="relative py-20 lg:py-28 overflow-hidden bg-navy text-white border-b-2 border-navy">
          {/* Blueprint background grid */}
          <div className="absolute inset-0 blueprint-grid-dark opacity-35 pointer-events-none"></div>
          <div className="absolute inset-0 blueprint-grid-fine-dark opacity-15 pointer-events-none"></div>
          
          {/* Accent lighting blob */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cobalt/20 rounded-full filter blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headline and Positioning info (col-span-7) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                
                {/* Localized trust badge */}
                <div id="hero-badge-nepal" className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono font-bold tracking-wide text-cobalt uppercase">
                  <span className="w-2 h-2 rounded-full bg-orange-accent"></span>
                  <span>CFD Automation for MEP consultants in Nepal</span>
                </div>

                <div className="space-y-4">
                  {/* Saira font for display heading */}
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]" id="hero-main-title">
                    Smarter CFD.<br />
                    Better Buildings.
                  </h1>
                  
                  {/* Inter body description */}
                  <p className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                    We automate repetitive CFD workflows for MEP consultants in Nepal, so teams can deliver accurate airflow insights faster. Stop wasting multi-day engineering turnarounds on basic geometry prep and meshing.
                  </p>
                </div>

                {/* Call To Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="#workflow-audit"
                    onClick={(e) => handleScrollToSection(e, '#workflow-audit')}
                    className="px-6 py-3.5 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    id="hero-cta-consult"
                  >
                    <span>Book a Consultation</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href="#services"
                    onClick={(e) => handleScrollToSection(e, '#services')}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-95"
                    id="hero-cta-solutions"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-4 h-4 text-cobalt" />
                  </a>
                </div>

                {/* Trust/Value Chips beneath Hero */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4" id="hero-trust-chips">
                  {[
                    { label: 'CFD Automation', val: 'Automated setups' },
                    { label: 'MEP Expertise', val: 'Mechanical focus' },
                    { label: 'Faster Delivery', val: '75%+ Hours reclaimed' },
                    { label: 'Reliable Insights', val: 'Proven physics solver' }
                  ].map((chip, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded p-3 text-left">
                      <span className="block font-sans font-bold text-xs text-white leading-none">{chip.label}</span>
                      <span className="block text-[10px] font-mono text-white/50 mt-1">{chip.val}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Dynamic Interactive Ventilation Study of an Office space */}
              <div className="lg:col-span-5 relative" id="hero-ventilation-study-container">
                <div className="absolute inset-0 bg-gradient-to-tr from-cobalt/20 to-transparent rounded-lg filter blur-2xl"></div>
                
                {/* Embedded rich interactive simulator */}
                <HeroVentilationStudy />
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <ServicesSection />

        {/* PIPELINE HOW IT WORKS SECTION */}
        <HowItWorks />

        {/* DEDICATED INTERACTIVE SIMULATION SECTION (The Core Software Credibility Piece) */}
        <section id="simulator" className="py-24 bg-white border-t border-gridgray relative">
          <div className="absolute right-0 bottom-0 w-96 h-96 blueprint-grid opacity-10 pointer-events-none123"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase bg-cobalt/10 px-3 py-1 rounded-full">
                  INTERACTIVE PREVIEW
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
                  Smarter CFD. Real-Time Solver Preview.
                </h2>
                <p className="font-sans text-sm sm:text-base text-steel leading-relaxed">
                  Try our WebCFD™ core simulator model directly on this screen. Slide flow speeds, toggle baffle obstructions, and observe the immediate re-calculation of pressure drops and fluid velocity vectors!
                </p>
                <div className="space-y-2 border-l-2 border-cobalt pl-4 pt-1">
                  <span className="block font-sans font-bold text-xs text-navy">Built for MEP consultants who value precision.</span>
                  <p className="text-xs text-steel leading-relaxed">
                    By replacing slow standard manual mesh preparations with adaptive automated scripts, we turn painful hours into automated assets.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <FlowSimulator />
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDY DETAIL */}
        <CaseStudy />

        {/* PROCESS AUDIT AND ROI CALCULATOR */}
        <AuditCalculator />

        {/* CONTACT GATHERING SECTION */}
        <ContactForm />

      </main>

      {/* Footer Branding section */}
      <Footer />

    </div>
  );
}
