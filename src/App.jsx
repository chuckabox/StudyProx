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
  Activity
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

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Timer, label: 'Focus Timer', path: '/timer' },
    { icon: CheckSquare, label: 'Task Architect', path: '/tasks' },
    { icon: Layers, label: 'Flashcard Suite', path: '/flashcards' },
    { icon: Users, label: 'Social Sync', path: '/social' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <aside className="sidebar glass-card">
      <div className="brand">
        <div className="logo-icon">
          <Zap size={24} fill="var(--accent-primary)" color="var(--accent-primary)" />
        </div>
        <span className="logo-text">StudyProx</span>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {location.pathname === item.path && (
              <motion.div layoutId="activeNav" className="active-indicator" />
            )}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">P</div>
          <div className="user-info">
            <p className="name">Peter</p>
            <p className="plan">Pro Plan</p>
          </div>
          <Settings size={18} className="settings-icon" style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--text-dim)' }} />
        </div>
      </div>
    </aside>
  );
};

const TopBar = () => (
  <div className="top-bar glass-card">
    <div className="search-box">
      <Search size={18} color="var(--text-dim)" />
      <input type="text" placeholder="Search subjects, notes, or tasks..." />
    </div>
    <div className="top-actions">
      <button className="icon-btn"><Bell size={20} /></button>
      <button className="icon-btn"><User size={20} /></button>
      <button className="btn-primary">Start Session</button>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <TopBar />
          <div className="page-container">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/timer" element={<FocusTimer />} />
                <Route path="/tasks" element={<TaskArchitect />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="*" element={<div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}><h2>Building this Hub...</h2><p style={{ color: 'var(--text-dim)' }}>Coming in the next sync.</p></div>} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
