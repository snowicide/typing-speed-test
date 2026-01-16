'use client';
import Image from 'next/image';
import restartIcon from '@/public/icons/icon-restart.svg';
import { useTypingStore } from '@/store/useTypingStore';

export function RestartButton() {
  const { isClicked } = useTypingStore();
  const { resetTest } = useTypingStore();

  if (!isClicked) return null;

  return (
    <div className='fixed z-50 bottom-0 left-0 right-0 border-t bg-[#121212] border-[#3A3A3A] pt-5'>
      <div className='px-4 pb-5'>
        <button
          onClick={resetTest}
          className='flex gap-2 px-5 h-14 items-center text-[20px] mx-auto bg-[#262626] rounded-xl'
        >
          Restart Test
          <Image src={restartIcon} alt='Restart' />
        </button>
      </div>
    </div>
  );
}
