import { cloneElement } from 'react';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, currentView, setView, isHardLocked, onOpenSettings }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 selection:bg-ink/5">
      {/* Device Frame */}
      <div className="relative w-[412px] h-[840px] bg-[#1a1a1a] rounded-[60px] p-[12px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)_inset,0_0_0_2px_#333,0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Dynamic Island */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[100] flex items-center justify-end px-4">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
        </div>

        {/* Internal Screen Container */}
        <div className="flex-1 bg-paper rounded-[48px] overflow-hidden relative flex flex-col shadow-inner border border-black/5">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth no-scrollbar">
            {/* Top Nav */}
            <header className="sticky top-0 z-50 px-8 py-10 flex items-center justify-between bg-paper/80 backdrop-blur-md">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
                <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-paper" />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-ink">StudyProx</span>
              </div>
              
              <button 
                onClick={onOpenSettings}
                className="p-2 hover:bg-ink/5 rounded-lg text-muted"
              >
                <Settings className="w-5 h-5" />
              </button>
            </header>

            {/* Main Content */}
            <main className={cn(
              "relative z-10 flex-1 px-8 py-6 pb-40",
              isHardLocked && "pt-12 pb-40"
            )}>
              {children}
            </main>
          </div>

          {/* Bottom Navigation (now absolute to device screen) */}
          <div className="absolute bottom-8 left-0 right-0 z-50 px-6">
            <nav className="p-2 bg-ink text-paper rounded-2xl flex items-center justify-between shadow-2xl">
              <NavButton 
                icon={<Brain />} 
                label="Focus"
                active={currentView === 'dashboard' || currentView === 'focus'} 
                onClick={() => setView('dashboard')}
              />
              <NavButton 
                icon={<Clock />} 
                label="Library"
                active={currentView === 'cards'} 
                onClick={() => setView('cards')}
              />
              <NavButton 
                icon={<BarChart3 />} 
                label="Stats"
                active={currentView === 'stats'} 
                onClick={() => setView('stats')}
              />
            </nav>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="h-8 flex items-center justify-center">
          <div className="w-32 h-1 bg-black/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "nav-item flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
        active ? "bg-paper text-ink shadow-sm scale-105" : "text-paper/40 hover:text-paper"
      )}
    >
      {cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
