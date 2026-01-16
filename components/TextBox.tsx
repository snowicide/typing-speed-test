'use client';
import { useTypingStore } from '@/store/useTypingStore';
import { useEffect, useRef } from 'react';

export function TextBox() {
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const {
    currentIndex,
    currentText,
    isWrong,
    handleKeyDown,
    setIsFinished,
    isClicked,
    setIsClicked,
    resetTest,
  } = useTypingStore();

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1 && e.key !== 'Enter') return;
      if (e.key === ' ') e.preventDefault();
      handleKeyDown(e.key);
    };
    if (isClicked) window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [handleKeyDown, isClicked]);

  useEffect(() => {
    if (currentIndex > currentText.length && currentText.length > 0)
      setIsFinished(true);
  }, [currentIndex, currentText, setIsFinished]);

  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);

  return (
    <div
      className={`relative overflow-y-auto no-scrollbar ${
        isClicked && 'pb-0 md:pb-30 h-[46vh] md:h-[50vh] lg:h-full'
      }`}
    >
      {/* text */}
      <p
        className={`ml-4 mt-2 text-[32px] md:text-[40px] leading-[136%] tracking-wide ${
          isClicked ? '' : 'blur'
        }`}
      >
        <span className='text-[#4DD67B]'>
          {currentText.slice(0, currentIndex)}
        </span>

        <span
          ref={activeCharRef}
          className={`${
            isWrong
              ? 'text-[#D64D5B] underline'
              : 'text-[#949497] bg-white/20 rounded-md max-h-10'
          }`}
        >
          {currentText[currentIndex]}
        </span>

        <span className='text-[#949497]'>
          {currentText.slice(currentIndex + 1)}
        </span>
      </p>
      {/* button */}
      <div
        className={`absolute inset-0 mx-auto mt-40 md:my-50 lg:my-auto h-fit w-fit text-center font-semibold text-xl ${
          isClicked ? 'hidden' : ''
        }`}
      >
        <button
          onClick={() => setIsClicked(true)}
          className='bg-[#177DFF] px-6 py-4 rounded-xl focus:outline-offset-3 focus:outline-2 focus:outline-solid focus:outline-[#4CA6FF] hover:bg-[#4CA6FF] transition duration-150'
        >
          Start Typing Test
        </button>
        <p className='mt-5'>Or click the text and start typing</p>
      </div>
    </div>
  );
}
