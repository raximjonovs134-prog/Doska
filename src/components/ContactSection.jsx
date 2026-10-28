import React, { useState } from 'react';
import { Send, Phone, MapPin, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { InstagramIcon, TelegramIcon } from './Icons';
import { getSocialConfig } from '../utils/social';

export default function ContactSection({ teacher, selectedCourse, onSubmitRequest }) {
  const telegramConfig = getSocialConfig('telegram', teacher);
  const instagramConfig = getSocialConfig('instagram', teacher);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: selectedCourse || 'Matematika: Milliy Sertifikat va DTM (Abituriyent)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Iltimos, ismingizni kiriting');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setError('Iltimos, to\'g\'ri telefon raqamingizni kiriting');
      return;
    }

    setError('');
    const newReq = {
      id: `req-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      course: formData.course,
      message: formData.message || "Konsultatsiya so'ralgan",
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Yangi'
    };

    onSubmitRequest(newReq);
    setSubmitted(true);
  };

  const hasAnySocial = telegramConfig.isValid || instagramConfig.isValid;

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-950/90 border-t border-slate-200 dark:border-navy-850 transition-colors duration-300">
      <div className="absolute -bottom-20 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-neon-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-navy-850 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs font-mono uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Bog'lanish va Qabul</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kursga Ro'yxatdan O'ting yoki <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-neon-green dark:to-[#57FFBE]">
              Savollaringizni Yo'llang
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base px-2">
            Ismingiz va telefon raqamingizni qoldiring. Ustoz yoki assistent 24 soat ichida siz bilan bog'lanib, bepul sinov darsi vaqtini belgilaydi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Column: Direct Telegram, Instagram & Contact Info */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Telegram Card (Only if enabled and valid) */}
            {telegramConfig.isValid && (
              <a
                href={telegramConfig.url}
                target="_blank"
                rel="noreferrer"
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-emerald-500/60 dark:hover:border-neon-green/60 flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none glow-card cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9] group-hover:scale-110 transition-transform shrink-0">
                    <TelegramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-neon-green uppercase font-semibold">Tezkor Aloqa</span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-neon-green transition-colors">
                      Telegram Profil
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[180px] sm:max-w-xs">
                      @{telegramConfig.username || 'doska_uz'}
                    </p>
                  </div>
                </div>
                <div className="text-emerald-700 dark:text-neon-green font-mono text-xs group-hover:translate-x-1 transition-transform shrink-0 font-semibold">
                  O'tish →
                </div>
              </a>
            )}

            {/* Instagram Card (Only if enabled and valid) */}
            {instagramConfig.isValid && (
              <a
                href={instagramConfig.url}
                target="_blank"
                rel="noreferrer"
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-emerald-500/60 dark:hover:border-neon-green/60 flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none glow-card cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shrink-0">
                    <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-neon-green uppercase font-semibold">Ijtimoiy Tarmoq</span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-neon-green transition-colors">
                      Instagram Sahifa
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[180px] sm:max-w-xs">
                      @{instagramConfig.username || 'doska_uz'}
                    </p>
                  </div>
                </div>
                <div className="text-emerald-700 dark:text-neon-green font-mono text-xs group-hover:translate-x-1 transition-transform shrink-0 font-semibold">
                  O'tish →
                </div>
              </a>
            )}

            {/* Direct Phone Card */}
            {teacher.phone && (
              <a
                href={`tel:${teacher.phone}`}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-emerald-500/60 dark:hover:border-neon-green/60 flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none glow-card cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/15 dark:bg-neon-green/15 border border-emerald-500/30 dark:border-neon-green/30 flex items-center justify-center text-emerald-600 dark:text-neon-green group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-neon-green uppercase font-semibold">Qo'ng'iroq Qilish</span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-neon-green transition-colors font-mono">
                      {teacher.phone}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Har kuni: 08:30 — 20:00</p>
                  </div>
                </div>
                <div className="text-emerald-700 dark:text-neon-green font-mono text-xs group-hover:translate-x-1 transition-transform shrink-0 font-semibold">
                  Tel →
                </div>
              </a>
            )}

            {/* Location Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 space-y-3.5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-neon-green shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">Dars O'tish Manzili</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {teacher.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200 dark:border-navy-800/80">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-neon-green shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">Qabul Vaqti</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Dushanba — Shanba, 08:30 dan 20:00 gacha
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 relative overflow-hidden shadow-xl dark:shadow-2xl transition-colors">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl pointer-events-none" />

              {submitted ? (
                <div className="py-10 sm:py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 dark:bg-neon-green/15 border border-emerald-300 dark:border-neon-green/40 text-emerald-600 dark:text-neon-green flex items-center justify-center mx-auto shadow-neon">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Arizangiz muvaffaqiyatli qabul qilindi!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Rahmat, <span className="text-emerald-700 dark:text-neon-green font-bold">{formData.name}</span>! So'rovingiz qabul qilindi va ustozga yetkazildi. Tez orada siz bilan bog'lanamiz.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', course: 'Matematika: Milliy Sertifikat va DTM (Abituriyent)', message: '' });
                    }}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 text-xs font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-navy-700 cursor-pointer"
                  >
                    Boshqa so'rov yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-slate-200 dark:border-navy-800 pb-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Bepul Sinov Darsiga Yozilish
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Quyidagi shaklni to'ldiring va «Arizani Yuborish» tugmasini bosing
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                      Ismingiz va Familiyangiz *
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Sardor Aliyev"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none focus:border-emerald-500 dark:focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                      Telefon Raqamingiz *
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base font-mono focus:outline-none focus:border-emerald-500 dark:focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                      Qiziqqan Yo'nalishingiz
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-white text-base focus:outline-none focus:border-emerald-500 dark:focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                    >
                      <option value="Matematika: Milliy Sertifikat va DTM (Abituriyent)">
                        Matematika: Milliy Sertifikat va DTM (Abituriyent)
                      </option>
                      <option value="Fizika: Fundamental va DTM Intensiv">
                        Fizika: Fundamental va DTM Intensiv
                      </option>
                      <option value="Olimpiada Matematikasi va Xalqaro Imtihonlar">
                        Olimpiada Matematikasi va Xalqaro Imtihonlar
                      </option>
                      <option value="Fizika: Masala Yechish Maxsus Praktikumi">
                        Fizika: Masala Yechish Maxsus Praktikumi
                      </option>
                      <option value="Umumiy konsultatsiya / Bilim darajasini aniqlash">
                        Umumiy konsultatsiya / Bilim darajasini aniqlash
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                      Qo'shimcha Izoh (Ixtiyoriy)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Qaysi sinfda o'qiysiz yoki qaysi mavzularda qiynalasiz?.."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none focus:border-emerald-500 dark:focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 rounded-xl text-sm font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon hover:shadow-neon-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <Sparkles className="w-4 h-4 text-navy-950" />
                    <span>Arizani Yuborish</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    🔒 Ma'lumotlaringiz maxfiy saqlanadi va uchinchi shaxslarga berilmaydi.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
