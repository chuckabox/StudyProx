import { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, Pencil, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { cn } from '../../lib/utils';

export function TaskArchitect({ settings, onTaskCreated, onCancel }) {
  const [step, setStep] = useState('input'); // input | deconstructing | review
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const history = [
    'Constitutional Law Analysis',
    'Organic Chemistry Review',
    'Macroeconomics Phase 2',
    'Historical Context Audit'
  ];

  const handleDeconstruct = () => {
    if (!title.trim()) return;
    
    setStep('deconstructing');
    
    setTimeout(() => {
      // Simulating AI Deconstruction based on settings.aiComplexity
      let tasks = [];
      const complexity = settings.aiComplexity || 'standard';
      
      if (complexity === 'simple') {
        tasks = [
          { id: '1', text: `Quick scan: ${title}` },
          { id: '2', text: 'Execute core focus' },
          { id: '3', text: 'Final verification' }
        ];
      } else if (complexity === 'depth') {
        tasks = [
          { id: '1', text: `Phase 1: Literary Audit for ${title}` },
          { id: '2', text: 'Phase 2: Dependency Mapping' },
          { id: '3', text: 'Phase 3: Structural Skeleton' },
          { id: '4', text: 'Phase 4: Deep Neural Synthesis' },
          { id: '5', text: 'Phase 5: Critical Polish & Citations' }
        ];
      } else {
        tasks = [
          { id: '1', text: `Research core tenets of ${title}` },
          { id: '2', text: 'Construct logical framework' },
          { id: '3', text: 'Draft focus-heavy sections' },
          { id: '4', text: 'Perform integrity review' }
        ];
      }
      
      setSubtasks(tasks);
      setStep('review');
    }, 1500);
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
            placeholder="e.g. Constitutional Law Analysis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeconstruct()}
          />

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Quick Start History</p>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <button 
                  key={i}
                  onClick={() => setTitle(h)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-ink/60 hover:border-ink transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={onCancel} className="btn-ghost flex-1">Cancel</button>
            <button onClick={handleDeconstruct} className="btn-ink flex-1">Deconstruct</button>
          </div>
        </div>
      )}

      {step === 'deconstructing' && (
        <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-[fade-in_400ms_ease-out]">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-ink rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-ink animate-pulse" size={24} />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-serif font-bold text-ink italic animate-pulse">Deconstructing Neural Path</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">AI is simplifying "{title}"...</p>
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
                className={cn(
                  "card-scholar p-6 flex items-center gap-4 transition-all duration-300",
                  isEditing ? "cursor-grab active:cursor-grabbing border-dashed border-ink/20" : ""
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
              onClick={() => onTaskCreated(title, subtasks.map(s => s.text))}
              className="btn-ink w-full"
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
