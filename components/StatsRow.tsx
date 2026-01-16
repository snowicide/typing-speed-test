'use client';
import { useCallback } from 'react';
import type { StatsRow } from '../types/Stats';
import { useTypingStore } from '@/store/useTypingStore';

export function StatsRow() {
  const { currentCpm, accuracy, timeCount } = useTypingStore();

  const minutes = Math.floor(timeCount / 60);
  const seconds = timeCount % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const stats: StatsRow[] = [
    { label: 'CPM: ', value: currentCpm },
    { label: 'Accuracy: ', value: `${accuracy}%` },
    { label: 'Time: ', value: timeString },
  ];

  const changeStatsColor = useCallback(() => {
    if (accuracy >= 90) return 'text-[#4DD67B]';
    if (accuracy < 80) return 'text-[#D64D5B]';
    return 'text-[#F4DC73]';
  }, [accuracy]);

  return (
    <div className='flex justify-center md:justify-start gap-0 md:gap-4 items-center text-center'>
      {stats.map(({ label, value }, index) => (
        <p
          key={`${label}-${index}`}
          className={`pr-5 flex-1 whitespace-nowrap md:flex-none flex flex-col md:inline-block items-center justify-center min-w-25 ${
            label === 'Accuracy: ' ? `${changeStatsColor()}` : ''
          } ${
            label !== 'Time: ' &&
            'relative after:mx-2.5 after:absolute after:right-0 md:after:-right-2 after:top-[15%] after:h-[70%] after:w-px after:bg-[#3A3A3A]'
          }`}
        >
          <span className='text-[#949497] text-[16px] md:text-[20px]'>
            {label}
          </span>
          <br className='hidden mid:block 2lg:hidden' />
          <span className='font-bold text-[24px]'>{value}</span>
        </p>
      ))}
    </div>
  );
}
