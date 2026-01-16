export interface TypingText {
  id: 'easy' | 'medium' | 'hard';
  text: 'easy' | 'medium' | 'hard';
}

export interface TypingDataType {
  easy: TypingText[];
  medium: TypingText[];
  hard: TypingText[];
}
