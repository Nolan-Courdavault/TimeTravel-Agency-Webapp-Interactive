import React from 'react';
import { motion } from 'motion/react';

interface DestinationCardProps {
  title: string;
  era: string;
  description: string;
  imageUrl: string;
  key?: React.Key;
  onClick?: () => void;
}

export default function DestinationCard({ title, era, description, imageUrl, onClick }: DestinationCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      onClick={onClick}
      className="group relative overflow-hidden bg-zinc-900 border border-zinc-800/50 hover:border-amber-500/30 hover:shadow-[0_10px_40px_rgba(245,158,11,0.1)] transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 ease-out">
        <span className="text-amber-500 text-xs tracking-[0.2em] uppercase mb-2 block">{era}</span>
        <h3 className="font-serif text-3xl mb-3">{title}</h3>
        <p className="text-zinc-300 text-sm font-light line-clamp-3">
          {description}
        </p>
        <div className="mt-6 w-8 h-[1px] bg-amber-500/50 group-hover:w-16 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
}
