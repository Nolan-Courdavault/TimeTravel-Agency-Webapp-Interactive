/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import VideoShowcase from './components/VideoShowcase';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ReservationModal from './components/ReservationModal';
import DestinationDetailsModal from './components/DestinationDetailsModal';
import ContactModal from './components/ContactModal';
import LegalModal, { LegalType } from './components/LegalModal';
import QuizModal from './components/QuizModal';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDestinationObj, setSelectedDestinationObj] = useState<any>(null);
  
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalType, setLegalType] = useState<LegalType>(null);

  const openReservation = (destination?: string | any) => {
    setSelectedDestination(typeof destination === 'string' ? destination : '');
    setIsReservationOpen(true);
  };

  const openDetails = (destinationObj: any) => {
    setSelectedDestinationObj(destinationObj);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar onOpenReservation={() => openReservation()} />
      <main>
        <Hero 
          onOpenReservation={() => openReservation()} 
          onOpenQuiz={() => setIsQuizOpen(true)}
        />
        <Destinations onOpenDetails={openDetails} />
        <VideoShowcase />
      </main>
      <Footer 
        onOpenLegal={() => setLegalType('legal')}
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenContact={() => setIsContactOpen(true)}
      />
      <ChatWidget />
      
      <DestinationDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        destination={selectedDestinationObj}
        onReserve={openReservation}
      />
      
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
        selectedDestination={selectedDestination}
      />
      
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      
      <LegalModal 
        type={legalType}
        onClose={() => setLegalType(null)}
      />

      <AnimatePresence>
        {isQuizOpen && (
          <QuizModal onClose={() => setIsQuizOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
