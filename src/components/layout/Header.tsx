import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="px-4 pt-4 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-dark font-bold text-sm">🤲</span>
          </div>
          <span className="text-gray-900 dark:text-white font-semibold text-lg">Daily Duas</span>
        </div>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-gray-200 dark:bg-dark-100 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-dark-200 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-primary" />
          ) : (
            <Moon size={18} className="text-primary" />
          )}
        </button>
      </div>
    </header>
  );
}
