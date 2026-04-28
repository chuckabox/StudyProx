import { motion } from 'framer-motion';
import { Play, Plus, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ activeTask, onStartNew, onUpdateSubtask }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask 
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100 
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold font-outfit">Hello, Archer</h1>
        <p className="text-muted-foreground">The intent-action gap is 12% narrower today.</p>
      </section>

      {/* Main Action Card */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative glass-panel rounded-[2rem] p-8 space-y-6">
          {activeTask ? (
            <>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Current Focus</span>
                  <h2 className="text-2xl font-bold">{activeTask.title}</h2>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                      #{i}
                    </div>
                  ))}
                </div>
              </div>

              {nextSubtask ? (
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Circle className="w-6 h-6" />
                    </button>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Next Immediate Step</p>
                      <p className="text-lg font-semibold">{nextSubtask.text}</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-semibold">All micro-goals reached!</p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">No Active Sprint</h3>
                <p className="text-muted-foreground max-w-[240px] mx-auto">Ready to bridge the gap? Decompose your first complex task.</p>
              </div>
              <button 
                onClick={onStartNew}
                className="btn-primary w-full max-w-xs"
              >
                Create AI Task Sprint
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Secondary Metrics */}
      <section className="grid grid-cols-2 gap-4">
        <MetricCard label="Focus Hours" value="4.2" unit="hrs" color="text-primary" />
        <MetricCard label="Tasks Done" value="12" unit="micro" color="text-accent" />
      </section>

      {/* Recent Activity / Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg font-outfit">Upcoming Clumps</h3>
          <button className="text-primary text-sm font-semibold flex items-center gap-1">
            View Heatmap <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-destructive/50 flex items-center justify-between texture-urgency-high">
            <div>
              <p className="font-bold">MATH2001 Report</p>
              <p className="text-xs text-muted-foreground font-medium uppercase">Due in 2 days</p>
            </div>
            <div className="text-destructive font-bold text-sm">Critical</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, unit, color }) {
  return (
    <div className="glass-panel p-6 rounded-3xl space-y-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-3xl font-bold font-outfit", color)}>{value}</span>
        <span className="text-xs text-muted-foreground font-medium">{unit}</span>
      </div>
    </div>
  );
}
