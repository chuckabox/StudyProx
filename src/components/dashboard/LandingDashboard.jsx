import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ChevronRight, CheckCircle2, Circle, Brain, Zap, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
};

export function LandingDashboard({ activeTask, onStartNew, onUpdateSubtask, onStartFocus }) {
  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask 
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100 
    : 0;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16"
    >
      {/* Welcome Section - Editorial Style */}
      <motion.section variants={itemVariants} className="space-y-3 text-center py-8">
        <div className="inline-block px-4 py-1.5 border border-ink/10 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-muted mb-2">
          Academic Session
        </div>
        <h1 className="text-5xl font-serif font-extrabold text-ink tracking-tight">Today's Focus</h1>
        <p className="text-muted text-sm font-medium italic">"The scholar's greatest weapon is a single, clear intention."</p>
      </motion.section>

      {/* Main Action Card - The Scholar's Desk */}
      <motion.section variants={itemVariants} layout>
        {activeTask ? (
          <motion.div 
            whileHover={{ y: -4 }}
            className="card-scholar !p-0"
          >
            {/* Momentum Line */}
            <div className="momentum-line rounded-none h-[3px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 1 }}
                className="h-full bg-ink"
              />
            </div>
            
            <div className="p-12 space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-2.5 h-2.5 rounded-full bg-ink" 
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Primary Objective</span>
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-ink tracking-tight">{activeTask.title}</h2>
                </div>
                <div className="bg-paper border border-ink/5 px-4 py-2 rounded-lg text-xs font-bold text-ink/40 shadow-sm">
                  {Math.round(progress)}% RESOLVED
                </div>
              </div>

              {/* Hide the Magnitude: Prominent Next Step */}
              <AnimatePresence mode="wait">
                {nextSubtask ? (
                  <motion.div 
                    key={nextSubtask.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div className="border-t border-ink/5 pt-8 flex items-center justify-between group">
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => onUpdateSubtask(activeTask.id, nextSubtask.id, true)}
                          className="w-10 h-10 rounded-full border border-ink/10 bg-paper flex items-center justify-center text-transparent hover:border-ink hover:text-ink transition-all active:scale-90"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <div>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-[0.15em] mb-1">Current Increment</p>
                          <p className="font-serif font-bold text-2xl text-ink leading-tight italic">{nextSubtask.text}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={onStartFocus}
                      className="btn-ink w-full py-5 text-lg group overflow-hidden relative"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-paper/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <Zap className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Commence Deep Focus</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 border-t border-ink/5"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-ink">Objective Secured</h3>
                    <p className="text-muted text-sm italic mt-1">Take a moment of silence. You've earned it.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="card-scholar border-dashed bg-transparent py-24 text-center space-y-8">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto border border-ink/5 shadow-2xl shadow-ink/5"
            >
              <Plus className="w-10 h-10 text-ink/20" />
            </motion.div>
            <div className="space-y-3">
              <h3 className="text-3xl font-serif font-bold text-ink">Architect your next win.</h3>
              <p className="text-muted text-sm max-w-[280px] mx-auto leading-relaxed italic">Deconstruct the overwhelming into the actionable.</p>
            </div>
            <button 
              onClick={onStartNew}
              className="btn-ink px-12"
            >
              Initialize Sprint
            </button>
          </div>
        )}
      </motion.section>

      {/* Stats - Refined Bento */}
      <section className="grid grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="card-scholar p-8 flex flex-col justify-between aspect-square !shadow-none hover:bg-ink hover:text-paper group">
          <div className="w-12 h-12 bg-ink/5 rounded-2xl flex items-center justify-center border border-ink/5 mb-4 group-hover:bg-paper/10 group-hover:border-paper/10">
            <Brain className="w-6 h-6 text-ink group-hover:text-paper" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1 group-hover:text-paper/60">Intellectual Effort</p>
            <div className="text-4xl font-serif font-extrabold">4.2<span className="text-lg opacity-40 ml-1">h</span></div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="card-scholar p-8 flex flex-col justify-between aspect-square !shadow-none">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 mb-4">
            <CheckCircle2 className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Micro-Wins</p>
            <div className="text-4xl font-serif font-extrabold text-ink">12</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
