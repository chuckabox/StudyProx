import React, { useState, useEffect } from 'react';
import { Timer, Shield, Lock, Wind, BellOff, PhoneOff, Droplets, Play, Pause, X, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, onComplete, onExit }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    if (isPaused || !setupComplete) return;
    const interval = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, setupComplete]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const checklist = [
    { icon: <PhoneOff size={18} />, label: 'Neural Silence', description: 'Device physically out of sight.' },
    { icon: <Wind size={18} />, label: 'Air Flow', description: 'Environmental oxygen optimized.' },
    { icon: <Droplets size={18} />, label: 'Hydration', description: 'Water within reach.' },
    { icon: <BellOff size={18} />, label: 'Hard-Lock Active', description: 'OS notifications suppressed.' },
  ];

  if (!setupComplete) {
    return (
      <div className="space-y-12 py-8 max-w-lg mx-auto">
        <section className="space-y-3">
          <h1 className="text-4xl font-serif font-extrabold text-ink tracking-tight">Environmental Lock</h1>
          <p className="text-muted text-sm font-medium italic">"The room must match the mind."</p>
        </section>

        <div className="space-y-4">
          {checklist.map((item, i) => (
            <div key={i} className="card-scholar p-6! flex items-center gap-6">
              <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center text-ink">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink">{item.label}</p>
                <p className="text-xs text-muted italic">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setSetupComplete(true)}
          className="btn-ink w-full py-6 text-xl group"
        >
          <Lock className="w-6 h-6" />
          Authorize Lockdown
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-16 text-center">
      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30">Academic Lockdown Active</p>
        <h2 className="text-[120px] font-serif font-extrabold text-ink leading-none tabular-nums tracking-tighter">
          {formatTime(timeLeft)}
        </h2>
        <p className="font-serif font-bold text-2xl text-ink italic opacity-60">
          Focus: {task?.title || 'General Scholarship'}
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-xs mx-auto">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className={cn(
            "btn-ink py-5 text-lg",
            isPaused ? "bg-emerald-600 hover:bg-emerald-700" : "bg-ink"
          )}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          <span>{isPaused ? 'Resume Session' : 'Pause Reflection'}</span>
        </button>

        {!isPaused && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Navigation is restricted.
          </p>
        )}
        
        {isPaused && (
          <button 
            onClick={onExit}
            className="text-[10px] font-bold uppercase tracking-widest text-destructive mt-4"
          >
            Terminate Session (Integrity Loss)
          </button>
        )}
      </div>

      <div className="pt-12">
        <div className="w-24 h-1 bg-ink/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-ink"
            style={{ width: `${(timeLeft / (25 * 60)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
