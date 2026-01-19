'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const MIN_YEAR = 1940;
const MAX_YEAR = 2010;

export default function TimeMachineInput({ onSubmit, disabled, currentYear, onReset }) {
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const yearNum = parseInt(year, 10);
    
    if (isNaN(yearNum)) {
      setError('Enter a valid year');
      return;
    }
    
    if (yearNum < MIN_YEAR || yearNum > MAX_YEAR) {
      setError(`Enter a year between ${MIN_YEAR} and ${MAX_YEAR}`);
      return;
    }
    
    setError('');
    onSubmit(yearNum);
  };
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(value);
    setError('');
  };
  
  if (currentYear) {
    return (
      <div className="border border-neutral-800 bg-terminal-surface p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-neutral-500">BIRTH_YEAR:</span>
            <span className="font-mono text-xl text-terminal-accent">{currentYear}</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs text-neutral-400 border border-neutral-700 hover:border-neutral-600 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            RESET
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="border border-neutral-800 bg-terminal-surface p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-terminal-accent">&gt;</span>
            <span className="font-mono text-sm text-neutral-500">BIRTH_YEAR:</span>
            <input
              type="text"
              value={year}
              onChange={handleChange}
              placeholder="1988"
              disabled={disabled}
              className="flex-1 bg-transparent font-mono text-lg text-white placeholder-neutral-600 outline-none border-none"
              autoFocus
            />
          </div>
          {error && (
            <p className="mt-2 font-mono text-xs text-red-400">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={disabled || !year}
          className={`
            px-6 py-2 font-mono text-sm tracking-wider transition-all
            ${disabled || !year
              ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'bg-terminal-accent text-terminal-bg hover:bg-green-400'
            }
          `}
        >
          {disabled ? 'PROCESSING...' : 'EXECUTE'}
        </button>
      </div>
      
      <p className="mt-3 font-mono text-xs text-neutral-600">
        Enter a year between {MIN_YEAR} and {MAX_YEAR}
      </p>
    </form>
  );
}
