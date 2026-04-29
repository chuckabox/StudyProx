import { cloneElement } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, currentView, setView, isHardLocked, onOpenSettings }) {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-ink/5 overflow-x-hidden">
      {/* Mobile Frame Constraint */}
      <div className="w-full max-w-[480px] min-h-screen bg-paper relative shadow-2xl shadow-ink/10 border-x border-ink/5 flex flex-col sepia-soft">
        <div className="paper-overlay" />
        
        {/* Top Nav: Scholarly Header */}
        <header className="sticky top-0 z-50 px-8 py-8 flex items-center justify-between bg-paper/80 backdrop-blur-md border-b border-ink/5">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-10 h-10 bg-ink rounded-lg flex items-center justify-center shadow-lg shadow-ink/10">
              <Sparkles className="w-5 h-5 text-paper" />
            </div>
            <div>
              <span className="font-serif font-extrabold text-2xl tracking-tight leading-none block text-ink">StudyProx</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted leading-none">The Scholar's Partner</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenSettings}
              className="p-3 hover:bg-ink/5 rounded-full transition-all active:scale-95 group"
            >
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-ink transition-colors" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className={cn(
          "relative z-10 flex-1 p-8 pb-40 transition-all duration-700 stagger-reveal",
          isHardLocked && "pt-16 pb-40"
        )}>
          {children}
        </main>

        {/* Bottom Navigation: Library Cards (Always showing as requested) */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] flex justify-center px-6 animate-slide-up">
          <nav className="px-6 py-3 bg-ink text-paper rounded-full flex items-center gap-2 shadow-2xl shadow-ink/40 border border-paper/10 backdrop-blur-sm">
            <NavButton 
              icon={<Brain />} 
              label="Focus" 
              active={currentView === 'dashboard' || currentView === 'focus'} 
              onClick={() => setView('dashboard')}
            />
            <div className="w-px h-6 bg-paper/10 mx-1" />
            <NavButton 
              icon={<Clock />} 
              label="Sprints" 
              active={currentView === 'cards'} 
              onClick={() => setView('cards')}
            />
            <div className="w-px h-6 bg-paper/10 mx-1" />
            <NavButton 
              icon={<BarChart3 />} 
              label="Analytics" 
              active={currentView === 'stats'} 
              onClick={() => setView('stats')}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      className={cn(
        "nav-item",
        active ? "bg-paper text-ink shadow-lg" : "text-paper/60 hover:text-paper hover:bg-paper/5"
      )}
    >
      {cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
