import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onFocus,
  placeholder = 'Search for a Dua...',
}: SearchBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full bg-gray-100 dark:bg-dark-100 border border-gray-300 dark:border-dark-200 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-dark-300 transition-colors"
        />
      </div>
    </div>
  );
}
