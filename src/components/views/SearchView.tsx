import { Search, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useSearchDuas } from '../../hooks/useDuas';
import { DuaCard } from '../ui/DuaCard';
import type { FilterType } from '../../types/dua';

interface SearchViewProps {
  onBack: () => void;
  onDuaSelect: (duaId: number) => void;
}

const filterOptions: Array<{ id: FilterType; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'morning', label: 'Morning' },
  { id: 'evening', label: 'Evening' },
  { id: 'salah', label: 'Salah' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'travel', label: 'Travel' },
  { id: 'protection', label: 'Protection' },
];

export function SearchView({ onBack, onDuaSelect }: SearchViewProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const results = useSearchDuas(query, filter);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Search */}
      <div className="px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search duas..."
              autoFocus
              className="w-full bg-dark-100 dark:bg-dark-100 bg-gray-100 border border-dark-200/50 dark:border-dark-200/50 border-gray-200
                rounded-xl py-2.5 pl-10 pr-10 text-sm text-gray-800 dark:text-white
                placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                ${filter === option.id
                  ? 'bg-primary text-dark'
                  : 'bg-dark-100/50 dark:bg-dark-100/50 bg-gray-100 text-gray-500 dark:text-gray-400 hover:text-gray-300'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!query.trim() ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Search size={48} className="text-gray-600 dark:text-gray-500 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Search for duas by keyword, topic, or Arabic text
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              No duas found for "{query}"
            </p>
            <p className="text-gray-600 dark:text-gray-500 text-xs">
              Try different keywords or browse categories
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-primary font-semibold mb-3">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            {results.map(({ category, dua }, index) => (
              <DuaCard
                key={`${category.id}-${dua.number}-${index}`}
                dua={dua}
                category={category}
                onClick={() => onDuaSelect(category.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
