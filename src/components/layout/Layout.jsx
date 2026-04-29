import { cloneElement } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Clock, BarChart3, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Layout({ children, isHardLocked }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Brain />, label: 'Focus', path: '/' },
    { icon: <Clock />, label: 'Library', path: '/library' },
    { icon: <BarChart3 />, label: 'Stats', path: '/stats' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center selection:bg-ink/5">
      <div className="w-full max-w-[480px] min-h-screen bg-paper relative flex flex-col">
        {/* Top Nav */}
        <header className="sticky top-0 z-50 px-8 py-6 flex items-center justify-between bg-paper/80 backdrop-blur-md">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Sparkles className="w-4 h-4 text-paper" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-ink">StudyProx</span>
          </div>
          
          <NavLink 
            to="/settings"
            className={({ isActive }) => cn(
              "p-2 rounded-lg transition-colors",
              isActive ? "bg-ink text-paper" : "text-muted hover:bg-ink/5"
            )}
          >
            <Settings className="w-5 h-5" />
          </NavLink>
        </header>

        {/* Main Content */}
        <main className={cn(
          "relative z-10 flex-1 px-8 py-6 pb-40",
          isHardLocked && "pt-12"
        )}>
          {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-6">
          <nav className="p-2 bg-ink text-paper rounded-2xl flex items-center justify-around shadow-2xl">
            {navItems.map((item) => (
              <NavButton 
                key={item.path}
                icon={item.icon}
                label={item.label}
                to={item.path}
                active={location.pathname === item.path || (item.path === '/' && location.pathname === '/focus')}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, to, active }) {
  return (
    <NavLink 
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl transition-all duration-300",
        active 
          ? "bg-paper text-ink shadow-lg scale-105" 
          : "text-paper/40 hover:text-paper hover:bg-paper/5"
      )}
    >
      {cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </NavLink>
  );
}
