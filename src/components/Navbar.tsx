import React, { useState } from 'react';
import { Compass, User, Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  user: StudentProfile;
  onOpenAuth: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Explore Careers', href: '#careers' },
    { name: 'Skill Analyzer', href: '#skill-analyzer' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume AI', href: '#resume-analyzer' },
    { name: 'Interview Prep', href: '#interview-prep' },
    { name: 'Jobs', href: '#jobs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Wordmark Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-slate-900 tracking-tight text-xl leading-none">
                Career<span className="text-cyan-600">Nova</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                by Saarthi AI
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-Line Text Links) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-600 ${
                    isActive ? 'text-cyan-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Profile */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-cyan-300 bg-slate-50/70 hover:bg-cyan-50/50 transition-all text-xs font-medium text-slate-700"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Readiness:</span>
              <span className="font-semibold text-cyan-700 tabular-nums">{user.careerReadinessScore}%</span>
            </a>

            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5 text-cyan-300" />
              <span>{user.name ? user.name.split(' ')[0] : 'Sign In'}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Readiness: <span className="font-semibold text-cyan-600">{user.careerReadinessScore}%</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Student Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
