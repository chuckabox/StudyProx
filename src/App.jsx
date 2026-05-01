import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { TaskArchitect } from './components/tasks/TaskArchitect';
import { FocusTimer } from './components/focus/FocusTimer';
import { FlashcardSuite } from './components/cards/FlashcardSuite';
import { SocialAnalytics } from './components/analytics/SocialAnalytics';
import { SettingsPage } from './components/settings/SettingsPage';
import { useStudyCore } from './hooks/use-tasks';

function App() {
  const { 
    tasks, stats, settings, setSettings, addTask, updateSubtask, 
    logStudySession, logTaskCompletion, clearTasks, abortSession, 
    timerTime, setTimerTime, isTimerRunning, setIsTimerRunning 
  } = useStudyCore();
  const [view, setView] = useState('dashboard'); // dashboard | architect | focus | cards | stats | settings

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const activeTask = tasks.find(t => !t.completed);

  const handleTaskCreated = (title, subject, subtasks) => {
    addTask(title, subject, subtasks);
    setView('focus');
  };

  return (
    <Layout 
      currentView={view} 
      setView={(newView) => {
        // If timer is running and user clicks home, go to focus
        if (newView === 'dashboard' && isTimerRunning) {
          setView('focus');
        } else {
          setView(newView);
        }
      }} 
      isHardLocked={view === 'focus'}
      onOpenSettings={() => setView('settings')}
    >
      <div className="w-full">
        {view === 'dashboard' && (
          <div className="w-full">
            <LandingDashboard 
              stats={stats}
              onStartNew={() => setView('architect')} 
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
              timerTime={timerTime}
              setTimerTime={setTimerTime}
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              onUpdateSubtask={updateSubtask}
              onComplete={(task, mins) => {
                logTaskCompletion(task, mins);
                setIsTimerRunning(false);
                setTimerTime(25 * 60);
                setView('dashboard');
              }}
              onExit={(task, mins) => {
                abortSession(task, mins);
                setIsTimerRunning(false);
                setTimerTime(25 * 60);
                setView('dashboard');
              }}
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
