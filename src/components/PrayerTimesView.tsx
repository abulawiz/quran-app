import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  MapPin, 
  Compass, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Navigation
} from 'lucide-react';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const CITIES = [
  { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  { name: 'Abuja', country: 'Nigeria', lat: 9.0765, lng: 7.3986 },
];

export const PrayerTimesView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [timings, setTimings] = useState<Timings>({
    Fajr: '05:04',
    Sunrise: '06:22',
    Dhuhr: '12:15',
    Asr: '15:38',
    Maghrib: '18:07',
    Isha: '19:37',
  });
  const [hijriDate, setHijriDate] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; countdown: string }>({
    name: 'Dhuhr',
    time: '12:15',
    countdown: '00:00:00',
  });
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);
  const adhanAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&method=4`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          if (data.data.timings) setTimings(data.data.timings);
          if (data.data.date?.hijri) {
            const h = data.data.date.hijri;
            setHijriDate(`${h.day} ${h.month.en} ${h.year} AH`);
          }
        }
      })
      .catch((e) => console.warn('Prayer times fetch error:', e));
  }, [selectedCity]);

  // Next prayer countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Sunrise', time: timings.Sunrise },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
      ];

      for (const p of prayers) {
        const [h, m] = p.time.split(':').map(Number);
        const pDate = new Date();
        pDate.setHours(h, m, 0, 0);

        if (pDate.getTime() > now.getTime()) {
          const diffMs = pDate.getTime() - now.getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

          setNextPrayer({
            name: p.name,
            time: p.time,
            countdown: `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`,
          });
          return;
        }
      }

      // If all passed, next is Fajr tomorrow
      setNextPrayer({
        name: 'Fajr',
        time: timings.Fajr,
        countdown: 'Tomorrow',
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  // Audio Adhan Preview
  const toggleAdhan = () => {
    if (isPlayingAdhan) {
      if (adhanAudioRef.current) {
        adhanAudioRef.current.pause();
        adhanAudioRef.current.currentTime = 0;
      }
      setIsPlayingAdhan(false);
    } else {
      if (!adhanAudioRef.current) {
        adhanAudioRef.current = new Audio('https://cdn.islamic.network/adhan/makkah.mp3');
        adhanAudioRef.current.onended = () => setIsPlayingAdhan(false);
      }
      adhanAudioRef.current.play().then(() => setIsPlayingAdhan(true)).catch(console.warn);
    }
  };

  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSelectedCity({
          name: 'My Current Location',
          country: 'GPS Location',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  };

  const prayerSchedule = [
    { name: 'Fajr', arabic: 'الفجر', time: timings.Fajr, desc: 'Dawn Prayer' },
    { name: 'Sunrise', arabic: 'الشروق', time: timings.Sunrise, desc: 'Shurooq' },
    { name: 'Dhuhr', arabic: 'الظهر', time: timings.Dhuhr, desc: 'Noon Prayer' },
    { name: 'Asr', arabic: 'العصر', time: timings.Asr, desc: 'Afternoon Prayer' },
    { name: 'Maghrib', arabic: 'المغرب', time: timings.Maghrib, desc: 'Sunset Prayer' },
    { name: 'Isha', arabic: 'العشاء', time: timings.Isha, desc: 'Night Prayer' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-36 px-1 sm:px-0">
      
      {/* Hero Prayer Countdown Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-[#032e22] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/30">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/50 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{hijriDate || 'Islamic Calendar'}</span>
            </div>

            <p className="text-xs text-emerald-200/80 font-medium">Next Prayer in {selectedCity.name}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-0.5">
              {nextPrayer.name} at {nextPrayer.time}
            </h1>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 mt-2 tracking-wider">
              {nextPrayer.countdown}
            </p>
          </div>

          {/* Adhan Audio Button & GPS Button */}
          <div className="flex flex-col gap-2 shrink-0 self-start sm:self-center">
            <button
              onClick={toggleAdhan}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                isPlayingAdhan
                  ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-400/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {isPlayingAdhan ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAdhan ? 'Stop Adhan' : 'Listen to Adhan'}</span>
            </button>

            <button
              onClick={handleUseMyLocation}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium border border-white/10 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-300" />
              <span>Use GPS Location</span>
            </button>
          </div>
        </div>
      </div>

      {/* City Selector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            City:
          </span>
        </div>
        <select
          value={selectedCity.name}
          onChange={(e) => {
            const found = CITIES.find((c) => c.name === e.target.value);
            if (found) setSelectedCity(found);
          }}
          className="flex-1 max-w-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}, {c.country}
            </option>
          ))}
        </select>
      </div>

      {/* 5 Daily Prayers Schedule Grid */}
      <div className="space-y-3">
        {prayerSchedule.map((p) => {
          const isNext = nextPrayer.name === p.name;

          return (
            <div
              key={p.name}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between ${
                isNext
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0f1924]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  isNext ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{p.name}</h3>
                    {isNext && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-300">
                  {p.arabic}
                </span>
                <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                  {p.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Qibla Direction Information Box */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-300/30 dark:border-amber-700/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Qibla Direction</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Direction towards the Holy Ka'bah in Makkah</p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30">
          Orient to Makkah
        </span>
      </div>

    </div>
  );
};
