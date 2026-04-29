import React, { useState } from 'react';
import { HelpCircle, Smartphone, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SettingsPage({ settings, setSettings }) {
  const [showAppPicker, setShowAppPicker] = useState(false);
  
  const complexityOptions = [
    { id: 'simple', label: 'Simple', desc: 'Direct micro-goals' },
    { id: 'standard', label: 'Standard', desc: 'Balanced structure' },
    { id: 'depth', label: 'In-Depth', desc: 'Detailed sub-plans' },
  ];

  const suggestedApps = [
    'Instagram', 'TikTok', 'Twitter', 'YouTube', 'Discord', 'Facebook', 'Reddit', 'Netflix'
  ];

  const toggleApp = (app) => {
    if (settings.restrictedApps.includes(app)) {
      setSettings({
        ...settings,
        restrictedApps: settings.restrictedApps.filter(a => a !== app)
      });
    } else {
      setSettings({
        ...settings,
        restrictedApps: [...settings.restrictedApps, app]
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-12 animate-[fade-in_600ms_ease-out]">
      <header className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Preferences</p>
        <h2 className="text-3xl font-serif font-bold text-ink italic">Settings</h2>
      </header>

      {/* AI Complexity */}
      <section className="space-y-4 stagger-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Plan Detail Level</h3>
        <div className="grid grid-cols-1 gap-3">
          {complexityOptions.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => setSettings({ ...settings, aiComplexity: opt.id })}
              className={cn(
                "card-scholar p-5 text-left flex items-center justify-between group animate-none", // Remove animation: slide-up from class to avoid double animation
                i === 0 ? "stagger-1" : i === 1 ? "stagger-2" : "stagger-3",
                settings.aiComplexity === opt.id 
                  ? "border-ink bg-slate-50 shadow-md ring-1 ring-ink/5" 
                  : "border-slate-100 hover:border-ink/10"
              )}
              style={{ animation: 'slide-up 600ms var(--ease-out-expo) both' }} // Inline to ensure stagger works
            >
              <div>
                <p className="font-bold text-sm text-ink">{opt.label}</p>
                <p className="text-[10px] text-muted uppercase tracking-widest">{opt.desc}</p>
              </div>
              <div className={cn(
                "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
                settings.aiComplexity === opt.id ? "border-ink bg-ink" : "border-slate-200 group-hover:border-ink/20"
              )}>
                {settings.aiComplexity === opt.id && <div className="w-1.5 h-1.5 bg-paper rounded-full" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* App Blocking */}
      <section className="space-y-4 stagger-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Blocked Apps</h3>
          <Smartphone size={16} className="text-muted" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {settings.restrictedApps.map(app => (
            <div key={app} className="px-4 py-2 bg-ink text-paper rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-[fade-in_200ms_ease-out]">
              {app}
              <button 
                onClick={() => toggleApp(app)}
                className="hover:text-red-400"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button 
            onClick={() => setShowAppPicker(!showAppPicker)}
            className="px-4 py-2 border border-dashed border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted hover:border-ink hover:text-ink transition-colors"
          >
            {showAppPicker ? 'Close Picker' : 'Add App'}
          </button>
        </div>

        {showAppPicker && (
          <div className="p-6 bg-slate-50 rounded-2xl grid grid-cols-2 gap-3 animate-[slide-up_300ms_var(--ease-out-expo)]">
            {suggestedApps.map(app => (
              <button
                key={app}
                onClick={() => toggleApp(app)}
                className={cn(
                  "p-3 rounded-lg text-left text-xs font-bold transition-all",
                  settings.restrictedApps.includes(app)
                    ? "bg-ink text-paper"
                    : "bg-white border border-slate-100 text-ink/40 hover:border-ink/20"
                )}
              >
                {app}
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="text-center py-12 opacity-30">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">StudyProx v4.0.1</p>
      </div>
    </div>
  );
}
