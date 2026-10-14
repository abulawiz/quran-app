export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  startJuz: number;
}

export interface Ayah {
  number: number; // Global ayah number (1 - 6236)
  numberInSurah: number;
  text: string; // Arabic text
  translation?: string;
  transliteration?: string;
  audio?: string;
  juz?: number;
  page?: number;
  sajda?: boolean | object;
}

export interface SurahDetail extends SurahMeta {
  ayahs: Ayah[];
  edition?: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
  };
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  subfolder: string;
  apiIdentifier: string;
  style?: string;
  bitrate?: string;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahText: string;
  translationText: string;
  createdAt: number;
}

export interface ReadingSettings {
  arabicFontSize: number;
  translationFontSize: number;
  fontFamily: 'amiri' | 'scheherazade' | 'noto';
  showTranslation: boolean;
  showTransliteration: boolean;
  selectedTranslation: string;
  autoScrollToPlayingAyah: boolean;
  theme: 'light' | 'dark' | 'emerald' | 'parchment';
  playbackSpeed: number;
  repeatMode: 'none' | 'ayah' | 'surah';
}

export interface JuzMeta {
  juzNumber: number;
  name: string;
  arabicName: string;
  startSurahNumber: number;
  startSurahName: string;
  startAyah: number;
}
