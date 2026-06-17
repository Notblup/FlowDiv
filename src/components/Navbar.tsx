import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Services', href: '#services' },
    { title: 'Interactive Demo', href: '#simulator' },
    { title: 'Methodology', href: '#how-it-works' },
    { title: 'Case Study', href: '#case-studies' },
    { title: 'Process Audit', href: '#workflow-audit' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-offwhite/90 backdrop-blur-md border-b border-gridgray/60 shadow-tech py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#top-navbar" onClick={(e) => handleScrollToSection(e, '#top-navbar')} className="flex items-center">
            <Logo variant="dark" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="font-sans text-sm font-medium text-navy/80 hover:text-cobalt transition-colors"
                id={`nav-link-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Right Side Callouts (National Context & CTA) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gridgray/30 border border-gridgray rounded-full text-xs font-mono text-steel">
              <Globe className="w-3.5 h-3.5 text-cobalt" />
              <span>KTM, NEPAL</span>
            </div>
            
            <a
              href="#workflow-audit"
              onClick={(e) => handleScrollToSection(e, '#workflow-audit')}
              className="px-5 py-2.5 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-semibold tracking-wide uppercase transition-all flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95"
              id="nav-cta-desktop"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-navy hover:text-cobalt bg-gridgray/10 rounded focus:outline-none transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Backed by Blueprint Lattice Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-navy/25 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-80 bg-offwhite border-l border-gridgray p-6 blueprint-grid blueprint-grid-fine flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
            id="mobile-navigation-canvas"
          >
            <div>
              <div className="flex items-center justify-between border-b border-gridgray/60 pb-5 mb-6">
                <Logo variant="dark" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-navy hover:text-cobalt bg-gridgray/20 rounded"
                  id="mobile-menu-close"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="font-sans text-base font-semibold text-navy/90 hover:text-cobalt border-b border-gridgray/30 pb-2 transition-all flex justify-between items-center"
                    id={`mobile-nav-link-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span>{link.title}</span>
                    <span className="font-mono text-xs text-steel opacity-60">
                      {link.href.replace('#', '/')}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-gridgray/60 pt-6">
              <div className="flex items-center gap-2 justify-center text-xs font-mono text-steel py-2 bg-gridgray/30 border border-gridgray rounded-md">
                <Globe className="w-3.5 h-3.5 text-cobalt" />
                <span>FlowDiv Pvt. Ltd. • Kathmandu, Nepal</span>
              </div>
              <a
                href="#workflow-audit"
                onClick={(e) => handleScrollToSection(e, '#workflow-audit')}
                className="w-full text-center px-5 py-3 bg-orange-accent hover:bg-orange-accent/90 text-white rounded font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                id="nav-cta-mobile"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
