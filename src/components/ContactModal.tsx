import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-900 border border-zinc-800 shadow-2xl z-[70] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-amber-500 text-xs tracking-[0.2em] uppercase block mb-1">Assistance</span>
                  <h2 className="font-serif text-3xl">Contact</h2>
                </div>
                <button 
                  onClick={resetAndClose}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {!isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Sujet</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                    >
                      <option value="" disabled>Sélectionnez un sujet...</option>
                      <option value="reservation">Question sur une réservation</option>
                      <option value="partnership">Partenariat</option>
                      <option value="support">Support technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-none px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Envoyer le message
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-amber-500" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4">Message envoyé</h3>
                  <p className="text-zinc-400 mb-8">
                    Notre équipe temporelle a bien reçu votre message. Nous vous répondrons dans les plus brefs délais.
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
