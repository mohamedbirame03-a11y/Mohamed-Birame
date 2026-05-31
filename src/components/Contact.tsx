import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    course: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'validation_error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.course) {
      setStatus('validation_error');
      return;
    }

    let formattedPhone = formData.phone;
    if (!formattedPhone.startsWith('+213')) {
      const cleanNumber = formattedPhone.replace(/\D/g, '').replace(/^0/, '');
      formattedPhone = `+213${cleanNumber}`;
    }
    
    setStatus('submitting');
    try {
      const addDocPromise = addDoc(collection(db, 'registrations'), {
        ...formData,
        phone: formattedPhone,
        createdAt: serverTimestamp()
      });
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout connecting to database')), 8000)
      );
      
      await Promise.race([addDocPromise, timeoutPromise]);
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', phone: '', course: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-brand-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">Book Your Seat</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white leading-tight mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-white/60 mb-12 max-w-md">
              Secure your spot in the upcoming session. Fill out the form below and we will get back to you with the details.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-white/50 font-medium">Location</div>
                  <div className="text-white">Algiers, Algeria (Available Online)</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-white/50 font-medium">Email</div>
                  <div className="text-white">hello@eduxmina.dz</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            {status === 'success' ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                 <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle className="w-8 h-8" />
                 </div>
                 <h4 className="text-2xl font-display font-medium text-white mb-2">Registration Received!</h4>
                 <p className="text-white/60">Thank you for registering. We will reach out to you on WhatsApp shortly.</p>
                 <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-2 border border-white/20 rounded-full text-white/80 hover:bg-white/10 transition"
                 >
                   Submit another
                 </button>
               </div>
            ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">First Name</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Phone Number (WhatsApp)</label>
                <div className="flex w-full items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-white/30 transition-colors" dir="ltr">
                  <span className="px-4 py-3 text-white/60 bg-white/5 border-r border-white/10 font-medium">+213</span>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent px-4 py-3 text-white focus:outline-none"
                    placeholder="55 12 34 56"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Interested In</label>
                <select 
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-brand-900 text-white/50">Select a course...</option>
                  <option value="beginner" className="bg-brand-900">Beginner English</option>
                  <option value="intermediate" className="bg-brand-900">Intermediate English</option>
                  <option value="speaking" className="bg-brand-900">Speaking classes</option>
                  <option value="bac" className="bg-brand-900">BAC Preparation</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg">Failed to submit registration. Please try again.</div>
              )}
              {status === 'validation_error' && (
                <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg">يرجى ملء جميع الحقول المطلوبة قبل الإرسال.</div>
              )}

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="mt-4 w-full group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-brand-950 bg-white rounded-xl overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? 'Submitting...' : 'Submit Registration'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
              
              <p className="text-xs text-center text-white/40 mt-2">
                We will contact you via WhatsApp to finalize your registration.
              </p>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
