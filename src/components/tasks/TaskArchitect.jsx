import { useState } from 'react';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TaskArchitect({ settings, onTaskCreated, onCancel }) {
  const [step, setStep] = useState('input'); // input | deconstructing | review
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

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
      if (settings.aiComplexity === 'simple') {
        tasks = [
          { text: `Quick scan: ${title}` },
          { text: 'Execute core focus' },
          { text: 'Final verification' }
        ];
      } else if (settings.aiComplexity === 'depth') {
        tasks = [
          { text: `Phase 1: Literary Audit for ${title}` },
          { text: 'Phase 2: Dependency Mapping' },
          { text: 'Phase 3: Structural Skeleton' },
          { text: 'Phase 4: Deep Neural Synthesis' },
          { text: 'Phase 5: Critical Polish & Citations' }
        ];
      } else {
        tasks = [
          { text: `Research core tenets of ${title}` },
          { text: 'Construct logical framework' },
          { text: 'Draft focus-heavy sections' },
          { text: 'Perform integrity review' }
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
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Task Breakdown</p>
            <h2 className="text-3xl font-serif font-bold text-ink italic">Step List</h2>
          </header>

          <div className="space-y-4">
            {subtasks.map((st, i) => (
              <div 
                key={i} 
                className={cn(
                  "card-scholar p-6 flex items-center gap-4 animate-[slide-up_400ms_var(--ease-out-expo)_both]",
                  i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : i === 2 ? "stagger-3" : i === 3 ? "stagger-4" : "stagger-5"
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </div>
                <p className="font-serif text-lg text-ink italic">{st.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6">
            <button 
              onClick={() => onTaskCreated(title, subtasks.map(s => s.text))}
              className="btn-ink w-full"
            >
              Commit to Plan
            </button>
            <button onClick={() => setStep('input')} className="btn-ghost w-full">Edit Goal</button>
          </div>
        </div>
      )}
    </div>
  );
}
