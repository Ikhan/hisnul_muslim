import { useMemo } from 'react';
import { duaCategories, categoryInfos } from '../data/duas';
import type { DuaCategory, Dua, FilterType } from '../types/dua';

export function useDuas() {
  return {
    categories: duaCategories,
    categoryInfos,
  };
}

export function useDuasByCategory(categoryId: string | null) {
  return useMemo(() => {
    if (!categoryId) return [];
    return duaCategories.filter((d) => d.category === categoryId);
  }, [categoryId]);
}

export function useDuaById(id: number | null) {
  return useMemo(() => {
    if (id === null) return null;
    return duaCategories.find((d) => d.id === id) || null;
  }, [id]);
}

export function useSearchDuas(query: string, filter: FilterType = 'all') {
  return useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();

    let filteredCategories = duaCategories;

    // Apply category filter
    if (filter !== 'all') {
      const filterMap: Record<FilterType, string[]> = {
        all: [],
        morning: ['morning_evening'],
        evening: ['morning_evening'],
        protection: ['protection'],
        travel: ['travel'],
        sleep: ['sleep'],
        salah: ['salah'],
      };
      const allowedCategories = filterMap[filter];
      if (allowedCategories.length > 0) {
        filteredCategories = duaCategories.filter((d) =>
          allowedCategories.includes(d.category)
        );
      }
    }

    // Search in titles and duas
    const results: Array<{
      category: DuaCategory;
      dua: Dua;
      matchType: 'title' | 'arabic' | 'english';
    }> = [];

    for (const category of filteredCategories) {
      // Check title match
      if (category.title.toLowerCase().includes(searchTerm)) {
        for (const dua of category.duas) {
          results.push({ category, dua, matchType: 'title' });
        }
        continue;
      }

      // Check individual duas
      for (const dua of category.duas) {
        if (
          dua.english.toLowerCase().includes(searchTerm) ||
          dua.arabic.includes(searchTerm)
        ) {
          results.push({
            category,
            dua,
            matchType: dua.english.toLowerCase().includes(searchTerm)
              ? 'english'
              : 'arabic',
          });
        }
      }
    }

    return results;
  }, [query, filter]);
}

export function useRandomDua() {
  return useMemo(() => {
    const allDuas: Array<{ category: DuaCategory; dua: Dua }> = [];

    for (const category of duaCategories) {
      for (const dua of category.duas) {
        if (dua.arabic && dua.english) {
          allDuas.push({ category, dua });
        }
      }
    }

    if (allDuas.length === 0) return null;

    // Use date to get a consistent "dua of the day"
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const index = dayOfYear % allDuas.length;

    return allDuas[index];
  }, []);
}

export function useFavoriteDuas(favoriteNumbers: number[]) {
  return useMemo(() => {
    const results: Array<{ category: DuaCategory; dua: Dua }> = [];

    for (const category of duaCategories) {
      for (const dua of category.duas) {
        if (favoriteNumbers.includes(Number(dua.number))) {
          results.push({ category, dua });
        }
      }
    }

    return results;
  }, [favoriteNumbers]);
}
