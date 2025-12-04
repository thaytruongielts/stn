import React, { useState, useEffect } from 'react';
import { VocabularyWord, GameCard } from '../types';
import { Shuffle, Check, Sparkles } from 'lucide-react';

interface MemoryGameProps {
  words: VocabularyWord[];
}

const MemoryGame: React.FC<MemoryGameProps> = ({ words }) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [choiceOne, setChoiceOne] = useState<GameCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<GameCard | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);

  // Initialize game
  const shuffleCards = () => {
    const cardImages = words.map(word => ({
      vocabId: word.id,
      type: 'IMAGE' as const,
      content: word.imageUrl,
      id: Math.random().toString()
    }));

    const cardWords = words.map(word => ({
      vocabId: word.id,
      type: 'WORD' as const,
      content: word.term,
      id: Math.random().toString()
    }));

    const allCards = [...cardImages, ...cardWords]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, isFlipped: false, isMatched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(allCards);
    setMatches(0);
  };

  useEffect(() => {
    shuffleCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle a choice
  const handleChoice = (card: GameCard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.vocabId === choiceTwo.vocabId && choiceOne.id !== choiceTwo.id) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.vocabId === choiceOne.vocabId) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        setMatches(prev => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const isWin = matches === words.length;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center w-full mb-6 px-4">
        <h2 className="text-xl font-bold text-slate-800">Lật Hình Ghi Nhớ</h2>
        <button 
          onClick={shuffleCards}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Shuffle size={16} /> Chơi lại
        </button>
      </div>

      {isWin && (
        <div className="mb-6 p-6 bg-green-100 border border-green-200 text-green-800 rounded-2xl flex flex-col items-center animate-bounce">
          <Sparkles className="mb-2 text-green-600" size={32} />
          <p className="text-lg font-bold">Xuất sắc! Bạn đã hoàn thành.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full px-2">
        {cards.map(card => (
          <div 
            key={card.id} 
            className="relative h-32 md:h-40 cursor-pointer perspective-1000"
            onClick={() => !disabled && !card.isFlipped && !card.isMatched ? handleChoice(card) : null}
          >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${(card.isFlipped || card === choiceOne || card === choiceTwo || card.isMatched) ? 'rotate-y-180' : ''}`}>
              
              {/* Back (Cover) */}
              <div className="absolute w-full h-full bg-indigo-200 rounded-xl backface-hidden flex items-center justify-center border-2 border-indigo-300 hover:bg-indigo-300 transition-colors">
                <span className="text-3xl font-bold text-indigo-400">?</span>
              </div>

              {/* Front (Content) */}
              <div className={`absolute w-full h-full bg-white rounded-xl backface-hidden rotate-y-180 flex items-center justify-center border-2 overflow-hidden ${card.isMatched ? 'border-green-400 bg-green-50' : 'border-indigo-500'}`}>
                {card.type === 'IMAGE' ? (
                  <img src={card.content} alt="vocab" className="w-full h-full object-cover p-1" />
                ) : (
                  <p className="text-sm md:text-base font-bold text-indigo-900 text-center px-1 break-words leading-tight">{card.content}</p>
                )}
                {card.isMatched && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;