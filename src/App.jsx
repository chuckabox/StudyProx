import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const activeTask = tasks.find(t => !t.completed);

  const handleTaskCreated = (title, subtasks) => {
    addTask(title, subtasks);
    navigate('/');
  };

  return (
    <Layout isHardLocked={location.pathname === '/focus'}>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingDashboard 
              activeTask={activeTask} 
              stats={stats}
              onStartNew={() => navigate('/architect')} 
              onUpdateSubtask={updateSubtask}
              onStartFocus={() => navigate('/focus')}
            />
          } 
        />
        
        <Route 
          path="/architect" 
          element={
            <TaskArchitect 
              settings={settings}
              onTaskCreated={handleTaskCreated}
              onCancel={() => navigate('/')}
            />
          } 
        />

        <Route 
          path="/focus" 
          element={
            <FocusTimer 
              task={activeTask}
              settings={settings}
              onComplete={(subject, mins) => {
                logStudySession(subject, mins);
                navigate('/');
              }}
              onExit={() => navigate('/')}
            />
          } 
        />

        <Route path="/library" element={<FlashcardSuite />} />
        <Route path="/stats" element={<SocialAnalytics stats={stats} />} />
        <Route 
          path="/settings" 
          element={
            <SettingsPage 
              settings={settings} 
              setSettings={setSettings} 
            />
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;
