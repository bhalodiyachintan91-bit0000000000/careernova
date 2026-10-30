import React, { useState } from 'react';
import { Map, CheckCircle2, Circle, ExternalLink, Code, BookOpen, Sparkles, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoadmapPhase, StudentProfile } from '../types';

interface CareerRoadmapProps {
  user: StudentProfile;
  targetRole: string;
  phases: RoadmapPhase[];
  onToggleMilestone: (milestoneId: string) => Promise<void>;
  onRefreshRoadmap: (pace: string, focus: string) => Promise<void>;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  user,
  targetRole,
  phases,
  onToggleMilestone,
  onRefreshRoadmap,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customPace, setCustomPace] = useState('Standard (10 hrs/week)');
  const [customFocus, setCustomFocus] = useState('All-round');

  const handleMilestoneClick = async (milestoneId: string) => {
    const isAlreadyCompleted = user.completedMilestones.includes(milestoneId);
    await onToggleMilestone(milestoneId);

    if (!isAlreadyCompleted) {
      // Fire subtle celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#0ea5e9', '#3b82f6'],
      });
    }
  };

  const handleGenerateCustom = async () => {
    setIsGenerating(true);
    try {
      await onRefreshRoadmap(customPace, customFocus);
      setShowConfigModal(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate completion percentage
  const allMilestones = phases.flatMap(p => p.milestones);
  const completedCount = allMilestones.filter(m => user.completedMilestones.includes(m.id)).length;
  const progressPercent = allMilestones.length > 0 ? Math.round((completedCount / allMilestones.length) * 100) : 0;

  return (
    <section id="roadmap" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <Map className="w-3.5 h-3.5 text-cyan-500" />
              <span>Step-by-Step Learning Journey</span>
              <span>·</span>
              <span>{targetRole} Track</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Career Roadmap
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Structured from fundamentals to production MLOps and capstone deployment. 
              Click milestone checkboxes to mark progress and boost your live Career Readiness Score.
            </p>
          </div>

          {/* Action & Progress pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-sm tabular-nums">
                {progressPercent}%
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {completedCount} of {allMilestones.length} Completed
                </div>
                <div className="w-28 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-cyan-700 bg-white hover:bg-cyan-50/50 border border-slate-200 hover:border-cyan-300 rounded-xl shadow-sm transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Customize Roadmap with AI</span>
            </button>
          </div>
        </div>

        {/* Roadmap Phases Timeline */}
        <div className="space-y-12">
          {phases.map((phaseGroup, phaseIdx) => (
            <div
              key={phaseIdx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
            >
              {/* Phase Header Strip */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs font-bold">
                    0{phaseIdx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{phaseGroup.phase}</h3>
                </div>
                <span className="text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60 self-start sm:self-auto">
                  {phaseGroup.duration}
                </span>
              </div>

              {/* Milestones in this phase */}
              <div className="divide-y divide-slate-100">
                {phaseGroup.milestones.map((milestone) => {
                  const isDone = user.completedMilestones.includes(milestone.id);
                  const isExpanded = selectedMilestoneId === milestone.id;

                  return (
                    <div
                      key={milestone.id}
                      className={`p-5 sm:p-6 transition-colors ${
                        isDone ? 'bg-cyan-50/20' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox button */}
                        <button
                          onClick={() => handleMilestoneClick(milestone.id)}
                          className="mt-0.5 text-slate-400 hover:text-cyan-600 transition-colors focus:outline-none"
                          aria-label={`Toggle ${milestone.title}`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-6 h-6 text-cyan-600 fill-cyan-50" />
                          ) : (
                            <Circle className="w-6 h-6 hover:text-cyan-500" />
                          )}
                        </button>

                        {/* Title and details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4
                              className={`text-base font-bold transition-colors ${
                                isDone ? 'text-slate-800 line-through decoration-cyan-500' : 'text-slate-900'
                              }`}
                            >
                              {milestone.title}
                            </h4>

                            <button
                              onClick={() => setSelectedMilestoneId(isExpanded ? null : milestone.id)}
                              className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 self-start sm:self-auto"
                            >
                              {isExpanded ? 'Hide Details' : 'View Project & Resources'}
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {milestone.description}
                          </p>

                          {/* Skills Acquired Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] font-semibold text-slate-400 mr-1">Skills:</span>
                            {milestone.skillsAcquired.map((skill) => (
                              <span
                                key={skill}
                                className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Expanded Project & Resources Drawer */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                              
                              {/* Hands-on Project */}
                              {milestone.project && (
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                                    <Code className="w-4 h-4 text-cyan-600" />
                                    <span>Hands-On Portfolio Project: {milestone.project.title}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-normal">
                                    {milestone.project.summary}
                                  </p>
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {milestone.project.techStack.map((tech) => (
                                      <span
                                        key={tech}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Recommended Resources */}
                              {milestone.resources && milestone.resources.length > 0 && (
                                <div>
                                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                                    <span>Verified Learning Sources</span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {milestone.resources.map((res, rIdx) => (
                                      <a
                                        key={rIdx}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30 transition-colors group"
                                      >
                                        <div className="truncate mr-2">
                                          <div className="font-semibold text-slate-800 group-hover:text-cyan-700 truncate">
                                            {res.name}
                                          </div>
                                          <span className="text-[10px] text-slate-400">{res.type}</span>
                                        </div>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* AI Customization Modal */}
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Customize Roadmap with AI</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Generate a tailored roadmap based on your weekly study hours and focus.
                  </p>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Weekly Commitment
                  </label>
                  <select
                    value={customPace}
                    onChange={(e) => setCustomPace(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="Casual (5 hrs/week)">Casual (5 hrs/week)</option>
                    <option value="Standard (10 hrs/week)">Standard (10 hrs/week)</option>
                    <option value="Intensive Bootcamp (20+ hrs/week)">Intensive Bootcamp (20+ hrs/week)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Learning Focus
                  </label>
                  <select
                    value={customFocus}
                    onChange={(e) => setCustomFocus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="All-round">Balanced (Theory + Hands-on Coding)</option>
                    <option value="Portfolio & Project Heavy">Portfolio & Project Heavy</option>
                    <option value="Algorithmic & Technical Screening">Algorithmic & Technical Screening</option>
                    <option value="Production Cloud & MLOps">Production Cloud & MLOps</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateCustom}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>Generating with Gemini 3.8...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Generate Tailored Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
