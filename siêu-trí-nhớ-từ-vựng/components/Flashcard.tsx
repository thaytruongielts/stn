import React, { useState } from 'react';
import { VocabularyWord } from '../types';
import { Volume2, RotateCw } from 'lucide-react';

interface FlashcardProps {
  word: VocabularyWord;
}

const Flashcard: React.FC<FlashcardProps> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.term);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      className="group perspective-1000 w-full max-w-sm h-96 cursor-pointer mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl bg-white border border-slate-200 overflow-hidden flex flex-col">
          <div className="h-3/5 bg-slate-100 flex items-center justify-center p-4">
            <img 
              src={word.imageUrl} 
              alt={word.term} 
              className="max-h-full max-w-full object-contain rounded-md shadow-sm"
            />
          </div>
          <div className="h-2/5 p-6 flex flex-col items-center justify-center text-center bg-white">
            <h3 className="text-3xl font-bold text-indigo-600 mb-2">{word.term}</h3>
            <p className="text-slate-500 italic">{word.pronunciation}</p>
            <div className="mt-4 flex items-center text-xs text-slate-400 gap-1">
              <RotateCw size={14} /> Chạm để lật
            </div>
          </div>
          <button 
            onClick={handleSpeech}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-indigo-100 text-indigo-600 transition-colors shadow-sm backdrop-blur-sm"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 flex flex-col justify-center items-center text-center">
           <h3 className="text-2xl font-bold mb-4">{word.vietnamese}</h3>
           <p className="text-indigo-100 mb-6 font-medium">{word.definition}</p>
           
           <div className="bg-white/10 p-4 rounded-xl w-full">
             <p className="text-sm font-semibold text-indigo-200 uppercase mb-2">Ví dụ:</p>
             <p className="italic">"{word.example}"</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Flashcard;