import { Dispatch, SetStateAction, RefObject } from 'react';

export type RestartButtonProps = {
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  currentIndexRef: RefObject<number | null>;
};
