import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { TaskArchitect } from './components/tasks/TaskArchitect';
import { FocusTimer } from './components/focus/FocusTimer';
import { FlashcardSuite } from './components/cards/FlashcardSuite';
import { SocialAnalytics } from './components/analytics/SocialAnalytics';
import { SettingsPage } from './components/settings/SettingsPage';
import { useTasks } from './hooks/use-tasks';

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
      <div className="w-full">
        {view === 'dashboard' && (
          <div className="w-full">
            <LandingDashboard 
              activeTask={activeTask} 
              onStartNew={() => setView('architect')} 
              onUpdateSubtask={updateSubtask}
              onStartFocus={() => setView('focus')}
            />
          </div>
        )}

        {view === 'architect' && (
          <div className="w-full">
            <TaskArchitect 
              onTaskCreated={handleTaskCreated}
              onCancel={() => setView('dashboard')}
            />
          </div>
        )}

        {view === 'focus' && (
          <div>
            <FocusTimer 
              task={activeTask}
              onFinish={() => setView('dashboard')}
            />
          </div>
        )}

        {view === 'cards' && (
          <div>
            <FlashcardSuite />
          </div>
        )}

        {view === 'stats' && (
          <div>
            <SocialAnalytics />
          </div>
        )}

        {view === 'settings' && (
          <div>
            <SettingsPage />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
