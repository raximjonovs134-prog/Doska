import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onEnrollClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Bosh sahifa", href: "#hero" },
    { name: "Ustoz haqida", href: "#about" },
    { name: "Kurslar", href: "#courses" },
    { name: "Natijalar", href: "#certificates" },
    { name: "E'lonlar", href: "#announcements" },
    { name: "Aloqa", href: "#contact" },
  ];

  const handleLinkClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-navy-700/60 shadow-lg shadow-slate-200/30 dark:shadow-black/40 py-3' 
        : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-gradient-to-br dark:from-navy-800 dark:to-navy-900 border border-emerald-500/40 dark:border-neon-green/40 flex items-center justify-center text-emerald-600 dark:text-neon-green font-mono font-bold text-xl shadow-sm dark:shadow-neon-sm group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-emerald-600 dark:text-neon-green">D</span>
              <span className="text-slate-800 dark:text-white text-xs -ml-0.5">²</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                  DOSKA<span className="text-emerald-500 dark:text-neon-green">.UZ</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-mono font-semibold rounded bg-emerald-500/10 dark:bg-neon-green/10 text-emerald-600 dark:text-neon-green border border-emerald-500/20 dark:border-neon-green/20">
                  Math & Phys
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block tracking-wide">Matematika & Fizika Maktabi</p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* CTA Enroll */}
            <button
              onClick={onEnrollClick}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-emerald-400 dark:bg-neon-green hover:bg-emerald-300 dark:hover:bg-[#15FFA3] shadow-md dark:shadow-neon hover:shadow-lg dark:hover:shadow-neon-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <PhoneCall className="w-4 h-4 text-navy-950 transition-transform group-hover:scale-110" />
              <span>Darsga yozilish</span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Button (Mobile) */}
            <ThemeToggle className="w-9 h-9" />

            <button
              onClick={onEnrollClick}
              className="px-3 py-1.5 rounded-lg bg-emerald-400 dark:bg-neon-green text-navy-950 text-xs font-bold shadow-sm"
            >
              Yozilish
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-navy-850 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-navy-700 cursor-pointer"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-navy-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-navy-800 px-5 py-6 mt-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-neon-green transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-navy-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onEnrollClick) onEnrollClick();
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-emerald-400 dark:bg-neon-green text-navy-950 shadow-md dark:shadow-neon cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Kursga yozilish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
