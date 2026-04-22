import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Timer, 
  CheckSquare, 
  Layers, 
  Users, 
  TrendingUp, 
  Settings,
  Zap,
  Search,
  Bell,
  User,
  Activity,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import FocusTimer from './components/FocusTimer';
import TaskArchitect from './components/TaskArchitect';
import Flashcards from './components/Flashcards';

const Dashboard = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard">
    <header className="page-header">
      <div>
        <h1 className="glow-text">Welcome back, Peter</h1>
        <p style={{ color: 'var(--text-dim)' }}>Ready for some deep work today?</p>
      </div>
      <div className="status-badge">
        <Zap size={16} fill="var(--accent-secondary)" color="var(--accent-secondary)" />
        <span>4-day Streak</span>
      </div>
    </header>

    <div className="stats-grid">
      <div className="glass-card stat-card">
        <span className="stat-label">Focus Time</span>
        <span className="stat-value">32.5h</span>
        <div className="mini-graph focus"></div>
      </div>
      <div className="glass-card stat-card">
        <span className="stat-label">Tasks Done</span>
        <span className="stat-value">148</span>
        <div className="mini-graph tasks"></div>
      </div>
      <div className="glass-card stat-card">
        <span className="stat-label">Retention</span>
        <span className="stat-value">92%</span>
        <div className="mini-graph retention"></div>
      </div>
    </div>

    <div className="main-grid">
      <div className="recent-activity glass-card">
        <div className="flex-between">
          <h3>Priority Assignments</h3>
          <button className="text-btn">View All</button>
        </div>
        <div className="task-list">
          {[
            { title: "Deconstruct Advanced Calculus Ch. 4", meta: "Due in 2 days • Mathematics", status: "Architecting..." },
            { title: "Physics Lab Report: Quantum Tunneling", meta: "Due in 5 days • Physics", status: "Ready" },
            { title: "Macroeconomics: Market Trends", meta: "Tomorrow • Economics", status: "Focusing" }
          ].map((task, i) => (
            <div key={i} className="task-item">
              <div className="task-dot"></div>
              <div className="task-info">
                <p className="task-title">{task.title}</p>
                <p className="task-meta">{task.meta}</p>
              </div>
              <div className="task-status">{task.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="social-mini glass-card">
        <div className="flex-between">
          <h3>Friend Activity</h3>
          <Activity size={18} color="var(--text-dim)" />
        </div>
        <div className="friend-list">
          {[
            { name: "Alex R.", action: "Focused for 3h", time: "10m ago" },
            { name: "Sarah K.", action: "Mastered 40 cards", time: "1h ago" },
            { name: "James L.", action: "Started Physics", time: "Just now" }
          ].map((f, i) => (
            <div key={i} className="friend-item">
              <div className="avatar-mini">{f.name[0]}</div>
              <div className="friend-info">
                <p><strong>{f.name}</strong> {f.action}</p>
                <p className="time">{f.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      .flex-between { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
      .text-btn { background: none; border: none; color: var(--accent-primary); cursor: pointer; font-weight: 500; font-size: 0.875rem; }
      .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
      
      .mini-graph { height: 40px; margin-top: 1rem; border-radius: 4px; background: rgba(255, 255, 255, 0.02); position: relative; overflow: hidden; }
      .mini-graph::after { 
        content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 60%; 
        background: linear-gradient(to top, var(--accent-primary)20, transparent); 
        clip-path: polygon(0 100%, 15% 40%, 30% 70%, 50% 20%, 70% 50%, 85% 30%, 100% 60%, 100% 100%);
      }
      .mini-graph.focus::after { background: linear-gradient(to top, var(--accent-secondary)20, transparent); }

      .friend-list { display: flex; flex-direction: column; gap: 1.25rem; }
      .friend-item { display: flex; gap: 0.75rem; align-items: center; }
      .avatar-mini { width: 32px; height: 32px; border-radius: 50%; background: var(--bg-surface-hover); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; border: 1px solid var(--border); }
      .friend-info p { font-size: 0.875rem; }
      .friend-info .time { font-size: 0.75rem; color: var(--text-dim); }
    `}</style>
  </motion.div>
);


const BottomNav = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Timer, label: 'Focus', path: '/timer' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Layers, label: 'Learn', path: '/flashcards' },
    { icon: Users, label: 'Social', path: '/social' },
  ];

  return (
    <nav className="bottom-nav">
      {menuItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <item.icon size={24} />
          <span>{item.label}</span>
          {location.pathname === item.path && (
            <motion.div layoutId="navDot" className="active-indicator-dot" />
          )}
        </Link>
      ))}
    </nav>
  );
};

const TopBar = () => (
  <div className="top-bar">
    <div className="brand">
      <Zap size={20} fill="var(--accent-primary)" color="var(--accent-primary)" />
      <span className="logo-text" style={{ fontSize: '1.25rem' }}>StudyProx</span>
    </div>
    <div className="top-actions">
      <button className="icon-btn" style={{ border: 'none' }}><Bell size={20} /></button>
      <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>P</div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-layout">
        <TopBar />
        <main className="main-content">
          <div className="page-container">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/timer" element={<FocusTimer />} />
                <Route path="/tasks" element={<TaskArchitect />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="*" element={
                  <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2>Syncing Hub...</h2>
                    <p style={{ color: 'var(--text-dim)' }}>Coming in the next update.</p>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
        <BottomNav />
        <div className="fab-container">
          <button className="btn-fab"><Plus size={24} /></button>
        </div>
      </div>
    </Router>
  );
}

export default App;
