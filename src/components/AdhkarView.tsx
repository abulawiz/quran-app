import React, { useState } from 'react';
import { useQuran, playChime } from '../context/QuranContext';
import { ADHKAR_LIST } from '../data/adhkar';
import type { DhikrItem } from '../data/adhkar';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Bell, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  BookOpen,
  Volume2
} from 'lucide-react';

export const AdhkarView: React.FC = () => {
  const { 
    adhkarReminders, 
    updateAdhkarReminders, 
    sendTestAdhkarNotification 
  } = useQuran();

  const [activeCategory, setActiveCategory] = useState<'morning' | 'evening' | 'after-prayer' | 'sleep'>('morning');
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Counts state per dhikr ID: Record<string, number>
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    try {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem('adhkar_saved_date');
      if (savedDate !== today) {
        localStorage.setItem('adhkar_saved_date', today);
        return {};
      }
      const saved = localStorage.getItem('adhkar_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveCounts = (newCounts: Record<string, number>) => {
    setCounts(newCounts);
    try {
      localStorage.setItem('adhkar_counts', JSON.stringify(newCounts));
    } catch {}
  };

  const handleTapDhikr = (item: DhikrItem) => {
    const current = counts[item.id] || 0;
    if (current >= item.repeat) return;

    const next = current + 1;
    const updated = { ...counts, [item.id]: next };
    saveCounts(updated);

    // Haptic feedback on mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(next >= item.repeat ? [40, 60, 40] : 25);
    }

    // Play chime when completing
    if (next >= item.repeat) {
      playChime();
    }
  };

  const handleResetCategory = () => {
    const updated = { ...counts };
    items.forEach((item) => {
      delete updated[item.id];
    });
    saveCounts(updated);
  };

  const items = ADHKAR_LIST.filter((d) => d.category === activeCategory);
  const completedCount = items.filter((d) => (counts[d.id] || 0) >= d.repeat).length;
  const progressPercent = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  const handleTestNotification = (type: 'morning' | 'evening') => {
    sendTestAdhkarNotification(type);
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-36 px-1 sm:px-0">
      
      {/* Mobile Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-[#032e22] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/30">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/50 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Daily Fortress of the Believer (حصن المسلم)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Adhkar & Reminders
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-1">
              Authentic Morning & Evening supplications with interactive counters
            </p>
          </div>

          {/* Quick Reminder Toggle Button */}
          <button
            onClick={() => setShowReminderSettings(!showReminderSettings)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold transition-all shrink-0 self-start sm:self-center"
          >
            <Bell className="w-4 h-4 text-amber-300" />
            <span>Adhkar Reminders</span>
            {showReminderSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Reminder Settings Drawer */}
        {showReminderSettings && (
          <div className="mt-5 pt-5 border-t border-white/15 animate-in fade-in slide-in-from-top-2 duration-200 text-xs text-emerald-50 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Morning Reminder */}
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sun className="w-5 h-5 text-amber-300" />
                  <div>
                    <p className="font-bold">Morning Adhkar</p>
                    <p className="text-[11px] text-emerald-200/70">After Fajr prayer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={adhkarReminders.morningTime}
                    onChange={(e) => updateAdhkarReminders({ morningTime: e.target.value })}
                    className="bg-black/30 text-white rounded-lg px-2 py-1 text-xs border border-white/20 font-mono focus:outline-none"
                  />
                  <input
                    type="checkbox"
                    checked={adhkarReminders.morningEnabled}
                    onChange={(e) => updateAdhkarReminders({ morningEnabled: e.target.checked })}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Evening Reminder */}
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-5 h-5 text-teal-300" />
                  <div>
                    <p className="font-bold">Evening Adhkar</p>
                    <p className="text-[11px] text-emerald-200/70">After Asr / Maghrib</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={adhkarReminders.eveningTime}
                    onChange={(e) => updateAdhkarReminders({ eveningTime: e.target.value })}
                    className="bg-black/30 text-white rounded-lg px-2 py-1 text-xs border border-white/20 font-mono focus:outline-none"
                  />
                  <input
                    type="checkbox"
                    checked={adhkarReminders.eveningEnabled}
                    onChange={(e) => updateAdhkarReminders({ eveningEnabled: e.target.checked })}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Test notification buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-[11px] text-emerald-200/70">
                🔔 Receives gentle chimes and mobile notifications at your scheduled times.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestNotification('morning')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-[11px] transition-colors shadow"
                >
                  {testNotificationSent ? 'Sent!' : 'Test Morning Alert'}
                </button>
                <button
                  onClick={() => handleTestNotification('evening')}
                  className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-emerald-950 font-bold text-[11px] transition-colors shadow"
                >
                  Test Evening Alert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveCategory('morning')}
          className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all ${
            activeCategory === 'morning'
              ? 'bg-amber-500 text-emerald-950 shadow-md scale-[1.02]'
              : 'bg-white dark:bg-[#0f1924] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Morning (أذكار الصباح)</span>
        </button>

        <button
          onClick={() => setActiveCategory('evening')}
          className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all ${
            activeCategory === 'evening'
              ? 'bg-emerald-700 text-white shadow-md scale-[1.02]'
              : 'bg-white dark:bg-[#0f1924] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>Evening (أذكار المساء)</span>
        </button>

        <button
          onClick={() => setActiveCategory('after-prayer')}
          className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all ${
            activeCategory === 'after-prayer'
              ? 'bg-emerald-700 text-white shadow-md scale-[1.02]'
              : 'bg-white dark:bg-[#0f1924] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>After Prayer</span>
        </button>

        <button
          onClick={() => setActiveCategory('sleep')}
          className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-bold text-xs transition-all ${
            activeCategory === 'sleep'
              ? 'bg-emerald-700 text-white shadow-md scale-[1.02]'
              : 'bg-white dark:bg-[#0f1924] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Before Sleep</span>
        </button>
      </div>

      {/* Progress & Reset Tracker */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
            <span>
              Today's Progress: <strong className="text-emerald-600 dark:text-emerald-400">{completedCount} of {items.length} completed</strong>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleResetCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors shrink-0"
          title="Reset counts for this category"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Adhkar Cards List */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const currentCount = counts[item.id] || 0;
          const isDone = currentCount >= item.repeat;

          return (
            <div
              key={item.id}
              className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-200 bg-white dark:bg-[#0f1924] ${
                isDone
                  ? 'border-emerald-500/80 ring-2 ring-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                    {item.title}
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                  Repeat {item.repeat}×
                </span>
              </div>

              {/* Arabic Text */}
              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl text-right text-slate-950 dark:text-slate-50 leading-loose mb-4 select-text"
                style={{ lineHeight: 2.2 }}
              >
                {item.arabic}
              </p>

              {/* Transliteration */}
              {item.transliteration && (
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 italic mb-2 leading-relaxed">
                  {item.transliteration}
                </p>
              )}

              {/* Translation */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.translation}
              </p>

              {/* Benefit / Hadith Note */}
              {item.benefit && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 mb-4 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Virtue: </span>
                    <span>{item.benefit}</span>
                    <span className="block mt-0.5 text-[10px] text-slate-400 font-mono">({item.source})</span>
                  </div>
                </div>
              )}

              {/* Tap Counter Control Button (Thumb-Friendly for Mobile) */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-slate-500">
                  {currentCount} / {item.repeat} Recited
                </span>

                <button
                  onClick={() => handleTapDhikr(item)}
                  disabled={isDone}
                  className={`flex-1 max-w-[200px] py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    isDone
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Completed ✓</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 opacity-75" />
                      <span>Tap to Recite ({item.repeat - currentCount} left)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
