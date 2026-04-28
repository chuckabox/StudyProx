import { motion } from 'framer-motion';
import { Users, TrendingUp, Zap, ChevronRight, Award } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SocialAnalytics() {
  const weeks = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-1">
        <h1 className="text-2xl font-bold font-outfit text-slate-800">Growth Engine</h1>
        <p className="text-slate-500 text-sm">Visualizing your momentum vs. your cohort.</p>
      </section>

      {/* Social Proof: Peers Comparison */}
      <div className="grid grid-cols-1 gap-4">
        <div className="card-minimal flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
              <TrendingUp className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Percentile</p>
              <p className="text-xl font-bold text-slate-800">Top 12% of MATH2001</p>
            </div>
          </div>
          <Award className="text-amber-500 w-6 h-6" />
        </div>
      </div>

      {/* CVD-Compliant Heatmap (Pattern-based urgency) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg font-outfit">Assessment Clump Map</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">CVD Safe Mode</span>
        </div>
        
        <div className="card-minimal p-4 overflow-x-auto">
          <div className="flex gap-1.5 min-w-[500px]">
            {weeks.map(w => (
              <div key={w} className="flex flex-col gap-1.5 flex-1">
                {days.map(d => {
                  const intensity = Math.random();
                  const isClumped = intensity > 0.7;
                  return (
                    <div 
                      key={d} 
                      className={cn(
                        "aspect-square rounded-sm transition-all relative overflow-hidden",
                        intensity > 0.4 ? "bg-primary/20" : "bg-slate-50",
                        intensity > 0.6 && "bg-primary/40",
                        intensity > 0.8 && "bg-primary/60",
                        intensity > 0.9 && "bg-destructive/60"
                      )}
                    >
                      {/* Pattern-based urgency (Accessibility for color-blind users) */}
                      {isClumped && (
                        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                          <div className="w-full h-full" style={{ 
                            backgroundImage: intensity > 0.9 
                              ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, black 2px, black 4px)' 
                              : 'radial-gradient(black 1px, transparent 0)' ,
                            backgroundSize: intensity > 0.9 ? '4px 4px' : '3px 3px'
                          }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Past 12 Weeks</span>
            <div className="flex gap-2 items-center">
              <span>Calm</span>
              <div className="w-2 h-2 bg-slate-100 rounded-sm" />
              <div className="w-2 h-2 bg-primary/40 rounded-sm" />
              <div className="w-2 h-2 bg-destructive/60 rounded-sm overflow-hidden relative">
                 <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, black 1px, black 2px)', backgroundSize: '2px 2px' }} />
              </div>
              <span>Clumped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cohort Stats */}
      <section className="space-y-4">
        <h3 className="font-bold text-lg font-outfit">Cohort Live Pulse</h3>
        <div className="space-y-3">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-bold text-slate-600">42 students focusing now</p>
            </div>
            <Users className="w-4 h-4 text-slate-300" />
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-bold text-slate-600">Cohort Streak: 1,242 hours</p>
            </div>
            <Award className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </section>
    </div>
  );
}
