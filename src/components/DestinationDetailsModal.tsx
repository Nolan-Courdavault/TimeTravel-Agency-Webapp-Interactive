import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, Info } from 'lucide-react';

interface Destination {
  title: string;
  era: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
  highlights?: string[];
}

interface DestinationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
  onReserve: (destinationTitle: string) => void;
}

export default function DestinationDetailsModal({ isOpen, onClose, destination, onReserve }: DestinationDetailsModalProps) {
  if (!destination) return null;

  // Added some mock detailed data if not provided
  const longDescription = destination.longDescription || `${destination.description} Plongez au cœur de cette époque fascinante grâce à notre technologie de saut temporel de pointe. Une immersion totale vous attend, avec des costumes d'époque authentiques, un traducteur universel neuronal et une assurance paradoxe temporel incluse.`;
  
  const highlights = destination.highlights || [
    "Immersion historique totale",
    "Costumes d'époque sur mesure",
    "Guide temporel expert inclus",
    "Assurance paradoxe temporel"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-zinc-900 border border-zinc-800 shadow-2xl z-[70] max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={destination.imageUrl} 
                alt={destination.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900"></div>
              
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 md:hidden w-10 h-10 bg-zinc-900/50 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-100 border border-zinc-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto max-h-[calc(90vh-16rem)] md:max-h-[90vh]">
              <div className="hidden md:flex justify-end mb-4">
                <button 
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <span className="text-amber-500 text-xs tracking-[0.2em] uppercase block mb-2">{destination.era}</span>
              <h2 className="font-serif text-4xl mb-6">{destination.title}</h2>
              
              <div className="prose prose-invert prose-zinc max-w-none mb-8">
                <p className="text-zinc-300 font-light leading-relaxed">
                  {longDescription}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-sm tracking-[0.1em] uppercase text-zinc-500 mb-4">Points forts du voyage</h3>
                <ul className="space-y-3">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300">
                      <div className="mt-1 text-amber-500"><Info size={16} /></div>
                      <span className="font-light">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-800">
                <button 
                  onClick={() => {
                    onClose();
                    onReserve(`${destination.title} - ${destination.era}`);
                  }}
                  className="w-full py-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium"
                >
                  Réserver ce voyage
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
