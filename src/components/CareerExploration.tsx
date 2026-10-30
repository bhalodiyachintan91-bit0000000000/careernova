import React, { useState } from 'react';
import { Bot, Code2, LineChart, Shield, Cloud, ArrowRight, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { CAREER_TRACKS } from '../data/mockData';
import { CareerTrack } from '../types';

interface CareerExplorationProps {
  onSelectTrack: (track: CareerTrack) => void;
  selectedTrackTitle: string;
}

export const CareerExploration: React.FC<CareerExplorationProps> = ({
  onSelectTrack,
  selectedTrackTitle,
}) => {
  const [activeModalTrack, setActiveModalTrack] = useState<CareerTrack | null>(null);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'ai-engineer':
        return <Bot className="w-5 h-5 text-cyan-500" />;
      case 'software-developer':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'data-analyst':
        return <LineChart className="w-5 h-5 text-teal-500" />;
      case 'cybersecurity-analyst':
        return <Shield className="w-5 h-5 text-indigo-500" />;
      case 'cloud-engineer':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      default:
        return <Briefcase className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <section id="careers" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <span>Career Exploration</span>
            <span>·</span>
            <span>5 Core Tech Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Explore High-Growth Tech Careers
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Discover in-demand engineering and analyst disciplines. Examine compensation ranges, core skill requirements, and day-to-day responsibilities.
          </p>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_TRACKS.map((track) => {
            const isSelected = selectedTrackTitle.toLowerCase() === track.title.toLowerCase();

            return (
              <div
                key={track.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-white border transition-all duration-300 group hover:-translate-y-1 ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-200 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Compensation */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getTrackIcon(track.id)}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-emerald-600 tabular-nums">
                        {track.averageSalary}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{track.jobGrowth}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-slate-500 line-clamp-2">
                    {track.tagline}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-normal line-clamp-3">
                    {track.description}
                  </p>

                  {/* Required Skills unboxed metadata */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-700 mb-2">Core Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.coreSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {track.coreSkills.length > 4 && (
                        <span className="text-[11px] px-1.5 py-0.5 text-slate-400 font-medium">
                          +{track.coreSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTrack(track)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-cyan-600 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Analyze Skill Fit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveModalTrack(track)}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for In-Depth Career Breakdown */}
        {activeModalTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                    {getTrackIcon(activeModalTrack.id)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{activeModalTrack.title}</h3>
                    <p className="text-xs text-cyan-600 font-medium">{activeModalTrack.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalTrack(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Salary & Projections */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Average US Compensation</span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    {activeModalTrack.averageSalary}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Projected 5-Yr Growth</span>
                  <span className="text-base font-bold text-emerald-600 tabular-nums">
                    {activeModalTrack.jobGrowth}
                  </span>
                </div>
              </div>

              {/* Day in the Life */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Day in the Life</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-cyan-50/40 p-3.5 rounded-xl border border-cyan-100">
                  {activeModalTrack.dayInTheLife}
                </p>
              </div>

              {/* Core Skills Required */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Core Skills & Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalTrack.coreSkills.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Stack */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Modern Enterprise Tooling</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalTrack.recommendedTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-xs font-mono font-medium bg-slate-100 text-slate-800 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalTrack(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const track = activeModalTrack;
                    setActiveModalTrack(null);
                    onSelectTrack(track);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-cyan-600 rounded-lg shadow-sm"
                >
                  Set as Target & Analyze My Fit
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
