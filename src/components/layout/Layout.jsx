import { cloneElement } from 'react';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, currentView, setView, isHardLocked, onOpenSettings }) {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-ink/5">
      <div className="w-full max-w-[480px] min-h-screen bg-paper relative flex flex-col">
        {/* Top Nav */}
        <header className="sticky top-0 z-50 px-8 py-6 flex items-center justify-between bg-paper/80 backdrop-blur-md">
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
          "relative z-10 flex-1 px-8 py-6 pb-32",
          isHardLocked && "pt-12 pb-32"
        )}>
          {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-6">
          <nav className="p-2 bg-ink text-paper rounded-xl flex items-center justify-around shadow-lg">
            <NavButton 
              icon={<Brain />} 
              active={currentView === 'dashboard' || currentView === 'focus'} 
              onClick={() => setView('dashboard')}
            />
            <NavButton 
              icon={<Clock />} 
              active={currentView === 'cards'} 
              onClick={() => setView('cards')}
            />
            <NavButton 
              icon={<BarChart3 />} 
              active={currentView === 'stats'} 
              onClick={() => setView('stats')}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
function NavButton({ icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "nav-item",
        active ? "bg-paper text-ink shadow-sm" : "text-paper/40 hover:text-paper"
      )}
    >
      {cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
    </button>
  );
}
