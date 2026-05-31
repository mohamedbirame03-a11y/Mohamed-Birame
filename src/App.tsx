/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { InstagramShowcase } from './components/InstagramShowcase';
import { Stats } from './components/Stats';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';
import { Resources } from './components/Resources';
import { doc, increment, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const defaultSettings = {
  showAbout: true,
  showCourses: true,
  showWhyUs: true,
  showTestimonials: true,
  showInstagram: true,
  showStats: true,
  showFAQ: true,
  showResources: true
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [settings, setSettings] = useState<any>(defaultSettings);

  useEffect(() => {
    const p = window.location.pathname;
    const h = window.location.hash;
    const s = window.location.search;
    
    // Support multiple ways to access admin for preview and production
    const isAdmin = p.startsWith('/management-amina') || h.includes('management-amina') || s.includes('admin=true');
    setIsAdminRoute(isAdmin);

    if (!isAdmin) {
      // Increment visits counter if not admin page
      const visitsRef = doc(db, 'analytics', 'visits');
      setDoc(visitsRef, { count: increment(1) }, { merge: true }).catch(console.error);

      // Load settings
      const unsubscribe = onSnapshot(doc(db, 'content', 'settings'), (docRef) => {
        if (docRef.exists()) {
          setSettings({ ...defaultSettings, ...docRef.data() });
        }
      });
      return () => unsubscribe();
    }
  }, []);

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-brand-950 text-white selection:bg-white/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        {settings.showAbout !== false && <About />}
        {settings.showCourses !== false && <Courses />}
        {settings.showResources !== false && <Resources />}
        {settings.showWhyUs !== false && <WhyUs />}
        {settings.showTestimonials !== false && <Testimonials />}
        {settings.showInstagram !== false && <InstagramShowcase />}
        {settings.showStats !== false && <Stats />}
        {settings.showFAQ !== false && <FAQ />}
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
