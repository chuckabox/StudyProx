import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingDashboard } from './components/dashboard/LandingDashboard';
import { TaskArchitect } from './components/tasks/TaskArchitect';
import { useTasks } from './hooks/use-tasks';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { tasks, addTask, updateSubtask } = useTasks();
  const [view, setView] = useState('dashboard'); // dashboard | architect | focus

  const activeTask = tasks.find(t => !t.completed);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto"
          >
            <LandingDashboard 
              activeTask={activeTask} 
              onStartNew={() => setView('architect')} 
              onUpdateSubtask={updateSubtask}
            />
          </motion.div>
        )}

        {view === 'architect' && (
          <motion.div
            key="architect"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl mx-auto"
          >
            <TaskArchitect 
              onTaskCreated={(title, subtasks) => {
                addTask(title, subtasks);
                setView('dashboard');
              }}
              onCancel={() => setView('dashboard')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
