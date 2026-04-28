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
    <div className="glass-panel rounded-[2rem] p-8 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold text-lg font-outfit">AI Task Architect</h2>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-white/[0.05] rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-1 flex flex-col justify-center"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">What's the complex goal?</h3>
              <p className="text-muted-foreground">The AI will bridge the gap by breaking it down into actionable micro-goals.</p>
            </div>
            
            <div className="relative">
              <input 
                autoFocus
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDecompose()}
                placeholder="e.g. Write MATH2001 Report"
                className="input-field pr-16"
              />
              <button 
                onClick={handleDecompose}
                disabled={!taskTitle.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-primary rounded-xl flex items-center justify-center text-white disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight size={20} />
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
            className="flex-1 flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
              <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
            </div>
            <p className="font-medium text-lg animate-pulse">Deconstructing logic...</p>
          </motion.div>
        )}

        {step === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Micro-Goal Sequence</h3>
              <p className="text-sm text-muted-foreground">The "Single-Path" journey created for you:</p>
            </div>

            <div className="space-y-3">
              {subtasks.map((st, i) => (
                <motion.div 
                  key={st.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/[0.05] p-4 rounded-xl flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                  <span className="font-medium">{st.text}</span>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => onTaskCreated(taskTitle, subtasks)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Enforce This Sprint
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
