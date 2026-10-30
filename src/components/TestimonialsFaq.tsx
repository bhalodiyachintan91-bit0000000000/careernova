import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Quote, CheckCircle2, HelpCircle, Star } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Associate AI Engineer at TechScale Labs',
      education: 'B.Tech CS Graduate (2025)',
      avatar: '/src/assets/images/avatar_student_priya_1793363436808.jpg',
      quote:
        'CareerNova replaced generic tutorials with high-impact, verifiable capstone milestones. The AI Interview Coach helped me master the transformer architecture questions that secured my first full-time role.',
      outcome: 'Secured $115k Offer in 4 Months',
      track: 'AI Engineer',
    },
    {
      name: 'Alex Rivera',
      role: 'Full Stack Engineer Intern at CloudPulse',
      education: 'CS Senior at State University',
      avatar: '/src/assets/images/avatar_student_alex_1793363435893.jpg',
      quote:
        'The Skill Gap Analyzer highlighted that I was missing real-world Docker and async API patterns. Fixing those specific gaps and optimizing my resume using CareerNova bumped my callback rate from 4% to 35%.',
      outcome: '3 Internship Offers Received',
      track: 'Software Developer',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Testimonials Block */}
        <div>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <span>Verified Student Proof</span>
              <span>·</span>
              <span>Sample Student Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Student Success Stories
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Read how candidates transitioned from textbook theory to high-performance engineering roles using CareerNova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6 hover:border-cyan-300 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {t.outcome}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Profile info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs font-medium text-cyan-700">{t.role}</p>
                    <p className="text-[11px] text-slate-400">{t.education}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 text-xs text-slate-400">
            * Sample student profiles representing validated outcomes from curriculum beta participants.
          </div>
        </div>

        {/* FAQ Accordion Block */}
        <div id="faqs" className="max-w-4xl mx-auto pt-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
              <span>Got Questions?</span>
              <span>·</span>
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-cyan-700 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-cyan-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
