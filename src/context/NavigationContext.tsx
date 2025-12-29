import { createContext, useContext, useState, ReactNode } from 'react';
import type { TabType, FilterType } from '../types/dua';

interface NavigationState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedDuaId: number | null;
  setSelectedDuaId: (id: number | null) => void;
}

const NavigationContext = createContext<NavigationState | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDuaId, setSelectedDuaId] = useState<number | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDuaId,
        setSelectedDuaId,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
