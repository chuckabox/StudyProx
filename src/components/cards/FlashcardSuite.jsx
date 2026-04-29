import React, { useState } from 'react';
import { BookOpen, Plus, ChevronRight, Archive } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FlashcardSuite() {
  const cards = [
    { id: 1, subject: 'Law::Torts', front: 'Duty of Care' },
    { id: 2, subject: 'STEM::Bio', front: 'Mitochondria' },
    { id: 3, subject: 'MATH::Calc', front: 'Chain Rule' },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Library Index</p>
        <h2 className="text-3xl font-serif font-bold text-ink italic">Personal Knowledge Base</h2>
      </header>

      <div className="space-y-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            className="flex items-center gap-4 py-4 border-b border-slate-100"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-ink">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">{card.subject}</p>
              <p className="font-serif text-lg text-ink italic">{card.front}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
