import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function VideoShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <span className="text-amber-500 text-sm tracking-[0.2em] uppercase mb-4 block">Notre Vision</span>
        <h2 className="font-serif text-4xl md:text-5xl">L'Expérience TimeTravel</h2>
        <div className="w-24 h-[1px] bg-zinc-800 mx-auto mt-8"></div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative aspect-video w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group rounded-xl"
      >
        <iframe 
          src="https://drive.google.com/file/d/1MT3SljcZVqCBPBxinIEHb5AhQ293z9vq/preview"
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen"
          title="TimeTravel Video"
        ></iframe>
      </motion.div>
    </section>
  );
}
