import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, ChevronRight, CheckCircle2, Circle, Trash2 } from 'lucide-react';

const TaskArchitect = () => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Advanced Calculus Assignment Ch. 4',
      subject: 'Mathematics',
      steps: [
        { id: 11, text: 'Review limit definitions', completed: true },
        { id: 12, text: 'Solve practice problems 1-10', completed: false },
        { id: 13, text: 'Draft solution for theorem proof', completed: false },
      ],
      isExpanded: true
    }
  ]);
  const [isArchitecting, setIsArchitecting] = useState(false);

  const handleDeconstruct = () => {
    if (!taskInput) return;
    setIsArchitecting(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const newTasks = [
        ...tasks,
        {
          id: Date.now(),
          title: taskInput,
          subject: 'General',
          steps: [
            { id: Date.now() + 1, text: 'Define initial parameters', completed: false },
            { id: Date.now() + 2, text: 'Research core methodology', completed: false },
            { id: Date.now() + 3, text: 'Synthesize findings into draft', completed: false },
          ],
          isExpanded: true
        }
      ];
      setTasks(newTasks);
      setTaskInput('');
      setIsArchitecting(false);
    }, 2000);
  };

  const toggleStep = (taskId, stepId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          steps: t.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
        };
      }
      return t;
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="architect-page">
      <header className="page-header">
        <div>
          <h1 className="glow-text">Task Architect</h1>
          <p style={{ color: 'var(--text-dim)' }}>Deconstruct complexity into actionable steps.</p>
        </div>
      </header>

      <div className="input-section glass-card">
        <Sparkles className="sparkle-icon" size={24} color="var(--accent-primary)" />
        <input 
          type="text" 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="I need to write a 2000-word essay on Neoclassical Architecture..." 
        />
        <button 
          onClick={handleDeconstruct} 
          disabled={isArchitecting || !taskInput}
          className="btn-primary"
        >
          {isArchitecting ? 'Architecting...' : 'Deconstruct'}
        </button>
      </div>

      <div className="tasks-container">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="architect-card glass-card"
            >
              <div className="card-header">
                <div className="header-info">
                  <span className="subject-tag">{task.subject}</span>
                  <h3>{task.title}</h3>
                </div>
                <button className="icon-btn" onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="steps-list">
                {task.steps.map(step => (
                  <div 
                    key={step.id} 
                    className={`step-item ${step.completed ? 'completed' : ''}`}
                    onClick={() => toggleStep(task.id, step.id)}
                  >
                    {step.completed ? <CheckCircle2 size={20} color="var(--accent-secondary)" /> : <Circle size={20} />}
                    <span>{step.text}</span>
                  </div>
                ))}
                <button className="add-step-btn">
                  <Plus size={16} /> Add sub-task
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .architect-page { width: 100%; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
        .input-section { display: flex; align-items: center; gap: 1rem; padding: 1.5rem; }
        .input-section input { flex: 1; background: none; border: none; color: white; font-size: 1.1rem; outline: none; }
        .sparkle-icon { animation: pulse 2s infinite; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        .tasks-container { display: flex; flex-direction: column; gap: 1.5rem; }
        .architect-card { padding: 2rem; }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .subject-tag { 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .steps-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .step-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          cursor: pointer;
          transition: var(--transition);
        }

        .step-item:hover { background: rgba(255, 255, 255, 0.05); }
        .step-item.completed { opacity: 0.6; }
        .step-item.completed span { text-decoration: line-through; }

        .add-step-btn {
          background: none;
          border: 1px dashed var(--border);
          color: var(--text-dim);
          padding: 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .add-step-btn:hover { border-color: var(--accent-primary); color: white; }
      `}</style>
    </motion.div>
  );
};

export default TaskArchitect;
