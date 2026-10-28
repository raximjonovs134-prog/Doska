import express from 'express';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'doska_uz_secret_token_key_2026';

// Server-side Active Admin Sessions Store (Session Revocation / Invalidation)
const activeAdminSessions = new Map(); // token -> { sessionId, createdAt, lastActive, ip }

app.use(cors());
app.use(express.json());

// Static folder for uploaded files
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Database file path
const dbPath = path.join(__dirname, 'data/database.json');

// Initial default data
const defaultData = {
  adminPasswordHash: bcrypt.hashSync('1245', 10), // Vaqtinchalik parol '1245' serverda xesh ko'rinishida saqlanadi
  teacher: {
    fullName: "[O'qituvchi F.I.SH]",
    title: "Matematika va Fizika Fani Oliy Toifali Repetitori",
    subtitle: "Olimpiadalar, Milliy Sertifikat va OTM kirish imtihonlariga professional tayyorgarlik",
    experienceYears: "[10+ yil]",
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
        degree: "Bakalavr / Magistr darajasi",
        institution: "[O'zbekiston Milliy Universiteti]",
        faculty: "[Fizika-Matematika fakulteti]",
        period: "[2012 - 2018 yillar]"
      },
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
      },
      {
        role: "Matematika va Fizika fani o'qituvchisi",
        place: "[Ixtisoslashtirilgan litsey yoki maktab]",
        period: "[2015 - 2019 yillar]",
        details: "Yuqori sinf o'quvchilariga olimpiada masalalari va DTM imtihonlariga tayyorlash."
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
      "[Milliy sertifikat imtihonlarida o'quvchilar A va A+ darajalarni qo'lga kiritgan]",
      "[Respublika va viloyat fan olimpiadalarida faxrli o'rinlar sohiblari yetishtirilgan]",
      "[Mualliflik 'Fizika va Matematika intensiv qo'llanmasi' yaratilgan]"
    ]
  },
  courses: [
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
        "Elektrostatika, doimiy tok va magnit maydoni",
        "Optika, to'lqinlar va atom-yadro fizikasi"
      ]
    },
    {
      id: "c-3",
      title: "Olimpiada Matematikasi va Xalqaro Imtihonlar",
      subject: "Matematika",
      badge: "Elit guruh",
      level: "Iqtidorli o'quvchilar uchun",
      duration: "6 oy (Haftada 2 kun, 2.5 soatdan)",
      format: "Kichik guruh (max 8 kishi)",
      price: "[Oylik to'lov: 700,000 so'm]",
      description: "Respublika va xalqaro olimpiadalarga tayyorgarlik ko'ruvchi 8-11 sinf o'quvchilari uchun mo'ljallangan maxsus yo'nalish.",
      topics: [
        "Kombinatorika va Dirixle prinsipi",
        "Invariantlar va o'yinlar nazariyasi",
        "Murakkab geometrik yasashlar va teoremalar",
        "Nostandart funksional tenglamalar"
      ]
    },
    {
      id: "c-4",
      title: "Fizika: Masala Yechish Maxsus Praktikumi",
      subject: "Fizika",
      badge: "Tezkor natija",
      level: "Baza bor o'quvchilar uchun",
      duration: "4 oy (Haftada 2 kun)",
      format: "Online jonli darslar",
      price: "[Oylik to'lov: 400,000 so'm]",
      description: "Nazariyani bilib, lekin masalada qiynalayotganlar uchun faqat amaliy yechimlar va grafiklar tahlili kursi.",
      topics: [
        "Grafikli va murakkab harakat masalalari",
        "Kirxgof qoidalari va murakkab zanjirlar",
        "Termodinamik davrlar va FIK hisoblash",
        "Geometrik optikada nurlar yo'li"
      ]
    }
  ],
  certificates: [
    {
      id: "cert-1",
      studentName: "[O'quvchi F.I.SH — Namuna 1]",
      course: "Matematika Milliy Sertifikat",
      score: "[A+ Daraja / 94 ball]",
      year: "2024",
      placeholderLabel: "Milliy Sertifikat Rasmi",
      imageUrl: "",
      description: "[O'quvchi tomonidan matematika fanidan erishilgan rasmiy Milliy sertifikat namunasi]",
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
      description: "[DTM blokida maksimal ball imtiyozini taqdim etuvchi sertifikat]",
      tag: "Milliy Sertifikat"
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Yangi guruhlarga qabul boshlandi (2025/2026 o'quv yili)",
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
  ],
  contactRequests: [
    {
      id: "req-1",
      name: "Azizbek Rahimov (Namuna)",
      phone: "+998 (91) 234-56-78",
      course: "Matematika: Milliy Sertifikat va DTM",
      message: "Darslar qaysi kunlari bo'lishini bilmoqchi edim.",
      date: "2025-02-24 14:30",
      status: "Yangi"
    }
  ]
};

// Helper: Read DB
function getDB() {
  if (!fs.existsSync(dbPath)) {
    saveDB(defaultData);
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, using defaults', err);
    return defaultData;
  }
}

// Helper: Save DB (Atomic write using temp file and rename)
function saveDB(data) {
  const tempPath = path.join(__dirname, 'data', `database.temp.${Date.now()}.${Math.random().toString(36).substring(2)}.json`);
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, dbPath);
  } catch (err) {
    console.error('CRITICAL: Error during atomic saveDB', err);
    // Fallback direct write if rename fails
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch (_) {}
    }
  }
}

