import { motion } from 'motion/react';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenQuiz: () => void;
}

export default function Hero({ onOpenReservation, onOpenQuiz }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950 z-10"></div>
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop" 
          alt="Nebula" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className="block text-amber-500 text-sm md:text-base tracking-[0.3em] uppercase mb-6">
          L'ultime privilège
        </motion.span>
        <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
          Découvrez les couloirs du <span className="italic text-amber-500/90">temps</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Une expérience sur mesure pour les voyageurs exigeants. Revivez l'histoire, façonnez l'avenir, avec une élégance intemporelle.
        </motion.p>
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => {
              document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium w-full sm:w-auto"
          >
            Explorer nos époques
          </button>
          <button 
            onClick={onOpenQuiz}
            className="px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            Test de personnalité
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
