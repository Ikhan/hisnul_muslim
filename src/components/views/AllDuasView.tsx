import { ChevronRight } from 'lucide-react';
import { useDuas } from '../../hooks/useDuas';
import type { DuaCategory } from '../../types/dua';

interface AllDuasViewProps {
  onDuaSelect: (duaId: number) => void;
}

export function AllDuasView({ onDuaSelect }: AllDuasViewProps) {
  const { categories } = useDuas();

  // Group by category
  const groupedCategories = categories.reduce((acc, dua) => {
    const key = dua.categoryLabel;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(dua);
    return acc;
  }, {} as Record<string, DuaCategory[]>);

  const categoryNames = Object.keys(groupedCategories);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">All Duas</h1>
          <span className="text-xs text-primary font-medium">
            {categories.length} topics
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {categoryNames.map((categoryName) => (
          <div key={categoryName}>
            {/* Category Header */}
            <div className="sticky top-0 px-4 py-2 bg-dark-100/80 dark:bg-dark-100/80 bg-gray-100/80 backdrop-blur-sm border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
              <h2 className="text-xs font-semibold text-primary uppercase tracking-wider">
                {categoryName}
              </h2>
            </div>
            {/* Duas in category */}
            <div className="divide-y divide-dark-200/30 dark:divide-dark-200/30 divide-gray-100">
              {groupedCategories[categoryName].map((dua) => (
                <button
                  key={dua.id}
                  onClick={() => onDuaSelect(dua.id)}
                  className="w-full flex items-center justify-between px-4 py-3
                    hover:bg-dark-100/30 dark:hover:bg-dark-100/30 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-primary font-semibold">
                        #{dua.id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {dua.duas.length} dua{dua.duas.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate pr-2">
                      {dua.title}
                    </h3>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
