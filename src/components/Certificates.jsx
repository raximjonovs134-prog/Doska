import React, { useState } from 'react';
import { Award, Eye, FileText, CheckCircle, ExternalLink, X, ShieldCheck } from 'lucide-react';

export default function Certificates({ certificates }) {
  const [activeCert, setActiveCert] = useState(null);
  const [filter, setFilter] = useState('Hammasi');

  const tags = ['Hammasi', 'Milliy Sertifikat', 'DTM Grant', 'Olimpiada'];

  const filteredCerts = (certificates || []).filter(c => {
    if (filter === 'Hammasi') return true;
    return c.tag === filter;
  });

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-white dark:bg-navy-950/80 border-t border-slate-200 dark:border-navy-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-850 border border-emerald-500/30 dark:border-neon-green/30 text-emerald-700 dark:text-neon-green text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>O'quvchilar Muvaffaqiyati</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sertifikatlar va <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-neon-green dark:to-[#57FFBE]">
              Rasmiy Natijalar Galereyasi
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Quyida o'quvchilarimiz tomonidan qo'lga kiritilgan sertifikat va natijalar shablonlari keltirilgan. Haqiqiy sertifikat nusxalarini Admin paneli orqali yuklash mumkin.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === t
                    ? 'bg-neon-green text-navy-950 font-bold shadow-neon-sm'
                    : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              className="group rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-emerald-500/50 dark:hover:border-neon-green/50 p-4 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg dark:hover:shadow-card-glow cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[4/3] rounded-xl bg-slate-200/60 dark:bg-gradient-to-br dark:from-navy-850 dark:to-navy-950 border-2 border-dashed border-slate-300 dark:border-navy-700 group-hover:border-emerald-500/40 dark:group-hover:border-neon-green/40 flex flex-col items-center justify-center p-2 text-center overflow-hidden transition-colors">
                  {cert.imageUrl ? (
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.studentName} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-navy-900 border border-emerald-500/30 dark:border-neon-green/30 flex items-center justify-center text-emerald-600 dark:text-neon-green mb-2 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-neon-green bg-white/90 dark:bg-navy-900/90 px-2 py-0.5 rounded border border-slate-200 dark:border-navy-700">
                        {cert.placeholderLabel || "Sertifikat Namunasi"}
                      </span>
                    </>
                  )}

                  <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-green text-navy-950 font-bold text-xs shadow-neon">
                      <Eye className="w-3.5 h-3.5" />
                      Ko'rish
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-neon-green">{cert.tag}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{cert.year}</span>
                  </div>
                  
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-neon-green transition-colors">
                    {cert.studentName}
                  </h4>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {cert.course}
                  </p>
                </div>
              </div>

              {/* Bottom Result Pill */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-navy-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Natija:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-neon-green bg-emerald-50 dark:bg-neon-green/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-neon-green/20">
                  {cert.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Certificate Detail */}
        {activeCert && (
          <div 
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-neon-green/40 p-6 sm:p-8 shadow-2xl space-y-6"
            >
              
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-neon-green/10 border border-emerald-300 dark:border-neon-green/30 flex items-center justify-center text-emerald-600 dark:text-neon-green">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-700 dark:text-neon-green uppercase">{activeCert.tag}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeCert.studentName}</h3>
                </div>
              </div>

              {/* Certificate Preview Canvas */}
              <div className="aspect-[16/10] rounded-2xl bg-slate-100 dark:bg-gradient-to-br dark:from-navy-850 dark:to-navy-950 border-2 border-dashed border-slate-300 dark:border-navy-600 flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                {activeCert.imageUrl ? (
                  <img 
                    src={activeCert.imageUrl} 
                    alt={activeCert.studentName} 
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="space-y-3 p-4">
                    <FileText className="w-14 h-14 text-emerald-600/60 dark:text-neon-green/60 mx-auto" />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {activeCert.placeholderLabel}
                      </div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Hajmi: JPG / PNG / WebP
                      </div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded bg-slate-200 dark:bg-navy-900 text-emerald-700 dark:text-neon-green font-mono border border-slate-300 dark:border-navy-700 inline-block">
                      Tasdiqlangan Ball: {activeCert.score}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-navy-950/60 p-4 rounded-xl border border-slate-200 dark:border-navy-800">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Kurs yo'nalishi:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{activeCert.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Tavsif:</span>
                  <span className="text-right text-slate-700 dark:text-slate-300">{activeCert.description}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-900 dark:text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Yopish
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
