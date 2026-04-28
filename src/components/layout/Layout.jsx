import { motion } from 'framer-motion';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground pattern-dots overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 glow-mesh pointer-events-none" />
      
      {/* Top Nav */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-t-0 border-x-0 rounded-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight font-outfit">StudyProx</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/[0.05] rounded-full transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 pb-32">
        {children}
      </main>

      {/* Bottom Navigation (Mobile-First) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 glass-panel border-b-0 border-x-0 rounded-none flex items-center justify-around">
        <NavButton icon={<Brain />} label="Focus" active />
        <NavButton icon={<Clock />} label="Sprints" />
        <NavButton icon={<BarChart3 />} label="Analytics" />
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active }) {
  return (
    <button className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
      <div className={`p-2 rounded-xl ${active ? 'bg-primary/10' : ''}`}>
        {Object.cloneElement(icon, { size: 24 })}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}
