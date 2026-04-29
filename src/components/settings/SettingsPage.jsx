import { HelpCircle, Smartphone, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SettingsPage({ settings, setSettings }) {
  const complexityOptions = [
    { id: 'simple', label: 'Simple', desc: 'Direct micro-goals' },
    { id: 'standard', label: 'Standard', desc: 'Balanced structure' },
    { id: 'depth', label: 'In-Depth', desc: 'Detailed sub-plans' },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-4xl font-serif font-extrabold text-ink tracking-tight">Preferences</h1>
        <p className="text-muted text-sm font-medium italic">Tailoring your intellectual environment.</p>
      </section>

      {/* AI Complexity */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">AI Deconstruction Complexity</h3>
        <div className="grid grid-cols-1 gap-3">
          {complexityOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSettings({ ...settings, aiComplexity: opt.id })}
              className={cn(
                "p-4 rounded-xl border text-left transition-all",
                settings.aiComplexity === opt.id 
                  ? "border-ink bg-slate-50 shadow-sm" 
                  : "border-slate-100 hover:border-ink/20"
              )}
            >
              <p className="font-bold text-sm">{opt.label}</p>
              <p className="text-[10px] text-muted">{opt.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* App Blocking */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Restricted App Suite</h3>
          <Smartphone size={16} className="text-muted" />
        </div>
        <div className="flex flex-wrap gap-2">
          {settings?.restrictedApps?.map(app => (
            <div key={app} className="px-4 py-2 bg-ink text-paper rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              {app}
              <button 
                onClick={() => setSettings({
                  ...settings,
                  restrictedApps: settings.restrictedApps.filter(a => a !== app)
                })}
                className="hover:text-red-400"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button className="px-4 py-2 border border-dashed border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted hover:border-ink">
            Add App
          </button>
        </div>
      </section>

      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-3 text-muted">
          <HelpCircle size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Support & Legals</span>
        </div>
        <div className="space-y-2">
          <button className="w-full text-left py-4 px-2 text-sm font-bold text-ink/40 hover:text-ink border-b border-ink/5">Terms of Academic Integrity</button>
          <button className="w-full text-left py-4 px-2 text-sm font-bold text-ink/40 hover:text-ink border-b border-ink/5">Privacy Policy</button>
        </div>
      </section>

      <div className="text-center py-12">
        <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.4em]">StudyProx v4.0.1</p>
      </div>
    </div>
  );
}
