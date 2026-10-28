import React from 'react';
import { Send, Phone, MapPin, ArrowUp } from 'lucide-react';
import { InstagramIcon, TelegramIcon } from './Icons';
import { getSocialConfig } from '../utils/social';

export default function Footer({ teacher }) {
  const telegramConfig = getSocialConfig('telegram', teacher);
  const instagramConfig = getSocialConfig('instagram', teacher);

  const displayName = teacher.fullName || 
    `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || 
    "[O'qituvchi To'liq Ismi]";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-navy-950 border-t border-slate-200 dark:border-navy-850 pt-12 sm:pt-16 pb-8 sm:pb-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-200 dark:border-navy-850">
          
          {/* Brand & Intro */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-navy-850 border border-emerald-500/40 dark:border-neon-green/40 flex items-center justify-center text-emerald-600 dark:text-neon-green font-mono font-bold text-xl shadow-neon-sm">
                <span className="font-extrabold text-emerald-600 dark:text-neon-green">D</span>
                <span className="text-slate-800 dark:text-white text-xs -ml-0.5">²</span>
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                DOSKA<span className="text-emerald-600 dark:text-neon-green">.UZ</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              O'zbekistonda matematika va fizika fanlarini chuqur, mantiqiy hamda xalqaro standartlar asosida o'rgatuvchi zamonaviy ta'lim portali.
            </p>

            {/* Social Links (Only enabled channels) */}
            <div className="flex items-center gap-3 pt-1">
              {telegramConfig.isValid && (
                <a
                  href={telegramConfig.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 hover:border-emerald-500/60 dark:hover:border-neon-green/60 text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-neon-green flex items-center justify-center transition-colors shadow-xs"
                  title="Telegram"
                >
                  <TelegramIcon className="w-4 h-4" />
                </a>
              )}

              {instagramConfig.isValid && (
                <a
                  href={instagramConfig.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 hover:border-emerald-500/60 dark:hover:border-neon-green/60 text-slate-600 hover:text-pink-500 dark:text-slate-300 dark:hover:text-pink-400 flex items-center justify-center transition-colors shadow-xs"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-neon-green font-semibold">
              Sayt Bo'limlari
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#hero" className="hover:text-slate-900 dark:hover:text-white transition-colors">Bosh sahifa</a></li>
              <li><a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">Ustoz tarjimai holi</a></li>
              <li><a href="#courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">Kurslar va dastur</a></li>
              <li><a href="#certificates" className="hover:text-slate-900 dark:hover:text-white transition-colors">Natijalar & Sertifikatlar</a></li>
              <li><a href="#announcements" className="hover:text-slate-900 dark:hover:text-white transition-colors">Guruhlarga qabul e'loni</a></li>
              <li><a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Bog'lanish</a></li>
            </ul>
          </div>

          {/* Teacher & Address info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-neon-green font-semibold">
              Aloqa Ma'lumotlari
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">O'qituvchi:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{displayName}</span>
              </p>
              {teacher.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-neon-green shrink-0" />
                  <a href={`tel:${teacher.phone}`} className="hover:underline">{teacher.phone}</a>
                </p>
              )}
              {teacher.location && (
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-neon-green shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-400">{teacher.location}</span>
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Doska.uz — Barcha huquqlar himoyalangan.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-neon-green hover:border-emerald-500/40 dark:hover:border-neon-green/40 transition-colors cursor-pointer shadow-xs"
          >
            <span>Yuqoriga qaytish</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
