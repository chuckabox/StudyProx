import { cloneElement } from 'react';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, currentView, setView, isHardLocked, onOpenSettings }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:py-10 selection:bg-ink/5">
      {/* Device Frame - Only visible on sm screens and up */}
      <div className={cn(
        "relative flex flex-col transition-all duration-500",
        "w-full h-screen", // Mobile default
        "sm:w-[412px] sm:h-[840px] sm:bg-[#1a1a1a] sm:rounded-[60px] sm:p-[12px] sm:shadow-[0_0_2px_2px_rgba(255,255,255,0.1)_inset,0_0_0_2px_#333,0_30px_100px_-20px_rgba(0,0,0,0.5)]"
      )}>
        {/* Dynamic Island - Hidden on mobile */}
        <div className="hidden sm:flex absolute top-8 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[100] items-center justify-end px-4">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
        </div>

        {/* Internal Screen Container */}
        <div className={cn(
          "flex-1 bg-paper relative flex flex-col shadow-inner overflow-hidden transform-gpu",
          "sm:rounded-[48px] sm:border sm:border-black/5"
        )}>
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth no-scrollbar">
            {/* Top Nav */}
            <header className="sticky top-0 z-50 px-8 pt-10 sm:pt-14 pb-4 flex items-center justify-between bg-paper/80 backdrop-blur-md">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
                <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-paper" />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-ink italic">StudyProx</span>
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
              "relative z-10 flex-1 flex flex-col px-8 py-6 pb-40",
              isHardLocked && "pt-12 pb-40"
            )}>
              {children}
            </main>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-8 left-0 right-0 z-50 px-6">
            <nav className="p-1.5 bg-ink text-paper rounded-[20px] flex items-center shadow-2xl">
              <NavButton 
                icon={<Clock />} 
                label="Library"
                active={currentView === 'cards'} 
                onClick={() => setView('cards')}
              />
              <NavButton 
                icon={<Brain />} 
                label="Home"
                active={currentView === 'dashboard' || currentView === 'focus'} 
                onClick={() => setView('dashboard')}
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

        {/* Home Indicator - Hidden on mobile */}
        <div className="hidden sm:flex h-8 items-center justify-center">
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
        "nav-item flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[14px] transition-all duration-200",
        active ? "bg-paper text-ink shadow-sm scale-[1.02]" : "text-paper/40 hover:text-paper"
      )}
    >
      {cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
