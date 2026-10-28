import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, Check, ArrowRight, Sparkles, Filter, Layers, CheckCircle2 } from 'lucide-react';

export default function Courses({ courses, onSelectCourse }) {
  const [selectedFilter, setSelectedFilter] = useState('Hammasi');

  const filteredCourses = (courses || []).filter(course => {
    if (selectedFilter === 'Hammasi') return true;
    return course.subject.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-850 transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-neon-green/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-navy-850 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs font-mono uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>O'quv Dasturlari</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Matematika va Fizika <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-neon-green dark:to-[#63FFC4]">
                Professional Kurslari
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Har bir kurs nazariya, formulalar isboti va yuzlab namunaviy test masalalari tahlilini o'z ichiga oladi.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-200/90 dark:bg-navy-900 p-1.5 rounded-2xl border border-slate-300 dark:border-navy-800 shrink-0">
            {['Hammasi', 'Matematika', 'Fizika'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-neon-green text-navy-950 font-bold shadow-neon-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-3xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 hover:border-emerald-500/50 dark:hover:border-neon-green/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-card-glow relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/40 via-neon-green to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header row: Subject, Badge & Price */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-navy-800 text-emerald-700 dark:text-neon-green border border-slate-200 dark:border-navy-700">
                      {course.subject}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-neon-green/10 text-emerald-700 dark:text-neon-green border border-emerald-200 dark:border-neon-green/20">
                      {course.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-navy-950 px-2.5 py-1 rounded-md border border-slate-200 dark:border-navy-800">
                    {course.price}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-neon-green transition-colors mb-3">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light">
                  {course.description}
                </p>

                {/* Specs: Duration, Format, Level */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-4 border-y border-slate-200 dark:border-navy-800/80 mb-6 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Davomiyligi</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Format</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{course.format}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-mono">Daraja</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{course.level}</span>
                  </div>
                </div>

                {/* Topics Covered */}
                <div className="space-y-2 mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Dastur Mundarijasi:
                  </span>
                  {(course.topics || []).map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-neon-green shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-navy-800/80 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Boshlang'ich sinov darsi bepul
                </div>
                <button
                  onClick={() => onSelectCourse(course.title)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon-sm hover:shadow-neon transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Kursga yozilish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
