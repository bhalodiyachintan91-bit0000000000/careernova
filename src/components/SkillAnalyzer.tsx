import React, { useState } from 'react';
import { Sparkles, Plus, X, ArrowRight, AlertTriangle, CheckCircle, Clock, Award, Compass, Loader2 } from 'lucide-react';
import { CAREER_TRACKS } from '../data/mockData';
import { SkillGapResult, StudentProfile } from '../types';

interface SkillAnalyzerProps {
  user: StudentProfile;
  targetRole: string;
  onUpdateTargetRole: (role: string) => void;
  onUpdateUserSkills: (skills: string[]) => void;
  onJumpToRoadmap: () => void;
}

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'React', 'Node.js',
  'Docker', 'AWS', 'PyTorch', 'Data Structures', 'Linux', 'Pandas', 'Machine Learning', 'REST APIs'
];

export const SkillAnalyzer: React.FC<SkillAnalyzerProps> = ({
  user,
  targetRole,
  onUpdateTargetRole,
  onUpdateUserSkills,
  onJumpToRoadmap,
}) => {
  const [skills, setSkills] = useState<string[]>(user.currentSkills || ['Python', 'Git', 'Data Structures', 'SQL']);
  const [newSkill, setNewSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(user.experienceLevel || 'Student / Junior');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SkillGapResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      onUpdateUserSkills(updated);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    onUpdateUserSkills(updated);
  };

  const handleAnalyze = async () => {
    if (skills.length === 0) {
      setErrorMsg('Please add at least one current skill to analyze.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSkills: skills,
          targetRole,
          experienceLevel,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data);
      } else {
        setErrorMsg(data.error || 'Failed to complete analysis. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to AI Skill Gap service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="skill-analyzer" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>AI Skill Gap Analyzer</span>
            <span>·</span>
            <span>Saarthi AI Diagnostic Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Uncover What You Need to Land Your Dream Role
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Enter your current competencies and target role. Our AI model compares your profile against real job postings to spotlight missing tools, proficiency gaps, and actionable steps.
          </p>
        </div>

        {/* Diagnostic Input Card */}
        <div className="max-w-4xl mx-auto bg-slate-50/70 rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Career Path
              </label>
              <select
                value={targetRole}
                onChange={(e) => onUpdateTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              >
                {CAREER_TRACKS.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Background Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              >
                <option value="Student / Junior">University Student / Recent Graduate</option>
                <option value="Career Switcher">Self-Taught / Career Switcher</option>
                <option value="Associate (1-2 yrs)">Associate Engineer (1-2 Years Exp)</option>
              </select>
            </div>

          </div>

          {/* Current Skills Tags Management */}
          <div className="mt-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Current Technical Skills ({skills.length} added)
            </label>

            {/* Added Skills Chips */}
            <div className="flex flex-wrap gap-2 p-3 min-h-[52px] bg-white border border-slate-200 rounded-xl">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/60"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-cyan-600 hover:text-cyan-900 rounded-full hover:bg-cyan-200/50 p-0.5"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Input for typing new skill */}
              <div className="flex-1 min-w-[140px] flex items-center">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(newSkill);
                    }
                  }}
                  placeholder="Type skill & press Enter..."
                  className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none px-2 py-1"
                />
              </div>
            </div>

            {/* Quick Add Suggestions */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Quick Add:</span>
              {COMMON_SKILLS.filter(s => !skills.includes(s)).slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-cyan-100/70 text-slate-700 hover:text-cyan-800 border border-slate-200/80 transition-colors"
                >
                  <Plus className="w-3 h-3 text-cyan-600" />
                  <span>{skill}</span>
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Trigger Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md hover:shadow-cyan-500/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Analyzing with Gemini 3.8...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Run AI Skill Gap Analysis</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Results Display */}
        {analysisResult && (
          <div className="mt-12 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Overview Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-cyan-200/80 shadow-xl shadow-cyan-500/5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Score Gauge */}
              <div className="text-center md:text-left flex items-center justify-center md:justify-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white shadow-lg shadow-slate-900/15">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-sky-200 tabular-nums">
                    {analysisResult.matchPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-tight">Match</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{targetRole} Fit</h4>
                  <p className="text-xs text-slate-500">
                    {analysisResult.matchPercentage >= 70
                      ? 'Solid foundation. A few high-impact skills remain.'
                      : 'Promising start. Focus on core architectural tools.'}
                  </p>
                </div>
              </div>

              {/* Time to Job Ready */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Estimated Timeline</div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {analysisResult.timeToJobReady}
                  </div>
                </div>
              </div>

              {/* CTA to Roadmap */}
              <div className="flex justify-center md:justify-end">
                <button
                  onClick={onJumpToRoadmap}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  <span>View Step-by-Step Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Two Column Grid: Existing vs Missing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Existing Skills */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Your Verified Strengths</span>
                  </h4>
                  <span className="text-xs font-medium text-slate-500">
                    {analysisResult.existingSkills?.length || skills.length} detected
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {(analysisResult.existingSkills || skills.map(s => ({ name: s, category: 'Core', proficiency: 'Intermediate' as const }))).map((s, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="font-semibold text-slate-800">{s.name}</div>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {s.proficiency || 'Proficient'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills & Priority */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>High-Impact Skill Gaps</span>
                  </h4>
                  <span className="text-xs font-medium text-amber-600 font-semibold">Priority Focus</span>
                </div>

                <div className="space-y-3">
                  {analysisResult.missingSkills?.map((gap, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{gap.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            gap.priority === 'Critical'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        {gap.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Personalized Action Sprints */}
            {analysisResult.actionSteps && analysisResult.actionSteps.length > 0 && (
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-400" />
                    <span>Personalized 3-Phase Action Sprint</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Follow these targeted sprints to close your gaps and be candidate-ready.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysisResult.actionSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                        <span>Sprint 0{step.step || idx + 1}</span>
                        <span>{step.estimatedWeeks} Wks</span>
                      </div>
                      <div className="text-sm font-bold text-slate-100">{step.title}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
