import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export type LegalType = 'legal' | 'privacy' | null;

interface LegalModalProps {
  type: LegalType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const isOpen = type !== null;

  const content = {
    legal: {
      title: "Mentions Légales",
      text: (
        <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">1. Éditeur du site</h3>
            <p>TimeTravel Agency, Société par Actions Simplifiée (SAS) au capital de 10 000 000 €.</p>
            <p>Siège social : 42 Avenue de l'Éternité, 75000 Paris, France.</p>
            <p>RCS Paris B 123 456 789</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">2. Directeur de la publication</h3>
            <p>Dr. Emmett Brown, en qualité de Président Directeur Général.</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">3. Hébergement</h3>
            <p>Le site est hébergé par ChronoHost Inc., situé au 1 Serveur Quantique, Genève, Suisse.</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">4. Propriété intellectuelle</h3>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">5. Responsabilité temporelle</h3>
            <p>TimeTravel Agency décline toute responsabilité quant aux paradoxes temporels mineurs pouvant résulter de la navigation sur ce site. Les voyageurs sont invités à consulter les conditions générales de voyage temporel avant toute réservation.</p>
          </section>
        </div>
      )
    },
    privacy: {
      title: "Politique de Confidentialité",
      text: (
        <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">1. Collecte des données</h3>
            <p>Nous collectons les données suivantes : nom, prénom, adresse e-mail, empreinte génétique (uniquement pour les voyages pré-historiques), et historique de navigation temporelle.</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">2. Utilisation des données</h3>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Gérer vos réservations de voyages temporels.</li>
              <li>Assurer votre sécurité dans les différentes époques.</li>
              <li>Vous contacter en cas de modification de la ligne temporelle.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">3. Protection et Sécurité</h3>
            <p>Vos données sont cryptées à l'aide d'algorithmes quantiques de dernière génération. Elles sont stockées dans des serveurs isolés temporellement pour empêcher toute altération par des voyageurs du futur.</p>
          </section>
          <section>
            <h3 className="text-amber-500 font-serif text-xl mb-2">4. Vos droits</h3>
            <p>Conformément au RGPD (Règlement Général sur la Protection des Données), vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition au traitement de vos données personnelles. Vous pouvez exercer ces droits en nous contactant via notre formulaire de contact.</p>
          </section>
        </div>
      )
    }
  };

  const currentContent = type ? content[type] : null;

  return (
    <AnimatePresence>
      {isOpen && currentContent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-[70] max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-8 border-b border-zinc-800 flex justify-between items-center shrink-0">
              <div>
                <span className="text-amber-500 text-xs tracking-[0.2em] uppercase block mb-1">Informations</span>
                <h2 className="font-serif text-3xl">{currentContent.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {currentContent.text}
            </div>
            
            <div className="p-6 md:p-8 border-t border-zinc-800 shrink-0">
              <button 
                onClick={onClose}
                className="w-full py-4 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
