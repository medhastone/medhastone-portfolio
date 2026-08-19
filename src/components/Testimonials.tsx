import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

const testimonials = [
  {
    id: 1,
    name: "Aman Rajput",
    role: "Founder, TechGrow Solutions",
    feedback: "Medhastone transformed our workflow. The custom app they built handles offline sync flawlessly, allowing our field team to work without interruptions. Highly recommended for complex solutions!",
    rating: 5,
    initials: "AR"
  },
  {
    id: 2,
    name: "Sneha Gupta",
    role: "Product Manager, ElevateX",
    feedback: "Their expertise in Flutter means we got high-performance Android, iOS, and Web apps from a single codebase. It saved us significant time and budget without sacrificing quality.",
    rating: 5,
    initials: "SG"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "CEO, Nexa Retail",
    feedback: "A highly professional team. The UI/UX of our new dashboard is outstanding, and they delivered the entire project well ahead of schedule. Truly high-performance digital experiences.",
    rating: 5,
    initials: "RV"
  }
];

export default function Testimonials() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-xl px-gutter max-w-container-max mx-auto w-full z-10" 
      id="testimonials"
    >
      <motion.div variants={itemVariants} className="text-center mb-xl">
        <h2 className="text-headline-lg text-on-surface mb-xs tracking-wide">Client Success Stories</h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto mt-sm">Hear what our partners have to say about our development process, performance, and final deliverables.</p>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-md shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {testimonials.map((testimonial) => (
          <motion.div 
            key={testimonial.id} 
            variants={itemVariants} 
            className="glass-card p-lg rounded-2xl hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(129,140,248,0.2)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
          >
            {/* Decorative Quote Icon Background */}
            <span className="material-symbols-outlined absolute top-4 right-4 text-[80px] text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">format_quote</span>
            
            <div className="flex items-center gap-md mb-md relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.4)]">
                <span className="text-on-primary font-bold text-title-md">{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="text-title-lg text-on-surface font-medium">{testimonial.name}</h4>
                <p className="text-label-mono text-on-surface-variant text-[11px] tracking-widest">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-md relative z-10">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[16px] text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">star</span>
              ))}
            </div>

            <p className="text-body-md text-on-surface-variant leading-relaxed relative z-10 flex-grow italic">
              "{testimonial.feedback}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
