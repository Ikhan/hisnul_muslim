import { useDuas } from '../../hooks/useDuas';
import { CategoryCard } from '../ui/CategoryCard';
import { SearchBar } from '../layout/SearchBar';
import type { CategoryInfo } from '../../types/dua';

interface HomeViewProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchFocus: () => void;
  onCategorySelect: (categoryId: string) => void;
}

export function HomeView({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onCategorySelect,
}: HomeViewProps) {
  const { categoryInfos } = useDuas();

  return (
    <div className="flex flex-col h-full">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        onFocus={onSearchFocus}
        placeholder="Search for a Dua..."
      />

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categories
            </h2>
            <span className="text-xs text-primary font-medium">
              {categoryInfos.length} categories
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categoryInfos.map((category: CategoryInfo) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategorySelect(category.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
