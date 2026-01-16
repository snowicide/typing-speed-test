'use client';
import Image from 'next/image';
import star1 from '@/public/images/pattern-star-1.svg';
import star2 from '@/public/images/pattern-star-2.svg';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function BackgroundResultsEffects({
  isNewRecord,
}: {
  isNewRecord: boolean;
}) {
  useEffect(() => {
    if (isNewRecord) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.7 },
      });
    }
  }, [isNewRecord]);

  return (
    <div className='fixed inset-0 pointer-events-none z-10 overflow-hidden'>
      {!isNewRecord && (
        <div className='relative w-full h-full max-w-'>
          <Image
            src={star1}
            className='absolute w-10 md:w-18 bottom-10 right-10 md:bottom-25 md:right-10 lg:bottom-50 lg:right-70'
            alt='Star 1'
          />
          <Image
            src={star2}
            className='absolute w-5 md:w-8 bottom-170 left-8 md:bottom-140 md:left-15 lg:left-65 lg:bottom-150'
            alt='Star 2'
          />
        </div>
      )}
    </div>
  );
}
