import { cn } from '../../lib/utils';

export function DeviceFrame({ children }) {
  return (
    <div className="h-screen w-screen bg-slate-100 flex items-center justify-center sm:py-10 selection:bg-ink/5 overflow-hidden">
      {/* Desktop View: Phone Frame */}
      <div className="hidden sm:block relative">
        {/* Physical Buttons Container */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Silent Switch */}
          <div className="absolute left-[-3px] top-[100px] w-[3px] h-[26px] bg-[#1a1a1a] rounded-l-[2px] border-y border-l border-white/10 shadow-sm" />
          {/* Volume Up */}
          <div className="absolute left-[-3px] top-[150px] w-[3px] h-[52px] bg-[#1a1a1a] rounded-l-[2px] border-y border-l border-white/10 shadow-sm" />
          {/* Volume Down */}
          <div className="absolute left-[-3px] top-[215px] w-[3px] h-[52px] bg-[#1a1a1a] rounded-l-[2px] border-y border-l border-white/10 shadow-sm" />
          {/* Power Button */}
          <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-[#1a1a1a] rounded-r-[2px] border-y border-r border-white/10 shadow-sm" />
        </div>

        {/* Main Phone Frame */}
        <div className="relative p-[12px] bg-[#1a1a1a] rounded-[56px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),0_20px_50px_-15px_rgba(0,0,0,0.4)] border-[1px] border-[#333] ring-1 ring-black/50 overflow-visible">
          {/* Subtle Inner Bezel Highlight */}
          <div className="absolute inset-[1px] rounded-[55px] border-[1px] border-white/10 pointer-events-none" />

          {/* Internal Bezel / Screen Housing */}
          <div className="relative w-[393px] h-[852px] bg-paper rounded-[44px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] flex flex-col">
            
            {/* Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[124px] h-[36px] bg-black rounded-[24px] z-[100] flex items-center justify-end px-4">
              <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border-[1px] border-white/5 shadow-inner" />
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-black/20 rounded-full z-[100]" />

            {/* Screen Glare Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[99] bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent" />

            {/* Inner Content (The actual App) */}
            <div className="flex-1 w-full h-full relative overflow-hidden [transform:translateZ(0)]">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View: Full Screen */}
      <div className="sm:hidden w-full h-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
