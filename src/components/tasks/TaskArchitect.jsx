import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, X, Check } from 'lucide-react';
import { decomposeTask } from '../../lib/ai-architect';

export function TaskArchitect({ onTaskCreated, onCancel }) {
  const [step, setStep] = useState('input'); // input | decomposing | review
  const [taskTitle, setTaskTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  const handleDecompose = async () => {
    if (!taskTitle.trim()) return;
    setStep('decomposing');
    const results = await decomposeTask(taskTitle);
    setSubtasks(results);
    setStep('review');
  };

  return (
    <div className="card-scholar min-h-[600px] flex flex-col !p-0">
      {/* Header */}
      <div className="px-12 py-10 border-b border-ink/5 flex justify-between items-center bg-paper/30 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center shadow-xl shadow-ink/10">
            <Sparkles className="w-5 h-5 text-paper" />
          </div>
          <div>
            <h2 className="font-serif font-extrabold text-2xl text-ink leading-tight">Deconstruct Logic</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">AI-Assisted Architecture</p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="p-3 hover:bg-ink/5 rounded-full transition-all text-muted hover:text-ink"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-12 py-16 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-12 flex-1 flex flex-col justify-center max-w-lg mx-auto w-full"
            >
              <div className="space-y-3 text-center">
                <h3 className="text-4xl font-serif font-bold text-ink tracking-tight">Define the Objective.</h3>
                <p className="text-muted text-sm font-medium italic">What intellectual mountain shall we scale today?</p>
              </div>
              
              <div className="space-y-8">
                <input 
                  autoFocus
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDecompose()}
                  placeholder="e.g. Draft the Thesis Introduction"
                  className="input-scholar"
                />
                <button 
                  onClick={handleDecompose}
                  disabled={!taskTitle.trim()}
                  className="btn-ink w-full text-lg group py-5"
                >
                  Analyze & Segment
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'decomposing' && (
            <motion.div
              key="decomposing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-ink/5 rounded-full scale-[2] animate-pulse" />
                <Loader2 className="w-16 h-16 text-ink animate-spin relative z-10" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-serif font-bold text-2xl text-ink italic">Mapping the cognitive path...</p>
                <p className="text-muted text-[10px] font-bold uppercase tracking-widest">Applying Academic Logic</p>
              </div>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-12"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-3xl font-serif font-bold text-ink">Segmented Path</h3>
                <p className="text-sm text-muted italic">Follow these increments to maintain intellectual momentum.</p>
              </div>

              <div className="space-y-4 max-w-lg mx-auto w-full">
                {subtasks.map((st, i) => (
                  <motion.div 
                    key={st.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-paper border border-ink/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5 transition-all"
                  >
                    <div className="font-serif font-extrabold text-2xl text-ink/20 group-hover:text-ink transition-colors tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="font-serif font-bold text-xl text-ink italic leading-tight">{st.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 max-w-lg mx-auto w-full">
                <button 
                  onClick={() => onTaskCreated(taskTitle, subtasks)}
                  className="btn-ink w-full py-5 text-lg"
                >
                  <Check size={24} />
                  Authorize This Sequence
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
