import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { TaskArchitect } from './components/tasks/TaskArchitect';
import { FocusTimer } from './components/focus/FocusTimer';
import { FlashcardSuite } from './components/cards/FlashcardSuite';
import { SocialAnalytics } from './components/analytics/SocialAnalytics';
import { SettingsPage } from './components/settings/SettingsPage';
import { useTasks } from './hooks/use-tasks';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { tasks, addTask, updateSubtask } = useTasks();
  const [view, setView] = useState('dashboard'); // dashboard | architect | focus | cards | stats | settings

  const activeTask = tasks.find(t => !t.completed);

  const handleTaskCreated = (title, subtasks) => {
    addTask(title, subtasks);
    setView('dashboard');
  };

  return (
    <Layout 
      currentView={view} 
      setView={setView} 
      isHardLocked={view === 'focus'}
      onOpenSettings={() => setView('settings')}
    >
      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <LandingDashboard 
              activeTask={activeTask} 
              onStartNew={() => setView('architect')} 
              onUpdateSubtask={updateSubtask}
              onStartFocus={() => setView('focus')}
            />
          </motion.div>
        )}

        {view === 'architect' && (
          <motion.div
            key="architect"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full"
          >
            <TaskArchitect 
              onTaskCreated={handleTaskCreated}
              onCancel={() => setView('dashboard')}
            />
          </motion.div>
        )}

        {view === 'focus' && (
          <motion.div
            key="focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FocusTimer 
              task={activeTask}
              onFinish={() => setView('dashboard')}
            />
          </motion.div>
        )}

        {view === 'cards' && (
          <motion.div key="cards">
            <FlashcardSuite />
          </motion.div>
        )}

        {view === 'stats' && (
          <motion.div key="stats">
            <SocialAnalytics />
          </motion.div>
        )}

        {view === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SettingsPage />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
