import { motion } from 'motion/react';
import DestinationCard from './DestinationCard';

interface DestinationsProps {
  onOpenDetails: (destination: any) => void;
}

export default function Destinations({ onOpenDetails }: DestinationsProps) {
  const destinations = [
    {
      title: "Paris 1889",
      era: "La Belle Époque",
      description: "Vivez l'effervescence de l'Exposition Universelle et l'inauguration de la Tour Eiffel.",
      imageUrl: "/assets/Paris 1889.png"
    },
    {
      title: "Crétacé",
      era: "-65M d'années",
      description: "Une aventure sauvage et primordiale au cœur du règne des dinosaures.",
      imageUrl: "/assets/Crétacé.png"
    },
    {
      title: "Florence 1504",
      era: "Renaissance",
      description: "Côtoyez Léonard de Vinci et Michel-Ange à l'apogée de l'art et des sciences.",
      imageUrl: "/assets/Florence 1504.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <section id="destinations" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <span className="text-amber-500 text-sm tracking-[0.2em] uppercase mb-4 block">Catalogue</span>
        <h2 className="font-serif text-4xl md:text-5xl">Époques de Prestige</h2>
        <div className="w-24 h-[1px] bg-zinc-800 mx-auto mt-8"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {destinations.map((dest, index) => (
          <DestinationCard 
            key={index} 
            {...dest} 
            onClick={() => onOpenDetails(dest)}
          />
        ))}
      </motion.div>
    </section>
  );
}
