import { Bell, Shield, User, Globe, Moon, HelpCircle, ChevronRight } from 'lucide-react';

export function SettingsPage() {
  const sections = [
    { icon: <User size={20} />, label: 'Profile', value: 'Peter Parker' },
    { icon: <Bell size={20} />, label: 'Notifications', value: 'High Priority Only' },
    { icon: <Shield size={20} />, label: 'Hard-Lock Integrity', value: 'Strict' },
    { icon: <Globe size={20} />, label: 'Data Sync', value: 'Academic Cloud' },
    { icon: <Moon size={20} />, label: 'Appearance', value: 'Paper & Ink' },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="space-y-3">
        <h1 className="text-4xl font-serif font-extrabold text-ink tracking-tight">Preferences</h1>
        <p className="text-muted text-sm font-medium italic">Tailoring your intellectual environment.</p>
      </section>

      <div className="space-y-4">
        {sections.map((item, i) => (
          <div 
            key={i}
            className="card-scholar !p-6 flex items-center justify-between group cursor-pointer hover:border-ink/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center text-muted group-hover:text-ink transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{item.label}</p>
                <p className="font-serif font-bold text-lg text-ink italic">{item.value}</p>
              </div>
            </div>
            <ChevronRight className="text-slate-200 group-hover:text-ink transition-all group-hover:translate-x-1" />
          </div>
        ))}
      </div>

      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-3 text-muted">
          <HelpCircle size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Support & Legals</span>
        </div>
        <div className="space-y-2">
          <button className="w-full text-left py-4 px-2 text-sm font-bold text-ink/40 hover:text-ink transition-colors border-b border-ink/5">Terms of Academic Integrity</button>
          <button className="w-full text-left py-4 px-2 text-sm font-bold text-ink/40 hover:text-ink transition-colors border-b border-ink/5">Privacy Policy</button>
          <button className="w-full text-left py-4 px-2 text-destructive font-bold hover:opacity-80 transition-opacity">Deactivate Account</button>
        </div>
      </section>

      <div className="text-center py-12">
        <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.4em]">StudyProx v4.0.1</p>
      </div>
    </div>
  );
}
