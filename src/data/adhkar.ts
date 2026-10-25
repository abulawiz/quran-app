export interface DhikrItem {
  id: string;
  category: 'morning' | 'evening' | 'after-prayer' | 'sleep';
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  repeat: number;
  source: string;
  benefit: string;
}

export const ADHKAR_LIST: DhikrItem[] = [
  // --- MORNING ADHKAR ---
  {
    id: 'm-1',
    category: 'morning',
    title: 'Ayat al-Kursi (The Verse of the Throne)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuheetoona bi-shay'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'ooduhu hifdhuhuma, wa Huwal-'Aliyyul-'Adheem.",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...",
    repeat: 1,
    source: 'Surah Al-Baqarah (2:255) / Al-Hakim 1/562',
    benefit: 'Whoever recites this when he rises in the morning will be protected from the jinn and all evil until evening.'
  },
  {
    id: 'm-2',
    category: 'morning',
    title: 'Al-Mu’awwidhat (Surah Al-Ikhlas, Al-Falaq, An-Nas)',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    transliteration: 'Qul Huwa Allahu Ahad... / Qul A\'oodhu Bi-Rabbil-Falaq... / Qul A\'oodhu Bi-Rabbin-Naas...',
    translation: 'Say, "He is Allah, [who is] One..." / "I seek refuge in the Lord of daybreak..." / "I seek refuge in the Lord of mankind..."',
    repeat: 3,
    source: 'Abu Dawud 5082, At-Tirmidhi 3575',
    benefit: 'Reciting them three times in the morning and evening will suffice you against all harm.'
  },
  {
    id: 'm-3',
    category: 'morning',
    title: 'Entering the Morning in Allah’s Kingdom',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadeer. Rabbi as'aluka khayra ma fee hadhal-yawmi wa khayra ma ba'dahu, wa a'oodhu bika min sharri ma fee hadhal-yawmi wa sharri ma ba'dahu, Rabbi a'oodhu bika minal-kasali wa soo'il-kibar, Rabbi a'oodhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
    translation: "We have reached the morning and the kingdom belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner. To Him belongs the dominion and to Him belongs praise, and He has power over all things...",
    repeat: 1,
    source: 'Sahih Muslim 2723',
    benefit: 'A comprehensive morning declaration of Allah’s sovereignty and supplication for safety.'
  },
  {
    id: 'm-4',
    category: 'morning',
    title: 'Sayyidul Istighfar (The Master Supplication for Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
    transliteration: "Allahumma Anta Rabbi la ilaha illa Ant, khalaqtanee wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'oodhu bika min sharri ma sana't, aboo'u laka bini'matika 'alayya, wa aboo'u bidhambee faghfir lee fa-innahu la yaghfirudh-dhunooba illa Ant.",
    translation: "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I uphold Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I confess my sins, so forgive me, for none forgives sins except You.",
    repeat: 1,
    source: 'Sahih al-Bukhari 6306',
    benefit: 'Whoever recites this with firm conviction in the morning and dies that day before evening will be among the people of Paradise.'
  },
  {
    id: 'm-5',
    category: 'morning',
    title: 'Protection in the Name of Allah',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
    transliteration: "Bismillahil-ladhee la yadurru ma'asmihi shay'un fil-ardi wa la fis-samaa'i wa Huwas-Samee'ul-'Aleem.",
    translation: "In the name of Allah, with Whose name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    repeat: 3,
    source: 'Abu Dawud 5088, At-Tirmidhi 3388',
    benefit: 'Whoever says this three times in the morning, nothing will harm him until evening.'
  },
  {
    id: 'm-6',
    category: 'morning',
    title: 'Pleased with Allah, Islam & the Prophet ﷺ',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
    transliteration: "Radeetu billahi Rabba, wa bil-Islami deena, wa bi-Muhammadin sallallahu 'alayhi wa sallama Nabiyya.",
    translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.",
    repeat: 3,
    source: 'Abu Dawud 5072, At-Tirmidhi 3389',
    benefit: 'Allah has promised that whoever says this three times in the morning and evening, He will surely please him on the Day of Resurrection.'
  },
  {
    id: 'm-7',
    category: 'morning',
    title: 'Seeking Health & Protection of the Senses',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ.',
    transliteration: "Allahumma 'aafinee fee badanee, Allahumma 'aafinee fee sam'ee, Allahumma 'aafinee fee basaree, la ilaha illa Ant. Allahumma innee a'oodhu bika minal-kufri wal-faqr, wa a'oodhu bika min 'adhabil-qabr, la ilaha illa Ant.",
    translation: "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no deity except You. O Allah, I seek refuge in You from disbelief and poverty, and from the punishment of the grave...",
    repeat: 3,
    source: 'Abu Dawud 5090, Ahmad 5/42',
    benefit: 'Sunnah supplication recited 3 times morning and evening for physical and spiritual preservation.'
  },
  {
    id: 'm-8',
    category: 'morning',
    title: 'Sufficiency in Allah (Hasbiyallahu)',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
    transliteration: "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Adheem.",
    translation: "Allah is sufficient for me. None has the right to be worshipped except Him. In Him I put my trust, and He is the Lord of the Mighty Throne.",
    repeat: 7,
    source: 'Abu Dawud 5081, Ibn As-Sunni 71',
    benefit: 'Whoever recites this seven times in the morning and evening, Allah will suffice him in all worldly and religious matters that concern him.'
  },
  {
    id: 'm-9',
    category: 'morning',
    title: 'Glorifying Allah by the Number of His Creation',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
    transliteration: "Subhanallahi wa bihamdih, 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatih.",
    translation: "Glory be to Allah and praise be to Him, by the number of His creation, by His pleasure, by the weight of His Throne, and by the ink of His words.",
    repeat: 3,
    source: 'Sahih Muslim 2726',
    benefit: 'Equivalent to hours of continuous remembrance in reward and blessing.'
  },
  {
    id: 'm-10',
    category: 'morning',
    title: 'Asking for Beneficial Knowledge and Pure Provision',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.',
    transliteration: "Allahumma innee as'aluka 'ilman naafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbala.",
    translation: "O Allah, I ask You for beneficial knowledge, wholesome provision, and deeds that are accepted.",
    repeat: 1,
    source: 'Ibn Majah 925, Sahih',
    benefit: 'Said by the Prophet ﷺ each morning after Salatul Fajr.'
  },

  // --- EVENING ADHKAR ---
  {
    id: 'e-1',
    category: 'evening',
    title: 'Ayat al-Kursi (Evening Protection)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...",
    repeat: 1,
    source: 'Surah Al-Baqarah (2:255) / Al-Hakim 1/562',
    benefit: 'Whoever recites this when he enters the evening will be protected from the jinn and all harm until morning.'
  },
  {
    id: 'e-2',
    category: 'evening',
    title: 'Al-Mu’awwidhat (Evening Recitation)',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ ...\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ ...\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ ...',
    transliteration: 'Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas (Recite each 3 times)',
    translation: 'Recite each of the three protective Surahs 3 times.',
    repeat: 3,
    source: 'Abu Dawud 5082, At-Tirmidhi 3575',
    benefit: 'Protects against evil eye, envy, witchcraft, and all harms through the night.'
  },
  {
    id: 'e-3',
    category: 'evening',
    title: 'Entering the Evening in Allah’s Kingdom',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
    transliteration: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamd, wa Huwa 'ala kulli shay'in Qadeer. Rabbi as'aluka khayra ma fee hadhihil-laylati wa khayra ma ba'daha, wa a'oodhu bika min sharri ma fee hadhihil-laylati wa sharri ma ba'daha...",
    translation: "We have reached the evening and the kingdom belongs to Allah, and all praise is for Allah...",
    repeat: 1,
    source: 'Sahih Muslim 2723',
    benefit: 'Evening declaration of submission to Allah and seeking refuge from the evils of the night.'
  },
  {
    id: 'e-4',
    category: 'evening',
    title: 'Seeking Refuge in Allah’s Perfect Words',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
    transliteration: "A'oodhu bi-kalimatil-lahit-tammati min sharri ma khalaq.",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    repeat: 3,
    source: 'Sahih Muslim 2709',
    benefit: 'Whoever recites this three times in the evening, no poisonous creature or scorpion will harm him that night.'
  },
  {
    id: 'e-5',
    category: 'evening',
    title: 'Sayyidul Istighfar (Evening Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
    transliteration: "Allahumma Anta Rabbi la ilaha illa Ant...",
    translation: "O Allah, You are my Lord, there is no deity except You...",
    repeat: 1,
    source: 'Sahih al-Bukhari 6306',
    benefit: 'Whoever recites this with firm faith in the evening and dies that night before morning will enter Paradise.'
  },
  {
    id: 'e-6',
    category: 'evening',
    title: 'Evening Protection in Allah’s Name',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
    transliteration: "Bismillahil-ladhee la yadurru ma'asmihi shay'un fil-ardi wa la fis-samaa'i wa Huwas-Samee'ul-'Aleem.",
    translation: "In the name of Allah, with Whose name nothing can cause harm in the earth nor in the heaven...",
    repeat: 3,
    source: 'Abu Dawud 5088, At-Tirmidhi 3388',
    benefit: 'Recite 3 times in the evening for complete night protection.'
  },

  // --- POST-PRAYER ADHKAR ---
  {
    id: 'p-1',
    category: 'after-prayer',
    title: 'Astaghfirullah & As-Salam',
    arabic: 'أَسْتَغْفِرُ اللَّهَ (٣×)\nاللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.',
    transliteration: "Astaghfirullah (3 times). Allahumma Antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
    translation: "I seek the forgiveness of Allah (3x). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.",
    repeat: 1,
    source: 'Sahih Muslim 591',
    benefit: 'Recited immediately following the tasleem of every obligatory prayer.'
  },
  {
    id: 'p-2',
    category: 'after-prayer',
    title: 'Tasbih, Tahmid, and Takbir (33x each)',
    arabic: 'سُبْحَانَ اللَّهِ (٣٣×) • الْحَمْدُ لِلَّهِ (٣٣×) • اللَّهُ أَكْبَرُ (٣٣×)\nلَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ.',
    transliteration: "Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x), completed with La ilaha illallahu wahdahu la shareeka lah...",
    translation: "Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x), followed by the declaration of Tawheed.",
    repeat: 33,
    source: 'Sahih Muslim 597',
    benefit: 'Whoever recites this after every prayer will have their sins forgiven even if they are like the foam of the sea.'
  },

  // --- SLEEP ADHKAR ---
  {
    id: 's-1',
    category: 'sleep',
    title: 'Surah Al-Mulk (The Sovereignty)',
    arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ۝ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ...',
    transliteration: "Tabaraka alladhee biyadihil-mulku wa Huwa 'ala kulli shay'in Qadeer...",
    translation: "Blessed is He in whose hand is dominion, and He is over all things competent...",
    repeat: 1,
    source: 'At-Tirmidhi 2891, Sahih',
    benefit: 'Surah Al-Mulk protects the believer from the punishment of the grave when recited before sleeping.'
  },
  {
    id: 's-2',
    category: 'sleep',
    title: 'Supplication Before Sleeping',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
    transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa-in amsakta nafsi farhamha, wa in arsaltaha fahfadh-ha bima tahfadhu bihi 'ibadakas-saliheen.",
    translation: "In Your name my Lord, I lie down, and in Your name I rise. If You should take my soul then have mercy upon it, and if You should return it then protect it as You protect Your righteous slaves.",
    repeat: 1,
    source: 'Sahih al-Bukhari 6320, Muslim 2714',
    benefit: 'Said when retiring to bed for peace and divine protection of the soul.'
  }
];
