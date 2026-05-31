import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function Courses() {
  const defaultCourses = [
    {
      title: 'Beginner English',
      description: 'Start your journey from zero. Build a strong foundation in grammar, vocabulary, and basic conversation.',
      tags: 'Level A1-A2, 3 Months',
      price: '5000 DZD'
    },
    {
      title: 'Intermediate English',
      description: 'Take your English to the next level. Complex grammar, richer vocabulary, and fluid sentence structures.',
      tags: 'Level B1-B2, 3 Months',
      price: '6000 DZD'
    },
    {
      title: 'Speaking Mastery',
      description: 'Intensive conversation classes designed to eliminate your fear of speaking and improve pronunciation.',
      tags: 'All Levels, Ongoing',
      price: '4500 DZD'
    }
  ];

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'courses'), (docRef) => {
      if (docRef.exists()) {
        setCourses(docRef.data().items || []);
      } else {
        setCourses(defaultCourses);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="courses" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4" dir="rtl">البرامج التدريبية / Curriculum</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white leading-tight">
              Premium Courses for <br/> Every Level
            </h3>
          </div>
          <p className="text-white/60 max-w-sm">
            Structured programs designed to deliver real results. Choose the path that fits your current level and future goals.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white/50 py-12">Loading courses...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors"
                dir="auto"
              >
                
                <div className="flex flex-wrap gap-2 mb-6" dir="ltr">
                  {(course.tags || '').split(',').map((tag: string, j: number) => tag.trim() && (
                    <span key={j} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <h4 className="text-2xl font-display font-medium text-white mb-4">{course.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                  {course.description}
                </p>

                {course.price && (
                  <div className="text-lg font-medium text-brand-300 mb-6 bg-brand-900/50 inline-block px-4 py-2 rounded-lg border border-brand-800/50">
                    {course.price}
                  </div>
                )}

                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/80 transition-colors mt-auto w-max" dir="ltr">
                  Register Now
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
