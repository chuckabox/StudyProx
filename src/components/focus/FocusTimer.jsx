import React, { useState, useEffect } from 'react';
import { Play, Pause, Lock, Shield, Smartphone, ArrowLeft, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, settings, timerTime, setTimerTime, isTimerRunning, setIsTimerRunning, onUpdateSubtask, onComplete, onExit }) {
  const [step, setStep] = useState(isTimerRunning || task?.subject ? 'timer' : 'subject'); // subject | blocking | timer
  const [selectedSubject, setSelectedSubject] = useState(task?.subject || 'LAW');

  const subjects = [
    { id: 'LAW', name: 'Law & Ethics' },
    { id: 'STEM', name: 'Biological Sciences' },
    { id: 'MATH', name: 'Advanced Calculus' },
    { id: 'HIST', name: 'Modern World History' },
  ];

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
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-16 text-center animate-[fade-in_600ms_ease-out] pb-20">
      <div className="space-y-4">
        <h2 className="text-[120px] font-serif font-bold text-ink leading-none tabular-nums tracking-tighter transition-all duration-300">
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
          <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-4 animate-[slide-up_600ms_var(--ease-out-expo)] max-w-sm mx-auto">
            <div className="text-left flex-1">
              <p className="text-[8px] font-bold uppercase tracking-widest text-muted">Next Step</p>
              <p className="text-sm font-serif font-bold text-ink italic leading-tight">
                {task.subtasks.find(st => !st.completed).text}
              </p>
            </div>
            <button
              onClick={() => onUpdateSubtask(task.id, task.subtasks.find(st => !st.completed).id, true)}
              className="w-10 h-10 rounded-lg bg-ink text-paper flex items-center justify-center hover:bg-ink/80 transition-all active:scale-90"
            >
              <Check className="w-5 h-5" />
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
          onClick={() => {
            if (window.confirm("Are you sure you want to abort? This will record a slip-up in your performance analytics.")) {
              onExit();
            }
          }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-red-500 transition-colors duration-200 border-b border-transparent hover:border-red-500 pb-1"
        >
          Abort Focus Session
        </button>
      </div>

      <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden stagger-3">
        <div 
          className="h-full bg-ink transition-all duration-1000 linear"
          style={{ width: `${(timerTime / (25 * 60)) * 100}%` }}
        />
      </div>
    </div>
  );
}
