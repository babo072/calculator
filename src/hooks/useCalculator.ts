'use client';

import { useReducer } from 'react';
import { CalculatorState, CalculatorAction, Operation } from '../types/calculator';

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: '',
  overwrite: false,
};

function evaluate({ currentValue, previousValue, operation }: CalculatorState): string {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  
  if (isNaN(prev) || isNaN(current)) return '0';
  
  let result = 0;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) return 'Error';
      result = prev / current;
      break;
    default:
      return '0';
  }
  
  return result.toString();
}

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'ADD_DIGIT':
      if (state.overwrite) {
        return {
          ...state,
          currentValue: action.payload,
          overwrite: false,
        };
      }
      
      if (action.payload === '0' && state.currentValue === '0') {
        return state;
      }
      
      if (action.payload === '.' && state.currentValue.includes('.')) {
        return state;
      }
      
      return {
        ...state,
        currentValue: 
          state.currentValue === '0' && action.payload !== '.'
            ? action.payload
            : `${state.currentValue}${action.payload}`,
      };
      
    case 'CHOOSE_OPERATION':
      if (state.currentValue === '0' && state.previousValue === '') {
        return state;
      }
      
      if (state.previousValue === '') {
        return {
          ...state,
          operation: action.payload,
          previousValue: state.currentValue,
          currentValue: '0',
        };
      }
      
      if (state.currentValue === '0') {
        return {
          ...state,
          operation: action.payload,
        };
      }
      
      return {
        ...state,
        previousValue: evaluate(state),
        operation: action.payload,
        currentValue: '0',
      };
      
    case 'CLEAR':
      return initialState;
      
    case 'DELETE':
      if (state.overwrite) {
        return {
          ...state,
          currentValue: '0',
          overwrite: false,
        };
      }
      
      if (state.currentValue.length === 1) {
        return {
          ...state,
          currentValue: '0',
        };
      }
      
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
      
    case 'EVALUATE':
      if (
        state.operation === '' ||
        state.currentValue === '0' ||
        state.previousValue === ''
      ) {
        return state;
      }
      
      return {
        ...state,
        currentValue: evaluate(state),
        previousValue: '',
        operation: '',
        overwrite: true,
      };
      
    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  const getCurrentResult = (): number => {
    if (state.currentValue === 'Error') return 0;
    return parseFloat(state.currentValue);
  };
  
  return {
    state,
    dispatch,
    getCurrentResult,
  };
} 