import React, { useState, useEffect } from 'react';
import { Play, Pause, Lock, Shield, Smartphone, ArrowLeft, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FocusTimer({ task, settings, timerTime, setTimerTime, isTimerRunning, setIsTimerRunning, onUpdateSubtask, onComplete, onExit }) {
  const [step, setStep] = useState(isTimerRunning || task?.subject ? 'timer' : 'subject'); // subject | blocking | timer
  const [selectedSubject, setSelectedSubject] = useState(task?.subject || 'LAW');
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

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
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Current Project</p>
          <p className="font-serif text-3xl font-bold text-ink italic stagger-1">
            {task?.title || 'Deep Work'}
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-ink/40">{selectedSubject}</p>
        </div>

        {task?.subtasks?.find(st => !st.completed) && (
          <div className="mt-8 space-y-2 animate-[fade-in_600ms_ease-out]">
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-muted/60">
              Stage {task.subtasks.filter(st => st.completed).length + 1} of {task.subtasks.length}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] font-bold text-ink/20 w-6">0{task.subtasks.filter(st => st.completed).length + 1}</span>
              <p className="text-sm font-serif italic text-muted leading-tight max-w-[200px]">
                {task.subtasks.find(st => !st.completed).text}
              </p>
              <button
                onClick={() => {
                  const currentSubtask = task.subtasks.find(st => !st.completed);
                  const remainingSubtasks = task.subtasks.filter(st => !st.completed).length;
                  
                  onUpdateSubtask(task.id, currentSubtask.id, true);
                  
                  if (remainingSubtasks === 1) {
                    setIsTimerRunning(false);
                    setShowCelebration(true);
                  }
                }}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-muted hover:border-ink hover:text-ink transition-all active:scale-90 shrink-0"
                title="Mark step as complete"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
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
          <div className="card-scholar w-full max-w-[280px] p-8 space-y-6 bg-white border-2 border-ink shadow-2xl animate-[scale-in_300ms_var(--ease-out-expo)] text-center">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-ink italic">Abandon?</h3>
              <p className="text-muted text-[11px] italic leading-relaxed">
                This will record a slip-up in your performance analytics.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onExit(task, Math.floor((25 * 60 - timerTime) / 60))}
                className="btn-ink w-full py-3 text-xs bg-red-600 hover:bg-red-700 shadow-none border-none"
              >
                Confirm Abandon
              </button>
              <button 
                onClick={() => setShowAbortConfirm(false)}
                className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-ink py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showCelebration && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
          <div className="dialog-scholar w-full max-w-sm text-center space-y-8 py-10">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-ink rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8 text-paper" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Focus Success</p>
                <h3 className="text-3xl font-serif font-bold text-ink italic">Session Complete</h3>
              </div>
            </div>

            <div className="space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">Project</p>
                  <p className="font-serif font-bold text-lg text-ink italic leading-tight truncate">{task?.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">Duration</p>
                  <p className="font-serif font-bold text-lg text-ink italic">{Math.max(1, Math.floor((25 * 60 - timerTime) / 60))}m Focus</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Execution Flow</p>
                <p className="text-xs font-serif italic text-ink font-bold">{task?.subtasks?.length} Stages Resolved</p>
              </div>
            </div>

            <button 
              onClick={() => onComplete(task, Math.floor((25 * 60 - timerTime) / 60))}
              className="btn-ink w-full py-4 text-sm"
            >
              Hooray
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
