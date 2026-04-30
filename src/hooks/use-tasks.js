import { useState, useEffect } from 'react';

export function useStudyCore() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studyprox-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('studyprox-stats');
    return saved ? JSON.parse(saved) : {
      totalHours: 0,
      sessionsAborted: 0,
      subjectBreakdown: { 'LAW': 0, 'STEM': 0, 'MATH': 0, 'HIST': 0 },
      dailyActivity: [], // { date: '2026-04-29', hours: 0 }
      sessionHistory: [] // { id, title, subject, durationMins, status: 'completed' | 'abandoned', subtasks: [], timestamp }
    };
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('studyprox-settings');
    return saved ? JSON.parse(saved) : {
      aiComplexity: 'standard', // simple | standard | depth
      restrictedApps: ['Instagram', 'Discord', 'TikTok']
    };
  });

  useEffect(() => {
    localStorage.setItem('studyprox-tasks', JSON.stringify(tasks));
    localStorage.setItem('studyprox-stats', JSON.stringify(stats));
    localStorage.setItem('studyprox-settings', JSON.stringify(settings));
  }, [tasks, stats, settings]);

  const [timerTime, setTimerTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const addTask = (title, subject, subtasks = []) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      subject: subject || 'STEM', // Default to STEM if none provided
      subtasks: subtasks.map(text => ({ id: crypto.randomUUID(), text, completed: false })),
      createdAt: new Date().toISOString(),
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

  const logStudySession = (subject, minutes) => {
    const hours = minutes / 60;
    const today = new Date().toISOString().split('T')[0];

    setStats(prev => {
      const newDaily = [...prev.dailyActivity];
      const dayIdx = newDaily.findIndex(d => d.date === today);
      if (dayIdx > -1) {
        newDaily[dayIdx].hours += hours;
      } else {
        newDaily.push({ date: today, hours });
      }

      return {
        ...prev,
        totalHours: prev.totalHours + hours,
        subjectBreakdown: {
          ...prev.subjectBreakdown,
          [subject]: (prev.subjectBreakdown[subject] || 0) + hours
        },
        dailyActivity: newDaily,
        sessionHistory: [
          {
            id: crypto.randomUUID(),
            title: subject, // Fallback if no task
            subject,
            durationMins: minutes,
            status: 'completed',
            timestamp: new Date().toISOString()
          },
          ...prev.sessionHistory.slice(0, 49)
        ]
      };
    });
  };

  const logTaskCompletion = (task, minutes) => {
    const hours = minutes / 60;
    const today = new Date().toISOString().split('T')[0];

    setStats(prev => {
      const newDaily = [...prev.dailyActivity];
      const dayIdx = newDaily.findIndex(d => d.date === today);
      if (dayIdx > -1) {
        newDaily[dayIdx].hours += hours;
      } else {
        newDaily.push({ date: today, hours });
      }

      return {
        ...prev,
        totalHours: prev.totalHours + hours,
        subjectBreakdown: {
          ...prev.subjectBreakdown,
          [task.subject]: (prev.subjectBreakdown[task.subject] || 0) + hours
        },
        dailyActivity: newDaily,
        sessionHistory: [
          {
            id: crypto.randomUUID(),
            title: task.title,
            subject: task.subject,
            durationMins: minutes,
            status: 'completed',
            subtasks: task.subtasks,
            timestamp: new Date().toISOString()
          },
          ...prev.sessionHistory.slice(0, 49)
        ]
      };
    });
  };

  const abortSession = (task, minutes = 0) => {
    setStats(prev => ({
      ...prev,
      sessionsAborted: prev.sessionsAborted + 1,
      sessionHistory: [
        {
          id: crypto.randomUUID(),
          title: task?.title || 'Unknown Project',
          subject: task?.subject || 'STEM',
          durationMins: minutes,
          status: 'abandoned',
          subtasks: task?.subtasks || [],
          timestamp: new Date().toISOString()
        },
        ...prev.sessionHistory.slice(0, 49)
      ]
    }));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return {
    tasks,
    stats,
    settings,
    setSettings,
    addTask,
    updateSubtask,
    logStudySession,
    logTaskCompletion,
    clearTasks,
    abortSession,
    timerTime,
    setTimerTime,
    isTimerRunning,
    setIsTimerRunning
  };
}
