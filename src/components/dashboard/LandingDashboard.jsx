import React, { useState, useEffect } from 'react';
import { Plus, Check, Zap, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, stats, onStartNew, onUpdateSubtask, onStartFocus }) {
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
            <div className="card-scholar text-center space-y-4 animate-bounce">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="font-serif font-bold text-xl">Objective Complete</p>
              <button onClick={onStartNew} className="btn-ink w-full">New Sprint</button>
            </div>
          )}
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
              <p className="text-muted text-[13px] italic">Deconstruct your next goal into focused sprints.</p>
            </div>
            <button
              onClick={onStartNew}
              className="btn-ink mx-auto px-12"
            >
              <Plus className="w-5 h-5" />
              <span>Begin Task</span>
            </button>
          </div>



          <section className="grid grid-cols-2 gap-4 stagger-3">
            <div className="card-scholar p-6 space-y-3 hover:bg-white transition-all">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-ink" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Total Effort</p>
                <p className="text-2xl font-serif font-bold text-ink italic">{stats?.totalHours?.toFixed(1) || '0.0'}h</p>
              </div>
            </div>
            <div className="card-scholar p-6 space-y-3 hover:bg-white transition-all">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-ink" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Streak</p>
                <p className="text-2xl font-serif font-bold text-ink italic">12 Days</p>
              </div>
            </div>
          </section>

          <section className="card-scholar bg-slate-50 border-none p-6 flex items-center justify-between stagger-4 hover:bg-slate-100 transition-all cursor-default">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Weekly Commitment</p>
              <h4 className="font-serif font-bold text-lg text-ink italic">Consistency Peak</h4>
            </div>
            <div className="text-right">
              <p className="text-2xl font-serif font-bold text-ink italic">92%</p>
            </div>
          </section>

          {/* Social Proof - Theme 1.3 Social Studying */}
          <section className="space-y-6 stagger-5">
            <div className="card-scholar bg-ink text-paper border-none p-6 flex items-center justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-paper/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">Global Momentum</p>
                <h4 className="text-xl font-serif font-bold italic">Group: Law Cohort B</h4>
              </div>
              <div className="relative z-10 text-right">
                <p className="text-2xl font-serif font-bold italic">142h</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-paper/40">Collective Effort</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Peer Activity</p>
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-paper bg-slate-100 flex items-center justify-center text-[10px] font-bold text-ink">
                    {['SL', 'AM', 'JK', 'ER'][i-1]}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-paper bg-ink text-paper flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
              <p className="text-[11px] text-muted italic">Sarah L. and 3 others are currently in Deep Focus sessions.</p>
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
