import React from 'react';
import { Plus, Check, Zap, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, stats, onStartNew, onUpdateSubtask, onStartFocus }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100
    : 0;

  return (
    <div className="flex-1 flex flex-col animate-[fade-in_600ms_ease-out]">
      {activeTask ? (
        <div className="space-y-10">
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Objective</p>
            <h2 className="text-3xl font-serif font-bold text-ink">{activeTask.title}</h2>
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
        <div className="flex-1 flex flex-col">
          {/* Centered What's Next Section */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-10 stagger-1">
            <div className="space-y-3">
              <h3 className="text-4xl font-serif font-bold text-ink tracking-tight">What's next?</h3>
              <p className="text-muted text-sm italic max-w-[240px] mx-auto leading-relaxed">
                Your intellectual capacity is currently unallocated. Deconstruct a goal to begin.
              </p>
            </div>
            <button
              onClick={onStartNew}
              className="btn-ink px-16 h-16 text-lg shadow-2xl shadow-ink/20 hover:-translate-y-1 active:translate-y-0"
            >
              <Plus className="w-6 h-6" />
              <span>Begin Task</span>
            </button>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-4 stagger-2">
            <div className="p-6 bg-slate-50 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Daily Total</p>
              <p className="text-2xl font-serif font-bold text-ink">{stats?.totalHours?.toFixed(1) || '0.0'}h</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Current Streak</p>
              <p className="text-2xl font-serif font-bold text-ink">12D</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
