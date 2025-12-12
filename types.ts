export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  AUTUMN = 'autumn',
  WINTER = 'winter',
}

export interface ThemeConfig {
  background: string; // Tailwind classes (kept for backward compatibility if needed)
  bgImage: string;    // Raw URL for motion components
  accent: string;
  hasSnow: boolean;
  groundColor: string;
}