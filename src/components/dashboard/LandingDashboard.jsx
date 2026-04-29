import { Play, Plus, ChevronRight, CheckCircle2, Circle, Brain, Zap, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, onStartNew, onUpdateSubtask, onStartFocus }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100
    : 0;

  return (
    <div className="space-y-12">
      {activeTask ? (
        <div className="space-y-10">
          <header className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Objective</p>
            <h2 className="text-3xl font-serif font-bold text-ink">{activeTask.title}</h2>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-4">
              <div 
                className="h-full bg-ink rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </header>

          {nextSubtask ? (
            <div className="card-scholar space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Next Step</p>
                <p className="text-xl font-serif font-bold text-ink italic">{nextSubtask.text}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                  className="w-12 h-12 rounded-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50"
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
            <div className="card-scholar text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="font-serif font-bold text-xl">Objective Complete</p>
              <button onClick={onStartNew} className="btn-ink w-full">New Sprint</button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif font-bold text-ink">What's next?</h3>
            <p className="text-muted text-sm italic">Deconstruct your goal into focus blocks.</p>
          </div>
          <button
            onClick={onStartNew}
            className="btn-ink mx-auto px-12"
          >
            <Plus className="w-5 h-5" />
            <span>Begin Task</span>
          </button>
        </div>
      )}
    </div>
  );
}
