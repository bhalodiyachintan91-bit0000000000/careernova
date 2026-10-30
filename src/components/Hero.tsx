import React from 'react';
import { ArrowRight, Sparkles, Target, Award, Users, BookOpen, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
  onExploreCareers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onExploreCareers }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-cyan-50/40 via-white to-white">
      {/* Subtle ambient neon glow background accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-cyan-200/30 via-sky-200/20 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-800 bg-cyan-100/70 border border-cyan-200/80 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Saarthi AI Career Engine</span>
              <span className="text-cyan-400">·</span>
              <span className="text-cyan-700">Your Future, Your Path, Your Success</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
              Discover Your Career.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700">
                Build Your Future.
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              CareerNova is the next-generation AI career mentor built for ambitious students and developers. 
              Diagnose your skill gaps, follow personalized milestone roadmaps, sharpen your resume for ATS, 
              and master technical interviews with real-time feedback.
            </p>

            {/* CTA Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onStartJourney}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/15 hover:shadow-cyan-500/25 transition-all group"
              >
                <span>Start Your Career Journey</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCareers}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-cyan-700 bg-white hover:bg-cyan-50/50 border border-slate-200 hover:border-cyan-300 rounded-xl shadow-sm transition-all"
              >
                <span>Explore 5 In-Demand Roles</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Industry Grounded</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-cyan-600" />
                <span>Dynamic Skill Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-600" />
                <span>100% Free for Students</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dashboard Visual / Illustration Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-cyan-200/60 shadow-2xl shadow-cyan-500/10 bg-white">
              <div className="p-2 bg-slate-900/90 flex items-center justify-between text-white text-[11px] px-3 font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300">careernova.ai/dashboard</span>
                </div>
                <span className="text-cyan-400 text-[10px]">AI MODEL ACTIVE</span>
              </div>

              {/* Generated high-fidelity 3D career roadmap visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src="/src/assets/images/hero_career_dashboard_1793363435542.jpg"
                  alt="CareerNova AI Interactive Career Dashboard and Learning Milestones"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay floating badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">AI Readiness Index</div>
                      <div className="text-[11px] text-slate-500">Milestone Phase 2 in progress</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-cyan-600 tabular-nums">74%</span>
                    <span className="text-[10px] text-slate-400 block">Job Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI strip in full-width row below hero split */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="p-3 text-center sm:text-left border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              94.2<span className="text-cyan-600">%</span>
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Placement Success Rate</div>
          </div>

          <div className="p-3 text-center sm:text-left border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              5 <span className="text-cyan-600">Core</span>
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">High-Demand Tech Tracks</div>
          </div>

          <div className="p-3 text-center sm:text-left border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              100<span className="text-cyan-600">+</span>
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Interactive Milestones & Projects</div>
          </div>

          <div className="p-3 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              &lt; 2<span className="text-cyan-600">s</span>
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">Instant AI Resume & Skill Audit</div>
          </div>
        </div>

      </div>
    </section>
  );
};
