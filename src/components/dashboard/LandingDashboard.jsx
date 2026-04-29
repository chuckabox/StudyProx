import React from 'react';
import { Plus, Check, Zap, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, stats, onStartNew, onUpdateSubtask, onStartFocus }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100
    : 0;

  return (
    <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
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
            <div className="card-scholar space-y-8 stagger-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Next Step</p>
                <p className="text-xl font-serif font-bold text-ink italic">{nextSubtask.text}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                  className="w-12 h-12 rounded-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={onStartFocus}
                  className="btn-ink flex-1"
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

          <div className="card-scholar py-12 text-center space-y-8 stagger-1">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-ink italic">Ready for a session?</h3>
              <p className="text-muted text-sm italic">Deconstruct your next goal into focused sprints.</p>
            </div>
            <button
              onClick={onStartNew}
              className="btn-ink mx-auto px-12"
            >
              <Plus className="w-5 h-5" />
              <span>Begin Task</span>
            </button>
          </div>

          {/* Smart Transition - Addressing Friction-to-Focus */}
          <section className="card-scholar bg-ink text-paper p-8 space-y-6 stagger-2 border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-paper/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
          <header className="space-y-1 relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">Next Up</p>
            <h4 className="text-2xl font-serif font-bold italic">Upcoming Class</h4>
              <p className="text-sm text-paper/60 italic">Detected: Constitutional Law Seminar (09:00)</p>
            </div>
            <div className="flex items-center justify-between relative z-10 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-ink bg-slate-200" />
                <div className="w-8 h-8 rounded-full border-2 border-ink bg-slate-300" />
                <div className="w-8 h-8 rounded-full border-2 border-ink bg-slate-400" />
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-ink bg-paper text-ink text-[10px] font-bold">+12</div>
              </div>
              <button 
                onClick={onStartNew}
                className="bg-paper text-ink px-6 py-3 rounded-lg font-bold text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Zap size={14} className="fill-current" />
                Prepare Focus
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-6 stagger-3">
            <div className="card-scholar p-8 space-y-4 hover:bg-white transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-ink" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Total Effort</p>
                <p className="text-3xl font-serif font-bold text-ink italic">{stats?.totalHours?.toFixed(1) || '0.0'}h</p>
              </div>
            </div>
            <div className="card-scholar p-8 space-y-4 hover:bg-white transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-ink" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Streak</p>
                <p className="text-3xl font-serif font-bold text-ink italic">12 Days</p>
              </div>
            </div>
          </section>

          <section className="card-scholar bg-slate-50 border-none p-8 flex items-center justify-between stagger-4 hover:bg-slate-100 transition-all cursor-default">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Weekly Commitment</p>
              <h4 className="font-serif font-bold text-xl text-ink italic">Consistency Peak</h4>
            </div>
            <div className="text-right">
              <p className="text-3xl font-serif font-bold text-ink italic">92%</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
