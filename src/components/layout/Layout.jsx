import { cloneElement } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';

export function Layout({ children, currentView, setView, isHardLocked }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 pattern-dots overflow-x-hidden">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 px-6 py-5 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/5 rounded-xl flex items-center justify-center border border-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight font-outfit text-slate-800">StudyProx</span>
        </div>
        
        {!isHardLocked && (
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-all active:scale-95 group">
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={cn(
        "relative z-10 max-w-2xl mx-auto p-6 pb-32 transition-all duration-500",
        isHardLocked && "pt-12 pb-12"
      )}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!isHardLocked && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 flex items-center justify-around pb-safe animate-slide-up">
          <NavButton 
            icon={<Brain />} 
            label="Focus" 
            active={currentView === 'dashboard' || currentView === 'focus'} 
            onClick={() => setView('dashboard')}
          />
          <NavButton 
            icon={<Clock />} 
            label="Sprints" 
            active={currentView === 'cards'} 
            onClick={() => setView('cards')}
          />
          <NavButton 
            icon={<BarChart3 />} 
            label="Analytics" 
            active={currentView === 'stats'} 
            onClick={() => setView('stats')}
          />
        </nav>
      )}
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-primary/10 scale-110' : ''}`}>
        {cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
