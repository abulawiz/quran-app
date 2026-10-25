import React, { useState } from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import { MobileFrame } from './components/MobileFrame';
import { MobileHeader } from './components/MobileHeader';
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
import { InstallModal } from './components/InstallModal';
import { SidebarDrawer } from './components/SidebarDrawer';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutAuthorView } from './components/AboutAuthorView';
import type { TafseerResult } from './services/quranApi';

const QuranMain: React.FC = () => {
  const { currentTab } = useQuran();

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
    <MobileFrame>
      {/* Smooth Loading Screen */}
      <LoadingScreen />

      {/* Unified Mobile Header */}
      <MobileHeader />

      {/* Main Mobile Screen Viewport */}
      <main className="flex-1 w-full px-3 py-3 pb-24">
        {currentTab === 'surahs' && <SurahList />}
        {currentTab === 'surah-detail' && <SurahView onOpenTafseer={handleOpenTafseer} />}
        {currentTab === 'juz' && <JuzList />}
        {currentTab === 'adhkar' && <AdhkarView />}
        {currentTab === 'prayer-times' && <PrayerTimesView />}
        {currentTab === 'bookmarks' && <BookmarksView />}
        {currentTab === 'tasbih' && <TasbihView />}
        {currentTab === 'author' && <AboutAuthorView />}
      </main>

      {/* Docked Mini Audio Player Bar */}
      <AudioPlayerBar />

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Modals & Dialogs */}
      <SidebarDrawer />
      <SearchModal />
      <SettingsModal />
      <QRCodeModal />
      <InstallModal />
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
    </MobileFrame>
  );
};

export default function App() {
  return (
    <QuranProvider>
      <QuranMain />
    </QuranProvider>
  );
}
