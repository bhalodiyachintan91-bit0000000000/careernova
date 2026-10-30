import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Send, Sparkles, Clock, CheckCircle2, AlertCircle, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { CAREER_TRACKS } from '../data/mockData';
import { InterviewQuestion, InterviewEvaluation } from '../types';

interface InterviewPracticeProps {
  targetRole: string;
  onAnswerEvaluated: (score: number) => void;
}

export const InterviewPractice: React.FC<InterviewPracticeProps> = ({ targetRole, onAnswerEvaluated }) => {
  const [role, setRole] = useState(targetRole || 'AI Engineer');
  const [questionType, setQuestionType] = useState<'technical' | 'behavioral' | 'mixed'>('technical');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Questions
  const loadQuestions = async () => {
    setLoadingQuestions(true);
    setEvaluation(null);
    setUserAnswer('');
    setShowHint(false);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, questionType, difficulty: 'Medium' }),
      });
      const data = await res.json();
      if (data.success && data.questions?.length > 0) {
        setQuestions(data.questions);
        setCurrentIdx(0);
      }
    } catch (err) {
      setErrorMsg('Failed to load interview questions.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [role, questionType]);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimerActive(true);
    } else {
      setIsRecording(false);
      setTimerActive(false);
    }
  };

  const currentQ = questions[currentIdx];

  const handleEvaluateAnswer = async () => {
    if (!userAnswer || userAnswer.trim().length < 10) {
      setErrorMsg('Please articulate an answer of at least 10 characters.');
      return;
    }

    setEvaluating(true);
    setErrorMsg('');
    setTimerActive(false);

    try {
      const res = await fetch('/api/ai/interview-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          question: currentQ.question,
          userAnswer,
          questionType,
        }),
      });

      const data = await res.json();
      if (data.success && data.evaluation) {
        setEvaluation(data.evaluation);
        onAnswerEvaluated(data.evaluation.score);
      } else {
        setErrorMsg(data.error || 'Evaluation failed.');
      }
    } catch (err) {
      setErrorMsg('Error evaluating response.');
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
      setShowHint(false);
      setTimerSeconds(0);
      setTimerActive(false);
      setIsRecording(false);
    } else {
      loadQuestions();
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="interview-prep" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
            <span>AI Technical & HR Interview Coach</span>
            <span>·</span>
            <span>Instant Feedback & Grading</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Practice Real Interview Scenarios with AI
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Rehearse system design, coding fundamentals, and behavioral questions. Receive immediate rubric-based scoring, strong points, missed concepts, and model answers.
          </p>
        </div>

        {/* Practice Studio Console */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Studio Top Control Strip */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            
            {/* Role & Question Type Controls */}
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Role</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-xs font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  {CAREER_TRACKS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-6 w-px bg-slate-200" />

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mode</span>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value as any)}
                  className="text-xs font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="technical">Technical Screening</option>
                  <option value="behavioral">HR & Behavioral (STAR)</option>
                  <option value="mixed">System Design & Problem Solving</option>
                </select>
              </div>
            </div>

            {/* Timer & Question Counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-700 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>

              {questions.length > 0 && (
                <span className="text-xs font-medium text-slate-500">
                  Question <span className="font-bold text-slate-900">{currentIdx + 1}</span> of {questions.length}
                </span>
              )}
            </div>

          </div>

          {/* Active Question Display */}
          <div className="p-6 sm:p-8 bg-white space-y-6">
            
            {loadingQuestions ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
                <span className="text-xs font-medium text-slate-500">
                  Generating tailored {questionType} questions...
                </span>
              </div>
            ) : currentQ ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100 uppercase tracking-wider">
                      {currentQ.category || 'Interview Challenge'}
                    </span>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-xs text-slate-500 hover:text-cyan-600 flex items-center gap-1 font-medium"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Hide Hint' : 'Show Approach Hint'}</span>
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    "{currentQ.question}"
                  </h3>

                  {showHint && currentQ.hints && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in">
                      <span className="font-bold">Interviewer Tip:</span> {currentQ.hints.join(' ')}
                    </div>
                  )}
                </div>

                {/* Answer Input Box */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        if (!timerActive && e.target.value.length > 0) {
                          setTimerActive(true);
                        }
                      }}
                      rows={6}
                      placeholder="Type or voice-record your structured response. For technical questions, explain your reasoning and edge-cases. For behavioral, follow STAR (Situation, Task, Action, Result)..."
                      className="w-full p-4 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
                    />

                    {/* Microphone simulation toggle button */}
                    <button
                      onClick={toggleRecording}
                      className={`absolute right-3 bottom-4 p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        isRecording
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                      title={isRecording ? 'Stop Recording' : 'Voice Dictate'}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-cyan-600" />}
                      <span className="hidden sm:inline">{isRecording ? 'Recording...' : 'Dictate'}</span>
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-rose-600 font-medium">{errorMsg}</div>
                  )}

                  {/* Submit / Evaluate Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-slate-400">
                      {userAnswer.length} characters
                    </div>

                    <button
                      onClick={handleEvaluateAnswer}
                      disabled={evaluating || userAnswer.trim().length < 10}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {evaluating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                          <span>Evaluating with AI...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Submit for Instant AI Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : null}

          </div>

          {/* AI Feedback Panel */}
          {evaluation && (
            <div className="p-6 sm:p-8 bg-slate-900 text-white border-t border-slate-800 space-y-6 animate-in slide-in-from-bottom-2">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-cyan-400 tabular-nums">
                      {evaluation.score}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">/ 10</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{evaluation.rating}</div>
                    <div className="text-xs text-slate-400">Interviewer Rubric Score</div>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors self-start sm:self-auto"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Overall Feedback */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {evaluation.feedback}
              </div>

              {/* Strong Points & Missed Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>What You Did Well</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {evaluation.strongPoints?.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Key Concepts to Include</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {evaluation.missedPoints?.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Best Answer */}
              {evaluation.sampleBestAnswer && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-2">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Principal Engineer Model Response</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {evaluation.sampleBestAnswer}
                  </p>
                </div>
              )}

              {/* Follow-up question */}
              {evaluation.followUpQuestion && (
                <div className="text-xs text-slate-400 pt-1">
                  <span className="font-bold text-slate-300">Potential Interviewer Follow-up: </span>
                  "{evaluation.followUpQuestion}"
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
