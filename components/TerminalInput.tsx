'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  name: string;
  path: string;
  description: string;
}

const COMMANDS: Command[] = [
  { name: 'home', path: '/home', description: 'Home' },
  { name: 'learn', path: '/learn', description: 'Learning hub' },
  { name: 'game', path: '/learn/game', description: 'The Money Game' },
  { name: 'tools', path: '/tools', description: 'Interactive dashboards' },
  { name: 'writing', path: '/writing', description: 'Essays & analysis' },
  { name: 'truvalue', path: '/tools/truvalue', description: 'Real terms dashboard' },
  { name: 'decay', path: '/tools/decay', description: 'Purchasing power' },
  { name: 'saeculum', path: '/tools/saeculum', description: 'Cycle analysis' },
  { name: 'echo', path: '/tools/echo', description: 'Pattern finder' },
  { name: 'the-line', path: '/tools/the-line', description: 'SPX/GOLD regime' },
];

interface TerminalInputProps {
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'lg';
}

export default function TerminalInput({
  autoFocus = false,
  placeholder = '',
  className = '',
  size = 'lg'
}: TerminalInputProps) {
  const textSize = size === 'sm' ? 'text-sm' : 'text-lg';
  const router = useRouter();
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter commands that START with input
  const filteredCommands = input.length > 0
    ? COMMANDS.filter(cmd => cmd.name.toLowerCase().startsWith(input.toLowerCase()))
    : [];

  const showDropdown = isFocused && filteredCommands.length > 0;

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [input]);

  // Auto-focus on mount if enabled
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Global keyboard shortcut handler
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to focus
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // / to focus (only when not already in an input)
      if (e.key === '/' && !isFocused && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFocused]);

  // Handle keyboard navigation within the input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setInput('');
      inputRef.current?.blur();
      return;
    }

    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedCommand = filteredCommands[selectedIndex];
      if (selectedCommand) {
        router.push(selectedCommand.path);
        setInput('');
        inputRef.current?.blur();
      }
    }
  }, [showDropdown, filteredCommands, selectedIndex, router]);

  // Handle click on command
  const handleCommandClick = useCallback((command: Command) => {
    router.push(command.path);
    setInput('');
    inputRef.current?.blur();
  }, [router]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Terminal prompt */}
      <div
        className="flex items-center gap-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className={`font-mono ${textSize} text-emerald-500`}>~/naly</span>
        <span className={`font-mono ${textSize} text-zinc-500`}>$</span>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay blur to allow click on dropdown
              setTimeout(() => {
                if (!containerRef.current?.contains(document.activeElement)) {
                  setIsFocused(false);
                }
              }, 100);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`bg-transparent font-mono ${textSize} text-zinc-100 outline-none w-48 placeholder-zinc-700`}
            aria-label="Terminal navigation"
          />
          {/* Cursor */}
          <span
            className={`font-mono ${textSize} select-none ${
              isFocused ? 'text-amber-500 animate-pulse' : 'text-zinc-600'
            }`}
          >
            ▊
          </span>
        </div>
      </div>

      {/* Autocomplete dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 w-72 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50"
          >
            <ul className="py-1">
              {filteredCommands.map((command, index) => (
                <li key={command.name}>
                  <button
                    onClick={() => handleCommandClick(command)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-2.5 flex items-center justify-between transition-colors ${
                      index === selectedIndex
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="font-mono text-sm">{command.name}</span>
                    <span className={`text-xs ${
                      index === selectedIndex ? 'text-amber-500/70' : 'text-zinc-600'
                    }`}>
                      {command.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
