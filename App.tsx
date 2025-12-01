import React, { useState, useEffect } from 'react';
import { SparklesIcon, CodeIcon, CpuIcon, ArrowRightIcon, MenuIcon, XIcon } from './components/Icons';
import { AIChat } from './components/AIChat';
import { SpotlightCard } from './components/SpotlightCard';
import { MatrixRain } from './components/MatrixRain';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-brand-500/20 selection:text-brand-200 overflow-x-hidden">
      
      {/* Structural Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.07]"></div>
        <div className="absolute inset-0 bg-grid-pattern-small bg-[length:10px_10px] opacity-[0.03]"></div>
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]"></div>
        
        {/* Floating Code Elements - Purely Decorative */}
        <div className={`absolute top-20 left-10 font-mono text-[10px] text-slate-800 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
           :: SYSTEM_INIT ::<br/>
           LOADING MODULES... [OK]
        </div>
        <div className={`absolute bottom-20 right-10 font-mono text-[10px] text-slate-800 text-right transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
           COORDINATES: 35.6895° N, 139.6917° E<br/>
           SERVER_TIME: {new Date().toISOString().split('T')[0]}
        </div>
      </div>

      {/* Precision Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer z-50">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border border-brand-500 rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="absolute inset-2 bg-brand-500/20"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-tech font-bold text-white tracking-widest leading-none">AETHERIA</span>
              <span className="text-[10px] font-mono text-brand-400 tracking-[0.3em] leading-none">CODE_LABS</span>
            </div>
          </div>

          {/* Desktop Menu - Monospace Tech Style */}
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Methodology', 'Intelligence'].map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-mono uppercase text-slate-400 hover:text-white transition-colors relative group">
                <span className="text-brand-500/50 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}.</span>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button className="px-6 py-2 border border-slate-700 bg-slate-900/50 text-xs font-mono text-white hover:bg-brand-500 hover:text-slate-950 hover:border-brand-500 transition-all duration-300">
              [ BOOK_DEMO ]
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-slate-950 z-40 transform transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-32 px-10 flex flex-col gap-8 md:hidden`}>
           {['Services', 'Methodology', 'Intelligence'].map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold text-slate-300 border-b border-slate-800 pb-4">
                <span className="text-brand-500 text-sm font-mono mr-4">0{i+1}</span>{item}
              </a>
            ))}
        </div>
      </nav>

      {/* Structural Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Typography */}
            <div className="lg:col-span-7 relative">
              {/* Decorative Lines */}
              <div className="absolute -left-10 top-0 bottom-0 w-px bg-slate-800 hidden lg:block"></div>
              <div className="absolute -left-10 top-10 w-4 h-px bg-brand-500 hidden lg:block"></div>
              <div className="absolute -left-10 bottom-10 w-4 h-px bg-brand-500 hidden lg:block"></div>

              <div className="inline-flex items-center gap-2 mb-8 border-b border-brand-500/30 pb-2">
                <span className="w-2 h-2 bg-brand-500 animate-pulse"></span>
                <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Architecting Next-Gen Systems</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 text-white tracking-tight">
                PRECISION <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">IN EVERY</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">PIXEL.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl font-light border-l-2 border-slate-800 pl-6">
                We fuse rigid engineering standards with fluid AI capabilities. 
                Building resilient digital infrastructure for the automated future.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#intelligence" className="group relative px-8 py-4 bg-white text-slate-950 font-bold font-mono uppercase tracking-wider overflow-hidden hover:bg-brand-50 transition-colors">
                  <span className="relative z-10">Initiate Protocol</span>
                  <div className="absolute inset-0 bg-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
                </a>
                <a href="#services" className="px-8 py-4 border border-slate-700 text-slate-300 font-mono uppercase tracking-wider hover:border-white hover:text-white transition-all">
                  View Specs
                </a>
              </div>
            </div>

            {/* Right Column: Matrix Rain Visualization */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-[500px] w-full border border-slate-800 bg-slate-950/80 backdrop-blur-sm rounded-sm p-1 overflow-hidden group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-500 group-hover:border-brand-500 transition-colors"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-500 group-hover:border-brand-500 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-500 group-hover:border-brand-500 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-500 group-hover:border-brand-500 transition-colors"></div>

              {/* Inner Content - Matrix Rain */}
              <div className="w-full h-full relative overflow-hidden bg-slate-950">
                <MatrixRain />
                
                {/* Overlay Text/UI Elements */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20"></div>
                
                {/* Floating Tags */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-brand-900/80 border border-brand-500/50 backdrop-blur text-[10px] font-mono text-brand-300 shadow-[0_0_10px_rgba(45,212,191,0.3)]">
                  LIVE_FEED: ACTIVE
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex justify-between items-end">
                      <div>
                        <div className="text-4xl font-bold text-white mb-1 tracking-tighter">DATA<span className="text-brand-500">.STREAM</span></div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Real-time Visualization</div>
                      </div>
                      <div className="flex gap-1">
                         <div className="w-1 h-4 bg-brand-500 animate-[pulse_1s_ease-in-out_infinite]"></div>
                         <div className="w-1 h-4 bg-brand-500 animate-[pulse_1.5s_ease-in-out_infinite] delay-75"></div>
                         <div className="w-1 h-4 bg-brand-500 animate-[pulse_0.8s_ease-in-out_infinite] delay-150"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services: The Bento Grid */}
      <section id="services" className="py-24 relative bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-slate-800 pb-8">
            <div>
              <h2 className="text-sm font-mono text-brand-500 uppercase tracking-widest mb-2">01. Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Core Modules</h3>
            </div>
            <p className="text-slate-400 max-w-md text-sm font-mono mt-4 md:mt-0 text-right">
              // DEPLOYING SCALABLE SOLUTIONS<br/>
              // OPTIMIZED FOR PERFORMANCE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
            
            {/* Module 1: AI Integration (Large) */}
            <SpotlightCard className="md:col-span-2 md:row-span-2 bg-slate-900/50">
              <div className="p-8 h-full flex flex-col justify-between relative">
                <div className="hud-corner hud-corner-tl"></div>
                <div className="hud-corner hud-corner-br"></div>
                
                <div>
                  <div className="w-12 h-12 bg-slate-800 flex items-center justify-center border border-slate-700 mb-6">
                    <CpuIcon className="text-brand-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">AI Agents & Workflows</h4>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    We architect autonomous agents capable of executing complex business logic. 
                    From RAG systems to multi-step reasoning engines, we bridge LLMs with your database.
                  </p>
                </div>
                
                <div className="w-full bg-slate-950 p-4 border border-slate-800 font-mono text-[10px] text-slate-400 mt-6">
                  <div className="flex justify-between border-b border-slate-800 pb-2 mb-2">
                    <span>ARCH_TYPE</span>
                    <span className="text-brand-400">NEURAL_HYBRID</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500"></div> VECTOR_DB_CONNECTED</div>
                    <div className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500"></div> LATENCY_OPTIMIZED</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Module 2: Frontend */}
            <SpotlightCard className="md:col-span-2 bg-slate-900/50">
               <div className="p-8 h-full flex items-center justify-between">
                 <div className="max-w-[60%]">
                    <h4 className="text-xl font-bold text-white mb-2">High-Performance Frontend</h4>
                    <p className="text-slate-400 text-sm">Next.js 15 + React Server Components. Zero layout shift, instant interactions.</p>
                 </div>
                 <div className="h-20 w-20 border border-slate-700 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border-t-2 border-brand-500 rounded-full animate-spin"></div>
                    <span className="font-mono text-xs font-bold text-white">100</span>
                 </div>
               </div>
            </SpotlightCard>

            {/* Module 3: System Design */}
            <SpotlightCard className="md:col-span-1 bg-slate-900/50">
              <div className="p-6 h-full flex flex-col justify-end">
                <CodeIcon className="text-slate-500 mb-auto" />
                <h4 className="text-lg font-bold text-white mb-1">System Design</h4>
                <p className="text-slate-500 text-xs">Microservices & Serverless architecture planning.</p>
              </div>
            </SpotlightCard>

            {/* Module 4: UI/UX */}
            <SpotlightCard className="md:col-span-1 bg-slate-900/50">
              <div className="p-6 h-full flex flex-col justify-end">
                <SparklesIcon className="text-slate-500 mb-auto" />
                <h4 className="text-lg font-bold text-white mb-1">Generative UI</h4>
                <p className="text-slate-500 text-xs">Interfaces that adapt to user intent in real-time.</p>
              </div>
            </SpotlightCard>

             {/* Module 5: Analytics */}
             <SpotlightCard className="md:col-span-2 bg-slate-900/50">
                <div className="p-8 h-full relative overflow-hidden">
                   <h4 className="text-lg font-bold text-white mb-4 relative z-10">Data Visualization</h4>
                   
                   {/* Fake Graph */}
                   <div className="flex items-end gap-2 h-32 w-full">
                      {[40, 70, 45, 90, 60, 80, 50, 95, 75, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-brand-900/40 hover:bg-brand-500 transition-colors duration-300 relative group">
                           <div className="absolute bottom-0 w-full bg-brand-500/20" style={{ height: `${h}%` }}></div>
                           <div className="absolute bottom-0 w-full border-t border-brand-500" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                   </div>
                </div>
             </SpotlightCard>

          </div>
        </div>
      </section>

      {/* Methodology / Process */}
      <section id="methodology" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <h2 className="text-sm font-mono text-brand-500 uppercase tracking-widest mb-2">02. Sequence</h2>
              <h3 className="text-4xl font-display font-bold text-white">Execution Protocol</h3>
           </div>

           <div className="relative">
              {/* Central Line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-slate-800"></div>

              {[
                { title: "Discovery & Analysis", desc: "We map the problem space and define technical constraints.", side: "left" },
                { title: "Architectural Blueprint", desc: "System design, database modeling, and stack selection.", side: "right" },
                { title: "Rapid Development", desc: "Iterative sprints with continuous deployment pipelines.", side: "left" },
                { title: "Quality Assurance", desc: "Automated testing, security auditing, and load balancing.", side: "right" }
              ].map((step, idx) => (
                <div key={idx} className={`flex md:justify-between items-center mb-16 relative ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                   
                   {/* Content */}
                   <div className="ml-12 md:ml-0 md:w-[45%] p-6 border border-slate-800 bg-slate-900/30 hover:border-brand-500/50 transition-colors duration-300 relative group">
                      <div className="absolute top-0 right-0 p-2 opacity-20 font-mono text-4xl font-bold group-hover:opacity-40 group-hover:text-brand-500 transition-all">0{idx+1}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-slate-400 text-sm">{step.desc}</p>
                   </div>

                   {/* Node */}
                   <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-[11px] h-[11px] bg-slate-950 border-2 border-brand-500 rounded-full z-10 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                   
                   {/* Empty space for the other side */}
                   <div className="hidden md:block md:w-[45%]"></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Intelligence (Chat) */}
      <section id="intelligence" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-1/3">
              <h2 className="text-sm font-mono text-brand-500 uppercase tracking-widest mb-2">03. Intelligence</h2>
              <h3 className="text-4xl font-display font-bold text-white mb-6">Consult the System</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Interact with our fine-tuned Gemini model. It is programmed to assist with technical feasibility, cost estimation, and architectural recommendations.
              </p>
              
              <div className="p-4 bg-slate-900/50 border border-slate-800 font-mono text-xs text-slate-500">
                 <div className="mb-2 text-white font-bold">SYSTEM_PARAMS:</div>
                 <ul className="space-y-1">
                   <li>{'>'} Model: gemini-2.5-flash</li>
                   <li>{'>'} Context_Window: 128k</li>
                   <li>{'>'} Role: Solutions Architect</li>
                   <li>{'>'} Access: Public</li>
                 </ul>
              </div>
            </div>

            <div className="lg:w-2/3 relative">
               <AIChat />
            </div>

          </div>
        </div>
      </section>

      {/* Structural Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-tech text-white mb-4">AETHERIA_CODE</h4>
              <p className="text-slate-500 max-w-sm text-sm">
                Engineering the bridge between human intent and machine execution.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4 font-mono uppercase text-xs tracking-widest">Sitemap</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-brand-400 transition-colors">Modules</a></li>
                <li><a href="#intelligence" className="hover:text-brand-400 transition-colors">Intelligence</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4 font-mono uppercase text-xs tracking-widest">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Protocol</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-600 font-mono">
              © 2024 AETHERIA SYSTEMS INC. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-xs text-slate-500 font-mono">SYSTEM OPERATIONAL</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;