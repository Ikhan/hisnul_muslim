import { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { CategoryView } from './components/views/CategoryView';
import { DuaDetailView } from './components/views/DuaDetailView';
import { SearchView } from './components/views/SearchView';
import { FavoritesView } from './components/views/FavoritesView';
import { AllDuasView } from './components/views/AllDuasView';
import { SettingsView } from './components/views/SettingsView';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import type { TabType } from './types/dua';

type ViewState =
  | { type: 'home' }
  | { type: 'search' }
  | { type: 'category'; categoryId: string }
  | { type: 'dua'; duaId: number }
  | { type: 'favorites' }
  | { type: 'all' }
  | { type: 'settings' };

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setViewState({ type: 'home' });
    } else if (tab === 'favorites') {
      setViewState({ type: 'favorites' });
    } else if (tab === 'all') {
      setViewState({ type: 'all' });
    } else if (tab === 'profile') {
      setViewState({ type: 'settings' });
    }
  }, []);

  const handleSearchFocus = useCallback(() => {
    setViewState({ type: 'search' });
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setViewState({ type: 'category', categoryId });
  }, []);

  const handleDuaSelect = useCallback((duaId: number) => {
    setViewState({ type: 'dua', duaId });
  }, []);

  const handleBack = useCallback(() => {
    if (viewState.type === 'dua') {
      // Go back to category if we came from there, otherwise to home
      setViewState({ type: 'home' });
    } else if (viewState.type === 'category') {
      setViewState({ type: 'home' });
    } else if (viewState.type === 'search') {
      setViewState({ type: 'home' });
      setSearchQuery('');
    } else {
      setViewState({ type: 'home' });
      setActiveTab('home');
    }
  }, [viewState]);


  const renderView = () => {
    switch (viewState.type) {
      case 'search':
        return (
          <SearchView
            onBack={handleBack}
            onDuaSelect={handleDuaSelect}
          />
        );

      case 'category':
        return (
          <CategoryView
            categoryId={viewState.categoryId}
            onBack={handleBack}
            onDuaSelect={handleDuaSelect}
          />
        );

      case 'dua':
        return (
          <DuaDetailView
            duaGroupId={viewState.duaId}
            onBack={handleBack}
          />
        );

      case 'favorites':
        return <FavoritesView onDuaSelect={handleDuaSelect} />;

      case 'all':
        return <AllDuasView onDuaSelect={handleDuaSelect} />;

      case 'settings':
        return <SettingsView />;

      case 'home':
      default:
        return (
          <HomeView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchFocus={handleSearchFocus}
            onCategorySelect={handleCategorySelect}
          />
        );
    }
  };

  // Determine if we should show header and bottom nav
  const showHeader = ['home', 'favorites', 'all', 'settings'].includes(viewState.type);
  const showBottomNav = ['home', 'favorites', 'all', 'settings'].includes(viewState.type);

  return (
    <div className="w-[380px] h-[600px] flex flex-col bg-white dark:bg-dark overflow-hidden">
      {showHeader && <Header />}

      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
