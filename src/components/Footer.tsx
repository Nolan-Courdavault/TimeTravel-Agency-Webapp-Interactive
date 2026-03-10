interface FooterProps {
  onOpenLegal: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export default function Footer({ onOpenLegal, onOpenPrivacy, onOpenContact }: FooterProps) {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <span className="font-serif text-2xl tracking-wider text-amber-500 block mb-2">TimeTravel</span>
            <span className="text-zinc-500 text-sm tracking-widest uppercase">L'agence temporelle</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <button 
              onClick={onOpenLegal}
              className="text-zinc-500 hover:text-amber-500 text-sm tracking-widest uppercase transition-colors"
            >
              Mentions Légales
            </button>
            <button 
              onClick={onOpenPrivacy}
              className="text-zinc-500 hover:text-amber-500 text-sm tracking-widest uppercase transition-colors"
            >
              Confidentialité
            </button>
            <button 
              onClick={onOpenContact}
              className="text-zinc-500 hover:text-amber-500 text-sm tracking-widest uppercase transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
        
        <div className="text-center text-zinc-700 text-xs tracking-widest uppercase border-t border-zinc-900 pt-8">
          &copy; {new Date().getFullYear()} TimeTravel Agency. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
