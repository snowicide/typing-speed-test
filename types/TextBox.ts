import { Dispatch, SetStateAction, RefObject } from 'react';

export type TextBoxProps = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setErrorCount: Dispatch<SetStateAction<number>>;
  currentIndexRef: RefObject<number>;
  initialText: string;
};
