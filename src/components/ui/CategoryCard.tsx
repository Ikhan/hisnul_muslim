import {
  Moon,
  Sun,
  Home,
  Droplets,
  Utensils,
  Plane,
  Star,
  Users,
  Shield,
  Heart,
  Activity,
  Cloud,
  Smile,
  Compass,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { CategoryInfo } from '../../types/dua';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Moon,
  Sun,
  Home,
  Droplets,
  Utensils,
  Plane,
  Star,
  Users,
  Shield,
  Heart,
  Activity,
  Cloud,
  Smile,
  Compass,
  BookOpen,
};

const colorMap: Record<string, string> = {
  yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
  indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  sky: 'from-sky-500/20 to-sky-600/10 border-sky-500/30',
  amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
  red: 'from-red-500/20 to-red-600/10 border-red-500/30',
  rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30',
  slate: 'from-slate-500/20 to-slate-600/10 border-slate-500/30',
  teal: 'from-teal-500/20 to-teal-600/10 border-teal-500/30',
  violet: 'from-violet-500/20 to-violet-600/10 border-violet-500/30',
  emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
  lime: 'from-lime-500/20 to-lime-600/10 border-lime-500/30',
};

const iconColorMap: Record<string, string> = {
  yellow: 'text-yellow-400',
  indigo: 'text-indigo-400',
  purple: 'text-purple-400',
  blue: 'text-blue-400',
  cyan: 'text-cyan-400',
  orange: 'text-orange-400',
  sky: 'text-sky-400',
  amber: 'text-amber-400',
  pink: 'text-pink-400',
  red: 'text-red-400',
  rose: 'text-rose-400',
  slate: 'text-slate-400',
  teal: 'text-teal-400',
  violet: 'text-violet-400',
  emerald: 'text-emerald-400',
  lime: 'text-lime-400',
};

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || BookOpen;
  const gradient = colorMap[category.color] || colorMap.blue;
  const iconColor = iconColorMap[category.color] || 'text-blue-400';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl bg-gradient-to-br ${gradient} border backdrop-blur-sm
        hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
        text-left group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg bg-dark-100/50 dark:bg-dark-100/50 light:bg-white/50
            flex items-center justify-center ${iconColor}`}
        >
          <Icon size={22} />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {category.count} duas
        </span>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
        {category.label}
      </h3>
    </button>
  );
}
