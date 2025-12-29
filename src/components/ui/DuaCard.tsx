import { Heart, Copy, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Dua, DuaCategory } from '../../types/dua';
import { useFavorites } from '../../context/FavoritesContext';

interface DuaCardProps {
  dua: Dua;
  category: DuaCategory;
  onClick: () => void;
  compact?: boolean;
}

export function DuaCard({ dua, category, onClick, compact = false }: DuaCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);
  const duaNumber = Number(dua.number);
  const favorite = isFavorite(duaNumber);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const textToCopy = `${dua.arabic}\n\n${dua.english}\n\n${dua.reference ? `Reference: ${dua.reference}` : ''}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(duaNumber);
  };

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full p-4 rounded-xl bg-dark-100/50 dark:bg-dark-100/50 bg-white/80
          border border-dark-200/50 dark:border-dark-200/50 border-gray-200
          hover:border-primary/30 transition-all text-left group"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-primary font-semibold">#{dua.number}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {category.categoryLabel}
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {category.title}
            </h4>
          </div>
          <ChevronRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
        </div>
      </button>
    );
  }

  return (
    <div
      className="p-4 rounded-xl bg-dark-100/50 dark:bg-dark-100/50 bg-white/80
        border border-dark-200/50 dark:border-dark-200/50 border-gray-200
        hover:border-primary/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded">
            #{dua.number}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {category.categoryLabel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-dark-200/50 dark:hover:bg-dark-200/50 hover:bg-gray-100 transition-colors"
            title="Copy"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-gray-400" />
            )}
          </button>
          <button
            onClick={handleFavorite}
            className="p-2 rounded-lg hover:bg-dark-200/50 dark:hover:bg-dark-200/50 hover:bg-gray-100 transition-colors"
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={16}
              className={favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <button onClick={onClick} className="w-full text-left">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
          {category.title}
        </h4>

        {dua.arabic && (
          <p className="arabic-text text-lg text-gray-700 dark:text-gray-200 mb-3 line-clamp-2">
            {dua.arabic}
          </p>
        )}

        {dua.english && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {dua.english}
          </p>
        )}

        {dua.reference && (
          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
            <span className="font-medium">Ref:</span> {dua.reference}
          </p>
        )}
      </button>
    </div>
  );
}
