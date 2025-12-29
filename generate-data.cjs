const fs = require('fs');
const path = require('path');

const duasJsonPath = path.join(__dirname, '..', 'dua', 'data', 'duas_json');
const outputPath = path.join(__dirname, 'src', 'data', 'duas.ts');

const categoryFolders = [
  { folder: 'sleep', label: 'Sleep', icon: 'Moon', color: 'purple' },
  { folder: 'morning_evening', label: 'Morning & Evening', icon: 'Sun', color: 'yellow' },
  { folder: 'salah', label: 'Salah', icon: 'Mosque', color: 'green' },
  { folder: 'home_mosque', label: 'Home & Mosque', icon: 'Home', color: 'blue' },
  { folder: 'clothing_ablution', label: 'Clothing & Ablution', icon: 'Droplets', color: 'cyan' },
  { folder: 'food_drink', label: 'Food & Drink', icon: 'Utensils', color: 'orange' },
  { folder: 'travel', label: 'Travel', icon: 'Plane', color: 'sky' },
  { folder: 'hajj_umrah', label: 'Hajj & Umrah', icon: 'Star', color: 'amber' },
  { folder: 'social', label: 'Social', icon: 'Users', color: 'pink' },
  { folder: 'protection', label: 'Protection', icon: 'Shield', color: 'red' },
  { folder: 'distress_hardship', label: 'Distress & Hardship', icon: 'Heart', color: 'rose' },
  { folder: 'sickness_death', label: 'Sickness & Death', icon: 'Activity', color: 'slate' },
  { folder: 'weather_nature', label: 'Weather & Nature', icon: 'Cloud', color: 'teal' },
  { folder: 'emotional_states', label: 'Emotional States', icon: 'Smile', color: 'violet' },
  { folder: 'guidance_forgiveness', label: 'Guidance & Forgiveness', icon: 'Compass', color: 'emerald' },
  { folder: 'remembrance', label: 'Remembrance', icon: 'BookOpen', color: 'lime' },
];

const allDuas = [];
const categoryInfos = [];

for (const cat of categoryFolders) {
  const categoryPath = path.join(duasJsonPath, cat.folder);

  if (!fs.existsSync(categoryPath)) {
    console.log(`Skipping ${cat.folder} - folder not found`);
    continue;
  }

  const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.json'));
  let categoryDuaCount = 0;

  for (const file of files) {
    const filePath = path.join(categoryPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const duaEntry = {
      ...content,
      category: cat.folder,
      categoryLabel: cat.label,
    };

    allDuas.push(duaEntry);
    categoryDuaCount += content.duas?.length || 0;
  }

  categoryInfos.push({
    id: cat.folder,
    label: cat.label,
    icon: cat.icon,
    count: categoryDuaCount,
    color: cat.color,
  });

  console.log(`Processed ${cat.folder}: ${files.length} files, ${categoryDuaCount} duas`);
}

// Sort by id
allDuas.sort((a, b) => a.id - b.id);

// Generate TypeScript file
const tsContent = `// Auto-generated file - do not edit manually
// Generated on ${new Date().toISOString()}

import type { DuaCategory, CategoryInfo } from '../types/dua';

export const duaCategories: DuaCategory[] = ${JSON.stringify(allDuas, null, 2)};

export const categoryInfos: CategoryInfo[] = ${JSON.stringify(categoryInfos, null, 2)};

export const totalDuas = ${allDuas.reduce((acc, d) => acc + (d.duas?.length || 0), 0)};

export const totalCategories = ${categoryInfos.length};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`\nGenerated ${outputPath}`);
console.log(`Total entries: ${allDuas.length}`);
console.log(`Total duas: ${allDuas.reduce((acc, d) => acc + (d.duas?.length || 0), 0)}`);
