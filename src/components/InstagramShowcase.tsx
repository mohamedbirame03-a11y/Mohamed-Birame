import { motion } from 'motion/react';
import { Instagram, Play } from 'lucide-react';

export function InstagramShowcase() {
  const posts = [
    { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop', type: 'video' },
    { img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop', type: 'image' },
    { img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop', type: 'video' },
    { img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop', type: 'image' }
  ];

  return (
    <section className="py-24 relative bg-brand-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-2">Join 40K+ Learners</h2>
          <p className="text-white/60">Follow for daily English tips, vocabulary and speaking challenges.</p>
        </div>
        <a 
          href="https://instagram.com" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-950 rounded-full font-medium"
        >
          <Instagram className="w-5 h-5" />
          @eduxmina
        </a>
      </div>

      <div className="w-full flex gap-4 px-6 overflow-x-auto pb-8 snap-x" style={{ scrollbarWidth: 'none' }}>
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-none w-[280px] md:w-[320px] aspect-[9/16] relative rounded-3xl overflow-hidden group snap-center cursor-pointer border border-white/10"
          >
            <img src={post.img} alt="Instagram Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {post.type === 'video' && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            )}
            
            <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <p className="text-white text-sm font-medium line-clamp-2">Daily english learning tip... check it out! 📚✨</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
