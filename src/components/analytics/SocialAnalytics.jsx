import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export function SocialAnalytics({ stats }) {
  const friends = [
    { name: 'Sarah L.', subject: 'LAW', hours: 14.5 },
    { name: 'Alex M.', subject: 'STEM', hours: 12.2 },
    { name: 'James K.', subject: 'MATH', hours: 10.8 },
    { name: 'You', subject: 'LAW', hours: stats?.totalHours || 0 },
    { name: 'Elena R.', subject: 'HIST', hours: 8.4 },
    { name: 'Marcus T.', subject: 'ECON', hours: 6.2 },
  ].sort((a, b) => b.hours - a.hours);

  const [range, setRange] = useState('weekly'); // weekly | monthly
  const [selectedDay, setSelectedDay] = useState(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-12 animate-[fade-in_600ms_ease-out]">
      <header className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Insights</p>
        <h2 className="text-3xl font-serif font-bold text-ink italic">Your Stats</h2>
      </header>

      {/* Calendar Activity */}
      <section className="space-y-4 stagger-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Study Activity</h3>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button 
              onClick={() => setRange('weekly')}
              className={cn(
                "px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-md transition-all",
                range === 'weekly' ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              )}
            >
              Week
            </button>
            <button 
              onClick={() => setRange('monthly')}
              className={cn(
                "px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-md transition-all",
                range === 'monthly' ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              )}
            >
              Month
            </button>
          </div>
        </div>

        {range === 'weekly' ? (
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => (
              <div 
                key={i} 
                className="space-y-2 cursor-pointer group"
                onClick={() => setSelectedDay({ day, isMonth: false, index: i })}
              >
                <p className="text-[10px] font-bold text-center text-muted group-hover:text-ink">{day}</p>
                <div className={cn(
                  "aspect-square rounded-md transition-all duration-500",
                  i === 3 ? "bg-ink scale-110 shadow-lg" : "bg-slate-100 group-hover:bg-slate-200"
                )} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1 animate-[fade-in_400ms_ease-out]">
            {monthDays.map((day) => (
              <div 
                key={day} 
                onClick={() => setSelectedDay({ day, isMonth: true })}
                className={cn(
                  "aspect-square rounded-lg border border-slate-50 relative group flex items-center justify-center transition-all cursor-pointer hover:scale-105 hover:z-10",
                  day < 15 ? (day === 4 || day === 7 || day === 12 ? "bg-ink/40" : day % 2 === 0 ? "bg-ink/10" : "bg-slate-50") : "bg-slate-50",
                  day === 15 && "bg-ink ring-2 ring-ink ring-offset-2 scale-90"
                )}
              >
                <span className={cn(
                  "text-[8px] font-bold",
                  day === 15 ? "text-paper" : "text-slate-300 group-hover:text-ink"
                )}>
                  {day}
                </span>
                
                {/* Due Date Indicator for future days */}
                {day > 15 && (day === 17 || day === 19 || day === 24) && (
                  <div className="absolute top-1 right-1 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-ink rounded-full" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Study Session</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Upcoming Due</span>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="space-y-4 stagger-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Leaderboard</h3>
        <div className="space-y-3">
          {friends.map((friend, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex items-center justify-between transition-all hover:border-ink/20 hover:bg-white",
              friend.name === 'You' ? "border-ink bg-slate-50" : "border-slate-100"
            )}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted w-4">{i + 1}</span>
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
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Subject Stats</h3>
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
      {/* Day Detail Modal */}
      {selectedDay && (
        <div 
          className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="w-full max-w-xs card-scholar p-8 space-y-6 shadow-2xl animate-[slide-up_300ms_var(--ease-out-expo)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  {selectedDay.isMonth ? 'April' : 'This Week'}
                </p>
                <h3 className="text-2xl font-serif font-bold text-ink italic">
                  Day {selectedDay.day}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDay(null)}
                className="p-1 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Study Effort</p>
                <p className="text-xl font-serif font-bold text-ink italic">
                  {selectedDay.day === 15 ? stats?.totalHours?.toFixed(1) || '0.0' : selectedDay.day < 15 ? '3.5' : '0.0'}h
                </p>
              </div>

              {(selectedDay.day === 17 || selectedDay.day === 19 || selectedDay.day === 24) && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-blue-600">Upcoming Due</p>
                  <p className="text-sm font-bold text-blue-900">Law & Ethics Review</p>
                </div>
              )}

              {selectedDay.day === 15 && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Active</p>
                  <p className="text-sm font-bold text-emerald-900">Current Study Goal</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setSelectedDay(null)}
              className="btn-ink w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
