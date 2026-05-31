/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
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

export default function App() {
  return (
    <div className="min-h-screen bg-brand-950 text-white selection:bg-white/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <WhyUs />
        <Testimonials />
        <InstagramShowcase />
        <Stats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
