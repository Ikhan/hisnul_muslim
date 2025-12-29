export interface Dua {
  number: number | string;
  arabic: string;
  english: string;
  reference: string;
  note?: string;
  footnote?: string;
}

export interface DuaCategory {
  id: number;
  title: string;
  page: number;
  category: string;
  categoryLabel: string;
  duas: Dua[];
}

export interface CategoryInfo {
  id: string;
  label: string;
  icon: string;
  count: number;
  color: string;
}

export type TabType = 'home' | 'favorites' | 'all' | 'profile';
export type FilterType = 'all' | 'morning' | 'evening' | 'protection' | 'travel' | 'sleep' | 'salah';
