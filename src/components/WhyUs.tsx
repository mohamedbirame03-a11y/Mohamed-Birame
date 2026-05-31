import { motion } from 'motion/react';
import { Users, BookOpen, Clock, Award, MessageCircle, Laptop } from 'lucide-react';

export function WhyUs() {
  const features = [
    {
      icon: <MessageCircle />,
      title: 'Real Practice',
      description: 'Go beyond the textbook. We focus on real-life conversations and practical scenarios.'
    },
    {
      icon: <Users />,
      title: 'Community Support',
      description: 'Join a vibrant community of ambitious learners supporting each other.'
    },
    {
      icon: <Award />,
      title: 'Professional Guidance',
      description: 'Learn from an experienced instructor who understands the specific challenges of Algerian students.'
    },
    {
      icon: <Clock />,
      title: 'Flexible Learning',
      description: 'Schedules designed to fit around your university or work commitments.'
    },
    {
      icon: <Laptop />,
      title: 'Modern Tools',
      description: 'Leveraging digital platforms to make learning accessible, continuous, and fun.'
    },
    {
      icon: <BookOpen />,
      title: 'Structured Approach',
      description: 'Clear syllabus, measurable progress, and constructive feedback every step of the way.'
    }
  ];

  return (
    <section className="py-24 relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-brand-950/[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold tracking-widest text-brand-950/50 uppercase mb-4">The Advantage</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-brand-950">
            Why Choose EDUXMINA
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand-950 text-white shadow-xl">
                <div className="w-6 h-6">{feature.icon}</div>
              </div>
              <h4 className="text-xl font-medium text-brand-950">{feature.title}</h4>
              <p className="text-brand-950/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
