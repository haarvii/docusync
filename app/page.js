"use client";

import { useState, useEffect } from 'react';
import { Github, Lock, FileText, Zap, Workflow, Share2, Star, CheckCircle, Clock, ChevronRight } from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
// Note: For the full "Gotham" effect, ensure you import 'Montserrat' 
// from 'next/font/google' in your layout.js and apply it to the body.
// This component uses standard Tailwind sans which maps to system fonts by default.

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Enforcing Dark Mode (Deep Purple) for that "Velvet Rope" feel
    // To enable Light Mode, we would switch these bg colors to white/gray
    <div className="flex flex-col min-h-screen bg-[#0f0518] text-slate-200 font-sans selection:bg-red-500 selection:text-white scroll-smooth">
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        /* Custom Scrollbar for sleek look */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f0518; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #ef4444; }
      `}} />
      
      <Header scrolled={scrolled} />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SecuritySection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

// 1. Header Component
function Header({ scrolled }) {
  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-[#0f0518]/90 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                DocuSync
              </span>
            </a>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/haarvii/docusync"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden lg:inline">Star on GitHub</span>
            </a>
            <a
              href="#waitlist"
              className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-0.5"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// 2. Hero Section
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-center overflow-hidden">
      {/* Deep Purple & Red Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
            Private Beta Access Open
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Stop writing docs. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-purple-500">
            Start shipping code.
          </span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The AI Documentation Engineer that runs privately on your infrastructure. 
          Reads Git diffs. Updates Notion. Zero data leaks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-full hover:bg-red-500 transition-all shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]"
          >
            Request Access
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://github.com/haarvii/docusync"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// 3. Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "Documentation Rot",
      description: "Docs are outdated the moment they're written. Engineers hate context switching to update Confluence."
    },
    {
      icon: Share2,
      title: "Knowledge Silos",
      description: "Onboarding takes weeks because critical logic is locked in the heads of senior engineers who just left."
    },
    {
      icon: Lock,
      title: "Privacy Compliance",
      description: "You can't paste proprietary code into ChatGPT. Security teams block most cloud AI tools."
    }
  ];

  return (
    <section className="py-24 bg-[#130720]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your docs are lying to you.
          </h2>
          <p className="text-slate-400 text-lg">
            The disconnect between your codebase and your documentation is costing you velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300">
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-slate-400 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. How It Works Section
function HowItWorksSection() {
  const steps = [
    { icon: Github, title: "Commit Code", desc: "Merge a PR as usual." },
    { icon: Zap, title: "Webhook", desc: "DocuSync detects the diff." },
    { icon: Workflow, title: "Hybrid AI", desc: "Groq (Fast) or Ollama (Local)." },
    { icon: CheckCircle, title: "Wiki Sync", desc: "Notion updated instantly." }
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-[#0f0518]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl">
            The "Set and Forget" Workflow
          </h2>
          <p className="text-slate-400 mt-4 md:mt-0">
            Zero behavior change required.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-red-900/0 via-red-500/50 to-red-900/0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-24 h-24 rounded-full bg-[#1a0b2e] border-4 border-[#0f0518] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                  <step.icon className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Features (Hybrid Architecture)
function FeaturesSection() {
  return (
    <section className="py-24 bg-[#130720] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
              Hybrid Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Speed of the Cloud.<br />
              Privacy of Localhost.
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              We utilize a unique <strong>Smart Router</strong> system. It uses blazing fast cloud APIs for generic documentation, but automatically fails over to a private, local LLM running on your infrastructure when dealing with sensitive logic.
            </p>
            
            <div className="space-y-6">
              {[
                "Groq API for sub-second generation",
                "Local Llama 3 fallback for privacy",
                "Differential Sync (Only processes changes)",
                "Self-hostable on AWS/Oracle/Hetzner"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Block Visual */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-xl bg-[#0f0518] border border-white/10 p-1 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-red-500/10 to-purple-500/10 rounded-xl z-0"></div>
              <div className="relative z-10 bg-[#1e1e1e] rounded-lg p-6 overflow-hidden font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-slate-500">router.js</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-purple-400">async function</span> <span className="text-yellow-400">generateDocs</span>(chunk) {'{'}
                  <br />
                  &nbsp;&nbsp;<span className="text-slate-500">// 1. Check Privacy Settings</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">if</span> (isSensitive(chunk)) {'{'}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Route to Local Llama 3 (Private)</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">await</span> ollama.chat(chunk);
                  <br />
                  &nbsp;&nbsp;{'}'} <span className="text-purple-400">else</span> {'{'}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Route to Cloud (Fast)</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">await</span> groq.chat(chunk);
                  <br />
                  &nbsp;&nbsp;{'}'}
                  <br />
                  {'}'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. Security/Trust Section
function SecuritySection() {
  return (
    <section className="py-20 bg-[#0f0518]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 rounded-3xl p-8 md:p-16 text-center border border-white/5">
          <Lock className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Zero-Trust by Design
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            For teams that cannot compromise. Run the entire engine inside your VPC. 
            No code ever leaves your perimeter if you don't want it to.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: "Open Source", value: "100%" },
              { label: "Data Leaks", value: "0" },
              { label: "SOC-2", value: "Ready" },
              { label: "Deployment", value: "On-Prem" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. Waitlist Section
function WaitlistSection() {

  
  const TALLY_FORM_URL = "https://tally.so/embed/GxxV9Z?hideTitle=1&transparentBackground=1&dynamicHeight=1";

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden">
      {/* Background Splashes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Join the <span className="text-red-500">Velvet Rope</span> Beta
          </h2>
          <p className="text-xl text-slate-300">
            We are onboarding users in small batches to ensure our free-tier infrastructure remains stable. 
            Request an invite to secure your spot in the queue.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto bg-[#130720] p-2 rounded-2xl border border-white/10 shadow-2xl">
          <iframe
            data-tally-src={TALLY_FORM_URL}
            loading="lazy"
            width="100%"
            height="350"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="DocuSync AI Waitlist"
            className="rounded-xl bg-transparent"
          ></iframe>
        </div>
      </div>
      
      {/* Tally Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e){e.src=e.dataset.tallySrc})};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
          `,
        }}
      />
    </section>
  );
}

// 8. Footer Component
function Footer() {
  return (
    <footer className="py-12 bg-[#0a0310] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FileText className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold text-white">DocuSync AI</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="/privacy" className="hover:text-red-500 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-red-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-red-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-8">
          &copy; 2025 DocuSync AI. Built in public on a $0 stack.
        </p>
      </div>
    </footer>
  );
}