import { motion } from 'motion/react';
import { ArrowRight, Play, Star } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://scontent.cdninstagram.com/v/t51.82787-19/705749231_17951208918170885_2262895318284253937_n.jpg?_nc_cat=105&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=whHQ45jOE2AQ7kNvwHJcLWy&_nc_oc=AdqjjB0vk_DoIwsGolsP-qDF96pqe0CTRWESfMDkjiJxKqJ8Sr5g8GZMyKPKSGSmdsQ&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=2eBbZjI5pPA0tc0SSz6oRw&_nc_ss=7f6a8&oh=00_Af8CN-miYxD6SYZiMbwGCAjEExMo-_pHXyqCfYaB2xck6g&oe=6A214060')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950/80 to-brand-950"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-white/80">Premium English Learning in Algeria</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-white max-w-5xl leading-[1.1]"
        >
          Learn English. <br />
          <span className="text-white/50">Build Your Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
        >
          Join thousands of students learning English through a modern and practical approach. Tailored for Algerian students seeking excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#courses"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-950 bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a
            href="#contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
          >
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4 text-white/70 fill-white/70" />
              Book Your Seat
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl"
        >
          {[
            { value: '40K+', label: 'Instagram Followers' },
            { value: 'Hundreds', label: 'Of Active Students' },
            { value: 'Online', label: '& Offline Classes' },
            { value: '100%', label: 'Practical English' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-display font-medium text-white">{stat.value}</span>
              <span className="text-xs md:text-sm text-white/50 mt-2 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
