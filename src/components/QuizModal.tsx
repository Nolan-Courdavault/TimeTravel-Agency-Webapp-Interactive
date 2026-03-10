import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronRight, Sparkles, Loader2, MapPin } from 'lucide-react';

interface QuizModalProps {
  onClose: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { text: "Culturelle et artistique", target: "florence" },
      { text: "Aventure et nature", target: "cretace" },
      { text: "Élégance et raffinement", target: "paris" }
    ]
  },
  {
    id: 2,
    question: "Votre période préférée ?",
    options: [
      { text: "Histoire moderne (XIXe-XXe siècle)", target: "paris" },
      { text: "Temps anciens et origines", target: "cretace" },
      { text: "Renaissance et classicisme", target: "florence" }
    ]
  },
  {
    id: 3,
    question: "Vous préférez :",
    options: [
      { text: "L'effervescence urbaine", target: "paris" },
      { text: "La nature sauvage", target: "cretace" },
      { text: "L'art et l'architecture", target: "florence" }
    ]
  },
  {
    id: 4,
    question: "Votre activité idéale :",
    options: [
      { text: "Visiter des monuments", target: "paris" },
      { text: "Observer la faune", target: "cretace" },
      { text: "Explorer des musées", target: "florence" }
    ]
  }
];

const DESTINATIONS = {
  paris: { 
    name: "Paris 1889", 
    title: "La Belle Époque", 
    image: "/assets/Paris 1889.png" 
  },
  cretace: { 
    name: "Crétacé", 
    title: "-65M d'années", 
    image: "/assets/Crétacé.png" 
  },
  florence: { 
    name: "Florence 1504", 
    title: "Renaissance", 
    image: "/assets/Florence 1504.png" 
  }
};

export default function QuizModal({ onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{text: string, target: string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{destination: any, explanation: string} | null>(null);

  const handleAnswer = async (option: {text: string, target: string}) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      setIsGenerating(true);
      setCurrentStep(currentStep + 1); // Move to loading state
      
      const scores: Record<string, number> = { paris: 0, cretace: 0, florence: 0 };
      newAnswers.forEach(ans => {
        if (scores[ans.target] !== undefined) scores[ans.target]++;
      });
      
      const bestMatch = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b) as keyof typeof DESTINATIONS;
      const destination = DESTINATIONS[bestMatch];

      // Try to get AI explanation
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      let explanation = `D'après vos réponses, ${destination.name} est la destination idéale pour vous. Préparez-vous pour un voyage inoubliable !`;

      if (apiKey) {
        try {
          const prompt = `Tu es conseiller chez TimeTravel Agency. Un client a répondu à un quiz avec ces choix :
          1. Expérience : ${newAnswers[0].text}
          2. Période : ${newAnswers[1].text}
          3. Préférence : ${newAnswers[2].text}
          4. Activité : ${newAnswers[3].text}
          
          L'algorithme a déterminé que sa destination idéale est : ${destination.name} (${destination.title}).
          
          Rédige une explication personnalisée (3-4 phrases) pour lui annoncer ce résultat. Explique pourquoi cette destination correspond parfaitement à ses choix. Adopte un ton luxueux, professionnel et passionné. Ne mets pas de guillemets autour de ta réponse.`;

          const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'mistral-small-latest',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 300
            })
          });

          if (response.ok) {
            const data = await response.json();
            explanation = data.choices[0].message.content;
          }
        } catch (error) {
          console.error("Erreur génération IA:", error);
        }
      }

      setResult({ destination, explanation });
      setIsGenerating(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden rounded-2xl z-10"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors z-20 bg-zinc-900/50 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {currentStep < QUESTIONS.length ? (
            // Quiz Questions
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-amber-500 text-sm tracking-[0.2em] uppercase">Question {currentStep + 1} sur {QUESTIONS.length}</span>
                <h3 className="text-2xl md:text-3xl font-serif text-white">{QUESTIONS[currentStep].question}</h3>
              </div>

              <div className="space-y-4 mt-8">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border border-zinc-800 rounded-xl hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group flex justify-between items-center"
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">{option.text}</span>
                    <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : isGenerating ? (
            // Loading State
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"></div>
                <Loader2 size={48} className="text-amber-500 animate-spin relative z-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white">Analyse temporelle en cours...</h3>
                <p className="text-zinc-400">Notre IA quantique calcule votre destination idéale</p>
              </div>
            </div>
          ) : result ? (
            // Result State
            <div className="space-y-8 text-center">
              <div className="space-y-2">
                <span className="text-amber-500 text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  Votre destination idéale
                </span>
                <h3 className="text-4xl font-serif text-white">{result.destination.name}</h3>
                <p className="text-xl text-zinc-400 font-serif italic">{result.destination.title}</p>
              </div>

              <div className="relative h-32 sm:h-48 w-full shrink-0 rounded-xl overflow-hidden border border-zinc-800">
                <img src={result.destination.image} alt={result.destination.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-xl text-left">
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  {result.explanation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={resetQuiz}
                  className="px-6 py-3 border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors text-sm tracking-wider uppercase"
                >
                  Refaire le test
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2"
                >
                  <MapPin size={16} />
                  Voir les destinations
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
