import React, { useState } from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import { Navbar } from './components/Navbar';
import { SurahList } from './components/SurahList';
import { SurahView } from './components/SurahView';
import { JuzList } from './components/JuzList';
import { BookmarksView } from './components/BookmarksView';
import { TasbihView } from './components/TasbihView';
import { AdhkarView } from './components/AdhkarView';
import { PrayerTimesView } from './components/PrayerTimesView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { TafseerModal } from './components/TafseerModal';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { QRCodeModal } from './components/QRCodeModal';
import { LoadingScreen } from './components/LoadingScreen';
import type { TafseerResult } from './services/quranApi';
import { Clock, QrCode } from 'lucide-react';

const QuranMain: React.FC = () => {
  const { currentTab, setIsQRCodeOpen } = useQuran();

  const [tafseerData, setTafseerData] = useState<{
    isOpen: boolean;
    result: TafseerResult | null;
    surahName: string;
    ayahNumber: number;
    ayahArabic: string;
  }>({
    isOpen: false,
    result: null,
    surahName: '',
    ayahNumber: 1,
    ayahArabic: '',
  });

  const [isPrayerTimesOpen, setIsPrayerTimesOpen] = useState(false);

  const handleOpenTafseer = (
    result: TafseerResult,
    surahName: string,
    ayahNumber: number,
    ayahArabic: string
  ) => {
    setTafseerData({
      isOpen: true,
      result,
      surahName,
      ayahNumber,
      ayahArabic,
    });
  };

  const handleCloseTafseer = () => {
    setTafseerData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a1118] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Smooth Loading Screen */}
      <LoadingScreen />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-32 md:pb-24">
        {currentTab === 'surahs' && <SurahList />}
        {currentTab === 'surah-detail' && <SurahView onOpenTafseer={handleOpenTafseer} />}
        {currentTab === 'juz' && <JuzList />}
        {currentTab === 'adhkar' && <AdhkarView />}
        {currentTab === 'prayer-times' && <PrayerTimesView />}
        {currentTab === 'bookmarks' && <BookmarksView />}
        {currentTab === 'tasbih' && <TasbihView />}
      </main>

      {/* Footer (Desktop only or clean minimal) */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1622] py-8 text-center text-xs text-slate-500 dark:text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-arabic text-base font-bold text-emerald-800 dark:text-emerald-400">
              القرآن الكريم
            </span>
            <span>•</span>
            <span>The Noble Quran Web & Mobile PWA</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsPrayerTimesOpen(true)}
              className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prayer Times Modal</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsQRCodeOpen(true)}
              className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-amber-600 dark:text-amber-400"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Expo Go / Mobile QR</span>
            </button>
            <span>•</span>
            <span className="italic">"Verily, in the remembrance of Allah do hearts find rest." (13:28)</span>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Audio Player Bar */}
      <AudioPlayerBar />

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Modals & Dialogs */}
      <SearchModal />
      <SettingsModal />
      <QRCodeModal />
      <TafseerModal
        isOpen={tafseerData.isOpen}
        onClose={handleCloseTafseer}
        tafseerData={tafseerData.result}
        surahName={tafseerData.surahName}
        ayahNumber={tafseerData.ayahNumber}
        ayahArabic={tafseerData.ayahArabic}
      />
      <PrayerTimesModal
        isOpen={isPrayerTimesOpen}
        onClose={() => setIsPrayerTimesOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <QuranProvider>
      <QuranMain />
    </QuranProvider>
  );
}
