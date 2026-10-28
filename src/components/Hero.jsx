import React from 'react';
import { ArrowRight, Sparkles, Send, Award, Users, GraduationCap, CheckCircle2, UserCheck, BookOpen, Sigma } from 'lucide-react';
import { getSocialConfig } from '../utils/social';

export default function Hero({ teacher, onEnrollClick }) {
  const telegramConfig = getSocialConfig('telegram', teacher);

  // Compute displayed teacher name
  const displayName = teacher.fullName || 
    `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || 
    "[O'qituvchi To'liq Ismi]";

  const headline = teacher.heroTitle || "Aniq Fanlarni Mantiqiy & Chuqur O'rganing";
  const subheadline = teacher.heroSubtitle || teacher.subtitle || "Olimpiadalar, Milliy Sertifikat (A+) va OTM kirish imtihonlariga professional tayyorgarlik. Murakkab teoremalar va fizik qonunlarni oson, tushunarli uslubda o'rgatamiz.";

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 math-grid opacity-60 pointer-events-none" />
      
      {/* Neon Gradient Orbs (safely constrained) */}
      <div className="absolute top-1/4 -left-32 sm:-left-40 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 dark:bg-neon-green/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 -right-32 sm:-right-40 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />

      {/* Floating Math & Physics Formulas in Background (desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none select-none font-mono text-xs text-slate-500 dark:text-slate-700/60 font-semibold">
        <div className="absolute top-36 left-16 animate-float bg-white/70 dark:bg-navy-900/40 px-3 py-1 rounded-lg border border-slate-200 dark:border-navy-800 shadow-xs" style={{ animationDelay: '0s' }}>
          ∮ B · dl = μ₀ I
        </div>
        <div className="absolute top-64 right-24 animate-float bg-white/70 dark:bg-navy-900/40 px-3 py-1 rounded-lg border border-slate-200 dark:border-navy-800 shadow-xs" style={{ animationDelay: '1.5s' }}>
          lim (x→0) [sin(x) / x] = 1
        </div>
        <div className="absolute bottom-32 left-32 animate-float bg-white/70 dark:bg-navy-900/40 px-3 py-1 rounded-lg border border-slate-200 dark:border-navy-800 shadow-xs" style={{ animationDelay: '3s' }}>
          E = mc²  |  Δx · Δp ≥ ℏ / 2
        </div>
        <div className="absolute bottom-48 right-1/3 animate-float bg-white/70 dark:bg-navy-900/40 px-3 py-1 rounded-lg border border-slate-200 dark:border-navy-800 shadow-xs" style={{ animationDelay: '2s' }}>
          ∫ e^(-x²) dx = √π
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Teacher Introduction & Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-navy-850/90 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs sm:text-sm font-medium shadow-xs dark:shadow-neon-sm backdrop-blur-md max-w-full truncate">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-neon-green shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="truncate">Matematika & Fizika Bo'yicha Oliy Toifali Repetitor</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] sm:leading-[1.12] break-words">
                {headline.includes("Mantiqiy & Chuqur") ? (
                  <>
                    Aniq Fanlarni <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 dark:from-neon-green dark:via-[#57FFBE] dark:to-white">
                      Mantiqiy & Chuqur
                    </span> <br />
                    O'rganing
                  </>
                ) : (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 dark:from-neon-green dark:via-white dark:to-slate-200">
                    {headline}
                  </span>
                )}
              </h1>

              <div className="pt-1 sm:pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-navy-800/80 border border-slate-200 dark:border-dashed dark:border-neon-green/40 text-slate-800 dark:text-slate-200 shadow-xs max-w-full">
                  <span className="text-xs uppercase tracking-wider text-emerald-600 dark:text-neon-green font-mono font-semibold shrink-0">Ustoz:</span>
                  <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-wide truncate">
                    {displayName}
                  </span>
                </div>
              </div>
            </div>

            {/* Subheadline / Intro text */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {subheadline}
            </p>

            {/* Teacher Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-neon-green shrink-0" />
                <span>Milliy Sertifikat A & A+</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-neon-green shrink-0" />
                <span>DTM 100% natija</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-neon-green shrink-0" />
                <span>Mualliflik metodikasi</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4">
              <button
                onClick={onEnrollClick}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-navy-950 bg-emerald-400 dark:bg-neon-green hover:bg-emerald-300 dark:hover:bg-[#20FFA8] shadow-md dark:shadow-neon hover:shadow-lg dark:hover:shadow-neon-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Kursga Yozilish (Bepul Sinov Darsi)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {telegramConfig.isValid && (
                <a
                  href={telegramConfig.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-sm text-slate-800 dark:text-white bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-300 dark:border-navy-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4 text-emerald-600 dark:text-neon-green transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>Telegram orqali yozish</span>
                </a>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-navy-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-left">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-neon-green mb-1">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{teacher.experienceYears || "[10+ yil]"}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Pedagogik tajriba</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-neon-green mb-1">
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{teacher.studentsCount || "[1,500+]"}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Bitiruvchilar</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-neon-green mb-1">
                  <Award className="w-4 h-4 shrink-0" />
                  <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{teacher.admissionRate || "[98%]"}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">OTMga qabul</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-neon-green mb-1">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">{teacher.certificatesCount || "[120+]"}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Sertifikat egalari</div>
              </div>
            </div>

          </div>

          {/* Right Column: Teacher Photo Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              
              {/* Outer Decorative Glowing Rings */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 dark:from-neon-green dark:via-blue-500 dark:to-emerald-400 rounded-3xl blur-xl opacity-25 animate-pulse-slow" />
              
              {/* Card Container */}
              <div className="relative rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-750 p-4 sm:p-5 shadow-xl dark:shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Floating Badge on Card */}
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/95 dark:bg-navy-950/85 border border-slate-200 dark:border-neon-green/40 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-emerald-700 dark:text-neon-green shadow-xs">
                  <Sigma className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Matematika & Fizika</span>
                </div>

                {/* Photo Frame */}
                <div className="relative aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-navy-850 dark:via-navy-800 dark:to-navy-950 border-2 border-dashed border-slate-300 dark:border-navy-650 flex flex-col items-center justify-center text-center p-4 sm:p-6 group overflow-hidden">
                  
                  {teacher.avatarUrl ? (
                    <img 
                      src={teacher.avatarUrl} 
                      alt={displayName} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <div className="relative mb-4 sm:mb-5">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white dark:bg-navy-900 border border-emerald-500/30 dark:border-neon-green/30 flex items-center justify-center shadow-sm dark:shadow-neon-sm">
                          <UserCheck className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 dark:text-neon-green/70" />
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-400 dark:bg-neon-green text-navy-950 flex items-center justify-center font-bold text-xs shadow-md">
                          Math
                        </div>
                      </div>

                      <div className="space-y-1 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-emerald-500/10 dark:bg-neon-green/10 text-emerald-700 dark:text-neon-green border border-emerald-500/20 dark:border-neon-green/20">
                          Ustoz fotosurati
                        </span>
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base md:text-lg truncate">
                          {displayName}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {teacher.title}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-500/50 dark:border-neon-green/50" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-500/50 dark:border-neon-green/50" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-500/50 dark:border-neon-green/50" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-500/50 dark:border-neon-green/50" />
                </div>

                {/* Card Lower Bar */}
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800">
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono">Yo'nalish</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Aniq Fanlar</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800">
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono">Dars Tili</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">O'zbek tili</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
