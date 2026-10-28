import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutTeacher from './components/AboutTeacher';
import Courses from './components/Courses';
import Certificates from './components/Certificates';
import Announcements from './components/Announcements';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

import {
  initialTeacherData,
  initialCourses,
  initialCertificates,
  initialAnnouncements
} from './data/mockData';

export default function App() {
  // Navigation: 'home' or 'admin'
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });

  // Auth token state - STRICTLY IN-MEMORY ONLY
  // User explicitly required: "Men admin panelni har safar ochganimda qaytadan parol kiritishni xohlayman.
  // Sahifa yangilanganda, admin URL’iga to‘g‘ridan-to‘g‘ri kirilganda... avtomatik kirish bo‘lmasin."
  const [authToken, setAuthToken] = useState('');
  const [authVerified, setAuthVerified] = useState(false);

  // Network offline / online status
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Site Data State
  const [teacher, setTeacher] = useState(initialTeacherData);
  const [courses, setCourses] = useState(initialCourses);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [contactRequests, setContactRequests] = useState([]);
  const [selectedCourseForContact, setSelectedCourseForContact] = useState('');

  // Listen to network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 1. Fetch public site data from backend server
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const data = await res.json();
          if (data.teacher) setTeacher(data.teacher);
          if (data.courses) setCourses(data.courses);
          if (data.certificates) setCertificates(data.certificates);
          if (data.announcements) setAnnouncements(data.announcements);
        }
      } catch (err) {
        console.warn('Backend data could not be fetched, using fallback data', err);
      }
    };
    fetchSiteData();
  }, []);

  // 2. Listen to URL hash or path changes
  useEffect(() => {
    const checkRoute = () => {
      const isAdm = window.location.hash === '#admin' || window.location.pathname === '/admin';
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  // 3. Verify auth token when entering admin route
  useEffect(() => {
    const verifyToken = async () => {
      if (!authToken) {
        setAuthVerified(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await res.json();
        if (data.success) {
          setAuthVerified(true);
          // Also fetch contact requests since authorized
          const reqRes = await fetch('/api/contact', {
            headers: { 'Authorization': `Bearer ${authToken}` }
          });
          const reqData = await reqRes.json();
          if (reqData.success) {
            setContactRequests(reqData.requests);
          }
        } else {
          // Token expired or invalid
          setAuthToken('');
          setAuthVerified(false);
        }
      } catch (err) {
        setAuthVerified(false);
      }
    };

    if (isAdminRoute && authToken) {
      verifyToken();
    }
  }, [isAdminRoute, authToken]);

  const handleEnrollClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCourse = (courseTitle) => {
    setSelectedCourseForContact(courseTitle);
    handleEnrollClick();
  };

  // Submit contact inquiry to backend server
  const handleNewContactRequest = async (newReq) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReq)
      });
      const data = await res.json();
      if (data.success) {
        setContactRequests(prev => [data.request, ...prev]);
      }
    } catch (err) {
      console.error('Error submitting contact request', err);
    }
  };

  const handleLoginSuccess = async (token) => {
    setAuthToken(token);
    setAuthVerified(true);
    // Fetch requests
    try {
      const reqRes = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reqData = await reqRes.json();
      if (reqData.success) {
        setContactRequests(reqData.requests);
      }
    } catch (err) {}
  };

  const handleLogout = async () => {
    try {
      if (authToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      }
    } catch (err) {
      console.error('Logout error', err);
    }
    setAuthToken('');
    setAuthVerified(false);
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  // Render Admin View if on admin route
  if (isAdminRoute) {
    if (!authVerified) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={handleBackToSite}
        />
      );
    }

    return (
      <AdminPanel
        token={authToken}
        teacher={teacher}
        setTeacher={setTeacher}
        courses={courses}
        setCourses={setCourses}
        certificates={certificates}
        setCertificates={setCertificates}
        announcements={announcements}
        setAnnouncements={setAnnouncements}
        contactRequests={contactRequests}
        setContactRequests={setContactRequests}
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Public Home Page
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-neon-green selection:text-navy-950 transition-colors duration-300">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-navy-950 text-xs py-2 px-4 text-center font-bold sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
          <span>⚠️ Internet aloqasi vaqtincha uzildi. Sayt oflayn rejimda ishlamoqda.</span>
        </div>
      )}

      {/* Public Navbar (without visible admin button) */}
      <Navbar onEnrollClick={handleEnrollClick} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          teacher={teacher}
          onEnrollClick={handleEnrollClick}
        />

        {/* 2. About Teacher Section */}
        <AboutTeacher teacher={teacher} />

        {/* 3. Courses Section */}
        <Courses
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />

        {/* 4. Student Certificates Gallery */}
        <Certificates certificates={certificates} />

        {/* 5. Announcements & News */}
        <Announcements
          announcements={announcements}
          onEnrollClick={handleEnrollClick}
        />

        {/* 6 & 7. Contact Form & Direct Social Links */}
        <ContactSection
          teacher={teacher}
          selectedCourse={selectedCourseForContact}
          onSubmitRequest={handleNewContactRequest}
        />
      </main>

      {/* 8. Footer (without visible admin button) */}
      <Footer teacher={teacher} />
    </div>
  );
}
