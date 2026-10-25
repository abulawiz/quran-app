import React from 'react';
import { useQuran } from '../context/QuranContext';
import { RECITERS_LIST, AVAILABLE_TRANSLATIONS } from '../data/reciters';
import { 
  X, 
  Type, 
  Headphones, 
  Languages, 
  Palette, 
  Sliders,
  User 
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    settings,
    updateSettings,
    reciter,
    setReciter,
    setCurrentTab,
  } = useQuran();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#0d1620] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Reading & Audio Settings
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Headphones className="w-4 h-4 text-emerald-600" />
              <span>Audio Reciter (Qari)</span>
            </label>
            <select
              value={reciter.id}
              onChange={(e) => {
                const found = RECITERS_LIST.find((r) => r.id === e.target.value);
                if (found) setReciter(found);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {RECITERS_LIST.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.arabicName}) - {r.style}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Languages className="w-4 h-4 text-emerald-600" />
              <span>Translation Edition</span>
            </label>
            <select
              value={settings.selectedTranslation}
              onChange={(e) => updateSettings({ selectedTranslation: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {AVAILABLE_TRANSLATIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.language})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Type className="w-4 h-4 text-emerald-600" />
                <span>Arabic Font Size</span>
              </label>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {settings.arabicFontSize}px
              </span>
            </div>
            <input
              type="range"
              min={22}
              max={44}
              step={1}
              value={settings.arabicFontSize}
              onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div dir="rtl" className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <p
                style={{
                  fontSize: `${settings.arabicFontSize}px`,
                  fontFamily: settings.fontFamily === 'amiri' ? '"Amiri", serif' : '"Scheherazade New", serif',
                }}
                className="font-arabic text-emerald-900 dark:text-emerald-300"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Translation Font Size
              </label>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {settings.translationFontSize}px
              </span>
            </div>
            <input
              type="range"
              min={13}
              max={22}
              step={1}
              value={settings.translationFontSize}
              onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
              Arabic Font Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateSettings({ fontFamily: 'amiri' })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  settings.fontFamily === 'amiri'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-arabic text-lg block mb-0.5">خط أميري</span>
                <span className="text-xs">Amiri Classical</span>
              </button>

              <button
                onClick={() => updateSettings({ fontFamily: 'scheherazade' })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  settings.fontFamily === 'scheherazade'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-arabic text-lg block mb-0.5">شهرزاد</span>
                <span className="text-xs">Scheherazade New</span>
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Color Theme</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateSettings({ theme: 'emerald' })}
                className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                  settings.theme === 'emerald'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                Emerald Light
              </button>
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                  settings.theme === 'dark'
                    ? 'border-emerald-500 bg-slate-900 text-emerald-400 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                Night Dark
              </button>
              <button
                onClick={() => updateSettings({ theme: 'parchment' })}
                className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                  settings.theme === 'parchment'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                Warm Parchment
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Show Translation
              </span>
              <input
                type="checkbox"
                checked={settings.showTranslation}
                onChange={(e) => updateSettings({ showTranslation: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Show Transliteration (Pronunciation)
              </span>
              <input
                type="checkbox"
                checked={settings.showTransliteration}
                onChange={(e) => updateSettings({ showTransliteration: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Auto-scroll to currently reciting Ayah
              </span>
              <input
                type="checkbox"
                checked={settings.autoScrollToPlayingAyah}
                onChange={(e) => updateSettings({ autoScrollToPlayingAyah: e.target.checked })}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
          </div>

        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              setIsSettingsOpen(false);
              setCurrentTab('author');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>About Author</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
