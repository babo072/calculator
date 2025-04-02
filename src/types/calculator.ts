export type Operation = '+' | '-' | '*' | '/' | '';

export type Theme = 'light' | 'dark' | 'morning' | 'evening' | 'result';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation;
  overwrite: boolean;
}

export type CalculatorAction =
  | { type: 'ADD_DIGIT'; payload: string }
  | { type: 'CHOOSE_OPERATION'; payload: Operation }
  | { type: 'CLEAR' }
  | { type: 'DELETE' }
  | { type: 'EVALUATE' }; 