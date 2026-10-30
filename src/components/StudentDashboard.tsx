import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus, TrendingUp, Award, Calendar, Sparkles, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentDashboardProps {
  user: StudentProfile;
  targetRole: string;
  onToggleGoal: (goalId: string) => Promise<void>;
  onAddGoal: (text: string) => Promise<void>;
  onJumpToSection: (sectionId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  targetRole,
  onToggleGoal,
  onAddGoal,
  onJumpToSection,
}) => {
  const [newGoalText, setNewGoalText] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      setIsAddingGoal(true);
      try {
        await onAddGoal(newGoalText.trim());
        setNewGoalText('');
      } finally {
        setIsAddingGoal(false);
      }
    }
  };

  const completedGoalsCount = user.weeklyGoals.filter((g) => g.done).length;

  return (
    <section id="dashboard" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-cyan-500" />
            <span>Student Command Center</span>
            <span>·</span>
            <span>Live Progression & Goals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Student Dashboard Preview
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Monitor your career readiness score, track milestone achievements, execute weekly action goals, and view next recommended learning steps.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Top Row: Readiness Index Card & 3 Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Career Readiness Main Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-cyan-200/80 shadow-lg shadow-cyan-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Target Career: {user.targetRole || targetRole}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-bold">
                    ACTIVE SPRINT
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  {/* Circular-style Score Ring */}
                  <div className="relative w-24 h-24 rounded-full border-4 border-cyan-100 flex items-center justify-center bg-cyan-50/30">
                    <div className="text-center">
                      <span className="text-3xl font-black text-slate-900 tabular-nums">
                        {user.careerReadinessScore}%
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-tight">Ready</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">Career Readiness Score</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Based on verified milestone completions, skill gap analysis, and mock interview performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Candidate Threshold</span>
                  <span className="text-cyan-600 font-bold">85% = Interview Ready</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${user.careerReadinessScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: 3 Quick Metric Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tabular-nums">
                    {user.completedMilestones.length}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">Milestones Achieved</div>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">+2 this month</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tabular-nums">
                    {user.practiceHistory.length > 0 ? `${user.practiceHistory[0].score}/10` : '8.2/10'}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">Interview Average</div>
                  <span className="text-[10px] text-cyan-600 font-semibold block mt-1">Rubric evaluated</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tabular-nums">
                    38<span className="text-sm font-semibold text-slate-400">h</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">Study Hours Logged</div>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">On track</span>
                </div>
              </div>

            </div>

          </div>

          {/* Middle Row: Weekly Goals & Personalized Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Weekly Action Goals */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <h4 className="text-base font-bold text-slate-900">Weekly Learning Goals</h4>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {completedGoalsCount} of {user.weeklyGoals.length} done
                </span>
              </div>

              {/* Goal Items */}
              <div className="space-y-2">
                {user.weeklyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => onToggleGoal(goal.id)}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                      goal.done
                        ? 'bg-slate-50 border-slate-200/80 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-cyan-300 text-slate-800'
                    }`}
                  >
                    <button className="text-cyan-600 focus:outline-none">
                      {goal.done ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 fill-cyan-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-cyan-500" />
                      )}
                    </button>
                    <span className={`text-xs font-medium flex-1 ${goal.done ? 'line-through text-slate-400' : ''}`}>
                      {goal.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add Goal Input */}
              <form onSubmit={handleAddGoal} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  placeholder="Add a new weekly sprint goal..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
                <button
                  type="submit"
                  disabled={isAddingGoal || !newGoalText.trim()}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg disabled:opacity-50 flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Personalized AI Next Steps */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <h4 className="text-base font-bold text-slate-900">Personalized Next Steps</h4>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div
                    onClick={() => onJumpToSection('resume-analyzer')}
                    className="p-3 rounded-xl bg-cyan-50/50 hover:bg-cyan-50 border border-cyan-100 transition-colors cursor-pointer group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-cyan-700 flex items-center justify-between">
                      <span>Audit Resume Against Job Description</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Add 2 quantifiable bullet points to boost your ATS match score above 80%.
                    </p>
                  </div>

                  <div
                    onClick={() => onJumpToSection('interview-prep')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-colors cursor-pointer group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-cyan-700 flex items-center justify-between">
                      <span>Practice System Design Screening</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Practice explaining microservice trade-offs with real-time AI scoring.
                    </p>
                  </div>

                  <div
                    onClick={() => onJumpToSection('roadmap')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-colors cursor-pointer group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-cyan-700 flex items-center justify-between">
                      <span>Complete Phase 2 Capstone</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Ship the RAG Technical Knowledge Base to lock in your next milestone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student identity footer */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Profile: {user.name}</span>
                <span className="font-medium text-slate-500">{user.email}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
