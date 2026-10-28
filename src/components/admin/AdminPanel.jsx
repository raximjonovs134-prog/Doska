import React, { useState, useRef } from 'react';
import { 
  Shield, 
  UserCheck, 
  BookOpen, 
  Award, 
  Bell, 
  MessageSquare, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Check, 
  AlertTriangle, 
  Eye, 
  UploadCloud,
  Clock,
  Phone,
  CheckCircle2,
  KeyRound,
  LogOut,
  Image as ImageIcon,
  Share2,
  ExternalLink,
  GraduationCap,
  X,
  Send,
  EyeOff
} from 'lucide-react';
import { InstagramIcon, TelegramIcon } from '../Icons';
import ThemeToggle from '../ThemeToggle';

export default function AdminPanel({
  token,
  teacher,
  setTeacher,
  courses,
  setCourses,
  certificates,
  setCertificates,
  announcements,
  setAnnouncements,
  contactRequests,
  setContactRequests,
  onLogout,
  onBackToSite
}) {
  const [activeTab, setActiveTab] = useState('teacher'); // teacher | social | courses | certificates | announcements | requests | security
  const [savedNotice, setSavedNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Teacher Form State
  const [teacherForm, setTeacherForm] = useState(() => {
    return {
      ...teacher,
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      heroTitle: teacher.heroTitle || "Aniq Fanlarni Mantiqiy & Chuqur O'rganing",
      heroSubtitle: teacher.heroSubtitle || teacher.subtitle || "Olimpiadalar, Milliy Sertifikat (A+) va OTM kirish imtihonlariga professional tayyorgarlik. Murakkab teoremalar va fizik qonunlarni oson, tushunarli uslubda o'rgatamiz.",
      education: teacher.education || []
    };
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);

  // New Education item state
  const [newEdu, setNewEdu] = useState({ degree: '', institution: '', period: '' });
  const [showAddEdu, setShowAddEdu] = useState(false);

  // 2. Social Links State
  const [socialForm, setSocialForm] = useState(() => {
    return {
      telegram: {
        username: teacher?.socialLinks?.telegram?.username || teacher?.telegramUsername || 'doska_uz_ustoz',
        url: teacher?.socialLinks?.telegram?.url || (teacher?.telegramUsername ? `https://t.me/${teacher.telegramUsername.replace(/^@/, '')}` : 'https://t.me/doska_uz_ustoz'),
        enabled: teacher?.socialLinks?.telegram?.enabled !== false
      },
      instagram: {
        username: teacher?.socialLinks?.instagram?.username || teacher?.instagramUsername || 'doska_uz_edu',
        url: teacher?.socialLinks?.instagram?.url || (teacher?.instagramUsername ? `https://instagram.com/${teacher.instagramUsername.replace(/^@/, '')}` : 'https://instagram.com/doska_uz_edu'),
        enabled: teacher?.socialLinks?.instagram?.enabled !== false
      }
    };
  });

  // 3. Password Form State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordNotice, setPasswordNotice] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 4. Course Add/Edit State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    subject: 'Matematika',
    badge: 'Yangi kurs',
    level: 'O\'rta daraja',
    duration: '6 oy (Haftada 3 kun)',
    format: 'Oflayn / Online',
    price: '[500,000 so\'m]',
    description: '',
    topicsStr: ''
  });

  // 5. Certificate Add State
  const [showAddCert, setShowAddCert] = useState(false);
  const [certForm, setCertForm] = useState({
    studentName: '[O\'quvchi F.I.SH]',
    course: 'Matematika Milliy Sertifikat',
    score: '[A+ Daraja]',
    year: new Date().getFullYear().toString(),
    placeholderLabel: 'Sertifikat Tasviri',
    imageUrl: '',
    description: '[Erishilgan natija tavsifi]',
    tag: 'Milliy Sertifikat'
  });
  const [uploadingCertImg, setUploadingCertImg] = useState(false);
  const certFileInputRef = useRef(null);

  // 6. Announcement Add State
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'Qabul',
    date: new Date().toISOString().substring(0, 10),
    isImportant: true,
    text: '',
    spotsLeft: '6 ta o\'rin mavjud'
  });

  const showNotification = (msg) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(''), 3500);
  };

  // SAVE TEACHER PROFILE
  const handleSaveTeacher = async (e) => {
    if (e) e.preventDefault();
    
    // Compute full name if first and last names provided
    let calculatedFullName = teacherForm.fullName;
    if (teacherForm.firstName || teacherForm.lastName) {
      calculatedFullName = `${teacherForm.firstName || ''} ${teacherForm.lastName || ''}`.trim();
    }

    const payload = {
      ...teacherForm,
      fullName: calculatedFullName || teacherForm.fullName,
      socialLinks: socialForm
    };

    try {
      const res = await fetch('/api/teacher', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setTeacher(data.teacher);
        showNotification("Ustoz ma'lumotlari muvaffaqiyatli saqlandi!");
      } else {
        setErrorMessage(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setErrorMessage("Server bilan aloqa uzildi");
    }
  };

  // SAVE SOCIAL MEDIA SETTINGS
  const handleSaveSocial = async (e) => {
    if (e) e.preventDefault();

    // Clean usernames & URLs
    const cleanTgUser = socialForm.telegram.username.trim().replace(/^@/, '');
    const cleanIgUser = socialForm.instagram.username.trim().replace(/^@/, '');

    const finalSocial = {
      telegram: {
        username: cleanTgUser,
        url: socialForm.telegram.url.trim() || (cleanTgUser ? `https://t.me/${cleanTgUser}` : ''),
        enabled: socialForm.telegram.enabled
      },
      instagram: {
        username: cleanIgUser,
        url: socialForm.instagram.url.trim() || (cleanIgUser ? `https://instagram.com/${cleanIgUser}` : ''),
        enabled: socialForm.instagram.enabled
      }
    };

    const payload = {
      ...teacher,
      socialLinks: finalSocial,
      telegramUsername: cleanTgUser,
      instagramUsername: cleanIgUser
    };

    try {
      const res = await fetch('/api/teacher', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setTeacher(data.teacher);
        setSocialForm(finalSocial);
        showNotification("Ijtimoiy tarmoqlar sozlamalari saqlandi!");
      } else {
        setErrorMessage(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setErrorMessage("Server bilan aloqa uzildi");
    }
  };

  // UPLOAD TEACHER PHOTO (Works on iOS Photo Library/Camera and Android Gallery)
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingAvatar(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        const updated = { ...teacherForm, avatarUrl: data.url };
        setTeacherForm(updated);

        // Auto-save to database
        const saveRes = await fetch('/api/teacher', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...updated, socialLinks: socialForm })
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
          setTeacher(saveData.teacher);
        }
        showNotification("Surat yuklandi va saqlandi!");
      } else {
        setErrorMessage(data.message || "Rasm yuklashda xatolik");
      }
    } catch (err) {
      setErrorMessage("Rasm yuklashda server xatosi");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // EDUCATION MANAGEMENT
  const handleAddEducation = () => {
    if (!newEdu.degree.trim() || !newEdu.institution.trim()) return;
    const updatedEdu = [...(teacherForm.education || []), newEdu];
    setTeacherForm({ ...teacherForm, education: updatedEdu });
    setNewEdu({ degree: '', institution: '', period: '' });
    setShowAddEdu(false);
  };

  const handleDeleteEducation = (idx) => {
    const updated = (teacherForm.education || []).filter((_, i) => i !== idx);
    setTeacherForm({ ...teacherForm, education: updated });
  };

  // COURSES MANAGEMENT
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const topicsArray = courseForm.topicsStr
      ? courseForm.topicsStr.split(',').map(t => t.trim()).filter(Boolean)
      : ['Nazariy qoidalar', 'Amaliy masalalar tahlili'];

    const payload = {
      title: courseForm.title,
      subject: courseForm.subject,
      badge: courseForm.badge,
      level: courseForm.level,
      duration: courseForm.duration,
      format: courseForm.format,
      price: courseForm.price,
      description: courseForm.description,
      topics: topicsArray
    };

    try {
      if (editingCourse) {
        const res = await fetch(`/api/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setCourses(courses.map(c => c.id === editingCourse.id ? data.course : c));
          showNotification("Kurs muvaffaqiyatli yangilandi!");
          setEditingCourse(null);
        }
      } else {
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setCourses([data.course, ...courses]);
          showNotification("Yangi kurs muvaffaqiyatli qo'shildi!");
          setShowAddCourse(false);
        }
      }
      setCourseForm({
        title: '',
        subject: 'Matematika',
        badge: 'Yangi kurs',
        level: 'O\'rta daraja',
        duration: '6 oy (Haftada 3 kun)',
        format: 'Oflayn / Online',
        price: '[500,000 so\'m]',
        description: '',
        topicsStr: ''
      });
    } catch (err) {
      setErrorMessage("Kursni saqlashda xatolik yuz berdi");
    }
  };

  const handleStartEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      subject: course.subject,
      badge: course.badge,
      level: course.level,
      duration: course.duration,
      format: course.format,
      price: course.price,
      description: course.description,
      topicsStr: course.topics ? course.topics.join(', ') : ''
    });
    setShowAddCourse(true);
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Haqiqatan ham bu kursni butunlay o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.filter(c => c.id !== id));
        showNotification("Kurs o'chirildi");
      }
    } catch (err) {
      setErrorMessage("O'chirishda xatolik");
    }
  };

  // CERTIFICATES MANAGEMENT
  const handleCertImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploadingCertImg(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCertForm({ ...certForm, imageUrl: data.url });
        showNotification("Sertifikat rasmi yuklandi!");
      }
    } catch (err) {
      setErrorMessage("Sertifikat rasmini yuklashda xatolik");
    } finally {
      setUploadingCertImg(false);
    }
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(certForm)
      });
      const data = await res.json();
      if (data.success) {
        setCertificates([data.certificate, ...certificates]);
        showNotification("Sertifikat galereyaga qo'shildi!");
        setShowAddCert(false);
        setCertForm({
          studentName: '[O\'quvchi F.I.SH]',
          course: 'Matematika Milliy Sertifikat',
          score: '[A+ Daraja]',
          year: new Date().getFullYear().toString(),
          placeholderLabel: 'Sertifikat Tasviri',
          imageUrl: '',
          description: '[Erishilgan natija tavsifi]',
          tag: 'Milliy Sertifikat'
        });
      }
    } catch (err) {
      setErrorMessage("Sertifikatni saqlashda xatolik");
    }
  };

  const handleDeleteCert = async (id) => {
    if (!confirm("Sertifikatni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCertificates(certificates.filter(c => c.id !== id));
        showNotification("Sertifikat o'chirildi");
      }
    } catch (err) {
      setErrorMessage("O'chirishda xatolik");
    }
  };

  // ANNOUNCEMENTS MANAGEMENT
  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(announcementForm)
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements([data.announcement, ...announcements]);
        showNotification("E'lon muvaffaqiyatli chiqarildi!");
        setShowAddAnnouncement(false);
        setAnnouncementForm({
          title: '',
          category: 'Qabul',
          date: new Date().toISOString().substring(0, 10),
          isImportant: false,
          text: '',
          spotsLeft: 'Ochiq qabul'
        });
      }
    } catch (err) {
      setErrorMessage("E'lonni saqlashda xatolik");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAnnouncements(announcements.filter(a => a.id !== id));
        showNotification("E'lon o'chirildi");
      }
    } catch (err) {
      setErrorMessage("O'chirishda xatolik");
    }
  };

  // CONTACT REQUESTS MANAGEMENT
  const handleToggleRequest = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setContactRequests(contactRequests.map(r => r.id === id ? data.request : r));
      }
    } catch (err) {
      setErrorMessage("Holatni o'zgartirishda xatolik");
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setContactRequests(contactRequests.filter(r => r.id !== id));
        showNotification("Ariza o'chirildi");
      }
    } catch (err) {
      setErrorMessage("Arizani o'chirishda xatolik");
    }
  };

  // CHANGE ADMIN PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordNotice('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Yangi parollar bir-biriga mos kelmadi");
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setPasswordNotice("Parol muvaffaqiyatli yangilandi! Endi yangi parolingiz bilan kirasiz.");
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordError(data.message || "Parolni o'zgartirishda xatolik");
      }
    } catch (err) {
      setPasswordError("Server bilan bog'lanishda xato");
    }
  };

  const navTabs = [
    { id: 'teacher', label: "Ustoz Ma'lumotlari", icon: UserCheck },
    { id: 'social', label: "Ijtimoiy Tarmoqlar", icon: Share2 },
    { id: 'courses', label: "Kurslar", icon: BookOpen, count: courses.length },
    { id: 'certificates', label: "Sertifikatlar", icon: Award, count: certificates.length },
    { id: 'announcements', label: "E'lonlar", icon: Bell, count: announcements.length },
    { id: 'requests', label: "Arizalar", icon: MessageSquare, count: contactRequests.length, highlight: contactRequests.some(r => r.status === 'Yangi') },
    { id: 'security', label: "Xavfsizlik & Parol", icon: KeyRound },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-navy-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-neon-green selection:text-navy-950 transition-colors duration-300">
      
      {/* Top Admin Header (Fully Responsive) */}
      <header className="bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 sticky top-0 z-40 px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold border border-slate-200 dark:border-navy-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Saytga o'tish</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-navy-800 hidden xs:block" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 dark:bg-neon-green/20 border border-emerald-500/40 dark:border-neon-green/40 flex items-center justify-center text-emerald-600 dark:text-neon-green font-bold text-xs shadow-neon-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight">DOSKA.UZ</span>
              <span className="hidden md:inline-block ml-1.5 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-emerald-700 dark:text-neon-green border border-emerald-500/20 dark:border-neon-green/20">
                Ustoz Xonasi
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {savedNotice && (
            <span className="text-[11px] sm:text-xs text-emerald-700 dark:text-neon-green font-mono flex items-center gap-1 bg-emerald-50 dark:bg-neon-green/10 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-neon-green/30 animate-in fade-in truncate max-w-[200px] sm:max-w-xs">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">{savedNotice}</span>
            </span>
          )}

          <ThemeToggle />

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold transition-colors cursor-pointer"
            title="Tizimdan chiqish"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Tabs Selector */}
      <div className="md:hidden bg-white/95 dark:bg-navy-900/95 border-b border-slate-200 dark:border-navy-850 px-3 py-2 overflow-x-auto flex items-center gap-1.5 no-scrollbar sticky top-[53px] z-30 transition-colors">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-neon-green text-navy-950 font-bold shadow-neon-sm'
                  : 'bg-slate-50 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] font-mono px-1 rounded ${
                  tab.highlight && !isActive ? 'bg-red-500 text-white' : 'bg-black/10 dark:bg-black/30'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Admin Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Desktop Sidebar Nav */}
        <aside className="hidden md:block w-64 bg-white/90 dark:bg-navy-900/80 border-r border-slate-200 dark:border-navy-850 p-4 space-y-1 shrink-0 transition-colors">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-2">
            Boshqaruv Bo'limlari
          </div>

          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neon-green text-navy-950 font-bold shadow-neon-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    tab.highlight ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-navy-950/60 text-slate-700 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl overflow-y-auto">
          
          {/* TAB 1: TEACHER PROFILE */}
          {activeTab === 'teacher' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Ustoz Ma'lumotlarini Boshqarish</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Bosh sahifadagi ism, rasm, biografiya, ta'lim va ko'rsatkichlarni tahrirlang.</p>
                </div>
                <button
                  onClick={handleSaveTeacher}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </button>
              </div>

              {/* Photo Upload Section (iOS & Android Gallery Ready) */}
              <div className="p-4 sm:p-6 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-navy-950 border-2 border-dashed border-neon-green/40 flex items-center justify-center overflow-hidden shrink-0 shadow-neon-sm">
                  {teacherForm.avatarUrl ? (
                    <img 
                      src={teacherForm.avatarUrl} 
                      alt="Ustoz surati" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-neon-green/60 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block font-mono">Rasm yo'q</span>
                    </div>
                  )}
                  {uploadingAvatar && (
                    <div className="absolute inset-0 bg-navy-950/85 flex items-center justify-center text-xs font-mono text-neon-green">
                      Yuklanmoqda...
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h4 className="text-sm font-bold text-white">Ustozning Fotosurati</h4>
                  <p className="text-xs text-slate-400">
                    Telefoningiz yoki kompyuteringiz galereyasidan fotosurat tanlang (JPG, PNG yoki WebP).
                  </p>
                  
                  <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-white text-xs font-semibold border border-navy-700 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <UploadCloud className="w-4 h-4 text-neon-green" />
                      <span>{uploadingAvatar ? "Yuklanmoqda..." : "Galereyadan Rasm Yuklash"}</span>
                    </button>

                    {teacherForm.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setTeacherForm({ ...teacherForm, avatarUrl: '' })}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Rasmni o'chirish
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Fields Grid */}
              <form onSubmit={handleSaveTeacher} className="space-y-5">
                
                {/* 1. Name & Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Ustoz Ismi *
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Anvar"
                      value={teacherForm.firstName}
                      onChange={(e) => setTeacherForm({ ...teacherForm, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Ustoz Familiyasi *
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Rahimov"
                      value={teacherForm.lastName}
                      onChange={(e) => setTeacherForm({ ...teacherForm, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Hero Headline & Subtitle */}
                <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-navy-900/60 border border-navy-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neon-green font-semibold">
                    Bosh Sahifa Asosiy Matnlari (Hero)
                  </h4>
                  
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Bosh Sahifa Asosiy Sarlavhasi
                    </label>
                    <input
                      type="text"
                      value={teacherForm.heroTitle}
                      onChange={(e) => setTeacherForm({ ...teacherForm, heroTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Bosh Sahifa Qisqa Tanishtiruv Matni
                    </label>
                    <textarea
                      rows={2}
                      value={teacherForm.heroSubtitle}
                      onChange={(e) => setTeacherForm({ ...teacherForm, heroSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* 3. Credentials & Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Lavozimi / Unvoni
                    </label>
                    <input
                      type="text"
                      value={teacherForm.title}
                      onChange={(e) => setTeacherForm({ ...teacherForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Telefon Raqami *
                    </label>
                    <input
                      type="text"
                      value={teacherForm.phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base font-mono focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Tajriba Yillari
                    </label>
                    <input
                      type="text"
                      value={teacherForm.experienceYears}
                      onChange={(e) => setTeacherForm({ ...teacherForm, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      O'quvchilar Soni
                    </label>
                    <input
                      type="text"
                      value={teacherForm.studentsCount}
                      onChange={(e) => setTeacherForm({ ...teacherForm, studentsCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      OTMga Qabul Ko'rsatkichi
                    </label>
                    <input
                      type="text"
                      value={teacherForm.admissionRate}
                      onChange={(e) => setTeacherForm({ ...teacherForm, admissionRate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Sertifikat Egalari Soni
                    </label>
                    <input
                      type="text"
                      value={teacherForm.certificatesCount}
                      onChange={(e) => setTeacherForm({ ...teacherForm, certificatesCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Location & Bio */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Dars O'tish Manzili (Oflayn lokatsiya)
                  </label>
                  <input
                    type="text"
                    value={teacherForm.location}
                    onChange={(e) => setTeacherForm({ ...teacherForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Biografiya va Mualliflik Falsafasi
                  </label>
                  <textarea
                    rows={4}
                    value={teacherForm.bio}
                    onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none leading-relaxed"
                  />
                </div>

                {/* 5. Education List (Editable) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-neon-green font-semibold">
                      Ta'lim va Malaka Ro'yxati
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddEdu(!showAddEdu)}
                      className="text-xs text-neon-green hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yangi qo'shish</span>
                    </button>
                  </div>

                  {showAddEdu && (
                    <div className="p-3.5 rounded-xl bg-navy-950 border border-neon-green/30 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Daraja (Bakalavr / Magistr)"
                          value={newEdu.degree}
                          onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Universitet / Muassasa"
                          value={newEdu.institution}
                          onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Yillar (masalan: 2014-2018)"
                          value={newEdu.period}
                          onChange={(e) => setNewEdu({ ...newEdu, period: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddEdu(false)}
                          className="px-3 py-1 text-xs text-slate-400"
                        >
                          Bekor qilish
                        </button>
                        <button
                          type="button"
                          onClick={handleAddEducation}
                          className="px-4 py-1 rounded-lg bg-neon-green text-navy-950 font-bold text-xs"
                        >
                          Qo'shish
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {(teacherForm.education || []).map((edu, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-xs">
                        <div>
                          <span className="font-bold text-white block">{edu.degree}</span>
                          <span className="text-neon-green">{edu.institution}</span>
                          <span className="text-slate-400 ml-2 font-mono">({edu.period})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteEducation(idx)}
                          className="text-slate-400 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>O'zgarishlarni Saqlash</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SOCIAL MEDIA MANAGEMENT (DEDICATED SECTION) */}
          {activeTab === 'social' && (
            <div className="space-y-6 max-w-2xl animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Ijtimoiy Tarmoqlar Sozlamalari</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Telegram va Instagram profillari, havolalari va ularni saytda ko'rsatish/yashirishni boshqaring.
                  </p>
                </div>
                <button
                  onClick={handleSaveSocial}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </button>
              </div>

              <form onSubmit={handleSaveSocial} className="space-y-6">
                
                {/* 1. Telegram Settings Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9]">
                        <TelegramIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Telegram Sozlamalari</h4>
                        <span className="text-xs text-slate-400">Rasmiy profil yoki kanal</span>
                      </div>
                    </div>

                    {/* Enable / Disable Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xs text-slate-300 font-mono">
                        {socialForm.telegram.enabled ? "Faol (Ko'rsatilsin)" : "Yashirilgan"}
                      </span>
                      <input
                        type="checkbox"
                        checked={socialForm.telegram.enabled}
                        onChange={(e) => setSocialForm({
                          ...socialForm,
                          telegram: { ...socialForm.telegram, enabled: e.target.checked }
                        })}
                        className="w-5 h-5 accent-neon-green rounded cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                        Telegram Username
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
                        <input
                          type="text"
                          placeholder="doska_uz_ustoz"
                          value={socialForm.telegram.username}
                          onChange={(e) => {
                            const val = e.target.value.replace(/^@/, '');
                            setSocialForm({
                              ...socialForm,
                              telegram: {
                                ...socialForm.telegram,
                                username: val,
                                url: `https://t.me/${val}`
                              }
                            });
                          }}
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base font-mono focus:border-neon-green focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                        To'liq Havola (URL)
                      </label>
                      <input
                        type="text"
                        placeholder="https://t.me/doska_uz_ustoz"
                        value={socialForm.telegram.url}
                        onChange={(e) => setSocialForm({
                          ...socialForm,
                          telegram: { ...socialForm.telegram, url: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base font-mono focus:border-neon-green focus:outline-none"
                      />
                    </div>
                  </div>

                  {socialForm.telegram.url && (
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono truncate max-w-xs">
                        Havola: {socialForm.telegram.url}
                      </span>
                      <a
                        href={socialForm.telegram.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neon-green hover:underline font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Sinab ko'rish</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* 2. Instagram Settings Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
                        <InstagramIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Instagram Sozlamalari</h4>
                        <span className="text-xs text-slate-400">Rasmiy sahifa</span>
                      </div>
                    </div>

                    {/* Enable / Disable Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xs text-slate-300 font-mono">
                        {socialForm.instagram.enabled ? "Faol (Ko'rsatilsin)" : "Yashirilgan"}
                      </span>
                      <input
                        type="checkbox"
                        checked={socialForm.instagram.enabled}
                        onChange={(e) => setSocialForm({
                          ...socialForm,
                          instagram: { ...socialForm.instagram, enabled: e.target.checked }
                        })}
                        className="w-5 h-5 accent-neon-green rounded cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                        Instagram Username
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
                        <input
                          type="text"
                          placeholder="doska_uz_edu"
                          value={socialForm.instagram.username}
                          onChange={(e) => {
                            const val = e.target.value.replace(/^@/, '');
                            setSocialForm({
                              ...socialForm,
                              instagram: {
                                ...socialForm.instagram,
                                username: val,
                                url: `https://instagram.com/${val}`
                              }
                            });
                          }}
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base font-mono focus:border-neon-green focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                        To'liq Havola (URL)
                      </label>
                      <input
                        type="text"
                        placeholder="https://instagram.com/doska_uz_edu"
                        value={socialForm.instagram.url}
                        onChange={(e) => setSocialForm({
                          ...socialForm,
                          instagram: { ...socialForm.instagram, url: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-base font-mono focus:border-neon-green focus:outline-none"
                      />
                    </div>
                  </div>

                  {socialForm.instagram.url && (
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono truncate max-w-xs">
                        Havola: {socialForm.instagram.url}
                      </span>
                      <a
                        href={socialForm.instagram.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neon-green hover:underline font-mono"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Sinab ko'rish</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Ijtimoiy Tarmoqlarni Saqlash</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Kurslar va O'quv Dasturlarini Boshqarish</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Yangi kurslar qo'shish, mavjudlarini tahrirlash yoki o'chirish.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCourse(null);
                    setShowAddCourse(!showAddCourse);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddCourse ? "Bekor qilish" : "Yangi Kurs Qo'shish"}</span>
                </button>
              </div>

              {/* Add/Edit Course Form */}
              {showAddCourse && (
                <form onSubmit={handleSaveCourse} className="p-5 sm:p-6 rounded-2xl bg-navy-900 border border-neon-green/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-neon-green uppercase font-mono">
                      {editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo'shish"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowAddCourse(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kurs Nomi *</label>
                      <input
                        type="text"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Fan Yo'nalishi</label>
                      <select
                        value={courseForm.subject}
                        onChange={(e) => setCourseForm({ ...courseForm, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                      >
                        <option value="Matematika">Matematika</option>
                        <option value="Fizika">Fizika</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Davomiyligi</label>
                      <input
                        type="text"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Narx placeholderi</label>
                      <input
                        type="text"
                        value={courseForm.price}
                        onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Qisqacha Tavsif</label>
                      <input
                        type="text"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Mavzular (vergul bilan ajrating)</label>
                      <input
                        type="text"
                        value={courseForm.topicsStr}
                        onChange={(e) => setCourseForm({ ...courseForm, topicsStr: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white focus:border-neon-green focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neon-green text-navy-950 font-bold text-xs shadow-neon-sm cursor-pointer"
                  >
                    {editingCourse ? "O'zgarishlarni Saqlash" : "Kursni Saqlash"}
                  </button>
                </form>
              )}

              {/* Courses list */}
              <div className="space-y-3 sm:space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 sm:p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neon-green/10 text-neon-green border border-neon-green/20">
                          {course.subject}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{course.duration}</span>
                        <span className="text-xs text-neon-green font-mono">{course.price}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{course.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => handleStartEditCourse(course)}
                        className="p-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-navy-700 transition-colors cursor-pointer"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 rounded-xl bg-navy-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-navy-700 transition-colors cursor-pointer"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES MANAGEMENT */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Sertifikatlar va Natijalar Galereyasi</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Haqiqiy sertifikat rasmlarini yuklash yoki shablonlarni boshqarish.</p>
                </div>
                <button
                  onClick={() => setShowAddCert(!showAddCert)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddCert ? "Bekor qilish" : "Sertifikat Qo'shish"}</span>
                </button>
              </div>

              {showAddCert && (
                <form onSubmit={handleSaveCert} className="p-5 sm:p-6 rounded-2xl bg-navy-900 border border-neon-green/40 space-y-4">
                  <h3 className="text-sm font-bold text-neon-green uppercase font-mono">Yangi Sertifikat Tafsilotlari</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">O'quvchi F.I.SH *</label>
                      <input
                        type="text"
                        value={certForm.studentName}
                        onChange={(e) => setCertForm({ ...certForm, studentName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kategoriya</label>
                      <select
                        value={certForm.tag}
                        onChange={(e) => setCertForm({ ...certForm, tag: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      >
                        <option value="Milliy Sertifikat">Milliy Sertifikat</option>
                        <option value="DTM Grant">DTM Grant</option>
                        <option value="Olimpiada">Olimpiada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Natija / Ball</label>
                      <input
                        type="text"
                        value={certForm.score}
                        onChange={(e) => setCertForm({ ...certForm, score: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Yil</label>
                      <input
                        type="text"
                        value={certForm.year}
                        onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Sertifikat Rasmi (Galereyadan)</label>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="file"
                          ref={certFileInputRef}
                          onChange={handleCertImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => certFileInputRef.current?.click()}
                          disabled={uploadingCertImg}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-navy-800 text-white text-xs font-semibold border border-navy-700 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <UploadCloud className="w-4 h-4 text-neon-green" />
                          <span>{uploadingCertImg ? "Yuklanmoqda..." : "Rasm Faylini Tanlash"}</span>
                        </button>
                        {certForm.imageUrl && (
                          <span className="text-xs text-neon-green font-mono">✓ Rasm yuklandi</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neon-green text-navy-950 font-bold text-xs shadow-neon-sm cursor-pointer"
                  >
                    Sertifikatni Saqlash
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col justify-between">
                    <div>
                      {cert.imageUrl ? (
                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-navy-750">
                          <img src={cert.imageUrl} alt={cert.studentName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-xl bg-navy-950 border border-dashed border-navy-700 flex items-center justify-center text-xs text-slate-500 mb-3 font-mono">
                          [Rasm biriktirilmagan]
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs font-mono text-neon-green mb-1">
                        <span>{cert.tag}</span>
                        <span className="text-slate-400">{cert.year}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{cert.studentName}</h4>
                      <p className="text-xs text-slate-400">{cert.course}</p>
                      <div className="mt-2 text-xs font-mono font-bold text-neon-green bg-navy-950 p-1.5 rounded text-center border border-navy-800">
                        {cert.score}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-navy-800 flex justify-end">
                      <button
                        onClick={() => handleDeleteCert(cert.id)}
                        className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>O'chirish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ANNOUNCEMENTS MANAGEMENT */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">E'lonlar va Guruhlarga Qabul</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Yangi ochiq darslar, guruh qabuli va xabarnomalar berish.</p>
                </div>
                <button
                  onClick={() => setShowAddAnnouncement(!showAddAnnouncement)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddAnnouncement ? "Bekor qilish" : "Yangi E'lon Berish"}</span>
                </button>
              </div>

              {showAddAnnouncement && (
                <form onSubmit={handleSaveAnnouncement} className="p-5 sm:p-6 rounded-2xl bg-navy-900 border border-neon-green/40 space-y-4">
                  <h3 className="text-sm font-bold text-neon-green uppercase font-mono">E'lon Tafsilotlari</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">E'lon Sarlavhasi *</label>
                      <input
                        type="text"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kategoriya</label>
                      <input
                        type="text"
                        value={announcementForm.category}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Joylar holati</label>
                      <input
                        type="text"
                        value={announcementForm.spotsLeft}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, spotsLeft: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-400 mb-1">Batafsil matn</label>
                      <textarea
                        rows={3}
                        value={announcementForm.text}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-base text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neon-green text-navy-950 font-bold text-xs shadow-neon-sm cursor-pointer"
                  >
                    E'lonni Chiqarish
                  </button>
                </form>
              )}

              <div className="space-y-3 sm:space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 sm:p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-800 text-neon-green border border-navy-700">
                          {ann.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{ann.date}</span>
                        {ann.isImportant && (
                          <span className="text-[10px] bg-neon-green/20 text-neon-green px-2 py-0.5 rounded font-bold">
                            Dolzarb
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-white">{ann.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{ann.text}</p>
                      <span className="inline-block mt-1 text-xs font-mono text-neon-green">
                        {ann.spotsLeft}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="self-end sm:self-auto p-2 rounded-xl bg-navy-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-navy-700 transition-colors cursor-pointer"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Kelib Tushgan Arizalar</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Bosh sahifadagi ro'yxatdan o'tish formasidan yuborilgan arizalar ro'yxati.</p>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Jami: <span className="text-neon-green font-bold">{contactRequests.length}</span>
                </div>
              </div>

              {contactRequests.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-sm">
                  Hozircha hech qanday yangi ariza kelib tushmagan.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 sm:p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            req.status === 'Yangi'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {req.status}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{req.date}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-white">{req.name}</h4>
                          <a
                            href={`tel:${req.phone}`}
                            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neon-green hover:underline bg-navy-950 px-2.5 py-1 rounded border border-navy-800"
                          >
                            <Phone className="w-3 h-3" />
                            {req.phone}
                          </a>
                        </div>

                        <p className="text-xs text-slate-300">
                          <span className="text-slate-500 font-mono">Tanlangan kurs:</span> {req.course}
                        </p>

                        {req.message && (
                          <p className="text-xs text-slate-400 italic bg-navy-950/50 p-2 rounded-lg border border-navy-800/60 max-w-xl">
                            "{req.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleRequest(req.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            req.status === 'Yangi'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-navy-800 text-slate-300 border-navy-700 hover:text-white'
                          }`}
                        >
                          {req.status === 'Yangi' ? "Bog'lanildi deb belgilash" : "Qayta ochish"}
                        </button>

                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="p-2 rounded-xl bg-navy-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-navy-700 transition-colors cursor-pointer"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl animate-in fade-in">
              <div className="pb-4 border-b border-navy-800">
                <h2 className="text-lg sm:text-xl font-bold text-white">Admin Parolini O'zgartirish</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Vaqtinchalik parolni o'zingizning shaxsiy maxfiy parolingizga almashtiring.
                </p>
              </div>

              {passwordNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{passwordNotice}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Hozirgi Parol (vaqtinchalik: 1245)
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    placeholder="Hozirgi parolni kiriting"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Yangi Maxfiy Parol
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    placeholder="Kamida 4 ta belgi"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Yangi Parolni Qayta Kiriting
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-base focus:border-neon-green focus:outline-none"
                    placeholder="Yangi parolni tasdiqlang"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-navy-950 bg-neon-green hover:bg-[#15FFA3] shadow-neon flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Parolni Yangilash</span>
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
