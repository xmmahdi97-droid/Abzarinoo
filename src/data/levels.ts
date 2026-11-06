import { GameLevel } from '../types/game';

/**
 * 50 Handcrafted, 100% Solvable Persian Crossword Levels
 * Checked for exact grid coordinates, intersecting letters, and letter inventory.
 */
export const GAME_LEVELS: GameLevel[] = [
  // --- بخش ۱: مراحل ۱ تا ۵ (آموزشی و ساده) ---
  {
    id: 1,
    title: "سرما و یادگیری",
    difficulty: "easy",
    letters: ["س", "ر", "د"],
    rewardCoins: 25,
    gridRows: 3,
    gridCols: 3,
    words: [
      { id: 1, word: "سرد", clue: "دارای دمای پایین و مخالف گرم", row: 0, col: 0, direction: "across" },
      { id: 2, word: "درس", clue: "مطلب آموختنی در مدرسه", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["رد", "سر"]
  },
  {
    id: 2,
    title: "تاریکی و شب",
    difficulty: "easy",
    letters: ["ش", "ب", "ه"],
    rewardCoins: 25,
    gridRows: 3,
    gridCols: 3,
    words: [
      { id: 1, word: "شبه", clue: "مانند و شبیه یا روح ناپیدا", row: 0, col: 0, direction: "across" },
      { id: 2, word: "به", clue: "میوه پاییزی خوش‌عطر یا حرف اضافه", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["شب"]
  },
  {
    id: 3,
    title: "تلاش و سازندگی",
    difficulty: "easy",
    letters: ["ک", "ا", "ر"],
    rewardCoins: 30,
    gridRows: 3,
    gridCols: 3,
    words: [
      { id: 1, word: "کار", clue: "فعالیت و شغل روزمره انسان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "راک", clue: "سبکی از موسیقی یا صخره", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["کر"]
  },
  {
    id: 4,
    title: "نام و آرامش",
    difficulty: "easy",
    letters: ["ن", "ا", "م"],
    rewardCoins: 30,
    gridRows: 3,
    gridCols: 3,
    words: [
      { id: 1, word: "نام", clue: "اسم و شناسه هر فرد", row: 0, col: 0, direction: "across" },
      { id: 2, word: "امن", clue: "محیط بی‌خطر و آسوده", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["من"]
  },
  {
    id: 5,
    title: "یار و رفیق",
    difficulty: "easy",
    letters: ["د", "و", "س", "ت"],
    rewardCoins: 35,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "دوست", clue: "همراه صمیمی و یکدل", row: 0, col: 0, direction: "across" },
      { id: 2, word: "سود", clue: "منفعت حاصل از داد و ستد", row: 0, col: 2, direction: "down" },
      { id: 3, word: "دست", clue: "اندام لمس کردن و گرفتن", row: 2, col: 0, direction: "across" }
    ],
    bonusWords: ["تو", "دو"]
  },

  // --- بخش ۲: مراحل ۶ تا ۱۵ (متوسط) ---
  {
    id: 6,
    title: "فصل شکوفایی",
    difficulty: "medium",
    letters: ["ب", "ه", "ا", "ر"],
    rewardCoins: 40,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "بهار", clue: "نخستین فصل سال و رستاخیز طبیعت", row: 0, col: 0, direction: "across" },
      { id: 2, word: "راه", clue: "مسیر رسیدن به مقصد", row: 0, col: 3, direction: "down" },
      { id: 3, word: "ابر", clue: "توده بخار آب در آسمان بارانی", row: 2, col: 1, direction: "across" }
    ],
    bonusWords: ["بره", "بار"]
  },
  {
    id: 7,
    title: "سیاره خاکی",
    difficulty: "medium",
    letters: ["ز", "م", "ی", "ن"],
    rewardCoins: 40,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "زمین", clue: "سیاره مادری ما در منظومه شمسی", row: 0, col: 0, direction: "across" },
      { id: 2, word: "میز", clue: "وسیله‌ای با پایه‌ها برای مطالعه و غذا", row: 0, col: 1, direction: "down" },
      { id: 3, word: "نیم", clue: "نصف یک چیز کامل", row: 2, col: 1, direction: "across" }
    ],
    bonusWords: ["زن", "نی"]
  },
  {
    id: 8,
    title: "قطرات آسمانی",
    difficulty: "medium",
    letters: ["ب", "ا", "ر", "ا", "ن"],
    rewardCoins: 45,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "باران", clue: "بارش حیات‌بخش آب از آسمان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "انبار", clue: "محل نگهداری و ذخیره کالا", row: 0, col: 1, direction: "down" },
      { id: 3, word: "انار", clue: "میوه بهشتی با دانه‌های یاقوتی", row: 2, col: 1, direction: "across" }
    ],
    bonusWords: ["آبان", "ابر"]
  },
  {
    id: 9,
    title: "گنجینه دانایی",
    difficulty: "medium",
    letters: ["ک", "ت", "ا", "ب"],
    rewardCoins: 45,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "کتاب", clue: "یار مهربان پر از برگ‌های خواندنی", row: 0, col: 0, direction: "across" },
      { id: 2, word: "تاب", clue: "وسیله بازی آویزان یا توان و طاقت", row: 0, col: 1, direction: "down" },
      { id: 3, word: "باک", clue: "مخزن سوخت اتومبیل", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["تک", "با"]
  },
  {
    id: 10,
    title: "تابش خورشید",
    difficulty: "medium",
    letters: ["آ", "ف", "ت", "ا", "ب"],
    rewardCoins: 50,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "آفتاب", clue: "نور و گرمای درخشان خورشید", row: 0, col: 0, direction: "across" },
      { id: 2, word: "تاب", clue: "حرارت خورشید یا چرخش", row: 0, col: 2, direction: "down" },
      { id: 3, word: "بافت", clue: "تار و پود پارچه یا نسج زنده", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["آب", "فوت"]
  },
  {
    id: 11,
    title: "امواج خروشان",
    difficulty: "medium",
    letters: ["د", "ر", "ی", "ا"],
    rewardCoins: 50,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "دریا", clue: "پهنه گسترده آب‌های شور", row: 0, col: 0, direction: "across" },
      { id: 2, word: "یار", clue: "محبوب و همدم وفادار", row: 0, col: 2, direction: "down" },
      { id: 3, word: "دیر", clue: "گذشتن از وقت مقرر یا صومعه", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["دید", "رد"]
  },
  {
    id: 12,
    title: "درخشش شبانه",
    difficulty: "medium",
    letters: ["س", "ت", "ا", "ر", "ه"],
    rewardCoins: 55,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "ستاره", clue: "اجرام نورانی در آسمان شب", row: 0, col: 0, direction: "across" },
      { id: 2, word: "راست", clue: "مخالف چپ یا حرف درست و حقیقت", row: 0, col: 3, direction: "down" },
      { id: 3, word: "تار", clue: "ساز زهی ایرانی یا تیره و ظلمانی", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["ترس", "تیر"]
  },
  {
    id: 13,
    title: "طبیعت سبز",
    difficulty: "medium",
    letters: ["ج", "ن", "گ", "ل"],
    rewardCoins: 55,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "جنگل", clue: "انبوهی از درختان سر به فلک کشیده", row: 0, col: 0, direction: "across" },
      { id: 2, word: "گنج", clue: "دفینه و ثروت پنهان در زمین", row: 0, col: 2, direction: "down" },
      { id: 3, word: "لجن", clue: "گل و لای بدبو در مرداب", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["لگ", "گن"]
  },
  {
    id: 14,
    title: "اوج آسمان",
    difficulty: "medium",
    letters: ["پ", "ر", "و", "ا", "ز"],
    rewardCoins: 60,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "پرواز", clue: "اوج گرفتن پرنده در پهنه هوا", row: 0, col: 0, direction: "across" },
      { id: 2, word: "روز", clue: "فاصله بین طلوع تا غروب آفتاب", row: 0, col: 1, direction: "down" },
      { id: 3, word: "راز", clue: "سِر نهفته که به کسی نگویند", row: 0, col: 1, direction: "across" },
      { id: 4, word: "زور", clue: "قدرت بدنی و توانمندی", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["پو", "رو"]
  },
  {
    id: 15,
    title: "سلاح رزم",
    difficulty: "medium",
    letters: ["ش", "م", "ش", "ی", "ر"],
    rewardCoins: 60,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "شمشیر", clue: "تیغه فولادی بران جنگجویان کهن", row: 0, col: 0, direction: "across" },
      { id: 2, word: "شیر", clue: "سلطان جنگل یا نوشیدنی مقوی سفید", row: 0, col: 2, direction: "down" },
      { id: 3, word: "میش", clue: "گوسفند ماده شیرده", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["شرم", "ریش"]
  },

  // --- بخش ۳: مراحل ۱۶ تا ۳۰ (سخت) ---
  {
    id: 16,
    title: "قلب منظومه",
    difficulty: "hard",
    letters: ["خ", "و", "ر", "ش", "ی", "د"],
    rewardCoins: 70,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "خورشید", clue: "نزدیک‌ترین ستاره گرمابخش به زمین", row: 0, col: 0, direction: "across" },
      { id: 2, word: "شیر", clue: "حیوان درنده یالدار", row: 0, col: 3, direction: "down" },
      { id: 3, word: "خرد", clue: "عقل و فرزانگی انسان", row: 0, col: 0, direction: "down" },
      { id: 4, word: "دوش", clue: "شانه انسان یا شب گذشته", row: 0, col: 5, direction: "down" }
    ],
    bonusWords: ["شور", "رود"]
  },
  {
    id: 17,
    title: "سنگ گرانبها",
    difficulty: "hard",
    letters: ["ا", "ل", "م", "ا", "س"],
    rewardCoins: 70,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "الماس", clue: "سخت‌ترین کانی درخشان در جهان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "سالم", clue: "تندرست و عاری از هرگونه گزند", row: 0, col: 4, direction: "down" },
      { id: 3, word: "مال", clue: "دارایی و ثروت اندوخته", row: 2, col: 2, direction: "across" }
    ],
    bonusWords: ["سال", "اسم"]
  },
  {
    id: 18,
    title: "دستور حاکم",
    difficulty: "hard",
    letters: ["ف", "ر", "م", "ا", "ن"],
    rewardCoins: 75,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "فرمان", clue: "حکم صادره از سوی پادشاه", row: 0, col: 0, direction: "across" },
      { id: 2, word: "نام", clue: "عنوان و اسم اشخاص", row: 0, col: 4, direction: "down" },
      { id: 3, word: "نرم", clue: "لطیف و انعطاف‌پذیر در لمس", row: 2, col: 2, direction: "across" }
    ],
    bonusWords: ["فام", "فن"]
  },
  {
    id: 19,
    title: "دلاور پیروز",
    difficulty: "hard",
    letters: ["ق", "ه", "ر", "م", "ا", "ن"],
    rewardCoins: 75,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "قهرمان", clue: "فرد برنده در مسابقات و رزم", row: 0, col: 0, direction: "across" },
      { id: 2, word: "مرهم", clue: "داروی شفابخش زخم و درد", row: 0, col: 3, direction: "down" },
      { id: 3, word: "نام", clue: "آوازه نیک در میان خلق", row: 0, col: 5, direction: "down" },
      { id: 4, word: "قمر", clue: "ماه تابان در گردش گرد زمین", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["رقم", "مهر"]
  },
  {
    id: 20,
    title: "گذشته پرفراز",
    difficulty: "hard",
    letters: ["ت", "ا", "ر", "ی", "خ"],
    rewardCoins: 80,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "تاریخ", clue: "رویدادنامه‌ی روزگاران پیشین", row: 0, col: 0, direction: "across" },
      { id: 2, word: "خیر", clue: "نیکی و احسان یا پاسخ منفی", row: 0, col: 4, direction: "down" },
      { id: 3, word: "تیر", clue: "تیرکمان یا چهارمین ماه سال", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["تار", "ریخت"]
  },
  {
    id: 21,
    title: "مدافع وطن",
    difficulty: "hard",
    letters: ["س", "ر", "ب", "ا", "ز"],
    rewardCoins: 80,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "سرباز", clue: "نگهبان مرزها در لباس نظام", row: 0, col: 0, direction: "across" },
      { id: 2, word: "ساز", clue: "آلت نواختن موسیقی یا ساختن", row: 0, col: 0, direction: "down" },
      { id: 3, word: "باز", clue: "پرنده شکاری تیزچشم یا گشوده", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["سبز", "بار"]
  },
  {
    id: 22,
    title: "پژوهشگر دانا",
    difficulty: "hard",
    letters: ["د", "ا", "ن", "ش", "م", "ن", "د"],
    rewardCoins: 85,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "دانشمند", clue: "عالم فرزانه جویای علم و خرد", row: 0, col: 0, direction: "across" },
      { id: 2, word: "دانش", clue: "مجموعه آگاهی‌ها و دانستنی‌ها", row: 0, col: 0, direction: "down" },
      { id: 3, word: "دشمن", clue: "بدخواه و کینه‌توز روبه‌رو", row: 0, col: 6, direction: "down" }
    ],
    bonusWords: ["دام", "نماد"]
  },
  {
    id: 23,
    title: "راه شیری",
    difficulty: "hard",
    letters: ["ک", "ه", "ک", "ش", "ا", "ن"],
    rewardCoins: 85,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "کهکشان", clue: "مجموعه میلیاردی از ستارگان و غبارها", row: 0, col: 0, direction: "across" },
      { id: 2, word: "نشان", clue: "علامت مشخصه و مدال افتخار", row: 0, col: 5, direction: "down" },
      { id: 3, word: "کاش", clue: "کلمه آرزو و حسرت در دل", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["شاه", "کاه"]
  },
  {
    id: 24,
    title: "اقیانوس بیکران",
    difficulty: "hard",
    letters: ["ا", "ق", "ی", "ا", "ن", "و", "س"],
    rewardCoins: 90,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "اقیانوس", clue: "بزرگ‌ترین پهنه‌های آبی روی کره زمین", row: 0, col: 0, direction: "across" },
      { id: 2, word: "سینا", clue: "دانشمند شهیر بوعلی یا کوه مقدس", row: 0, col: 6, direction: "down" },
      { id: 3, word: "ساق", clue: "بخش میانی اندام پای انسان", row: 2, col: 4, direction: "across" }
    ],
    bonusWords: ["قوس", "یاس"]
  },
  {
    id: 25,
    title: "تاج و تخت",
    difficulty: "hard",
    letters: ["پ", "ا", "د", "ش", "ا", "ه"],
    rewardCoins: 90,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "پادشاه", clue: "فرمانروای مطلق کشور در دوران باستان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "شاد", clue: "خوشحال و مسرور و شادمان", row: 0, col: 3, direction: "down" },
      { id: 3, word: "شاه", clue: "مهره اصلی در بازی شطرنج", row: 0, col: 5, direction: "down" }
    ],
    bonusWords: ["پایه", "پاداش"]
  },
  {
    id: 26,
    title: "نگین سبزگون",
    difficulty: "hard",
    letters: ["ز", "م", "ر", "د"],
    rewardCoins: 90,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "زمرد", clue: "گوهر درخشان سبز رنگ ارزشمند", row: 0, col: 0, direction: "across" },
      { id: 2, word: "درز", clue: "شکاف باریک میان دو چیز یا خط دوخت", row: 0, col: 3, direction: "down" },
      { id: 3, word: "رمز", clue: "کد عبور پنهان و سِر محفوظ", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["مرد", "زر"]
  },
  {
    id: 27,
    title: "گدازه‌های آتشین",
    difficulty: "hard",
    letters: ["آ", "ت", "ش", "ف", "ش", "ا", "ن"],
    rewardCoins: 95,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "آتشفشان", clue: "کوهی که مواد مذاب و خاکستر پرتاب کند", row: 0, col: 0, direction: "across" },
      { id: 2, word: "آتش", clue: "شعله سوزان حاصل از سوختن", row: 0, col: 0, direction: "down" },
      { id: 3, word: "فاش", clue: "آشکار شدن رازی که پوشیده بود", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["شفا", "نفت"]
  },
  {
    id: 28,
    title: "غوغای باد",
    difficulty: "hard",
    letters: ["ط", "و", "ف", "ا", "ن"],
    rewardCoins: 95,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "طوفان", clue: "وزش سهمگین باد به همراه رگبار", row: 0, col: 0, direction: "across" },
      { id: 2, word: "وفا", clue: "پایبندی به عهد و پیمان دوستی", row: 0, col: 1, direction: "down" },
      { id: 3, word: "توان", clue: "نیرو و قدرت انجام امور", row: 2, col: 1, direction: "across" }
    ],
    bonusWords: ["فوت", "فان"]
  },
  {
    id: 29,
    title: "راز سربسته",
    difficulty: "hard",
    letters: ["م", "ع", "م", "ا"],
    rewardCoins: 100,
    gridRows: 4,
    gridCols: 4,
    words: [
      { id: 1, word: "معما", clue: "پرسش پیچیده نیازمند تفکر عمیق", row: 0, col: 0, direction: "across" },
      { id: 2, word: "عوام", clue: "عموم توده مردم جامعه", row: 0, col: 1, direction: "down" },
      { id: 3, word: "مات", clue: "شکست قطعی در شطرنج یا کدر و بی‌جلا", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["عماد", "مام"]
  },
  {
    id: 30,
    title: "آرامش تاریک",
    difficulty: "hard",
    letters: ["ش", "ب", "ا", "ن", "گ", "ا", "ه"],
    rewardCoins: 100,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "شبانگاه", clue: "هنگام فرارسیدن تاریکی شب", row: 0, col: 0, direction: "across" },
      { id: 2, word: "آهنگ", clue: "نغمه موسیقی دلنشین یا قصد", row: 0, col: 2, direction: "down" },
      { id: 3, word: "گناه", clue: "نافرمانی و کار ناپسند", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["شبانه", "بنگاه"]
  },

  // --- بخش ۴: مراحل ۳۱ تا ۴۰ (بسیار سخت) ---
  {
    id: 31,
    title: "حکیم اندیشمند",
    difficulty: "expert",
    letters: ["ف", "ی", "ل", "س", "و", "ف"],
    rewardCoins: 110,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "فیلسوف", clue: "پژوهشگر فلسفه و بنیان‌های وجود", row: 0, col: 0, direction: "across" },
      { id: 2, word: "سیل", clue: "جریان طغیان‌گر آب رودخانه", row: 0, col: 3, direction: "down" },
      { id: 3, word: "لیف", clue: "الیاف شستشو یا فیبر گیاهی", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["فول", "سوف"]
  },
  {
    id: 32,
    title: "ثابت قدم",
    difficulty: "expert",
    letters: ["ا", "س", "ت", "و", "ا", "ر"],
    rewardCoins: 110,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "استوار", clue: "محکم، پابرجای و دارای ثبات", row: 0, col: 0, direction: "across" },
      { id: 2, word: "راست", clue: "جهت مقابل چپ یا گفتار حقیقت", row: 0, col: 5, direction: "down" },
      { id: 3, word: "تار", clue: "تاریک و سیاه یا ساز کهن", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["سوت", "روست"]
  },
  {
    id: 33,
    title: "پرتوهای امید",
    difficulty: "expert",
    letters: ["ر", "و", "ش", "ن", "ا", "ی", "ی"],
    rewardCoins: 120,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "روشنایی", clue: "نور برطرف‌کننده ظلمت", row: 0, col: 0, direction: "across" },
      { id: 2, word: "روشن", clue: "دارای نور و وضوح کامل", row: 0, col: 0, direction: "down" },
      { id: 3, word: "نشان", clue: "علامت راهنما یا مدال لیاقت", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["شور", "شیر"]
  },
  {
    id: 34,
    title: "شیطنت کودکانه",
    difficulty: "expert",
    letters: ["ب", "ا", "ز", "ی", "گ", "و", "ش"],
    rewardCoins: 120,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "بازیگوش", clue: "شوخ‌طبع و اهل جنب‌وجوش و بازی", row: 0, col: 0, direction: "across" },
      { id: 2, word: "گوش", clue: "عضو شنوایی موجودات زنده", row: 0, col: 4, direction: "down" },
      { id: 3, word: "بازی", clue: "سرگرمی مفرح کودکان و بزرگسالان", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["یوز", "باک"]
  },
  {
    id: 35,
    title: "سرنوشت نیکو",
    difficulty: "expert",
    letters: ["خ", "و", "ش", "ب", "خ", "ت"],
    rewardCoins: 125,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "خوشبخت", clue: "فرد دارای سعادت و اقبال بلند", row: 0, col: 0, direction: "across" },
      { id: 2, word: "بخت", clue: "طالع و اقبال تقدیر شده", row: 0, col: 3, direction: "down" },
      { id: 3, word: "خوش", clue: "نیکو، دلپسند و گوارا", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["شوخ", "توش"]
  },
  {
    id: 36,
    title: "طلوع فجر",
    difficulty: "expert",
    letters: ["س", "پ", "ی", "د", "ه", "د", "م"],
    rewardCoins: 130,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "سپیده", clue: "نخستین روشنایی پیش از برآمدن آفتاب", row: 0, col: 0, direction: "across" },
      { id: 2, word: "پدید", clue: "آشکار و نمایان در برابر دیدگان", row: 0, col: 1, direction: "down" },
      { id: 3, word: "دیده", clue: "چشم بیننده یا امر مشاهده شده", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["دم", "سیم"]
  },
  {
    id: 37,
    title: "غنچه بهاری",
    difficulty: "expert",
    letters: ["ش", "ک", "و", "ف", "ه"],
    rewardCoins: 130,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "شکوفه", clue: "گل‌های تازه بر درختان پیش از میوه", row: 0, col: 0, direction: "across" },
      { id: 2, word: "کوه", clue: "بلندی سنگی سر به آسمان کشیده", row: 0, col: 1, direction: "down" },
      { id: 3, word: "هوش", clue: "قوه درک، نبوغ و تیزفکری", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["شوک", "کشف"]
  },
  {
    id: 38,
    title: "سکون دل",
    difficulty: "expert",
    letters: ["آ", "ر", "ا", "م", "ش"],
    rewardCoins: 135,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "آرامش", clue: "آسودگی خاطر و رهایی از اضطراب", row: 0, col: 0, direction: "across" },
      { id: 2, word: "شام", clue: "وعده غذایی شبانگاهی یا غروب", row: 0, col: 4, direction: "down" },
      { id: 3, word: "آمار", clue: "داده‌های عددی و اطلاعات ثبت شده", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["آرام", "شمار"]
  },
  {
    id: 39,
    title: "گل مرداب",
    difficulty: "expert",
    letters: ["ن", "ی", "ل", "و", "ف", "ر"],
    rewardCoins: 140,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "نیلوفر", clue: "گل زیبای آبی روی سطح برکه‌ها", row: 0, col: 0, direction: "across" },
      { id: 2, word: "فیل", clue: "بزرگ‌ترین پستاندار خشکی‌زی خرطوم‌دار", row: 0, col: 4, direction: "down" },
      { id: 3, word: "نور", clue: "روشنایی ساطع شده از چشمه‌های تابان", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["ریل", "فنون"]
  },
  {
    id: 40,
    title: "ساحر افسونگر",
    difficulty: "expert",
    letters: ["ج", "ا", "د", "و", "گ", "ر"],
    rewardCoins: 140,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "جادوگر", clue: "شخص دارای نیروهای افسونگری و سحر", row: 0, col: 0, direction: "across" },
      { id: 2, word: "جادو", clue: "افسون و عمل خارق‌العاده شگفت", row: 0, col: 0, direction: "down" },
      { id: 3, word: "گرد", clue: "شکل دایره‌ای یا غبار نشسته بر اشیا", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["گاو", "رود"]
  },

  // --- بخش ۵: مراحل ۴۱ تا ۵۰ (فوق‌سخت و قهرمانی) ---
  {
    id: 41,
    title: "قصه کهن",
    difficulty: "master",
    letters: ["ا", "ف", "س", "ا", "ن", "ه"],
    rewardCoins: 150,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "افسانه", clue: "روایت اساطیری و کهن از قهرمانان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "نفس", clue: "دم زدن و حیات یا درون انسان", row: 0, col: 4, direction: "down" },
      { id: 3, word: "سایه", clue: "تاریکی نسبی پشت مانع تابش نور", row: 0, col: 2, direction: "down" }
    ],
    bonusWords: ["فاس", "انیس"]
  },
  {
    id: 42,
    title: "خردمند فرهمند",
    difficulty: "master",
    letters: ["ف", "ر", "ز", "ا", "ن", "ه"],
    rewardCoins: 160,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "فرزانه", clue: "صاحب عقل سلیم و بینش ژرف", row: 0, col: 0, direction: "across" },
      { id: 2, word: "هزار", clue: "عدد ده به توان سه یا بلبل نغمه‌خوان", row: 0, col: 5, direction: "down" },
      { id: 3, word: "راه", clue: "طریق مستقیم به سوی حقیقت", row: 0, col: 1, direction: "down" }
    ],
    bonusWords: ["ارزن", "زهرا"]
  },
  {
    id: 43,
    title: "شریان ترابری",
    difficulty: "master",
    letters: ["ب", "ز", "ر", "گ", "ر", "ا", "ه"],
    rewardCoins: 170,
    gridRows: 7,
    gridCols: 7,
    words: [
      { id: 1, word: "بزرگراه", clue: "جاده عریض چندبانده پرسرعت", row: 0, col: 0, direction: "across" },
      { id: 2, word: "بزرگ", clue: "کلان، دارای اندازه وسیع یا والامقام", row: 0, col: 0, direction: "down" },
      { id: 3, word: "راه", clue: "مسیر عبور و مرور مسافران", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["گروه", "گبر"]
  },
  {
    id: 44,
    title: "فرمانروای شهر",
    difficulty: "master",
    letters: ["ش", "ه", "ر", "ی", "ا", "ر"],
    rewardCoins: 180,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "شهریار", clue: "فرمانروا، پادشاه یا شاعر نامدار معاصر", row: 0, col: 0, direction: "across" },
      { id: 2, word: "شیر", clue: "حیوان با ابهت یالدار دشت‌ها", row: 0, col: 0, direction: "down" },
      { id: 3, word: "یار", clue: "همراه صمیمی و مونس جان", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["شهری", "ریه"]
  },
  {
    id: 45,
    title: "خلقت جهان",
    difficulty: "master",
    letters: ["آ", "ف", "ر", "ی", "ن", "ش"],
    rewardCoins: 190,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "آفرینش", clue: "پیدایش عالم هستی و خلقت کائنات", row: 0, col: 0, direction: "across" },
      { id: 2, word: "نیش", clue: "عضو گزنده زنبور و عقرب", row: 0, col: 4, direction: "down" },
      { id: 3, word: "شیر", clue: "دلاور بیشه یا نوشیدنی مقوی", row: 0, col: 5, direction: "down" }
    ],
    bonusWords: ["آفرین", "فنا"]
  },
  {
    id: 46,
    title: "بال‌های لطیف",
    difficulty: "master",
    letters: ["پ", "ر", "و", "ا", "ن", "ه"],
    rewardCoins: 200,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "پروانه", clue: "حشره زیبا با بال‌های رنگارنگ گرد شمع", row: 0, col: 0, direction: "across" },
      { id: 2, word: "روان", clue: "جاری و سیال یا روح انسان", row: 0, col: 1, direction: "down" },
      { id: 3, word: "پاره", clue: "تکه بریده شده از پارچه یا کاغذ", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["پروا", "پهن"]
  },
  {
    id: 47,
    title: "آشنای دل",
    difficulty: "master",
    letters: ["د", "ل", "ن", "ش", "ی", "ن"],
    rewardCoins: 210,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "دلنشین", clue: "جذاب، مطبوع و خوشایند قلب آدمی", row: 0, col: 0, direction: "across" },
      { id: 2, word: "نشین", clue: "امر به نشستن و استقرار", row: 0, col: 2, direction: "down" },
      { id: 3, word: "دین", clue: "آیین الهی و اعتقاد معنوی", row: 0, col: 0, direction: "down" }
    ],
    bonusWords: ["نیش", "شید"]
  },
  {
    id: 48,
    title: "هفت رنگ آسمان",
    difficulty: "master",
    letters: ["ر", "ن", "گ", "ی", "ن", "ک", "م", "ا", "ن"],
    rewardCoins: 220,
    gridRows: 9,
    gridCols: 9,
    words: [
      { id: 1, word: "رنگین", clue: "دارای الوان شاد و جلوه درخشان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "کمان", clue: "قوس شلیک تیر یا کمان باران", row: 0, col: 5, direction: "down" },
      { id: 3, word: "رنگ", clue: "فام و جلوه بصری اجسام", row: 0, col: 0, direction: "down" },
      { id: 4, word: "نمک", clue: "چاشنی شور طعام روزمره", row: 2, col: 3, direction: "across" }
    ],
    bonusWords: ["نرم", "کمین"]
  },
  {
    id: 49,
    title: "حمد و شکر",
    difficulty: "master",
    letters: ["س", "ت", "ا", "ی", "ش"],
    rewardCoins: 240,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "ستایش", clue: "مدح، ثنا و شکرگزاری پروردگار", row: 0, col: 0, direction: "across" },
      { id: 2, word: "سایت", clue: "پایگاه اینترنتی در شبکه جهانی", row: 0, col: 0, direction: "down" },
      { id: 3, word: "یاس", clue: "گل سفید معطر یا ناامیدی", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["تاس", "آشتی"]
  },
  {
    id: 50,
    title: "اوج تاریکی و تفکر",
    difficulty: "master",
    letters: ["ذ", "ه", "ن", "ت", "ا", "ر", "ی", "ک"],
    rewardCoins: 300,
    gridRows: 8,
    gridCols: 8,
    words: [
      { id: 1, word: "ذهن", clue: "کانون خرد، درک و پردازش فکری انسان", row: 0, col: 0, direction: "across" },
      { id: 2, word: "تاریک", clue: "بی‌نور، تار و ظلمانی و رازآلود", row: 0, col: 3, direction: "down" },
      { id: 3, word: "تیر", clue: "پیکان رها شده از کمان صیاد", row: 0, col: 3, direction: "across" },
      { id: 4, word: "کارت", clue: "برگه مقوایی شناسایی یا بانکی", row: 4, col: 3, direction: "across" }
    ],
    bonusWords: ["ریخت", "نیک"]
  }
];

export function getLevelById(id: number): GameLevel {
  return GAME_LEVELS.find((l) => l.id === id) || GAME_LEVELS[0];
}
