// test/full-system-audit.js
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('====================================================');
  console.log('     DOSKA.UZ KENG QAMROVLI INTEGRATION TESTLARI     ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;
  const testResults = [];

  function record(name, status, details = '') {
    if (status === 'PASS') {
      passed++;
      console.log(`[PASS] ${name}${details ? ' - ' + details : ''}`);
    } else {
      failed++;
      console.error(`[FAIL] ${name} - ${details}`);
    }
    testResults.push({ name, status, details });
  }

  // 1. GET /api/data
  try {
    const res = await fetch(`${API_BASE}/data`);
    const data = await res.json();
    if (res.ok && data.teacher && Array.isArray(data.courses) && Array.isArray(data.certificates)) {
      record('1. Ochiq sayt ma\'lumotlari (GET /api/data)', 'PASS', `Ustoz: ${data.teacher.fullName || data.teacher.firstName}, Kurslar soni: ${data.courses.length}`);
    } else {
      record('1. Ochiq sayt ma\'lumotlari (GET /api/data)', 'FAIL', 'Kutilgan tuzilma topilmadi');
    }
  } catch (err) {
    record('1. Ochiq sayt ma\'lumotlari (GET /api/data)', 'FAIL', err.message);
  }

  // 2. Submit Contact Request (POST /api/contact)
  let createdReqId = null;
  try {
    const newReq = {
      name: 'Test O\'quvchi',
      phone: '+998901234567',
      course: 'Matematika: Milliy Sertifikat',
      message: 'Avtomatlashtirilgan test arizasi',
      date: new Date().toISOString()
    };
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReq)
    });
    const data = await res.json();
    if (res.ok && data.success && data.request?.id) {
      createdReqId = data.request.id;
      record('2. O\'quvchi arizasini qabul qilish (POST /api/contact)', 'PASS', `Ariza ID: ${createdReqId}`);
    } else {
      record('2. O\'quvchi arizasini qabul qilish (POST /api/contact)', 'FAIL', data.message || 'Xatolik');
    }
  } catch (err) {
    record('2. O\'quvchi arizasini qabul qilish (POST /api/contact)', 'FAIL', err.message);
  }

  // 3. Login with wrong password
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'notogri_parol_xyz' })
    });
    const data = await res.json();
    if (res.status === 401 && !data.success) {
      record('3. Noto\'g\'ri parol rad etilishi (POST /api/auth/login)', 'PASS', 'Status 401 Unauthorized');
    } else {
      record('3. Noto\'g\'ri parol rad etilishi (POST /api/auth/login)', 'FAIL', `Kutilgan 401, olingan ${res.status}`);
    }
  } catch (err) {
    record('3. Noto\'g\'ri parol rad etilishi (POST /api/auth/login)', 'FAIL', err.message);
  }

  // 4. Login with correct password '1245'
  let authToken = '';
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: '1245' })
    });
    const data = await res.json();
    if (res.ok && data.success && data.token) {
      authToken = data.token;
      record('4. To\'g\'ri parol bilan admin kirish (POST /api/auth/login)', 'PASS', 'JWT token muvaffaqiyatli berildi');
    } else {
      record('4. To\'g\'ri parol bilan admin kirish (POST /api/auth/login)', 'FAIL', data.message || 'Token olinmadi');
    }
  } catch (err) {
    record('4. To\'g\'ri parol bilan admin kirish (POST /api/auth/login)', 'FAIL', err.message);
  }

  // 5. Verify valid token (GET /api/auth/verify)
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      record('5. Admin sessiyasini tasdiqlash (GET /api/auth/verify)', 'PASS', 'Sessiya faol');
    } else {
      record('5. Admin sessiyasini tasdiqlash (GET /api/auth/verify)', 'FAIL', data.message);
    }
  } catch (err) {
    record('5. Admin sessiyasini tasdiqlash (GET /api/auth/verify)', 'FAIL', err.message);
  }

  // 6. Admin Contact Requests fetch, toggle & delete
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (res.ok && Array.isArray(data.requests)) {
      record('6a. Arizalarni admin tomonidan ko\'rish (GET /api/contact)', 'PASS', `Jami arizalar: ${data.requests.length}`);
    } else {
      record('6a. Arizalarni admin tomonidan ko\'rish (GET /api/contact)', 'FAIL', 'Arizalar olinmadi');
    }

    if (createdReqId) {
      // Toggle status
      const patchRes = await fetch(`${API_BASE}/contact/${createdReqId}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const patchData = await patchRes.json();
      if (patchRes.ok && patchData.success) {
        record('6b. Ariza holatini o\'zgartirish (PATCH /api/contact/:id)', 'PASS', `Holat: ${patchData.request.status}`);
      }

      // Delete test request
      const delRes = await fetch(`${API_BASE}/contact/${createdReqId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const delData = await delRes.json();
      if (delRes.ok && delData.success) {
        record('6c. Test arizasini tozalash (DELETE /api/contact/:id)', 'PASS', `Test ariza o'chirildi`);
      }
    }
  } catch (err) {
    record('6. Arizalar boshqaruvi', 'FAIL', err.message);
  }

  // 7. Course CRUD Test
  let createdCourseId = null;
  try {
    const newCourse = {
      title: 'Avtomatlashtirilgan Test Kursi',
      subject: 'Matematika',
      badge: 'Yangi sinov',
      level: 'O\'rta',
      duration: '3 oy',
      format: 'Online',
      price: '400,000 so\'m',
      description: 'Test tavsifi',
      topics: ['Mavzu 1', 'Mavzu 2']
    };
    const cRes = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newCourse)
    });
    const cData = await cRes.json();
    if (cRes.ok && cData.success && cData.course?.id) {
      createdCourseId = cData.course.id;
      record('7a. Yangi kurs qo\'shish (POST /api/courses)', 'PASS', `Kurs ID: ${createdCourseId}`);
    } else {
      record('7a. Yangi kurs qo\'shish (POST /api/courses)', 'FAIL', cData.message);
    }

    if (createdCourseId) {
      const uRes = await fetch(`${API_BASE}/courses/${createdCourseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ ...newCourse, title: 'Tahrirlangan Test Kursi' })
      });
      const uData = await uRes.json();
      if (uRes.ok && uData.success) {
        record('7b. Kursni tahrirlash (PUT /api/courses/:id)', 'PASS', 'Kurs muvaffaqiyatli yangilandi');
      }

      const dRes = await fetch(`${API_BASE}/courses/${createdCourseId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const dData = await dRes.json();
      if (dRes.ok && dData.success) {
        record('7c. Kursni o\'chirish (DELETE /api/courses/:id)', 'PASS', 'Kurs toza o\'chirildi');
      }
    }
  } catch (err) {
    record('7. Kurslar CRUD testlari', 'FAIL', err.message);
  }

  // 8. Certificates CRUD Test
  let createdCertId = null;
  try {
    const newCert = {
      studentName: 'Test O\'quvchi Sertifikati',
      course: 'Matematika DTM',
      score: '95 ball',
      year: '2025',
      placeholderLabel: 'Sinov Sertifikati',
      imageUrl: '',
      description: 'Muvaffaqiyatli test sinovi',
      tag: 'DTM Grant'
    };
    const certRes = await fetch(`${API_BASE}/certificates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newCert)
    });
    const certData = await certRes.json();
    if (certRes.ok && certData.success && certData.certificate?.id) {
      createdCertId = certData.certificate.id;
      record('8a. Sertifikat qo\'shish (POST /api/certificates)', 'PASS', `Sertifikat ID: ${createdCertId}`);

      const delCertRes = await fetch(`${API_BASE}/certificates/${createdCertId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const delCertData = await delCertRes.json();
      if (delCertRes.ok && delCertData.success) {
        record('8b. Sertifikatni o\'chirish (DELETE /api/certificates/:id)', 'PASS', 'Sertifikat toza o\'chirildi');
      }
    } else {
      record('8a. Sertifikat qo\'shish (POST /api/certificates)', 'FAIL', certData.message);
    }
  } catch (err) {
    record('8. Sertifikatlar CRUD testlari', 'FAIL', err.message);
  }

  // 9. Announcements CRUD Test
  let createdAnnId = null;
  try {
    const newAnn = {
      title: 'Yangi Test E\'loni',
      category: 'Qabul',
      date: '2025-04-01',
      isImportant: true,
      text: 'Test guruhlari uchun qabul ochildi',
      spotsLeft: 'Faqat 5 ta o\'rin'
    };
    const annRes = await fetch(`${API_BASE}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newAnn)
    });
    const annData = await annRes.json();
    if (annRes.ok && annData.success && annData.announcement?.id) {
      createdAnnId = annData.announcement.id;
      record('9a. Yangi e\'lon qo\'shish (POST /api/announcements)', 'PASS', `E'lon ID: ${createdAnnId}`);

      const delAnnRes = await fetch(`${API_BASE}/announcements/${createdAnnId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const delAnnData = await delAnnRes.json();
      if (delAnnRes.ok && delAnnData.success) {
        record('9b. E\'lonni o\'chirish (DELETE /api/announcements/:id)', 'PASS', 'E\'lon toza o\'chirildi');
      }
    } else {
      record('9a. Yangi e\'lon qo\'shish (POST /api/announcements)', 'FAIL', annData.message);
    }
  } catch (err) {
    record('9. E\'lonlar CRUD testlari', 'FAIL', err.message);
  }

  // 10. Teacher Profile Update Test (PUT /api/teacher)
  try {
    const getRes = await fetch(`${API_BASE}/data`);
    const originalData = await getRes.json();
    const originalTeacher = originalData.teacher;

    const updateRes = await fetch(`${API_BASE}/teacher`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ ...originalTeacher, title: 'Matematika va Fizika Fani Oliy Toifali Repetitori' })
    });
    const updateData = await updateRes.json();
    if (updateRes.ok && updateData.success) {
      record('10. Ustoz ma\'lumotlarini tahrirlash (PUT /api/teacher)', 'PASS', 'Profil muvaffaqiyatli saqlandi');
    } else {
      record('10. Ustoz ma\'lumotlarini tahrirlash (PUT /api/teacher)', 'FAIL', updateData.message);
    }
  } catch (err) {
    record('10. Ustoz ma\'lumotlarini tahrirlash', 'FAIL', err.message);
  }

  // 11. Image Upload Test (POST /api/upload)
  try {
    // 1x1 transparent PNG file buffer
    const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    const formData = new FormData();
    formData.append('image', blob, 'test-pixel.png');

    const upRes = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData
    });
    const upData = await upRes.json();
    if (upRes.ok && upData.success && upData.url) {
      record('11. Galereyadan rasm yuklash (POST /api/upload)', 'PASS', `URL: ${upData.url}`);
      // Clean up uploaded test image
      const uploadedFilename = path.basename(upData.url);
      const filePath = path.join(process.cwd(), 'public/uploads', uploadedFilename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (_) {}
      }
    } else {
      record('11. Galereyadan rasm yuklash (POST /api/upload)', 'FAIL', upData.message);
    }
  } catch (err) {
    record('11. Rasm yuklash testi', 'FAIL', err.message);
  }

  // 12. Logout & Server Session Revocation Test
  try {
    const logoutRes = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const logoutData = await logoutRes.json();
    if (logoutRes.ok && logoutData.success) {
      record('12a. Tizimdan chiqish (POST /api/auth/logout)', 'PASS', 'Serverdagi sessiya bekor qilindi');
    } else {
      record('12a. Tizimdan chiqish (POST /api/auth/logout)', 'FAIL', logoutData.message);
    }

    // Now test if old token is rejected
    const verifyAfterLogout = await fetch(`${API_BASE}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const vData = await verifyAfterLogout.json();
    if (verifyAfterLogout.status === 401 && !vData.success) {
      record('12b. Chiqilgandan so\'ng token rad etilishi (Revoked Token)', 'PASS', 'Status 401 - Qadimgi token qabul qilinmaydi');
    } else {
      record('12b. Chiqilgandan so\'ng token rad etilishi (Revoked Token)', 'FAIL', `Kutilgan 401, olingan ${verifyAfterLogout.status}`);
    }
  } catch (err) {
    record('12. Tizimdan chiqish va sessiya bekor qilish', 'FAIL', err.message);
  }

  // 13. In-Memory Token Safety Verification
  try {
    const appSource = fs.readFileSync(path.resolve('src/App.jsx'), 'utf-8');
    const hasLocalStorageToken = appSource.includes("localStorage.getItem('doska_auth_token')");
    const hasLocalStorageSet = appSource.includes("localStorage.setItem('doska_auth_token'");
    if (!hasLocalStorageToken && !hasLocalStorageSet) {
      record('13. Admin autentifikatsiyasi faqat xotirada (In-memory token)', 'PASS', 'Token localStorage ga yozilmaydi, har kirishda parol so\'raladi');
    } else {
      record('13. Admin autentifikatsiyasi faqat xotirada (In-memory token)', 'FAIL', 'localStorage dan foydalanish topildi');
    }
  } catch (err) {
    record('13. In-memory tekshiruvi', 'FAIL', err.message);
  }

  // 14. Theme Support Verification
  try {
    const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    const hasThemeInit = indexHtml.includes("doska_theme") && indexHtml.includes("dark");
    const tailwindConfig = fs.readFileSync(path.resolve('tailwind.config.js'), 'utf-8');
    const hasDarkModeClass = tailwindConfig.includes("darkMode: 'class'");

    if (hasThemeInit && hasDarkModeClass) {
      record('14. Light & Dark Mode arxitekturasi', 'PASS', 'darkMode class + localStorage doska_theme + anti-FOUC skript mavjud');
    } else {
      record('14. Light & Dark Mode arxitekturasi', 'FAIL', 'Kerakli konfiguratsiya topilmadi');
    }
  } catch (err) {
    record('14. Mavzular tekshiruvi', 'FAIL', err.message);
  }

  console.log('\n====================================================');
  console.log(`TEST NATIJALARI: JAMI: ${passed + failed} | O'TDI: ${passed} | QALDIRILDI: ${failed}`);
  console.log('====================================================\n');

  return { passed, failed, testResults };
}

runTests();
