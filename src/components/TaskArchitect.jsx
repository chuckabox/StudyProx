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
        <h2 className="glow-text">Architect</h2>
      </header>

      <div className="input-section glass-card">
        <div className="input-row">
          <Sparkles className="sparkle-icon" size={20} color="var(--accent-primary)" />
          <input 
            type="text" 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Deconstruct a complex task..." 
          />
        </div>
        <button 
          onClick={handleDeconstruct} 
          disabled={isArchitecting || !taskInput}
          className="btn-primary full-width"
          style={{ marginTop: '1rem', justifyContent: 'center' }}
        >
          {isArchitecting ? 'Thinking...' : 'Deconstruct'}
        </button>
      </div>

      <div className="tasks-container">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="architect-card glass-card"
            >
              <div className="card-header">
                <div className="header-info">
                  <span className="subject-tag">{task.subject}</span>
                  <h3 style={{ fontSize: '1.1rem' }}>{task.title}</h3>
                </div>
                <button className="icon-btn" onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="steps-list">
                {task.steps.map(step => (
                  <div 
                    key={step.id} 
                    className={`step-item ${step.completed ? 'completed' : ''}`}
                    onClick={() => toggleStep(task.id, step.id)}
                  >
                    {step.completed ? <CheckCircle2 size={18} color="var(--accent-secondary)" /> : <Circle size={18} />}
                    <span style={{ fontSize: '0.9rem' }}>{step.text}</span>
                  </div>
                ))}
                <button className="add-step-btn">
                  <Plus size={14} /> Sub-task
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .architect-page { width: 100%; display: flex; flex-direction: column; gap: 1.5rem; }
        .input-section { padding: 1.25rem; }
        .input-row { display: flex; align-items: center; gap: 0.75rem; }
        .input-section input { flex: 1; background: none; border: none; color: white; font-size: 1rem; outline: none; }
        .full-width { width: 100%; }
        .sparkle-icon { animation: pulse 2s infinite; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        .tasks-container { display: flex; flex-direction: column; gap: 1rem; }
        .architect-card { padding: 1.5rem; border-radius: 28px; }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }

        .steps-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .step-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.015);
          cursor: pointer;
        }

        .step-item.completed span { text-decoration: line-through; opacity: 0.5; }

        .add-step-btn {
          background: none;
          border: 1px dashed var(--border);
          color: var(--text-dim);
          padding: 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </motion.div>
  );
};

export default TaskArchitect;
