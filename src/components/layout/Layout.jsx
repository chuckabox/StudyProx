import { cloneElement, useState, useEffect } from 'react';
import { Sparkles, Brain, Clock, BarChart3, Settings, AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, currentView, setView, isHardLocked, onOpenSettings }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showLockAlert, setShowLockAlert] = useState(false);

  useEffect(() => {
    if (showLockAlert) {
      const timer = setTimeout(() => setShowLockAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLockAlert]);

  useEffect(() => {
    const scrollArea = document.querySelector('.internal-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [currentView]);

  return (
    <div className="h-screen w-screen bg-slate-100 flex items-center justify-center sm:py-10 selection:bg-ink/5 overflow-hidden">
      {/* Device Frame - Only visible on sm screens and up */}
      <div className={cn(
        "relative flex flex-col transition-all duration-500",
        "w-full h-screen", // Mobile default
        "sm:w-[412px] sm:h-[840px] sm:bg-[#1a1a1a] sm:rounded-[60px] sm:p-[12px] sm:shadow-[0_0_2px_2px_rgba(255,255,255,0.1)_inset,0_0_0_2px_#333,0_30px_100px_-20px_rgba(0,0,0,0.5)]"
      )}>
        {/* Dynamic Island - Hidden on mobile */}
        <div className="hidden sm:flex absolute top-8 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-100 items-center justify-end px-4">
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
        </div>

        {/* Internal Screen Container */}
        <div className={cn(
          "flex-1 bg-paper relative flex flex-col shadow-inner overflow-hidden transform-gpu",
          "sm:rounded-[48px] sm:border sm:border-black/5"
        )}>
          {/* Scrollable Content Area */}
          <div className={cn(
            "flex-1 scroll-smooth no-scrollbar internal-scroll-area",
            isHardLocked ? "overflow-hidden" : "overflow-y-auto"
          )}>
            {/* Top Nav */}
            <header className="sticky top-0 z-50 px-8 pt-10 sm:pt-14 pb-4 flex items-center justify-between bg-paper/80 backdrop-blur-md">
              <div 
                className="flex items-center gap-3 cursor-pointer" 
                onClick={() => {
                  if (currentView === 'dashboard') {
                    document.querySelector('.internal-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setView('dashboard');
                  }
                }}
              >
                <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-paper" />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-ink italic">StudyProx</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setShowHelp(true)}
                  className="p-2 hover:bg-ink/5 rounded-lg text-muted"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    if (isHardLocked) {
                      setShowLockAlert(true);
                    } else {
                      onOpenSettings();
                    }
                  }}
                  className={cn(
                    "p-2 rounded-lg text-muted transition-colors",
                    isHardLocked ? "opacity-30 cursor-not-allowed" : "hover:bg-ink/5"
                  )}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </header>



            {/* Main Content */}
            <main className={cn(
              "relative z-10 flex-1 flex flex-col px-8 py-6 pb-40",
              isHardLocked && "pt-4"
            )}>
              {children}
            </main>
          </div>

          {/* Help Modal */}
          {showHelp && (
            <div className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
              <div 
                className="w-full max-w-sm card-scholar p-8 space-y-6 shadow-2xl max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <header className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">System Guide</p>
                  <h3 className="text-2xl font-serif font-bold text-ink italic">StudyProx Features</h3>
                </header>

                <div className="space-y-6">
                  <section className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-ink">
                      <Brain size={16} />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Plan Tasks</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">Breaks big, scary assignments into small, easy steps automatically.</p>
                  </section>

                  <section className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-ink">
                      <Clock size={16} />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Focus Timer</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">Locks distracting apps like TikTok and Instagram while you study.</p>
                  </section>

                  <section className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-ink">
                      <Settings size={16} />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Study Library</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">Organize your flashcards by subject and test yourself with quick quizzes.</p>
                  </section>

                  <section className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-ink">
                      <BarChart3 size={16} />
                      <h4 className="font-bold text-sm uppercase tracking-wider">Stats & Social</h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">Track your study streaks on a calendar and see how your friends are doing.</p>
                  </section>
                </div>

                <button onClick={() => setShowHelp(false)} className="btn-ink w-full">Got it</button>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="absolute bottom-8 left-0 right-0 z-50 px-6">
            <nav className="p-1.5 bg-ink text-paper rounded-[20px] flex items-center shadow-2xl">
              <NavButton 
                icon={<Clock />} 
                label="Library"
                active={currentView === 'cards'} 
                onClick={() => {
                  if (isHardLocked) {
                    setShowLockAlert(true);
                    return;
                  }
                  if (currentView === 'cards') {
                    document.querySelector('.internal-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setView('cards');
                  }
                }}
              />
              <NavButton 
                icon={<Brain />} 
                label="Home"
                active={currentView === 'dashboard' || currentView === 'focus'} 
                onClick={() => {
                  if (currentView === 'dashboard') {
                    document.querySelector('.internal-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setView('dashboard');
                  }
                }}
              />
              <NavButton 
                icon={<BarChart3 />} 
                label="Stats"
                active={currentView === 'stats'} 
                onClick={() => {
                  if (isHardLocked) {
                    setShowLockAlert(true);
                    return;
                  }
                  if (currentView === 'stats') {
                    document.querySelector('.internal-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setView('stats');
                  }
                }}
              />
            </nav>
          </div>
        </div>

        {/* Home Indicator - Hidden on mobile */}
        <div className="hidden sm:flex h-8 items-center justify-center">
          <div className="w-32 h-1 bg-black/20 rounded-full" />
        </div>

        {/* Hard Lock Alert */}
        {showLockAlert && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-200 w-[280px] animate-[scale-in_300ms_var(--ease-out-expo)]">
            <div className="bg-white border-2 border-ink p-4 rounded-xl shadow-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-ink text-paper flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Hard Lock</p>
                <p className="text-[11px] leading-relaxed text-ink font-serif italic">
                  Focus session active. Complete or abandon to navigate.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "nav-item flex-1 flex flex-col items-center gap-1 py-2.5 rounded-[14px] transition-all duration-200 cursor-pointer",
        active ? "bg-paper text-ink shadow-sm scale-[1.01]" : "text-paper/40 hover:text-paper"
      )}
    >
      {cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
