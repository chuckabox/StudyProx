import React, { useState } from 'react';
import { BookOpen, Folder, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FlashcardSuite() {
  const [view, setView] = useState('folders'); // folders | list | quiz
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [quizState, setQuizState] = useState({ active: false, index: 0, score: 0 });

  const folders = [
    { id: 'LAW', name: 'Law & Ethics', count: 12, accuracy: 88, due: true, nextReview: 'Today' },
    { id: 'STEM', name: 'Biological Sciences', count: 45, accuracy: 64, due: false, nextReview: 'Tomorrow' },
    { id: 'MATH', name: 'Advanced Calculus', count: 28, accuracy: 92, due: false, nextReview: '2 days' },
    { id: 'HIST', name: 'Modern World History', count: 15, accuracy: 78, due: true, nextReview: 'Today' },
    { id: 'ECON', name: 'Macroeconomics', count: 22, accuracy: 85, due: false, nextReview: '4 days' },
  ];

  const cards = [
    { id: 1, subject: 'LAW', front: 'Duty of Care', back: 'Legal obligation to avoid harm.' },
    { id: 2, subject: 'LAW', front: 'Negligence', back: 'Failure to exercise reasonable care.' },
    { id: 3, subject: 'LAW', front: 'Res Ipsa Loquitur', back: 'The thing speaks for itself.' },
    { id: 4, subject: 'STEM', front: 'Mitochondria', back: 'Powerhouse of the cell.' },
    { id: 5, subject: 'STEM', front: 'ATP Synthesis', back: 'Process of energy creation.' },
    { id: 6, subject: 'STEM', front: 'Golgi Apparatus', back: 'Sorting and packaging of proteins.' },
    { id: 7, subject: 'MATH', front: 'Chain Rule', back: 'Derivative of composite functions.' },
    { id: 8, subject: 'MATH', front: 'Partial Derivatives', back: 'Derivative with respect to one variable.' },
    { id: 9, subject: 'MATH', front: 'Taylor Series', back: 'Infinite sum of terms that approximate a function.' },
    { id: 10, subject: 'HIST', front: 'Treaty of Versailles', back: 'Peace treaty that ended WWI.' },
    { id: 11, subject: 'HIST', front: 'Cold War Origins', back: 'Geopolitical tension between US and USSR.' },
    { id: 12, subject: 'ECON', front: 'Opportunity Cost', back: 'The value of the next best alternative.' },
    { id: 13, subject: 'ECON', front: 'Fiscal Policy', back: 'Government spending and taxation to influence economy.' },
  ];

  const filteredCards = selectedFolder 
    ? cards.filter(c => c.subject === selectedFolder)
    : cards;

  if (view === 'folders') {
    return (
      <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
        <header className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Study Library</p>
          <h2 className="text-3xl font-serif font-bold text-ink italic">Knowledge Filing System</h2>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {folders.map((folder, i) => (
            <button
              key={folder.id}
              onClick={() => {
                setSelectedFolder(folder.id);
                setView('list');
              }}
              className={cn(
                "card-scholar p-6 flex items-center justify-between group hover:border-ink/20",
                i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center transition-colors group-hover:bg-ink group-hover:text-paper">
                  <Folder className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{folder.id}</p>
                  <h4 className="font-serif font-bold text-lg text-ink">{folder.name}</h4>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold text-ink">{folder.count} Cards</p>
                </div>
                {folder.due ? (
                  <span className="px-2 py-0.5 bg-ink text-paper text-[8px] font-bold uppercase tracking-tighter rounded-full animate-pulse">
                    Due Today
                  </span>
                ) : (
                  <span className="text-[8px] font-bold uppercase tracking-tighter text-muted">
                    Review in {folder.nextReview}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'quiz') {
    const currentCard = filteredCards[quizState.index];
    
    if (!currentCard) {
      return (
        <div className="text-center py-20 space-y-6">
          <p className="text-xl font-serif italic text-ink">This deck is currently empty.</p>
          <button onClick={() => setView('folders')} className="btn-ink px-8">Return to Library</button>
        </div>
      );
    }

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
        <div className="space-y-4">
          <button onClick={() => setView('folders')} className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1 hover:text-ink transition-colors">
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