// In-memory rate limiter for Login attempts (Brute force protection)
const loginAttempts = new Map(); // ip -> { count, lastAttempt, blockedUntil }

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (record.blockedUntil && now < record.blockedUntil) {
    const secondsLeft = Math.ceil((record.blockedUntil - now) / 1000);
    return { 
      allowed: false, 
      message: `Haddan tashqari ko'p urinish. Iltimos, ${secondsLeft} soniyadan keyin qayta urinib ko'ring.` 
    };
  }

  // Reset after 10 minutes of inactivity
  if (now - record.lastAttempt > 10 * 60 * 1000) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordLoginAttempt(ip, success) {
  const now = Date.now();
  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;

  // Block after 5 failed attempts for 3 minutes
  if (record.count >= 5) {
    record.blockedUntil = now + 3 * 60 * 1000;
  }
  loginAttempts.set(ip, record);
}

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Faqat rasm fayllari (jpg, png, webp, gif) qabul qilinadi!"));
    }
  }
});

// Middleware for JWT verification and Server-side Session validation
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Ruxsat etilmagan: Token mavjud emas" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Ruxsat etilmagan: Noto'g'ri token formati" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verify that session is active on server (not logged out or invalidated)
    const session = activeAdminSessions.get(token);
    if (!session) {
      return res.status(401).json({ 
        success: false, 
        message: "Sessiya bekor qilingan yoki mavjud emas. Iltimos, qaytadan parol bilan kiring." 
      });
    }

    // Inactivity timeout: 2 hours
    const now = Date.now();
    if (now - session.lastActive > 2 * 60 * 60 * 1000) {
      activeAdminSessions.delete(token);
      return res.status(401).json({ 
        success: false, 
        message: "Sessiya vaqti tugadi. Qaytadan parol bilan kiring." 
      });
    }

    session.lastActive = now;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Yaroqsiz yoki muddati o'tgan token" });
  }
}

// ======================== API ROUTES ========================

// 1. Auth: Login
app.post('/api/auth/login', (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  
  // Rate limiter check
  const rateLimitStatus = checkLoginRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    return res.status(429).json({ success: false, message: rateLimitStatus.message });
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: "Parol kiritilmadi" });
  }

  const db = getDB();
  const isValid = bcrypt.compareSync(password, db.adminPasswordHash);

  if (!isValid) {
    recordLoginAttempt(clientIp, false);
    return res.status(401).json({ success: false, message: "Noto'g'ri parol kiritildi!" });
  }

  recordLoginAttempt(clientIp, true);

  // Generate secure JWT token with unique session ID
  const sessionId = crypto.randomUUID();
  const token = jwt.sign({ role: 'teacher', sid: sessionId }, JWT_SECRET, { expiresIn: '4h' });

  // Store active session on server
  activeAdminSessions.set(token, {
    sessionId,
    createdAt: Date.now(),
    lastActive: Date.now(),
    ip: clientIp
  });

  return res.json({
    success: true,
    token,
    message: "Muvaffaqiyatli tizimga kirildi"
  });
});

// 2. Auth: Check token
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// 3. Auth: Logout (Server-side Session Revocation)
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      activeAdminSessions.delete(token);
    }
  }
  res.json({ success: true, message: "Sessiya server tomonidan muvaffaqiyatli bekor qilindi" });
});

