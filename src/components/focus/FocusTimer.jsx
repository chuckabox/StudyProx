import React, { useState, useEffect } from 'react';
import { Timer, Shield, Lock, Wind, BellOff, PhoneOff, Droplets, Play, Pause, X, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, onComplete, onExit }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12 text-center">
      <div className="space-y-4">
        <h2 className="text-[100px] font-serif font-bold text-ink leading-none tabular-nums tracking-tighter">
          {formatTime(timeLeft)}
        </h2>
        <p className="font-serif text-2xl text-ink/60 italic">
          Focus: {task?.title || 'Study Session'}
        </p>
      </div>

      <div className="w-full max-w-xs space-y-6">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={cn(
            "btn-ink w-full py-5 text-lg",
            isPaused ? "bg-emerald-600" : "bg-ink"
          )}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        <button 
          onClick={onExit}
          className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-destructive"
        >
          End Session
        </button>
      </div>

      <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-ink"
          style={{ width: `${(timeLeft / (25 * 60)) * 100}%` }}
        />
      </div>
    </div>
  );
}
