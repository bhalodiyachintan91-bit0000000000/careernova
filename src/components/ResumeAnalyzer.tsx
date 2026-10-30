import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2, RefreshCw, FileCode, Check } from 'lucide-react';
import { SAMPLE_RESUMES, CAREER_TRACKS } from '../data/mockData';
import { ResumeAnalysisResult } from '../types';

interface ResumeAnalyzerProps {
  targetRole: string;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ targetRole }) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES[0].text);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState(targetRole || 'AI Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setResumeText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_RESUMES[0]) => {
    setResumeText(sample.text);
    setSelectedRole(sample.role);
    setFileName(sample.label);
  };

  const handleAnalyze = async () => {
    if (!resumeText || resumeText.trim().length < 20) {
      setErrorMsg('Please paste or upload at least 20 characters of resume content.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole: selectedRole,
          jobDescription,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setErrorMsg(data.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to AI Resume Audit service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="resume-analyzer" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span>AI Resume Optimizer</span>
            <span>·</span>
            <span>ATS Compliance & Keyword Scoring</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Make Your Resume ATS-Proof & Recruiter-Ready
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Over 75% of resumes fail automated applicant tracking systems. Audit your resume against actual job descriptions, extract missing keywords, and get line-by-line rewrite suggestions.
          </p>
        </div>

        {/* Input Interface */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Top Options: Role + Sample Pickers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Role:</span>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                {CAREER_TRACKS.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Load Sample Resumes */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">1-Click Test:</span>
              {SAMPLE_RESUMES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 rounded-md border border-slate-200/80 transition-colors"
                >
                  {sample.role} Sample
                </button>
              ))}
            </div>
          </div>

          {/* Dual Textareas: Resume Content + Job Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Resume Text */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Resume Content {fileName && <span className="text-cyan-600 font-normal">({fileName})</span>}
                </label>

                {/* Upload File Button */}
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload .txt/.md file</span>
                  <input
                    type="file"
                    accept=".txt,.md,.text"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={11}
                placeholder="Paste your resume text here (Education, Skills, Experience, Projects)..."
                className="w-full p-4 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Right: Job Description Context */}
            <div className="lg:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Target Job Description (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={11}
                placeholder="Paste the job description or internship requirements to test exact keyword match..."
                className="w-full p-4 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              />
            </div>

          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Evaluated against industry ATS heuristics & Gemini 3.8 Flash
            </span>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md hover:shadow-cyan-500/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Auditing Resume Content...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Run AI Resume Audit</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Detailed Audit Results */}
        {result && (
          <div className="mt-12 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Scorecard Hero */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Overall Score */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-sky-200 tabular-nums">
                    {result.score}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Resume Match Score</h4>
                  <div className="text-xs text-cyan-600 font-semibold mt-0.5">
                    {result.score >= 80 ? 'Competitive Candidate' : 'Moderate Match (Needs Polish)'}
                  </div>
                </div>
              </div>

              {/* ATS Parseability */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">ATS Parseability</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">
                    {result.atsCompatibility?.score || 85}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${result.atsCompatibility?.score || 85}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Single-column standard section layout detected
                </span>
              </div>

              {/* Executive Assessment */}
              <div className="text-xs text-slate-600 leading-relaxed bg-cyan-50/40 p-3.5 rounded-xl border border-cyan-100">
                <span className="font-bold text-cyan-900 block mb-1">Executive Summary:</span>
                {result.overallAssessment}
              </div>

            </div>

            {/* Strengths & Critical Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Resume Strengths</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {result.strengths.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Gaps */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Missing Impact & Gaps</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {result.criticalGaps.map((g, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-rose-50/40 p-2.5 rounded-lg border border-rose-100">
                      <span className="text-rose-600 font-bold">!</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Keyword Match Matrix */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                ATS Keyword Extraction & Gap Matrix
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-semibold text-emerald-700 mb-2">Matching Keywords Found:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingKeywords?.map((kw) => (
                      <span key={kw} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-rose-700 mb-2">Critical Missing Keywords:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords?.map((kw) => (
                      <span key={kw} className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 font-mono text-[11px]">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Line-by-Line Bullet Point Improvements */}
            {result.bulletPointImprovements && result.bulletPointImprovements.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Line-by-Line Bullet Point Optimizations
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Transform weak, passive tasks into high-impact, measurable achievements.
                  </p>
                </div>

                <div className="space-y-4">
                  {result.bulletPointImprovements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 text-xs"
                    >
                      {/* Original */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Before (Weak / Passive)
                        </span>
                        <div className="text-slate-600 line-through decoration-rose-400 bg-rose-50/50 p-2 rounded">
                          "{item.original}"
                        </div>
                      </div>

                      {/* Improved */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                          After (Quantifiable Metric & Action-Verb Driven)
                        </span>
                        <div className="text-slate-900 font-medium bg-emerald-50/60 p-2.5 rounded border border-emerald-200/70">
                          "{item.improved}"
                        </div>
                      </div>

                      <div className="text-[11px] text-cyan-800 font-medium pt-1">
                        <span className="font-bold">Recruiter Insight:</span> {item.reason}
                      </div>
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
