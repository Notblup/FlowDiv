import React, { useState } from 'react';
import { Mail, MapPin, Building2, Send, CheckCircle2, Phone, Briefcase, ChevronRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    projectType: 'hvac',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact-form-section" className="py-24 bg-white border-t border-gridgray relative">
      <div className="absolute left-0 bottom-0 w-96 h-96 blueprint-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Panel: Contact Details & Architectural Coordinates map (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-cobalt tracking-wider uppercase bg-cobalt/10 px-3 py-1 rounded-full">
                  GET IN TOUCH
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mt-4">
                  Let's Work Together
                </h2>
                <p className="font-sans text-sm text-steel mt-4 leading-relaxed">
                  Have an MEP model that needs CFD flow optimization, or want to reduce manual geometry workflow setup times? We'd love to partner with you.
                </p>
              </div>

              {/* Physical details list */}
              <div className="space-y-4 pt-4 border-t border-gridgray/60">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/5 border border-cobalt/10 rounded-md text-cobalt mt-1">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-navy text-sm">FlowDiv Pvt. Ltd.</span>
                    <span className="block text-xs text-steel mt-0.5">CFD Workflow Automation & Software for MEP Consultants</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/5 border border-cobalt/10 rounded-md text-cobalt mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-navy text-sm">Kathmandu, Nepal</span>
                    <span className="block text-xs text-steel mt-0.5">Serving consultancy networks across Nepal and South Asia</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/5 border border-cobalt/10 rounded-md text-cobalt mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-navy text-sm">Direct Contact</span>
                    <span className="block text-xs text-cobalt font-mono mt-0.5 hover:underline">
                      <a href="mailto:hello@flowdiv.com">hello@flowdiv.com</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated coordinates locator diagram matching Kathmandu localization */}
            <div className="mt-8 p-4 bg-offwhite border border-gridgray rounded-md blueprint-grid relative h-[140px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 blueprint-grid-fine opacity-30"></div>
              
              {/* Static visual contour lines representing Kathmandu valley fluid elevations */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 250 100">
                <path d="M 10 30 Q 80 5, 240 50" stroke="#0057D9" strokeWidth="1" fill="none" />
                <path d="M 20 50 Q 110 20, 230 70" stroke="#FF7A00" strokeWidth="1" fill="none" />
                <path d="M 10 70 Q 130 40, 240 90" stroke="#0057D9" strokeWidth="1" fill="none" />
              </svg>

              <div className="relative text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 bg-navy text-white text-[10px] font-mono rounded-full border border-white/10 shadow py-0.5">
                  <span className="w-2 h-2 rounded-full bg-orange-accent animate-ping"></span>
                  <span>KATHMANDU OFFICE</span>
                </div>
                <p className="text-[10px] font-mono text-steel mt-1">LAT: 27.7172° N | LON: 85.3240° E</p>
              </div>
            </div>

          </div>

          {/* Right Panel: Interactive contact form (col-span-7) */}
          <div className="lg:col-span-7 bg-offwhite/50 border border-gridgray rounded-lg p-6 sm:p-8 shadow-inner relative flex flex-col justify-center">
            
            {submitted ? (
              <div id="contact-success-pane" className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-navy">Transmission Dispatched Successfully</h3>
                  <p className="font-sans text-xs text-steel mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-navy">{formData.fullName}</strong>. A FlowDiv MEP system engineer will review your CAD pipeline questions and respond to <span className="font-mono text-cobalt font-bold">{formData.workEmail}</span> in less than 24 hours.
                  </p>
                </div>
                <button
                  id="contact-btn-reset"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      workEmail: '',
                      company: '',
                      projectType: 'hvac',
                      message: ''
                    });
                  }}
                  className="px-5 py-2 border border-gridgray text-navy hover:text-white hover:bg-navy rounded font-mono text-xs font-semibold"
                >
                  Send another inquiries
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="contact-interactive-form">
                <div>
                  <h3 className="font-display font-bold text-lg text-navy">Partner With Us</h3>
                  <p className="text-xs text-steel mt-1">Send us details on current structural challenges or automation requests.</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5" id="form-group-fullname">
                      <label htmlFor="contact-input-fullname" className="font-sans font-semibold text-xs text-navy">Full Name</label>
                      <input
                        id="contact-input-fullname"
                        type="text"
                        required
                        placeholder="e.g. Subash Shrestha"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-xs font-sans bg-white border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5" id="form-group-workemail">
                      <label htmlFor="contact-input-email" className="font-sans font-semibold text-xs text-navy">Work Email</label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        placeholder="e.g. s.shrestha@nepaleng.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full text-xs font-sans bg-white border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5" id="form-group-company">
                      <label htmlFor="contact-input-company" className="font-sans font-semibold text-xs text-navy">Company / Organization</label>
                      <input
                        id="contact-input-company"
                        type="text"
                        required
                        placeholder="e.g. Apex Consulting Engineers"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full text-xs font-sans bg-white border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5" id="form-group-projecttype">
                      <label htmlFor="contact-input-type" className="font-sans font-semibold text-xs text-navy">Primary Interest Area</label>
                      <select
                        id="contact-input-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full text-xs font-mono bg-white border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors"
                      >
                        <option value="hvac">Mechanical / HVAC Ventilation Studies</option>
                        <option value="smoke">Smoke Clearance & Jet Fans Modeling</option>
                        <option value="automation">Core Geometric Workflow Automation</option>
                        <option value="other">Bespoke Architectural Consulting</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 - Message */}
                  <div className="flex flex-col gap-1.5" id="form-group-message">
                    <label htmlFor="contact-input-message" className="font-sans font-semibold text-xs text-navy">Message Details</label>
                    <textarea
                      id="contact-input-message"
                      rows={4}
                      required
                      placeholder="e.g., We are looking to automate core geometry checks in Revit CAD files or run a professional ventilation smoke audit..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs font-sans bg-white border border-gridgray rounded px-3 py-2.5 text-navy focus:outline-none focus:border-cobalt transition-colors resize-y min-h-[90px]"
                    />
                  </div>

                </div>

                {/* Submit Trigger */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-[10px] text-steel font-mono">
                    ✓ Secured client-side session transmission encrypted
                  </span>
                  
                  <button
                    id="contact-btn-submit"
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-orange-accent hover:bg-orange-accent/90 disabled:bg-slate-400 text-white rounded font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Transmitting Inquiries...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
