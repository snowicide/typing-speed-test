import Image from 'next/image';
import completedIcon from '@/public/icons/icon-completed.svg';
import restartIcon from '@/public/icons/icon-restart.svg';
import newHighScore from '@/public/icons/icon-new-pb.svg';
import { useTypingStore } from '@/store/useTypingStore';

export function Results() {
  const {
    isNewRecord,
    currentCpm,
    accuracy,
    currentIndex,
    errorCount,
    handleRunAgain,
  } = useTypingStore();

  return (
    <div className='flex flex-col -mt-10 md:mt-18 lg:-mt-5 items-center relative min-h-150 w-full overflow-hidden'>
      {/* icon */}
      <div className='pb-0.5 py-1.5'>
        <Image
          src={isNewRecord ? newHighScore : completedIcon}
          className='py-6 relative'
          alt='Completed'
        />
        {isNewRecord ? (
          ''
        ) : (
          <>
            <div className='absolute top-5.75 -translate-x-2 md:top-3.5 md:-translate-x-4.5 bg-[#4DD67B]/20 rounded-full w-20 h-20 md:w-25 md:h-25'></div>
            <div className='absolute top-3.75 -translate-x-4 md:top-0 md:-translate-x-8 bg-[#4DD67B]/10 rounded-full w-24 h-24 md:w-32 md:h-32'></div>
          </>
        )}
      </div>

      {/* title */}
      <div className='flex flex-col gap-1 text-center py-2 mt-0 md:mt-5 tracking-tight'>
        <h1 className='font-bold text-[24px] md:text-[40px]'>
          {isNewRecord ? 'High Score Smashed!' : 'Test Complete!'}
        </h1>
        <p className='text-[#949497] text-[16px] max-w-80 md:max-w-full md:text-xl'>
          {isNewRecord
            ? 'You’re getting faster. That was incredible typing.'
            : 'Solid run. Keep pushing to beat your high score.'}
        </p>
      </div>

      {/* stats */}
      <div className='flex flex-col w-85.75 max-w-full md:w-175.75 lg:w-130 md:flex-row gap-4 md:gap-5 py-2 md:mt-8 lg:mt-2'>
        <div className='flex flex-col gap-1 py-2.75 md:pr- px-5 border border-[#3A3A3A] rounded-lg md:w-55.25 lg:w-40 h-23'>
          <p className='text-[#949497] text-xl'>CPM:</p>
          <p className='text-2xl font-bold'>{currentCpm}</p>
        </div>

        <div className='flex flex-col gap-1 py-2.75 md:pr- px-5 border border-[#3A3A3A] rounded-lg md:w-55.25 lg:w-40 h-23'>
          <p className='text-[#949497] text-xl'>Accuracy:</p>
          <p
            className={`text-2xl font-bold ${
              accuracy < 90
                ? 'text-[#D64D5B]'
                : accuracy < 95
                ? 'text-[#F4DC73]'
                : 'text-[#4DD67B]'
            }`}
          >
            {accuracy}%
          </p>
        </div>

        <div className='flex flex-col gap-1 py-2.75 px-5 border border-[#3A3A3A] rounded-lg md:w-55.25 lg:w-40 h-23'>
          <p className='text-[#949497] text-xl'>Characters:</p>
          <p className='text-2xl font-bold'>
            <span className='text-[#4DD67B]'>{currentIndex}</span>
            <span className='text-[#949497]'>/</span>
            <span className='text-[#D64D5B]'>{errorCount}</span>
          </p>
        </div>
      </div>

      {/* button */}
      <div>
        <button
          onClick={handleRunAgain}
          className='flex gap-2.5 max-w-38.75 px-3.5 py-3.5 mt-8 md:mt-12 bg-white text-[#121212] font-semibold text-xl rounded-xl transition-transform focus:outline-offset-3 focus:outline-2 focus:outline-solid focus:outline-[#4CA6FF] hover:scale-105 active:scale-95'
        >
          Go Again
          <Image
            src={restartIcon}
            className='brightness-0'
            alt='Restart Again'
          />
        </button>
      </div>
    </div>
  );
}
