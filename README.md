# Al-Qur'an Al-Kareem (القرآن الكريم)

<div align="center">

![Quran Icon](./public/quran-icon.svg)

### A Modern, Professional Quran Web Application & Progressive Web App (PWA)
*Recite, Reflect, Listen & Memorize with Authentic Medina Typography and Synchronized Audio*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38bdf8.svg)](https://tailwindcss.com)

</div>

---

## ✨ Features

- 📖 **Complete 114 Surahs & 30 Juz Browser**: Complete Arabic text, English transliterations, verse counts, revelation classification (Meccan/Medinan), and Juz mappings.
- 🎙️ **Synchronized Verse-by-Verse Audio**:
  - Highlights each reciting verse in real-time with smooth scrolling.
  - Interactive equalizer animation when audio is playing.
  - Steppers: Play/Pause, Next/Previous Ayah, and single verse repeat mode (ideal for Hifz/memorization).
  - Variable playback speed (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`).
- 🕌 **Renowned Qaris (Reciters)**:
  - Sheikh Mishary Rashid Alafasy (`مشاري بن راشد العفاسي`)
  - Sheikh Mahmoud Khalil Al-Husary (`محمود خليل الحصري`)
  - Sheikh Abdul Basit Abdul Samad (`عبد الباسط عبد الصمد`)
  - Sheikh Abu Bakr Al-Shatri (`أبو بكر الشاطري`)
  - Sheikh Maher Al-Muaiqly (`ماهر المعيقلي`)
  - Sheikh Abdur-Rahman As-Sudais (`عبد الرحمن السديس`)
  - Sheikh Mohamed Siddiq Al-Minshawi (`محمد صديق المنشاوي`)
  - Sheikh Saud Al-Shuraim (`سعود الشريم`)
- 🌐 **Multi-Edition Translations**:
  - Saheeh International, The Clear Quran (Dr. Mustafa Khattab), Abdullah Yusuf Ali, French (Muhammad Hamidullah), Urdu (Fateh Muhammad Jalandhry), Bahasa Indonesia, and Turkish (Diyanet).
- 🌓 **Instant Dark / Light Mode Toggle**:
  - Beautiful Islamic Emerald Light theme, Deep Velvet Night theme, and Warm Parchment mode.
- 💫 **Smooth Loading Splash Screen**:
  - Islamic calligraphy emblem with smooth animated loading progress.
- 📱 **Expo Go & Mobile Testing QR Hub**:
  - Real-time QR Code generator encoding your local network address for 1-tap testing with Expo Go / phone cameras.
  - Built-in camera scanner & image upload scanner powered by `jsQR`.
- 📿 **Interactive Digital Tasbih**:
  - Common Adhkar presets (*SubhanAllah*, *Alhamdulillah*, *Allahu Akbar*, *Astaghfirullah*, *La Ilaha Illallah*, *Salawat*).
  - Large tap button, vibration feedback, progress ring, and lifetime count tracker.
- 🕋 **Prayer Times**:
  - Accurate calculations for Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.
- 🔖 **Bookmarks & Resume Reading**:
  - Save verses for reflection; automatically remembers your last-read Ayah.
- ⚡ **Offline Resilience & PWA**:
  - Embedded offline dataset for key Surahs (*Al-Fatihah*, *Al-Ikhlas*, *Al-Falaq*, *An-Nas*) and Web App Manifest.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/abulawiz/quran-app.git

# Navigate into the project directory
cd quran-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

The production assets will be output to the `dist/` folder, ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 📱 Mobile & Expo Go Testing

1. Ensure your computer and smartphone are on the same Wi-Fi network.
2. In the app, click the **Expo / QR** button in the navigation bar.
3. Open **Expo Go** or your phone camera and scan the generated QR code.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