// 3. Auth: Change password
app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: "Yangi parol kamida 4 ta belgidan iborat bo'lishi kerak" });
  }

  const db = getDB();
  const isValid = bcrypt.compareSync(currentPassword, db.adminPasswordHash);
  if (!isValid) {
    return res.status(400).json({ success: false, message: "Hozirgi parol noto'g'ri kiritildi" });
  }

  db.adminPasswordHash = bcrypt.hashSync(newPassword, 10);
  saveDB(db);

  res.json({ success: true, message: "Parol muvaffaqiyatli o'zgartirildi!" });
});

// 4. Public Data: Get all public data for the site
app.get('/api/data', (req, res) => {
  const db = getDB();
  res.json({
    teacher: db.teacher,
    courses: db.courses,
    certificates: db.certificates,
    announcements: db.announcements
  });
});

// 5. Upload Image (Teacher photo or certificate)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Rasm yuklanmadi" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    message: "Rasm muvaffaqiyatli saqlandi"
  });
});

// 6. Teacher Profile: Update
app.put('/api/teacher', authMiddleware, (req, res) => {
  const db = getDB();
  db.teacher = { ...db.teacher, ...req.body };
  saveDB(db);
  res.json({ success: true, teacher: db.teacher, message: "Ustoz ma'lumotlari saqlandi" });
});

// 7. Courses CRUD
app.post('/api/courses', authMiddleware, (req, res) => {
  const db = getDB();
  const newCourse = {
    id: `c-${Date.now()}`,
    ...req.body
  };
  db.courses.unshift(newCourse);
  saveDB(db);
  res.json({ success: true, course: newCourse });
});

app.put('/api/courses/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Kurs topilmadi" });

  db.courses[idx] = { ...db.courses[idx], ...req.body };
  saveDB(db);
  res.json({ success: true, course: db.courses[idx] });
});

app.delete('/api/courses/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.courses = db.courses.filter(c => c.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: "Kurs o'chirildi" });
});

// 8. Certificates CRUD
app.post('/api/certificates', authMiddleware, (req, res) => {
  const db = getDB();
  const newCert = {
    id: `cert-${Date.now()}`,
    ...req.body
  };
  db.certificates.unshift(newCert);
  saveDB(db);
  res.json({ success: true, certificate: newCert });
});

app.delete('/api/certificates/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.certificates = db.certificates.filter(c => c.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: "Sertifikat o'chirildi" });
});

// 9. Announcements CRUD
app.post('/api/announcements', authMiddleware, (req, res) => {
  const db = getDB();
  const newAnn = {
    id: `ann-${Date.now()}`,
    ...req.body
  };
  db.announcements.unshift(newAnn);
  saveDB(db);
  res.json({ success: true, announcement: newAnn });
});

app.delete('/api/announcements/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.announcements = db.announcements.filter(a => a.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: "E'lon o'chirildi" });
});

// 10. Contact Requests
app.post('/api/contact', (req, res) => {
  const { name, phone, course, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Ism va telefon raqami majburiy" });
  }

  const db = getDB();
  const newReq = {
    id: `req-${Date.now()}`,
    name,
    phone,
    course: course || "Matematika & Fizika",
    message: message || "Konsultatsiya so'ralgan",
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'Yangi'
  };

  db.contactRequests = db.contactRequests || [];
  db.contactRequests.unshift(newReq);
  saveDB(db);

  res.json({ success: true, request: newReq, message: "Arizangiz qabul qilindi!" });
});

app.get('/api/contact', authMiddleware, (req, res) => {
  const db = getDB();
  res.json({ success: true, requests: db.contactRequests || [] });
});

app.patch('/api/contact/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.contactRequests = db.contactRequests || [];
  const reqItem = db.contactRequests.find(r => r.id === req.params.id);
  if (!reqItem) return res.status(404).json({ success: false, message: "Ariza topilmadi" });

  reqItem.status = reqItem.status === 'Yangi' ? "Bog'lanildi" : 'Yangi';
  saveDB(db);
  res.json({ success: true, request: reqItem });
});

app.delete('/api/contact/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.contactRequests = (db.contactRequests || []).filter(r => r.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: "Ariza o'chirildi" });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Doska.uz Backend Server http://localhost:${PORT} da ishga tushdi`);
});
