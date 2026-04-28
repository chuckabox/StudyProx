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
    <div className="card-minimal min-h-[500px] flex flex-col !p-0 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold text-lg font-outfit text-slate-800">Architect Sprint</h2>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-300 hover:text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 px-8 py-10 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">What's the challenge?</h3>
                <p className="text-slate-400 text-sm font-medium">Be specific. We'll find the tiny path through.</p>
              </div>
              
              <div className="space-y-4">
                <input 
                  autoFocus
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDecompose()}
                  placeholder="e.g. Draft MATH2001 Analysis"
                  className="input-field !text-lg !py-4"
                />
                <button 
                  onClick={handleDecompose}
                  disabled={!taskTitle.trim()}
                  className="btn-primary w-full flex items-center justify-center gap-2 group"
                >
                  Deconstruct Task
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
              className="flex-1 flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 animate-pulse" />
                <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-slate-800">Finding the sequence...</p>
                <p className="text-slate-400 text-sm">Mapping the cognitive path.</p>
              </div>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-bold text-slate-800">Path Discovered</h3>
                <p className="text-sm text-slate-400">Complete these in order to maintain flow.</p>
              </div>

              <div className="space-y-3 max-w-md mx-auto w-full">
                {subtasks.map((st, i) => (
                  <motion.div 
                    key={st.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white hover:border-slate-200 transition-all"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
                      {i + 1}
                    </div>
                    <span className="font-bold text-sm text-slate-600">{st.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 max-w-md mx-auto w-full">
                <button 
                  onClick={() => onTaskCreated(taskTitle, subtasks)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Accept This Path
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
