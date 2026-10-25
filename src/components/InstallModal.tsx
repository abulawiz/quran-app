import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { downloadSurahForOffline, getOfflineAvailableSurahs } from '../services/quranApi';
import { 
  X, 
  Download, 
  Smartphone, 
  Check, 
  Share2, 
  PlusSquare, 
  ShieldCheck, 
  HardDriveDownload 
} from 'lucide-react';

export const InstallModal: React.FC = () => {
  const { 
    isInstallModalOpen, 
    setIsInstallModalOpen, 
    installPWA, 
    canInstallPWA 
  } = useQuran();

  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadStatusText, setDownloadStatusText] = useState<string>('');
  const [downloadComplete, setDownloadComplete] = useState<boolean>(false);
  const [offlineSurahsCount, setOfflineSurahsCount] = useState<number>(() => {
    return getOfflineAvailableSurahs().length;
  });

  if (!isInstallModalOpen) return null;

  const handleDownloadEssentialPack = async () => {
    setDownloadProgress(0);
    setDownloadComplete(false);
    
    // Key Surahs to cache: 1 to 20, 36, 55, 56, 67, and 100-114
    const surahsToCache = [
      1, 2, 18, 36, 55, 56, 67, 93, 94, 97, 103, 108, 109, 110, 111, 112, 113, 114
    ];
    
    let completed = 0;
    for (const num of surahsToCache) {
      setDownloadStatusText(`Caching Surah ${num} of 114...`);
      await downloadSurahForOffline(num);
      completed++;
      setDownloadProgress(Math.round((completed / surahsToCache.length) * 100));
    }

    setOfflineSurahsCount(getOfflineAvailableSurahs().length);
    setDownloadStatusText('Essential Surahs downloaded & cached for 100% offline use!');
    setDownloadComplete(true);
    setTimeout(() => {
      setDownloadProgress(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#0c1622] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Download & Install App
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Works 100% offline on any phone or computer
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInstallModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Main Install Card */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-800 to-teal-900 text-white shadow-md text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight">
                Al-Qur'an Mobile App (PWA)
              </h4>
              <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                Install as a standalone app on your Home Screen. Zero app store needed, fast, and private.
              </p>
            </div>

            <button
              onClick={() => {
                if (canInstallPWA) {
                  installPWA();
                } else {
                  alert('To install on your phone:\n- On Safari (iPhone): Tap Share ⎋ then "Add to Home Screen" (+).\n- On Chrome (Android): Tap menu ⋮ then "Install App" or "Add to Home screen".');
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>{canInstallPWA ? 'Install Mobile App to Home Screen' : 'Install to Home Screen'}</span>
            </button>
          </div>

          {/* Offline Data Status & Pack Downloader */}
          <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDriveDownload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Offline Quran Pack
                </span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                {offlineSurahsCount} Surahs Ready
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Download foundational Surahs into your device's persistent cache to recite even on airplane mode without internet.
            </p>

            {downloadProgress !== null && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>{downloadStatusText}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {!downloadComplete ? (
              <button
                onClick={handleDownloadEssentialPack}
                disabled={downloadProgress !== null}
                className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Essential Offline Pack</span>
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 py-1">
                <Check className="w-4 h-4" />
                <span>Downloaded & Cached Successfully!</span>
              </div>
            )}
          </div>

          {/* Platform Installation Guide */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              How to Install On Your Device:
            </h5>

            {/* iOS Safari */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-800 dark:text-slate-100">iPhone / iPad (Safari):</span>
                <p className="mt-0.5">Tap the <strong>Share</strong> button at bottom, scroll down and choose <strong>"Add to Home Screen (+)"</strong>.</p>
              </div>
            </div>

            {/* Android Chrome */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <PlusSquare className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-800 dark:text-slate-100">Android (Chrome):</span>
                <p className="mt-0.5">Tap browser menu <strong>⋮</strong> and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
              </div>
            </div>
          </div>

          {/* Privacy & Offline Guarantee */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free, Private, and Ad-free. Made for the sake of Allah.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => setIsInstallModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
