import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useFavoriteDuas } from '../../hooks/useDuas';
import { DuaCard } from '../ui/DuaCard';

interface FavoritesViewProps {
  onDuaSelect: (duaId: number) => void;
}

export function FavoritesView({ onDuaSelect }: FavoritesViewProps) {
  const { favorites } = useFavorites();
  const favoriteDuas = useFavoriteDuas(favorites);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Favorites</h1>
          {favorites.length > 0 && (
            <span className="text-xs text-primary font-medium">
              {favorites.length} saved
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {favoriteDuas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-dark-100/50 dark:bg-dark-100/50 bg-gray-100 flex items-center justify-center mb-4">
              <Heart size={32} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No favorites yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px]">
              Tap the heart icon on any dua to save it here for quick access
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteDuas.map(({ category, dua }, index) => (
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
