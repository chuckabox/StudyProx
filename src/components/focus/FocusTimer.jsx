import React, { useState, useEffect } from 'react';
import { Play, Pause, Lock, Shield, Smartphone, ArrowLeft, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, settings, timerTime, setTimerTime, isTimerRunning, setIsTimerRunning, onUpdateSubtask, onComplete, onExit }) {
  const [step, setStep] = useState(isTimerRunning || task?.subject ? 'timer' : 'subject'); // subject | blocking | timer
  const [selectedSubject, setSelectedSubject] = useState(task?.subject || 'LAW');
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);

  const subjects = [
    { id: 'LAW', name: 'Law & Ethics' },
    { id: 'STEM', name: 'Biological Sciences' },
    { id: 'MATH', name: 'Advanced Calculus' },
    { id: 'HIST', name: 'Modern World History' },
  ];

  useEffect(() => {
    if (step === 'timer' && !isTimerRunning) {
      setIsTimerRunning(true);
    }
  }, [step]);

  useEffect(() => {
    if (step !== 'timer' || !isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerTime(t => {
        if (t <= 1) {
          clearInterval(interval);
          onComplete(selectedSubject, 25);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, step, selectedSubject, onComplete, setTimerTime]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'subject') {
    return (
      <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
        <header className="space-y-1">
          <button 
            onClick={onExit}
            className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1 hover:text-ink transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" /> Cancel Session
          </button>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Set Up Focus</p>
          <h2 className="text-3xl font-serif font-bold text-ink italic">Get Ready</h2>
        </header>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Select Subject</h3>
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={cn(
                  "card-scholar p-4 flex items-center justify-between group",
                  selectedSubject === s.id ? "border-ink bg-slate-50 shadow-md scale-[1.01]" : "hover:border-ink/20",
                  i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
                )}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    selectedSubject === s.id ? "bg-ink text-paper" : "bg-slate-50 group-hover:bg-ink group-hover:text-paper"
                  )}>
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{s.id}</p>
                    <h4 className="font-serif font-bold text-lg text-ink">{s.name}</h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setStep('blocking')}
          className="btn-ink w-full py-6 text-xl shadow-xl shadow-ink/10 stagger-4"
        >
          Initialize Hard-Lock
        </button>
      </div>
    );
  }

  if (step === 'blocking') {
    return (
      <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
        <header className="space-y-1">
          <button 
            onClick={() => setStep('subject')}
            className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1 hover:text-ink transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Subjects
          </button>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Blocking Apps</p>
          <h2 className="text-3xl font-serif font-bold text-ink italic">Staying Quiet</h2>
        </header>

        <div className="flex flex-col items-center gap-12 py-10">
          <div className="relative">
            <div className="w-32 h-32 bg-ink/5 rounded-full flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-ink" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-ink rounded-full flex items-center justify-center border-4 border-paper shadow-xl">
              <Shield className="w-5 h-5 text-paper" />
            </div>
          </div>

          <div className="space-y-6 text-center max-w-sm">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-ink">Hard-Lock Protocols Engaged</h3>
              <p className="text-muted text-sm italic">
                The following applications are being restricted to ensure cognitive focus:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {settings?.restrictedApps?.map((app, i) => (
                <span 
                  key={app} 
                  className={cn(
                    "px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-widest text-ink/60 shadow-sm",
                    i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3"
                  )}
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setStep('timer');
            setIsTimerRunning(true);
          }}
          className="btn-ink w-full py-6 text-xl shadow-xl shadow-ink/10 stagger-4"
        >
          Enter Full Focus
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-10 text-center animate-[fade-in_600ms_ease-out] pb-10">
      <div className="space-y-4">
        <h2 className="text-8xl font-serif font-bold text-ink leading-none tabular-nums tracking-tighter transition-all duration-300">
          {formatTime(timerTime)}
        </h2>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Current Objective</p>
          <p className="font-serif text-3xl font-bold text-ink italic stagger-1">
            {task?.title || 'Deep Work'}
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/40">{selectedSubject}</p>
        </div>

        {task?.subtasks?.find(st => !st.completed) && (
          <div className="mt-8 flex items-center justify-center gap-3 animate-[fade-in_600ms_ease-out]">
            <p className="text-sm font-serif italic text-muted leading-tight max-w-[200px]">
              {task.subtasks.find(st => !st.completed).text}
            </p>
            <button
              onClick={() => onUpdateSubtask(task.id, task.subtasks.find(st => !st.completed).id, true)}
              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-muted hover:border-ink hover:text-ink transition-all active:scale-90 shrink-0"
              title="Mark step as complete"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-xs space-y-6 stagger-2">
        <button 
          onClick={() => setIsTimerRunning(!isTimerRunning)}
          className={cn(
            "btn-ink w-full py-4 text-sm",
            !isTimerRunning ? "bg-emerald-600 shadow-emerald-200" : "bg-ink shadow-ink/10"
          )}
        >
          {!isTimerRunning ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          <span>{!isTimerRunning ? 'Resume' : 'Pause'}</span>
        </button>

        <button 
          onClick={() => setShowAbortConfirm(true)}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-red-500 transition-colors duration-200"
        >
          Abort Focus Session
        </button>
      </div>

      {showAbortConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
          <div className="card-scholar w-full max-w-sm p-8 space-y-8 bg-white border-2 border-ink shadow-2xl animate-[scale-in_300ms_var(--ease-out-expo)]">
            <div className="space-y-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">Warning: High Friction</p>
              <h3 className="text-2xl font-serif font-bold text-ink italic">Abandon Session?</h3>
              <p className="text-muted text-sm italic leading-relaxed">
                Aborting now will record a <span className="text-red-500 font-bold not-italic">Slip-Up</span> in your performance analytics. Are you sure you wish to break your focus streak?
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowAbortConfirm(false)}
                className="btn-ink w-full py-4 text-sm"
              >
                Continue Focusing
              </button>
              <button 
                onClick={onExit}
                className="btn-ghost w-full py-4 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Yes, Abandon Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
