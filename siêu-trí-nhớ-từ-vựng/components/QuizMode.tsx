import React, { useState } from 'react';
import { VocabularyWord } from '../types';
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizModeProps {
  words: VocabularyWord[];
}

const QuizMode: React.FC<QuizModeProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Generate options (1 correct, 3 distractors)
  const currentWord = words[currentIndex];
  
  // Memoize options to prevent reshuffling on render
  const options = React.useMemo(() => {
    const distractors = words
      .filter(w => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    return [...distractors, currentWord].sort(() => 0.5 - Math.random());
  }, [currentWord, words]);

  const handleAnswer = (vietnamese: string) => {
    if (showResult) return;
    
    setSelectedAnswer(vietnamese);
    setShowResult(true);
    
    if (vietnamese === currentWord.vietnamese) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Kết Quả</h2>
        <div className="text-6xl mb-6 font-black text-indigo-600">
          {score}/{words.length}
        </div>
        <p className="text-slate-600 mb-8">
          {score === words.length ? 'Tuyệt vời! Bạn đã thuộc hết từ.' : 'Hãy luyện tập thêm nhé!'}
        </p>
        <button 
          onClick={resetQuiz}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Làm lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Câu hỏi {currentIndex + 1}/{words.length}</span>
          <span className="text-sm font-bold text-indigo-600">Điểm: {score}</span>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-slate-800 mb-4">{currentWord.term}</h3>
          <img src={currentWord.imageUrl} alt="hint" className="h-32 mx-auto object-contain opacity-50 mb-4" />
          <p className="text-slate-500">Chọn nghĩa tiếng Việt đúng:</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => {
            let btnClass = "p-4 rounded-xl border-2 text-left transition-all font-medium text-slate-700 hover:bg-slate-50";
            
            if (showResult) {
               if (opt.vietnamese === currentWord.vietnamese) {
                 btnClass = "p-4 rounded-xl border-2 text-left bg-green-100 border-green-500 text-green-800";
               } else if (selectedAnswer === opt.vietnamese) {
                 btnClass = "p-4 rounded-xl border-2 text-left bg-red-100 border-red-500 text-red-800";
               } else {
                 btnClass = "p-4 rounded-xl border-2 text-left opacity-50";
               }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.vietnamese)}
                disabled={showResult}
                className={btnClass}
              >
                <div className="flex justify-between items-center">
                  {opt.vietnamese}
                  {showResult && opt.vietnamese === currentWord.vietnamese && <CheckCircle size={20} className="text-green-600" />}
                  {showResult && selectedAnswer === opt.vietnamese && opt.vietnamese !== currentWord.vietnamese && <XCircle size={20} className="text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 flex justify-end">
            <button 
              onClick={nextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 animate-bounce"
            >
              Tiếp tục <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMode;