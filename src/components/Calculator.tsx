'use client';

import { useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useTheme } from '../contexts/ThemeContext';
import { Operation } from '../types/calculator';

export function Calculator() {
  const { state, dispatch, getCurrentResult } = useCalculator();
  const { theme, toggleTheme, setThemeByResult } = useTheme();

  useEffect(() => {
    // HTML element에 테마 데이터 속성 설정
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 계산 결과에 따라 테마 변경
  useEffect(() => {
    if (state.overwrite) {
      const currentResult = getCurrentResult();
      setThemeByResult(currentResult);
    }
  }, [state.overwrite, getCurrentResult, setThemeByResult]);

  // 숫자 버튼 클릭 핸들러
  const handleDigit = (digit: string) => {
    dispatch({ type: 'ADD_DIGIT', payload: digit });
  };

  // 연산자 버튼 클릭 핸들러
  const handleOperation = (operation: Operation) => {
    dispatch({ type: 'CHOOSE_OPERATION', payload: operation });
  };

  // 계산 실행 핸들러
  const handleEvaluate = () => {
    dispatch({ type: 'EVALUATE' });
  };

  // Clear 버튼 핸들러
  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };

  // Delete 버튼 핸들러
  const handleDelete = () => {
    dispatch({ type: 'DELETE' });
  };

  // 계산식 문자열 포맷팅
  const getExpression = (): string => {
    if (!state.previousValue) return '';
    return `${state.previousValue} ${state.operation} ${state.currentValue !== '0' ? state.currentValue : ''}`;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">계산기</h2>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none"
            aria-label="테마 변경"
          >
            {theme === 'light' || theme === 'morning' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="calculator-display-container">
          <div className="calculator-expression mb-1 text-right text-sm opacity-70">
            {getExpression()}
          </div>
          <div className="calculator-display">
            {state.currentValue}
          </div>
        </div>

        <div className="calculator-buttons">
          <button 
            className="calculator-button" 
            onClick={handleClear}
          >
            AC
          </button>
          <button 
            className="calculator-button" 
            onClick={handleDelete}
          >
            DEL
          </button>
          <button 
            className="calculator-button operation" 
            onClick={() => handleOperation('/')}
          >
            ÷
          </button>
          <button 
            className="calculator-button operation" 
            onClick={() => handleOperation('*')}
          >
            ×
          </button>

          <button 
            className="calculator-button" 
            onClick={() => handleDigit('7')}
          >
            7
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('8')}
          >
            8
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('9')}
          >
            9
          </button>
          <button 
            className="calculator-button operation" 
            onClick={() => handleOperation('-')}
          >
            -
          </button>

          <button 
            className="calculator-button" 
            onClick={() => handleDigit('4')}
          >
            4
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('5')}
          >
            5
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('6')}
          >
            6
          </button>
          <button 
            className="calculator-button operation" 
            onClick={() => handleOperation('+')}
          >
            +
          </button>

          <button 
            className="calculator-button" 
            onClick={() => handleDigit('1')}
          >
            1
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('2')}
          >
            2
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('3')}
          >
            3
          </button>
          <button 
            className="calculator-button operation" 
            onClick={handleEvaluate}
          >
            =
          </button>

          <button 
            className="calculator-button span-2" 
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <button 
            className="calculator-button" 
            onClick={() => handleDigit('.')}
          >
            .
          </button>
        </div>
        
        <div className="mt-4 text-xs text-center opacity-70">
          <p>테마: {theme === 'morning' ? '아침' : theme === 'evening' ? '저녁' : theme === 'light' ? '라이트' : theme === 'dark' ? '다크' : '특별'}</p>
          <p>결과가 100 이상이면 특별 테마, 0 미만이면 다크 테마로 변경됩니다.</p>
        </div>
      </div>
    </div>
  );
} 