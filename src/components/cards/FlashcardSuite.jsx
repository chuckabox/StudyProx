import React, { useState } from 'react';
import { BookOpen, Plus, ChevronRight, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function FlashcardSuite() {
  const [activeSubject, setActiveSubject] = useState('All');
  
  const subjects = ['All', 'Law::Torts', 'STEM::Bio', 'MATH::Calc', 'HIST::Mid'];
  const cards = [
    { id: 1, subject: 'Law::Torts', front: 'Duty of Care', back: 'A legal obligation imposed on an individual...' },
    { id: 2, subject: 'STEM::Bio', front: 'Mitochondria', back: 'The powerhouse of the cell...' },
    { id: 3, subject: 'MATH::Calc', front: 'Chain Rule', back: 'The derivative of f(g(x)) is f\'(g(x))g\'(x)...' },
  ];

  const filteredCards = activeSubject === 'All' 
    ? cards 
    : cards.filter(c => c.subject === activeSubject);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-4xl font-serif font-extrabold text-ink tracking-tight">Library Drawers</h1>
        <p className="text-muted text-sm font-medium italic">"Knowledge categorized is knowledge retained."</p>
      </section>

      {/* Subject Filter - Horizontal Drawer Selection */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-8 px-8">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={cn(
              "px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95",
              activeSubject === subject 
                ? "bg-ink text-paper shadow-xl shadow-ink/10" 
                : "bg-paper border border-ink/5 text-ink/40 hover:text-ink"
            )}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* The Filing Drawer */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, i) => (
            <motion.div 
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="card-scholar p-6! flex items-center justify-between group cursor-pointer hover:border-ink/20"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-ink/5 rounded-full flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">{card.subject}</p>
                  <h4 className="font-serif font-bold text-xl text-ink italic">{card.front}</h4>
                </div>
              </div>
              <ChevronRight className="text-slate-200 group-hover:text-ink transition-all group-hover:translate-x-1" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="pt-8 grid grid-cols-2 gap-4">
        <button className="btn-ghost p-6! flex flex-col items-center gap-3">
          <Plus size={20} />
          <span className="text-[10px] uppercase tracking-widest font-bold">New Index</span>
        </button>
        <button className="btn-ink p-6! flex flex-col items-center gap-3">
          <Archive size={20} />
          <span className="text-[10px] uppercase tracking-widest font-bold text-paper">Export Anki</span>
        </button>
      </div>
    </div>
  );
}
