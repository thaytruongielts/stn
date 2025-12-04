export interface VocabularyWord {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  vietnamese: string;
  imageUrl: string;
  example: string;
}

export enum AppView {
  LEARN = 'LEARN',
  GAME = 'GAME',
  STORY = 'STORY',
  QUIZ = 'QUIZ'
}

export interface GameCard {
  id: string;
  vocabId: string;
  type: 'IMAGE' | 'WORD';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}