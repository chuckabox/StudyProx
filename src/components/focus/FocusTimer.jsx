import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, ChevronRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(true);
  const nextSubtask = task?.subtasks?.find(st => !st.completed);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
      {/* Hide the Magnitude: Only show the immediate next step */}
      <div className="text-center space-y-4 max-w-sm mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
          Deep Work Active
        </div>
        <AnimatePresence mode="wait">
          <motion.h2 
            key={nextSubtask?.id || 'done'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-3xl font-bold font-outfit text-slate-800 leading-tight"
          >
            {nextSubtask ? nextSubtask.text : "All goals met!"}
          </motion.h2>
        </AnimatePresence>
        <p className="text-slate-400 text-sm font-medium">Part of: {task?.title}</p>
      </div>

      {/* Timer Circle */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="w-64 h-64 rounded-full border-[10px] border-slate-50 flex flex-col items-center justify-center relative bg-white shadow-xl">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="118"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-primary/10"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="118"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="741.4"
              animate={{ strokeDashoffset: 741.4 * (1 - timeLeft / (25 * 60)) }}
              className="text-primary"
            />
          </svg>
          <span className="text-5xl font-bold font-outfit text-slate-800 tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Minutes Left</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setTimeLeft(25 * 60)}
          className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-all active:scale-90"
        >
          <RotateCcw size={20} />
        </button>
        <button 
          onClick={() => setIsActive(!isActive)}
          className="p-6 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={onFinish}
          className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-all active:scale-90"
        >
          <X size={20} />
        </button>
      </div>

      {/* Hard Lock: Exit protection */}
      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
        Hard-Lock active • Navigation Disabled
      </p>
    </div>
  );
}
