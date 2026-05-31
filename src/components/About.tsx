import { motion } from 'motion/react';
import { Target, Heart, Sparkles, GraduationCap } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: 'Teaching Philosophy',
      description: 'Language is a tool for connection, not just a subject to memorize. We focus on natural flow and practical usage.'
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: 'Our Mission',
      description: 'To empower Algerian students with the English fluency required to compete on a global stage.'
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: 'Passion Driven',
      description: 'Helping students overcome their fear of speaking and building ultimate confidence.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: 'Modern Methods',
      description: 'Moving away from outdated repetitive models to interactive, engaging, and relevant content.'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-brand-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">About Me / نبذة عني</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white leading-tight mb-6">
              Meet Your English Teacher
              <span className="block mt-4 text-2xl md:text-3xl text-white/90 font-sans tracking-wide" dir="rtl">تعرّف على أستاذتك للغة الإنجليزية</span>
            </h3>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-white/70 leading-relaxed">
                I am dedicated to transforming the way English is taught in Algeria. Combining international standards with a deep understanding of local student needs, my goal is to make learning English an exciting, confidence-building journey.
              </p>
              <p className="text-lg text-white/70 leading-relaxed font-sans" dir="rtl">
                أسعى جاهدة لإحداث نقلة نوعية في طرق تدريس اللغة الإنجليزية في الجزائر. بدمج المعايير العالمية مع الفهم العميق لاحتياجات الطالب الجزائري، هدفي هو جعل رحلة التعلّم ممتعة لتنطلق وتشعر بثقة حقيقية.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {values.slice(0,2).map((val, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                    {val.icon}
                  </div>
                  <h4 className="font-medium text-white">{val.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-900 border border-white/10 relative mt-12 md:mt-24 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=1000&auto=format&fit=crop" 
                  alt="English Teacher Photo 1" 
                  className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-900 border border-white/10 relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop" 
                  alt="English Teacher Photo 2" 
                  className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
            </div>
            
            {/* Background blur effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-500/20 blur-[100px] z-0 rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute -bottom-6 md:-bottom-12 sm:left-4 sm:right-4 z-20 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
              <blockquote className="text-sm md:text-base font-medium text-white mb-4">
                "Inspiring a passion for learning that endures. Grateful & boundless."
                <span className="block mt-3 text-sm md:text-base text-white/80 font-normal font-sans tracking-wide leading-relaxed" dir="rtl">
                  "إلهام شغف التعلم الذي يدوم. ممتنة وبلا حدود."
                </span>
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-500/20 mix-blend-overlay"></div>
                    <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=200&auto=format&fit=crop" alt="Miss Amina" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">Miss Amina</div>
                    <div className="text-xs text-white/50">English Teacher • Laghouat, Algeria</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-white/50">Instagram</div>
                  <a href="https://www.instagram.com/eduxmina/" target="_blank" rel="noreferrer" className="text-sm font-medium text-white hover:text-brand-300 transition-colors">@eduxmina</a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
