import React, { useState } from 'react';
import { X, Info, FileText, Check, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SocialAnalytics({ stats, sessionHistory = [] }) {
  const friends = [
    { name: 'Sarah L.', subject: 'JS', hours: 14.5, breaks: 0 },
    { name: 'Alex M.', subject: 'SWEN', hours: 12.2, breaks: 2 },
    { name: 'James K.', subject: 'REAC', hours: 10.8, breaks: 1 },
    { name: 'You', subject: 'SWEN', hours: stats?.totalHours || 0, breaks: stats?.sessionsAborted || 0 },
    { name: 'Elena R.', subject: 'DATA', hours: 8.4, breaks: 0 },
    { name: 'Marcus T.', subject: 'ALGO', hours: 6.2, breaks: 4 },
  ].sort((a, b) => b.hours - a.hours);

  const [range, setRange] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const getSessionsForDay = (dayObj) => {
    if (!dayObj || !stats?.sessionHistory) return [];
    return stats.sessionHistory.filter(session => {
      const date = new Date(session.timestamp);
      const dayMatches = date.getDate() === dayObj.day;
      const monthMatches = date.toLocaleString('default', { month: 'long' }) === dayObj.month;
      const yearMatches = date.getFullYear() === 2026; // Hardcoded year for consistency with mock data
      return dayMatches && monthMatches && yearMatches;
    });
  };

  const daySessions = getSessionsForDay(selectedDay);
  
  const today = new Date(2026, 3, 29);
  const monthDays = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    isToday: i + 1 === 29,
    isPast: i + 1 < 29
  }));

  const weekDates = [26, 27, 28, 29, 30, 1, 2]; // Sample week around April 29
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const year = 2026;

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
                  i === 3 ? "bg-ink scale-110 shadow-lg" : "bg-slate-100 group-hover:bg-slate-200",
                  selectedDay?.day === weekDates[i] && selectedDay?.month === (weekDates[i] < 5 && i > 3 ? 'May' : 'April') && "ring-2 ring-ink ring-offset-1"
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
                  d.isToday && "bg-ink ring-2 ring-ink ring-offset-2 scale-90",
                  selectedDay?.day === d.date && selectedDay?.month === 'April' && "ring-2 ring-ink ring-offset-1"
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
        <div className="card-scholar p-4 flex flex-col justify-between min-h-[90px] relative group border-slate-100">
          <div className="absolute top-2 right-2 text-slate-300 hover:text-ink transition-colors cursor-help">
            <Info size={10} />
            <div className="absolute bottom-full left-0 mb-2 w-24 p-2 bg-ink text-paper text-[8px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
              Weekly cumulative focus hours.
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Effort</p>
          <p className="text-xl font-serif font-bold text-ink italic">{stats?.totalHours?.toFixed(1) || '0.0'}h</p>
        </div>
        <div className="card-scholar p-4 flex flex-col justify-between min-h-[90px] relative group border-slate-100">
          <div className="absolute top-2 right-2 text-slate-300 hover:text-ink transition-colors cursor-help">
            <Info size={10} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-ink text-paper text-[8px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
              Consecutive study days.
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Streak</p>
          <p className="text-xl font-serif font-bold text-ink italic">12 Days</p>
        </div>
        <div className="card-scholar p-4 flex flex-col justify-between min-h-[90px] relative group border-slate-100">
          <div className="absolute top-2 right-2 text-slate-300 hover:text-ink transition-colors cursor-help">
            <Info size={10} />
            <div className="absolute bottom-full right-0 mb-2 w-24 p-2 bg-ink text-paper text-[8px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
              Sessions aborted or cancelled.
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Slip Ups</p>
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
                    Slips
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
      {/* Academic Log History */}
      <section className="space-y-6 stagger-4 pb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Academic Log</h3>
          <p className="text-[9px] font-bold uppercase tracking-widest text-ink/20">Last 50 sessions</p>
        </div>
        <div className="space-y-3">
          {(stats?.sessionHistory || []).length === 0 ? (
            <div className="py-12 text-center space-y-2 border-2 border-dashed border-slate-100 rounded-2xl">
              <FileText className="w-8 h-8 text-slate-200 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">No history recorded yet</p>
            </div>
          ) : (
            stats.sessionHistory.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="w-full card-scholar p-4 flex items-center justify-between group hover:border-ink/20 text-left transition-all"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    session.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {session.status === 'completed' ? <Check size={16} /> : <XCircle size={16} />}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-muted">{session.subject}</p>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <p className={cn(
                        "text-[8px] font-bold uppercase tracking-widest",
                        session.status === 'completed' ? "text-emerald-600" : "text-red-500"
                      )}>
                        {session.status}
                      </p>
                    </div>
                    <h4 className="font-serif font-bold text-base text-ink italic leading-tight truncate">{session.title}</h4>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-ink leading-none">{session.durationMins}m</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-muted mt-1">Focus</p>
                </div>
              </button>
            ))
          )}
        </div>
      </section>
      {/* Session Detail Modal */}
      {selectedSession && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setSelectedSession(null)}
        >
          <div 
            className="w-full max-w-sm dialog-scholar space-y-6 animate-[scale-in_300ms_var(--ease-out-expo)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">{selectedSession.subject}</p>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
                  selectedSession.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                  {selectedSession.status}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-ink italic leading-tight">
                {selectedSession.title}
              </h3>
              <p className="text-[10px] text-muted">
                {new Date(selectedSession.timestamp).toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted mb-0.5">Time Focused</p>
                <p className="text-lg font-serif font-bold text-ink italic">{selectedSession.durationMins}m</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted mb-0.5">Execution</p>
                <p className="text-lg font-serif font-bold text-ink italic">{selectedSession.subtasks?.length || 0} Stages</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Project Blueprint</p>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
                {selectedSession.subtasks?.map((st, i) => (
                  <div key={st.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg">
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px]",
                      st.completed ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {st.completed ? <Check size={10} /> : i + 1}
                    </div>
                    <p className={cn(
                      "text-xs font-serif italic leading-tight",
                      st.completed ? "text-ink" : "text-muted line-through opacity-50"
                    )}>
                      {st.text}
                    </p>
                  </div>
                ))}
                {(!selectedSession.subtasks || selectedSession.subtasks.length === 0) && (
                  <p className="text-xs text-muted italic">No specific stages recorded for this project.</p>
                )}
              </div>
            </div>

            <button 
              onClick={() => setSelectedSession(null)}
              className="btn-ink w-full py-4 text-sm"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
      {/* Day Detail Modal */}
      {selectedDay && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-paper/60 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="w-full max-w-sm dialog-scholar space-y-6 animate-[scale-in_300ms_var(--ease-out-expo)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Daily Summary</p>
              <h3 className="text-2xl font-serif font-bold text-ink italic leading-tight">
                {selectedDay.month} {selectedDay.day}, 2026
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Sessions</p>
                <p className="text-[10px] font-bold text-ink">{daySessions.length} recorded</p>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {daySessions.length > 0 ? (
                  daySessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[8px] font-bold uppercase tracking-widest text-muted">{session.subject}</p>
                          <span className={cn(
                            "w-1 h-1 rounded-full",
                            session.status === 'completed' ? "bg-emerald-500" : "bg-red-500"
                          )} />
                        </div>
                        <p className="font-serif font-bold text-ink italic">{session.title}</p>
                      </div>
                      <p className="text-sm font-bold text-ink italic">{session.durationMins}m</p>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs text-muted italic">No study sessions found for this day.</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setSelectedDay(null)}
              className="btn-ink w-full py-4 text-sm"
            >
              Back to Insights
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
