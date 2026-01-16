'use client';
import { Header } from '@/components/Header';
import { Stats } from '@/components/Stats';
import { TextBox } from '@/components/TextBox';
import { Results } from '@/components/Results';
import { RestartButton } from '@/components/RestartButton';
import { useTypingStore } from '@/store/useTypingStore';
import { BackgroundResultsEffects } from '@/components/BackgroundResultsEffects';

export default function Home() {
  const { isFinished, isNewRecord, _hasHydrated } = useTypingStore();
  return (
    <>
      <div className={` ${_hasHydrated ? 'animate-focus-in' : 'opacity-0'}`}>
        <Header />

        <main className='max-w-312 px-4 md:px-5 mx-auto mt-20'>
          {isFinished ? (
            <>
              <Results />
            </>
          ) : (
            <>
              <Stats />
              <TextBox />
            </>
          )}
        </main>
      </div>

      {!isFinished && <RestartButton />}
      {isFinished && <BackgroundResultsEffects isNewRecord={isNewRecord} />}
    </>
  );
}
