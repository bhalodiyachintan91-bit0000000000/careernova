import React, { useState } from 'react';
import { FolderGit2, ArrowRight, Layers, Clock, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { PROJECT_RECOMMENDATIONS } from '../data/mockData';
import { ProjectRecommendation } from '../types';

interface ProjectRecommendationsProps {
  targetRole: string;
}

export const ProjectRecommendations: React.FC<ProjectRecommendationsProps> = ({ targetRole }) => {
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation | null>(null);

  const filteredProjects = PROJECT_RECOMMENDATIONS.filter((proj) => {
    if (levelFilter !== 'All' && proj.level !== levelFilter) return false;
    return true;
  });

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-500" />
              <span>Portfolio Engineering</span>
              <span>·</span>
              <span>Production Capstones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Portfolio Projects
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Recruiters evaluate working code, not certificates. Choose from beginner to advanced real-world projects designed to showcase real engineering ownership.
            </p>
          </div>

          {/* Interactive Level Segmented Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start md:self-auto border border-slate-200/80">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  levelFilter === lvl
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all group"
            >
              <div>
                {/* Level & Role Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${getLevelBadgeClass(
                      project.level
                    )}`}
                  >
                    {project.level}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{project.duration}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs text-cyan-600 font-medium mt-0.5 mb-2.5">
                  Track: {project.role}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Architecture highlight */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1 mb-4">
                  <div className="font-semibold text-slate-900 text-[11px] flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-cyan-600" />
                    <span>Architecture Pattern</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                    {project.architectureSummary}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* View guide button */}
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-cyan-50 hover:text-cyan-800 border border-slate-200 rounded-lg transition-colors"
                >
                  <span>Build Specification Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Guide Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider mb-2 inline-block ${getLevelBadgeClass(
                      selectedProject.level
                    )}`}
                  >
                    {selectedProject.level} Project
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Estimated Time: {selectedProject.duration} · Target Track: {selectedProject.role}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Scope & Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architecture Blueprint */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>Architecture & Data Flow Blueprint</span>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedProject.architectureSummary}
                </p>
              </div>

              {/* Portfolio Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Key Deliverables for GitHub / Resume
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recommended Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-mono font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ready to add to your weekly goals?
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
