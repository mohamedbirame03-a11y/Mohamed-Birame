import { motion } from 'motion/react';

export function Stats() {
  const stats = [
    { value: '40K+', label: 'Social Media Community' },
    { value: '1000+', label: 'Lessons Delivered' },
    { value: '98%', label: 'Student Satisfaction' },
    { value: '24/7', label: 'Growing Community' }
  ];

  return (
    <section className="py-24 relative bg-brand-950 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <h4 className="text-5xl md:text-6xl font-display font-medium text-white mb-4">
                {stat.value}
              </h4>
              <p className="text-sm font-semibold tracking-wider text-white/50 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
