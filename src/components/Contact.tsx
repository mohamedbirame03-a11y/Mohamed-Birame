import { motion } from 'motion/react';
import { Send, MapPin, Mail } from 'lucide-react';

export function Contact() {
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
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Phone Number (WhatsApp)</label>
                <input 
                  type="tel" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="+213 XX XX XX XX"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Interested In</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-brand-900 text-white/50">Select a course...</option>
                  <option value="beginner" className="bg-brand-900">Beginner English</option>
                  <option value="intermediate" className="bg-brand-900">Intermediate English</option>
                  <option value="speaking" className="bg-brand-900">Speaking classes</option>
                  <option value="bac" className="bg-brand-900">BAC Preparation</option>
                </select>
              </div>

              <button className="mt-4 w-full group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-brand-950 bg-white rounded-xl overflow-hidden transition-transform active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  Submit Registration
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
              
              <p className="text-xs text-center text-white/40 mt-2">
                We will contact you via WhatsApp to finalize your registration.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
