import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination?: string;
}

export default function ReservationModal({ isOpen, onClose, selectedDestination = '' }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: selectedDestination,
    date: '',
    travelers: '1',
    duration: '7',
    name: '',
    email: '',
    specialRequests: ''
  });

  const destinations = [
    "Paris 1889 - La Belle Époque",
    "Crétacé - -65M d'années",
    "Florence 1504 - Renaissance"
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, destination: selectedDestination }));
    }
  }, [isOpen, selectedDestination]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Move to success step
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setStep(1);
      setFormData({
        destination: '',
        date: '',
        travelers: '1',
        duration: '7',
        name: '',
        email: '',
        specialRequests: ''
      });
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-2xl z-[70] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-amber-500 text-xs tracking-[0.2em] uppercase block mb-1">Portail Temporel</span>
                  <h2 className="font-serif text-3xl">Réservation</h2>
                </div>
                <button 
                  onClick={resetAndClose}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-zinc-800 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-amber-500 z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
                
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                      step >= s ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 border border-zinc-700 text-zinc-500'
                    }`}
                  >
                    {s === 3 && step === 3 ? <CheckCircle2 size={16} /> : s}
                  </div>
                ))}
              </div>

              {/* Step 1: Voyage Details */}
              {step === 1 && (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                  onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                >
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Destination Temporelle</label>
                    <select 
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                    >
                      <option value="" disabled>Sélectionnez une époque...</option>
                      {destinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
                        <Calendar size={16} /> Date de départ (Temps Réel)
                      </label>
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
                        <Clock size={16} /> Durée du séjour (Jours)
                      </label>
                      <select 
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                      >
                        <option value="3">3 Jours (Court séjour)</option>
                        <option value="7">7 Jours (Standard)</option>
                        <option value="14">14 Jours (Immersion)</option>
                        <option value="30">30 Jours (Expatriation)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
                      <Users size={16} /> Nombre de voyageurs
                    </label>
                    <input 
                      type="number" 
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium mt-8"
                  >
                    Continuer
                  </button>
                </motion.form>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Nom complet</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jean Dupont"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Email de contact</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jean@exemple.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Demandes spéciales (Optionnel)</label>
                    <textarea 
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Allergies, préférences de costumes d'époque, équipement spécifique..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-4 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium"
                    >
                      Retour
                    </button>
                    <button 
                      type="submit"
                      className="w-2/3 py-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium"
                    >
                      Confirmer la réservation
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-amber-500" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4">Préparation au saut temporel</h3>
                  <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    Votre demande de voyage pour <span className="text-amber-500">{formData.destination}</span> a été enregistrée. Un agent temporel vous contactera sous 24h pour finaliser les protocoles de sécurité.
                  </p>
                  <button 
                    onClick={resetAndClose}
                    className="px-8 py-4 border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 text-sm tracking-[0.2em] uppercase"
                  >
                    Fermer
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
