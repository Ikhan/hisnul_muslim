import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesState {
  favorites: number[];
  addFavorite: (duaNumber: number) => void;
  removeFavorite: (duaNumber: number) => void;
  isFavorite: (duaNumber: number) => boolean;
  toggleFavorite: (duaNumber: number) => void;
}

const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

const STORAGE_KEY = 'dua_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from chrome storage or localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          const result = await chrome.storage.local.get(STORAGE_KEY);
          if (result[STORAGE_KEY] && Array.isArray(result[STORAGE_KEY])) {
            setFavorites(result[STORAGE_KEY] as number[]);
          }
        } else {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setFavorites(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites when they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
          await chrome.storage.local.set({ [STORAGE_KEY]: favorites });
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const addFavorite = (duaNumber: number) => {
    setFavorites((prev) => [...prev, duaNumber]);
  };

  const removeFavorite = (duaNumber: number) => {
    setFavorites((prev) => prev.filter((n) => n !== duaNumber));
  };

  const isFavorite = (duaNumber: number) => {
    return favorites.includes(duaNumber);
  };

  const toggleFavorite = (duaNumber: number) => {
    if (isFavorite(duaNumber)) {
      removeFavorite(duaNumber);
    } else {
      addFavorite(duaNumber);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
