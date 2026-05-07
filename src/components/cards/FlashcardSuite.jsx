import React, { useState, useEffect } from 'react';
import { BookOpen, Folder, ChevronRight, Plus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FlashcardSuite() {
  const [view, setView] = useState('folders'); // folders | list | quiz
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [quizState, setQuizState] = useState({ active: false, index: 0, score: 0 });
  const [flipped, setFlipped] = useState(false);

  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('studyprox-folders');
    return saved ? JSON.parse(saved) : [
      { id: 'LAW', name: 'Law & Ethics', count: 12 },
      { id: 'STEM', name: 'Biological Sciences', count: 45 },
      { id: 'MATH', name: 'Advanced Calculus', count: 28 },
      { id: 'HIST', name: 'Modern World History', count: 15 },
      { id: 'ECON', name: 'Macroeconomics', count: 22 },
    ];
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('studyprox-cards');
    return saved ? JSON.parse(saved) : [
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
  });

  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [addCardError, setAddCardError] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    localStorage.setItem('studyprox-folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('studyprox-cards', JSON.stringify(cards));
  }, [cards]);

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const id = newFolderName.slice(0, 4).toUpperCase();
    setFolders([...folders, { id, name: newFolderName, count: 0 }]);
    setNewFolderName('');
    setIsAddingFolder(false);
  };

  const addCard = () => {
    if (!newCardFront.trim() || !newCardBack.trim()) {
      setAddCardError('Please provide both a prompt and an explanation.');
      return;
    }
    setAddCardError('');
    const newCard = {
      id: Date.now(),
      subject: selectedFolder,
      front: newCardFront,
      back: newCardBack
    };
    setCards([...cards, newCard]);
    setFolders(folders.map(f => f.id === selectedFolder ? { ...f, count: (f.count || 0) + 1 } : f));
    setNewCardFront('');
    setNewCardBack('');
    setIsAddingCard(false);
  };

  const updateFolder = (id, name) => {
    setFolders(folders.map(f => f.id === id ? { ...f, name } : f));
    setEditingFolder(null);
  };

  const deleteFolder = (id) => {
    if (confirm('Delete this category and all its cards?')) {
      setFolders(folders.filter(f => f.id !== id));
      setCards(cards.filter(c => c.subject !== id));
      if (selectedFolder === id) setView('folders');
    }
  };

  const updateCard = (id, front, back) => {
    setCards(cards.map(c => c.id === id ? { ...c, front, back } : c));
    setEditingCard(null);
  };

  const deleteCard = (id) => {
    const cardToDelete = cards.find(c => c.id === id);
    if (!cardToDelete) return;
    setCards(cards.filter(c => c.id !== id));
    setFolders(folders.map(f => f.id === cardToDelete.subject ? { ...f, count: Math.max(0, (f.count || 0) - 1) } : f));
  };

  const filteredCards = selectedFolder 
    ? cards.filter(c => c.subject === selectedFolder)
    : cards;

  if (view === 'folders') {
    return (
      <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Study Library</p>
            <h2 className="text-3xl font-serif font-bold text-ink italic">Flashcards</h2>
          </div>
          <button 
            onClick={() => setIsAddingFolder(true)}
            className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {isAddingFolder && (
          <div className="card-scholar p-6 bg-slate-50 space-y-4 animate-[slide-down_300ms_ease-out]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">New Category</p>
            <input 
              autoFocus
              className="input-scholar text-lg"
              placeholder="Enter category name..."
              value={newFolderName}
              onChange={e => setNewFolderName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFolder()}
            />
            <div className="flex gap-2">
              <button onClick={() => setIsAddingFolder(false)} className="btn-ghost flex-1 py-2">Cancel</button>
              <button onClick={addFolder} className="btn-ink flex-1 py-2">Create</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {folders.map((folder, i) => {
            const subjectStyles = {
              LAW: "bg-blue-50 text-blue-700",
              STEM: "bg-emerald-50 text-emerald-700",
              MATH: "bg-indigo-50 text-indigo-700",
              HIST: "bg-amber-50 text-amber-700",
              ECON: "bg-rose-50 text-rose-700"
            };
            const currentStyle = subjectStyles[folder.id] || "bg-slate-50 text-ink";

            return (
              <div key={folder.id} className="relative group">
                <button
                  onClick={() => {
                    setSelectedFolder(folder.id);
                    setView('list');
                  }}
                  className={cn(
                    "w-full card-scholar p-5 flex items-center justify-between group hover:border-ink/20",
                    i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
                  )}
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className={cn(
                      "w-12 h-12 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                      currentStyle
                    )}>
                      <Folder className="w-6 h-6 fill-current opacity-20" />
                      <Folder className="w-6 h-6 absolute" />
                    </div>
                    <div className="text-left space-y-0.5 truncate">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted">{folder.id}</p>
                      <h4 className="font-serif font-bold text-xl text-ink leading-tight truncate">{folder.name}</h4>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2.5 shrink-0 ml-4 mr-10">
                    <div className="text-right">
                      <p className="text-lg font-bold text-ink leading-none">{folder.count}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Cards</p>
                    </div>
                  </div>
                </button>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingFolder(folder); }}
                    className="p-2 bg-paper border border-slate-200 rounded-lg text-muted hover:text-ink hover:border-ink transition-all shadow-sm"
                  >
                    <Pencil size={14} />
                  </button>
                </div>


              </div>
            );
          })}
        </div>
      </div>
    );
  }



  if (view === 'quiz') {
    if (filteredCards.length === 0) {
      return (
        <div className="text-center py-20 space-y-6">
          <p className="text-xl font-serif italic text-ink">This deck is currently empty.</p>
          <button onClick={() => setView('folders')} className="btn-ink px-8">Return to Library</button>
        </div>
      );
    }

    const currentCard = filteredCards[quizState.index] || { front: 'No content', back: 'Empty deck' };
    const progress = (quizState.index + 1) / filteredCards.length * 100;

    return (
      <div className="space-y-12 animate-[fade-in_600ms_ease-out] flex flex-col min-h-[600px]">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setQuizState({ active: false, index: 0, score: 0 });
                setView('list');
              }} 
              className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1 hover:text-ink transition-colors"
            >
              <ChevronRight className="rotate-180 w-3 h-3" /> End Session
            </button>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Quiz Mode</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full max-w-[200px] mx-auto overflow-hidden">
            <div 
              className="h-full bg-ink transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div 
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-sm aspect-4/3 relative perspective-[1000px] cursor-pointer group"
        >
          <div className={cn(
            "w-full h-full relative transition-all duration-500 transform-3d",
            flipped && "transform-[rotateY(180deg)]"
          )}>
            {/* Front Side */}
            <div className={cn(
              "absolute inset-0 card-scholar p-12 flex flex-col items-center justify-center text-center space-y-4 bg-white border-2 border-ink shadow-xl backface-hidden transition-opacity duration-300",
              flipped ? "opacity-0 pointer-events-none" : "opacity-100 z-10"
            )}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Front</p>
              <h3 className="text-3xl font-serif font-bold text-ink italic leading-tight">{currentCard.front}</h3>
            </div>

            {/* Back Side */}
            <div className={cn(
              "absolute inset-0 card-scholar p-12 flex flex-col items-center justify-center text-center space-y-4 bg-white border-2 border-ink shadow-xl backface-hidden transform-[rotateY(180deg)] transition-opacity duration-300",
              flipped ? "opacity-100 z-20" : "opacity-0 pointer-events-none"
            )}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Back</p>
              <h3 className="text-2xl font-serif font-bold text-ink italic leading-tight">{currentCard.back}</h3>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-4 shrink-0">
          <button 
            disabled={quizState.index === 0}
            onClick={() => {
              setFlipped(false);
              setQuizState(prev => ({ ...prev, index: Math.max(0, prev.index - 1) }));
            }}
            className="btn-ghost flex-1 py-4 text-xs disabled:opacity-30"
          >
            Previous
          </button>
          <button 
            onClick={() => {
              setFlipped(false);
              if (quizState.index < filteredCards.length - 1) {
                setQuizState(prev => ({ ...prev, index: prev.index + 1 }));
              } else {
                setView('folders');
              }
            }}
            className="btn-ink flex-1 py-4 text-xs"
          >
            {quizState.index < filteredCards.length - 1 ? 'Next Card' : 'Finish Session'}
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
            <ChevronRight className="rotate-180 w-3 h-3" /> Back to Library
          </button>
          <h2 className="text-3xl font-serif font-bold text-ink italic">{selectedFolder} Deck</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAddingCard(true)}
            className="w-10 h-10 rounded-lg bg-slate-50 text-ink flex items-center justify-center border border-slate-200 hover:border-ink transition-all active:scale-95 shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            disabled={filteredCards.length === 0}
            onClick={() => {
              setQuizState({ active: true, index: 0, score: 0 });
              setView('quiz');
            }}
            className={cn(
              "btn-ink px-6 h-10 text-[10px]",
              filteredCards.length === 0 && "opacity-30 cursor-not-allowed"
            )}
          >
            Start Quiz
          </button>
        </div>
      </header>

      {isAddingCard && (
        <div className="card-scholar p-6 bg-slate-50 space-y-6 animate-[slide-down_300ms_ease-out]">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Question (Front)</p>
              <input 
                autoFocus
                className="input-scholar text-lg"
                placeholder="Enter prompt..."
                value={newCardFront}
                onChange={e => {
                  setNewCardFront(e.target.value);
                  if (addCardError) setAddCardError('');
                }}
              />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Answer (Back)</p>
              <textarea 
                className="input-scholar text-lg min-h-[100px] py-3"
                placeholder="Enter explanation..."
                value={newCardBack}
                onChange={e => {
                  setNewCardBack(e.target.value);
                  if (addCardError) setAddCardError('');
                }}
              />
            </div>
            {addCardError && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">{addCardError}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setIsAddingCard(false); setAddCardError(''); }} className="btn-ghost flex-1 py-2">Cancel</button>
            <button onClick={addCard} className="btn-ink flex-1 py-2">Add Card</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredCards.map((card) => (
          <div 
            key={card.id}
            className="flex items-center justify-between py-4 border-b border-slate-100 group relative"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-ink shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="truncate pr-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">{card.subject}</p>
                <p className="font-serif text-lg text-ink italic leading-tight truncate">{card.front}</p>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button 
                onClick={() => setEditingCard(card)}
                className="p-2 text-muted hover:text-ink transition-colors"
              >
                <Pencil size={14} />
              </button>
            </div>


          </div>
        ))}
      </div>

      {editingCard && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
          <div className="w-full max-w-sm dialog-scholar space-y-6">
            <header className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Edit Card</p>
              <h3 className="text-2xl font-serif font-bold text-ink italic">Revise Material</h3>
            </header>

            <div className="space-y-4">
              <div className="space-y-1 text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Question</p>
                <input 
                  autoFocus
                  className="input-scholar text-lg"
                  value={editingCard.front}
                  onChange={e => setEditingCard({ ...editingCard, front: e.target.value })}
                />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Answer</p>
                <textarea 
                  className="input-scholar text-lg min-h-[100px] py-2"
                  value={editingCard.back}
                  onChange={e => setEditingCard({ ...editingCard, back: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  if (window.confirm("Delete this card?")) {
                    deleteCard(editingCard.id);
                    setEditingCard(null);
                  }
                }} 
                className="p-2 text-muted hover:text-red-600 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex-1 flex gap-2">
                <button onClick={() => setEditingCard(null)} className="btn-ghost flex-1 py-2 text-xs">Cancel</button>
                <button onClick={() => updateCard(editingCard.id, editingCard.front, editingCard.back)} className="btn-ink flex-1 py-2 text-xs">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingFolder && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
          <div className="w-full max-w-sm dialog-scholar space-y-6">
            <header className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Edit Category</p>
              <h3 className="text-2xl font-serif font-bold text-ink italic">Rename Library Node</h3>
            </header>

            <div className="space-y-4">
              <div className="space-y-1 text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Category Name</p>
                <input 
                  autoFocus
                  className="input-scholar text-lg"
                  value={editingFolder.name}
                  onChange={e => setEditingFolder({ ...editingFolder, name: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && updateFolder(editingFolder.id, editingFolder.name)}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  if (window.confirm("Delete this category and all its cards?")) {
                    deleteFolder(editingFolder.id);
                    setEditingFolder(null);
                  }
                }} 
                className="p-2 text-muted hover:text-red-600 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex-1 flex gap-2">
                <button onClick={() => setEditingFolder(null)} className="btn-ghost flex-1 py-2 text-xs">Cancel</button>
                <button onClick={() => updateFolder(editingFolder.id, editingFolder.name)} className="btn-ink flex-1 py-2 text-xs">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
