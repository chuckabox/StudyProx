import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Clock, Brain, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Flashcards = () => {
  const [activeSubject, setActiveSubject] = useState(null);
  const subjects = [
    { id: 1, name: 'Advanced Physics', count: 124, color: '#6366f1' },
    { id: 2, name: 'Macroeconomics', count: 86, color: '#a855f7' },
    { id: 3, name: 'Cellular Biology', count: 210, color: '#ec4899' },
    { id: 4, name: 'Discrete Math', count: 145, color: '#06b6d4' },
  ];

  const cards = [
    { id: 1, question: "What is Heisenberg's Uncertainty Principle?", answer: "The principle that the position and momentum of a particle cannot be simultaneously measured with arbitrary precision." },
    { id: 2, question: "Define Schrödinger's Cat", answer: "A thought experiment that illustrates the paradox of quantum superposition." }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flashcards-page">
      {!activeSubject ? (
        <>
          <header className="page-header">
            <div>
              <h1 className="glow-text">Filing System</h1>
              <p style={{ color: 'var(--text-dim)' }}>Categorized retention suites for long-term mastery.</p>
            </div>
            <button className="btn-primary"><Plus size={18} /> New Deck</button>
          </header>

          <div className="subjects-grid">
            {subjects.map(subject => (
              <motion.div 
                key={subject.id} 
                className="subject-card glass-card"
                whileHover={{ y: -5 }}
                onClick={() => setActiveSubject(subject)}
              >
                <div className="folder-tab" style={{ background: subject.color }}></div>
                <div className="subject-icon" style={{ background: `${subject.color}20`, color: subject.color }}>
                  <GraduationCap size={24} />
                </div>
                <h3>{subject.name}</h3>
                <div className="subject-meta">
                  <span><BookOpen size={14} /> {subject.count} Cards</span>
                  <span><Clock size={14} /> 4d ago</span>
                </div>
                <div className="mastery-bar">
                  <div className="mastery-fill" style={{ width: '65%', background: subject.color }}></div>
                </div>
                <div className="card-actions">
                  <button className="quiz-btn"><Play size={14} fill="currentColor" /> Study Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="study-view">
          <button className="back-btn" onClick={() => { setActiveSubject(null); setIsFlipped(false); }}>
            <ChevronLeft size={20} /> Back to Library
          </button>
          
          <div className="deck-header">
            <h2>{activeSubject.name}</h2>
            <div className="progress-pills">
              {cards.map((_, i) => (
                <div key={i} className={`pill ${i === currentCardIndex ? 'active' : ''} ${i < currentCardIndex ? 'done' : ''}`}></div>
              ))}
            </div>
          </div>

          <div className="card-container" onClick={() => setIsFlipped(!isFlipped)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isFlipped ? 'back' : 'front'}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flash-card glass-card"
              >
                <div className="card-type">{isFlipped ? 'ANSWER' : 'QUESTION'}</div>
                <div className="card-content">
                  {isFlipped ? cards[currentCardIndex].answer : cards[currentCardIndex].question}
                </div>
                <div className="hint-text">Click to flip</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="study-controls">
            <button 
              className="icon-btn large" 
              onClick={(e) => { e.stopPropagation(); setCurrentCardIndex(Math.max(0, currentCardIndex - 1)); setIsFlipped(false); }}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft size={32} />
            </button>
            <div className="confidence-btns">
              <button className="confide-btn bad">Hard</button>
              <button className="confide-btn ok">Good</button>
              <button className="confide-btn easy">Easy</button>
            </div>
            <button 
              className="icon-btn large" 
              onClick={(e) => { e.stopPropagation(); setCurrentCardIndex(Math.min(cards.length - 1, currentCardIndex + 1)); setIsFlipped(false); }}
              disabled={currentCardIndex === cards.length - 1}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .flashcards-page { width: 100%; max-width: 1000px; margin: 0 auto; }
        .subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        
        .subject-card { 
          position: relative; 
          padding: 2rem 1.5rem 1.5rem; 
          cursor: pointer; 
          overflow: hidden; 
        }

        .folder-tab {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 6px;
          border-radius: 0 0 4px 0;
        }

        .subject-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .subject-meta { display: flex; gap: 1rem; margin: 0.5rem 0 1.5rem; font-size: 0.8rem; color: var(--text-dim); }
        .subject-meta span { display: flex; align-items: center; gap: 0.4rem; }

        .mastery-bar { height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 100px; margin-bottom: 1.5rem; }
        .mastery-fill { height: 100%; border-radius: 100px; }

        .quiz-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          color: white;
          padding: 0.6rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .study-view { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .back-btn { align-self: flex-start; background: none; border: none; color: var(--text-dim); cursor: pointer; display: flex; align-items: center; }
        
        .deck-header { text-align: center; }
        .progress-pills { display: flex; gap: 0.5rem; margin-top: 1rem; }
        .pill { width: 30px; height: 4px; background: var(--border); border-radius: 100px; }
        .pill.active { background: var(--accent-primary); width: 40px; }
        .pill.done { background: var(--accent-secondary); }

        .card-container { width: 100%; max-width: 600px; height: 350px; perspective: 1000px; cursor: pointer; }
        .flash-card { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          padding: 3rem;
          text-align: center;
          position: relative;
        }

        .card-type { position: absolute; top: 1.5rem; font-size: 0.75rem; color: var(--text-dim); letter-spacing: 0.2em; }
        .card-content { font-size: 1.75rem; font-weight: 500; line-height: 1.4; }
        .hint-text { position: absolute; bottom: 1.5rem; font-size: 0.75rem; color: var(--text-dim); opacity: 0.5; }

        .study-controls { display: flex; align-items: center; gap: 2rem; }
        .confidence-btns { display: flex; gap: 1rem; }
        .confide-btn { 
          padding: 0.75rem 1.5rem; 
          border-radius: 12px; 
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .confide-btn.bad:hover { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .confide-btn.ok:hover { border-color: var(--accent-primary); background: rgba(99, 102, 241, 0.1); }
        .confide-btn.easy:hover { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
      `}</style>
    </motion.div>
  );
};

export default Flashcards;
