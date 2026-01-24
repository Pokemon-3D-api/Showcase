import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface GameSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export function GameSelect({ label, value, options, onChange }: GameSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="game-select" ref={containerRef}>
      <span className="game-select__label">{label}</span>
      <button
        type="button"
        className={`game-select__trigger ${isOpen ? 'game-select__trigger--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="game-select__value">{selectedOption?.label || 'Select...'}</span>
        <svg className="game-select__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="game-select__dropdown">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`game-select__option ${option.value === value ? 'game-select__option--selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.value === value && (
                <span className="game-select__check">&#9658;</span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
