import React, { useState } from 'react';
import { AppView } from './types';
import { VOCAB_LIST } from './constants';
import Flashcard from './components/Flashcard';
import MemoryGame from './components/MemoryGame';
import StoryMode from './components/StoryMode';
import QuizMode from './components/QuizMode';
import { Brain, Gamepad2, Layers, BookOpen, CheckSquare } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LEARN);
  const [vocabIndex, setVocabIndex] = useState(0);

  const renderContent = () => {
    switch (currentView) {
      case AppView.LEARN:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-8">
            <Flashcard word={VOCAB_LIST[vocabIndex]} />
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-slate-100">
              {VOCAB_LIST.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setVocabIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === vocabIndex ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-indigo-300'}`}
                />
              ))}
            </div>
            
            <div className="flex gap-4">
               <button 
                 onClick={() => setVocabIndex(prev => Math.max(0, prev - 1))}
                 disabled={vocabIndex === 0}
                 className="px-6 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-50 hover:bg-slate-50 font-medium shadow-sm"
               >
                 Trước
               </button>
               <button 
                 onClick={() => setVocabIndex(prev => Math.min(VOCAB_LIST.length - 1, prev + 1))}
                 disabled={vocabIndex === VOCAB_LIST.length - 1}
                 className="px-6 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-700 font-medium shadow-sm shadow-indigo-200"
               >
                 Sau
               </button>
            </div>
          </div>
        );
      case AppView.GAME:
        return <MemoryGame words={VOCAB_LIST} />;
      case AppView.STORY:
        return <StoryMode words={VOCAB_LIST} />;
      case AppView.QUIZ:
        return <QuizMode words={VOCAB_LIST} />;
      default:
        return null;
    }
  };

  const NavButton = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center gap-1 p-2 md:px-6 rounded-xl transition-all ${
        currentView === view 
          ? 'text-indigo-600 bg-indigo-50 font-bold' 
          : 'text-slate-500 hover:text-indigo-500 hover:bg-slate-50'
      }`}
    >
      <Icon size={24} strokeWidth={currentView === view ? 2.5 : 2} />
      <span className="text-xs md:text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700">
            <Brain size={32} className="fill-indigo-100" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight">SuperMem</h1>
          </div>
          <div className="text-xs md:text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            5 Từ Vựng Cốt Lõi
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-24 px-4 max-w-5xl mx-auto w-full">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe pt-2 px-4 shadow-lg-up z-40">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16 md:h-20 pb-2">
          <NavButton view={AppView.LEARN} icon={Layers} label="Học Từ" />
          <NavButton view={AppView.GAME} icon={Gamepad2} label="Trò Chơi" />
          <NavButton view={AppView.STORY} icon={BookOpen} label="Chuyện AI" />
          <NavButton view={AppView.QUIZ} icon={CheckSquare} label="Kiểm Tra" />
        </div>
      </nav>
    </div>
  );
};

export default App;