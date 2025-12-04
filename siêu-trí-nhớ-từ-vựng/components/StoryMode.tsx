import React, { useState } from 'react';
import { VocabularyWord } from '../types';
import { generateMnemonicStory } from '../services/geminiService';
import { Bot, BookOpen, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

interface StoryModeProps {
  words: VocabularyWord[];
}

const StoryMode: React.FC<StoryModeProps> = ({ words }) => {
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await generateMnemonicStory(words);
    setStory(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Bot /> AI Kể Chuyện
          </h2>
          <p className="text-indigo-100 mt-2 opacity-90">
            Sử dụng trí tuệ nhân tạo để tạo ra câu chuyện liên kết 5 từ vựng, giúp bạn nhớ siêu tốc!
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {words.map(w => (
              <span key={w.id} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
                {w.term}
              </span>
            ))}
          </div>

          {!story && !isLoading && (
            <div className="text-center py-10 text-slate-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nhấn nút bên dưới để AI tạo câu chuyện ghi nhớ cho bạn.</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12 text-indigo-600 flex flex-col items-center">
              <Loader2 className="animate-spin mb-3" size={32} />
              <p>Đang suy nghĩ câu chuyện thú vị...</p>
            </div>
          )}

          {story && !isLoading && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg prose prose-slate max-w-none">
              <Markdown>{story}</Markdown>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLoading ? 'Đang tạo...' : (story ? 'Tạo câu chuyện khác' : 'Tạo câu chuyện ngay')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryMode;