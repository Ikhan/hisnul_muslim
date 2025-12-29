import { Home, Heart, BookOpen, Settings } from 'lucide-react';
import type { TabType } from '../../types/dua';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: Array<{ id: TabType; label: string; icon: typeof Home }> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'all', label: 'All Duas', icon: BookOpen },
  { id: 'profile', label: 'Settings', icon: Settings },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="bg-gray-100 dark:bg-dark-100/80 backdrop-blur-lg border-t border-gray-200 dark:border-dark-200">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon
                size={22}
                className={isActive ? 'fill-primary/20' : ''}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
