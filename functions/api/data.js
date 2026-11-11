export async function onRequestGet(context) {
  // In Cloudflare Pages Functions, if DB binding or KV is available, use it.
  // Otherwise, return initial public data.
  const env = context.env;

  if (env && env.DOSKA_KV) {
    const stored = await env.DOSKA_KV.get('doska_data', { type: 'json' });
    if (stored) {
      return Response.json({
        teacher: stored.teacher,
        courses: stored.courses,
        certificates: stored.certificates,
        announcements: stored.announcements
      });
    }
  }

  // Fallback initial data
  const defaultTeacher = {
    fullName: "[Ustoz Ismi] [Familiyasi]",
    title: "Matematika va Fizika Fani Oliy Toifali Repetitori",
    subtitle: "Olimpiadalar, Milliy Sertifikat va OTM kirish imtihonlariga professional tayyorgarlik",
    experienceYears: "10+ yil",
    studentsCount: "[1,500+ nafar]",
    admissionRate: "[98%]",
    certificatesCount: "[120+ sertifikat]",
    phone: "+998 (90) [XXX-XX-XX]",
    telegramUsername: "doska_uz_ustoz",
    instagramUsername: "doska_uz_edu",
    location: "Toshkent shahri, [Tuman, Manzil ko'chasi, Mo'ljal]",
    avatarUrl: "",
    bio: "[O'quvchilarga quruq formulalarni yodlatish emas, balki fizik hodisalar va matematik mantiqni chuqur tushuntirish asosiy vazifamdir.]",
    education: [
      {
        degree: "Malaka oshirish va Xalqaro metodika",
        institution: "[Xalqaro pedagogik seminar yoki ta'lim markazi nomi]",
        faculty: "[Zamonaviy interaktiv fizika-matematika metodikasi]",
        period: "[2021 yil]"
      }
    ],
    experience: [
      {
        role: "Bosh repetitor va kurs asoschisi",
        place: "Doska.uz Online va Oflayn Ta'lim Loyihasi",
        period: "[2019 - Hozirgacha]",
        details: "Abituriyentlar, maktab o'quvchilari va olimpiadachilar uchun mualliflik darslarini olib borish."
      }
    ],
    teachingApproach: [
      {
        title: "Vizual va Intuitiv Formulalar",
        description: "Quruq yodlash yo'q — har bir matematik va fizik formulaning kelib chiqishi amaliy tajribalar orqali tushuntiriladi.",
        icon: "Atom"
      },
      {
        title: "Mantiqiy Tahlil va Masalalar Banki",
        description: "Har darsda standart usullardan tashqari nostandart 'layfxak' va tezkor yechish uslublari o'rgatiladi.",
        icon: "Brain"
      },
      {
        title: "Individual Diagnostika va Monitoring",
        description: "Har bir o'quvchining o'zlashtirish darajasi alohida tahlil qilinib, bo'shliqlari ustida individual ishlanadi.",
        icon: "TrendingUp"
      },
      {
        title: "Haftalik Real Imtihon Simulyatsiyasi",
        description: "DTM va Milliy sertifikat formatidagi sinov testlari bilan o'quvchi vaqtni to'g'ri taqsimlashni o'rganadi.",
        icon: "Clock"
      }
    ],
    achievements: [
      "[O'quvchilarining 90% dan ortig'i nufuzli davlat OTMlariga davlat granti asosida qabul qilingan]",
      "[Milliy sertifikat imtihonlarida o'quvchilar A va A+ darajalarni qo'lga kiritgan]"
    ],
    firstName: "[Ustoz Ismi]",
    lastName: "[Familiyasi]",
    heroTitle: "Aniq Fanlarni Mantiqiy & Chuqur O'rganing",
    heroSubtitle: "Olimpiadalar, Milliy Sertifikat (A+) va OTM kirish imtihonlariga professional tayyorgarlik. Murakkab teoremalar va fizik qonunlarni oson, tushunarli uslubda o'rgatamiz.",
    socialLinks: {
      telegram: { username: "doska_uz_ustoz", url: "https://t.me/doska_uz_ustoz", enabled: true },
      instagram: { username: "doska_uz_edu", url: "https://instagram.com/doska_uz_edu", enabled: true }
    }
  };

  const defaultCourses = [
    {
      id: "c-1",
      title: "Matematika: Milliy Sertifikat va DTM (Abituriyent)",
      subject: "Matematika",
      badge: "Eng ommabop",
      level: "Boshlang'ichdan yuqoriga",
      duration: "8 oy (Haftada 3 kun, 2 soatdan)",
      format: "Oflayn + Online yozuvlar",
      price: "[Oylik to'lov: 500,000 so'm]",
      description: "Maktab darsligi, DTM bazasi, geometriya isbotlari va Milliy sertifikat imtihonining 100% dasturini qamrab oluvchi to'liq kurs.",
      topics: [
        "Sonlar nazariyasi va algebraik ifodalar",
        "Tenglamalar, tengsizliklar va parametrli masalalar",
        "Funksiyalar, hosila va integral qo'llanilishi",
        "Planimetriya va stereometriya (fazoviy geometriya)",
        "Milliy sertifikat uchun ochiq va yopiq testlar tahlili"
      ]
    },
    {
      id: "c-2",
      title: "Fizika: Fundamental va DTM Intensiv",
      subject: "Fizika",
      badge: "Chuqurlashtirilgan",
      level: "O'rta va Yuqori",
      duration: "9 oy (Haftada 3 kun, 2 soatdan)",
      format: "Oflayn + Laboratoriya simulyatsiyalari",
      price: "[Oylik to'lov: 500,000 so'm]",
      description: "Fizikani noldan boshlab, formulalarning mohiyatini anglagan holda yuqori ball olishga tayyorlovchi kurs.",
      topics: [
        "Kinematika va dinamika qonunlari",
        "Saqlanish qonunlari va gidrostatika",
        "Molekulyar fizika va termodinamika",
        "Elektrodinamika va zanjir qonunlari",
        "Optika, atom va yadro fizikasi"
      ]
    },
    {
      id: "c-3",
      title: "Olimpiada Matematikasi va Xalqaro Imtihonlar",
      subject: "Matematika",
      badge: "Premium daraja",
      level: "Yuqori daraja",
      duration: "Doimiy mentorlik (Individual grafik)",
      format: "Kichik guruh (6 nafar)",
      price: "[Kelishilgan holda]",
      description: "Respublika va xalqaro fan olimpiadalariga tayyorlanayotgan iqtidorli o'quvchilar uchun nostandart yechimlar kursi.",
      topics: [
        "Kombinatorika va Dirixle prinsipi",
        "Diofant tenglamalari va butun sonlar nazariyasi",
        "Murakkab geometrik yasashlar va teoremalar",
        "Matematik induksiya va funksional tenglamalar",
        "Xalqaro olimpiadalar saralash masalalari"
      ]
    }
  ];

  const defaultCertificates = [
    {
      id: "cert-1",
      studentName: "[O'quvchi F.I.SH — Namuna 1]",
      course: "Matematika Milliy Sertifikat",
      score: "[A+ Daraja / 96 ball]",
      year: "2024",
      placeholderLabel: "Milliy Sertifikat Rasmi",
      imageUrl: "",
      description: "[O'quvchi matematika fanidan maksimal darajadagi A+ milliy sertifikatni qo'lga kiritgan]",
      tag: "Milliy Sertifikat"
    },
    {
      id: "cert-2",
      studentName: "[O'quvchi F.I.SH — Namuna 2]",
      course: "Fizika DTM Imtihoni",
      score: "[Maksimal 93 ball]",
      year: "2024",
      placeholderLabel: "DTM Qabul Natijasi Rasmi",
      imageUrl: "",
      description: "[Toshkent Davlat Texnika Universitetiga 100% grant yutug'i]",
      tag: "DTM Grant"
    },
    {
      id: "cert-3",
      studentName: "[O'quvchi F.I.SH — Namuna 3]",
      course: "Respublika Fan Olimpiadasi",
      score: "[Faxrli 1-o'rin]",
      year: "2023",
      placeholderLabel: "Olimpiada Diplomi Rasmi",
      imageUrl: "",
      description: "[Matematika bo'yicha shahar va respublika bosqichi g'olibligi diplomi]",
      tag: "Olimpiada"
    },
    {
      id: "cert-4",
      studentName: "[O'quvchi F.I.SH — Namuna 4]",
      course: "Fizika Milliy Sertifikat",
      score: "[A Daraja / 88 ball]",
      year: "2024",
      placeholderLabel: "Fizika Sertifikati Rasmi",
      imageUrl: "",
      description: "[Fizika fanidan milliy sertifikat va muddatidan oldin talabalik imtiyozi]",
      tag: "Milliy Sertifikat"
    }
  ];

  const defaultAnnouncements = [
    {
      id: "ann-1",
      title: "Yangi O'quv Yili Uchun Qabul Boshlandi!",
      category: "Qabul",
      date: "2025-03-01",
      isImportant: true,
      text: "Matematika va fizika fanlaridan abituriyentlar va 9-10 sinf o'quvchilari uchun yangi intensiv guruhlar ochilmoqda. Joylar soni cheklangan (har bir guruhda 10-12 nafar).",
      spotsLeft: "Faqat 6 ta o'rin qoldi"
    },
    {
      id: "ann-2",
      title: "Bepul Ochiq Dars: 'Fizikada Nyuton qonunlarining sirli tomonlari'",
      category: "Ochiq dars",
      date: "2025-03-15",
      isImportant: false,
      text: "Shanba kuni soat 15:00 da ochiq dars bo'lib o'tadi. Barcha qiziquvchi o'quvchilar bepul ishtirok etishi mumkin. Telegram orqali ro'yxatdan o'ting.",
      spotsLeft: "Erkin qabul"
    },
    {
      id: "ann-3",
      title: "Navbatdagi Diagnostik Sinov Testi e'lon qilindi",
      category: "Sinov testi",
      date: "2025-03-20",
      isImportant: false,
      text: "Hafta yakunida o'quvchilarimiz va tashqi qatnashuvchilar uchun 30 talik standart DTM test sinovi o'tkaziladi. Natijalar o'sha kunning o'zida tahlil qilinadi.",
      spotsLeft: "Ro'yxatga olish ochiq"
    }
  ];

  return Response.json({
    teacher: defaultTeacher,
    courses: defaultCourses,
    certificates: defaultCertificates,
    announcements: defaultAnnouncements
  });
}
