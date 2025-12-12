import { Season, ThemeConfig } from '../types';

export const getSeason = (): Season => {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return Season.SPRING;
  if (month >= 6 && month <= 8) return Season.SUMMER;
  if (month >= 9 && month <= 11) return Season.AUTUMN;
  return Season.WINTER;
};

export const getThemeForSeason = (season: Season): ThemeConfig => {
  // Common background styles for fallback
  const bgCommon = "bg-cover bg-center bg-fixed bg-no-repeat";

  switch (season) {
    case Season.SUMMER:
      return {
        // Summer: Hot Desert
        bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop',
        background: `${bgCommon}`,
        accent: 'text-orange-900',
        hasSnow: false,
        groundColor: 'bg-[#C2B280]',
      };
    case Season.WINTER:
      return {
        // Winter: Snowy Desert
        bgImage: 'https://images.unsplash.com/photo-1457195740896-7f345efef228?q=80&w=2070&auto=format&fit=crop',
        background: `${bgCommon}`,
        accent: 'text-slate-800',
        hasSnow: true,
        groundColor: 'bg-[#e5e7eb]',
      };
    case Season.SPRING:
      return {
        // Spring: Green Oasis
        bgImage: 'https://images.unsplash.com/photo-1549313861-33587f3d2956?q=80&w=2070&auto=format&fit=crop',
        background: `${bgCommon}`,
        accent: 'text-green-900',
        hasSnow: false,
        groundColor: 'bg-[#556b2f]',
      };
    case Season.AUTUMN:
    default:
      return {
        // Autumn: Withered/Dry Oasis
        bgImage: 'https://images.unsplash.com/photo-1533496928028-32c74d6c7038?q=80&w=2070&auto=format&fit=crop',
        background: `${bgCommon}`,
        accent: 'text-amber-900',
        hasSnow: false,
        groundColor: 'bg-[#8b4513]',
      };
  }
};