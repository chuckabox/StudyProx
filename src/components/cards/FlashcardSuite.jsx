import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, BookOpen, Clock, ChevronRight, Check, X } from 'lucide-react';

export function FlashcardSuite() {
  const [activeDeck, setActiveDeck] = useState(null);

  const decks = [
    { id: 1, subject: 'MATH2001', cards: 42, due: 12, color: 'bg-primary' },
    { id: 2, subject: 'PSYC1001', cards: 156, due: 0, color: 'bg-amber-500' },
    { id: 3, subject: 'DECO2500', cards: 28, due: 5, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-outfit text-slate-800">Filing System</h1>
          <p className="text-slate-500 text-sm">Subject-specific retention scaffolding.</p>
        </div>
        <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/10">
          <Plus size={24} />
        </button>
      </section>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 gap-4">
        {decks.map(deck => (
          <div 
            key={deck.id}
            className="card-minimal flex items-center justify-between group cursor-pointer hover:border-primary/20"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${deck.color}/10 rounded-2xl flex items-center justify-center border border-${deck.color}/10`}>
                <Layers className={`${deck.color.replace('bg-', 'text-')} w-6 h-6`} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{deck.cards} Cards</p>
                <h3 className="text-lg font-bold text-slate-800">{deck.subject}</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {deck.due > 0 && (
                <div className="bg-destructive/5 text-destructive px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-destructive/10">
                  {deck.due} Due
                </div>
              )}
              <ChevronRight className="text-slate-200 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Practice CTA */}
      <section className="card-minimal bg-slate-900 text-white border-none p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Daily Ritual</span>
          </div>
          <h2 className="text-xl font-bold font-outfit">Ready for a retention sprint?</h2>
          <p className="text-slate-400 text-sm">12 cards due across all subjects.</p>
        </div>
        <button className="w-full btn-primary bg-white text-slate-900 hover:bg-slate-100">
          Start Session
        </button>
      </section>
    </div>
  );
}
