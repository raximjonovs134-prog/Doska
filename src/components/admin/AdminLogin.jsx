import React, { useState } from 'react';
import { Lock, ArrowLeft, ShieldCheck, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Iltimos, parolni kiriting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Noto\'g\'ri parol kiritildi');
        setLoading(false);
        return;
      }

      // Do NOT persist in localStorage - in-memory only per user requirement
      onLoginSuccess(data.token);
    } catch (err) {
      setError('Server bilan bog\'lanishda xatolik yuz berdi. Server ishlayotganligini tekshiring.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden math-grid transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-neon-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Top row: Back to site button & ThemeToggle */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Saytga qaytish</span>
          </button>

          <ThemeToggle />
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neon-green via-emerald-400 to-blue-500" />

          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-neon-green/10 border border-emerald-300 dark:border-neon-green/30 flex items-center justify-center text-emerald-600 dark:text-neon-green mx-auto shadow-neon-sm">
              <Lock className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Ustoz Boshqaruv Tizimi
            </h1>
            
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ushbu bo'lim faqat o'qituvchi uchun mo'ljallangan. Kirish uchun maxfiy parolni kiriting.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Admin Paroli
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-white text-base tracking-widest focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon hover:shadow-neon-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Tekshirilmoqda...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tizimga Kirish</span>
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-5 border-t border-slate-200 dark:border-navy-800 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              🔒 Har safar kirishda parol tekshiriladi (In-memory JWT & Bcrypt).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
