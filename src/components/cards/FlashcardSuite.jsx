import React, { useState } from 'react';
import { BookOpen, Folder, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FlashcardSuite() {
  const [view, setView] = useState('folders'); // folders | list | quiz
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [quizState, setQuizState] = useState({ active: false, index: 0, score: 0 });

  const folders = [
    { id: 'LAW', name: 'Law & Ethics', count: 12, accuracy: 88 },
    { id: 'STEM', name: 'Biological Sciences', count: 45, accuracy: 64 },
    { id: 'MATH', name: 'Advanced Calculus', count: 28, accuracy: 92 },
  ];

  const cards = [
    { id: 1, subject: 'LAW', front: 'Duty of Care', back: 'Legal obligation to avoid harm.' },
    { id: 2, subject: 'LAW', front: 'Negligence', back: 'Failure to exercise reasonable care.' },
    { id: 3, subject: 'STEM', front: 'Mitochondria', back: 'Powerhouse of the cell.' },
  ];

  const filteredCards = selectedFolder 
    ? cards.filter(c => c.subject === selectedFolder)
    : cards;

  if (view === 'folders') {
    return (
      <div className="space-y-12">
        <header className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Study Library</p>
          <h2 className="text-3xl font-serif font-bold text-ink italic">Knowledge Filing System</h2>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => {
                setSelectedFolder(folder.id);
                setView('list');
              }}
              className="card-scholar p-6 flex items-center justify-between group hover:border-ink/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-ink" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{folder.id}</p>
                  <h4 className="font-serif font-bold text-lg text-ink">{folder.name}</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-ink">{folder.count}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">{folder.accuracy}% Accuracy</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'quiz') {
    const currentCard = filteredCards[quizState.index];
    return (
      <div className="space-y-12 min-h-[60vh] flex flex-col justify-center">
        <header className="text-center space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Card {quizState.index + 1} of {filteredCards.length}
          </p>
          <div className="w-full h-1 bg-slate-100 rounded-full max-w-[200px] mx-auto">
            <div 
              className="h-full bg-ink rounded-full" 
              style={{ width: `${((quizState.index + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
        </header>

        <div className="card-scholar p-12 aspect-[4/3] flex flex-col items-center justify-center text-center space-y-8 bg-white border-2 border-ink shadow-xl">
          <h3 className="text-3xl font-serif font-bold text-ink italic">{currentCard.front}</h3>
          <p className="text-muted text-sm border-t border-slate-100 pt-8 italic">"Recall the synthesis before flipping."</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => {
              if (quizState.index < filteredCards.length - 1) {
                setQuizState(prev => ({ ...prev, index: prev.index + 1 }));
              } else {
                setView('folders');
              }
            }}
            className="btn-ghost flex-1"
          >
            Incorrect
          </button>
          <button 
            onClick={() => {
              if (quizState.index < filteredCards.length - 1) {
                setQuizState(prev => ({ ...prev, index: prev.index + 1, score: prev.score + 1 }));
              } else {
                setView('folders');
              }
            }}
            className="btn-ink flex-1"
          >
            Correct
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <button onClick={() => setView('folders')} className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1">
            <ChevronRight className="rotate-180 w-3 h-3" /> Back to Folders
          </button>
          <h2 className="text-3xl font-serif font-bold text-ink italic">{selectedFolder} Deck</h2>
        </div>
        <button 
          onClick={() => {
            setQuizState({ active: true, index: 0, score: 0 });
            setView('quiz');
          }}
          className="btn-ink px-6 h-12"
        >
          Start Quiz
        </button>
      </header>

      <div className="space-y-4">
        {filteredCards.map((card) => (
          <div 
            key={card.id}
            className="flex items-center gap-4 py-4 border-b border-slate-100"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-ink">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">{card.subject}</p>
              <p className="font-serif text-lg text-ink italic">{card.front}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
