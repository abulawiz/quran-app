import type { SurahDetail, Ayah } from '../types/quran';
import { SURAHS_LIST } from '../data/surahs';
import { OFFLINE_SURAHS } from '../data/sampleSurahs';

const CACHE_PREFIX = 'quran_cache_surah_';

export async function fetchSurah(
  surahNumber: number,
  translationEdition = 'en.sahih',
  reciterApiId = 'ar.alafasy'
): Promise<SurahDetail> {
  const meta = SURAHS_LIST.find((s) => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah ${surahNumber} not found`);
  }

  // Check LocalStorage cache
  const cacheKey = `${CACHE_PREFIX}${surahNumber}_${translationEdition}_${reciterApiId}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('LocalStorage read error:', e);
  }

  // Network request to AlQuran Cloud multi-edition endpoint
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${translationEdition},${reciterApiId}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch Surah: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.code === 200 && Array.isArray(json.data) && json.data.length >= 3) {
      const arabicData = json.data[0];
      const translationData = json.data[1];
      const audioData = json.data[2];

      const ayahs: Ayah[] = arabicData.ayahs.map((arAyah: any, idx: number) => {
        const transAyah = translationData?.ayahs?.[idx];
        const audAyah = audioData?.ayahs?.[idx];

        return {
          number: arAyah.number,
          numberInSurah: arAyah.numberInSurah,
          text: arAyah.text,
          translation: transAyah ? transAyah.text : '',
          audio: audAyah ? audAyah.audio : `https://cdn.islamic.network/quran/audio/128/${reciterApiId}/${arAyah.number}.mp3`,
          juz: arAyah.juz,
          page: arAyah.page,
          sajda: arAyah.sajda
        };
      });

      const detail: SurahDetail = {
        ...meta,
        ayahs
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(detail));
      } catch (quotaErr) {
        console.warn('Failed to cache in localStorage', quotaErr);
      }

      return detail;
    }
  } catch (err) {
    console.warn('Network request failed, checking fallback:', err);
  }

  // Fallback to pre-bundled data if available
  if (OFFLINE_SURAHS[surahNumber]) {
    return OFFLINE_SURAHS[surahNumber];
  }

  // Check any cached edition of this Surah in localStorage
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${CACHE_PREFIX}${surahNumber}_`)) {
        const item = localStorage.getItem(key);
        if (item) return JSON.parse(item);
      }
    }
  } catch {}

  throw new Error(`Unable to load Surah ${surahNumber}. Please connect to the internet once to cache this Surah.`);
}

export function isSurahAvailableOffline(surahNumber: number): boolean {
  if (OFFLINE_SURAHS[surahNumber]) return true;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${CACHE_PREFIX}${surahNumber}_`)) {
        return true;
      }
    }
  } catch {}
  return false;
}

export function getOfflineAvailableSurahs(): number[] {
  const surahsSet = new Set<number>(Object.keys(OFFLINE_SURAHS).map(Number));
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        const parts = key.replace(CACHE_PREFIX, '').split('_');
        const num = parseInt(parts[0], 10);
        if (!isNaN(num)) surahsSet.add(num);
      }
    }
  } catch {}
  return Array.from(surahsSet).sort((a, b) => a - b);
}

export async function downloadSurahForOffline(
  surahNumber: number,
  translationEdition = 'en.sahih',
  reciterApiId = 'ar.alafasy'
): Promise<boolean> {
  try {
    await fetchSurah(surahNumber, translationEdition, reciterApiId);
    return true;
  } catch (err) {
    console.warn(`Failed to pre-cache Surah ${surahNumber}:`, err);
    return false;
  }
}

export function getAyahAudioUrl(globalAyahNumber: number, reciterApiId = 'ar.alafasy'): string {
  return `https://cdn.islamic.network/quran/audio/128/${reciterApiId}/${globalAyahNumber}.mp3`;
}

export interface TafseerResult {
  text: string;
  source: string;
}

export async function fetchAyahTafseer(surahNumber: number, ayahNumber: number): Promise<TafseerResult> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/editions/ar.jalalayn,en.sahih`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data[0]) {
        return {
          text: json.data[0].text,
          source: 'Tafseer Al-Jalalayn (تفسير الجلالين)'
        };
      }
    }
  } catch (e) {
    console.warn('Tafseer fetch error:', e);
  }

  return {
    text: "Reflect upon this noble verse. For comprehensive classical commentary, refer to Tafseer Ibn Kathir or Tafseer As-Sa'di.",
    source: "Tafseer Reflection"
  };
}
