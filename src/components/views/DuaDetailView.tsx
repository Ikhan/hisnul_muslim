import { ChevronLeft, Heart, Copy, Check, Share2, Play, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useDuaById } from '../../hooks/useDuas';
import { useFavorites } from '../../context/FavoritesContext';

interface DuaDetailViewProps {
  duaGroupId: number;
  onBack: () => void;
}

export function DuaDetailView({ duaGroupId, onBack }: DuaDetailViewProps) {
  const duaGroup = useDuaById(duaGroupId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);

  if (!duaGroup) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Dua not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-primary text-dark rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentDua = duaGroup.duas[currentDuaIndex];
  const hasMultipleDuas = duaGroup.duas.length > 1;
  const duaNumber = Number(currentDua?.number || 0);
  const favorite = isFavorite(duaNumber);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyAll = async () => {
    if (!currentDua) return;
    const textToCopy = `${currentDua.arabic}\n\n${currentDua.english}\n\n${currentDua.reference ? `Reference: ${currentDua.reference}` : ''}`;
    await handleCopy(textToCopy, -1);
  };

  const handleShare = async () => {
    if (!currentDua) return;
    const shareText = `${duaGroup.title}\n\n${currentDua.arabic}\n\n${currentDua.english}\n\nFrom Hisnul Muslim - Daily Duas App`;
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await handleCopy(shareText, -1);
    }
  };

  const handleFavorite = () => {
    toggleFavorite(duaNumber);
  };

  const nextDua = () => {
    if (currentDuaIndex < duaGroup.duas.length - 1) {
      setCurrentDuaIndex(currentDuaIndex + 1);
    }
  };

  const prevDua = () => {
    if (currentDuaIndex > 0) {
      setCurrentDuaIndex(currentDuaIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-gray-400" />
          </button>
          <span className="text-sm font-medium text-primary">#{currentDua?.number || duaGroup.id}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyAll}
            className="p-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
            title="Copy"
          >
            {copiedIndex === -1 ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <Copy size={18} className="text-gray-400" />
            )}
          </button>
          <button
            onClick={handleFavorite}
            className="p-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={18}
              className={favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-100/50 hover:bg-gray-100 transition-colors"
            title="Share"
          >
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {duaGroup.title}
        </h1>

        {hasMultipleDuas && (
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              onClick={prevDua}
              disabled={currentDuaIndex === 0}
              className="p-2 rounded-lg bg-dark-100/50 dark:bg-dark-100/50 bg-gray-100 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} className="text-gray-400" />
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentDuaIndex + 1} of {duaGroup.duas.length}
            </span>
            <button
              onClick={nextDua}
              disabled={currentDuaIndex === duaGroup.duas.length - 1}
              className="p-2 rounded-lg bg-dark-100/50 dark:bg-dark-100/50 bg-gray-100 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        )}

        {currentDua && (
          <div className="space-y-4">
            {/* Arabic Text */}
            {currentDua.arabic && (
              <div className="p-4 rounded-xl bg-dark-100/50 dark:bg-dark-100/50 bg-gray-50 border border-dark-200/50 dark:border-dark-200/50 border-gray-200">
                <p className="arabic-text text-xl text-gray-800 dark:text-white leading-loose">
                  {currentDua.arabic}
                </p>
                {/* Audio placeholder */}
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
                  <Play size={16} />
                  <span>Play Audio (Coming Soon)</span>
                </button>
              </div>
            )}

            {/* English Translation */}
            {currentDua.english && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Translation
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentDua.english}
                </p>
              </div>
            )}

            {/* Note */}
            {currentDua.note && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Note
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  {currentDua.note}
                </p>
              </div>
            )}

            {/* Footnote */}
            {currentDua.footnote && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Footnote
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentDua.footnote}
                </p>
              </div>
            )}

            {/* Reference */}
            {currentDua.reference && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Reference
                </p>
                <p className="text-sm text-primary font-medium">
                  {currentDua.reference}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
