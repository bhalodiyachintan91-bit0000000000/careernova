import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Bookmark, BookmarkCheck, ArrowRight, Search, Check, Send } from 'lucide-react';
import { JobPosting, StudentProfile } from '../types';

interface JobBoardProps {
  user: StudentProfile;
  targetRole: string;
}

export const JobBoard: React.FC<JobBoardProps> = ({ user, targetRole }) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>(user.savedJobIds || []);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [search, setSearch] = useState('');
  const [appliedJobTitle, setAppliedJobTitle] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) setJobs(data.jobs);
      })
      .catch(() => {});
  }, []);

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    if (selectedType !== 'All' && job.type !== selectedType) return false;
    if (selectedExperience !== 'All' && !job.experience.toLowerCase().includes(selectedExperience.toLowerCase())) {
      return false;
    }
    if (
      search &&
      !job.title.toLowerCase().includes(search.toLowerCase()) &&
      !job.company.toLowerCase().includes(search.toLowerCase()) &&
      !job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <section id="jobs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
              <span>Verified Openings</span>
              <span>·</span>
              <span>Internships & Entry-Level Positions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Early-Career Job Board
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Curated technical internships and associate developer listings that value demonstrated projects and hands-on competence over 5+ years of artificial requirements.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by skill (e.g. Python, React)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {['All', 'Internship', 'Full-time'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  selectedType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {['All', 'Entry-Level', 'Junior'].map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExperience(exp)}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  selectedExperience === exp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isSaved = savedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded">
                      {job.company}
                    </span>
                    <span className="text-cyan-700 bg-cyan-50 font-semibold px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{job.posted}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-emerald-600">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{job.stipend}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal max-w-2xl pt-1">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                  <button
                    onClick={() => toggleSave(job.id)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-cyan-600 transition-colors"
                    title={isSaved ? 'Remove Bookmark' : 'Save Job'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-cyan-600 fill-cyan-100" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setAppliedJobTitle(job.title)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all whitespace-nowrap"
                  >
                    1-Click Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Confirmation Modal */}
        {appliedJobTitle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your CareerNova student profile and verified portfolio milestones have been dispatched for{' '}
                <span className="font-semibold text-slate-900">"{appliedJobTitle}"</span>.
              </p>
              <button
                onClick={() => setAppliedJobTitle(null)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Back to Opportunities
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
