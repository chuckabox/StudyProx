import React from 'react';
import { Users, Zap, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export function SocialAnalytics() {
  const regions = [
    { name: 'Library East', students: 42 },
    { name: 'Med-Law Annex', students: 89 },
    { name: 'STEM Plaza', students: 156 },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Global Momentum</p>
        <h2 className="text-3xl font-serif font-bold text-ink italic">1,248 Scholars Active</h2>
      </header>

      <div className="space-y-4">
        {regions.map((region, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
            <span className="font-serif text-lg text-ink">{region.name}</span>
            <span className="text-sm font-bold text-muted">{region.students} focusing</span>
          </div>
        ))}
      </div>
    </div>
  );
}
