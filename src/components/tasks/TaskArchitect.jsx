import { useState } from 'react';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TaskArchitect({ settings, onTaskCreated, onCancel }) {
  const [step, setStep] = useState('input'); // input | review
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  const handleDeconstruct = () => {
    if (!title.trim()) return;
    
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
  };

  return (
    <div className="max-w-lg mx-auto space-y-12 animate-[fade-in_600ms_ease-out]">
      {step === 'input' && (
        <div className="space-y-10">
          <header className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-ink">Project Definition</h2>
            <p className="text-muted text-sm italic">What is the primary objective?</p>
          </header>

          <input 
            autoFocus
            className="input-scholar"
            placeholder="e.g. Constitutional Law Analysis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeconstruct()}
          />

          <div className="flex gap-4">
            <button onClick={onCancel} className="btn-ghost flex-1">Cancel</button>
            <button onClick={handleDeconstruct} className="btn-ink flex-1">Deconstruct</button>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="space-y-10">
          <header className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-ink">Planned Steps</h2>
            <p className="text-muted text-sm italic">Review the micro-goal sequence for {title}.</p>
          </header>

          <div className="space-y-4">
            {subtasks.map((st, i) => (
              <div 
                key={i} 
                className={cn(
                  "card-scholar p-6 flex items-center gap-4 animate-[slide-up_400ms_var(--ease-out-expo)_both]",
                  i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : i === 2 ? "stagger-3" : "stagger-4"
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
