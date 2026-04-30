import React, { useState } from 'react';
import { X, Info, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SocialAnalytics({ stats }) {
  const friends = [
    { name: 'Sarah L.', subject: 'JS', hours: 14.5, breaks: 0 },
    { name: 'Alex M.', subject: 'SWEN', hours: 12.2, breaks: 2 },
    { name: 'James K.', subject: 'REAC', hours: 10.8, breaks: 1 },
    { name: 'You', subject: 'SWEN', hours: stats?.totalHours || 0, breaks: stats?.sessionsAborted || 0 },
    { name: 'Elena R.', subject: 'DATA', hours: 8.4, breaks: 0 },
    { name: 'Marcus T.', subject: 'ALGO', hours: 6.2, breaks: 4 },
  ].sort((a, b) => b.hours - a.hours);

  const [range, setRange] = useState('weekly'); // weekly | monthly
  const [selectedDay, setSelectedDay] = useState(null);
  
  const today = new Date(2026, 3, 29); // April 29, 2026
  const monthName = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthDays = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    isToday: i + 1 === 29,
    isPast: i + 1 < 29
  }));

  const weekDates = [26, 27, 28, 29, 30, 1, 2]; // Sample week around April 29

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
                onClick={() => setSelectedDay({ day: weekDates[i], month: weekDates[i] < 5 && i > 3 ? 'May' : 'April', isMonth: false })}
              >
                <div className="text-center space-y-0.5">
                  <p className="text-[10px] font-bold text-muted group-hover:text-ink">{day}</p>
                  <p className="text-[8px] font-bold text-slate-300">{weekDates[i]}</p>
                </div>
                <div className={cn(
                  "aspect-square rounded-md transition-all duration-500",
                  i === 3 ? "bg-ink scale-110 shadow-lg" : "bg-slate-100 group-hover:bg-slate-200"
                )} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1 animate-[fade-in_400ms_ease-out]">
            {monthDays.map((d) => (
              <div 
                key={d.date} 
                onClick={() => setSelectedDay({ day: d.date, month: 'April', isMonth: true })}
                className={cn(
                  "aspect-square rounded-lg border border-slate-50 relative group flex items-center justify-center transition-all cursor-pointer hover:scale-105 hover:z-10",
                  d.isPast ? (d.date === 4 || d.date === 7 || d.date === 12 ? "bg-ink/40" : d.date % 2 === 0 ? "bg-ink/10" : "bg-slate-50") : "bg-slate-50",
                  d.isToday && "bg-ink ring-2 ring-ink ring-offset-2 scale-90"
                )}
              >
                <span className={cn(
                  "text-[8px] font-bold",
                  d.isToday ? "text-paper" : "text-slate-300 group-hover:text-ink"
                )}>
                  {d.date}
                </span>
                
                {/* Due Date Indicator for future days */}
                {!d.isPast && !d.isToday && (d.date === 17 || d.date === 19 || d.date === 24) && (
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

      {/* Personal Stats Table */}
      <section className="grid grid-cols-3 gap-3 stagger-2">
        <div className="card-scholar p-4 flex flex-col justify-between min-h-[90px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Effort</p>
          <p className="text-xl font-serif font-bold text-ink italic">{stats?.totalHours?.toFixed(1) || '0.0'}h</p>
        </div>
        <div className="card-scholar p-4 flex flex-col justify-between min-h-[90px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Streak</p>
          <p className="text-xl font-serif font-bold text-ink italic">12 Days</p>
        </div>
        <div className={cn(
          "card-scholar p-4 flex flex-col justify-between min-h-[90px] border-2 relative group",
          stats?.sessionsAborted > 0 ? "border-red-100 bg-red-50/50" : "border-slate-100"
        )}>
          <div className="absolute top-2 right-2 text-slate-300 hover:text-ink transition-colors cursor-help">
            <Info size={10} />
            <div className="absolute bottom-full right-0 mb-2 w-32 p-2 bg-ink text-paper text-[8px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
              Recorded each time you cancel an active plan or focus session.
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">Slip Ups</p>
          <p className={cn(
            "text-xl font-serif font-bold italic",
            stats?.sessionsAborted > 0 ? "text-red-600" : "text-ink"
          )}>
            {stats?.sessionsAborted || 0}
          </p>
        </div>
      </section>

      {/* Social Leaderboard */}
      <section className="space-y-4 stagger-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Leaderboard</h3>
        <div className="space-y-3 px-1">
          {friends.map((friend, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex items-center justify-between transition-all hover:border-ink/20 hover:bg-white",
              friend.name === 'You' ? "border-ink bg-slate-50 scale-[1.01] shadow-md" : "border-slate-100"
            )}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted w-4">{i + 1}</span>
                <div>
                  <p className="font-bold text-sm">{friend.name}</p>
                  <p className="text-[10px] text-muted uppercase tracking-widest">{friend.subject}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div className="text-right">
                  <p className="text-lg font-serif font-bold italic">{friend.hours.toFixed(1)}h</p>
                  <p className="text-[7px] font-bold uppercase tracking-widest text-muted">Effort</p>
                </div>
                <div className="text-right min-w-[32px]">
                  <p className={cn(
                    "text-lg font-serif font-bold italic",
                    friend.breaks > 0 ? "text-red-500" : "text-emerald-600"
                  )}>
                    {friend.breaks}
                  </p>
                  <p className={cn(
                    "text-[7px] font-bold uppercase tracking-widest",
                    friend.breaks > 0 ? "text-red-400" : "text-emerald-500"
                  )}>
                    'Slips'
                  </p>
                </div>
              </div>
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
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="w-full max-w-xs card-scholar p-8 space-y-6 shadow-2xl animate-[slide-up_300ms_var(--ease-out-expo)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  {selectedDay.month} {year}
                </p>
                <h3 className="text-2xl font-serif font-bold text-ink italic">
                  {selectedDay.month} {selectedDay.day}, {year}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Study Effort</p>
                <p className="text-xl font-serif font-bold text-ink italic">
                  {selectedDay.day === 29 ? stats?.totalHours?.toFixed(1) || '0.0' : selectedDay.day < 29 ? '3.5' : '0.0'}h
                </p>
              </div>

              {(selectedDay.day === 17 || selectedDay.day === 19 || selectedDay.day === 24) && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-blue-600">Upcoming Due</p>
                  <p className="text-sm font-bold text-blue-900">React Component Audit</p>
                </div>
              )}

              {selectedDay.day === 29 && (
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
