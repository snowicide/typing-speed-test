import { Dispatch, SetStateAction } from 'react';
import { TypingDataType } from '@/types/Page';

export type StatsRow = {
  label: string;
  value: string | number;
};

export type StatsProps = {
  currentIndex: number;
  errorCount: number;
  difficulty: keyof TypingDataType | 'timed' | 'passage';
  setDifficulty: Dispatch<SetStateAction<keyof TypingDataType>>;
};
