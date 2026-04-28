import { motion } from 'framer-motion';
import { Play, Plus, ChevronRight, CheckCircle2, Circle, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, onStartNew, onUpdateSubtask }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask 
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100 
    : 0;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Section - Neutral Opening */}
      <section className="space-y-1 text-center py-4">
        <h1 className="text-3xl font-bold font-outfit tracking-tight text-slate-800">Study Dashboard</h1>
        <p className="text-slate-400 text-sm font-medium">Ready for your next deep study session?</p>
      </section>

      {/* Main Action Card - The Momentum Hub */}
      <section>
        {activeTask ? (
          <div className="card-minimal overflow-hidden !p-0">
            {/* Momentum Indicator Header */}
            <div className="momentum-track rounded-none h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Current Focus</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{activeTask.title}</h2>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500">
                  {Math.round(progress)}% Done
                </div>
              </div>

              {nextSubtask ? (
                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                      className="w-8 h-8 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-transparent hover:border-primary hover:text-primary transition-all group-hover:scale-110"
                    >
                      <Circle className="w-5 h-5" />
                    </button>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-0.5">The Next Step</p>
                      <p className="font-bold text-lg text-slate-700 leading-tight">{nextSubtask.text}</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary !p-3 !rounded-full shadow-lg shadow-primary/10"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-6 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-bold text-lg text-emerald-800">Sprint Accomplished</p>
                  <p className="text-emerald-600/70 text-sm">You bridged the gap today.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card-minimal border-dashed bg-slate-50/30 py-16 text-center space-y-6">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto border border-slate-100 shadow-sm rotate-3">
              <Plus className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Clear your mind.</h3>
              <p className="text-slate-400 text-sm max-w-[240px] mx-auto leading-relaxed">Let's deconstruct your next big challenge into tiny, actionable wins.</p>
            </div>
            <button 
              onClick={onStartNew}
              className="btn-primary px-8"
            >
              Architect a Sprint
            </button>
          </div>
        )}
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 gap-5">
        <div className="card-minimal p-6 flex flex-col justify-between aspect-square">
          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10 mb-4">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Deep Study</p>
            <div className="text-3xl font-bold font-outfit text-slate-800">4.2h</div>
          </div>
        </div>
        <div className="card-minimal p-6 flex flex-col justify-between aspect-square">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 mb-4">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Wins Today</p>
            <div className="text-3xl font-bold font-outfit text-slate-800">12</div>
          </div>
        </div>
      </section>

      {/* Deadlines Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-lg font-outfit text-slate-800">Focus Forecast</h3>
          <button className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:gap-2 transition-all">
            Full Roadmap <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="card-minimal !p-5 border-l-4 border-l-destructive/40 flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-slate-700">MATH2001 Report</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive/60 animate-pulse" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Due in 48 hours</p>
              </div>
            </div>
            <div className="bg-destructive/5 text-destructive px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-destructive/10">Critical</div>
          </div>
        </div>
      </section>
    </div>
  );
}
