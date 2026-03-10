import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onOpenReservation: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-serif text-2xl tracking-wider text-amber-500">TimeTravel</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#accueil" className="text-sm tracking-widest uppercase hover:text-amber-400 transition-colors">Accueil</a>
            <a href="#destinations" className="text-sm tracking-widest uppercase hover:text-amber-400 transition-colors">Destinations</a>
            <button 
              onClick={onOpenReservation}
              className="text-sm tracking-widest uppercase hover:text-amber-400 transition-colors"
            >
              Réservation
            </button>
            <button 
              onClick={onOpenReservation}
              className="px-6 py-2 border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 text-sm tracking-widest uppercase"
            >
              S'inscrire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#accueil" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base tracking-widest uppercase hover:text-amber-400 transition-colors">Accueil</a>
            <a href="#destinations" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base tracking-widest uppercase hover:text-amber-400 transition-colors">Destinations</a>
            <button 
              onClick={() => {
                setIsOpen(false);
                onOpenReservation();
              }}
              className="block w-full text-left px-3 py-2 text-base tracking-widest uppercase hover:text-amber-400 transition-colors"
            >
              Réservation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
