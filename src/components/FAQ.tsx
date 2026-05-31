import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I register for a class?',
      a: 'Registration is simple. You can fill out the contact form below or send us a direct message on WhatsApp. We will reply within 24 hours to schedule a placement test if needed.'
    },
    {
      q: 'What are the prices for the courses?',
      a: 'Prices vary depending on the course type (group vs private, online vs offline) and duration. Please contact us for the latest pricing brochure.'
    },
    {
      q: 'Do I need to take a level test?',
      a: 'Yes, for most courses we conduct a quick 15-minute speaking assessment to ensure you are placed in a group that perfectly matches your current abilities.'
    },
    {
      q: 'Are online classes as effective as offline?',
      a: 'Absolutely. Our online classes are fully interactive, live sessions with small groups where speaking and participation are mandatory. It is not just watching a video.'
    },
    {
      q: 'Will I get a certificate?',
      a: 'Yes, upon successful completion of your level and passing the final assessment, you will receive a certificate of completion from EDUXMINA.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative bg-brand-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">Questions & Answers</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-white">
            Commonly Asked Questions
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-white/10 rounded-2xl overflow-hidden transition-colors ${openIndex === i ? 'bg-white/5' : 'bg-transparent hover:bg-white/[0.02]'}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-lg text-white">{faq.q}</span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-white/50 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-white/50 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-white/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
