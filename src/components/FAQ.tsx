import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What platforms do you develop apps for?",
    answer: "We specialize in cross-platform development using Flutter, which allows us to build native-quality applications for iOS, Android, and the Web from a single codebase. This ensures consistency and faster time-to-market."
  },
  {
    question: "How does your pricing model work?",
    answer: "Our pricing is flexible and tailored to your project's scope. We offer both fixed-price contracts for well-defined projects and hourly/retainer models for ongoing development and scalable MVPs. We provide transparent estimates after our initial discovery phase."
  },
  {
    question: "How long does it typically take to build an application?",
    answer: "Timelines vary based on complexity. A basic MVP might take 4-8 weeks, while complex enterprise solutions with custom backends can take 3-6 months. We work in agile sprints to deliver functional milestones quickly."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, absolutely. We offer post-launch support and maintenance packages to ensure your application stays updated with the latest OS versions, remains secure, and scales smoothly as your user base grows."
  },
  {
    question: "Can you integrate with our existing backend or APIs?",
    answer: "Yes, we have extensive experience integrating with existing RESTful APIs, GraphQL endpoints, Firebase, Supabase, and custom enterprise backends to ensure seamless data flow within your existing infrastructure."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-xl px-gutter max-w-[800px] mx-auto w-full z-10 mb-xl" 
      id="faq"
    >
      <motion.div variants={itemVariants} className="text-center mb-xl">
        <h2 className="text-headline-lg text-on-surface mb-xs tracking-wide">Frequently Asked Questions</h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto mt-sm">Clear answers to common questions about our development process, pricing, and services.</p>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-md shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
      </motion.div>

      <motion.div variants={containerVariants} className="flex flex-col gap-sm">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`glass-card rounded-2xl overflow-hidden border transition-colors duration-300 ${isActive ? 'border-primary/50 bg-primary/5' : 'border-white/5 hover:border-white/10'}`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-lg py-md flex items-center justify-between gap-md focus:outline-none"
              >
                <h3 className={`text-title-lg font-medium transition-colors pr-8 ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                  {faq.question}
                </h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'bg-primary text-on-primary rotate-180 shadow-[0_0_15px_rgba(129,140,248,0.4)]' : 'bg-surface-container text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-lg pb-md pt-xs text-body-md text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
