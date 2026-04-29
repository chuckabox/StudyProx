import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    activeTask, 
    stats, 
    settings, 
    setSettings, 
    createTask, 
    updateSubtask, 
    completeTask,
    logStudySession
  } = useStudyCore();

  const [isCreating, setIsCreating] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout isHardLocked={isFocusing}>
        <Routes>
          <Route 
            path="/" 
            element={
              isFocusing ? (
                <FocusTimer 
                  task={activeTask} 
                  onComplete={(duration) => {
                    logStudySession(activeTask?.id ? 'STEM' : 'GENERAL', duration);
                    setIsFocusing(false);
                  }}
                  onExit={() => setIsFocusing(false)}
                />
              ) : isCreating ? (
                <TaskArchitect 
                  settings={settings}
                  onTaskCreated={(title, steps) => {
                    createTask(title, steps);
                    setIsCreating(false);
                  }}
                  onCancel={() => setIsCreating(false)}
                />
              ) : (
                <LandingDashboard 
                  activeTask={activeTask}
                  stats={stats}
                  onStartNew={() => setIsCreating(true)}
                  onUpdateSubtask={updateSubtask}
                  onStartFocus={() => setIsFocusing(true)}
                />
              )
            } 
          />
          <Route path="/cards" element={<FlashcardSuite />} />
          <Route path="/stats" element={<SocialAnalytics stats={stats} />} />
          <Route 
            path="/settings" 
            element={<SettingsPage settings={settings} setSettings={setSettings} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
