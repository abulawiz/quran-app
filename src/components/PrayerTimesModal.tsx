import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

interface PrayerTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const CITIES = [
  { name: 'Makkah (Mecca)', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah (Medina)', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
];

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [timings, setTimings] = useState<Timings>({
    Fajr: '05:04',
    Sunrise: '06:22',
    Dhuhr: '12:15',
    Asr: '15:38',
    Maghrib: '18:07',
    Isha: '19:37',
  });

  useEffect(() => {
    if (!isOpen) return;
    fetch(`https://api.aladhan.com/v1/timings?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&method=4`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.timings) {
          setTimings(data.data.timings);
        }
      })
      .catch((e) => console.warn('Prayer times error:', e));
  }, [isOpen, selectedCity]);

  if (!isOpen) return null;

  const prayerList = [
    { name: 'Fajr', arabic: 'الفجر', time: timings.Fajr },
    { name: 'Sunrise', arabic: 'الشروق', time: timings.Sunrise },
    { name: 'Dhuhr', arabic: 'الظهر', time: timings.Dhuhr },
    { name: 'Asr', arabic: 'العصر', time: timings.Asr },
    { name: 'Maghrib', arabic: 'المغرب', time: timings.Maghrib },
    { name: 'Isha', arabic: 'العشاء', time: timings.Isha },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#0d1620] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Prayer Times (مواقيت الصلاة)
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Select City
            </label>
            <select
              value={selectedCity.name}
              onChange={(e) => {
                const found = CITIES.find((c) => c.name === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:outline-none"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            {prayerList.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{p.name}</span>
                  <span className="font-arabic text-emerald-700 dark:text-emerald-400 text-sm">{p.arabic}</span>
                </div>
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
