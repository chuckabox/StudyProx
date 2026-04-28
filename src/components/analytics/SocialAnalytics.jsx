import React from 'react';
import { Users, Zap, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function SocialAnalytics() {
  const regions = [
    { name: 'Library East', intensity: 'high', students: 42, pattern: 'stripes' },
    { name: 'Med-Law Annex', intensity: 'steady', students: 89, pattern: 'dots' },
    { name: 'STEM Plaza', intensity: 'clumping', students: 156, pattern: 'mesh' },
    { name: 'Common Grounds', intensity: 'low', students: 12, pattern: 'plain' },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-4xl font-serif font-extrabold text-ink tracking-tight">Cohort Pulse</h1>
        <p className="text-muted text-sm font-medium italic">"You are not studying in isolation. The library breathes with you."</p>
      </section>

      {/* Live Counter */}
      <div className="flex items-center gap-6 py-6 border-y border-ink/5">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-paper flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-ink/10" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full bg-ink text-paper border-2 border-paper flex items-center justify-center text-[10px] font-bold">
            +1.2k
          </div>
        </div>
        <div>
          <p className="text-2xl font-serif font-bold text-ink italic leading-none">1,248 Scholars</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1 flex items-center gap-2">
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500" 
            />
            Synchronized focus now
          </p>
        </div>
      </div>

      {/* CVD-Compliant Pulse Map */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Assessment Clump Map</h3>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-ink/30">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ink/10 border border-ink/5" /> Low</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ink pattern-dots" /> Steady</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ink pattern-stripes" /> High</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {regions.map((region, i) => (
            <motion.div 
              key={region.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-scholar p-6! flex items-center justify-between group cursor-pointer hover:border-ink/20"
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-xl border border-ink/5 flex items-center justify-center relative overflow-hidden bg-slate-50`}>
                  <div className={`absolute inset-0 opacity-20 pattern-${region.pattern} bg-ink`} />
                  <Users className="w-6 h-6 text-ink relative z-10" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{region.intensity} intensity</p>
                  <h4 className="font-serif font-bold text-xl text-ink italic">{region.name}</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-serif font-bold text-ink">{region.students}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Active</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leverage Card */}
      <div className="card-scholar bg-ink text-paper p-8! space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-paper/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-paper" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xl">Top 4% of Scholars</h4>
            <p className="text-xs text-paper/60 italic">Consistency is your leverage.</p>
          </div>
        </div>
        <div className="h-2 bg-paper/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '86%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-paper"
          />
        </div>
        <p className="text-[10px] font-medium leading-relaxed opacity-60">
          Your current momentum is higher than 96% of the cohort. 
          The social proof of your consistency is being shared with your study group.
        </p>
      </div>
    </div>
  );
}
