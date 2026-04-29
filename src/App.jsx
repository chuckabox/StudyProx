import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { TaskArchitect } from './components/tasks/TaskArchitect';
import { FocusTimer } from './components/focus/FocusTimer';
import { FlashcardSuite } from './components/cards/FlashcardSuite';
import { SocialAnalytics } from './components/analytics/SocialAnalytics';
import { SettingsPage } from './components/settings/SettingsPage';
import { useStudyCore } from './hooks/use-tasks';

function App() {
  const { tasks, stats, settings, setSettings, addTask, updateSubtask, logStudySession } = useStudyCore();
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
              stats={stats}
              onStartNew={() => setView('architect')} 
              onUpdateSubtask={updateSubtask}
              onStartFocus={() => setView('focus')}
            />
          </div>
        )}

        {view === 'architect' && (
          <div className="w-full">
            <TaskArchitect 
              settings={settings}
              onTaskCreated={handleTaskCreated}
              onCancel={() => setView('dashboard')}
            />
          </div>
        )}

        {view === 'focus' && (
          <div>
            <FocusTimer 
              task={activeTask}
              settings={settings}
              onComplete={(subject, mins) => {
                logStudySession(subject, mins);
                setView('dashboard');
              }}
              onExit={() => setView('dashboard')}
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
            <SocialAnalytics stats={stats} />
          </div>
        )}

        {view === 'settings' && (
          <div>
            <SettingsPage 
              settings={settings} 
              setSettings={setSettings} 
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
