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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="timer-page"
    >
      <div className="timer-header">
        <h2 className="glow-text">Study Mode</h2>
        <div className="subject-selector">
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option>Mathematics</option>
            <option>Advanced Physics</option>
            <option>Macroeconomics</option>
          </select>
        </div>
      </div>

      <div className="timer-main glass-card">
        <div className="circular-progress-box">
          <svg className="progress-ring" width="240" height="240">
            <circle
              className="progress-ring__circle-bg"
              stroke="var(--border)"
              strokeWidth="6"
              fill="transparent"
              r="110"
              cx="120"
              cy="120"
            />
            <motion.circle
              className="progress-ring__circle"
              stroke="var(--accent-primary)"
              strokeWidth="6"
              strokeDasharray="691.15"
              animate={{ strokeDashoffset: 691.15 - (691.15 * progress) / 100 }}
              strokeLinecap="round"
              fill="transparent"
              r="110"
              cx="120"
              cy="120"
            />
          </svg>
          <div className="time-text">
            <span className="big-time">{formatTime(timeLeft)}</span>
            <span className="mode-label">{isActive ? 'Flowing' : 'Ready'}</span>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={resetTimer} className="icon-btn large"><RotateCcw size={20} /></button>
        <button onClick={toggleTimer} className="btn-primary main-toggle">
          {isActive ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button 
          onClick={() => setIsDeepMode(!isDeepMode)} 
          className={`icon-btn large ${isDeepMode ? 'active-glow' : ''}`}
        >
          <Shield size={20} fill={isDeepMode ? "var(--accent-secondary)" : "none"} />
        </button>
      </div>

      <div className="feature-info glass-card">
        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
          {isDeepMode 
            ? 'Deep focus active. Distractions are blocked.' 
            : 'Standard mode. No apps are restricted.'}
        </p>
      </div>

      <style>{`
        .timer-page { display: flex; flex-direction: column; gap: 1.5rem; align-items: center; }
        .timer-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 0.5rem; }
        .subject-selector select { background: var(--bg-surface); border: none; color: white; padding: 0.4rem 0.8rem; border-radius: 12px; font-size: 0.8rem; }
        
        .timer-main {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          border-radius: 32px;
        }

        .circular-progress-box { position: relative; display: flex; align-items: center; justify-content: center; width: 240px; height: 240px; }
        .progress-ring { transform: rotate(-90deg); }
        .time-text { position: absolute; display: flex; flex-direction: column; align-items: center; }
        .big-time { font-size: 3.5rem; font-weight: 700; }
        .mode-label { color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem; }

        .timer-controls { display: flex; align-items: center; gap: 1.5rem; margin-top: 1rem; }
        .main-toggle { width: 70px; height: 70px; border-radius: 35px; justify-content: center; }
        .icon-btn.large { width: 50px; height: 50px; border-radius: 25px; display: flex; align-items: center; justify-content: center; }
        .active-glow { border-color: var(--accent-secondary); color: var(--accent-secondary); }

        .feature-info { width: 100%; text-align: center; }
      `}</style>
    </motion.div>
  );
};

export default FocusTimer;
