import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TypingDataType } from '@/types/Page';
import rawData from '@/data.json';

const data = rawData as TypingDataType;

interface TypingState {
  currentIndex: number;
  errorCount: number;
  timeCount: number;
  isStarted: boolean;
  isWrong: boolean;
  difficulty: keyof TypingDataType;
  currentText: string;
  isFinished: boolean;
  isClicked: boolean;
  mode: 'timed' | 'passage';
  currentCpm: number;
  accuracy: number;
  personalBest: number;
  timerId: NodeJS.Timeout | null;
  isNewRecord: boolean;
  _hasHydrated: boolean;

  setCurrentIndex: (index: number) => void;
  incrementError: () => void;
  setTimeCount: () => void;
  setIsStarted: (value: boolean) => void;
  setIsWrong: (value: boolean) => void;
  setDifficulty: (diff: keyof TypingDataType) => void;
  resetTest: () => void;
  setIsFinished: (isFinished: boolean) => void;
  setIsClicked: (isClicked: boolean) => void;
  setMode: (mode: 'timed' | 'passage') => void;
  startTimer: () => void;
  stopTimer: () => void;
  handleKeyDown: (key: string) => void;
  handleRunAgain: () => void;
  calculateStats: () => void;
  setPersonalBest: (value: number) => void;
  calculateCpm: () => void;
  setIsNewRecord: (value: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      currentIndex: 0,
      errorCount: 0,
      timeCount: 0,
      isStarted: false,
      isWrong: false,
      difficulty: 'hard',
      currentText: '',
      isFinished: false,
      isClicked: false,
      mode: 'passage',
      personalBest: 0,
      currentCpm: 0,
      timerId: null,
      accuracy: 100,
      isNewRecord: false,
      _hasHydrated: false,

      setCurrentIndex: (index) => set({ currentIndex: index }),

      incrementError: () =>
        set((state) => ({ errorCount: state.errorCount + 1 })),

      setTimeCount: () => {
        const state = get();
        const newTime = state.timeCount + 1;
        const timeInMinutes = newTime / 60;
        const newCpm =
          newTime > 0 ? Math.round(state.currentIndex / timeInMinutes) : 0;

        const totalChars = state.currentIndex + state.errorCount;
        const newAccuracy =
          totalChars > 0
            ? Math.round((state.currentIndex / totalChars) * 100)
            : 100;

        const shouldStop = newTime >= 60 && state.mode === 'timed';

        if (shouldStop) {
          const { setPersonalBest } = get();
          if (newCpm > state.personalBest && state.personalBest)
            setPersonalBest(newCpm);

          set({
            timeCount: newTime,
            currentCpm: newCpm,
            accuracy: newAccuracy,
            isStarted: false,
            isFinished: true,
          });

          if (state.timerId) {
            clearInterval(state.timerId);
            set({ timerId: null });
          }
        } else {
          set({
            timeCount: newTime,
            currentCpm: newCpm,
            accuracy: newAccuracy,
          });
        }
      },

      setIsStarted: (value) => set({ isStarted: value }),

      setIsWrong: (value) => set({ isWrong: value }),

      setDifficulty: (diff) => {
        const { stopTimer } = get();
        const texts = data[diff];
        const randomText = texts[Math.floor(Math.random() * texts.length)].text;
        stopTimer();
        set({
          difficulty: diff,
          currentText: randomText,
          currentIndex: 0,
          errorCount: 0,
          timeCount: 0,
          isStarted: false,
          isWrong: false,
          currentCpm: 0,
          accuracy: 100,
        });
      },

      resetTest: () => {
        const { difficulty, stopTimer } = get();
        const texts = data[difficulty];
        const randomText = texts[Math.floor(Math.random() * texts.length)].text;
        stopTimer();
        set({
          currentIndex: 0,
          errorCount: 0,
          timeCount: 0,
          isStarted: false,
          isWrong: false,
          currentCpm: 0,
          accuracy: 100,
          currentText: randomText,
        });
      },

      setIsFinished: (isFinished) => {
        const { setIsNewRecord } = get();
        setIsNewRecord(false);
        set({
          isFinished,
          currentIndex: 0,
          errorCount: 0,
          timeCount: 0,
          isStarted: false,
          isWrong: false,
        });
      },

      setIsClicked: (isClicked) => set({ isClicked, currentIndex: 0 }),

      setMode: (mode) => {
        const { difficulty, stopTimer } = get();
        const texts = data[difficulty];
        const randomText = texts[Math.floor(Math.random() * texts.length)].text;
        stopTimer();
        set({
          mode,
          currentText: randomText,
          currentIndex: 0,
          errorCount: 0,
          timeCount: 0,
          isStarted: false,
          isWrong: false,
          currentCpm: 0,
          accuracy: 100,
        });
      },

      setPersonalBest: (value) => {
        const { personalBest, setIsNewRecord } = get();

        if (value > personalBest) {
          if (personalBest) {
            setIsNewRecord(true);
          }
          set({ personalBest: value });
        }
      },

      calculateCpm: () => {
        const state = get();
        if (state.timeCount === 0) {
          set({ currentCpm: 0 });
          return;
        }

        const timeInMinutes = state.timeCount / 60;
        const cpm = Math.round(state.currentIndex / timeInMinutes);
        set({ currentCpm: cpm });
      },

      startTimer: () => {
        const state = get();
        if (state.isStarted || state.timerId) return;
        set({ isStarted: true });
        const intervalId = setInterval(() => {
          get().setTimeCount();
        }, 1000);
        set({ timerId: intervalId });
      },

      stopTimer: () => {
        const { timerId } = get();
        if (timerId) {
          clearInterval(timerId);
          set({ timerId: null, isStarted: false });
        }
      },

      handleKeyDown: (key: string) => {
        const state = get();
        const currentChar = state.currentText[state.currentIndex];
        if (!currentChar) return;
        if (!state.isStarted && !state.isFinished) state.startTimer();

        if (key === currentChar) {
          const newIndex = state.currentIndex + 1;

          set({
            currentIndex: newIndex,
            isWrong: false,
          });
          if (newIndex >= state.currentText.length) {
            state.stopTimer();
            set({ isFinished: true });
          }
        } else {
          set((prev) => ({
            errorCount: prev.errorCount + 1,
            isWrong: true,
          }));
        }
        state.calculateStats();
      },

      calculateStats: () => {
        const state = get();
        const timeInMinutes = state.timeCount / 60;
        const cpm =
          state.timeCount > 0
            ? Math.round(state.currentIndex / timeInMinutes)
            : 0;

        const totalChars = state.currentIndex + state.errorCount;
        const accuracy =
          totalChars > 0
            ? Math.round((state.currentIndex / totalChars) * 100)
            : 100;
        set({ currentCpm: cpm, accuracy });
      },

      setIsNewRecord: (value) => set({ isNewRecord: value }),

      handleRunAgain: () => {
        const { difficulty } = get();
        const texts = data[difficulty];
        const randomText = texts[Math.floor(Math.random() * texts.length)].text;
        set({
          currentIndex: 0,
          errorCount: 0,
          timeCount: 0,
          isStarted: false,
          currentText: randomText,
          isFinished: false,
          currentCpm: 0,
          accuracy: 100,
        });
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'typing-app-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ personalBest: state.personalBest }),
    }
  )
);
