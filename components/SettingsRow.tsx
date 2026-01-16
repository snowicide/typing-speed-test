'use client';
import { ListBoxDiffStats } from './ListBoxDiffStats';
import { ListBoxModeStats } from './ListBoxModeStats';
import { useTypingStore } from '@/store/useTypingStore';

export function SettingsRow() {
  const { difficulty, setDifficulty, mode, setMode } = useTypingStore();

  return (
    <div className='flex w-full flex-row justify-between md:justify-start align-center gap-0 md:gap-4'>
      {/* difficulty */}
      <div className='flex flex-1 md:flex-none justify-center gap-4 relative pr-0 md:pr-5 items-center md:after:absolute md:after:right-0 md:after:top-0 md:after:bottom-0 md:after:h-full md:after:w-px md:after:bg-[#3A3A3A]'>
        <p>
          <span className='text-[#949497] hidden md:inline-block'>
            Difficulty:
          </span>
        </p>
        <div className='flex flex-1 md:flex-0 items-center justify-center gap-2'>
          {(['easy', 'medium', 'hard'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              className={`hidden md:inline-block outline rounded-lg px-2.5 py-1.25 focus:outline-offset-3 focus:outline-2 focus:outline-solid focus:outline-[#4CA6FF] hover:outline-[#4CA6FF] hover:text-[#4CA6FF] transition duration-150 capitalize ${
                difficulty === lvl
                  ? 'outline-[#4CA6FF] text-[#4CA6FF]'
                  : 'outline-[#717178]'
              }`}
            >
              {lvl}
            </button>
          ))}
          {/* mobile */}
          <div className='flex flex-1 md:hidden'>
            <ListBoxDiffStats />
          </div>
        </div>
      </div>
      {/* mode */}
      <div className='flex flex-1 md:flex-none gap-4 items-center'>
        <p>
          <span className='text-[#949497] hidden md:inline-block'>Mode:</span>
        </p>
        <div className='flex flex-1 md:flex-none items-center justify-center gap-2'>
          {(['timed', 'passage'] as const).map((timeMode) => (
            <button
              onClick={() => setMode(timeMode)}
              key={timeMode}
              className={`hidden whitespace-nowrap md:inline-block outline focus:outline-offset-3 focus:outline-2 focus:outline-solid focus:outline-[#4CA6FF] rounded-lg px-2.5 w-fit h-fit py-1.25 hover:outline-[#4CA6FF] hover:text-[#4CA6FF] transition duration-150 capitalize ${
                mode === timeMode
                  ? 'outline-[#4CA6FF] text-[#4CA6FF]'
                  : 'outline-[#717178]'
              }`}
            >
              {timeMode === 'timed' ? `${timeMode} (60s)` : `${timeMode}`}
            </button>
          ))}
          {/* mobile */}
          <div className='flex-1 w-full md:hidden'>
            <ListBoxModeStats />
          </div>
        </div>
      </div>
    </div>
  );
}
