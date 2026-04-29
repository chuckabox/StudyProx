import { useState, useEffect } from 'react';
import { Sparkles, X, Check, ArrowRight, Pencil, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { cn } from '../../lib/utils';

export function TaskArchitect({ settings, onTaskCreated, onCancel }) {
  const [step, setStep] = useState('input'); // input | deconstructing | review
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('studyprox-history');
    return saved ? JSON.parse(saved) : [
      'React Architecture Audit',
      'System Design Review',
      'Database Indexing Strategy',
      'Legacy Code Refactoring'
    ];
  });

  useEffect(() => {
    localStorage.setItem('studyprox-history', JSON.stringify(history));
  }, [history]);

  const [isManagingHistory, setIsManagingHistory] = useState(false);

  const handleDeconstruct = () => {
    if (!title.trim()) return;
    
    // Add to history if unique
    if (!history.includes(title)) {
      setHistory(prev => [title, ...prev.slice(0, 9)]);
    }
    
    setStep('deconstructing');
    
    setTimeout(() => {
      // Simulating AI Deconstruction based on settings.aiComplexity
      let tasks = [];
      const complexity = settings.aiComplexity || 'standard';
      
      if (complexity === 'simple') {
        tasks = [
          { id: crypto.randomUUID(), text: `Quick scan: ${title}` },
          { id: crypto.randomUUID(), text: 'Execute core focus' },
          { id: crypto.randomUUID(), text: 'Final verification' }
        ];
      } else if (complexity === 'depth') {
        tasks = [
          { id: crypto.randomUUID(), text: `Literary Audit for ${title}` },
          { id: crypto.randomUUID(), text: 'Dependency Mapping' },
          { id: crypto.randomUUID(), text: 'Structural Skeleton' },
          { id: crypto.randomUUID(), text: 'Deep Neural Synthesis' },
          { id: crypto.randomUUID(), text: 'Critical Polish & Citations' }
        ];
      } else {
        tasks = [
          { id: crypto.randomUUID(), text: `Research core tenets of ${title}` },
          { id: crypto.randomUUID(), text: 'Construct logical framework' },
          { id: crypto.randomUUID(), text: 'Draft focus-heavy sections' },
          { id: crypto.randomUUID(), text: 'Perform integrity review' }
        ];
      }
      
      setSubtasks(tasks);
      setStep('review');
    }, 1500);
  };

  const removeHistoryItem = (item) => {
    setHistory(prev => prev.filter(h => h !== item));
  };

  return (
    <div className="max-w-lg mx-auto space-y-12 animate-[fade-in_600ms_ease-out]">
      {step === 'input' && (
        <div className="space-y-10">
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Plan Task</p>
            <h2 className="text-3xl font-serif font-bold text-ink italic">Project Goal</h2>
          </header>

          <input 
            autoFocus
            className="input-scholar"
            placeholder="e.g. React Architecture Audit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeconstruct()}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Quick Start History</p>
              <button 
                onClick={() => setIsManagingHistory(!isManagingHistory)}
                className={cn(
                  "p-1 rounded-md transition-all",
                  isManagingHistory ? "bg-ink text-paper" : "text-muted hover:text-ink"
                )}
              >
                <Pencil size={10} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <div key={i} className="relative group">
                  <button 
                    onClick={() => !isManagingHistory && setTitle(h)}
                    className={cn(
                      "px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold transition-all",
                      isManagingHistory ? "opacity-50 cursor-default" : "text-ink/60 hover:border-ink cursor-pointer"
                    )}
                  >
                    {h}
                  </button>
                  {isManagingHistory && (
                    <button 
                      onClick={() => removeHistoryItem(h)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center animate-[scale-in_200ms_ease-out]"
                    >
                      <X size={8} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!isManagingHistory && <p className="text-[8px] text-muted italic">Type a new goal and press 'Deconstruct' to save it here.</p>}
          </div>

          <div className="flex gap-4">
            <button onClick={onCancel} className="btn-ghost flex-1">Cancel</button>
            <button onClick={handleDeconstruct} className="btn-ink flex-1">Break Down</button>
          </div>
        </div>
      )}

      {step === 'deconstructing' && (
        <div className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center space-y-8 animate-[fade-in_400ms_ease-out]">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-ink rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-ink animate-pulse" size={32} />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-serif font-bold text-ink italic animate-pulse">Breaking Down</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Simplifying "{title}"...</p>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="space-y-10">
          <header className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Task Breakdown</p>
              <h2 className="text-3xl font-serif font-bold text-ink italic">Step List</h2>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "p-3 rounded-full transition-all",
                isEditing ? "bg-ink text-paper rotate-12" : "bg-slate-50 text-ink/40 hover:text-ink"
              )}
            >
              <Pencil size={18} />
            </button>
          </header>

          <Reorder.Group 
            axis="y" 
            values={subtasks} 
            onReorder={setSubtasks}
            className="space-y-4"
          >
            {subtasks.map((st, i) => (
              <Reorder.Item 
                key={st.id} 
                value={st}
                dragListener={isEditing}
                whileDrag={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  zIndex: 50
                }}
                className={cn(
                  "card-scholar p-6 flex items-center gap-4 transition-all duration-300 relative",
                  isEditing ? "cursor-grab active:cursor-grabbing border-dashed border-ink/20 bg-white" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs transition-colors",
                  isEditing ? "bg-slate-200 text-ink/40" : "bg-ink text-paper"
                )}>
                  {isEditing ? <GripVertical size={14} /> : i + 1}
                </div>
                
                {isEditing ? (
                  <input 
                    className="bg-transparent border-none p-0 font-serif text-lg text-ink italic w-full focus:outline-none focus:ring-0"
                    value={st.text}
                    onChange={(e) => {
                      const newSubtasks = [...subtasks];
                      newSubtasks[i].text = e.target.value;
                      setSubtasks(newSubtasks);
                    }}
                  />
                ) : (
                  <p className="font-serif text-lg text-ink italic">{st.text}</p>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <div className="space-y-4 pt-6">
            <button 
              disabled={isEditing}
              onClick={() => onTaskCreated(title, subtasks.map(s => s.text))}
              className={cn(
                "btn-ink w-full transition-all",
                isEditing && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              Begin Plan
            </button>
            <button onClick={() => setStep('input')} className="btn-ghost w-full">Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
