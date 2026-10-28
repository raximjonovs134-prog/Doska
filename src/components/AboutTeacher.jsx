import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Lightbulb, 
  Trophy, 
  Atom, 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Award
} from 'lucide-react';

export default function AboutTeacher({ teacher }) {
  const [activeTab, setActiveTab] = useState('approach');

  const displayName = teacher.fullName || 
    `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || 
    "[O'qituvchi To'liq Ismi]";

  const approachIcons = {
    Atom: <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-neon-green" />,
    Brain: <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-neon-green" />,
    TrendingUp: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-neon-green" />,
    Clock: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-neon-green" />
  };

  const teachingApproach = teacher.teachingApproach || [];
  const educationList = teacher.education || [];
  const experienceList = teacher.experience || [];
  const achievementsList = teacher.achievements || [];

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden bg-slate-100/60 dark:bg-navy-950/70 border-t border-slate-200 dark:border-navy-850">
      <div className="absolute inset-0 math-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-navy-850 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs font-mono uppercase tracking-wider shadow-xs">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Ustoz Haqida Ma'lumot</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tajriba, Metodika va <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 dark:from-neon-green dark:to-emerald-400">
              Aniq Natijalarga Yo'naltirilgan Ta'lim
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed px-2">
            Murakkab formulalarni yodlatish emas, balki qonuniyatlarni his qilish va mustaqil tahlil qilish ko'nikmasini shakllantiramiz.
          </p>
        </div>

        {/* Biography Card */}
        <div className="mb-8 sm:mb-12 p-5 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-navy-900 dark:via-navy-850 dark:to-navy-900 border border-slate-200 dark:border-navy-750 shadow-md dark:shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/5 dark:bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-navy-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-600 dark:text-neon-green font-semibold">Mualliflik Falsafasi</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {displayName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{teacher.title}</p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800 border border-emerald-500/30 dark:border-neon-green/30 text-xs font-semibold text-emerald-700 dark:text-neon-green shrink-0">
              <Award className="w-3.5 h-3.5" />
              <span>Oliy Toifali Mutaxassis</span>
            </div>
          </div>

          <div className="mt-5 text-slate-700 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed italic bg-slate-50 dark:bg-navy-950/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-navy-800/80">
            "{teacher.bio}"
          </div>
        </div>

        {/* Section Navigation Tabs (Responsive scroll on mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-10 no-scrollbar">
          <button
            onClick={() => setActiveTab('approach')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'approach'
                ? 'bg-emerald-400 dark:bg-neon-green text-navy-950 shadow-sm dark:shadow-neon-sm font-bold'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white shadow-2xs'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>O'qitish Metodikasi</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-emerald-400 dark:bg-neon-green text-navy-950 shadow-sm dark:shadow-neon-sm font-bold'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white shadow-2xs'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Ta'lim va Malaka</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-emerald-400 dark:bg-neon-green text-navy-950 shadow-sm dark:shadow-neon-sm font-bold'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white shadow-2xs'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Ish Tajribasi</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-emerald-400 dark:bg-neon-green text-navy-950 shadow-sm dark:shadow-neon-sm font-bold'
                : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white shadow-2xs'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Yutuqlar & Natijalar</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="transition-all duration-300">
          
          {/* 1. Teaching Approach */}
          {activeTab === 'approach' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-300">
              {teachingApproach.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 glow-card flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-navy-850 border border-emerald-500/20 dark:border-neon-green/30 flex items-center justify-center mb-4 sm:mb-5 shadow-xs dark:shadow-neon-sm">
                      {approachIcons[item.icon] || <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-neon-green" />}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-neon-green font-mono">
                    <span>Bosqich 0{idx + 1}</span>
                    <span>✓ Tasdiqlangan</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Education */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in duration-300">
              {educationList.map((edu, idx) => (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 glow-card relative shadow-xs"
                >
                  <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 dark:bg-neon-green/10 text-emerald-700 dark:text-neon-green text-xs font-mono mb-3 sm:mb-4 border border-emerald-500/20 dark:border-neon-green/20">
                    {edu.period}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    {edu.degree}
                  </h4>
                  <div className="text-xs sm:text-sm text-emerald-600 dark:text-neon-green font-medium mb-1">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {edu.faculty}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 3. Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {experienceList.map((exp, idx) => (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 glow-card flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-600 dark:text-neon-green uppercase tracking-wider">{exp.period}</span>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{exp.place}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">{exp.details}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-850 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-neon-green shrink-0" />
                      <span>Pedagogik staj</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Achievements */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in duration-300">
              {achievementsList.map((ach, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 flex items-start gap-3 sm:gap-4 glow-card shadow-xs"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 dark:bg-neon-green/10 border border-emerald-500/20 dark:border-neon-green/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-neon-green" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-emerald-600 dark:text-neon-green uppercase tracking-wider">Yutuq</span>
                    <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium mt-0.5 leading-relaxed">
                      {ach}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
