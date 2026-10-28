import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Yorug' rejimga (Light Mode) o'tish" : "Tungi rejimga (Dark Mode) o'tish"}
      title={isDark ? "Yorug' rejim (Light Mode)" : "Tungi rejim (Dark Mode)"}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-navy-850 hover:bg-navy-800 text-amber-300 border border-navy-700/80 shadow-sm hover:border-amber-300/40'
          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm hover:text-amber-500 hover:border-amber-400/40'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
