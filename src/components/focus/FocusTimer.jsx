import React, { useState, useEffect } from 'react';
import { Play, Pause, Lock, Shield, Smartphone } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, settings, onComplete, onExit }) {
  const [step, setStep] = useState('subject'); // subject | blocking | timer
  const [selectedSubject, setSelectedSubject] = useState('LAW');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isPaused, setIsPaused] = useState(false);

  const subjects = ['LAW', 'STEM', 'MATH', 'HIST'];

  useEffect(() => {
    if (step !== 'timer' || isPaused) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          onComplete(selectedSubject, 25);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, step, selectedSubject, onComplete]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'subject') {
    return (
      <div className="space-y-12">
        <header className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-ink">Select Focus Area</h2>
          <p className="text-muted text-sm italic">Assign this session to a specific subject.</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={cn(
                "p-6 rounded-xl border font-bold transition-all",
                selectedSubject === s 
                  ? "bg-ink text-paper border-ink shadow-lg" 
                  : "bg-white border-slate-100 text-ink/40 hover:border-ink/20"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setStep('blocking')}
          className="btn-ink w-full py-6 text-xl"
        >
          Initialize Hard-Lock
        </button>
      </div>
    );
  }

  if (step === 'blocking') {
    return (
      <div className="space-y-12 text-center py-10">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-ink/5 rounded-full flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-ink" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-ink rounded-full flex items-center justify-center border-4 border-paper shadow-lg">
            <Lock className="w-4 h-4 text-paper" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-ink">Restricting External Feeds</h3>
          <p className="text-muted text-sm max-w-[280px] mx-auto italic">
            The following apps are now suppressed at the OS level:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {settings?.restrictedApps?.map(app => (
              <span key={app} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted">
                {app}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setStep('timer')}
          className="btn-ink w-full py-6 text-xl"
        >
          Enter Full Focus
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12 text-center">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
          <Shield size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Hard-Lock Active</span>
        </div>
        <h2 className="text-[100px] font-serif font-bold text-ink leading-none tabular-nums tracking-tighter">
          {formatTime(timeLeft)}
        </h2>
        <p className="font-serif text-2xl text-ink/60 italic">
          {selectedSubject} | {task?.title || 'Deep Work'}
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
          Abort Focus (Integrity Loss)
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
