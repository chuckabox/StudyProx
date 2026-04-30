import React, { useState, useEffect } from 'react';
import { Plus, Check, Zap, CheckCircle2, TrendingUp, Clock, UserPlus } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LandingDashboard({ stats, onStartNew }) {
  const quotes = [
    "Cognition peaks during early focus.",
    "Small steps lead to deep mastery.",
    "Your future self thanks you for this.",
    "Focus is the ultimate leverage."
  ];
  const randomQuote = quotes[Math.floor(new Date().getDate() % quotes.length)];

  const nextSubtask = activeTask?.subtasks?.find(st => !st.completed);
  const progress = activeTask
    ? (activeTask.subtasks.filter(st => st.completed).length / activeTask.subtasks.length) * 100
    : 0;

  const [cohortMembers, setCohortMembers] = useState(['SL', 'AM', 'JK', 'ER']);
  const [inCohort, setInCohort] = useState(true);
  const [activeCohort, setActiveCohort] = useState('Dev Cohort Alpha');
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);

  const mockCohorts = [
    { name: 'Dev Cohort Alpha', members: 16, focus: 'General SWE' },
    { name: 'Frontend Sprints', members: 8, focus: 'React & UI' },
    { name: 'Algo Grind', members: 24, focus: 'Data Structures' },
    { name: 'System Design Hub', members: 12, focus: 'Architecture' }
  ];

  const [isViewingMomentum, setIsViewingMomentum] = useState(false);

  const contributors = [
    { name: 'Sarah L.', hours: 42.5, rank: 1 },
    { name: 'James K.', hours: 38.2, rank: 2 },
    { name: 'Elena R.', hours: 31.8, rank: 3 },
    { name: 'Alex M.', hours: 29.5, rank: 4 },
    { name: 'You', hours: stats?.totalHours || 0, rank: 5 }
  ].sort((a, b) => b.hours - a.hours);

  const handleJoinCohort = (name) => {
    setActiveCohort(name);
    setInCohort(true);
    setIsJoiningGroup(false);
    // Randomize members for new cohort
    const randomCount = Math.floor(Math.random() * 5) + 3;
    const initials = ['DT', 'KB', 'JW', 'RL', 'SP', 'MY', 'AZ', 'XF'];
    setCohortMembers(initials.slice(0, randomCount));
  };

  return (
    <div className="min-h-full flex flex-col space-y-12 animate-[fade-in_600ms_ease-out] relative">
      <div className="space-y-12">
        <header className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Home</p>
          <h2 className="text-3xl font-serif font-bold text-ink italic">Daily Progress</h2>
        </header>

          <div className="card-scholar py-8 text-center space-y-6 stagger-1">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-ink italic">Ready for a session?</h3>
              <p className="text-muted text-[13px] italic">Simplify your next goal into focused sprints.</p>
            </div>
            <button
              onClick={onStartNew}
              className="btn-ink mx-auto px-12"
            >
              <Plus className="w-5 h-5" />
              <span>Begin Task</span>
            </button>
          </div>

          <section className="space-y-6 stagger-3">
            <header className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Your Cohort</p>
              <button 
                onClick={() => inCohort ? setInCohort(false) : setIsJoiningGroup(true)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95",
                  inCohort ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-ink text-paper"
                )}
              >
                {inCohort ? 'Leave Group' : 'Join Group'}
              </button>
            </header>
            
            {inCohort ? (
              <>
                <button 
                  onClick={() => setIsViewingMomentum(true)}
                  className="w-full card-scholar bg-ink text-paper border-none p-8 flex flex-col gap-6 group overflow-hidden relative shadow-2xl text-left transition-all active:scale-[0.98]"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-110 duration-1000" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/40">Collective Momentum</p>
                      <h4 className="text-2xl font-serif font-bold italic">{activeCohort}</h4>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <p className="text-2xl font-serif font-bold italic">142h</p>
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-paper/40">This Week</p>
                    </div>
                  </div>

                  <div className="relative z-10 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-paper w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" />
                  </div>
                </button>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Active Peers</p>
                    <p className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {Math.ceil(cohortMembers.length * 0.7)} Deep Focusing
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 overflow-hidden">
                      {cohortMembers.map((initials, i) => (
                        <div 
                          key={initials + i} 
                          className={cn(
                            "w-12 h-12 rounded-full border-4 border-paper bg-slate-100 flex items-center justify-center text-[11px] font-bold text-ink shadow-sm relative group",
                            i === 0 && "ring-2 ring-emerald-400 ring-offset-2"
                          )}
                        >
                          {initials}
                          {i === 0 && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-paper" />}
                        </div>
                      ))}
                      {cohortMembers.length > 5 && (
                        <div className="w-12 h-12 rounded-full border-4 border-paper bg-ink text-paper flex items-center justify-center text-[10px] font-bold">
                          +{cohortMembers.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-ink/80 font-medium leading-tight">
                        {cohortMembers[0]} and {cohortMembers.length - 1} others started sessions in the last hour.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-scholar p-10 text-center space-y-4 bg-slate-50 border-dashed">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-muted">
                  <TrendingUp size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg italic text-ink/40">Solo Focus</h4>
                  <p className="text-[11px] text-muted max-w-[180px] mx-auto italic leading-relaxed">
                    Working alone. Join a group for shared momentum.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Momentum Leaderboard Dialog */}
          {isViewingMomentum && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
              <div className="w-full max-w-sm card-scholar p-6 space-y-6 shadow-2xl animate-[slide-up_300ms_var(--ease-out-expo)] max-h-[75vh] flex flex-col">
                <div className="flex justify-between items-start flex-shrink-0">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Momentum</p>
                    <h3 className="text-2xl font-serif font-bold text-ink italic">Top Contributors</h3>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto px-1 flex-1 custom-scrollbar max-h-[50vh]">
                  {contributors.map((c, i) => (
                    <div 
                      key={c.name} 
                      className={cn(
                        "p-4 rounded-xl border flex items-center justify-between transition-all",
                        c.name === 'You' ? "border-ink bg-slate-50 scale-[1.01] shadow-md" : "border-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted w-4">{i + 1}</span>
                        <div>
                          <p className="font-bold text-sm text-ink">{c.name}</p>
                          <p className="text-[10px] text-muted uppercase tracking-widest">{activeCohort}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-serif font-bold text-ink italic">{c.hours.toFixed(1)}h</p>
                        <p className="text-[7px] font-bold uppercase tracking-widest text-muted">Weekly Effort</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsViewingMomentum(false)}
                  className="btn-ink w-full flex-shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Join Group Dialog */}
          {isJoiningGroup && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]">
              <div className="w-full max-w-sm card-scholar p-6 space-y-6 shadow-2xl animate-[slide-up_300ms_var(--ease-out-expo)] max-h-[75vh] flex flex-col">
                <div className="flex justify-between items-start flex-shrink-0">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Discovery</p>
                    <h3 className="text-2xl font-serif font-bold text-ink italic">Join a Cohort</h3>
                  </div>
                </div>

                <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar max-h-[50vh]">
                  {mockCohorts.map((cohort) => (
                    <button
                      key={cohort.name}
                      onClick={() => handleJoinCohort(cohort.name)}
                      className="w-full card-scholar p-4 text-left hover:border-ink transition-all group flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-ink">{cohort.name}</p>
                        <p className="text-[10px] text-muted uppercase tracking-widest">{cohort.focus}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-ink/60">{cohort.members} members</p>
                        <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest">Active</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setIsJoiningGroup(false)}
                  className="btn-ghost w-full flex-shrink-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center py-6 opacity-30 mt-auto">
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-1">StudyProx v4.0.1</p>
        <p className="text-[10px] font-serif italic text-slate-500">"{randomQuote}"</p>
      </div>
    </div>
  );
}
