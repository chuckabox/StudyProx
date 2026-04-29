import { cloneElement } from 'react';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Layout({ children, isHardLocked }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-ink/5">
      <div className="w-full max-w-[480px] min-h-screen bg-paper relative flex flex-col shadow-2xl">
        {/* Top Nav */}
        <header className="sticky top-0 z-50 px-8 py-6 flex items-center justify-between bg-paper/80 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-paper" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-ink">StudyProx</span>
          </Link>
          
          <Link 
            to="/settings"
            className="p-2 hover:bg-ink/5 rounded-lg text-muted transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </header>

        {/* Main Content */}
        <main className={cn(
          "relative z-10 flex-1 px-8 py-6 pb-40 flex flex-col",
          isHardLocked && "pt-12 pb-40"
        )}>
          {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[440px] px-6">
          <nav className="p-2 bg-ink text-paper rounded-2xl flex items-center justify-around shadow-2xl">
            <NavButton 
              to="/"
              icon={<Brain />} 
              label="Focus"
              active={currentPath === '/' || currentPath === '/focus'} 
            />
            <NavButton 
              to="/cards"
              icon={<Clock />} 
              label="Library"
              active={currentPath === '/cards'} 
            />
            <NavButton 
              to="/stats"
              icon={<BarChart3 />} 
              label="Stats"
              active={currentPath === '/stats'} 
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavButton({ to, icon, label, active }) {
  return (
    <Link 
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-300",
        active 
          ? "bg-paper text-ink shadow-lg scale-105" 
          : "text-paper/40 hover:text-paper hover:bg-paper/5"
      )}
    >
      {cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </Link>
  );
}
