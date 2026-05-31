import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function Resources({ show }: { show?: boolean }) {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'resources'), (docRef) => {
      if (docRef.exists()) {
        setResources(docRef.data().items || []);
      } else {
        setResources([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (show === false || (!loading && resources.length === 0)) return null;

  return (
    <section id="resources" className="py-24 relative z-10 bg-brand-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4" dir="rtl">المصادر والملفات / Resources</h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-white leading-tight">
            Free Educational <br/> Resources
          </h3>
        </div>

        {loading ? (
          <div className="text-center text-white/50 py-12">Loading resources...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-colors"
                dir="auto"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                    <FileText className="w-6 h-6 text-brand-300" />
                </div>

                <h4 className="text-xl font-display font-medium text-white mb-3">{resource.title}</h4>
                {resource.description && (
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow border-b border-white/5 pb-6">
                        {resource.description}
                    </p>
                )}

                <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 group-hover:text-brand-200 transition-colors mt-auto w-max" dir="ltr">
                  Download PDF
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
