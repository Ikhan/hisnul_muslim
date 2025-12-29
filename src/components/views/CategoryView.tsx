import { ChevronLeft } from 'lucide-react';
import { useDuasByCategory, useDuas } from '../../hooks/useDuas';
import { DuaCard } from '../ui/DuaCard';
import type { CategoryInfo } from '../../types/dua';

interface CategoryViewProps {
  categoryId: string;
  onBack: () => void;
  onDuaSelect: (duaId: number) => void;
}

export function CategoryView({ categoryId, onBack, onDuaSelect }: CategoryViewProps) {
  const duaGroups = useDuasByCategory(categoryId);
  const { categoryInfos } = useDuas();
  const categoryInfo = categoryInfos.find((c: CategoryInfo) => c.id === categoryId);

  // Flatten all duas from groups
  const allDuas = duaGroups.flatMap((group) =>
    group.duas.map((dua) => ({ dua, category: group }))
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={22} className="text-gray-400" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {categoryInfo?.label || 'Category'}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {allDuas.length} duas
          </p>
        </div>
      </div>

      {/* Duas List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {allDuas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No duas found in this category</p>
          </div>
        ) : (
          allDuas.map(({ dua, category }, index) => (
            <DuaCard
              key={`${category.id}-${dua.number}-${index}`}
              dua={dua}
              category={category}
              onClick={() => onDuaSelect(category.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
