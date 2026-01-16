'use client';
import Image from 'next/image';
import logoLarge from '../public/images/logo-large.svg';
import logoSmall from '@/public/images/logo-small.svg';
import personalBestIcon from '../public/icons/icon-personal-best.svg';
import { useTypingStore } from '@/store/useTypingStore';
import { useEffect } from 'react';

export function Header() {
  const _hasHydrated = useTypingStore((state) => state._hasHydrated);
  const { isFinished, currentCpm, setPersonalBest, personalBest } =
    useTypingStore();

  useEffect(() => {
    if (isFinished) setPersonalBest(currentCpm);
  }, [isFinished, currentCpm, personalBest, setPersonalBest]);

  return (
    <header className='relative max-w-322 mx-auto'>
      <div className='flex md:max-w-176 lg:max-w-312 px-4 mt-6  justify-between'>
        <div className='absolute left-10'>
          <Image
            src={logoLarge}
            className='hidden md:inline-block'
            alt='Logo large'
            loading='eager'
          />
          <Image
            src={logoSmall}
            className='inline-block md:hidden'
            alt='Logo large'
            loading='eager'
          />
        </div>
        <div className='absolute right-10 flex items-center'>
          <Image src={personalBestIcon} className='mr-2' alt='Personal best' />
          <p className='hidden md:inline-block'>
            <span className='text-[#949497] text-lg'>Personal best:</span>{' '}
            {_hasHydrated ? `${personalBest} CPM` : '                     '}
          </p>
          <p className='inline-block md:hidden'>
            <span className='text-[#949497] text-lg'>Best:</span>{' '}
            {_hasHydrated ? `${personalBest} CPM` : '                     '}
          </p>
        </div>
      </div>
    </header>
  );
}
