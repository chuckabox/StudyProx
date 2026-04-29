import React, { useState, useEffect } from 'react';
import { Plus, Check, Zap, CheckCircle2, TrendingUp, Clock, UserPlus } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, stats, onStartNew, onUpdateSubtask, onStartFocus, onCancelTask }) {
  const quotes = [
    "Cognition peaks during early focus.",
    "Small steps lead to deep mastery.",
    "Your future self thanks you for this.",
    "Focus is the ultimate leverage."
  ];
  const randomQuote = quotes[Math.floor(new Date().getDate() % quotes.length)];

  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100
    : 0;

  return (
    <div className="min-h-full flex flex-col space-y-12 animate-[fade-in_600ms_ease-out] relative">
      {activeTask ? (
        <div className="space-y-10">
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Objective</p>
            <h2 className="text-3xl font-serif font-bold text-ink italic">{activeTask.title}</h2>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-4">
              <div 
                className="h-full bg-ink rounded-full transition-all duration-1000 ease-out-expo" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </header>

          {nextSubtask ? (
            <div className="card-scholar p-6 space-y-6 stagger-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Next Step</p>
                <p className="text-lg font-serif font-bold text-ink italic">{nextSubtask.text}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                  className="w-10 h-10 rounded-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={onStartFocus}
                  className="btn-ink flex-1 text-sm py-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Focus</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="card-scholar text-center space-y-4 animate-bounce">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="font-serif font-bold text-xl">Objective Complete</p>
                <button onClick={onStartNew} className="btn-ink w-full">New Sprint</button>
              </div>
            </>
          )}
          <div className="flex justify-center pt-6">
            <button 
              onClick={onCancelTask}
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-red-500 transition-colors duration-200 border-b border-transparent hover:border-red-500 pb-1"
            >
              Cancel Project
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Home</p>
            <h2 className="text-3xl font-serif font-bold text-ink italic">Daily Progress</h2>
          </header>

          <div className="card-scholar py-8 text-center space-y-6 stagger-1">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-ink italic">Ready for a session?</h3>
              <p className="text-muted text-[13px] italic">Break down your next goal into focused sprints.</p>
            </div>
            <button
              onClick={onStartNew}
              className="btn-ink mx-auto px-12"
            >
              <Plus className="w-5 h-5" />
              <span>Begin Task</span>
            </button>
          </div>



          <section className="space-y-6 stagger-3">
            <header className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Your Cohort</p>
              <button className="p-2 bg-slate-50 text-ink/40 hover:text-ink rounded-lg transition-all active:scale-90">
                <UserPlus size={14} />
              </button>
            </header>
            
            <div className="card-scholar bg-ink text-paper border-none p-8 flex flex-col gap-6 group overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-110 duration-1000" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/40">Collective Momentum</p>
                  <h4 className="text-2xl font-serif font-bold italic">Law Cohort B</h4>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-2xl font-serif font-bold italic">142h</p>
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-paper/40">This Week</p>
                </div>
              </div>

              <div className="relative z-10 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-paper w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Active Peers</p>
                <p className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">4 Deep Focusing</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 overflow-hidden">
                  {['SL', 'AM', 'JK', 'ER'].map((initials, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-12 h-12 rounded-full border-4 border-paper bg-slate-100 flex items-center justify-center text-[11px] font-bold text-ink shadow-sm relative group",
                        i === 0 && "ring-2 ring-emerald-400 ring-offset-2"
                      )}
                    >
                      {initials}
                      {i === 0 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-paper" />}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-paper bg-ink text-paper flex items-center justify-center text-[10px] font-bold">
                    +12
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-ink/80 font-medium leading-tight">Sarah L. and 3 others started sessions in the last hour.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="text-center py-6 opacity-30 mt-auto">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-1">StudyProx v4.0.1</p>
        <p className="text-[10px] font-serif italic text-slate-500">"{randomQuote}"</p>
      </div>
    </div>
  );
}
