import React from 'react';
import { cn } from '../../lib/utils';

export function SocialAnalytics({ stats }) {
  const friends = [
    { name: 'Sarah L.', subject: 'LAW', hours: 14.5, rank: 1 },
    { name: 'Alex M.', subject: 'STEM', hours: 12.2, rank: 2 },
    { name: 'James K.', subject: 'MATH', hours: 10.8, rank: 3 },
    { name: 'You', subject: 'LAW', hours: stats?.totalHours || 0, rank: 4 },
    { name: 'Elena R.', subject: 'HIST', hours: 8.4, rank: 5 },
    { name: 'Marcus T.', subject: 'ECON', hours: 6.2, rank: 6 },
  ];

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
      <header className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Study Analytics</p>
        <h2 className="text-3xl font-serif font-bold text-ink italic">Progress & Peer Comparison</h2>
      </header>

      {/* Calendar Activity */}
      <section className="space-y-4 stagger-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Weekly Activity</h3>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div key={i} className="space-y-2">
              <p className="text-[10px] font-bold text-center text-muted">{day}</p>
              <div className={cn(
                "aspect-square rounded-md transition-all duration-500",
                i === 3 ? "bg-ink scale-110 shadow-lg" : "bg-slate-100" // Mocking today
              )} />
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="space-y-4 stagger-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Friends Leaderboard</h3>
        <div className="space-y-3">
          {friends.map((friend, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex items-center justify-between transition-all hover:border-ink/20 hover:bg-white",
              friend.name === 'You' ? "border-ink bg-slate-50" : "border-slate-100"
            )}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted w-4">{friend.rank}</span>
                <div>
                  <p className="font-bold text-sm">{friend.name}</p>
                  <p className="text-[10px] text-muted uppercase tracking-widest">{friend.subject}</p>
                </div>
              </div>
              <p className="font-serif font-bold text-lg italic">{friend.hours.toFixed(1)}h</p>
            </div>
          ))}
        </div>
      </section>

      {/* Per-Subject Charts */}
      <section className="space-y-6 stagger-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Subject Efficiency</h3>
        <div className="space-y-4">
          {Object.entries(stats?.subjectBreakdown || {}).map(([subject, hours]) => (
            <div key={subject} className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>{subject}</span>
                <span>{hours.toFixed(1)}h</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-ink transition-all duration-1000 ease-out-expo"
                  style={{ width: `${Math.min((hours / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
