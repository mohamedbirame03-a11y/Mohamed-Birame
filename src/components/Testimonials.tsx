import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Amira B.",
      role: "University Student",
      text: "I used to freeze when asked to speak English. Teacher Mina’s classes completely changed my mindset. The environment is so supportive.",
      rating: 5
    },
    {
      name: "Karim M.",
      role: "BAC Student",
      text: "The BAC prep module was exactly what I needed. Everything was explained clearly without the boring traditional methods. Got an excellent grade!",
      rating: 5
    },
    {
      name: "Sarah T.",
      role: "Professional",
      text: "The speaking mastery course helped me nail my job interviews. I sound natural and confident now. Highly recommend to any Algerian looking to upskill.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 relative z-10 bg-brand-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">Wall of Love</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-white">
            Student Success Stories
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-8 flex-grow">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-display font-medium text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
