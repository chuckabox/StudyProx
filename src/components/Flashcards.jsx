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
            <h2 className="glow-text">Study Decks</h2>
          </header>

          <div className="subjects-grid">
            {subjects.map(subject => (
              <motion.div 
                key={subject.id} 
                className="subject-card glass-card"
                onClick={() => setActiveSubject(subject)}
              >
                <div className="subject-icon" style={{ background: `${subject.color}15`, color: subject.color }}>
                  <GraduationCap size={20} />
                </div>
                <h3>{subject.name}</h3>
                <div className="subject-meta">
                  <span>{subject.count} cards</span>
                </div>
                <div className="card-actions">
                  <button className="quiz-btn">Study</button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="study-view">
          <div className="study-top">
            <button className="back-btn" onClick={() => { setActiveSubject(null); setIsFlipped(false); }}>
              <ChevronLeft size={18} /> Library
            </button>
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
                className="flash-card glass-card"
              >
                <span className="card-lbl">{isFlipped ? 'ANSWER' : 'QUESTION'}</span>
                <p className="card-txt">
                  {isFlipped ? cards[currentCardIndex].answer : cards[currentCardIndex].question}
                </p>
                <span className="tap-hint">Tap to flip</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="study-footer">
            <div className="study-controls">
              <button 
                className="icon-btn" 
                onClick={(e) => { e.stopPropagation(); setCurrentCardIndex(Math.max(0, currentCardIndex - 1)); setIsFlipped(false); }}
                disabled={currentCardIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="confidence-btns">
                <button className="confide-btn bad">Hard</button>
                <button className="confide-btn easy">Easy</button>
              </div>

              <button 
                className="icon-btn" 
                onClick={(e) => { e.stopPropagation(); setCurrentCardIndex(Math.min(cards.length - 1, currentCardIndex + 1)); setIsFlipped(false); }}
                disabled={currentCardIndex === cards.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .flashcards-page { width: 100%; }
        .page-header { margin-bottom: 1.5rem; }
        .subjects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        
        .subject-card { 
          padding: 1.25rem 1rem;
          text-align: left;
        }

        .subject-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .subject-card h3 { font-size: 0.9rem; margin-bottom: 0.25rem; line-height: 1.2; }
        .subject-meta { font-size: 0.7rem; color: var(--text-dim); margin-bottom: 1.25rem; }

        .quiz-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .study-view { width: 100%; display: flex; flex-direction: column; gap: 1.5rem; }
        .study-top { display: flex; justify-content: space-between; align-items: center; }
        .back-btn { background: none; border: none; color: var(--text-dim); display: flex; align-items: center; font-size: 0.875rem; }
        
        .progress-pills { display: flex; gap: 4px; }
        .pill { width: 16px; height: 3px; background: var(--border); border-radius: 100px; }
        .pill.active { background: var(--accent-primary); width: 24px; }
        .pill.done { background: var(--accent-secondary); }

        .card-container { width: 100%; height: 320px; perspective: 1000px; }
        .flash-card { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          padding: 2rem;
          text-align: center;
          border-radius: 32px;
        }

        .card-lbl { position: absolute; top: 1.25rem; font-size: 0.6rem; color: var(--text-dim); letter-spacing: 0.1em; }
        .card-txt { font-size: 1.25rem; font-weight: 500; line-height: 1.5; }
        .tap-hint { position: absolute; bottom: 1.25rem; font-size: 0.65rem; color: var(--text-dim); opacity: 0.5; }

        .study-footer { margin-top: 1rem; }
        .study-controls { display: flex; justify-content: space-between; align-items: center; }
        .confidence-btns { display: flex; gap: 0.5rem; }
        .confide-btn { 
          padding: 0.6rem 1.25rem; 
          border-radius: 12px; 
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
        }
      `}</style>
    </motion.div>
  );
};

export default Flashcards;
