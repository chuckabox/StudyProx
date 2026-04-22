import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Shield, ShieldOff } from 'lucide-react';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isDeepMode, setIsDeepMode] = useState(false);
  const [subject, setSubject] = useState('Mathematics');

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="timer-page"
    >
      <div className="timer-header">
        <h1 className="glow-text">Focus Session</h1>
        <div className="subject-selector glass-card">
          <span>Subject:</span>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>Mathematics</option>
            <option>Advanced Physics</option>
            <option>Macroeconomics</option>
            <option>CS: Algorithms</option>
          </select>
        </div>
      </div>

      <div className="timer-display-container glass-card">
        <div className="circular-progress-box">
          <svg className="progress-ring" width="300" height="300">
            <circle
              className="progress-ring__circle-bg"
              stroke="var(--border)"
              strokeWidth="8"
              fill="transparent"
              r="140"
              cx="150"
              cy="150"
            />
            <motion.circle
              className="progress-ring__circle"
              stroke="var(--accent-primary)"
              strokeWidth="8"
              strokeDasharray="879.6459"
              animate={{ strokeDashoffset: 879.6459 - (879.6459 * progress) / 100 }}
              strokeLinecap="round"
              fill="transparent"
              r="140"
              cx="150"
              cy="150"
            />
          </svg>
          <div className="time-text">
            <span className="big-time">{formatTime(timeLeft)}</span>
            <span className="mode-label">{isActive ? 'Flowing...' : 'Ready'}</span>
          </div>
        </div>

        <div className="timer-controls">
          <button onClick={resetTimer} className="icon-btn large"><RotateCcw /></button>
          <button onClick={toggleTimer} className="btn-primary main-toggle">
            {isActive ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button 
            onClick={() => setIsDeepMode(!isDeepMode)} 
            className={`icon-btn large ${isDeepMode ? 'active-glow' : ''}`}
          >
            {isDeepMode ? <Shield fill="var(--accent-secondary)" /> : <ShieldOff />}
          </button>
        </div>
      </div>

      <div className="timer-footer">
        <div className="glass-card feature-info">
          <h3>{isDeepMode ? 'Deep Focus Active' : 'Standard Focus'}</h3>
          <p>{isDeepMode 
            ? 'Proactive distraction blocking is enabled. All non-essential notifications are hard-locked.' 
            : 'Standard focus mode. Notifications are silenced but accessible.'}
          </p>
        </div>
      </div>

      <style>{`
        .timer-page { display: flex; flex-direction: column; gap: 2rem; align-items: center; }
        .timer-header { width: 100%; display: flex; justify-content: space-between; align-items: center; }
        .subject-selector { display: flex; align-items: center; gap: 1rem; padding: 0.5rem 1rem; }
        .subject-selector select { background: none; border: none; color: white; font-weight: 600; cursor: pointer; }
        
        .timer-display-container {
          width: 500px;
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
        }

        .circular-progress-box { position: relative; display: flex; align-items: center; justify-content: center; }
        .progress-ring { transform: rotate(-90deg); }
        .time-text { position: absolute; display: flex; flex-direction: column; align-items: center; }
        .big-time { font-size: 4.5rem; font-weight: 800; font-variant-numeric: tabular-nums; }
        .mode-label { color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.875rem; }

        .timer-controls { display: flex; align-items: center; gap: 2rem; }
        .main-toggle { width: 80px; height: 80px; border-radius: 50%; justify-content: center; }
        .icon-btn.large { padding: 1rem; border-radius: 50%; }
        .active-glow { border-color: var(--accent-secondary); box-shadow: 0 0 15px var(--accent-secondary); color: var(--accent-secondary); }

        .feature-info { width: 100%; max-width: 600px; text-align: center; }
        .feature-info h3 { margin-bottom: 0.5rem; color: var(--accent-secondary); }
      `}</style>
    </motion.div>
  );
};

export default FocusTimer;
