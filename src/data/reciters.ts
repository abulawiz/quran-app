import type { Reciter } from '../types/quran';

export const RECITERS_LIST: Reciter[] = [
  {
    id: 'okasha-kameny',
    name: 'Okasha Kameny',
    arabicName: 'عكاشة حسن كميني',
    subfolder: 'okasha-kameny',
    apiIdentifier: 'ar.okashakameny',
    style: 'Murattal (Albizi / African Maqamat)',
    bitrate: '128 kbps',
    serverUrl: 'https://cdn.mp3quran.net/audio/okasha-kameny/r2/'
  },
  {
    id: 'mishary-alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subfolder: 'Alafasy_128kbps',
    apiIdentifier: 'ar.alafasy',
    style: 'Murattal',
    bitrate: '128 kbps'
  },
  {
    id: 'mahmoud-al-husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    subfolder: 'Husary_128kbps',
    apiIdentifier: 'ar.husary',
    style: 'Murattal (Tajweed Standard)',
    bitrate: '128 kbps'
  },
  {
    id: 'abdul-basit-murattal',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    apiIdentifier: 'ar.abdulbasitmurattal',
    style: 'Murattal',
    bitrate: '192 kbps'
  },
  {
    id: 'abu-bakr-al-shatri',
    name: 'Abu Bakr Al-Shatri',
    arabicName: 'أبو بكر الشاطري',
    subfolder: 'Abu_Bakr_Ash-Shaatree_128kbps',
    apiIdentifier: 'ar.shaatree',
    style: 'Murattal',
    bitrate: '128 kbps'
  },
  {
    id: 'maher-al-muaiqly',
    name: 'Maher Al-Muaiqly',
    arabicName: 'ماهر المعيقلي',
    subfolder: 'Maher_AlMuaiqly_64kbps',
    apiIdentifier: 'ar.mahermuaiqly',
    style: 'Haram Makkah',
    bitrate: '128 kbps'
  },
  {
    id: 'abdur-rahman-as-sudais',
    name: 'Abdur-Rahman As-Sudais',
    arabicName: 'عبد الرحمن السديس',
    subfolder: 'Abdurrahmaan_As-Sudais_192kbps',
    apiIdentifier: 'ar.abdurrahmaansudais',
    style: 'Haram Makkah',
    bitrate: '192 kbps'
  },
  {
    id: 'mohamed-siddiq-el-minshawi',
    name: 'Mohamed Siddiq Al-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    subfolder: 'Minshawy_Murattal_128kbps',
    apiIdentifier: 'ar.minshawi',
    style: 'Murattal',
    bitrate: '128 kbps'
  },
  {
    id: 'saud-al-shuraim',
    name: 'Saud Al-Shuraim',
    arabicName: 'سعود الشريم',
    subfolder: 'Saood_ash-Shuraym_128kbps',
    apiIdentifier: 'ar.saoodshuraym',
    style: 'Haram Makkah',
    bitrate: '128 kbps'
  }
];

export const AVAILABLE_TRANSLATIONS = [
  { id: 'en.sahih', name: 'Saheeh International', language: 'English' },
  { id: 'en.khattab', name: 'The Clear Quran (Dr. Mustafa Khattab)', language: 'English' },
  { id: 'en.yusufali', name: 'Abdullah Yusuf Ali', language: 'English' },
  { id: 'fr.hamidullah', name: 'Muhammad Hamidullah', language: 'Français' },
  { id: 'ur.jalandhry', name: 'Fateh Muhammad Jalandhry', language: 'اردو' },
  { id: 'id.indonesian', name: 'Bahasa Indonesia', language: 'Indonesian' },
  { id: 'tr.diyanet', name: 'Diyanet İşleri', language: 'Türkçe' },
];
