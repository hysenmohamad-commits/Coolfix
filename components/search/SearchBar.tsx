import React from 'react';
import { Search, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSearchQuery('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchQuery]);

  return (
    <div className="relative w-full">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-500" />
      </div>

      <input
        ref={inputRef}
        type="text"
        inputMode="search"
        enterKeyHint="search"
        className="block w-full pl-11 pr-12 py-3.5 md:py-4 border border-slate-700 bg-slate-900 rounded-xl text-base md:text-lg leading-5 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white shadow-lg"
        placeholder="Code d'erreur... (ex. CH10, 5E, E6)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      {/* Clear button */}
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
          onClick={() => {
            setSearchQuery('');
            inputRef.current?.focus();
          }}
        >
          <X className="h-5 w-5 text-slate-500 hover:text-white transition-colors" />
        </button>
      )}
    </div>
  );
}
