import React from 'react';
import { Bell, Calendar, Sparkles, AlertCircle, ArrowRight, Flame } from 'lucide-react';

export default function Announcements({ announcements, onEnrollClick }) {
  const safeAnnouncements = announcements || [];

  return (
    <section id="announcements" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-navy-850 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs font-mono uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Yangiliklar va E'lonlar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Muhim Yangiliklar va <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-neon-green dark:to-emerald-400">
              Guruhlarga Qabul E'lonlari
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Yangi guruhlar ochilishi, ochiq master-klasslar va diagnostik imtihon sanalaridan xabardor bo'ling.
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                ann.isImportant
                  ? 'bg-gradient-to-b from-emerald-50 to-white dark:from-navy-850 dark:to-navy-900 border-2 border-emerald-500/60 dark:border-neon-green/60 shadow-md dark:shadow-neon-sm'
                  : 'bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 hover:border-slate-400 dark:hover:border-slate-600 shadow-sm hover:shadow-lg'
              }`}
            >
              {ann.isImportant && (
                <div className="absolute top-0 right-0 bg-neon-green text-navy-950 text-[10px] font-mono font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Flame className="w-3 h-3" />
                  <span>Dolzarb</span>
                </div>
              )}

              <div>
                {/* Meta info */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-emerald-700 dark:text-neon-green text-xs font-mono border border-slate-200 dark:border-navy-700">
                    {ann.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ann.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                  {ann.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-6">
                  {ann.text}
                </p>
              </div>

              {/* Spots Left / Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 dark:text-neon-green flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-neon-green animate-ping" />
                  {ann.spotsLeft}
                </span>

                <button
                  onClick={onEnrollClick}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-neon-green transition-colors cursor-pointer"
                >
                  <span>Ariza topshirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
