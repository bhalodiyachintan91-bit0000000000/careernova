import React, { useState } from 'react';
import { Compass, Github, Twitter, Linkedin, Mail, Shield, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; text: string } | null>(null);

  const openPrivacy = () => {
    setModalContent({
      title: 'Privacy Policy',
      text: 'CareerNova respects student data privacy. All uploaded resumes, skill gap diagnostics, and interview audio/text data are evaluated securely on our server using private API credentials. We do not sell or monetize candidate data. Resume text is processed in memory and never exposed publicly.',
    });
  };

  const openTerms = () => {
    setModalContent({
      title: 'Terms of Service',
      text: 'CareerNova is an educational career exploration and guidance platform built for university students, career transitioners, and early-career developers. Recommendations, ATS estimations, and interview feedbacks are advisory tools designed to accelerate skill development.',
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-tight">
                Career<span className="text-cyan-400">Nova</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              "Your Future, Your Path, Your Success."
              Empowering students with AI-grounded career roadmaps, skill diagnostics, ATS resume audits, and live mock interviews.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform Features</h4>
            <ul className="space-y-2">
              <li><a href="#careers" className="hover:text-cyan-400 transition-colors">Explore 5 Career Tracks</a></li>
              <li><a href="#skill-analyzer" className="hover:text-cyan-400 transition-colors">AI Skill Gap Diagnostic</a></li>
              <li><a href="#roadmap" className="hover:text-cyan-400 transition-colors">Interactive Milestone Roadmaps</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Curated Portfolio Capstones</a></li>
              <li><a href="#resume-analyzer" className="hover:text-cyan-400 transition-colors">ATS Resume Optimizer</a></li>
            </ul>
          </div>

          {/* Student Hub & Interview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Student Prep</h4>
            <ul className="space-y-2">
              <li><a href="#interview-prep" className="hover:text-cyan-400 transition-colors">Technical Mock Interview</a></li>
              <li><a href="#interview-prep" className="hover:text-cyan-400 transition-colors">HR & STAR Behavioral Coach</a></li>
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-colors">Career Readiness Meter</a></li>
              <li><a href="#resources" className="hover:text-cyan-400 transition-colors">Official Curricula & Docs</a></li>
              <li><a href="#jobs" className="hover:text-cyan-400 transition-colors">Entry-Level Job Board</a></li>
            </ul>
          </div>

          {/* University Project & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Academic Project & Support</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Designed as a modern capstone demonstration for student career success and academic readiness.
            </p>
            <div className="pt-1 space-y-1.5 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>support@careernova.edu</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Powered by Gemini 3.8 Flash & Saarthi AI
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with legal & copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} CareerNova (Saarthi AI). Built with React & Tailwind CSS.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={openPrivacy} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={openTerms} className="hover:text-slate-300 transition-colors">
              Terms of Use
            </button>
            <a href="#faqs" className="hover:text-slate-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>

      </div>

      {/* Legal Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 text-white max-w-md w-full rounded-2xl border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-cyan-400">{modalContent.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {modalContent.text}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
