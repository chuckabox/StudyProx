import { useState, useEffect } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studyprox-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studyprox-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, subtasks = []) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      subtasks,
      createdAt: new Date().toISOString(),
      active: false,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateSubtask = (taskId, subtaskId, completed) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newSubtasks = task.subtasks.map(st => 
          st.id === subtaskId ? { ...st, completed } : st
        );
        const allCompleted = newSubtasks.every(st => st.completed);
        return { ...task, subtasks: newSubtasks, completed: allCompleted };
      }
      return task;
    }));
  };

  const deleteLevelTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return {
    tasks,
    addTask,
    updateSubtask,
    deleteLevelTask
  };
}
