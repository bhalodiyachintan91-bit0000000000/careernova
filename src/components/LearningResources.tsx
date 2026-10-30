import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Filter, Award, Bookmark } from 'lucide-react';
import { LEARNING_RESOURCES } from '../data/mockData';

export const LearningResources: React.FC = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'Course', 'Certification', 'Documentation', 'Tutorial'];

  const filtered = LEARNING_RESOURCES.filter((res) => {
    if (selectedType !== 'All' && res.type !== selectedType) return false;
    if (
      searchQuery &&
      !res.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !res.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !res.provider.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <section id="resources" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
              <span>Verified Curricula</span>
              <span>·</span>
              <span>Official University & Enterprise Sources</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recommended Learning Resources
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Curated official documentation, industry-standard certifications, and university courses. No low-quality affiliate noise.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, or roles..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 shadow-sm"
            />
          </div>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedType === type
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
                    {item.type}
                  </span>
                  <span className="text-slate-400 font-medium">{item.duration}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-slate-500 mt-1 mb-3">
                  {item.provider} · <span className="text-slate-400">{item.role}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600">
                  {item.cost}
                </span>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700"
                >
                  <span>Access Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
